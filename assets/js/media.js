/* ============================================================
   LAMBAZADE — Ürün görseli katmanı
   Ürünün fotoğrafı varsa fotoğrafı, yoksa SVG çizimi döndürür.

   Ürün verisinde:
     gorseller: {
       kapali: 'product/class1/light.jpg',   // ışık kapalı kare
       acik:   'product/class1/dark.webp',   // ışık açık kare
       galeri: ['product/class1/urunyakin.webp', ...]
     }

   Işık anahtarı fotoğraflı ürünlerde iki kareyi çapraz geçişle
   değiştirir (yeniden yükleme yok), SVG'lerde yeniden çizer.
   ============================================================ */
(function (g) {
  'use strict';

  function kacir(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function yol(p) {
    // Türkçe karakter / boşluk içeren dosya adlarını da güvene al
    try { return encodeURI(p); } catch (e) { return p; }
  }

  var Medya = {
    /* Bu ürünün gerçek fotoğrafı var mı? */
    fotoVar: function (u) {
      return !!(u && u.gorseller && u.gorseller.kapali);
    },

    /* Ürünün tüm kareleri: [{tip,src,...}] — ürün detay galerisi için */
    kareler: function (u) {
      if (!this.fotoVar(u)) {
        return [
          { tip: 'svg', view: 'tam' },
          { tip: 'svg', view: 'detay' },
          { tip: 'svg', view: 'taban' }
        ];
      }
      var kareler = [{ tip: 'cift' }];
      (u.gorseller.galeri || []).forEach(function (src) {
        kareler.push({ tip: 'foto', src: src });
      });
      return kareler;
    },

    /**
     * Görsel HTML'i.
     * opts: { glow, view, kare, boyut:'kart'|'sahne'|'mini' }
     */
    render: function (u, opts) {
      opts = opts || {};
      var on = opts.glow !== false;

      if (!this.fotoVar(u)) {
        return '<span class="urun-medya" data-tip="svg" data-view="' + (opts.view || 'tam') + '">' +
          LampArt.render(u, opts) + '</span>';
      }

      var G = u.gorseller;
      var alt = kacir(u.ad || 'Lambader');
      var tembel = opts.boyut === 'sahne' ? '' : ' loading="lazy" decoding="async"';

      // Fotografin kendi zemin rengi — kare cerceveyi doldurur, urun kirpilmaz
      var zemin = ' style="--zemin-kapali:' + (G.zeminKapali || '#f3f2ef') +
        ';--zemin-acik:' + (G.zeminAcik || '#2a2622') + '"';

      // Tek bir galeri karesi istendi
      if (opts.kare && opts.kare.tip === 'foto') {
        return '<span class="urun-medya" data-tip="foto-tek" data-urun="' + kacir(u.id) + '"' + zemin + '>' +
          '<img src="' + yol(opts.kare.src) + '" alt="' + alt + ' yakın çekim"' + tembel + '></span>';
      }

      // Açık / kapalı çifti — CSS ile çapraz geçiş
      return '<span class="urun-medya" data-tip="foto" data-urun="' + kacir(u.id) +
        '" data-isik="' + (on ? 'acik' : 'kapali') + '"' + zemin + '>' +
        '<img class="urun-medya__kapali" src="' + yol(G.kapali) + '" alt="' + alt + ' (ışık kapalı)"' + tembel + '>' +
        '<img class="urun-medya__acik" src="' + yol(G.acik || G.kapali) + '" alt="' + alt + ' (ışık açık)"' + tembel + '>' +
        '</span>';
    },

    /* Kapsayıcı içindeki görseli yeni ışık durumuna göre güncelle */
    guncelle: function (kap, u, on, opts) {
      var m = kap.querySelector('.urun-medya');
      if (!m) return;
      if (m.dataset.tip === 'foto') {
        m.dataset.isik = on ? 'acik' : 'kapali';   // sadece geçiş, yeniden yükleme yok
        return;
      }
      var yeniOpts = Object.assign({ glow: on, view: m.dataset.view || 'tam' }, opts || {});
      m.outerHTML = this.render(u, yeniOpts);
    }
  };

  /* Fotoğraf yüklenemezse (404, ağ hatası) SVG çizime düş — kırık görsel gösterme */
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG') return;
    var kap = img.closest ? img.closest('.urun-medya') : null;
    if (!kap || kap.dataset.yedek === '1') return;

    var u = g.Store && Store.urunBul ? Store.urunBul(kap.dataset.urun) : null;
    console.warn('[Lambazade] Ürün fotoğrafı yüklenemedi, çizime düşüldü:', img.getAttribute('src'));
    if (!u) return;

    kap.dataset.yedek = '1';
    kap.dataset.tip = 'svg';
    kap.removeAttribute('style');
    kap.innerHTML = LampArt.render(u, { glow: kap.dataset.isik !== 'kapali' });
  }, true);   // capture: img error olayı yukarı baloncuklanmaz

  g.Medya = Medya;
})(window);
