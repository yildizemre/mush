/* ============================================================
   MUSH — Sayfa denetleyicileri
   body[data-page] değerine göre App tarafından çağrılır.
   ============================================================ */
(function (g) {
  'use strict';

  var A, $, $$, I, para, kacir, bildir;
  function hazir() {
    A = g.App; $ = A.$; $$ = A.$$; I = A.I; para = A.para; kacir = A.kacir; bildir = A.bildir;
  }

  /* ============================================================
     ANA SAYFA
     ============================================================ */
  function home() {
    hazir();
    var s = Store.site, B = s.bolumler;

    /* --- Hero --- */
    var heroUrun = Store.urunBul(s.hero.urunId) || Store.aktifUrunler()[0];
    var isikAcik = Isik.acikMi(heroUrun.id);
    $('#hero').innerHTML =
      '<div class="wrap hero-grid">' +
        '<div>' +
          '<span class="eyebrow">' + kacir(s.hero.etiket) + '</span>' +
          '<h1>' + kacir(s.hero.baslik) + ' <em class="grad-text">' + kacir(s.hero.baslikVurgu) + '</em></h1>' +
          '<p class="hero__lead">' + kacir(s.hero.metin) + '</p>' +
          '<div class="hero__cta">' +
            '<a class="btn btn--primary btn--lg" href="' + kacir(s.hero.btn1.yol) + '">' + kacir(s.hero.btn1.ad) + ' ' + I.ok + '</a>' +
            '<a class="btn btn--ghost btn--lg" href="' + kacir(s.hero.btn2.yol) + '">' + kacir(s.hero.btn2.ad) + '</a>' +
          '</div>' +
          '<div class="hero__stats">' + s.hero.istatistik.map(function (x) {
            return '<div class="stat"><b>' + kacir(x.sayi) + '</b><span>' + kacir(x.etiket) + '</span></div>';
          }).join('') + '</div>' +
        '</div>' +
        '<div class="stage" id="heroStage" data-isik="' + (isikAcik ? 'acik' : 'kapali') +
          '" data-medya="' + (Medya.fotoVar(heroUrun) ? 'foto' : 'svg') + '">' +
          Medya.render(heroUrun, { glow: isikAcik, boyut: 'sahne' }) +
          '<div class="stage__tag">' +
            '<button class="isik-sw" id="heroIsik" aria-pressed="' + isikAcik + '">' +
              '<span class="isik-sw__track"></span>' + I.ampul +
              '<span id="heroIsikYazi">' + (isikAcik ? 'Işık açık' : 'Işık kapalı') + '</span></button>' +
            '<a class="pill pill--price" href="product.html?id=' + heroUrun.id + '">' + para(heroUrun.fiyat) + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    function heroIsikCiz(yanik) {
      var st = $('#heroStage');
      st.dataset.isik = yanik ? 'acik' : 'kapali';
      $('#heroIsik').setAttribute('aria-pressed', String(yanik));
      $('#heroIsikYazi').textContent = yanik ? 'Işık açık' : 'Işık kapalı';
      Medya.guncelle(st, heroUrun, yanik, { boyut: 'sahne' });
    }
    $('#heroIsik').addEventListener('click', function () {
      heroIsikCiz(Isik.degistir(heroUrun.id));
    });
    // Site teması değişince hero da yeniden ışıklanır
    document.addEventListener('isik:tazele', function () {
      heroIsikCiz(Isik.acikMi(heroUrun.id));
    });

    /* --- Şerit --- */
    var seritler = s.seritler.concat(s.seritler);
    $('#strip').innerHTML = '<div class="strip__track">' +
      seritler.map(function (x) { return '<span>' + kacir(x) + '</span>'; }).join('') + '</div>';

    /* --- Güven şeridi --- */
    var gv = s.guven;
    if ($('#bolumGuven')) {
      if (!gv || !gv.aktif) {
        $('#bolumGuven').hidden = true;
      } else {
        $('#bolumGuven').innerHTML = '<div class="wrap"><div class="guven">' +
          (gv.ogeler || []).map(function (o) {
            return '<div class="guven__oge reveal">' +
              '<span class="guven__ikon">' + (I[o.ikon] || I.tik) + '</span>' +
              '<div><b>' + kacir(o.baslik) + '</b><small>' + kacir(o.metin) + '</small></div></div>';
          }).join('') + '</div></div>';
      }
    }

    /* --- Atmosfer bandı --- */
    var atm = s.atmosfer;
    if ($('#bolumAtmosfer')) {
      if (!atm || !atm.aktif) {
        $('#bolumAtmosfer').hidden = true;
      } else {
        var au = Store.urunBul(atm.urunId) || Store.aktifUrunler().filter(Medya.fotoVar)[0] || Store.aktifUrunler()[0];
        $('#bolumAtmosfer').innerHTML =
          '<div class="atmosfer reveal" data-medya="' + (Medya.fotoVar(au) ? 'foto' : 'svg') + '">' +
            '<div class="atmosfer__gorsel" data-isik="acik">' +
              Medya.render(au, { glow: true, boyut: 'sahne' }) + '</div>' +
            '<div class="atmosfer__perde"></div>' +
            '<div class="atmosfer__metin">' +
              '<span class="atmosfer__saat">' + kacir(atm.etiket) + '</span>' +
              '<h2>' + kacir(atm.baslik) + '</h2>' +
              '<p>' + kacir(atm.metin) + '</p>' +
              '<div class="atmosfer__btnler">' +
                '<a class="btn btn--white" href="' + kacir(atm.btn.yol) + '">' +
                  I.ampul + ' ' + kacir(atm.btn.ad) + '</a>' +
                '<a class="btn btn--ghost atmosfer__ghost" href="shop.html">Tüm koleksiyon</a>' +
              '</div>' +
            '</div>' +
          '</div>';
      }
    }

    /* --- Öne çıkanlar --- */
    var bol = function (id, b) {
      var el = $(id);
      if (!el) return false;
      if (!b.aktif) { el.hidden = true; return false; }
      return true;
    };

    if (bol('#bolumOne', B.oneCikanlar)) {
      var one = Store.aktifUrunler().filter(function (u) { return u.oneCikan; }).slice(0, 4);
      if (one.length < 4) one = Store.aktifUrunler().slice(0, 4);
      $('#oneBaslik').innerHTML = '<span class="eyebrow">' + kacir(B.oneCikanlar.etiket) + '</span>' +
        '<h2 class="h-lg">' + kacir(B.oneCikanlar.baslik) + '</h2>' +
        (B.oneCikanlar.metin ? '<p>' + kacir(B.oneCikanlar.metin) + '</p>' : '');
      var k1 = $('#oneCikanlar');
      k1.innerHTML = one.map(A.kartHTML).join('');
      A.kartlariBagla(k1);
    }

    /* --- Koleksiyonlar --- */
    if (bol('#bolumKol', B.koleksiyonlar)) {
      $('#kolBaslik').innerHTML = '<span class="eyebrow">' + kacir(B.koleksiyonlar.etiket) + '</span>' +
        '<h2 class="h-lg">' + kacir(B.koleksiyonlar.baslik) + '</h2>' +
        (B.koleksiyonlar.metin ? '<p>' + kacir(B.koleksiyonlar.metin) + '</p>' : '');
      $('#koleksiyonlar').innerHTML = Store.koleksiyonlar.filter(function (k) { return k.anaSayfa; })
        .map(function (k) {
          var icindekiler = Store.aktifUrunler().filter(function (u) { return u.koleksiyon === k.slug; });
          // Fotoğraflı bir ürün varsa onu göster — kart daha zengin durur
          var ornek = icindekiler.filter(function (u) { return Medya.fotoVar(u); })[0] || icindekiler[0];
          return '<a class="collection reveal" href="shop.html?koleksiyon=' + k.slug + '">' +
            (ornek ? Medya.render(ornek, { glow: true, boyut: 'kart' }) : '') +
            '<span class="collection__sayi">' + icindekiler.length + ' ürün</span>' +
            '<div class="collection__alt">' +
              '<h3>' + kacir(k.ad) + '</h3>' +
              '<p>' + kacir(k.ozet) + '</p>' +
              '<span class="kesfet"><span class="kesfet__yazi">Koleksiyonu keşfet</span>' +
                '<span class="kesfet__ok">' + I.ok + '</span></span>' +
            '</div></a>';
        }).join('');
    }

    /* --- Atölye: zaman çizelgesi --- */
    if (bol('#bolumAtolye', B.atolye)) {
      var ay = Store.aktifUrunler().filter(Medya.fotoVar);
      var atolyeUrun = ay[1] || ay[0] || Store.aktifUrunler()[0];

      $('#bolumAtolye').innerHTML = '<div class="wrap">' +
        '<div class="atolye-ust reveal">' +
          '<div><span class="eyebrow">' + kacir(B.atolye.etiket) + '</span>' +
            '<h2 class="h-lg" style="margin-top:14px">' + kacir(B.atolye.baslik) + '</h2></div>' +
          '<p class="atolye-ust__metin">' + kacir(B.atolye.metin) + '</p>' +
        '</div>' +

        '<div class="atolye-govde">' +
          '<ol class="zaman">' + s.atolyeAdimlar.map(function (a, i) {
            return '<li class="zaman__adim reveal">' +
              '<span class="zaman__no">' + ('0' + (i + 1)).slice(-2) + '</span>' +
              '<div class="zaman__ic">' +
                (a.sure ? '<span class="zaman__sure">' + kacir(a.sure) + '</span>' : '') +
                '<h4>' + kacir(a.baslik) + '</h4>' +
                '<p>' + kacir(a.metin) + '</p>' +
              '</div></li>';
          }).join('') + '</ol>' +

          '<div class="atolye-yan">' +
            '<div class="stage reveal" data-isik="acik" data-medya="' +
              (Medya.fotoVar(atolyeUrun) ? 'foto' : 'svg') + '">' +
              Medya.render(atolyeUrun, { glow: true, boyut: 'sahne' }) +
              '<div class="stage__tag"><span class="pill mono">GÖVDE NO. 0' + (Math.floor(Math.random() * 8) + 2) + '·247</span></div>' +
            '</div>' +
            '<div class="atolye-kart reveal">' +
              '<span class="atolye-kart__no">62</span>' +
              '<div><b>gün</b><small>ortalama üretim süresi</small></div>' +
            '</div>' +
            '<div class="atolye-kart reveal">' +
              '<span class="atolye-kart__no">6</span>' +
              '<div><b>kişi</b><small>atölyedeki tüm ekip</small></div>' +
            '</div>' +
          '</div>' +
        '</div></div>';
    }

    /* --- Üretim kaydı (CCTV) --- */
    var uk = s.uretimKaydi;
    if ($('#bolumUretim')) {
      if (!uk || !uk.aktif) { $('#bolumUretim').hidden = true; }
      else {
        $('#bolumUretim').innerHTML = '<div class="wrap"><div class="uretim reveal">' +
          '<div class="uretim__sol">' +
            '<span class="eyebrow">' + kacir(uk.etiket) + '</span>' +
            '<h2 class="h-md" style="margin-top:14px">' + kacir(uk.baslik) + '</h2>' +
            '<p class="muted" style="margin-top:14px;max-width:52ch">' + kacir(uk.metin) + '</p>' +
            '<ul class="uretim__liste">' + (uk.maddeler || []).map(function (m) {
              return '<li>' + I.tik + '<span>' + kacir(m) + '</span></li>';
            }).join('') + '</ul>' +
          '</div>' +
          '<div class="uretim__ekran">' +
            '<div class="uretim__bar"><span class="uretim__nokta"></span>CAM 02 · TEZGÂH B' +
              '<span class="uretim__zaman mono" id="uretimZaman">00:00</span></div>' +
            '<div class="uretim__kare">' +
              (uk.video
                ? '<video id="uretimVideo" muted loop playsinline preload="metadata"' +
                    (uk.poster ? ' poster="' + kacir(uk.poster) + '"' : '') + '>' +
                    '<source src="' + kacir(uk.video) + '" type="video/mp4"></video>' +
                    '<button class="uretim__oynat" id="uretimOynat" aria-label="Kaydı oynat">' +
                      '<span class="uretim__oynat-ic">' + I.oynat + '</span>' +
                      '<span class="uretim__oynat-yazi">Kaydı izle</span></button>'
                : Medya.render(atolyeUrun, { glow: true, boyut: 'sahne' })) +
              '<span class="uretim__kayit">● REC</span>' +
            '</div>' +
            '<div class="uretim__alt"><span class="mono">SERİ NO · MSH-0247</span>' +
              '<span class="mono">24 SA YANIK TESTİ · GEÇTİ</span></div>' +
          '</div>' +
        '</div></div>';

        // Video: görünür olunca oynat, tıklamayla durdur/başlat
        var vid = $('#uretimVideo');
        if (vid) {
          var oynatBtn = $('#uretimOynat'), zaman = $('#uretimZaman');
          function bicim(sn) {
            sn = Math.floor(sn || 0);
            return ('0' + Math.floor(sn / 60)).slice(-2) + ':' + ('0' + (sn % 60)).slice(-2);
          }
          vid.addEventListener('timeupdate', function () { zaman.textContent = bicim(vid.currentTime); });
          function degistirOynat() {
            if (vid.paused) { vid.play(); oynatBtn.classList.add('gizli'); }
            else { vid.pause(); oynatBtn.classList.remove('gizli'); }
          }
          oynatBtn.addEventListener('click', degistirOynat);
          vid.addEventListener('click', degistirOynat);

          if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (g) {
              g.forEach(function (x) {
                if (x.isIntersecting) { vid.play().then(function () { oynatBtn.classList.add('gizli'); }).catch(function () {}); }
                else { vid.pause(); }
              });
            }, { threshold: .35 }).observe(vid);
          }
        }
      }
    }

    /* --- Hediye kartı --- */
    var hk = s.hediye;
    if ($('#bolumHediye')) {
      if (!hk || !hk.aktif) { $('#bolumHediye').hidden = true; }
      else {
        $('#bolumHediye').innerHTML = '<div class="wrap"><div class="hediye reveal">' +
          '<div class="hediye__kart">' +
            '<div class="hediye__kart-ust"><span class="mono">MUSH</span>' +
              '<span class="mono">HEDİYE KARTI</span></div>' +
            '<div class="hediye__tutar" id="hediyeTutar">' + para(hk.tutarlar[1]) + '</div>' +
            '<div class="hediye__kart-alt"><span class="mono">24 AY GEÇERLİ</span>' +
              '<span class="mono">•••• 4821</span></div>' +
          '</div>' +
          '<div class="hediye__metin">' +
            '<span class="eyebrow">' + kacir(hk.etiket) + '</span>' +
            '<h2 class="h-md" style="margin-top:14px">' + kacir(hk.baslik) + '</h2>' +
            '<p class="muted" style="margin-top:14px;max-width:48ch">' + kacir(hk.metin) + '</p>' +
            '<div class="chips" id="hediyeTutarlar" style="margin-top:18px">' +
              hk.tutarlar.map(function (t, i) {
                return '<button class="chip" data-t="' + t + '" aria-pressed="' + (i === 1) + '">' +
                  para(t) + '</button>';
              }).join('') + '</div>' +
            '<ul class="uretim__liste" style="margin-top:16px">' + (hk.maddeler || []).map(function (m) {
              return '<li>' + I.tik + '<span>' + kacir(m) + '</span></li>';
            }).join('') + '</ul>' +
            '<p class="hediye__teslim">' + I.posta + '<span>' + kacir(hk.teslimNotu || '') + '</span></p>' +
            '<button class="btn btn--primary btn--lg" style="margin-top:16px" id="hediyeAl">' +
              I.hediye + ' <span id="hediyeAlYazi">' + kacir(hk.btnAd || 'Hediye kartı al') + '</span>' +
              ' · <b id="hediyeAlTutar">' + para(hk.tutarlar[1]) + '</b></button>' +
          '</div>' +
        '</div></div>';

        var seciliTutar = hk.tutarlar[1];
        $('#hediyeTutarlar').addEventListener('click', function (e) {
          var c = e.target.closest('.chip'); if (!c) return;
          $$('.chip', this).forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
          seciliTutar = +c.dataset.t;
          $('#hediyeTutar').textContent = para(seciliTutar);
          $('#hediyeAlTutar').textContent = para(seciliTutar);
        });

        // Hediye kartını sepete ekleyip ödemeye yönlendir
        $('#hediyeAl').addEventListener('click', function () {
          if (!Sepet.ekle('hediye-' + seciliTutar, 1)) {
            bildir('Bu tutarda hediye kartı tanımlı değil.', 'hata');
            return;
          }
          bildir('Hediye kartı sepete eklendi — ödemeye yönlendiriliyorsunuz.');
          setTimeout(function () { location.href = 'cart.html'; }, 700);
        });
      }
    }

    /* --- Yorumlar --- */
    if (bol('#bolumYorum', B.yorumlar)) {
      $('#yorumBaslik').innerHTML = '<span class="eyebrow">' + kacir(B.yorumlar.etiket) + '</span>' +
        '<h2 class="h-lg">' + kacir(B.yorumlar.baslik) + '</h2>' +
        (B.yorumlar.metin ? '<p>' + kacir(B.yorumlar.metin) + '</p>' : '');

      // --- Puan özeti ---
      var po = s.puanOzet;
      if (po && $('#puanOzet')) {
        $('#puanOzet').innerHTML =
          '<div class="puan-ozet reveal">' +
            '<div class="puan-ozet__not"><b>' + po.ortalama.toFixed(1).replace('.', ',') + '</b>' +
              '<span>/ 5</span></div>' +
            '<div class="puan-ozet__sag">' +
              '<div class="stars">' + new Array(5).fill(I.yildiz).join('') + '</div>' +
              '<span class="puan-ozet__adet">' + A.sayi(po.adet) + ' doğrulanmış değerlendirme</span>' +
            '</div>' +
            '<span class="puan-ozet__ayrac"></span>' +
            '<div class="puan-ozet__olcu">' + (po.dagilim || []).map(function (d) {
              return '<div class="puan-olcu"><span>' + kacir(d.etiket) + '</span>' +
                '<span class="puan-olcu__bar"><i style="width:' + d.deger + '%"></i></span>' +
                '<b>%' + d.deger + '</b></div>';
            }).join('') + '</div>' +
          '</div>';
      }

      // --- Yorum kartları ---
      $('#yorumlar').innerHTML = s.yorumlar.map(function (y) {
        var u = y.urunId ? Store.urunBul(y.urunId) : null;
        return '<blockquote class="quote reveal">' +
          '<div class="quote__ust">' +
            '<div class="stars">' + new Array(y.puan || 5).fill(I.yildiz).join('') + '</div>' +
            (y.dogrulanmis ? '<span class="quote__onay">' + I.tik + 'Doğrulanmış alıcı</span>' : '') +
          '</div>' +
          '<p>' + kacir(y.metin) + '</p>' +
          (u ? '<a class="quote__urun" href="product.html?id=' + u.id + '">' +
                '<i>' + Medya.render(u, { glow: true, boyut: 'mini' }) + '</i>' +
                kacir(u.ad) + '</a>' : '') +
          '<footer><span class="avatar">' + kacir((y.kisi || 'M')[0]) + '</span>' +
            '<span><b>' + kacir(y.kisi) + '</b>' + kacir(y.yer) + '</span></footer>' +
          '</blockquote>';
      }).join('');
    }

    /* --- Bülten --- */
    if (bol('#bolumBulten', B.bulten)) {
      $('#bolumBulten').innerHTML = '<div class="wrap"><div class="newsletter reveal">' +
        '<span class="eyebrow">' + kacir(B.bulten.etiket) + '</span>' +
        '<h2 class="h-lg">' + kacir(B.bulten.baslik) + '</h2>' +
        '<p>' + kacir(B.bulten.metin) + '</p>' +
        '<form id="bultenForm"><input type="email" required placeholder="E-posta adresin" aria-label="E-posta adresi">' +
        '<button class="btn" type="submit">Katıl</button></form>' +
        '<p style="margin-top:14px;font-size:11.5px;opacity:.8">Spam yok. Tek tıkla çıkabilirsin.</p>' +
        '</div></div>';
      $('#bultenForm').addEventListener('submit', function (e) {
        e.preventDefault();
        bildir('Teşekkürler! Yeni koleksiyonları ilk sen göreceksin.');
        e.target.reset();
      });
    }

    A.revealKur();
  }

  /* ============================================================
     MAĞAZA
     ============================================================ */
  function shop() {
    hazir();
    var q = new URLSearchParams(location.search);
    var durum = {
      koleksiyon: q.get('koleksiyon') || 'tumu',
      renk: 'tumu',
      maxFiyat: 20000,
      sirala: q.get('sirala') || 'onerilen',
      arama: q.get('q') || ''
    };
    var enYuksek = Math.max.apply(null, Store.aktifUrunler().map(function (u) { return u.fiyat; }).concat([20000]));
    durum.maxFiyat = enYuksek;

    $('#filtreler').innerHTML =
      '<div class="filter"><h5>Arama</h5>' +
        '<input class="field" id="fArama" type="search" placeholder="Lambader ara…" value="' + kacir(durum.arama) + '" ' +
        'style="width:100%;padding:11px 14px;border-radius:12px;border:1px solid var(--line-2);background:var(--bg-2)"></div>' +
      '<div class="filter"><h5>Koleksiyon</h5><div class="chips" id="fKol">' +
        '<button class="chip" data-v="tumu">Tümü</button>' +
        Store.koleksiyonlar.map(function (k) {
          return '<button class="chip" data-v="' + k.slug + '">' + kacir(k.ad) + '</button>';
        }).join('') + '</div></div>' +
      '<div class="filter"><h5>Renk / finiş</h5><div class="chips" id="fRenk">' +
        '<button class="chip" data-v="tumu">Tümü</button>' +
        Store.renkler.map(function (r) {
          return '<button class="chip chip--dot" data-v="' + r.slug + '">' +
            '<i style="background:' + r.hex + '"></i>' + kacir(r.ad) + '</button>';
        }).join('') + '</div></div>' +
      '<div class="filter"><h5>Üst fiyat</h5>' +
        '<input class="range" type="range" id="fFiyat" min="4000" max="' + enYuksek + '" step="250" value="' + enYuksek + '">' +
        '<div class="range-out"><span>4.000 ₺</span><span id="fFiyatOut">' + A.sayi(enYuksek) + ' ₺</span></div></div>' +
      '<div class="filter"><h5>Işık</h5>' +
        '<div class="chips"><button class="chip" id="isikHepAc">Hepsini yak</button>' +
        '<button class="chip" id="isikHepKapa">Hepsini söndür</button>' +
        '<button class="chip" id="isikTemaya">Temaya göre</button></div></div>' +
      '<div class="filter"><button class="btn btn--ghost btn--block btn--sm" id="fSifirla">Filtreleri temizle</button></div>';

    function chipCiz() {
      $$('#fKol .chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.v === durum.koleksiyon)); });
      $$('#fRenk .chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.v === durum.renk)); });
      $('#fFiyatOut').textContent = A.sayi(durum.maxFiyat) + ' ₺';
      $('#siralaSec').value = durum.sirala;
    }

    function listele() {
      var ara = durum.arama.trim().toLowerCase();
      var liste = Store.aktifUrunler().filter(function (u) {
        var eslesme = !ara || (u.ad + ' ' + u.altbaslik + ' ' + u.malzeme).toLowerCase().indexOf(ara) > -1;
        return eslesme &&
          (durum.koleksiyon === 'tumu' || u.koleksiyon === durum.koleksiyon) &&
          (durum.renk === 'tumu' || u.renk === durum.renk) &&
          u.fiyat <= durum.maxFiyat;
      });

      liste.sort({
        artan: function (a, b) { return a.fiyat - b.fiyat; },
        azalan: function (a, b) { return b.fiyat - a.fiyat; },
        puan: function (a, b) { return b.puan - a.puan; },
        onerilen: function (a, b) { return (b.oneCikan ? 1 : 0) - (a.oneCikan ? 1 : 0) || b.puan - a.puan; }
      }[durum.sirala]);

      var kap = $('#urunler');
      $('#urunSayi').textContent = liste.length + ' ürün bulundu';
      kap.innerHTML = liste.length
        ? liste.map(A.kartHTML).join('')
        : '<div class="empty" style="grid-column:1/-1">' + I.ara +
          '<p style="font-weight:600;color:var(--ink)">Eşleşen lambader yok</p>' +
          '<p style="margin-top:6px;font-size:13px">Filtreleri gevşetmeyi dene.</p></div>';
      A.revealKur();

      var k = Store.koleksiyonBul(durum.koleksiyon);
      $('#shopBaslik').textContent = k ? k.ad + ' Koleksiyonu' : 'Tüm Lambaderler';
      $('#shopOzet').textContent = k ? k.ozet : 'Atölyede tasarlanan, elde montajlanan gövdeler.';

      var np = new URLSearchParams();
      if (durum.koleksiyon !== 'tumu') np.set('koleksiyon', durum.koleksiyon);
      if (durum.sirala !== 'onerilen') np.set('sirala', durum.sirala);
      if (ara) np.set('q', durum.arama);
      history.replaceState(null, '', location.pathname + (np.toString() ? '?' + np : ''));
    }

    $('#fKol').addEventListener('click', function (e) {
      var c = e.target.closest('.chip'); if (!c) return;
      durum.koleksiyon = c.dataset.v; chipCiz(); listele();
    });
    $('#fRenk').addEventListener('click', function (e) {
      var c = e.target.closest('.chip'); if (!c) return;
      durum.renk = c.dataset.v; chipCiz(); listele();
    });
    $('#fFiyat').addEventListener('input', function (e) { durum.maxFiyat = +e.target.value; chipCiz(); listele(); });
    $('#siralaSec').addEventListener('change', function (e) { durum.sirala = e.target.value; listele(); });
    var zaman;
    $('#fArama').addEventListener('input', function (e) {
      durum.arama = e.target.value;
      clearTimeout(zaman);
      zaman = setTimeout(listele, 220);
    });
    $('#fSifirla').addEventListener('click', function () {
      durum = { koleksiyon: 'tumu', renk: 'tumu', maxFiyat: enYuksek, sirala: 'onerilen', arama: '' };
      $('#fFiyat').value = enYuksek; $('#fArama').value = '';
      chipCiz(); listele();
    });
    $('#isikHepAc').addEventListener('click', function () { Isik.hepsi(true); listele(); });
    $('#isikHepKapa').addEventListener('click', function () { Isik.hepsi(false); listele(); });
    $('#isikTemaya').addEventListener('click', function () { Isik.varsayilanaDon(); listele(); });
    $('#filtreAc').addEventListener('click', function () { $('#filtreler').classList.toggle('open'); });

    A.kartlariBagla($('#urunler'));
    chipCiz();
    listele();
  }

  /* ============================================================
     ÜRÜN DETAY
     ============================================================ */
  function product() {
    hazir();
    var id = new URLSearchParams(location.search).get('id');
    var u = Store.urunBul(id) || Store.aktifUrunler()[0];
    document.title = u.ad + ' — ' + Store.site.marka.ad;

    var kareler = Medya.kareler(u);
    var fotoVar = Medya.fotoVar(u);
    var aktif = 0, adet = 1;

    function isikAcik() { return Isik.acikMi(u.id); }

    function galeriCiz() {
      var on = isikAcik();
      var st = $('#pdpStage');
      var kare = kareler[aktif] || kareler[0];
      // Işık anahtarı yalnızca aç/kapa karesinde anlamlı (yakın çekimlerde gizli)
      var anahtarGoster = kare.tip !== 'foto';

      st.dataset.isik = on ? 'acik' : 'kapali';
      st.dataset.medya = fotoVar ? 'foto' : 'svg';
      st.innerHTML = Medya.render(u, { glow: on, view: kare.view, kare: kare, boyut: 'sahne' }) +
        (anahtarGoster
          ? '<div class="stage__tag">' +
              '<button class="isik-sw" id="pdpIsik" aria-pressed="' + on + '">' +
                '<span class="isik-sw__track"></span>' + I.ampul +
                '<span>' + (on ? 'Işık açık' : 'Işık kapalı') + '</span></button></div>'
          : '');

      // Tek kare varsa küçük görsel şeridi gösterilmez
      $('#pdpThumbs').hidden = kareler.length < 2;
      $('#pdpThumbs').innerHTML = kareler.map(function (kk, i) {
        return '<button class="thumb" data-i="' + i + '" aria-pressed="' + (i === aktif) + '" ' +
          'aria-label="' + (kk.tip === 'foto' ? 'Yakın çekim ' + i : 'Işık açık/kapalı') + '">' +
          Medya.render(u, { glow: on, view: kk.view, kare: kk, boyut: 'mini' }) + '</button>';
      }).join('');

      var sw = $('#pdpIsik');
      if (sw) sw.addEventListener('click', function () {
        Isik.degistir(u.id);
        galeriCiz();
      });
    }

    var indirim = u.eskiFiyat ? Math.round((1 - u.fiyat / u.eskiFiyat) * 100) : 0;

    $('#pdpInfo').innerHTML =
      '<p class="crumbs"><a href="index.html">Ana sayfa</a> / <a href="shop.html">Lambaderler</a> / ' + kacir(u.ad) + '</p>' +
      '<span class="eyebrow" style="margin-top:14px">' + kacir(Store.koleksiyonAd(u.koleksiyon)) + ' koleksiyonu</span>' +
      '<h1>' + kacir(u.ad) + '</h1>' +
      '<div class="rating" style="margin-top:12px">' + I.yildiz + (u.puan || 0).toFixed(1) +
        '<span style="color:var(--ink-3);font-weight:400">· ' + u.yorum + ' değerlendirme</span></div>' +
      '<div class="pdp__price"><span class="price">' + para(u.fiyat) + '</span>' +
        (u.eskiFiyat ? '<span class="price--old">' + para(u.eskiFiyat) + '</span>' +
          '<span class="badge badge--indirim">%' + indirim + ' indirim</span>' : '') + '</div>' +
      '<p class="pdp__desc">' + kacir(u.aciklama) + '</p>' +
      (function () {
        var o = Store.site.odeme;
        if (!o || !o.taksitAktif) return '';
        return '<div class="taksit-kutu">' +
          '<div class="taksit-kutu__ust">' + I.kart + '<b>Taksit seçenekleri</b>' +
            '<span class="logo-iyzico">iyzico</span></div>' +
          '<div class="taksit-satirlar">' + o.taksitler.map(function (n) {
            var vadesiz = n <= (o.vadeFarksizMax || 6);
            return '<div class="taksit-satir"><span>' + (n === 1 ? 'Tek çekim' : n + ' taksit') + '</span>' +
              '<b>' + para(Math.round(u.fiyat / n)) + (n > 1 ? ' × ' + n : '') + '</b>' +
              (vadesiz && n > 1 ? '<small>vade farkı yok</small>' : '') + '</div>';
          }).join('') + '</div>' +
          '<p class="taksit-kutu__not">' + kacir(o.notu) + '</p></div>';
      })() +
      '<div class="opt-group"><h5>Finiş</h5><div class="chips">' +
        '<button class="chip" aria-pressed="true">' + kacir(u.renkAd) + '</button>' +
        '<button class="chip" data-soon="1">Özel sipariş</button></div></div>' +
      '<div class="opt-group"><h5>Stok</h5><p style="font-size:13.5px;color:' +
        (u.stok <= 3 ? 'var(--brand-deep)' : 'var(--ink-2)') + '">' +
        (u.stok <= 0 ? 'Tükendi — üretim sıraya alındı.'
          : u.stok <= 3 ? 'Son ' + u.stok + ' adet — sıradaki üretim 3 hafta sonra.'
          : u.stok + ' adet hazır stokta, ' + kacir(Store.site.kargo.sure) + ' içinde kargoda.') + '</p></div>' +
      '<div class="buy-row">' +
        '<div class="qty"><button id="pdpEksi" aria-label="Azalt">–</button><span id="pdpAdet">1</span>' +
          '<button id="pdpArti" aria-label="Arttır">+</button></div>' +
        '<button class="btn btn--primary btn--lg" id="pdpEkle"' + (u.stok <= 0 ? ' disabled' : '') + '>' +
          (u.stok <= 0 ? 'Tükendi' : 'Sepete ekle · ' + para(u.fiyat)) + '</button>' +
        '<button class="chip-btn" id="pdpFav" aria-label="Favorilere ekle" style="width:48px;height:48px">' +
          (Favori.var_mi(u.id) ? I.kalpDolu : I.kalp) + '</button>' +
      '</div>' +
      '<a class="btn btn--soft btn--block" style="margin-top:10px" href="' + A.waLink() + '" target="_blank" rel="noopener">' +
        I.whatsapp + ' Bu ürünü WhatsApp’tan sor</a>' +
      '<div class="assure">' +
        '<div>' + I.kargo + '<span>' + para(Store.site.kargo.ucretsizLimit) + ' üzeri ücretsiz kargo · ' + kacir(Store.site.kargo.sure) + '</span></div>' +
        '<div>' + I.iade + '<span>30 gün koşulsuz iade, kurulumdan sonra bile</span></div>' +
        '<div>' + I.kalkan + '<span>3 yıl atölye garantisi, elektronik aksam dahil</span></div>' +
      '</div>' +
      '<div class="acc">' +
        '<details open><summary>Teknik özellikler</summary><div class="acc__body"><dl class="spec">' +
          '<dt>Malzeme</dt><dd>' + kacir(u.malzeme) + '</dd>' +
          '<dt>Yükseklik</dt><dd>' + kacir(u.yukseklik) + '</dd>' +
          '<dt>Abajur</dt><dd>' + kacir(u.abajur) + '</dd>' +
          '<dt>Ampul</dt><dd>' + kacir(u.ampul) + '</dd>' +
          '<dt>Finiş</dt><dd>' + kacir(u.renkAd) + '</dd>' +
          '<dt>Kod</dt><dd class="mono">MUSH-' + kacir(u.id.toUpperCase().replace(/-/g, '')) + '</dd>' +
        '</dl></div></details>' +
        '<details><summary>Öne çıkanlar</summary><div class="acc__body"><ul>' +
          (u.detay || []).map(function (d) { return '<li style="padding:4px 0">— ' + kacir(d) + '</li>'; }).join('') +
        '</ul></div></details>' +
        '<details><summary>Kargo, kurulum ve iade</summary><div class="acc__body">' +
          'Lambaderler çift katmanlı köpük kalıpla, abajur ayrı kutuda gönderilir. Kurulum ortalama 10 dakika sürer ' +
          've alet gerektirmez. 30 gün içinde iade etmek isterseniz kargoyu biz karşılıyoruz.</div></details>' +
        '<details><summary>Ampul önerisi</summary><div class="acc__body">' +
          '2700K sıcak beyaz, 806 lümen ve kısılabilir (dimmable) bir LED öneriyoruz. Soğuk beyaz ampuller ' +
          'keten ve rattan abajurlarda dokuyu grileştirir.</div></details>' +
      '</div>';

    galeriCiz();
    document.addEventListener('isik:tazele', galeriCiz);
    $('#pdpThumbs').addEventListener('click', function (e) {
      var t = e.target.closest('.thumb'); if (!t) return;
      aktif = +t.dataset.i; galeriCiz();
    });

    function adetCiz() {
      $('#pdpAdet').textContent = adet;
      if (u.stok > 0) $('#pdpEkle').textContent = 'Sepete ekle · ' + para(u.fiyat * adet);
    }
    $('#pdpArti').addEventListener('click', function () { adet = Math.min(adet + 1, Math.max(1, u.stok)); adetCiz(); });
    $('#pdpEksi').addEventListener('click', function () { adet = Math.max(1, adet - 1); adetCiz(); });
    $('#pdpEkle').addEventListener('click', function () {
      Sepet.ekle(u.id, adet);
      bildir('<b>' + kacir(u.ad) + '</b> sepete eklendi.');
      A.cekmeceAc(true);
    });
    $('#pdpFav').addEventListener('click', function (e) {
      var acik = Favori.degistir(u.id);
      e.currentTarget.classList.toggle('on', acik);
      e.currentTarget.innerHTML = acik ? I.kalpDolu : I.kalp;
      bildir(acik ? 'Favorilere eklendi.' : 'Favorilerden çıkarıldı.');
    });
    $$('[data-soon]').forEach(function (b) {
      b.addEventListener('click', function () { bildir('Özel sipariş için WhatsApp’tan yazabilirsin.'); });
    });

    var benzer = Store.aktifUrunler().filter(function (x) {
      return x.id !== u.id && (x.koleksiyon === u.koleksiyon || x.type === u.type);
    }).slice(0, 4);
    Store.aktifUrunler().forEach(function (x) {
      if (benzer.length < 4 && x.id !== u.id && benzer.indexOf(x) < 0) benzer.push(x);
    });
    var bk = $('#benzer');
    bk.innerHTML = benzer.map(A.kartHTML).join('');
    A.kartlariBagla(bk);
    A.revealKur();
  }

  /* ============================================================
     SEPET + ÖDEME
     ============================================================ */
  function cart() {
    hazir();
    var adim = 1, formVeri = {}, odemeYontemi = 'kart';
    var k = Auth.kullanici();
    if (k) {
      formVeri.ad = k.ad || '';
      formVeri.eposta = k.eposta || '';
      formVeri.tel = k.telefon || '';
    }

    function ozetCiz() {
      var h = Sepet.hesap(), satirlar = Sepet.detayli();
      var aktifKuponlar = Store.kampanyalar.filter(function (x) { return x.aktif; }).slice(0, 3);
      $('#ozet').innerHTML =
        '<div class="panel summary"><h3>Sipariş özeti</h3>' +
          satirlar.map(function (x) {
            return '<div class="sum-row"><span>' + x.adet + ' × ' + kacir(x.urun.ad) + '</span><span>' + para(x.tutar) + '</span></div>';
          }).join('') +
          '<div class="promo"><input id="kuponKod" placeholder="İndirim kodu" value="' +
            (Sepet.kupon ? kacir(Sepet.kupon.kod) : '') + '">' +
            '<button class="btn btn--ghost btn--sm" id="kuponBtn">Uygula</button></div>' +
          '<div class="kupon-liste">' + aktifKuponlar.map(function (x) {
            return '<button data-kod="' + kacir(x.kod) + '" title="' + kacir(x.aciklama) + '">' + kacir(x.kod) + '</button>';
          }).join('') + '</div>' +
          '<div class="sum-row" style="margin-top:14px"><span>Ara toplam</span><span>' + para(h.araToplam) + '</span></div>' +
          (h.indirim ? '<div class="sum-row"><span>İndirim (' + kacir(Sepet.kupon.kod) + ')</span>' +
            '<span style="color:var(--brand-deep);font-weight:600">-' + para(h.indirim) + '</span></div>' : '') +
          '<div class="sum-row"><span>Kargo</span><span>' + (h.kargo ? para(h.kargo) : 'Ücretsiz') + '</span></div>' +
          (h.hediye ? '<div class="sum-row"><span>Hediye kartı <small class="mono">' + kacir(h.hediyeKod) + '</small>' +
            ' <button class="x-btn" id="hediyeKaldir">kaldır</button></span>' +
            '<span style="color:var(--brand-deep);font-weight:600">-' + para(h.hediye) + '</span></div>' : '') +
          '<div class="sum-row sum-row--total"><span>Toplam</span><b>' + para(h.toplam) + '</b></div>' +
          '<p class="mono" style="margin-top:12px;font-size:10.5px;color:var(--ink-3)">KDV dahil · ' +
            para(Store.site.kargo.ucretsizLimit) + ' üzeri kargo bedava</p>' +
        '</div>';

      $('#kuponBtn').addEventListener('click', kuponDene);
      $('#kuponKod').addEventListener('keydown', function (e) { if (e.key === 'Enter') kuponDene(); });
      $$('#ozet .kupon-liste button').forEach(function (b) {
        b.addEventListener('click', function () { $('#kuponKod').value = b.dataset.kod; kuponDene(); });
      });
      var hk = $('#hediyeKaldir');
      if (hk) hk.addEventListener('click', function () {
        Sepet.hediyeKaldir();
        bildir('Hediye kartı çıkarıldı.');
      });
    }

    function kuponDene() {
      var r = Sepet.kuponUygula($('#kuponKod').value);
      bildir(r.mesaj, r.ok ? '' : 'hata');
    }

    function sepetCiz() {
      var satirlar = Sepet.detayli();

      if (satirlar.length && !$('#cartGovde')) {
        $('#cartKok').innerHTML = '<div class="checkout"><div id="cartGovde"></div><div id="ozet"></div></div>';
      }
      if (!satirlar.length) {
        $('#cartKok').innerHTML = '<div class="empty" style="padding:80px 20px">' + I.sepet +
          '<h2 class="h-md" style="margin-bottom:8px;color:var(--ink)">Sepetin boş</h2>' +
          '<p>Işığını seçmek için koleksiyona dön.</p>' +
          '<a class="btn btn--primary" style="margin-top:22px" href="shop.html">Lambaderlere göz at</a></div>';
        return;
      }

      $('#cartGovde').innerHTML =
        '<div class="panel"><h3>Sepetindeki ' + Sepet.adetToplam() + ' ürün</h3>' +
          '<div id="cartSatirlar">' + satirlar.map(A.satirHTML).join('') + '</div></div>' +
        '<div class="panel" id="formPanel"></div>';

      A.satirlariBagla($('#cartSatirlar'));
      formCiz();
      ozetCiz();
    }

    function adimlarHTML() {
      return '<div class="steps">' + ['Teslimat', 'Ödeme', 'Onay'].map(function (a, i) {
        return '<span class="step' + (adim >= i + 1 ? ' on' : '') + '"><i>' + (i + 1) + '</i>' + a + '</span>';
      }).join('') + '</div>';
    }

    function alan(id, etiket, tip, ph, tam) {
      return '<div class="field' + (tam ? ' field--full' : '') + '">' +
        '<label for="f_' + id + '">' + etiket + '</label>' +
        '<input id="f_' + id + '" name="' + id + '" type="' + tip + '" placeholder="' + ph + '" required>' +
        '<span class="err" data-err="' + id + '"></span></div>';
    }

    function dogrula(form) {
      var ok = true;
      $$('input[required]', form).forEach(function (i) {
        var bos = !i.value.trim();
        var epostaHata = i.type === 'email' && i.value && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(i.value);
        var telHata = i.name === 'tel' && i.value && i.value.replace(/\D/g, '').length < 10;
        var hata = bos ? 'Bu alan gerekli.' : epostaHata ? 'Geçerli bir e-posta gir.' : telHata ? 'Telefon en az 10 hane olmalı.' : '';
        i.setAttribute('aria-invalid', String(!!hata));
        var e = $('[data-err="' + i.name + '"]', form);
        if (e) e.textContent = hata;
        if (hata && ok) { i.focus(); ok = false; }
      });
      return ok;
    }

    function formCiz() {
      var p = $('#formPanel');
      if (!p) return;

      if (adim === 1) {
        p.innerHTML = adimlarHTML() + '<h3>Teslimat bilgileri</h3>' +
          (Auth.girisli() ? '' :
            '<div class="uyari uyari--bilgi">Hesabın varsa <a href="login.html" style="font-weight:600;text-decoration:underline">giriş yap</a> — siparişlerin hesabına işlenir.</div>') +
          '<form class="form-grid" id="teslimatForm" novalidate>' +
            alan('ad', 'Ad Soyad', 'text', 'Ayşe Yılmaz') +
            alan('tel', 'Telefon', 'tel', '0555 000 00 00') +
            alan('eposta', 'E-posta', 'email', 'ayse@ornek.com', true) +
            alan('adres', 'Adres', 'text', 'Mahalle, sokak, no, daire', true) +
            alan('sehir', 'Şehir', 'text', 'İstanbul') +
            alan('posta', 'Posta kodu', 'text', '34380') +
            '<div class="field field--full"><button class="btn btn--primary" type="submit">' +
              'Ödemeye devam et ' + I.ok + '</button></div>' +
          '</form>';

        var form = $('#teslimatForm');
        $$('input', form).forEach(function (i) { if (formVeri[i.name]) i.value = formVeri[i.name]; });
        form.addEventListener('input', function (e) { if (e.target.name) formVeri[e.target.name] = e.target.value; });
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          if (!dogrula(e.target)) return;
          adim = 2; formCiz();
          p.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }

      if (adim === 2) {
        var iyzicoAktif = MUSH_CONFIG.paymentMode === 'iyzico';
        p.innerHTML = adimlarHTML() + '<h3>Ödeme yöntemi</h3>' +
          '<div class="pay-opts" id="payOpts">' +
            '<div class="pay-opt" data-y="kart" role="radio" tabindex="0" aria-checked="true">' +
              '<span class="pay-opt__radio"></span>' +
              '<span><b>Kredi / banka kartı</b><small>Tek çekim veya 12 taksite kadar</small></span>' +
              '<span class="logo-iyzico">iyzico</span></div>' +
            '<div class="pay-opt" data-y="havale" role="radio" tabindex="0" aria-checked="false">' +
              '<span class="pay-opt__radio"></span>' +
              '<span><b>Havale / EFT</b><small>IBAN bilgileri sipariş sonrası e-postayla gelir</small></span></div>' +
            '<div class="pay-opt" data-y="kapida" role="radio" tabindex="0" aria-checked="false">' +
              '<span class="pay-opt__radio"></span>' +
              '<span><b>Kapıda ödeme</b><small>+49 ₺ hizmet bedeli</small></span></div>' +
          '</div>' +
          '<div class="pay-note">' + I.bilgi + '<span>' +
            (iyzicoAktif
              ? '<b>Kart bilgileriniz bu siteye girilmez.</b> “Siparişi tamamla”ya bastığınızda iyzico’nun ' +
                'kendi güvenli ödeme sayfasına yönlendirilirsiniz; kart verisi yalnızca iyzico tarafında işlenir.'
              : '<b>Demo mod.</b> Gerçek bir ödeme altyapısı bağlı değil, kart bilgisi istenmiyor ve ' +
                'para çekilmiyor. iyzico anahtarları eklendiğinde bu adım gerçek ödemeye döner.') +
            '</span></div>' +
          '<div class="hediye-giris">' +
            '<label for="hediyeNo">' + I.hediye + ' Hediye kartı numaranız var mı?</label>' +
            '<div class="promo">' +
              '<input id="hediyeNo" placeholder="MSH-XXXX-XXXX-XXXX" ' +
                'autocomplete="off" spellcheck="false" style="text-transform:uppercase">' +
              '<button class="btn btn--ghost btn--sm" type="button" id="hediyeUygula">Kullan</button>' +
            '</div>' +
            '<small>Kart bakiyesi toplamdan düşülür; kalan varsa kartta kalır.</small>' +
          '</div>' +
          '<div class="field" style="margin-top:18px;max-width:280px"><label for="taksit">Taksit</label>' +
            '<select id="taksit">' + (Store.site.odeme.taksitler || [1]).map(function (n) {
              return '<option>' + (n === 1 ? 'Tek çekim' : n + ' taksit') + '</option>';
            }).join('') + '</select></div>' +
          '<div class="buy-row" style="margin-top:20px">' +
            '<button class="btn btn--ghost" type="button" id="geriBtn">' + I.okGeri + ' Geri</button>' +
            '<button class="btn btn--primary" type="button" id="odeBtn">Siparişi tamamla · ' + para(Sepet.hesap().toplam) + '</button>' +
          '</div>';

        $('#payOpts').addEventListener('click', function (e) {
          var o = e.target.closest('.pay-opt'); if (!o) return;
          odemeYontemi = o.dataset.y;
          $$('.pay-opt', this).forEach(function (x) { x.setAttribute('aria-checked', String(x === o)); });
        });
        $('#geriBtn').addEventListener('click', function () { adim = 1; formCiz(); });
        $('#odeBtn').addEventListener('click', odemeYap);

        function hediyeDene() {
          var r = Sepet.hediyeUygula($('#hediyeNo').value);
          bildir(r.mesaj, r.ok ? '' : 'hata');
          if (r.ok) { formCiz(); ozetCiz(); }
        }
        $('#hediyeUygula').addEventListener('click', hediyeDene);
        $('#hediyeNo').addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { e.preventDefault(); hediyeDene(); }
        });
      }
    }

    async function odemeYap() {
      var btn = $('#odeBtn');
      btn.setAttribute('aria-busy', 'true');
      btn.textContent = 'İşleniyor…';

      var musteri = {
        ad: formVeri.ad, eposta: formVeri.eposta, telefon: formVeri.tel,
        adres: formVeri.adres, sehir: formVeri.sehir, postaKodu: formVeri.posta,
        odemeYontemi: odemeYontemi
      };

      try {
        // Hediye kartı tutarın tamamını karşıladıysa ödeme sağlayıcısına gitmeye gerek yok
        if (Sepet.hesap().toplam <= 0) {
          var sfr = Odeme.sepetiPaketle(musteri);
          var kartlar0 = [];
          Sepet.detayli().forEach(function (x) {
            if (x.urun.hediyeKarti) {
              for (var i = 0; i < x.adet; i++) {
                kartlar0.push(Store.hediyeKartUret(x.urun.fiyat, musteri.eposta));
              }
            }
          });
          if (sfr.hediyeKod && sfr.hediyeDusen) Store.hediyeKartDus(sfr.hediyeKod, sfr.hediyeDusen);
          var k0 = Odeme.siparisiKaydet(sfr, 'hazirlaniyor');
          k0.hediyeKartlari = kartlar0;
          k0.hediyeDusuldu = true;
          Store.kaydet('siparis');
          Sepet.bosalt();
          onayEkrani(k0);
          return;
        }

        var sonuc = await Odeme.baslat(musteri);

        if (sonuc.durum === 'yonlendir') {
          // Bakiye ve kart numarası ödeme onaylandıktan sonra işlenir (odeme-sonuc.html)
          Odeme.siparisiKaydet(sonuc.siparis, 'odemeBekliyor');
          try { localStorage.setItem('mush.bekleyenSiparis', sonuc.siparis.siparisNo); } catch (e) {}
          location.href = sonuc.url;
          return;
        }
        if (sonuc.durum === 'form') {
          Odeme.siparisiKaydet(sonuc.siparis, 'odemeBekliyor');
          var kap = document.createElement('div');
          kap.id = 'iyzipay-checkout-form';
          kap.className = 'responsive';
          $('#cartKok').innerHTML = '';
          $('#cartKok').appendChild(kap);
          var sc = document.createElement('div');
          sc.innerHTML = sonuc.html;
          Array.prototype.forEach.call(sc.querySelectorAll('script'), function (s) {
            var y = document.createElement('script');
            if (s.src) y.src = s.src; else y.textContent = s.textContent;
            document.body.appendChild(y);
          });
          return;
        }

        // demo
        var h = Sepet.hesap();
        var alinanKartlar = [];
        Sepet.detayli().forEach(function (x) {
          if (x.urun.hediyeKarti) {
            for (var i = 0; i < x.adet; i++) {
              alinanKartlar.push(Store.hediyeKartUret(x.urun.fiyat, musteri.eposta));
            }
          }
        });
        if (h.hediye && h.hediyeKod) Store.hediyeKartDus(h.hediyeKod, h.hediye);

        var kayit = Odeme.siparisiKaydet(sonuc.siparis, odemeYontemi === 'havale' ? 'odemeBekliyor' : 'hazirlaniyor');
        kayit.hediyeKartlari = alinanKartlar;
        Sepet.bosalt();
        onayEkrani(kayit);
      } catch (e) {
        btn.removeAttribute('aria-busy');
        btn.textContent = 'Siparişi tamamla · ' + para(Sepet.hesap().toplam);
        bildir(e.message || 'Ödeme başlatılamadı.', 'hata');
      }
    }

    function onayEkrani(kayit) {
      $('#cartKok').innerHTML =
        '<div class="done"><div class="done__mark">' + I.tik + '</div>' +
          '<h1 class="h-lg">Siparişin alındı</h1>' +
          '<p class="order-no">' + kacir(kayit.no) + '</p>' +
          '<p class="muted" style="margin-top:16px;max-width:46ch;margin-inline:auto">' +
            'Toplam <b>' + para(kayit.toplam) + '</b> · Atölyeden ' + kacir(Store.site.kargo.sure) + ' içinde çıkacak. ' +
            'Kargo takip kodunu e-posta ile göndereceğiz.</p>' +
          (kayit.durum === 'odemeBekliyor'
            ? '<div class="uyari uyari--bilgi" style="max-width:420px;margin:20px auto 0">Havale bilgileri ' +
              kacir(kayit.musteri.eposta) + ' adresine gönderildi.</div>' : '') +
          ((kayit.hediyeKartlari && kayit.hediyeKartlari.length)
            ? '<div class="onay-hediye">' +
                '<span class="eyebrow">Hediye kartınız hazır</span>' +
                (kayit.hediyeKartlari).map(function (k) {
                  return '<div class="onay-hediye__kart">' +
                    '<span class="onay-hediye__kod mono">' + kacir(k.kod) + '</span>' +
                    '<span class="onay-hediye__tutar">' + para(k.tutar) + '</span></div>';
                }).join('') +
                '<p>Numara <b>' + kacir(kayit.musteri.eposta) + '</b> adresine de gönderildi. ' +
                'Ödeme sırasında “Hediye kartı numaranız var mı?” alanına girerek kullanabilirsiniz. ' +
                '24 ay geçerli, kısmi kullanıma açık.</p></div>' : '') +
          (MUSH_CONFIG.paymentMode !== 'iyzico'
            ? '<p class="mono" style="margin-top:14px;font-size:11px;color:var(--ink-3)">Demo: gerçek bir ödeme alınmadı.</p>' : '') +
          '<div class="buy-row" style="justify-content:center;margin-top:24px">' +
            '<a class="btn btn--primary" href="shop.html">Alışverişe devam et</a>' +
            '<a class="btn btn--ghost" href="account.html">Siparişlerim</a></div>' +
        '</div>';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    sepetCiz();
    document.addEventListener('sepet:degisti', function () {
      if ($('#cartKok').querySelector('.done')) return;
      if (adim === 1) sepetCiz(); else ozetCiz();
    });
  }

  /* ============================================================
     GİRİŞ / ÜYE OL
     ============================================================ */
  function login() {
    hazir();
    var sekme = location.hash === '#uye' ? 'uye' : 'giris';

    if (Auth.girisli()) {
      location.replace(Auth.adminMi() ? 'admin.html' : 'account.html');
      return;
    }

    function ciz() {
      $('#authKok').innerHTML =
        '<div class="auth-card">' +
          '<div class="center" style="margin-bottom:22px">' +
            '<h1 class="h-md">' + (sekme === 'giris' ? 'Tekrar hoş geldin' : 'Muush’a katıl') + '</h1>' +
            '<p class="muted" style="margin-top:7px;font-size:14px">' +
              (sekme === 'giris' ? 'Siparişlerini ve favorilerini görmek için giriş yap.' : 'Hesap aç, siparişlerini takip et.') +
            '</p></div>' +
          '<div class="auth-tabs" role="tablist">' +
            '<button role="tab" data-s="giris" aria-selected="' + (sekme === 'giris') + '">Giriş yap</button>' +
            '<button role="tab" data-s="uye" aria-selected="' + (sekme === 'uye') + '">Üye ol</button>' +
          '</div>' +
          '<div id="authUyari"></div>' +
          '<div class="oauth">' +
            '<button id="btnGoogle">' + I.google + 'Google ile devam et</button>' +
            '<button class="apple" id="btnApple">' + I.apple + 'Apple ile devam et</button>' +
          '</div>' +
          '<div class="ayirac">veya e-posta ile</div>' +
          '<form id="authForm" class="form-grid" novalidate>' +
            (sekme === 'uye' ? '<div class="field field--full"><label for="a_ad">Ad Soyad</label>' +
              '<input id="a_ad" name="ad" type="text" placeholder="Ayşe Yılmaz" required></div>' : '') +
            '<div class="field field--full"><label for="a_eposta">E-posta</label>' +
              '<input id="a_eposta" name="eposta" type="email" placeholder="ayse@ornek.com" required autocomplete="email"></div>' +
            '<div class="field field--full"><label for="a_sifre">Şifre</label>' +
              '<input id="a_sifre" name="sifre" type="password" placeholder="En az 6 karakter" required ' +
              'autocomplete="' + (sekme === 'uye' ? 'new-password' : 'current-password') + '"></div>' +
            (sekme === 'uye' ? '<div class="field field--full"><label for="a_tel">Telefon (opsiyonel)</label>' +
              '<input id="a_tel" name="telefon" type="tel" placeholder="0555 000 00 00"></div>' : '') +
            '<div class="field field--full"><button class="btn btn--primary btn--block btn--lg" type="submit">' +
              (sekme === 'giris' ? 'Giriş yap' : 'Hesap oluştur') + '</button></div>' +
          '</form>' +
          (Auth.mod === 'local'
            ? '<p class="mono" style="margin-top:16px;font-size:10.5px;color:var(--ink-3);text-align:center">' +
              'Demo mod: hesaplar yalnızca bu tarayıcıda saklanır.<br>Yönetici girişi: ' +
              kacir(MUSH_CONFIG.adminEmail) + ' / ' + kacir(MUSH_CONFIG.adminDemoSifre) + '</p>' : '') +
        '</div>';

      $$('#authKok [role="tab"]').forEach(function (b) {
        b.addEventListener('click', function () {
          sekme = b.dataset.s;
          location.hash = sekme === 'uye' ? '#uye' : '';
          ciz();
        });
      });

      function uyari(mesaj, tip) {
        $('#authUyari').innerHTML = '<div class="uyari uyari--' + (tip || 'hata') + '">' + kacir(mesaj) + '</div>';
      }

      async function saglayici(hangi) {
        try {
          var s = hangi === 'google' ? await Auth.google() : await Auth.apple();
          if (s) {
            bildir('Hoş geldin, ' + s.ad + '!');
            location.href = s.rol === 'admin' ? 'admin.html' : 'account.html';
          }
        } catch (e) { uyari(e.message); }
      }
      $('#btnGoogle').addEventListener('click', function () { saglayici('google'); });
      $('#btnApple').addEventListener('click', function () { saglayici('apple'); });

      $('#authForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        var btn = $('button[type="submit"]', e.target);
        btn.setAttribute('aria-busy', 'true');
        var f = new FormData(e.target);
        try {
          var k = sekme === 'giris'
            ? await Auth.giris(f.get('eposta'), f.get('sifre'))
            : await Auth.kayit({ ad: f.get('ad'), eposta: f.get('eposta'), sifre: f.get('sifre'), telefon: f.get('telefon') });
          bildir('Hoş geldin, ' + k.ad + '!');
          location.href = k.rol === 'admin' ? 'admin.html' : 'account.html';
        } catch (err) {
          uyari(err.message);
          btn.removeAttribute('aria-busy');
        }
      });
    }
    ciz();
  }

  /* ============================================================
     HESABIM
     ============================================================ */
  function account() {
    hazir();
    var k = Auth.kullanici();
    if (!k) { location.replace('login.html'); return; }

    var sekmeler = [
      { id: 'siparisler', ad: 'Siparişlerim', ikon: I.kutu },
      { id: 'favoriler', ad: 'Favorilerim', ikon: I.kalp },
      { id: 'profil', ad: 'Profil', ikon: I.kullanici },
      { id: 'adres', ad: 'Adreslerim', ikon: I.konum }
    ];
    var aktif = (location.hash || '#siparisler').slice(1);
    if (!sekmeler.some(function (s) { return s.id === aktif; })) aktif = 'siparisler';

    function ciz() {
      $('#accKok').innerHTML =
        '<div class="account">' +
          '<nav class="acc-nav">' +
            sekmeler.map(function (s) {
              return '<button data-s="' + s.id + '" aria-current="' + (s.id === aktif) + '">' + s.ikon + s.ad + '</button>';
            }).join('') +
            (Auth.adminMi() ? '<a class="btn btn--soft btn--sm" style="margin-top:8px" href="admin.html">' + I.ayar + ' Yönetim paneli</a>' : '') +
            '<button id="cikisBtn" style="color:#c81d43;margin-top:4px">' + I.cikis + 'Çıkış yap</button>' +
          '</nav>' +
          '<div id="accIcerik"></div>' +
        '</div>';

      $$('.acc-nav [data-s]').forEach(function (b) {
        b.addEventListener('click', function () { aktif = b.dataset.s; location.hash = '#' + aktif; ciz(); });
      });
      $('#cikisBtn').addEventListener('click', async function () {
        await Auth.cikis();
        bildir('Çıkış yapıldı.');
        location.href = 'index.html';
      });

      var c = $('#accIcerik');

      if (aktif === 'siparisler') {
        var sip = Auth.siparislerim();
        c.innerHTML = '<div class="panel"><h3>Siparişlerim</h3>' +
          (sip.length ? sip.map(function (s) {
            return '<div class="order-card"><div class="order-card__head">' +
              '<div><b class="mono">' + kacir(s.no) + '</b>' +
                '<small style="display:block;color:var(--ink-3)">' + A.tarih(s.tarih) + '</small></div>' +
              '<span class="durum durum--' + kacir(s.durum) + '">' + durumAd(s.durum) + '</span>' +
              '<b>' + para(s.toplam) + '</b></div>' +
              s.urunler.map(function (u) {
                return '<div class="sum-row"><span>' + u.adet + ' × ' + kacir(u.ad) + '</span><span>' + para(u.tutar) + '</span></div>';
              }).join('') + '</div>';
          }).join('') : '<div class="empty">' + I.kutu + '<p>Henüz siparişin yok.</p>' +
            '<a class="btn btn--primary btn--sm" style="margin-top:16px" href="shop.html">Alışverişe başla</a></div>') +
          '</div>';
      }

      if (aktif === 'favoriler') {
        var favs = Favori.liste.map(Store.urunBul).filter(Boolean);
        c.innerHTML = '<div class="panel"><h3>Favorilerim</h3>' +
          (favs.length ? '<div class="grid-products" id="favGrid" style="margin-top:6px">' +
            favs.map(A.kartHTML).join('') + '</div>'
            : '<div class="empty">' + I.kalp + '<p>Favori listeniz boş.</p></div>') + '</div>';
        if (favs.length) { A.kartlariBagla($('#favGrid')); A.revealKur(); }
        document.addEventListener('favori:degisti', function () { if (aktif === 'favoriler') ciz(); }, { once: true });
      }

      if (aktif === 'profil') {
        c.innerHTML = '<div class="panel"><h3>Profil</h3>' +
          '<form class="form-grid" id="profilForm">' +
            '<div class="field"><label for="p_ad">Ad Soyad</label><input id="p_ad" value="' + kacir(k.ad || '') + '"></div>' +
            '<div class="field"><label for="p_tel">Telefon</label><input id="p_tel" value="' + kacir(k.telefon || '') + '"></div>' +
            '<div class="field field--full"><label for="p_eposta">E-posta</label>' +
              '<input id="p_eposta" value="' + kacir(k.eposta) + '" disabled></div>' +
            '<div class="field field--full" style="font-size:12.5px;color:var(--ink-3)">Giriş yöntemi: ' +
              kacir(k.saglayici === 'google' ? 'Google' : k.saglayici === 'apple' ? 'Apple' : 'E-posta') + '</div>' +
            '<div class="field field--full"><button class="btn btn--primary" type="submit">Kaydet</button></div>' +
          '</form></div>';
        $('#profilForm').addEventListener('submit', async function (e) {
          e.preventDefault();
          try {
            await Auth.guncelle({ ad: $('#p_ad').value, telefon: $('#p_tel').value });
            k = Auth.kullanici();
            bildir('Profil güncellendi.');
            A.headerKur();
          } catch (err) { bildir(err.message, 'hata'); }
        });
      }

      if (aktif === 'adres') {
        var adresler = k.adresler || [];
        c.innerHTML = '<div class="panel"><h3>Adreslerim</h3>' +
          (adresler.length ? adresler.map(function (a, i) {
            return '<div class="order-card"><div class="order-card__head"><b>' + kacir(a.baslik) + '</b>' +
              '<button class="x-btn" data-sil="' + i + '">Sil</button></div>' +
              '<p style="font-size:13.5px;color:var(--ink-2)">' + kacir(a.adres) + '<br>' +
              kacir(a.sehir) + ' ' + kacir(a.posta || '') + '</p></div>';
          }).join('') : '<div class="empty">' + I.konum + '<p>Kayıtlı adresin yok.</p></div>') +
          '<form class="form-grid" id="adresForm" style="margin-top:14px">' +
            '<div class="field"><label for="ad_baslik">Başlık</label><input id="ad_baslik" placeholder="Ev" required></div>' +
            '<div class="field"><label for="ad_sehir">Şehir</label><input id="ad_sehir" placeholder="İstanbul" required></div>' +
            '<div class="field field--full"><label for="ad_adres">Adres</label><input id="ad_adres" placeholder="Mahalle, sokak, no" required></div>' +
            '<div class="field"><label for="ad_posta">Posta kodu</label><input id="ad_posta" placeholder="34380"></div>' +
            '<div class="field field--full"><button class="btn btn--primary" type="submit">' + I.arti + ' Adres ekle</button></div>' +
          '</form></div>';

        $('#adresForm').addEventListener('submit', async function (e) {
          e.preventDefault();
          var yeni = (k.adresler || []).concat([{
            baslik: $('#ad_baslik').value, sehir: $('#ad_sehir').value,
            adres: $('#ad_adres').value, posta: $('#ad_posta').value
          }]);
          await Auth.guncelle({ adresler: yeni });
          k = Auth.kullanici(); bildir('Adres eklendi.'); ciz();
        });
        $$('[data-sil]').forEach(function (b) {
          b.addEventListener('click', async function () {
            var yeni = (k.adresler || []).slice();
            yeni.splice(+b.dataset.sil, 1);
            await Auth.guncelle({ adresler: yeni });
            k = Auth.kullanici(); bildir('Adres silindi.'); ciz();
          });
        });
      }
    }

    $('#accSelam').innerHTML = 'Merhaba, <b>' + kacir((k.ad || '').split(' ')[0]) + '</b>';
    ciz();
  }

  function durumAd(d) {
    return { hazirlaniyor: 'Hazırlanıyor', kargoda: 'Kargoda', teslim: 'Teslim edildi', iptal: 'İptal', odemeBekliyor: 'Ödeme bekliyor' }[d] || d;
  }

  /* ============================================================
     ÖDEME SONUÇ (iyzico dönüşü)
     ============================================================ */
  function odemeSonuc() {
    hazir();
    var q = new URLSearchParams(location.search);
    var no = null;
    try { no = localStorage.getItem('mush.bekleyenSiparis'); } catch (e) {}
    var basarili = q.get('status') !== 'failure';

    var uretilen = [];
    if (basarili) {
      if (no) {
        Store.siparisDurum(no, 'hazirlaniyor');
        var sip = Store.siparisler.filter(function (x) { return x.no === no; })[0];
        if (sip) {
          // Hediye kartı satın alındıysa numarayı şimdi üret (ödeme onaylandı)
          if (!sip.hediyeKartlari) {
            (sip.urunler || []).forEach(function (u) {
              var p2 = Store.urunBul(u.id);
              if (p2 && p2.hediyeKarti) {
                for (var i = 0; i < u.adet; i++) {
                  uretilen.push(Store.hediyeKartUret(p2.fiyat, sip.musteri && sip.musteri.eposta));
                }
              }
            });
            if (uretilen.length) { sip.hediyeKartlari = uretilen; Store.kaydet('siparis'); }
          } else {
            uretilen = sip.hediyeKartlari;
          }
          // Ödemede hediye kartı kullanıldıysa bakiyeyi düş
          if (sip.hediyeKod && sip.hediyeDusen && !sip.hediyeDusuldu) {
            Store.hediyeKartDus(sip.hediyeKod, sip.hediyeDusen);
            sip.hediyeDusuldu = true;
            Store.kaydet('siparis');
          }
        }
      }
      Sepet.bosalt();
      try { localStorage.removeItem('mush.bekleyenSiparis'); } catch (e) {}
    }

    $('#sonucKok').innerHTML = basarili
      ? '<div class="done"><div class="done__mark">' + I.tik + '</div>' +
        '<h1 class="h-lg">Ödeme alındı</h1>' +
        (no ? '<p class="order-no">' + kacir(no) + '</p>' : '') +
        '<p class="muted" style="margin-top:16px;max-width:44ch;margin-inline:auto">' +
          'Siparişin atölyeye düştü. Kargo takip kodunu e-posta ile göndereceğiz.</p>' +
        (uretilen.length
          ? '<div class="onay-hediye"><span class="eyebrow">Hediye kartınız hazır</span>' +
            uretilen.map(function (k) {
              return '<div class="onay-hediye__kart">' +
                '<span class="onay-hediye__kod mono">' + kacir(k.kod) + '</span>' +
                '<span class="onay-hediye__tutar">' + para(k.tutar) + '</span></div>';
            }).join('') +
            '<p>Numara e-posta adresinize de gönderildi. Ödeme sırasında ' +
            '“Hediye kartı numaranız var mı?” alanına girerek kullanabilirsiniz. ' +
            '24 ay geçerli, kısmi kullanıma açık.</p></div>'
          : '') +
        '<div class="buy-row" style="justify-content:center;margin-top:22px">' +
          '<a class="btn btn--primary" href="shop.html">Alışverişe devam et</a>' +
          '<a class="btn btn--ghost" href="account.html">Siparişlerim</a></div></div>'
      : '<div class="done"><div class="done__mark" style="background:#e8345e">' + I.kapat + '</div>' +
        '<h1 class="h-lg">Ödeme tamamlanamadı</h1>' +
        '<p class="muted" style="margin-top:16px;max-width:44ch;margin-inline:auto">' +
          kacir(q.get('mesaj') || 'Banka işlemi onaylamadı. Sepetin duruyor, tekrar deneyebilirsin.') + '</p>' +
        '<div class="buy-row" style="justify-content:center;margin-top:22px">' +
          '<a class="btn btn--primary" href="cart.html">Tekrar dene</a>' +
          '<a class="btn btn--ghost" href="' + A.waLink() + '" target="_blank" rel="noopener">WhatsApp’tan destek</a></div></div>';
  }

  /* ============================================================
     BİLGİ SAYFALARI (kargo, iade, ampul rehberi, garanti)
     ============================================================ */
  function bilgi() {
    hazir();
    var konu = document.body.dataset.konu;
    var v = (Store.site.bilgiSayfalari || {})[konu];

    if (!v) {
      $('#bilgiKok').innerHTML = '<div class="empty" style="padding:90px 20px">' + I.bilgi +
        '<h1 class="h-md" style="color:var(--ink)">Sayfa bulunamadı</h1>' +
        '<a class="btn btn--primary" style="margin-top:20px" href="index.html">Ana sayfaya dön</a></div>';
      return;
    }

    document.title = v.baslik + ' — ' + Store.site.marka.ad;
    var kargo = Store.site.kargo, ile = Store.site.iletisim;

    // Diğer bilgi sayfalarına geçiş
    var digerleri = [
      { k: 'kargo', yol: 'kargo.html' },
      { k: 'iade', yol: 'iade.html' },
      { k: 'ampul', yol: 'ampul-rehberi.html' },
      { k: 'garanti', yol: 'garanti.html' }
    ].filter(function (x) { return (Store.site.bilgiSayfalari || {})[x.k]; });

    var bolumler = (v.bolumler || []).map(function (b, i) {
      return '<section class="bilgi-bolum reveal" id="b' + i + '">' +
        '<h2>' + kacir(b.baslik) + '</h2>' +
        (b.metin ? '<p>' + kacir(b.metin) + '</p>' : '') +
        (b.liste && b.liste.length
          ? '<ul class="bilgi-liste">' + b.liste.map(function (l) {
              return '<li>' + kacir(l) + '</li>';
            }).join('') + '</ul>'
          : '') +
        '</section>';
    }).join('');

    var sss = (v.sss || []).length
      ? '<section class="bilgi-bolum reveal"><h2>Sık sorulanlar</h2><div class="acc">' +
        v.sss.map(function (x) {
          return '<details><summary>' + kacir(x.soru) + '</summary>' +
            '<div class="acc__body">' + kacir(x.cevap) + '</div></details>';
        }).join('') + '</div></section>'
      : '';

    $('#bilgiKok').innerHTML =
      '<div class="bilgi">' +
        '<div class="bilgi__ana">' +
          '<p class="crumbs"><a href="index.html">Ana sayfa</a> / <span>' + kacir(v.baslik) + '</span></p>' +
          '<h1 class="h-lg" style="margin-top:12px">' + kacir(v.baslik) + '</h1>' +
          (v.ozet ? '<p class="bilgi__ozet">' + kacir(v.ozet) + '</p>' : '') +
          bolumler + sss +
        '</div>' +

        '<aside class="bilgi__yan">' +
          '<div class="panel">' +
            '<h3 style="font-size:17px">Hızlı bilgiler</h3>' +
            '<div class="sum-row"><span>Ücretsiz kargo</span><b>' + para(kargo.ucretsizLimit) + ' üzeri</b></div>' +
            '<div class="sum-row"><span>Kargo ücreti</span><b>' + para(kargo.ucret) + '</b></div>' +
            '<div class="sum-row"><span>Teslim süresi</span><b>' + kacir(kargo.sure) + '</b></div>' +
            '<div class="sum-row"><span>İade süresi</span><b>30 gün</b></div>' +
            '<div class="sum-row"><span>Garanti</span><b>3 yıl</b></div>' +
          '</div>' +

          '<div class="panel" style="margin-top:14px">' +
            '<h3 style="font-size:17px">Yardım gerekirse</h3>' +
            '<p style="font-size:13.5px;color:var(--ink-2)">Sipariş numaranızla yazın, aynı gün dönüyoruz.</p>' +
            '<a class="btn btn--primary btn--block" style="margin-top:14px" href="' + A.waLink() + '" target="_blank" rel="noopener">' +
              I.whatsapp + ' WhatsApp’tan yaz</a>' +
            '<a class="btn btn--ghost btn--block btn--sm" style="margin-top:8px" href="mailto:' + kacir(ile.eposta) + '">' +
              kacir(ile.eposta) + '</a>' +
            '<p class="mono" style="margin-top:12px;font-size:11px;color:var(--ink-3)">' + kacir(ile.telefon) + '</p>' +
          '</div>' +

          '<div class="panel" style="margin-top:14px">' +
            '<h3 style="font-size:17px">Diğer sayfalar</h3>' +
            '<ul class="bilgi__nav">' + digerleri.map(function (x) {
              var s2 = Store.site.bilgiSayfalari[x.k];
              return '<li><a href="' + x.yol + '"' + (x.k === konu ? ' aria-current="page"' : '') + '>' +
                kacir(s2.baslik) + '</a></li>';
            }).join('') + '</ul>' +
          '</div>' +
        '</aside>' +
      '</div>';

    A.revealKur();
  }

  /* ============================================================
     HAKKIMIZDA
     ============================================================ */
  function hakkimizda() {
    hazir();
    var h = Store.site.hakkimizda;
    if (!h) { $('#hakkKok').innerHTML = ''; return; }

    // Sahnede gösterilecek iki gövde: fotoğraflı olanları tercih et
    var fotolu = Store.aktifUrunler().filter(function (u) { return Medya.fotoVar(u); });
    var sahne1 = fotolu[0] || Store.aktifUrunler()[0];
    var sahne2 = fotolu[1] || Store.aktifUrunler()[1] || sahne1;

    var wa = A.waLink();
    var yolCoz = function (y) { return y === 'whatsapp' ? wa : y; };
    var hedefCoz = function (y) { return y === 'whatsapp' ? ' target="_blank" rel="noopener"' : ''; };

    $('#hakkKok').innerHTML =
      /* ---- Giriş ---- */
      '<section class="hakk-hero">' +
        '<div class="wrap">' +
          '<p class="crumbs"><a href="index.html">Ana sayfa</a> / <span>Hakkımızda</span></p>' +
          '<span class="eyebrow" style="margin-top:16px">' + kacir(h.etiket) + '</span>' +
          '<h1>' + kacir(h.baslik) + ' <em class="grad-text">' + kacir(h.baslikVurgu) + '</em></h1>' +
          '<p class="hakk-hero__giris">' + kacir(h.girisMetni) + '</p>' +
        '</div>' +
      '</section>' +

      /* ---- Rakamlar ---- */
      '<section class="wrap">' +
        '<div class="hakk-rakamlar">' + (h.rakamlar || []).map(function (r) {
          return '<div class="hakk-rakam reveal"><b>' + kacir(r.sayi) + '</b>' +
            '<span>' + kacir(r.etiket) + '</span>' +
            '<small>' + kacir(r.aciklama) + '</small></div>';
        }).join('') + '</div>' +
      '</section>' +

      /* ---- Hikâye ---- */
      '<section class="section wrap">' +
        '<div class="split hakk-hikaye">' +
          '<div class="reveal">' +
            '<h2 class="h-lg">' + kacir(h.hikaye.baslik) + '</h2>' +
            (h.hikaye.paragraflar || []).map(function (x) {
              return '<p class="hakk-p">' + kacir(x) + '</p>';
            }).join('') +
            '<div class="hakk-imza">' +
              '<span class="avatar">' + kacir((h.hikaye.imzaAd || 'M')[0]) + '</span>' +
              '<span><b>' + kacir(h.hikaye.imzaAd) + '</b>' +
              '<small>' + kacir(h.hikaye.imzaRol) + '</small></span>' +
            '</div>' +
          '</div>' +
          '<div class="stage reveal" data-isik="acik" data-medya="' +
            (Medya.fotoVar(sahne1) ? 'foto' : 'svg') + '">' +
            Medya.render(sahne1, { glow: true, boyut: 'sahne' }) + '</div>' +
        '</div>' +
      '</section>' +

      /* ---- İlkeler ---- */
      '<section class="section section--tight wrap">' +
        '<div class="sec-head reveal"><div>' +
          '<span class="eyebrow">Nasıl çalışıyoruz</span>' +
          '<h2 class="h-lg">Dört ilke</h2>' +
        '</div></div>' +
        '<div class="hakk-ilkeler">' + (h.ilkeler || []).map(function (x, i) {
          return '<article class="hakk-ilke reveal">' +
            '<span class="hakk-ilke__no">' + ('0' + (i + 1)).slice(-2) + '</span>' +
            '<h3>' + kacir(x.baslik) + '</h3>' +
            '<p>' + kacir(x.metin) + '</p></article>';
        }).join('') + '</div>' +
      '</section>' +

      /* ---- Alıntı ---- */
      (h.alinti && h.alinti.metin
        ? '<section class="section section--tight wrap">' +
            '<blockquote class="hakk-alinti reveal">' +
              '<p>“' + kacir(h.alinti.metin) + '”</p>' +
              '<footer>' + kacir(h.alinti.kisi) + '</footer>' +
            '</blockquote></section>'
        : '') +

      /* ---- Zanaat ---- */
      '<section class="section section--tight wrap" id="zanaat">' +
        '<div class="split hakk-zanaat">' +
          '<div class="stage reveal" data-isik="acik" data-medya="' +
            (Medya.fotoVar(sahne2) ? 'foto' : 'svg') + '">' +
            Medya.render(sahne2, { glow: true, boyut: 'sahne' }) + '</div>' +
          '<div class="reveal">' +
            '<span class="eyebrow">Zanaat</span>' +
            '<h2 class="h-lg" style="margin-top:14px">Ne kullanıyoruz</h2>' +
            '<div class="steps-list">' + (h.zanaat || []).map(function (x) {
              return '<div class="step-row"><span class="step-row__no">' + I.ampul + '</span>' +
                '<div><h4>' + kacir(x.baslik) + '</h4><p>' + kacir(x.metin) + '</p></div></div>';
            }).join('') + '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---- Kapanış ---- */
      '<section class="section section--tight wrap">' +
        '<div class="newsletter reveal">' +
          '<span class="eyebrow">Atölye ziyareti</span>' +
          '<h2 class="h-lg">' + kacir(h.kapanis.baslik) + '</h2>' +
          '<p style="max-width:52ch;margin-inline:auto">' + kacir(h.kapanis.metin) + '</p>' +
          '<div class="hakk-kapanis-btn">' +
            '<a class="btn btn--white" href="' + yolCoz(h.kapanis.btn1.yol) + '"' + hedefCoz(h.kapanis.btn1.yol) + '>' +
              kacir(h.kapanis.btn1.ad) + '</a>' +
            '<a class="btn" href="' + yolCoz(h.kapanis.btn2.yol) + '">' + kacir(h.kapanis.btn2.ad) + ' ' + I.ok + '</a>' +
          '</div>' +
        '</div>' +
      '</section>';

    // Bu sayfadaki sahneler her zaman yanık kalır (anlatının parçası)
    A.revealKur();
  }

  /* ============================================================
     İLETİŞİM
     ============================================================ */
  function iletisim() {
    hazir();
    var ile = Store.site.iletisim, kargo = Store.site.kargo;

    $('#iletisimKok').innerHTML =
      '<div class="iletisim">' +
        '<div class="iletisim__sol">' +
          '<p class="crumbs"><a href="index.html">Ana sayfa</a> / <span>İletişim</span></p>' +
          '<span class="eyebrow" style="margin-top:14px">Bize ulaşın</span>' +
          '<h1 class="h-lg" style="margin-top:12px">Bir sorunuz mu var?</h1>' +
          '<p class="muted" style="margin-top:14px;max-width:48ch">' +
            'Sipariş öncesi ölçü, renk ve oda uyumu sorularına aynı gün dönüyoruz. ' +
            'Mevcut siparişiniz varsa numarasını yazmanız işi hızlandırır.</p>' +

          '<div class="iletisim__kanallar">' +
            '<a class="iletisim__kanal" href="' + A.waLink() + '" target="_blank" rel="noopener">' +
              '<span class="iletisim__ikon iletisim__ikon--wa">' + I.whatsapp + '</span>' +
              '<span><b>WhatsApp</b><small>En hızlı yol · hafta içi 09:00–19:00</small></span>' +
              '<span class="iletisim__ok">' + I.ok + '</span></a>' +
            '<a class="iletisim__kanal" href="tel:' + kacir(ile.telefon.replace(/\s/g, '')) + '">' +
              '<span class="iletisim__ikon">' + I.telefon + '</span>' +
              '<span><b>' + kacir(ile.telefon) + '</b><small>Atölye hattı</small></span>' +
              '<span class="iletisim__ok">' + I.ok + '</span></a>' +
            '<a class="iletisim__kanal" href="mailto:' + kacir(ile.eposta) + '">' +
              '<span class="iletisim__ikon">' + I.posta + '</span>' +
              '<span><b>' + kacir(ile.eposta) + '</b><small>24 saat içinde yanıt</small></span>' +
              '<span class="iletisim__ok">' + I.ok + '</span></a>' +
          '</div>' +

          '<div class="panel" style="margin-top:16px">' +
            '<h3 style="font-size:16px">Atölye</h3>' +
            '<p style="font-size:13.5px;color:var(--ink-2);margin-top:8px">' +
              kacir(Store.site.footer.adres) + '<br>Ziyaret randevuyla — WhatsApp’tan yazın.</p>' +
            '<div class="sum-row" style="margin-top:12px"><span>Kargo</span>' +
              '<b>' + kacir((kargo.firmalar || []).join(' · ')) + '</b></div>' +
            '<div class="sum-row"><span>Teslim</span><b>' + kacir(kargo.sure) + '</b></div>' +
          '</div>' +
        '</div>' +

        '<div class="iletisim__form panel">' +
          '<h3>Form bırakın</h3>' +
          '<p style="font-size:13px;color:var(--ink-3);margin:-8px 0 16px">Aynı gün dönüş yapıyoruz.</p>' +
          '<form class="form-grid" id="iletisimForm" novalidate>' +
            '<div class="field"><label for="i_ad">Ad Soyad</label>' +
              '<input id="i_ad" name="ad" required placeholder="Ayşe Yılmaz">' +
              '<span class="err" data-err="ad"></span></div>' +
            '<div class="field"><label for="i_tel">Telefon</label>' +
              '<input id="i_tel" name="tel" type="tel" required placeholder="0555 000 00 00">' +
              '<span class="err" data-err="tel"></span></div>' +
            '<div class="field field--full"><label for="i_eposta">E-posta</label>' +
              '<input id="i_eposta" name="eposta" type="email" required placeholder="ayse@ornek.com">' +
              '<span class="err" data-err="eposta"></span></div>' +
            '<div class="field field--full"><label for="i_konu">Konu</label>' +
              '<select id="i_konu" name="konu">' +
                '<option>Ürün ve ölçü sorusu</option>' +
                '<option>Sipariş durumu</option>' +
                '<option>İade / değişim</option>' +
                '<option>Garanti ve servis</option>' +
                '<option>Hediye kartı</option>' +
                '<option>Kurumsal / proje talebi</option>' +
              '</select></div>' +
            '<div class="field field--full"><label for="i_mesaj">Mesajınız</label>' +
              '<textarea id="i_mesaj" name="mesaj" rows="5" required ' +
              'placeholder="Odanızın büyüklüğünü ve hangi gövdeyi düşündüğünüzü yazarsanız daha iyi öneri verebiliriz."></textarea>' +
              '<span class="err" data-err="mesaj"></span></div>' +
            '<div class="field field--full">' +
              '<button class="btn btn--primary btn--block btn--lg" type="submit">Mesajı gönder ' + I.ok + '</button>' +
              '<p style="font-size:11.5px;color:var(--ink-3);margin-top:10px;text-align:center">' +
                'Form WhatsApp üzerinden iletilir — gönderdiğinizde hazır mesajla WhatsApp açılır.</p>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div>';

    $('#iletisimForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      $$('[required]', e.target).forEach(function (i) {
        var bos = !i.value.trim();
        var epostaHata = i.type === 'email' && i.value && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(i.value);
        var hata = bos ? 'Bu alan gerekli.' : (epostaHata ? 'Geçerli bir e-posta gir.' : '');
        i.setAttribute('aria-invalid', String(!!hata));
        var el = $('[data-err="' + i.name + '"]', e.target);
        if (el) el.textContent = hata;
        if (hata && ok) { i.focus(); ok = false; }
      });
      if (!ok) return;

      var f = new FormData(e.target);
      var mesaj = 'Merhaba, siteden yazıyorum.\n\n' +
        'Ad: ' + f.get('ad') + '\n' +
        'Telefon: ' + f.get('tel') + '\n' +
        'E-posta: ' + f.get('eposta') + '\n' +
        'Konu: ' + f.get('konu') + '\n\n' + f.get('mesaj');
      var no = (MUSH_CONFIG.whatsapp || '').replace(/\D/g, '');
      window.open('https://wa.me/' + no + '?text=' + encodeURIComponent(mesaj), '_blank', 'noopener');
      bildir('WhatsApp açılıyor — mesajınız hazır.');
      e.target.reset();
    });
  }

  g.Sayfalar = {
    home: home, shop: shop, product: product, cart: cart,
    login: login, account: account, odemeSonuc: odemeSonuc, bilgi: bilgi, hakkimizda: hakkimizda, iletisim: iletisim
  };
  g.durumAd = durumAd;
})(window);
