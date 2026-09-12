/* ============================================================
   iyzico yardımcıları — IYZWSv2 imzalama + istek
   Ortam değişkenleri (Netlify → Site settings → Environment):
     IYZICO_API_KEY      sandbox-... veya canlı api key
     IYZICO_SECRET_KEY   secret key
     IYZICO_BASE_URL     https://sandbox-api.iyzipay.com  (test)
                         https://api.iyzipay.com          (canlı)
   ============================================================ */
import crypto from 'node:crypto';

export function ayar() {
  const apiKey = process.env.IYZICO_API_KEY;
  const secretKey = process.env.IYZICO_SECRET_KEY;
  const baseUrl = process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';
  return { apiKey, secretKey, baseUrl, hazir: Boolean(apiKey && secretKey) };
}

/**
 * iyzico v2 yetkilendirme başlığı.
 * signature = HMAC-SHA256(secretKey, randomKey + uriPath + gövde) → hex
 * Authorization: IYZWSv2 base64("apiKey:..&randomKey:..&signature:..")
 */
export function yetkiBasligi({ apiKey, secretKey }, uriPath, govdeMetni) {
  const randomKey = Date.now().toString() + Math.floor(Math.random() * 1e9);
  const imza = crypto
    .createHmac('sha256', secretKey)
    .update(randomKey + uriPath + govdeMetni)
    .digest('hex');

  const yetki = `apiKey:${apiKey}&randomKey:${randomKey}&signature:${imza}`;
  return {
    Authorization: 'IYZWSv2 ' + Buffer.from(yetki).toString('base64'),
    'x-iyzi-rnd': randomKey,
    'Content-Type': 'application/json'
  };
}

export async function iyzicoIstek(uriPath, govde) {
  const a = ayar();
  if (!a.hazir) throw new Error('IYZICO_API_KEY / IYZICO_SECRET_KEY tanımlı değil.');

  const metin = JSON.stringify(govde);
  const yanit = await fetch(a.baseUrl + uriPath, {
    method: 'POST',
    headers: yetkiBasligi(a, uriPath, metin),
    body: metin
  });

  const metinYanit = await yanit.text();
  let veri;
  try { veri = JSON.parse(metinYanit); }
  catch { throw new Error('iyzico yanıtı okunamadı: ' + metinYanit.slice(0, 300)); }

  if (veri.status !== 'success') {
    throw new Error(veri.errorMessage || veri.errorCode || 'iyzico isteği başarısız.');
  }
  return veri;
}

/** Müşteri adını ad + soyad olarak böl */
export function isimBol(tamAd) {
  const parcalar = String(tamAd || '').trim().split(/\s+/);
  if (parcalar.length < 2) return { ad: parcalar[0] || 'Musteri', soyad: 'Musteri' };
  return { ad: parcalar.slice(0, -1).join(' '), soyad: parcalar[parcalar.length - 1] };
}

/** iyzico kuruş değil, "10.50" biçimi string bekler */
export function fiyat(n) {
  return (Math.round(Number(n) * 100) / 100).toFixed(2);
}

export function json(govde, durum = 200) {
  return new Response(JSON.stringify(govde), {
    status: durum,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}
