/* ============================================================
   iyzico ödeme dönüşü
   iyzico bu adrese POST ile "token" gönderir. Token ile ödemenin
   gerçekten başarılı olduğunu iyzico'ya sorar (istemciye güvenmez),
   sonra tarayıcıyı sonuç sayfasına yönlendirir.
   ============================================================ */
import { iyzicoIstek } from './_iyzico.mjs';

const URI = '/payment/iyzipos/checkoutform/auth/ecom/detail';

function yonlendir(url) {
  return new Response(null, { status: 302, headers: { Location: url } });
}

export default async (istek) => {
  const q = new URL(istek.url).searchParams;
  const siparisNo = q.get('no') || '';
  const donus = q.get('donus') || new URL(istek.url).origin + '/odeme-sonuc.html';

  let token = q.get('token');
  if (istek.method === 'POST') {
    try {
      const tip = istek.headers.get('content-type') || '';
      if (tip.includes('application/json')) {
        token = (await istek.json()).token || token;
      } else {
        const form = new URLSearchParams(await istek.text());
        token = form.get('token') || token;
      }
    } catch { /* token query'de kalabilir */ }
  }

  var hedef = new URL(donus);
  hedef.searchParams.set('no', siparisNo);

  if (!token) {
    hedef.searchParams.set('status', 'failure');
    hedef.searchParams.set('mesaj', 'Ödeme oturumu bulunamadı.');
    return yonlendir(hedef.toString());
  }

  try {
    const sonuc = await iyzicoIstek(URI, {
      locale: 'tr',
      conversationId: siparisNo,
      token
    });

    const odendi = sonuc.paymentStatus === 'SUCCESS';
    hedef.searchParams.set('status', odendi ? 'success' : 'failure');
    if (!odendi) {
      hedef.searchParams.set('mesaj', sonuc.errorMessage || 'Banka işlemi onaylamadı.');
    } else {
      hedef.searchParams.set('odeme', sonuc.paymentId || '');
    }
    // Not: kalıcı sipariş kaydı için burada kendi veritabanınıza yazın.
    console.log('iyzico sonuç', { siparisNo, durum: sonuc.paymentStatus, paymentId: sonuc.paymentId });
    return yonlendir(hedef.toString());
  } catch (e) {
    console.error('iyzico-callback hatası:', e);
    hedef.searchParams.set('status', 'failure');
    hedef.searchParams.set('mesaj', e.message);
    return yonlendir(hedef.toString());
  }
};
