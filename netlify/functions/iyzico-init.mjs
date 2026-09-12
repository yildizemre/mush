/* ============================================================
   POST /.netlify/functions/iyzico-init
   Gövde: { siparis: {...}, donusUrl: "https://site/odeme-sonuc.html" }
   Yanıt: { paymentPageUrl, token } veya { checkoutFormContent, token }
   ============================================================ */
import { iyzicoIstek, isimBol, fiyat, json, ayar } from './_iyzico.mjs';

const URI = '/payment/iyzipos/checkoutform/initialize/auth/ecom';

export default async (istek) => {
  if (istek.method !== 'POST') return json({ hata: 'Yalnızca POST' }, 405);

  const a = ayar();
  if (!a.hazir) {
    return json({
      hata: 'iyzico anahtarları sunucuda tanımlı değil. Netlify → Environment variables: ' +
            'IYZICO_API_KEY, IYZICO_SECRET_KEY, IYZICO_BASE_URL'
    }, 500);
  }

  let govde;
  try { govde = await istek.json(); }
  catch { return json({ hata: 'Geçersiz JSON gövdesi.' }, 400); }

  const s = govde?.siparis;
  if (!s || !Array.isArray(s.urunler) || !s.urunler.length) {
    return json({ hata: 'Sipariş bilgisi eksik.' }, 400);
  }

  const m = s.musteri || {};
  const { ad, soyad } = isimBol(m.ad);
  const kok = new URL(istek.url).origin;
  const ip = istek.headers.get('x-nf-client-connection-ip') ||
             (istek.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
             '85.34.78.112';

  const adres = {
    contactName: m.ad || 'Musteri',
    city: m.sehir || 'Istanbul',
    country: 'Turkey',
    address: m.adres || '-',
    zipCode: String(m.postaKodu || '')
  };

  // iyzico kuralı: basketItems toplamı price ile eşit olmalı.
  const sepetKalemleri = s.urunler.map((u) => ({
    id: u.id,
    name: u.ad,
    category1: u.kategori || 'Aydinlatma',
    itemType: 'PHYSICAL',
    price: fiyat(u.tutar)
  }));

  const toplamKalem = s.urunler.reduce((t, u) => t + Number(u.tutar), 0);

  const istek_govdesi = {
    locale: 'tr',
    conversationId: s.siparisNo,
    price: fiyat(toplamKalem),
    paidPrice: fiyat(s.toplam),
    currency: 'TRY',
    basketId: s.siparisNo,
    paymentGroup: 'PRODUCT',
    callbackUrl: `${kok}/.netlify/functions/iyzico-callback?no=${encodeURIComponent(s.siparisNo)}` +
                 `&donus=${encodeURIComponent(govde.donusUrl || kok + '/odeme-sonuc.html')}`,
    enabledInstallments: [1, 2, 3, 6, 9, 12],
    buyer: {
      id: m.eposta || s.siparisNo,
      name: ad,
      surname: soyad,
      gsmNumber: String(m.telefon || '').replace(/\s/g, '') || '+905000000000',
      email: m.eposta || 'musteri@example.com',
      identityNumber: '11111111111',        // iyzico zorunlu alan; TCKN toplanmıyorsa dolgu değer
      registrationAddress: m.adres || '-',
      city: m.sehir || 'Istanbul',
      country: 'Turkey',
      zipCode: String(m.postaKodu || ''),
      ip
    },
    shippingAddress: adres,
    billingAddress: adres,
    basketItems: sepetKalemleri
  };

  try {
    const yanit = await iyzicoIstek(URI, istek_govdesi);
    return json({
      token: yanit.token,
      paymentPageUrl: yanit.payWithIyzicoPageUrl || yanit.paymentPageUrl || null,
      checkoutFormContent: yanit.checkoutFormContent || null
    });
  } catch (e) {
    console.error('iyzico-init hatası:', e);
    return json({ hata: e.message }, 502);
  }
};
