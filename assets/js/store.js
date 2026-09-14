/* ============================================================
   LAMBAZADE — İçerik deposu (mini CMS)
   Tüm site içeriği buradan okunur. Admin paneli buraya yazar.
   Kalıcılık: localStorage['lambazade.cms.v1'] + JSON yedekleme.
   ============================================================ */
(function (g) {
  'use strict';

  var ANAHTAR = 'lambazade.cms.v1';
  var SEPET = 'lambazade.sepet.v1';
  var FAVORI = 'lambazade.favori.v1';
  var ISIK = 'lambazade.isik.v1';

  /* ---------- yardımcılar ---------- */
  function klon(o) { return JSON.parse(JSON.stringify(o)); }

  function birlestir(hedef, kaynak) {
    // kaynak (seed) içindeki eksik alanları hedefe ekler; dizileri değiştirmez
    Object.keys(kaynak).forEach(function (k) {
      var kv = kaynak[k], hv = hedef[k];
      if (kv && typeof kv === 'object' && !Array.isArray(kv)) {
        if (!hv || typeof hv !== 'object' || Array.isArray(hv)) hedef[k] = klon(kv);
        else birlestir(hv, kv);
      } else if (hv === undefined) {
        hedef[k] = Array.isArray(kv) ? klon(kv) : kv;
      }
    });
    return hedef;
  }

  function oku(anahtar, varsayilan) {
    try {
      var v = JSON.parse(localStorage.getItem(anahtar));
      return v === null || v === undefined ? varsayilan : v;
    } catch (e) { return varsayilan; }
  }
  function yaz(anahtar, deger) {
    try { localStorage.setItem(anahtar, JSON.stringify(deger)); return true; }
    catch (e) { console.warn('Kaydedilemedi:', e); return false; }
  }

  /* ---------- veri ---------- */
  var veri = birlestir(oku(ANAHTAR, {}) || {}, g.MUSH_SEED);

  var Store = {
    get site() { return veri.site; },
    get urunler() { return veri.urunler; },
    get koleksiyonlar() { return veri.koleksiyonlar; },
    get renkler() { return veri.renkler; },
    get kampanyalar() { return veri.kampanyalar; },
    get siparisler() { return veri.siparisler; },
    get ham() { return veri; },

    kaydet: function (olay) {
      yaz(ANAHTAR, veri);
      this.duyur(olay || 'icerik');
    },

    duyur: function (olay) {
      document.dispatchEvent(new CustomEvent('mush:degisti', { detail: { olay: olay } }));
    },

    sifirla: function () {
      veri = klon(g.MUSH_SEED);
      this.kaydet('sifirla');
    },

    /* --- ürünler --- */
    urunBul: function (id) {
      return veri.urunler.filter(function (u) { return u.id === id; })[0] || null;
    },
    aktifUrunler: function () {
      return veri.urunler.filter(function (u) { return u.aktif !== false; });
    },
    urunKaydet: function (urun) {
      var mevcut = this.urunBul(urun.id);
      if (mevcut) Object.assign(mevcut, urun);
      else veri.urunler.push(urun);
      this.kaydet('urun');
    },
    urunSil: function (id) {
      veri.urunler = veri.urunler.filter(function (u) { return u.id !== id; });
      this.kaydet('urun');
    },

    /* --- koleksiyonlar --- */
    koleksiyonBul: function (slug) {
      return veri.koleksiyonlar.filter(function (k) { return k.slug === slug; })[0] || null;
    },
    koleksiyonAd: function (slug) {
      var k = this.koleksiyonBul(slug);
      return k ? k.ad : '';
    },

    /* --- kampanya / kupon --- */
    kuponBul: function (kod) {
      kod = (kod || '').trim().toUpperCase();
      return veri.kampanyalar.filter(function (k) {
        return k.aktif && k.kod.toUpperCase() === kod;
      })[0] || null;
    },

    /* --- siparişler --- */
    siparisEkle: function (siparis) {
      veri.siparisler.unshift(siparis);
      this.kaydet('siparis');
      return siparis;
    },
    siparisDurum: function (no, durum) {
      veri.siparisler.forEach(function (s) { if (s.no === no) s.durum = durum; });
      this.kaydet('siparis');
    },

    /* --- hediye kartları --- */
    get hediyeKartlari() {
      if (!veri.hediyeKartlari) veri.hediyeKartlari = [];
      return veri.hediyeKartlari;
    },
    hediyeKartBul: function (kod) {
      kod = (kod || '').trim().toUpperCase().replace(/[\s-]/g, '');
      return this.hediyeKartlari.filter(function (k) {
        return k.kod.replace(/-/g, '') === kod;
      })[0] || null;
    },
    /* Satın alınan her hediye kartı için numara üretir */
    hediyeKartUret: function (tutar, alici) {
      function blok() {
        var h = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', o = '';
        for (var i = 0; i < 4; i++) o += h[Math.floor(Math.random() * h.length)];
        return o;
      }
      var kod = 'LZD-' + blok() + '-' + blok() + '-' + blok();
      var kart = {
        kod: kod, tutar: tutar, kalan: tutar,
        tarih: new Date().toISOString(),
        alici: alici || '', aktif: true
      };
      this.hediyeKartlari.unshift(kart);
      this.kaydet('hediye');
      return kart;
    },
    hediyeKartDus: function (kod, tutar) {
      var k = this.hediyeKartBul(kod);
      if (!k) return 0;
      var dusen = Math.min(k.kalan, tutar);
      k.kalan -= dusen;
      if (k.kalan <= 0) k.aktif = false;
      this.kaydet('hediye');
      return dusen;
    },

    /* --- yedek --- */
    disaAktar: function () { return JSON.stringify(veri, null, 2); },
    iceAktar: function (metin) {
      var yeni = JSON.parse(metin);
      if (!yeni || !yeni.site || !Array.isArray(yeni.urunler)) throw new Error('Geçersiz yedek dosyası');
      veri = birlestir(yeni, g.MUSH_SEED);
      this.kaydet('iceaktar');
    }
  };

  /* ============================================================
     Sepet
     ============================================================ */
  var Sepet = {
    satirlar: oku(SEPET, []),
    kupon: oku('lambazade.kupon.v1', null),

    kaydet: function () {
      yaz(SEPET, this.satirlar);
      document.dispatchEvent(new CustomEvent('sepet:degisti'));
    },

    ekle: function (id, adet) {
      adet = adet || 1;
      var u = Store.urunBul(id);
      if (!u) return false;
      var s = this.satirlar.filter(function (x) { return x.id === id; })[0];
      var enFazla = Math.max(1, u.stok || 99);
      if (s) s.adet = Math.min(s.adet + adet, enFazla);
      else this.satirlar.push({ id: id, adet: Math.min(adet, enFazla) });
      this.kaydet();
      return true;
    },
    guncelle: function (id, adet) {
      if (adet <= 0) return this.cikar(id);
      var u = Store.urunBul(id);
      var enFazla = u ? Math.max(1, u.stok || 99) : 99;
      this.satirlar.forEach(function (s) { if (s.id === id) s.adet = Math.min(adet, enFazla); });
      this.kaydet();
    },
    cikar: function (id) {
      this.satirlar = this.satirlar.filter(function (s) { return s.id !== id; });
      this.kaydet();
    },
    bosalt: function () {
      this.satirlar = [];
      this.kuponKaldir();
      this.hediyeKaldir();
      this.kaydet();
    },
    detayli: function () {
      return this.satirlar.map(function (s) {
        var u = Store.urunBul(s.id);
        return u ? { urun: u, adet: s.adet, tutar: u.fiyat * s.adet } : null;
      }).filter(Boolean);
    },
    adetToplam: function () {
      return this.satirlar.reduce(function (a, s) { return a + s.adet; }, 0);
    },

    kuponUygula: function (kod) {
      var k = Store.kuponBul(kod);
      if (!k) return { ok: false, mesaj: 'Bu kod geçerli değil.' };
      var ara = this.detayli().reduce(function (a, x) { return a + x.tutar; }, 0);
      if (k.minTutar && ara < k.minTutar) {
        return { ok: false, mesaj: 'Bu kupon ' + k.minTutar.toLocaleString('tr-TR') + ' ₺ ve üzeri siparişlerde geçerli.' };
      }
      this.kupon = { kod: k.kod, tip: k.tip, deger: k.deger };
      yaz('lambazade.kupon.v1', this.kupon);
      this.kaydet();
      return { ok: true, mesaj: 'Kupon uygulandı: ' + k.kod };
    },
    kuponKaldir: function () {
      this.kupon = null;
      yaz('lambazade.kupon.v1', null);
    },

    /* --- Hediye kartı --- */
    hediye: oku('lambazade.hediye.v1', null),

    hediyeUygula: function (kod) {
      var k = Store.hediyeKartBul(kod);
      if (!k) return { ok: false, mesaj: 'Bu hediye kartı numarası bulunamadı.' };
      if (!k.aktif || k.kalan <= 0) return { ok: false, mesaj: 'Bu kartın bakiyesi tükenmiş.' };
      // Hediye kartı satın alırken başka bir hediye kartı kullanılamaz
      if (this.detayli().some(function (x) { return x.urun.hediyeKarti; })) {
        return { ok: false, mesaj: 'Hediye kartı alırken başka bir hediye kartı kullanılamaz.' };
      }
      this.hediye = { kod: k.kod, kalan: k.kalan };
      yaz('lambazade.hediye.v1', this.hediye);
      this.kaydet();
      return { ok: true, mesaj: 'Hediye kartı uygulandı: ' + k.kod, kart: k };
    },
    hediyeKaldir: function () {
      this.hediye = null;
      yaz('lambazade.hediye.v1', null);
      this.kaydet();
    },

    hesap: function () {
      var kargoAyar = Store.site.kargo;
      var araToplam = this.detayli().reduce(function (a, x) { return a + x.tutar; }, 0);
      var k = this.kupon;
      var indirim = 0, kargoBedava = false;

      if (k) {
        if (k.tip === 'yuzde') indirim = Math.round(araToplam * k.deger / 100);
        else if (k.tip === 'tutar') indirim = Math.min(k.deger, araToplam);
        else if (k.tip === 'kargo') kargoBedava = true;
      }
      var netTutar = araToplam - indirim;
      var kargo = 0;
      if (araToplam > 0 && !kargoBedava && netTutar < kargoAyar.ucretsizLimit) kargo = kargoAyar.ucret;

      var odenecek = Math.max(0, netTutar + kargo);
      var hediyeDusen = 0;
      if (this.hediye && this.hediye.kalan > 0) {
        hediyeDusen = Math.min(this.hediye.kalan, odenecek);
      }

      return {
        araToplam: araToplam, indirim: indirim, kargo: kargo,
        kargoBedava: kargoBedava || (araToplam > 0 && netTutar >= kargoAyar.ucretsizLimit),
        hediye: hediyeDusen,
        hediyeKod: hediyeDusen ? this.hediye.kod : null,
        toplam: Math.max(0, odenecek - hediyeDusen)
      };
    }
  };

  /* ============================================================
     Favoriler
     ============================================================ */
  var Favori = {
    liste: oku(FAVORI, []),
    var_mi: function (id) { return this.liste.indexOf(id) > -1; },
    degistir: function (id) {
      var i = this.liste.indexOf(id);
      if (i > -1) this.liste.splice(i, 1); else this.liste.push(id);
      yaz(FAVORI, this.liste);
      document.dispatchEvent(new CustomEvent('favori:degisti'));
      return this.var_mi(id);
    }
  };

  /* ============================================================
     Işık durumu — ürün bazında "ışığı aç / kapat"
     ============================================================ */
  var Isik = {
    durum: oku(ISIK, {}),

    /* Sitenin o anki teması koyu mu? */
    koyuTemaMi: function () {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    },

    /* Ziyaretci o urune dokunmadiysa gecerli olan varsayilan */
    varsayilan: function () {
      var ayar = Store.site.urunIsigi;
      if (ayar === 'acik') return true;
      if (ayar === 'kapali') return false;
      return this.koyuTemaMi();   // 'temaya-gore'
    },

    acikMi: function (id) {
      if (this.durum[id] === undefined) return this.varsayilan();
      return !!this.durum[id];
    },
    degistir: function (id) {
      var yeniDurum = !this.acikMi(id);
      this.durum[id] = yeniDurum;
      yaz(ISIK, this.durum);
      return yeniDurum;
    },
    hepsi: function (acik) {
      var o = this;
      Store.urunler.forEach(function (u) { o.durum[u.id] = acik; });
      yaz(ISIK, this.durum);
    },
    // Admin varsayılanı değiştirince kişisel seçimler sıfırlanır
    varsayilanaDon: function () {
      this.durum = {};
      yaz(ISIK, {});
    }
  };

  g.Store = Store;
  g.Sepet = Sepet;
  g.Favori = Favori;
  g.Isik = Isik;
})(window);
