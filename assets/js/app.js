/* ============================================================
   LAMBAZADE — Çekirdek (ikonlar, header, footer, çekmece, kartlar)
   Sayfa denetleyicileri: pages.js
   ============================================================ */
(function (g) {
  'use strict';

  var C = g.MUSH_CONFIG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------- Biçim ---------------- */
  var TL = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 });
  function para(n) { return TL.format(n || 0); }
  function sayi(n) { return new Intl.NumberFormat('tr-TR').format(n || 0); }
  function tarih(iso) {
    try { return new Date(iso).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }); }
    catch (e) { return iso; }
  }
  function kacir(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------------- İkonlar ---------------- */
  var sv = function (d, f) {
    return '<svg viewBox="0 0 24 24" fill="' + (f || 'none') + '" stroke="' + (f ? 'none' : 'currentColor') +
      '" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
  };
  var I = {
    sepet: sv('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>'),
    kalp: sv('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>'),
    kalpDolu: sv('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>', 'currentColor'),
    ara: sv('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    menu: sv('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    kapat: sv('<path d="M6 6l12 12M18 6L6 18"/>'),
    ok: sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    okGeri: sv('<path d="M19 12H5M11 18l-6-6 6-6"/>'),
    yildiz: sv('<path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8z"/>', 'currentColor'),
    tik: sv('<path d="m5 13 4 4L19 7"/>'),
    ampul: sv('<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V18h8v-3.3A7 7 0 0 0 12 2z"/>'),
    ampulKapali: sv('<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V18h8v-3.3A7 7 0 0 0 12 2z"/><path d="M3 3l18 18"/>'),
    ay: sv('<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>'),
    gunes: sv('<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7"/>'),
    kargo: sv('<path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="1.8"/><circle cx="17" cy="19" r="1.8"/>'),
    kalkan: sv('<path d="M12 3l8 3v6c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>'),
    iade: sv('<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>'),
    bilgi: sv('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
    kullanici: sv('<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4S18.3 16.4 19.5 20"/>'),
    kutu: sv('<path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8M3 8l2-5h14l2 5H3zM12 3v5"/>'),
    konum: sv('<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>'),
    cikis: sv('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'),
    ayar: sv('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2 2 2 0 1 1-4 0 1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15a2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.5-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 4.6a2 2 0 1 1 4 0 1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 21 11a2 2 0 1 1 0 4z"/>'),
    telefon: sv('<path d="M21 16.9v2.5a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3 19.2 19.2 0 0 1-5.9-5.9 19.5 19.5 0 0 1-3-8.6A2 2 0 0 1 3.4 2H6a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 9.8a15.8 15.8 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z"/>'),
    posta: sv('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1l-.9 1.1c-.2.2-.4.2-.6.1a8.4 8.4 0 0 1-4-3.4c-.1-.2 0-.4.1-.6l.8-.9c.2-.2.1-.4 0-.7l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.6c-.2 0-.6.1-.9.4-.3.4-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.1.2 2.1 3.3 5.2 4.5 2.6 1 3.1.8 3.7.8.6-.1 1.9-.8 2.1-1.5.3-.8.3-1.4.2-1.5 0-.1-.2-.2-.5-.3zM12 22a9.9 9.9 0 0 1-5-1.4L3 22l1.4-4A9.9 9.9 0 0 1 12 2a10 10 0 0 1 0 20z"/></svg>',
    google: '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22 12.2c0-.8-.1-1.4-.2-2H12v3.9h5.6a4.8 4.8 0 0 1-2 3.2v2.6h3.3c1.9-1.8 3.1-4.4 3.1-7.7z"/><path fill="#34A853" d="M12 23c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2 1-3.4 1a6 6 0 0 1-5.6-4.1H3v2.7A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M6.4 14.9a6.6 6.6 0 0 1 0-4.2V8H3a11 11 0 0 0 0 9.9l3.4-3z"/><path fill="#EA4335" d="M12 5.4c1.5 0 2.8.5 3.8 1.5l2.9-2.9A11 11 0 0 0 3 8l3.4 2.7A6 6 0 0 1 12 5.4z"/></svg>',
    apple: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.3 12.7c0-2.4 1.9-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.9-1.5-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7 1.4 0 1.8.7 3 .7 1.2 0 2-1.1 2.8-2.2.6-.9.9-1.7 1.1-2.2-2.4-.9-2.3-3.5-2.3-3.6zM14.4 5.3c.6-.8 1-1.9.9-3-1 0-2.2.7-2.9 1.5-.6.7-1.1 1.8-1 2.9 1.1.1 2.3-.6 3-1.4z"/></svg>',
    grafik: sv('<path d="M3 20h18M7 20V10M12 20V4M17 20v-7"/>'),
    etiket: sv('<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 2.8 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.4 7.4a2 2 0 0 1 0 2.8z"/><path d="M7.5 7.5h.01"/>'),
    duzenle: sv('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
    cop: sv('<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>'),
    arti: sv('<path d="M12 5v14M5 12h14"/>'),
    atolye: sv('<path d="M3 21h18M5 21V10l7-5 7 5v11"/><path d="M10 21v-6h4v6"/>'),
    kart: sv('<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/><path d="M6 15h4"/>'),
    oynat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l11-6.8a1 1 0 0 0 0-1.72l-11-6.8A1 1 0 0 0 8 5.2z"/></svg>',
    kopya: sv('<rect x="9" y="9" width="12" height="12" rx="2.4"/><path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/>'),
    hediye: sv('<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12h18M12 8v13"/><path d="M12 8S10.5 3 8 4.5 9.5 8 12 8s4-.5 4-2.5S13.5 3 12 8z"/>')
  };

  /* ---------------- Bildirim ---------------- */
  function bildir(mesaj, tip) {
    var kap = $('.toasts');
    if (!kap) { kap = document.createElement('div'); kap.className = 'toasts'; document.body.appendChild(kap); }
    var t = document.createElement('div');
    t.className = 'toast' + (tip === 'hata' ? ' toast--hata' : '');
    t.setAttribute('role', 'status');
    t.innerHTML = (tip === 'hata' ? I.bilgi : I.tik) + '<span>' + mesaj + '</span>';
    kap.appendChild(t);
    setTimeout(function () {
      t.classList.add('out');
      setTimeout(function () { t.remove(); }, 380);
    }, 2800);
  }

  /* ---------------- Marka / WhatsApp ---------------- */
  function logoSvg() {
    // Yönetim panelinden bir logo dosyası tanımlandıysa onu kullan
    var m = Store.site.marka;
    if (m && m.logo) {
      var boy = 'height:' + (m.logoYuksekligi || 46) + 'px;width:auto';
      var html = '<img class="brand__logo brand__logo--acik" src="' + encodeURI(m.logo) +
        '" alt="' + kacir(m.ad) + '" style="' + boy + '">';
      // Koyu temada beyaz varyant (tanimliysa) devreye girer
      if (m.logoKoyu) {
        html += '<img class="brand__logo brand__logo--koyu" src="' + encodeURI(m.logoKoyu) +
          '" alt="" aria-hidden="true" style="' + boy + '">';
      }
      return html;
    }
    return '<svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true">' +
      '<defs><radialGradient id="mgl" cx=".5" cy=".34" r=".62">' +
      '<stop offset="0" stop-color="#ffd9a8"/><stop offset="1" stop-color="#ff6a13" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="mko" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#ff8f4d"/><stop offset="1" stop-color="#e85000"/></linearGradient></defs>' +
      '<circle cx="20" cy="15" r="15" fill="url(#mgl)"/>' +
      '<path d="M11 17h18l-4.5-10h-9z" fill="url(#mko)"/>' +
      '<path d="M20 17v15" stroke="#e85000" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M13 34h14" stroke="#e85000" stroke-width="2.4" stroke-linecap="round"/>' +
      '<ellipse cx="20" cy="17" rx="9" ry="1.8" fill="#ffb347"/></svg>';
  }

  function waLink() {
    var no = (C.whatsapp || '').replace(/\D/g, '');
    return 'https://wa.me/' + no + '?text=' + encodeURIComponent(C.whatsappMesaj || '');
  }

  function waKur() {
    if (document.body.dataset.page === 'admin') return;
    if (!Store.site.iletisim.whatsappAktif || $('.wa-fab')) return;
    var a = document.createElement('a');
    a.className = 'wa-fab';
    a.href = waLink();
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'WhatsApp ile yazın');
    a.innerHTML = '<i>' + I.whatsapp + '</i><span>WhatsApp’tan yaz</span>';
    document.body.appendChild(a);
  }

  /* ---------------- Header ---------------- */
  function headerKur() {
    var h = $('.site-head');
    if (!h) return;
    var s = Store.site, sayfa = document.body.dataset.page;
    var k = Auth.kullanici();

    var menu = s.header.menu.map(function (m) {
      var akt = (sayfa === 'shop' && m.yol.indexOf('shop.html') === 0 && location.search.indexOf(m.yol.split('?')[1] || '###') > -1) ||
                (sayfa === 'shop' && m.yol === 'shop.html' && !location.search);
      return '<a href="' + m.yol + '"' + (akt ? ' aria-current="page"' : '') + '>' + kacir(m.ad) + '</a>';
    }).join('');

    h.innerHTML =
      (s.duyuru.aktif ? '<div class="announce">' +
        (s.duyuru.link ? '<a href="' + s.duyuru.link + '">' + kacir(s.duyuru.metin) + '</a>' : kacir(s.duyuru.metin)) +
        '</div>' : '') +
      '<div class="head-bar"><div class="wrap head-in">' +
        '<a class="brand" href="index.html" aria-label="' + kacir(s.marka.ad) + ' ana sayfa">' + logoSvg() +
          (s.marka.logo ? '' :
            '<span class="brand__txt"><span class="brand__name">' + kacir(s.marka.ad) + '</span>' +
            '<span class="brand__sub">' + kacir(s.marka.slogan) + '</span></span>') + '</a>' +
        '<nav class="nav" id="nav">' + menu +
          (k ? '' : '<a href="login.html" class="nav-mobil">Giriş yap</a>') + '</nav>' +
        '<div class="head-tools">' +
          '<button class="icon-btn" id="temaBtn" aria-label="Temayı değiştir"></button>' +
          '<a class="icon-btn icon-btn--ara" href="shop.html" aria-label="Ürünlerde ara">' + I.ara + '</a>' +
          (k
            ? '<a class="head-user" href="' + (k.rol === 'admin' ? 'admin.html' : 'account.html') + '">' +
              '<span class="avatar">' + kacir((k.ad || 'M')[0].toUpperCase()) + '</span>' +
              '<span>' + kacir((k.ad || '').split(' ')[0]) + '</span></a>'
            : '<a class="icon-btn icon-btn--hesap" href="login.html" aria-label="Giriş yap">' + I.kullanici + '</a>') +
          '<button class="icon-btn" id="sepetBtn" aria-label="Sepeti aç">' + I.sepet +
            '<span class="cart-count" id="sepetSayi">0</span></button>' +
          '<button class="icon-btn burger" id="burger" aria-label="Menü" aria-expanded="false">' + I.menu + '</button>' +
        '</div>' +
      '</div></div>';

    var stuck = function () { h.classList.toggle('is-stuck', window.scrollY > 6); };
    stuck();
    window.addEventListener('scroll', stuck, { passive: true });

    var nav = $('#nav'), bg = $('#burger');
    bg.addEventListener('click', function () {
      var acik = nav.classList.toggle('open');
      bg.setAttribute('aria-expanded', String(acik));
      bg.innerHTML = acik ? I.kapat : I.menu;
    });
    var tb = $('#temaBtn');
    function temaCiz() {
      tb.innerHTML = document.documentElement.getAttribute('data-theme') === 'dark' ? I.gunes : I.ay;
    }
    temaCiz();
    tb.addEventListener('click', function () {
      var yeni = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', yeni);
      try { localStorage.setItem('lambazade.tema', yeni); } catch (e) {}
      temaCiz();
      // Tema değişimi BÜTÜN lambaları sıfırlar: koyu temada hepsi yanar,
      // açık temada hepsi söner. Tek tek yapılmış seçimler bu anda temizlenir;
      // ziyaretçi yeni temada istediği ürünü yine ayrı ayrı açıp kapatabilir.
      Isik.varsayilanaDon();
      isiklariTazele();   // bildirim gösterilmez — kullanıcı isteği
    });

    $('#sepetBtn').addEventListener('click', function () { cekmeceAc(true); });
    olcuGuncelle();
  }

  function olcuGuncelle() {
    var ann = $('.announce'), bar = $('.head-bar');
    document.documentElement.style.setProperty('--ann-h', (ann ? ann.offsetHeight : 0) + 'px');
    document.documentElement.style.setProperty('--head-h', (bar ? bar.offsetHeight : 70) + 'px');
  }

  /* ---------------- Footer ---------------- */
  function footerKur() {
    var f = $('.site-foot');
    if (!f) return;
    var s = Store.site;

    var sutunlar = s.footer.sutunlar.map(function (c) {
      return '<div><h5>' + kacir(c.baslik) + '</h5><ul>' + c.linkler.map(function (l) {
        var yol = l.yol === 'whatsapp' ? waLink() : l.yol;
        var hedef = l.yol === 'whatsapp' ? ' target="_blank" rel="noopener"' : '';
        return '<li><a href="' + yol + '"' + hedef + '>' + kacir(l.ad) + '</a></li>';
      }).join('') + '</ul></div>';
    }).join('');

    f.innerHTML = '<div class="wrap">' +
      '<div class="foot-grid">' +
        '<div>' +
          '<a class="brand" href="index.html">' + logoSvg() +
            (s.marka.logo ? '' :
              '<span class="brand__txt"><span class="brand__name">' + kacir(s.marka.ad) + '</span>' +
              '<span class="brand__sub">' + kacir(s.marka.slogan) + '</span></span>') + '</a>' +
          '<p class="muted" style="margin-top:14px;max-width:36ch;font-size:13.5px">' + kacir(s.footer.metin) + '</p>' +
          '<div class="foot-contact">' +
            '<a href="tel:' + kacir(s.iletisim.telefon.replace(/\s/g, '')) + '">' + I.telefon + kacir(s.iletisim.telefon) + '</a>' +
            '<a href="mailto:' + kacir(s.iletisim.eposta) + '">' + I.posta + kacir(s.iletisim.eposta) + '</a>' +
            '<a href="' + waLink() + '" target="_blank" rel="noopener">' + I.whatsapp + 'WhatsApp’tan yaz</a>' +
          '</div>' +
          '<p class="mono" style="margin-top:14px;font-size:11px;color:var(--ink-3)">' + kacir(s.footer.adres) + '</p>' +
        '</div>' + sutunlar +
      '</div>' +
      '<div class="foot-bottom">' +
        '<span>© ' + new Date().getFullYear() + ' ' + kacir(s.marka.ad) + ' — ' + kacir(s.footer.altMetin) + '</span>' +
        '<span class="foot-pay">Güvenli ödeme <span class="logo-iyzico">iyzico</span></span>' +
      '</div></div>';
  }

  /* ---------------- Sepet çekmecesi ---------------- */
  function cekmeceKur() {
    if ($('#cekmece')) return;
    var scrim = document.createElement('div');
    scrim.className = 'scrim'; scrim.id = 'scrim';
    var d = document.createElement('aside');
    d.className = 'drawer'; d.id = 'cekmece';
    d.setAttribute('aria-label', 'Sepet'); d.setAttribute('aria-hidden', 'true');
    d.innerHTML =
      '<div class="drawer__head"><h3>Sepetin</h3>' +
        '<button class="icon-btn" id="cekmeceKapat" aria-label="Kapat">' + I.kapat + '</button></div>' +
      '<div class="drawer__body" id="cekmeceGovde"></div>' +
      '<div class="drawer__foot" id="cekmeceAlt"></div>';
    document.body.appendChild(scrim);
    document.body.appendChild(d);
    scrim.addEventListener('click', function () { cekmeceAc(false); });
    $('#cekmeceKapat').addEventListener('click', function () { cekmeceAc(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cekmeceAc(false); });
    cekmeceCiz();
  }

  function cekmeceAc(ac) {
    var d = $('#cekmece'), s = $('#scrim');
    if (!d) return;
    d.classList.toggle('on', ac);
    s.classList.toggle('on', ac);
    d.setAttribute('aria-hidden', String(!ac));
    document.body.style.overflow = ac ? 'hidden' : '';
    if (ac) setTimeout(function () { var b = $('#cekmeceKapat'); if (b) b.focus(); }, 100);
  }

  function satirHTML(x) {
    return '<div class="line-item" data-id="' + x.urun.id + '">' +
      '<a class="line-item__art" href="product.html?id=' + x.urun.id + '" aria-hidden="true" tabindex="-1">' +
        Medya.render(x.urun, { glow: Isik.acikMi(x.urun.id), boyut: 'mini' }) + '</a>' +
      '<div><a href="product.html?id=' + x.urun.id + '"><h4>' + kacir(x.urun.ad) + '</h4></a>' +
        '<small>' + kacir(x.urun.renkAd) + ' · ' + kacir(x.urun.yukseklik) + '</small>' +
        '<div class="qty"><button data-act="eksi" aria-label="Azalt">–</button>' +
          '<span>' + x.adet + '</span><button data-act="arti" aria-label="Arttır">+</button></div></div>' +
      '<div class="line-item__right"><span class="price">' + para(x.tutar) + '</span>' +
        '<button class="x-btn" data-act="sil">Kaldır</button></div></div>';
  }

  function satirlariBagla(kap) {
    $$('.line-item', kap).forEach(function (el) {
      var id = el.dataset.id;
      el.addEventListener('click', function (e) {
        var b = e.target.closest('[data-act]');
        if (!b) return;
        var s = Sepet.satirlar.filter(function (x) { return x.id === id; })[0];
        if (!s) return;
        if (b.dataset.act === 'arti') Sepet.guncelle(id, s.adet + 1);
        if (b.dataset.act === 'eksi') Sepet.guncelle(id, s.adet - 1);
        if (b.dataset.act === 'sil') { Sepet.cikar(id); bildir('Ürün sepetten çıkarıldı.'); }
      });
    });
  }

  function cekmeceCiz() {
    var gov = $('#cekmeceGovde'), alt = $('#cekmeceAlt');
    if (!gov) return;
    var satirlar = Sepet.detayli();

    if (!satirlar.length) {
      gov.innerHTML = '<div class="empty">' + I.sepet +
        '<p style="font-weight:600;color:var(--ink)">Sepetin henüz boş</p>' +
        '<p style="margin-top:6px;font-size:13px">Bir ışık seçmeye ne dersin?</p></div>';
      alt.innerHTML = '<a class="btn btn--primary btn--block" href="shop.html">Lambalara göz at</a>';
      return;
    }

    var h = Sepet.hesap(), limit = Store.site.kargo.ucretsizLimit;
    var kalan = Math.max(0, limit - (h.araToplam - h.indirim));

    gov.innerHTML = satirlar.map(satirHTML).join('');
    alt.innerHTML =
      '<div class="ship-bar"><p>' +
        (kalan > 0 ? '<b>' + para(kalan) + '</b> daha ekle, kargo bizden.' : 'Ücretsiz kargo kazandın 🎉') +
        '</p><div class="ship-bar__track"><div class="ship-bar__fill" style="width:' +
        Math.min(100, ((h.araToplam - h.indirim) / limit) * 100) + '%"></div></div></div>' +
      '<div class="sum-row"><span>Ara toplam</span><span>' + para(h.araToplam) + '</span></div>' +
      (h.indirim ? '<div class="sum-row"><span>İndirim (' + kacir(Sepet.kupon.kod) + ')</span><span style="color:var(--brand-deep);font-weight:600">-' + para(h.indirim) + '</span></div>' : '') +
      '<div class="sum-row"><span>Kargo</span><span>' + (h.kargo ? para(h.kargo) : 'Ücretsiz') + '</span></div>' +
      (h.hediye ? '<div class="sum-row"><span>Hediye kartı</span>' +
        '<span style="color:var(--brand-deep);font-weight:600">-' + para(h.hediye) + '</span></div>' : '') +
      '<div class="sum-row sum-row--total"><span>Toplam</span><b>' + para(h.toplam) + '</b></div>' +
      '<a class="btn btn--primary btn--block" style="margin-top:14px" href="cart.html">Ödemeye geç ' + I.ok + '</a>' +
      '<button class="btn btn--ghost btn--block btn--sm" style="margin-top:7px" id="cekmeceBosalt">Sepeti boşalt</button>';

    satirlariBagla(gov);
    var bs = $('#cekmeceBosalt');
    if (bs) bs.addEventListener('click', function () { Sepet.bosalt(); bildir('Sepet boşaltıldı.'); });
  }

  function sayacCiz(patlat) {
    var el = $('#sepetSayi');
    if (!el) return;
    var n = Sepet.adetToplam();
    el.textContent = n;
    el.classList.toggle('on', n > 0);
    if (patlat && n > 0) { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }
  }

  /* ---------------- Ürün kartı ---------------- */
  function kartHTML(u) {
    var fav = Favori.var_mi(u.id);
    var isik = Isik.acikMi(u.id);
    var indirim = u.eskiFiyat ? Math.round((1 - u.fiyat / u.eskiFiyat) * 100) : 0;

    return '<article class="card reveal" data-id="' + u.id + '" data-isik="' + (isik ? 'acik' : 'kapali') +
      '" data-medya="' + (Medya.fotoVar(u) ? 'foto' : 'svg') + '">' +
      '<div class="card__badges">' +
        (u.etiket ? '<span class="badge badge--brand">' + kacir(u.etiket) + '</span>' : '') +
        (indirim ? '<span class="badge badge--indirim">%' + indirim + '</span>' : '') +
        (u.stok <= 3 ? '<span class="badge badge--stok">Son ' + u.stok + '</span>' : '') +
      '</div>' +
      '<div class="card__tools">' +
        '<button class="chip-btn chip-btn--isik' + (isik ? ' on' : '') + '" data-act="isik" ' +
          'aria-pressed="' + isik + '" title="Işığı aç / kapat" aria-label="Işığı aç veya kapat">' +
          (isik ? I.ampul : I.ampulKapali) + '</button>' +
        '<button class="chip-btn' + (fav ? ' on' : '') + '" data-act="fav" aria-pressed="' + fav + '" ' +
          'aria-label="Favorilere ekle">' + (fav ? I.kalpDolu : I.kalp) + '</button>' +
      '</div>' +
      '<a class="card__art" href="product.html?id=' + u.id + '" aria-label="' + kacir(u.ad) + ' detayları">' +
        Medya.render(u, { glow: isik, boyut: 'kart' }) + '</a>' +
      '<div class="card__quick"><button class="btn btn--primary btn--sm btn--block" data-act="ekle">Sepete ekle</button></div>' +
      '<div class="card__body">' +
        '<div class="card__meta"><span>' + kacir(Store.koleksiyonAd(u.koleksiyon)) + '</span>' +
          '<span class="rating">' + I.yildiz + (u.puan || 0).toFixed(1) + '</span></div>' +
        '<a href="product.html?id=' + u.id + '"><h3 class="card__title">' + kacir(u.ad) + '</h3></a>' +
        '<p class="card__sub">' + kacir(u.altbaslik) + '</p>' +
        '<div class="card__foot"><span class="price">' + para(u.fiyat) + '</span>' +
          (u.eskiFiyat ? '<span class="price--old">' + para(u.eskiFiyat) + '</span>' : '') +
          '<span class="swatches"><i class="swatch" style="background:' + kacir(u.palette.metal) + '"></i>' +
            '<i class="swatch" style="background:' + kacir(u.palette.shade) + '"></i></span></div>' +
        (taksitMetni(u.fiyat) ? '<span class="card__taksit">' + taksitMetni(u.fiyat) + '</span>' : '') +
      '</div></article>';
  }

  /* Kart içindeki butonları bağla (delege) */
  function kartlariBagla(kap) {
    if (!kap || kap.dataset.bagli) return;
    kap.dataset.bagli = '1';
    kap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var kart = b.closest('.card');
      if (!kart) return;
      var id = kart.dataset.id;
      e.preventDefault();

      if (b.dataset.act === 'ekle') {
        Sepet.ekle(id, 1);
        bildir('<b>' + kacir(Store.urunBul(id).ad) + '</b> sepete eklendi.');
        cekmeceAc(true);
      }
      if (b.dataset.act === 'fav') {
        var acik = Favori.degistir(id);
        b.classList.toggle('on', acik);
        b.setAttribute('aria-pressed', String(acik));
        b.innerHTML = acik ? I.kalpDolu : I.kalp;
        bildir(acik ? 'Favorilere eklendi.' : 'Favorilerden çıkarıldı.');
      }
      if (b.dataset.act === 'isik') {
        var yanik = Isik.degistir(id);
        kart.dataset.isik = yanik ? 'acik' : 'kapali';
        b.classList.toggle('on', yanik);
        b.setAttribute('aria-pressed', String(yanik));
        b.innerHTML = yanik ? I.ampul : I.ampulKapali;
        Medya.guncelle($('.card__art', kart), Store.urunBul(id), yanik, { boyut: 'kart' });
        // Işık değişimi için bildirim gösterilmiyor
      }
    });
  }


  /* ---------------- Karşılama indirimi ---------------- */
  function karsilamaKur() {
    var k = Store.site.karsilama;
    if (!k || !k.aktif) return;
    if (document.body.dataset.page === 'admin') return;
    try { if (localStorage.getItem('lambazade.karsilama.v1')) return; } catch (e) {}

    var urun = Store.urunBul(k.urunId) || Store.aktifUrunler()[0];

    setTimeout(function () {
      var scrim = document.createElement('div');
      scrim.className = 'kars-scrim';
      scrim.innerHTML =
        '<div class="kars" role="dialog" aria-modal="true" aria-labelledby="karsBaslik">' +

          // Tam kanamalı fotoğraf + sıcak ışık perdesi
          '<div class="kars__zemin" data-isik="acik">' +
            Medya.render(urun, { glow: true, boyut: 'sahne' }) +
          '</div>' +
          '<div class="kars__perde"></div>' +

          '<button class="kars__x" aria-label="Kapat">' + I.kapat + '</button>' +

          '<div class="kars__ic">' +
            '<span class="kars__etiket">' + kacir(k.etiket) + '</span>' +

            '<div class="kars__oran"><span>' + kacir(k.oran) + '</span>' +
              '<em>indirim</em></div>' +

            '<h3 id="karsBaslik">' + kacir(k.baslik) + '</h3>' +
            '<p>' + kacir(k.metin) + '</p>' +

            '<button class="kars__kod" id="karsKod">' +
              '<span class="kars__kod-et">Kupon kodu</span>' +
              '<span class="kars__kod-no">' + kacir(k.kod) + '</span>' +
              '<span class="kars__kod-ikon" aria-hidden="true">' + I.kopya + '</span>' +
              '<span class="sr">Kodu kopyala</span>' +
            '</button>' +

            '<a class="kars__btn" href="' + kacir(k.btnYol) + '">' +
              '<span>' + kacir(k.btnAd) + '</span>' + I.ok + '</a>' +

            '<button class="kars__gec">' + kacir(k.kapatYazi) + '</button>' +
          '</div>' +
        '</div>';

      document.body.appendChild(scrim);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { scrim.classList.add('on'); });

      function kapat() {
        scrim.classList.remove('on');
        document.body.style.overflow = '';
        try { localStorage.setItem('lambazade.karsilama.v1', '1'); } catch (e) {}
        setTimeout(function () { scrim.remove(); }, 420);
        document.removeEventListener('keydown', esc);
      }
      function esc(e) { if (e.key === 'Escape') kapat(); }

      $('.kars__x', scrim).addEventListener('click', kapat);
      $('.kars__gec', scrim).addEventListener('click', kapat);
      scrim.addEventListener('click', function (e) { if (e.target === scrim) kapat(); });
      document.addEventListener('keydown', esc);

      var kodBtn = $('#karsKod', scrim);
      kodBtn.addEventListener('click', async function () {
        var ok = false;
        try { await navigator.clipboard.writeText(k.kod); ok = true; } catch (e) {}
        Sepet.kuponUygula(k.kod);
        kodBtn.classList.add('kopyalandi');
        $('.kars__kod-et', kodBtn).textContent = ok ? 'Kopyalandı ve sepete uygulandı' : 'Sepete uygulandı';
        $('.kars__kod-ikon', kodBtn).innerHTML = I.tik;
      });

      setTimeout(function () { $('.kars__x', scrim).focus(); }, 420);
    }, k.gecikmeMs || 1600);
  }

  /* ---------------- Taksit ---------------- */
  function taksitMetni(tutar) {
    var o = Store.site.odeme;
    if (!o || !o.taksitAktif || !tutar) return '';
    var n = o.vadeFarksizMax || 6;
    return n + ' taksit × ' + para(Math.round(tutar / n));
  }

  /* ---------------- Isiklari yeniden hesapla (tema degisimi) ---------------- */
  function isiklariTazele() {
    $$('.card[data-id]').forEach(function (kart) {
      var u = Store.urunBul(kart.dataset.id);
      if (!u) return;
      var on = Isik.acikMi(u.id);
      kart.dataset.isik = on ? 'acik' : 'kapali';
      var b = $('[data-act="isik"]', kart);
      if (b) {
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', String(on));
        b.innerHTML = on ? I.ampul : I.ampulKapali;
      }
      Medya.guncelle($('.card__art', kart), u, on, { boyut: 'kart' });
    });
    // Hero ve urun detay sayfasi kendi sahnesini tazeler
    document.dispatchEvent(new CustomEvent('isik:tazele'));
  }

  /* ---------------- Scroll reveal ---------------- */
  var gozlemci = null;
  function revealKur() {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach(function (el) { el.classList.add('in'); });
      return;
    }
    if (!gozlemci) {
      gozlemci = new IntersectionObserver(function (girdiler) {
        girdiler.forEach(function (gg, i) {
          if (!gg.isIntersecting) return;
          var el = gg.target;
          setTimeout(function () { el.classList.add('in'); }, Math.min(i * 55, 300));
          gozlemci.unobserve(el);
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: .05 });
    }
    $$('.reveal:not(.in)').forEach(function (el) { gozlemci.observe(el); });
  }

  /* ---------------- Tema: admin renginden tüm skalayı türet ---------------- */
  function temaUygula() {
    var t = Store.site.tema;
    var kok = document.documentElement.style;
    if (!t || !t.anaRenk) return;
    var ana = t.anaRenk;
    var koyu = t.anaRenkKoyu || LampArt.shade(ana, -22);

    // Açıktan koyuya tam turuncu skala
    kok.setProperty('--m-50', LampArt.shade(ana, 92));
    kok.setProperty('--m-100', LampArt.shade(ana, 82));
    kok.setProperty('--m-200', LampArt.shade(ana, 62));
    kok.setProperty('--m-300', LampArt.shade(ana, 40));
    kok.setProperty('--m-400', LampArt.shade(ana, 20));
    kok.setProperty('--m-500', ana);
    kok.setProperty('--m-600', koyu);
    kok.setProperty('--m-700', LampArt.shade(koyu, -22));
    kok.setProperty('--brand', ana);
    kok.setProperty('--brand-deep', koyu);
    if (t.kose) kok.setProperty('--r-lg', t.kose + 'px');

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', ana);
  }

  /* ---------------- Tema (erken) ---------------- */
  try {
    var t = localStorage.getItem('lambazade.tema');
    if (t) document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}

  /* ---------------- Başlat ---------------- */
  async function baslat() {
    await Auth.baslat();

    temaUygula();

    headerKur();
    footerKur();
    cekmeceKur();
    waKur();
    karsilamaKur();
    sayacCiz(false);

    document.addEventListener('sepet:degisti', function () { sayacCiz(true); cekmeceCiz(); });
    document.addEventListener('oturum:degisti', function () { headerKur(); });
    window.addEventListener('resize', olcuGuncelle);

    var sayfa = document.body.dataset.page;
    if (g.Sayfalar && g.Sayfalar[sayfa]) g.Sayfalar[sayfa]();

    revealKur();
  }

  /* Dışa açılan yardımcılar (pages.js ve admin.js kullanır) */
  g.App = {
    $: $, $$: $$, I: I, para: para, sayi: sayi, tarih: tarih, kacir: kacir,
    bildir: bildir, kartHTML: kartHTML, kartlariBagla: kartlariBagla,
    satirHTML: satirHTML, satirlariBagla: satirlariBagla,
    cekmeceAc: cekmeceAc, revealKur: revealKur, waLink: waLink, logoSvg: logoSvg,
    headerKur: headerKur, temaUygula: temaUygula, isiklariTazele: isiklariTazele, taksitMetni: taksitMetni
  };

  document.addEventListener('DOMContentLoaded', function () {
    baslat().catch(function (e) { console.error(e); });
  });
})(window);
