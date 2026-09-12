/* ============================================================
   MUSH — Ödeme katmanı
   'demo'   : hiçbir yere istek gitmez, akış simüle edilir.
   'iyzico' : Netlify Function'a istek atar, iyzico Checkout Form
              sayfasına yönlendirir. Kart bilgisi asla bu siteye
              girilmez — iyzico'nun kendi güvenli formunda girilir.
   ============================================================ */
(function (g) {
  'use strict';

  var C = g.MUSH_CONFIG;

  function siparisNo() {
    var t = Date.now().toString(36).toUpperCase().slice(-5);
    var r = Math.random().toString(36).toUpperCase().slice(2, 5);
    return 'MSH-' + t + r;
  }

  var Odeme = {
    mod: C.paymentMode,

    /* Sepeti iyzico'nun beklediği yapıya çevirir */
    sepetiPaketle: function (musteri) {
      var satirlar = Sepet.detayli();
      var h = Sepet.hesap();
      return {
        siparisNo: siparisNo(),
        araToplam: h.araToplam,
        indirim: h.indirim,
        kargo: h.kargo,
        toplam: h.toplam,
        kupon: Sepet.kupon ? Sepet.kupon.kod : null,
        musteri: musteri,
        urunler: satirlar.map(function (x) {
          return {
            id: x.urun.id,
            ad: x.urun.ad,
            kategori: Store.koleksiyonAd(x.urun.koleksiyon) || 'Lambader',
            adet: x.adet,
            birimFiyat: x.urun.fiyat,
            tutar: x.tutar
          };
        })
      };
    },

    /**
     * Ödemeyi başlatır.
     * demo modda   → { durum:'demo', siparis }
     * iyzico modda → { durum:'yonlendir', url } veya { durum:'form', html }
     */
    async baslat(musteri) {
      var siparis = this.sepetiPaketle(musteri);

      if (this.mod !== 'iyzico') {
        return { durum: 'demo', siparis: siparis };
      }

      var yanit;
      try {
        yanit = await fetch(C.paymentFunctionPath, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            siparis: siparis,
            donusUrl: location.origin + '/odeme-sonuc.html'
          })
        });
      } catch (e) {
        throw new Error('Ödeme sunucusuna ulaşılamadı. Yerelde deniyorsanız ' +
          '`netlify dev` ile çalıştırın (basit sunucu Netlify fonksiyonlarını yürütmez).');
      }

      if (yanit.status === 404) {
        throw new Error('Ödeme fonksiyonu bulunamadı. Yerelde `netlify dev` kullanın, ' +
          'canlıda netlify/functions klasörünün yayınlandığından emin olun.');
      }

      var veri = await yanit.json().catch(function () { return {}; });

      if (!yanit.ok || veri.hata) {
        throw new Error(veri.hata || ('Ödeme başlatılamadı (HTTP ' + yanit.status + ')'));
      }
      if (veri.paymentPageUrl) {
        return { durum: 'yonlendir', url: veri.paymentPageUrl, siparis: siparis, token: veri.token };
      }
      if (veri.checkoutFormContent) {
        return { durum: 'form', html: veri.checkoutFormContent, siparis: siparis, token: veri.token };
      }
      throw new Error('iyzico beklenen yanıtı döndürmedi.');
    },

    /* Siparişi kaydeder (her iki modda da) */
    siparisiKaydet: function (siparis, durum) {
      var kayit = Object.assign({}, siparis, {
        no: siparis.siparisNo,
        tarih: new Date().toISOString(),
        durum: durum || 'hazirlaniyor',
        odemeModu: this.mod
      });
      Store.siparisEkle(kayit);
      return kayit;
    }
  };

  g.Odeme = Odeme;
})(window);
