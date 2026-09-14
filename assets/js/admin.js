/* ============================================================
   MUSH — Yönetim paneli
   Sitedeki her şey buradan düzenlenir: ürün, kampanya, sipariş,
   header, footer, ana sayfa bölümleri, tema, ayarlar.
   ============================================================ */
(function (g) {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var I, para, kacir, bildir, tarih, sayi;

  var sekmeler = [
    { grup: 'Genel' },
    { id: 'gosterge', ad: 'Gösterge', ikon: 'grafik' },
    { id: 'siparisler', ad: 'Siparişler', ikon: 'kutu' },
    { grup: 'Katalog' },
    { id: 'urunler', ad: 'Ürünler', ikon: 'ampul' },
    { id: 'koleksiyonlar', ad: 'Koleksiyonlar', ikon: 'etiket' },
    { id: 'kampanyalar', ad: 'Kampanyalar', ikon: 'etiket' },
    { grup: 'Görünüm' },
    { id: 'anasayfa', ad: 'Ana sayfa', ikon: 'duzenle' },
    { id: 'header', ad: 'Header & duyuru', ikon: 'menu' },
    { id: 'footer', ad: 'Footer', ikon: 'menu' },
    { id: 'hakkimizda', ad: 'Hakkımızda', ikon: 'kullanici' },
    { id: 'bilgi', ad: 'Bilgi sayfaları', ikon: 'bilgi' },
    { id: 'tema', ad: 'Tema & renkler', ikon: 'gunes' },
    { grup: 'Sistem' },
    { id: 'ayarlar', ad: 'Ayarlar', ikon: 'ayar' },
    { id: 'yedek', ad: 'Yedek & sıfırla', ikon: 'iade' }
  ];

  var aktif = (location.hash || '#gosterge').slice(1);
  var kirli = false;

  /* ---------------- yardımcılar ---------------- */
  function f(etiket, deger, yol, tip, ipucu, tam) {
    var t = tip || 'text';
    if (t === 'textarea') {
      return '<div class="ad-f' + (tam ? ' ad-f--full' : '') + '"><label>' + etiket + '</label>' +
        '<textarea data-yol="' + yol + '">' + kacir(deger == null ? '' : deger) + '</textarea>' +
        (ipucu ? '<small>' + ipucu + '</small>' : '') + '</div>';
    }
    return '<div class="ad-f' + (tam ? ' ad-f--full' : '') + '"><label>' + etiket + '</label>' +
      '<input type="' + t + '" data-yol="' + yol + '" value="' + kacir(deger == null ? '' : deger) + '">' +
      (ipucu ? '<small>' + ipucu + '</small>' : '') + '</div>';
  }

  function anahtar(etiket, deger, yol) {
    return '<label class="ad-switch"><input type="checkbox" data-yol="' + yol + '"' +
      (deger ? ' checked' : '') + '><span>' + etiket + '</span></label>';
  }

  function yolAl(nesne, yol) {
    return yol.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, nesne);
  }
  function yolYaz(nesne, yol, deger) {
    var p = yol.split('.'), son = p.pop();
    var hedef = p.reduce(function (o, k) {
      if (o[k] == null) o[k] = {};
      return o[k];
    }, nesne);
    hedef[son] = deger;
  }

  /* Form alanlarını Store.site'a yaz */
  function formuTopla(kap) {
    $$('[data-yol]', kap).forEach(function (el) {
      var yol = el.dataset.yol;
      var deger;
      if (el.type === 'checkbox') deger = el.checked;
      else if (el.type === 'number' || el.type === 'range') deger = Number(el.value);
      else deger = el.value;
      yolYaz(Store.site, yol, deger);
    });
  }

  function kaydetBar(mesaj) {
    return '<div class="ad-kaydet-bar"><span>' + (mesaj || 'Değişiklikler henüz kaydedilmedi.') + '</span>' +
      '<button class="btn btn--sm" id="kaydetBtn">Kaydet ve yayınla</button></div>';
  }

  function kaydetBagla(kap, sonra) {
    var b = $('#kaydetBtn');
    if (!b) return;
    b.addEventListener('click', function () {
      formuTopla(kap);
      Store.kaydet();
      bildir('Kaydedildi ve siteye yansıdı.');
      kirli = false;
      if (sonra) sonra();
    });
    kap.addEventListener('input', function () { kirli = true; });
  }

  /* ============================================================
     GÖSTERGE
     ============================================================ */
  function gosterge() {
    var sip = Store.siparisler;
    var ciro = sip.filter(function (s) { return s.durum !== 'iptal'; })
      .reduce(function (a, s) { return a + s.toplam; }, 0);
    var stokAzalan = Store.urunler.filter(function (u) { return u.stok <= 3; });
    var pasif = Store.urunler.filter(function (u) { return u.aktif === false; }).length;

    var kutu = function (ikon, etiket, deger, alt) {
      return '<div class="ad-stat"><span>' + I[ikon] + etiket + '</span><b>' + deger + '</b>' +
        (alt ? '<small>' + alt + '</small>' : '') + '</div>';
    };

    return '<div class="ad-stats">' +
        kutu('kutu', 'Sipariş', sip.length, sip.filter(function (s) { return s.durum === 'hazirlaniyor'; }).length + ' hazırlanıyor') +
        kutu('grafik', 'Ciro', para(ciro), 'iptaller hariç') +
        kutu('ampul', 'Ürün', Store.urunler.length, pasif ? pasif + ' pasif' : 'hepsi yayında') +
        kutu('etiket', 'Kampanya', Store.kampanyalar.filter(function (k) { return k.aktif; }).length + ' aktif',
          Store.kampanyalar.length + ' tanımlı') +
      '</div>' +

      '<div class="ad-kart"><h3>Son siparişler</h3><p>Detay ve durum değişikliği için Siparişler sekmesine geçin.</p>' +
        (sip.length ? '<div class="ad-tablo-sarma"><table class="ad-tablo"><thead><tr>' +
          '<th>No</th><th>Tarih</th><th>Müşteri</th><th>Durum</th><th class="sag">Tutar</th></tr></thead><tbody>' +
          sip.slice(0, 6).map(function (s) {
            return '<tr><td class="mono">' + kacir(s.no) + '</td><td>' + tarih(s.tarih) + '</td>' +
              '<td>' + kacir((s.musteri && s.musteri.ad) || '—') + '</td>' +
              '<td><span class="durum durum--' + kacir(s.durum) + '">' + g.durumAd(s.durum) + '</span></td>' +
              '<td class="sag"><b>' + para(s.toplam) + '</b></td></tr>';
          }).join('') + '</tbody></table></div>'
          : '<p class="muted" style="font-size:13.5px">Henüz sipariş yok. Vitrinden bir sipariş oluşturup burada görebilirsiniz.</p>') +
      '</div>' +

      (stokAzalan.length ? '<div class="ad-kart"><h3>Stok uyarısı</h3><p>3 adet ve altındaki ürünler.</p>' +
        '<div class="ad-tablo-sarma"><table class="ad-tablo"><thead><tr><th>Ürün</th><th>Stok</th><th class="sag">Fiyat</th></tr></thead><tbody>' +
        stokAzalan.map(function (u) {
          return '<tr><td><div class="ad-urun-ad"><span class="ad-mini-art">' +
            Medya.render(u, { glow: true, boyut: 'mini' }) + '</span><span><b>' + kacir(u.ad) + '</b>' +
            '<small>' + kacir(u.altbaslik) + '</small></span></div></td>' +
            '<td><span class="ad-rozet ad-rozet--uyari">' + u.stok + ' adet</span></td>' +
            '<td class="sag">' + para(u.fiyat) + '</td></tr>';
        }).join('') + '</tbody></table></div></div>' : '') +

      (Store.hediyeKartlari.length ? '<div class="ad-kart"><h3>Hediye kartları</h3>' +
        '<p>Satılan kartlar ve kalan bakiyeleri.</p>' +
        '<div class="ad-tablo-sarma"><table class="ad-tablo"><thead><tr>' +
        '<th>Numara</th><th>Tarih</th><th>Alıcı</th><th>Tutar</th><th>Kalan</th><th>Durum</th></tr></thead><tbody>' +
        Store.hediyeKartlari.slice(0, 12).map(function (k) {
          return '<tr><td class="mono">' + kacir(k.kod) + '</td><td>' + tarih(k.tarih) + '</td>' +
            '<td>' + kacir(k.alici || '—') + '</td><td>' + para(k.tutar) + '</td>' +
            '<td><b>' + para(k.kalan) + '</b></td>' +
            '<td><span class="ad-rozet ad-rozet--' + (k.kalan > 0 ? 'ok">Kullanılabilir' : 'kapali">Tükendi') +
            '</span></td></tr>';
        }).join('') + '</tbody></table></div></div>' : '') +

      '<div class="ad-kart"><h3>Canlı önizleme</h3><p>Yaptığınız değişiklikler kaydedildikten sonra burada görünür.</p>' +
        '<div class="ad-onizleme"><div class="ad-onizleme__bar"><i></i><i></i><i></i>' +
          '<span>index.html</span><a class="link-u" style="margin-left:auto;font-size:12px" href="index.html" target="_blank">Yeni sekmede aç</a></div>' +
          '<iframe src="index.html" title="Site önizlemesi" loading="lazy"></iframe></div></div>';
  }

  /* ============================================================
     SİPARİŞLER
     ============================================================ */
  function siparisler() {
    var sip = Store.siparisler;
    if (!sip.length) {
      return '<div class="ad-kart"><h3>Sipariş yok</h3>' +
        '<p>Vitrinde bir sipariş tamamlandığında burada listelenir ve durumunu değiştirebilirsiniz.</p></div>';
    }
    var durumlar = ['odemeBekliyor', 'hazirlaniyor', 'kargoda', 'teslim', 'iptal'];
    return '<div class="ad-kart"><h3>Siparişler</h3><p>Durum değişikliği anında kaydedilir.</p>' +
      '<div class="ad-tablo-sarma"><table class="ad-tablo"><thead><tr>' +
      '<th>No</th><th>Tarih</th><th>Müşteri</th><th>Ürünler</th><th>Durum</th><th class="sag">Tutar</th></tr></thead><tbody>' +
      sip.map(function (s) {
        return '<tr><td class="mono">' + kacir(s.no) + '</td><td>' + tarih(s.tarih) + '</td>' +
          '<td><b>' + kacir((s.musteri && s.musteri.ad) || '—') + '</b><small style="display:block;color:var(--ink-3)">' +
            kacir((s.musteri && s.musteri.telefon) || '') + '</small></td>' +
          '<td style="font-size:12.5px">' + s.urunler.map(function (u) { return u.adet + '× ' + kacir(u.ad); }).join('<br>') + '</td>' +
          '<td><select class="select" data-sip="' + kacir(s.no) + '" style="padding:7px 30px 7px 12px;font-size:12.5px">' +
            durumlar.map(function (d) {
              return '<option value="' + d + '"' + (s.durum === d ? ' selected' : '') + '>' + g.durumAd(d) + '</option>';
            }).join('') + '</select></td>' +
          '<td class="sag"><b>' + para(s.toplam) + '</b>' +
            (s.kupon ? '<small style="display:block;color:var(--brand-deep)">' + kacir(s.kupon) + '</small>' : '') + '</td></tr>';
      }).join('') + '</tbody></table></div></div>';
  }

  function siparisBagla() {
    $$('[data-sip]').forEach(function (s) {
      s.addEventListener('change', function () {
        Store.siparisDurum(s.dataset.sip, s.value);
        bildir('Sipariş durumu güncellendi.');
      });
    });
  }

  /* ============================================================
     ÜRÜNLER
     ============================================================ */
  function urunler() {
    return '<div class="ad-kart">' +
      '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px">' +
        '<div><h3 style="margin:0">Ürünler</h3><p style="margin:4px 0 0">' + Store.urunler.length + ' kayıt</p></div>' +
        '<button class="btn btn--primary btn--sm" id="urunEkle" style="margin-left:auto">' + I.arti + ' Yeni ürün</button>' +
      '</div>' +
      '<div class="ad-tablo-sarma"><table class="ad-tablo"><thead><tr>' +
      '<th>Ürün</th><th>Koleksiyon</th><th>Fiyat</th><th>Stok</th><th>Durum</th><th class="sag">İşlem</th></tr></thead><tbody>' +
      Store.urunler.map(function (u) {
        return '<tr><td><div class="ad-urun-ad"><span class="ad-mini-art">' +
            Medya.render(u, { glow: true, boyut: 'mini' }) + '</span><span><b>' + kacir(u.ad) + '</b>' +
            '<small>' + kacir(u.altbaslik) + '</small></span></div></td>' +
          '<td>' + kacir(Store.koleksiyonAd(u.koleksiyon)) + '</td>' +
          '<td><b>' + para(u.fiyat) + '</b>' + (u.eskiFiyat ? '<small style="display:block;color:var(--ink-3);text-decoration:line-through">' + para(u.eskiFiyat) + '</small>' : '') + '</td>' +
          '<td>' + u.stok + '</td>' +
          '<td><span class="ad-rozet ad-rozet--' + (u.aktif === false ? 'kapali' : 'ok') + '">' +
            (u.aktif === false ? 'Pasif' : 'Yayında') + '</span>' +
            (u.oneCikan ? ' <span class="ad-rozet ad-rozet--uyari">Öne çıkan</span>' : '') + '</td>' +
          '<td class="sag"><button class="ad-ikon-btn" data-duzenle="' + u.id + '" title="Düzenle">' + I.duzenle + '</button> ' +
            '<button class="ad-ikon-btn ad-ikon-btn--sil" data-sil="' + u.id + '" title="Sil">' + I.cop + '</button></td></tr>';
      }).join('') + '</tbody></table></div></div>';
  }

  function urunBagla() {
    $('#urunEkle').addEventListener('click', function () { urunModal(null); });
    $$('[data-duzenle]').forEach(function (b) {
      b.addEventListener('click', function () { urunModal(Store.urunBul(b.dataset.duzenle)); });
    });
    $$('[data-sil]').forEach(function (b) {
      b.addEventListener('click', function () {
        var u = Store.urunBul(b.dataset.sil);
        if (!confirm('"' + u.ad + '" ürününü kalıcı olarak silmek istiyor musunuz?')) return;
        Store.urunSil(u.id);
        bildir('Ürün silindi.');
        ciz();
      });
    });
  }

  function urunModal(u) {
    var yeni = !u;
    u = u || {
      id: '', ad: '', altbaslik: '', fiyat: 5000, eskiFiyat: '', stok: 10,
      type: 'cone', koleksiyon: Store.koleksiyonlar[0].slug, renk: Store.renkler[0].slug,
      renkAd: '', etiket: '', aktif: true, oneCikan: false, puan: 4.8, yorum: 0,
      malzeme: '', ampul: 'E27 · maks. 1×12W LED', yukseklik: '', abajur: '',
      aciklama: '', detay: [],
      palette: { metal: '#b9a37c', shade: '#f2ead9', glow: '#ffb347' },
      gorseller: null
    };

    var scrim = document.createElement('div');
    scrim.className = 'ad-modal-scrim';
    scrim.innerHTML = '<div class="ad-modal"><div class="ad-modal__head">' +
        '<h3>' + (yeni ? 'Yeni ürün' : kacir(u.ad) + ' düzenle') + '</h3>' +
        '<button class="ad-ikon-btn" id="modalKapat">' + I.kapat + '</button></div>' +
      '<div class="ad-modal__body">' +
        '<div class="ad-grid">' +
          '<div class="ad-f"><label>Ürün adı</label><input id="m_ad" value="' + kacir(u.ad) + '"></div>' +
          '<div class="ad-f"><label>Kısa açıklama</label><input id="m_alt" value="' + kacir(u.altbaslik) + '"></div>' +
          '<div class="ad-f"><label>Fiyat (₺)</label><input id="m_fiyat" type="number" min="0" value="' + u.fiyat + '"></div>' +
          '<div class="ad-f"><label>Eski fiyat (indirim için)</label><input id="m_eski" type="number" min="0" value="' + (u.eskiFiyat || '') + '"></div>' +
          '<div class="ad-f"><label>Stok</label><input id="m_stok" type="number" min="0" value="' + u.stok + '"></div>' +
          '<div class="ad-f"><label>Etiket (Yeni, İndirim…)</label><input id="m_etiket" value="' + kacir(u.etiket || '') + '"></div>' +
          '<div class="ad-f"><label>Koleksiyon</label><select id="m_kol">' +
            Store.koleksiyonlar.map(function (k) {
              return '<option value="' + k.slug + '"' + (u.koleksiyon === k.slug ? ' selected' : '') + '>' + kacir(k.ad) + '</option>';
            }).join('') + '</select></div>' +
          '<div class="ad-f"><label>Gövde tipi (görsel)</label><select id="m_tip">' +
            LampArt.shapes.map(function (t) {
              var adlar = { cone: 'Konik abajur', globe: 'Küre', arc: 'Ark', tripod: 'Üçayak', cylinder: 'Silindir', tiered: 'Katmanlı', cluster: 'Çoklu küre', lantern: 'Fener' };
              return '<option value="' + t + '"' + (u.type === t ? ' selected' : '') + '>' + (adlar[t] || t) + '</option>';
            }).join('') + '</select></div>' +
          '<div class="ad-f"><label>Renk grubu (filtre)</label><select id="m_renk">' +
            Store.renkler.map(function (r) {
              return '<option value="' + r.slug + '"' + (u.renk === r.slug ? ' selected' : '') + '>' + kacir(r.ad) + '</option>';
            }).join('') + '</select></div>' +
          '<div class="ad-f"><label>Finiş adı</label><input id="m_renkad" value="' + kacir(u.renkAd || '') + '"></div>' +
          '<div class="ad-f"><label>Yükseklik</label><input id="m_yuk" value="' + kacir(u.yukseklik || '') + '"></div>' +
          '<div class="ad-f"><label>Abajur ölçüsü</label><input id="m_abajur" value="' + kacir(u.abajur || '') + '"></div>' +
          '<div class="ad-f"><label>Ampul</label><input id="m_ampul" value="' + kacir(u.ampul || '') + '"></div>' +
          '<div class="ad-f"><label>Malzeme</label><input id="m_malzeme" value="' + kacir(u.malzeme || '') + '"></div>' +
          '<div class="ad-f"><label>Puan (0-5)</label><input id="m_puan" type="number" step="0.1" min="0" max="5" value="' + (u.puan || 0) + '"></div>' +
          '<div class="ad-f"><label>Yorum sayısı</label><input id="m_yorum" type="number" min="0" value="' + (u.yorum || 0) + '"></div>' +
          '<div class="ad-f ad-f--full"><label>Açıklama</label><textarea id="m_aciklama">' + kacir(u.aciklama || '') + '</textarea></div>' +
          '<div class="ad-f ad-f--full"><label>Öne çıkan maddeler (her satır bir madde)</label>' +
            '<textarea id="m_detay">' + kacir((u.detay || []).join('\n')) + '</textarea></div>' +
          '<div class="ad-f ad-f--full" style="border-top:1px solid var(--line);padding-top:14px;margin-top:4px">' +
            '<label style="font-size:13px">Fotoğraflar <small style="font-weight:400">— boş bırakırsanız SVG çizim kullanılır</small></label></div>' +
          '<div class="ad-f"><label>Işık KAPALI fotoğrafı</label>' +
            '<input id="m_gk" value="' + kacir((u.gorseller && u.gorseller.kapali) || '') + '" ' +
            'placeholder="product/class1/light.jpg"></div>' +
          '<div class="ad-f"><label>Işık AÇIK fotoğrafı</label>' +
            '<input id="m_ga" value="' + kacir((u.gorseller && u.gorseller.acik) || '') + '" ' +
            'placeholder="product/class1/dark.webp"></div>' +
          '<div class="ad-f ad-f--full"><label>Galeri — yakın çekimler (her satır bir dosya yolu)</label>' +
            '<textarea id="m_gg">' + kacir(((u.gorseller && u.gorseller.galeri) || []).join('\n')) + '</textarea>' +
            '<small>Dosyaları <code>product/</code> klasörüne koyup yolunu buraya yazın.</small></div>' +
          '<div class="ad-f"><label>Metal rengi</label><input id="m_pm" type="color" value="' + u.palette.metal + '"></div>' +
          '<div class="ad-f"><label>Abajur rengi</label><input id="m_ps" type="color" value="' + u.palette.shade + '"></div>' +
          '<div class="ad-f"><label>Işık rengi</label><input id="m_pg" type="color" value="' + u.palette.glow + '"></div>' +
          '<div class="ad-f"><label>Görsel önizleme</label>' +
            '<div class="ad-onizleme" style="display:grid;place-items:center;padding:10px;min-height:180px" id="m_onizleme"></div></div>' +
          '<div class="ad-f ad-f--full">' + anahtar('Yayında (sitede görünsün)', u.aktif !== false, '_') +
            anahtar('Ana sayfada öne çıkar', !!u.oneCikan, '_') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="ad-modal__foot">' +
        '<button class="btn btn--ghost btn--sm" id="modalIptal">İptal</button>' +
        '<button class="btn btn--primary btn--sm" id="modalKaydet">' + (yeni ? 'Ürünü ekle' : 'Değişiklikleri kaydet') + '</button>' +
      '</div></div>';

    document.body.appendChild(scrim);
    document.body.style.overflow = 'hidden';

    var anahtarlar = $$('.ad-switch input', scrim);
    var swAktif = anahtarlar[0], swOne = anahtarlar[1];

    function onizle() {
      var kapali = $('#m_gk', scrim).value.trim();
      var acik = $('#m_ga', scrim).value.trim() || kapali;
      var kap = $('#m_onizleme', scrim);
      if (kapali) {
        kap.innerHTML = '';
        var img = document.createElement('img');
        img.alt = 'Önizleme';
        img.style.cssText = 'max-height:170px;width:auto;border-radius:8px';
        img.onerror = function () {
          var not = document.createElement('small');
          not.style.color = '#c81d43';
          not.textContent = 'Görsel bulunamadı: ' + acik;
          img.replaceWith(not);
        };
        img.src = encodeURI(acik);
        kap.appendChild(img);
        return;
      }
      kap.innerHTML = LampArt.render({
        ad: $('#m_ad', scrim).value || 'Önizleme',
        type: $('#m_tip', scrim).value,
        palette: { metal: $('#m_pm', scrim).value, shade: $('#m_ps', scrim).value, glow: $('#m_pg', scrim).value }
      }, { glow: true });
      var svg = $('#m_onizleme svg', scrim);
      if (svg) svg.style.height = '170px';
    }
    onizle();
    ['m_tip', 'm_pm', 'm_ps', 'm_pg', 'm_gk', 'm_ga'].forEach(function (id) {
      $('#' + id, scrim).addEventListener('input', onizle);
    });

    function kapat() { scrim.remove(); document.body.style.overflow = ''; }
    $('#modalKapat', scrim).addEventListener('click', kapat);
    $('#modalIptal', scrim).addEventListener('click', kapat);
    scrim.addEventListener('click', function (e) { if (e.target === scrim) kapat(); });

    $('#modalKaydet', scrim).addEventListener('click', function () {
      var ad = $('#m_ad', scrim).value.trim();
      if (!ad) { bildir('Ürün adı gerekli.', 'hata'); return; }

      var kimlik = u.id || ad.toLowerCase()
        .replace(/[çğıöşü]/g, function (c) { return { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' }[c]; })
        .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || ('urun-' + Date.now().toString(36));

      var eski = Number($('#m_eski', scrim).value);
      Store.urunKaydet({
        id: kimlik,
        ad: ad,
        altbaslik: $('#m_alt', scrim).value,
        fiyat: Number($('#m_fiyat', scrim).value) || 0,
        eskiFiyat: eski > 0 ? eski : undefined,
        stok: Number($('#m_stok', scrim).value) || 0,
        etiket: $('#m_etiket', scrim).value.trim(),
        koleksiyon: $('#m_kol', scrim).value,
        type: $('#m_tip', scrim).value,
        renk: $('#m_renk', scrim).value,
        renkAd: $('#m_renkad', scrim).value,
        yukseklik: $('#m_yuk', scrim).value,
        abajur: $('#m_abajur', scrim).value,
        ampul: $('#m_ampul', scrim).value,
        malzeme: $('#m_malzeme', scrim).value,
        puan: Number($('#m_puan', scrim).value) || 0,
        yorum: Number($('#m_yorum', scrim).value) || 0,
        aciklama: $('#m_aciklama', scrim).value,
        detay: $('#m_detay', scrim).value.split('\n').map(function (x) { return x.trim(); }).filter(Boolean),
        palette: { metal: $('#m_pm', scrim).value, shade: $('#m_ps', scrim).value, glow: $('#m_pg', scrim).value },
        gorseller: (function () {
          var kapali = $('#m_gk', scrim).value.trim();
          if (!kapali) return null;
          return {
            kapali: kapali,
            acik: $('#m_ga', scrim).value.trim() || kapali,
            galeri: $('#m_gg', scrim).value.split('\n').map(function (x) { return x.trim(); }).filter(Boolean)
          };
        })(),
        aktif: swAktif.checked,
        oneCikan: swOne.checked
      });
      bildir(yeni ? 'Ürün eklendi.' : 'Ürün güncellendi.');
      kapat();
      ciz();
    });
  }

  /* ============================================================
     KOLEKSİYONLAR
     ============================================================ */
  function koleksiyonlar() {
    return '<div class="ad-kart"><h3>Koleksiyonlar</h3><p>Mağaza filtrelerinde ve ana sayfada görünen gruplar.</p>' +
      '<div class="ad-liste" id="kolListe">' +
        Store.koleksiyonlar.map(function (k, i) { return kolSatir(k, i); }).join('') +
      '</div>' +
      '<button class="ad-ekle" id="kolEkle" style="margin-top:12px">' + I.arti + ' Koleksiyon ekle</button>' +
      '<div class="ad-actions"><button class="btn btn--primary btn--sm" id="kolKaydet">Kaydet</button></div></div>';
  }
  function kolSatir(k, i) {
    return '<div class="ad-satir ad-satir--3" data-i="' + i + '">' +
      '<div class="ad-f"><label>Ad</label><input data-k="ad" value="' + kacir(k.ad) + '"></div>' +
      '<div class="ad-f"><label>URL adı (slug)</label><input data-k="slug" value="' + kacir(k.slug) + '"></div>' +
      '<div class="ad-f"><label>Özet</label><input data-k="ozet" value="' + kacir(k.ozet) + '"></div>' +
      '<div class="ad-satir__sil" style="display:flex;gap:6px;align-items:center">' +
        '<label class="ad-switch" title="Ana sayfada göster"><input type="checkbox" data-k="anaSayfa"' +
          (k.anaSayfa ? ' checked' : '') + '><span>Ana sayfa</span></label>' +
        '<button class="ad-ikon-btn ad-ikon-btn--sil" data-satirSil="1">' + I.cop + '</button></div></div>';
  }

  /* ============================================================
     KAMPANYALAR
     ============================================================ */
  function kampanyalar() {
    return '<div class="ad-kart"><h3>Kampanyalar & kuponlar</h3>' +
      '<p>Kod tipleri: <b>yuzde</b> (% indirim), <b>tutar</b> (₺ indirim), <b>kargo</b> (ücretsiz kargo).</p>' +
      '<div class="ad-liste" id="kampListe">' +
        Store.kampanyalar.map(function (k, i) { return kampSatir(k, i); }).join('') +
      '</div>' +
      '<button class="ad-ekle" id="kampEkle" style="margin-top:12px">' + I.arti + ' Kampanya ekle</button>' +
      '<div class="ad-actions"><button class="btn btn--primary btn--sm" id="kampKaydet">Kaydet</button></div></div>';
  }
  function kampSatir(k, i) {
    return '<div class="ad-satir ad-satir--3" data-i="' + i + '">' +
      '<div class="ad-f"><label>Başlık</label><input data-k="baslik" value="' + kacir(k.baslik || '') + '"></div>' +
      '<div class="ad-f"><label>Kod</label><input data-k="kod" value="' + kacir(k.kod) + '" style="font-family:var(--font-mono);text-transform:uppercase"></div>' +
      '<div class="ad-f"><label>Tip</label><select data-k="tip">' +
        ['yuzde', 'tutar', 'kargo'].map(function (t) {
          return '<option value="' + t + '"' + (k.tip === t ? ' selected' : '') + '>' +
            ({ yuzde: '% indirim', tutar: '₺ indirim', kargo: 'Ücretsiz kargo' })[t] + '</option>';
        }).join('') + '</select></div>' +
      '<div class="ad-f"><label>Değer</label><input data-k="deger" type="number" min="0" value="' + (k.deger || 0) + '"></div>' +
      '<div class="ad-f"><label>Min. sepet (₺)</label><input data-k="minTutar" type="number" min="0" value="' + (k.minTutar || 0) + '"></div>' +
      '<div class="ad-f ad-f--full"><label>Açıklama</label><input data-k="aciklama" value="' + kacir(k.aciklama || '') + '"></div>' +
      '<div class="ad-satir__sil" style="display:flex;gap:6px;align-items:center">' +
        '<label class="ad-switch"><input type="checkbox" data-k="aktif"' + (k.aktif ? ' checked' : '') + '><span>Aktif</span></label>' +
        '<button class="ad-ikon-btn ad-ikon-btn--sil" data-satirSil="1">' + I.cop + '</button></div></div>';
  }

  /* ============================================================
     ANA SAYFA İÇERİĞİ
     ============================================================ */
  function anasayfa() {
    var s = Store.site, B = s.bolumler;
    var urunSecenek = Store.urunler.map(function (u) {
      return '<option value="' + u.id + '"' + (s.hero.urunId === u.id ? ' selected' : '') + '>' + kacir(u.ad) + '</option>';
    }).join('');

    var bolumKart = function (yol, ad) {
      var b = B[yol];
      return '<div class="ad-kart"><h3>' + ad + '</h3>' +
        '<div class="ad-grid">' +
          '<div class="ad-f ad-f--full">' + anahtar('Bu bölüm sitede görünsün', b.aktif, 'bolumler.' + yol + '.aktif') + '</div>' +
          f('Üst etiket', b.etiket, 'bolumler.' + yol + '.etiket') +
          f('Başlık', b.baslik, 'bolumler.' + yol + '.baslik') +
          f('Açıklama metni', b.metin, 'bolumler.' + yol + '.metin', 'textarea', '', true) +
        '</div></div>';
    };

    return '<div class="ad-kart"><h3>Hero (üst bölüm)</h3><p>Ana sayfanın ilk ekranı.</p>' +
        '<div class="ad-grid">' +
          f('Üst etiket', s.hero.etiket, 'hero.etiket') +
          '<div class="ad-f"><label>Sahnedeki ürün</label><select data-yol="hero.urunId">' + urunSecenek + '</select></div>' +
          f('Başlık', s.hero.baslik, 'hero.baslik') +
          f('Vurgulu kelime (turuncu)', s.hero.baslikVurgu, 'hero.baslikVurgu') +
          f('Açıklama', s.hero.metin, 'hero.metin', 'textarea', '', true) +
          f('1. buton yazısı', s.hero.btn1.ad, 'hero.btn1.ad') +
          f('1. buton linki', s.hero.btn1.yol, 'hero.btn1.yol') +
          f('2. buton yazısı', s.hero.btn2.ad, 'hero.btn2.ad') +
          f('2. buton linki', s.hero.btn2.yol, 'hero.btn2.yol') +
        '</div>' +
        '<h3 style="margin-top:20px">İstatistikler</h3>' +
        '<div class="ad-liste" id="istListe">' + s.hero.istatistik.map(function (x, i) { return istSatir(x, i); }).join('') + '</div>' +
        '<button class="ad-ekle" id="istEkle" style="margin-top:10px">' + I.arti + ' Ekle</button>' +
      '</div>' +

      '<div class="ad-kart"><h3>Kayan şerit</h3><p>Her satır bir madde.</p>' +
        '<div class="ad-f"><textarea id="seritler">' + kacir(s.seritler.join('\n')) + '</textarea></div></div>' +

      bolumKart('oneCikanlar', 'Öne çıkan ürünler bölümü') +

      '<div class="ad-kart"><h3>Öne çıkan gövdeler</h3>' +
        '<p>Ana sayfada gösterilecek dört gövde ve sırası. Boş bırakırsanız ' +
        '“öne çıkan” işaretli ürünler kullanılır.</p>' +
        '<div class="ad-liste" id="oneCikanListe">' +
          ((Store.site.bolumler.oneCikanlar.urunler || []).length
            ? Store.site.bolumler.oneCikanlar.urunler.map(function (id, i) { return oneCikanSatir(id, i); }).join('')
            : oneCikanSatir('', 0)) +
        '</div>' +
        '<button class="ad-ekle" id="oneCikanEkle" style="margin-top:12px">' + I.arti + ' Gövde ekle</button></div>' +
      bolumKart('koleksiyonlar', 'Koleksiyonlar bölümü') +
      bolumKart('atolye', 'Atölye anlatısı bölümü') +

      '<div class="ad-kart"><h3>Atölye adımları</h3>' +
        '<div class="ad-liste" id="atolyeListe">' + s.atolyeAdimlar.map(function (x, i) { return atolyeSatir(x, i); }).join('') + '</div>' +
        '<button class="ad-ekle" id="atolyeEkle" style="margin-top:10px">' + I.arti + ' Adım ekle</button></div>' +

      bolumKart('yorumlar', 'Yorumlar bölümü') +

      '<div class="ad-kart"><h3>Müşteri yorumları</h3>' +
        '<div class="ad-liste" id="yorumListe">' + s.yorumlar.map(function (x, i) { return yorumSatir(x, i); }).join('') + '</div>' +
        '<button class="ad-ekle" id="yorumEkle" style="margin-top:10px">' + I.arti + ' Yorum ekle</button></div>' +

      bolumKart('bulten', 'Bülten bölümü') +
      kaydetBar();
  }
  function oneCikanSatir(id, i) {
    return '<div class="ad-satir ad-satir--1" data-i="' + i + '">' +
      '<div class="ad-f"><label>' + (i + 1) + '. gövde</label><select data-k="id">' +
        '<option value="">— seçilmedi —</option>' +
        Store.urunler.filter(function (u) { return !u.hediyeKarti; }).map(function (u) {
          return '<option value="' + u.id + '"' + (u.id === id ? ' selected' : '') + '>' +
            kacir(u.ad) + (u.aktif === false ? ' (pasif)' : '') + '</option>';
        }).join('') +
      '</select></div>' +
      '<button class="ad-ikon-btn ad-ikon-btn--sil ad-satir__sil" data-satirSil="1">' + I.cop + '</button></div>';
  }

  function istSatir(x, i) {
    return '<div class="ad-satir" data-i="' + i + '">' +
      '<div class="ad-f"><label>Sayı</label><input data-k="sayi" value="' + kacir(x.sayi) + '"></div>' +
      '<div class="ad-f"><label>Etiket</label><input data-k="etiket" value="' + kacir(x.etiket) + '"></div>' +
      '<button class="ad-ikon-btn ad-ikon-btn--sil ad-satir__sil" data-satirSil="1">' + I.cop + '</button></div>';
  }
  function atolyeSatir(x, i) {
    return '<div class="ad-satir" data-i="' + i + '">' +
      '<div class="ad-f"><label>Başlık</label><input data-k="baslik" value="' + kacir(x.baslik) + '"></div>' +
      '<div class="ad-f"><label>Metin</label><input data-k="metin" value="' + kacir(x.metin) + '"></div>' +
      '<button class="ad-ikon-btn ad-ikon-btn--sil ad-satir__sil" data-satirSil="1">' + I.cop + '</button></div>';
  }
  function yorumSatir(x, i) {
    return '<div class="ad-satir ad-satir--3" data-i="' + i + '">' +
      '<div class="ad-f ad-f--full"><label>Yorum</label><input data-k="metin" value="' + kacir(x.metin) + '"></div>' +
      '<div class="ad-f"><label>Kişi</label><input data-k="kisi" value="' + kacir(x.kisi) + '"></div>' +
      '<div class="ad-f"><label>Şehir</label><input data-k="yer" value="' + kacir(x.yer) + '"></div>' +
      '<div class="ad-f"><label>Puan</label><input data-k="puan" type="number" min="1" max="5" value="' + (x.puan || 5) + '"></div>' +
      '<button class="ad-ikon-btn ad-ikon-btn--sil ad-satir__sil" data-satirSil="1">' + I.cop + '</button></div>';
  }

  /* ============================================================
     HEADER
     ============================================================ */
  function header() {
    var s = Store.site;
    return '<div class="ad-kart"><h3>Marka</h3><div class="ad-grid">' +
        f('Site adı', s.marka.ad, 'marka.ad') +
        f('Slogan (logo altı)', s.marka.slogan, 'marka.slogan') +
        f('Logo dosyası', s.marka.logo, 'marka.logo', 'text',
          'Örn. <code>logo.png</code>. Boş bırakılırsa çizilmiş ışık simgesi + site adı kullanılır.') +
        f('Logo yüksekliği (px)', s.marka.logoYuksekligi || 34, 'marka.logoYuksekligi', 'number') +
        '<div class="ad-f ad-f--full"><label>Logo önizleme</label>' +
          '<div class="ad-onizleme" style="display:flex;align-items:center;gap:14px;padding:14px" id="logoOnizleme">' +
          '</div></div>' +
      '</div></div>' +

      '<div class="ad-kart"><h3>Duyuru çubuğu</h3><p>Sayfanın en üstündeki turuncu şerit.</p><div class="ad-grid">' +
        '<div class="ad-f ad-f--full">' + anahtar('Duyuru çubuğu görünsün', s.duyuru.aktif, 'duyuru.aktif') + '</div>' +
        f('Metin', s.duyuru.metin, 'duyuru.metin', 'text', '', true) +
        f('Link', s.duyuru.link, 'duyuru.link', 'text', 'Boş bırakılırsa tıklanabilir olmaz') +
      '</div></div>' +

      '<div class="ad-kart"><h3>Menü</h3><p>Header’daki bağlantılar. Sıra, buradaki sıradır.</p>' +
        '<div class="ad-liste" id="menuListe">' + s.header.menu.map(function (m, i) { return menuSatir(m, i); }).join('') + '</div>' +
        '<button class="ad-ekle" id="menuEkle" style="margin-top:10px">' + I.arti + ' Menü öğesi ekle</button></div>' +
      kaydetBar();
  }
  function menuSatir(m, i) {
    return '<div class="ad-satir" data-i="' + i + '">' +
      '<div class="ad-f"><label>Yazı</label><input data-k="ad" value="' + kacir(m.ad) + '"></div>' +
      '<div class="ad-f"><label>Link</label><input data-k="yol" value="' + kacir(m.yol) + '"></div>' +
      '<button class="ad-ikon-btn ad-ikon-btn--sil ad-satir__sil" data-satirSil="1">' + I.cop + '</button></div>';
  }

  /* ============================================================
     FOOTER
     ============================================================ */
  function footer() {
    var s = Store.site;
    return '<div class="ad-kart"><h3>Footer metinleri</h3><div class="ad-grid">' +
        f('Tanıtım metni', s.footer.metin, 'footer.metin', 'textarea', '', true) +
        f('Adres', s.footer.adres, 'footer.adres') +
        f('Alt satır', s.footer.altMetin, 'footer.altMetin') +
      '</div></div>' +

      s.footer.sutunlar.map(function (c, ci) {
        return '<div class="ad-kart" data-sutun="' + ci + '">' +
          '<div style="display:flex;gap:10px;align-items:center;margin-bottom:12px">' +
            '<div class="ad-f" style="flex:1"><label>Sütun başlığı</label>' +
              '<input data-yol="footer.sutunlar.' + ci + '.baslik" value="' + kacir(c.baslik) + '"></div>' +
            '<button class="ad-ikon-btn ad-ikon-btn--sil" data-sutunSil="' + ci + '" title="Sütunu sil">' + I.cop + '</button></div>' +
          '<div class="ad-liste" data-linkListe="' + ci + '">' +
            c.linkler.map(function (l, li) { return footLinkSatir(l, li); }).join('') + '</div>' +
          '<button class="ad-ekle" data-linkEkle="' + ci + '" style="margin-top:10px">' + I.arti + ' Link ekle</button></div>';
      }).join('') +

      '<button class="ad-ekle" id="sutunEkle">' + I.arti + ' Yeni sütun</button>' +
      kaydetBar();
  }
  function footLinkSatir(l, li) {
    return '<div class="ad-satir" data-i="' + li + '">' +
      '<div class="ad-f"><label>Yazı</label><input data-k="ad" value="' + kacir(l.ad) + '"></div>' +
      '<div class="ad-f"><label>Link</label><input data-k="yol" value="' + kacir(l.yol) + '" ' +
        'placeholder="shop.html"><small>WhatsApp için: <code>whatsapp</code></small></div>' +
      '<button class="ad-ikon-btn ad-ikon-btn--sil ad-satir__sil" data-satirSil="1">' + I.cop + '</button></div>';
  }

  /* ============================================================
     TEMA
     ============================================================ */
  function tema() {
    var t = Store.site.tema;
    return '<div class="ad-kart"><h3>Renkler</h3><p>Site genelindeki turuncu tonu buradan değişir.</p>' +
      '<div class="ad-grid">' +
        '<div class="ad-f"><label>Ana renk</label><input type="color" data-yol="tema.anaRenk" value="' + t.anaRenk + '"></div>' +
        '<div class="ad-f"><label>Koyu ton (gradyan / hover)</label><input type="color" data-yol="tema.anaRenkKoyu" value="' + t.anaRenkKoyu + '"></div>' +
        '<div class="ad-f"><label>Köşe yumuşaklığı (px)</label><input type="number" min="0" max="40" data-yol="tema.kose" value="' + t.kose + '"></div>' +
      '</div>' +
      '<div class="ad-actions"><button class="btn btn--ghost btn--sm" id="temaOnizle">Önizle (kaydetmeden)</button></div>' +
      '</div>' +

      '<div class="ad-kart"><h3>Hazır paletler</h3><p>Tıklayın, renk alanları dolsun.</p>' +
        '<div class="chips" id="paletler">' +
          [['Lambazade kiremiti', '#b4441f', '#8b3316'], ['Merry kırmızısı', '#ff3962', '#e81a4a'], ['Fuşya', '#f5296f', '#cc0d53'],
           ['Mercan', '#ff5252', '#e02e2e'], ['Bordo', '#c31d45', '#94112f'],
           ['Turuncu', '#ff6a13', '#e04f00']].map(function (p) {
            return '<button class="chip chip--dot" data-p1="' + p[1] + '" data-p2="' + p[2] + '">' +
              '<i style="background:' + p[1] + '"></i>' + p[0] + '</button>';
          }).join('') + '</div></div>' +

      '<div class="ad-kart"><h3>Ürün ışığı</h3><p>Ziyaretçi ürünün ampul düğmesine dokunmadığı sürece geçerli olan varsayılan.</p>' +
        '<div class="ad-f" style="max-width:360px"><select data-yol="urunIsigi">' +
          ['temaya-gore', 'acik', 'kapali'].map(function (v) {
            var ad = {
              'temaya-gore': 'Site temasına göre (önerilen)',
              'acik': 'Her zaman yanık',
              'kapali': 'Her zaman kapalı'
            }[v];
            return '<option value="' + v + '"' + (Store.site.urunIsigi === v ? ' selected' : '') + '>' + ad + '</option>';
          }).join('') +
        '</select><small>“Site temasına göre”: açık temada lambalar kapalı, ' +
        'koyu temada yanık gelir. Ziyaretçi tek tek değiştirebilir.</small></div></div>' +
      kaydetBar();
  }

  /* ============================================================
     AYARLAR
     ============================================================ */
  function ayarlar() {
    var s = Store.site;
    var C = g.MUSH_CONFIG;
    return '<div class="ad-kart"><h3>Kargo</h3><div class="ad-grid">' +
        f('Ücretsiz kargo limiti (₺)', s.kargo.ucretsizLimit, 'kargo.ucretsizLimit', 'number') +
        f('Kargo ücreti (₺)', s.kargo.ucret, 'kargo.ucret', 'number') +
        f('Teslim süresi', s.kargo.sure, 'kargo.sure') +
      '</div></div>' +

      '<div class="ad-kart"><h3>İletişim</h3><div class="ad-grid">' +
        f('Telefon', s.iletisim.telefon, 'iletisim.telefon') +
        f('E-posta', s.iletisim.eposta, 'iletisim.eposta') +
        '<div class="ad-f ad-f--full">' + anahtar('WhatsApp balonu sitede görünsün', s.iletisim.whatsappAktif, 'iletisim.whatsappAktif') + '</div>' +
        '<div class="ad-f ad-f--full"><label>WhatsApp numarası</label>' +
          '<input value="' + kacir(C.whatsapp) + '" disabled>' +
          '<small>Numara <code>assets/js/config.js</code> içindeki <code>whatsapp</code> alanından değişir ' +
          '(şu an: +' + kacir(C.whatsapp) + ').</small></div>' +
      '</div></div>' +

      '<div class="ad-kart"><h3>SEO</h3><div class="ad-grid">' +
        f('Sayfa başlığı', s.seo.baslik, 'seo.baslik', 'text', '', true) +
        f('Meta açıklama', s.seo.aciklama, 'seo.aciklama', 'textarea', '', true) +
      '</div></div>' +

      '<div class="ad-kart"><h3>Entegrasyonlar</h3>' +
        '<p>Bu iki ayar kod dosyasından yönetilir — tarayıcıdan değiştirilemez (güvenlik).</p>' +
        '<div class="ad-tablo-sarma"><table class="ad-tablo"><thead><tr><th>Servis</th><th>Durum</th><th>Nerede ayarlanır</th></tr></thead><tbody>' +
          '<tr><td><b>Ödeme</b></td><td><span class="ad-rozet ad-rozet--' +
            (C.paymentMode === 'iyzico' ? 'ok">iyzico aktif' : 'uyari">Demo mod') + '</span></td>' +
            '<td class="mono" style="font-size:12px">config.js → paymentMode<br>Netlify env: IYZICO_API_KEY / IYZICO_SECRET_KEY</td></tr>' +
          '<tr><td><b>Üyelik</b></td><td><span class="ad-rozet ad-rozet--' +
            (C.authMode === 'supabase' ? 'ok">Supabase' : 'uyari">Demo (yalnızca tarayıcı)') + '</span></td>' +
            '<td class="mono" style="font-size:12px">config.js → authMode + supabase.url / anonKey</td></tr>' +
        '</tbody></table></div>' +
        '<div class="pay-note" style="margin-top:14px">' + I.bilgi +
          '<span>Kurulum adımları <b>DEPLOY.md</b> dosyasında anlatılıyor.</span></div>' +
      '</div>' +
      kaydetBar();
  }

  /* ============================================================
     YEDEK
     ============================================================ */
  function yedek() {
    return '<div class="ad-kart"><h3>Yedek al</h3>' +
      '<p>Tüm içerik (ürünler, kampanyalar, metinler, siparişler) tek JSON dosyasında.</p>' +
      '<div class="ad-actions" style="border:0;padding:0;margin:0">' +
        '<button class="btn btn--primary btn--sm" id="yedekIndir">JSON olarak indir</button>' +
        '<button class="btn btn--ghost btn--sm" id="yedekKopyala">Panoya kopyala</button>' +
      '</div></div>' +

      '<div class="ad-kart"><h3>Yedeği geri yükle</h3>' +
        '<p>JSON içeriğini aşağıya yapıştırıp yükleyin. Mevcut içeriğin üzerine yazar.</p>' +
        '<div class="ad-f"><textarea id="yedekMetin" placeholder="{ &quot;site&quot;: … }" style="min-height:160px;font-family:var(--font-mono);font-size:12px"></textarea></div>' +
        '<div class="ad-actions"><button class="btn btn--primary btn--sm" id="yedekYukle">Yedeği yükle</button>' +
        '<label class="btn btn--ghost btn--sm">Dosyadan seç<input type="file" id="yedekDosya" accept="application/json" hidden></label></div></div>' +

      '<div class="ad-kart"><h3 style="color:#c81d43">Fabrika ayarlarına dön</h3>' +
        '<p>Tüm düzenlemeler silinir, başlangıç içeriği geri gelir. Bu işlem geri alınamaz.</p>' +
        '<div class="ad-actions"><button class="btn btn--ghost btn--sm" id="sifirlaBtn" ' +
          'style="color:#c81d43;border-color:#ffd4de">Her şeyi sıfırla</button></div></div>';
  }

  /* ============================================================
     HAKKIMIZDA
     ============================================================ */
  function hakkimizda() {
    var h = Store.site.hakkimizda;
    if (!h) return '<div class="ad-kart"><h3>Hakkımızda içeriği yok</h3></div>';

    return '<div class="ad-kart">' +
        '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px">' +
          '<div><h3 style="margin:0">Giriş bölümü</h3>' +
          '<p style="margin:4px 0 0">Sayfanın ilk ekranı.</p></div>' +
          '<a class="btn btn--ghost btn--sm" style="margin-left:auto" href="hakkimizda.html" target="_blank">Sayfayı aç</a>' +
        '</div>' +
        '<div class="ad-grid">' +
          f('Üst etiket', h.etiket, 'hakkimizda.etiket') +
          f('Başlık', h.baslik, 'hakkimizda.baslik') +
          f('Vurgulu son kısım (kırmızı)', h.baslikVurgu, 'hakkimizda.baslikVurgu') +
          f('Giriş paragrafı', h.girisMetni, 'hakkimizda.girisMetni', 'textarea', '', true) +
        '</div></div>' +

      '<div class="ad-kart"><h3>Rakamlar</h3><p>Giriş metninin altındaki şerit.</p>' +
        '<div class="ad-liste" id="rakamListe">' +
          (h.rakamlar || []).map(function (x, i) { return hakkRakamSatir(x, i); }).join('') +
        '</div>' +
        '<button class="ad-ekle" id="rakamEkle" style="margin-top:12px">' + I.arti + ' Rakam ekle</button></div>' +

      '<div class="ad-kart"><h3>Hikâye</h3><div class="ad-grid">' +
          f('Bölüm başlığı', h.hikaye.baslik, 'hakkimizda.hikaye.baslik') +
          '<div class="ad-f"></div>' +
          '<div class="ad-f ad-f--full"><label>Paragraflar — her satır bir paragraf</label>' +
            '<textarea id="hikayeP" style="min-height:140px">' +
            kacir((h.hikaye.paragraflar || []).join('\n')) + '</textarea></div>' +
          f('İmza — ad', h.hikaye.imzaAd, 'hakkimizda.hikaye.imzaAd') +
          f('İmza — unvan', h.hikaye.imzaRol, 'hakkimizda.hikaye.imzaRol') +
        '</div></div>' +

      '<div class="ad-kart"><h3>İlkeler</h3><p>Dörtlü kart ızgarası.</p>' +
        '<div class="ad-liste" id="ilkeListe">' +
          (h.ilkeler || []).map(function (x, i) { return hakkIkiliSatir(x, i, 'İlke'); }).join('') +
        '</div>' +
        '<button class="ad-ekle" id="ilkeEkle" style="margin-top:12px">' + I.arti + ' İlke ekle</button></div>' +

      '<div class="ad-kart"><h3>Zanaat</h3><p>Malzeme anlatısı (metal, ahşap, kumaş…).</p>' +
        '<div class="ad-liste" id="zanaatListe">' +
          (h.zanaat || []).map(function (x, i) { return hakkIkiliSatir(x, i, 'Malzeme'); }).join('') +
        '</div>' +
        '<button class="ad-ekle" id="zanaatEkle" style="margin-top:12px">' + I.arti + ' Malzeme ekle</button></div>' +

      '<div class="ad-kart"><h3>Alıntı</h3><div class="ad-grid">' +
          f('Alıntı metni', h.alinti.metin, 'hakkimizda.alinti.metin', 'textarea', '', true) +
          f('Kim söylüyor', h.alinti.kisi, 'hakkimizda.alinti.kisi') +
        '</div></div>' +

      '<div class="ad-kart"><h3>Kapanış çağrısı</h3><div class="ad-grid">' +
          f('Başlık', h.kapanis.baslik, 'hakkimizda.kapanis.baslik') +
          '<div class="ad-f"></div>' +
          f('Metin', h.kapanis.metin, 'hakkimizda.kapanis.metin', 'textarea', '', true) +
          f('1. buton yazısı', h.kapanis.btn1.ad, 'hakkimizda.kapanis.btn1.ad') +
          f('1. buton linki', h.kapanis.btn1.yol, 'hakkimizda.kapanis.btn1.yol', 'text', 'WhatsApp için: <code>whatsapp</code>') +
          f('2. buton yazısı', h.kapanis.btn2.ad, 'hakkimizda.kapanis.btn2.ad') +
          f('2. buton linki', h.kapanis.btn2.yol, 'hakkimizda.kapanis.btn2.yol') +
        '</div></div>' +
      kaydetBar();
  }

  function hakkRakamSatir(x, i) {
    return '<div class="ad-satir ad-satir--3" data-i="' + i + '">' +
      '<div class="ad-f"><label>Sayı</label><input data-k="sayi" value="' + kacir(x.sayi || '') + '"></div>' +
      '<div class="ad-f"><label>Etiket</label><input data-k="etiket" value="' + kacir(x.etiket || '') + '"></div>' +
      '<div class="ad-f"><label>Açıklama</label><input data-k="aciklama" value="' + kacir(x.aciklama || '') + '"></div>' +
      '<button class="ad-ikon-btn ad-ikon-btn--sil ad-satir__sil" data-satirSil="1">' + I.cop + '</button></div>';
  }

  function hakkIkiliSatir(x, i, etiket) {
    return '<div class="ad-satir ad-satir--1" data-i="' + i + '" style="align-items:start">' +
      '<div class="ad-grid ad-grid--1" style="gap:9px">' +
        '<div class="ad-f"><label>' + etiket + ' başlığı</label>' +
          '<input data-k="baslik" value="' + kacir(x.baslik || '') + '"></div>' +
        '<div class="ad-f"><label>Metin</label><textarea data-k="metin" style="min-height:64px">' +
          kacir(x.metin || '') + '</textarea></div>' +
      '</div>' +
      '<button class="ad-ikon-btn ad-ikon-btn--sil" data-satirSil="1">' + I.cop + '</button></div>';
  }

  /* ============================================================
     BİLGİ SAYFALARI
     ============================================================ */
  var bilgiAktifKonu = 'kargo';

  function bilgi() {
    var B = Store.site.bilgiSayfalari || {};
    var konular = Object.keys(B);
    if (!konular.length) return '<div class="ad-kart"><h3>Bilgi sayfası yok</h3></div>';
    if (konular.indexOf(bilgiAktifKonu) < 0) bilgiAktifKonu = konular[0];

    var v = B[bilgiAktifKonu];
    var yollar = { kargo: 'kargo.html', iade: 'iade.html', ampul: 'ampul-rehberi.html', garanti: 'garanti.html' };

    return '<div class="ad-kart"><h3>Hangi sayfa?</h3>' +
        '<p>Footer’daki “Yardım” sütunundan bağlanan sayfalar.</p>' +
        '<div class="chips" id="bilgiSekme">' + konular.map(function (k) {
          return '<button class="chip" data-k="' + k + '" aria-pressed="' + (k === bilgiAktifKonu) + '">' +
            kacir(B[k].baslik) + '</button>';
        }).join('') + '</div>' +
        (yollar[bilgiAktifKonu]
          ? '<div class="ad-actions" style="border:0;padding:0;margin-top:14px">' +
            '<a class="btn btn--ghost btn--sm" href="' + yollar[bilgiAktifKonu] + '" target="_blank">Sayfayı aç</a></div>'
          : '') +
      '</div>' +

      '<div class="ad-kart"><h3>Başlık ve özet</h3><div class="ad-grid">' +
        f('Sayfa başlığı', v.baslik, 'bilgiSayfalari.' + bilgiAktifKonu + '.baslik') +
        f('Özet (başlığın altındaki iri satır)', v.ozet, 'bilgiSayfalari.' + bilgiAktifKonu + '.ozet', 'text', '', true) +
      '</div></div>' +

      '<div class="ad-kart"><h3>Bölümler</h3>' +
        '<p>Her bölüm bir alt başlık, bir paragraf ve istersen madde listesi.</p>' +
        '<div class="ad-liste" id="bolumListe">' +
          (v.bolumler || []).map(function (b, i) { return bilgiBolumSatir(b, i); }).join('') +
        '</div>' +
        '<button class="ad-ekle" id="bolumEkle" style="margin-top:12px">' + I.arti + ' Bölüm ekle</button></div>' +

      '<div class="ad-kart"><h3>Sık sorulanlar</h3>' +
        '<div class="ad-liste" id="sssListe">' +
          (v.sss || []).map(function (x, i) { return bilgiSssSatir(x, i); }).join('') +
        '</div>' +
        '<button class="ad-ekle" id="sssEkle" style="margin-top:12px">' + I.arti + ' Soru ekle</button></div>' +
      kaydetBar();
  }

  function bilgiBolumSatir(b, i) {
    return '<div class="ad-satir ad-satir--1" data-i="' + i + '" style="align-items:start">' +
      '<div class="ad-grid ad-grid--1" style="gap:9px">' +
        '<div class="ad-f"><label>Alt başlık</label><input data-k="baslik" value="' + kacir(b.baslik || '') + '"></div>' +
        '<div class="ad-f"><label>Paragraf</label><textarea data-k="metin" style="min-height:70px">' +
          kacir(b.metin || '') + '</textarea></div>' +
        '<div class="ad-f"><label>Maddeler (her satır bir madde — boş bırakılabilir)</label>' +
          '<textarea data-k="liste" style="min-height:60px">' + kacir((b.liste || []).join('\n')) + '</textarea></div>' +
      '</div>' +
      '<button class="ad-ikon-btn ad-ikon-btn--sil" data-satirSil="1" title="Bölümü sil">' + I.cop + '</button></div>';
  }

  function bilgiSssSatir(x, i) {
    return '<div class="ad-satir ad-satir--1" data-i="' + i + '" style="align-items:start">' +
      '<div class="ad-grid ad-grid--1" style="gap:9px">' +
        '<div class="ad-f"><label>Soru</label><input data-k="soru" value="' + kacir(x.soru || '') + '"></div>' +
        '<div class="ad-f"><label>Cevap</label><textarea data-k="cevap" style="min-height:60px">' +
          kacir(x.cevap || '') + '</textarea></div>' +
      '</div>' +
      '<button class="ad-ikon-btn ad-ikon-btn--sil" data-satirSil="1" title="Soruyu sil">' + I.cop + '</button></div>';
  }

  /* ============================================================
     Tekrarlanan liste yardımcısı
     ============================================================ */
  function listeBagla(opts) {
    var kap = $(opts.kap);
    if (!kap) return;

    function topla() {
      return $$(':scope > .ad-satir', kap).map(function (satir) {
        var o = {};
        $$('[data-k]', satir).forEach(function (el) {
          var k = el.dataset.k;
          if (el.type === 'checkbox') o[k] = el.checked;
          else if (el.type === 'number') o[k] = Number(el.value);
          else o[k] = el.value;
        });
        return o;
      });
    }

    kap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-satirSil]');
      if (!b) return;
      b.closest('.ad-satir').remove();
    });

    var ekleBtn = $(opts.ekle);
    if (ekleBtn) ekleBtn.addEventListener('click', function () {
      kap.insertAdjacentHTML('beforeend', opts.bosSatir());
    });

    var kaydetBtn = opts.kaydet ? $(opts.kaydet) : null;
    if (kaydetBtn) kaydetBtn.addEventListener('click', function () {
      opts.yaz(topla());
      Store.kaydet();
      bildir('Kaydedildi.');
      ciz();
    });

    return topla;
  }

  /* ============================================================
     Çizim
     ============================================================ */
  function ciz() {
    var sayfa = {
      gosterge: gosterge, siparisler: siparisler, urunler: urunler,
      koleksiyonlar: koleksiyonlar, kampanyalar: kampanyalar, anasayfa: anasayfa,
      header: header, footer: footer, hakkimizda: hakkimizda, bilgi: bilgi,
      tema: tema, ayarlar: ayarlar, yedek: yedek
    }[aktif] || gosterge;

    var meta = {
      gosterge: ['Gösterge', 'Mağazanın özeti ve canlı önizleme.'],
      siparisler: ['Siparişler', 'Gelen siparişleri görün, durumlarını güncelleyin.'],
      urunler: ['Ürünler', 'Ürün ekleyin, fiyat ve stok güncelleyin, görsel paletini seçin.'],
      koleksiyonlar: ['Koleksiyonlar', 'Ürün gruplarını yönetin.'],
      kampanyalar: ['Kampanyalar', 'İndirim kodları ve kampanya kuralları.'],
      anasayfa: ['Ana sayfa', 'Hero, bölümler, atölye adımları ve yorumlar.'],
      header: ['Header & duyuru', 'Marka, duyuru çubuğu ve menü.'],
      footer: ['Footer', 'Alt kısımdaki sütunlar ve bağlantılar.'],
      hakkimizda: ['Hakkımızda', 'Marka hikâyesi, rakamlar, ilkeler ve zanaat anlatısı.'],
      bilgi: ['Bilgi sayfaları', 'Kargo, iade, ampul rehberi ve garanti metinleri.'],
      tema: ['Tema & renkler', 'Marka rengi, köşe yumuşaklığı, ürün ışığı.'],
      ayarlar: ['Ayarlar', 'Kargo, iletişim, SEO ve entegrasyon durumu.'],
      yedek: ['Yedek & sıfırla', 'İçeriği dışa aktarın veya geri yükleyin.']
    }[aktif] || ['Gösterge', ''];

    $('#adMain').innerHTML =
      '<div class="ad-head"><div><h1>' + meta[0] + '</h1><p>' + meta[1] + '</p></div>' +
        '<div style="display:flex;gap:8px"><a class="btn btn--ghost btn--sm" href="index.html" target="_blank">Siteyi gör</a></div>' +
      '</div><div id="adIcerik">' + sayfa() + '</div>';

    $$('.ad-link[data-s]').forEach(function (b) {
      b.setAttribute('aria-current', String(b.dataset.s === aktif));
    });

    var kap = $('#adIcerik');

    /* --- sekmeye özel bağlamalar --- */
    if (aktif === 'siparisler') siparisBagla();
    if (aktif === 'urunler') urunBagla();

    if (aktif === 'koleksiyonlar') {
      listeBagla({
        kap: '#kolListe', ekle: '#kolEkle', kaydet: '#kolKaydet',
        bosSatir: function () { return kolSatir({ ad: '', slug: '', ozet: '', anaSayfa: true }, 0); },
        yaz: function (liste) {
          Store.ham.koleksiyonlar = liste.filter(function (k) { return k.ad && k.slug; });
        }
      });
    }

    if (aktif === 'kampanyalar') {
      listeBagla({
        kap: '#kampListe', ekle: '#kampEkle', kaydet: '#kampKaydet',
        bosSatir: function () { return kampSatir({ baslik: '', kod: '', tip: 'yuzde', deger: 10, minTutar: 0, aktif: true, aciklama: '' }, 0); },
        yaz: function (liste) {
          Store.ham.kampanyalar = liste.filter(function (k) { return k.kod; }).map(function (k, i) {
            k.kod = k.kod.toUpperCase();
            k.id = k.id || 'k' + (i + 1);
            return k;
          });
        }
      });
    }

    if (aktif === 'anasayfa') {
      var oneCikanTopla = listeBagla({
        kap: '#oneCikanListe', ekle: '#oneCikanEkle',
        bosSatir: function () { return oneCikanSatir('', 0); }
      });
      var istTopla = listeBagla({
        kap: '#istListe', ekle: '#istEkle',
        bosSatir: function () { return istSatir({ sayi: '', etiket: '' }, 0); }
      });
      var atolyeTopla = listeBagla({
        kap: '#atolyeListe', ekle: '#atolyeEkle',
        bosSatir: function () { return atolyeSatir({ baslik: '', metin: '' }, 0); }
      });
      var yorumTopla = listeBagla({
        kap: '#yorumListe', ekle: '#yorumEkle',
        bosSatir: function () { return yorumSatir({ metin: '', kisi: '', yer: '', puan: 5 }, 0); }
      });
      kaydetBagla(kap, function () {
        Store.site.bolumler.oneCikanlar.urunler = oneCikanTopla()
          .map(function (x) { return x.id; }).filter(Boolean);
        Store.site.hero.istatistik = istTopla().filter(function (x) { return x.sayi; });
        Store.site.atolyeAdimlar = atolyeTopla().filter(function (x) { return x.baslik; });
        Store.site.yorumlar = yorumTopla().filter(function (x) { return x.metin; });
        Store.site.seritler = $('#seritler').value.split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
        Store.kaydet();
        ciz();
      });
    }

    if (aktif === 'header') {
      var logoAlan = $('[data-yol="marka.logo"]');
      var logoOn = $('#logoOnizleme');
      function logoCiz() {
        var yol = logoAlan.value.trim();
        var boy = Number($('[data-yol="marka.logoYuksekligi"]').value) || 34;
        logoOn.innerHTML = '';
        if (!yol) {
          logoOn.innerHTML = g.App.logoSvg === undefined ? '' : '';
          logoOn.insertAdjacentHTML('beforeend',
            '<small style="color:var(--ink-3)">Dosya girilmedi — çizilmiş ışık simgesi ve “' +
            kacir($('[data-yol="marka.ad"]').value) + '” yazısı kullanılıyor.</small>');
          return;
        }
        var img = document.createElement('img');
        img.alt = 'Logo önizleme';
        img.style.cssText = 'height:' + boy + 'px;width:auto';
        img.onerror = function () {
          var not = document.createElement('small');
          not.style.color = '#c81d43';
          not.textContent = 'Bulunamadı: ' + yol;
          img.replaceWith(not);
        };
        img.src = encodeURI(yol);
        logoOn.appendChild(img);
      }
      logoCiz();
      logoAlan.addEventListener('input', logoCiz);
      $('[data-yol="marka.logoYuksekligi"]').addEventListener('input', logoCiz);
      $('[data-yol="marka.ad"]').addEventListener('input', logoCiz);

      var menuTopla = listeBagla({
        kap: '#menuListe', ekle: '#menuEkle',
        bosSatir: function () { return menuSatir({ ad: '', yol: '' }, 0); }
      });
      kaydetBagla(kap, function () {
        Store.site.header.menu = menuTopla().filter(function (m) { return m.ad; });
        Store.kaydet();
        ciz();
      });
    }

    if (aktif === 'footer') {
      // her sütun için link listesi
      $$('[data-linkListe]').forEach(function (liste) {
        var ci = +liste.dataset.linkliste;
        liste.addEventListener('click', function (e) {
          var b = e.target.closest('[data-satirSil]');
          if (b) b.closest('.ad-satir').remove();
        });
        var ekle = $('[data-linkEkle="' + ci + '"]');
        if (ekle) ekle.addEventListener('click', function () {
          liste.insertAdjacentHTML('beforeend', footLinkSatir({ ad: '', yol: '' }, 0));
        });
      });
      $$('[data-sutunSil]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (!confirm('Bu sütunu silmek istiyor musunuz?')) return;
          Store.site.footer.sutunlar.splice(+b.dataset.sutunsil, 1);
          Store.kaydet(); ciz();
        });
      });
      var se = $('#sutunEkle');
      if (se) se.addEventListener('click', function () {
        Store.site.footer.sutunlar.push({ baslik: 'Yeni sütun', linkler: [] });
        Store.kaydet(); ciz();
      });
      kaydetBagla(kap, function () {
        $$('[data-linkListe]').forEach(function (liste) {
          var ci = +liste.dataset.linkliste;
          Store.site.footer.sutunlar[ci].linkler = $$(':scope > .ad-satir', liste).map(function (satir) {
            return { ad: $('[data-k="ad"]', satir).value, yol: $('[data-k="yol"]', satir).value };
          }).filter(function (l) { return l.ad; });
        });
        Store.kaydet();
        ciz();
      });
    }

    if (aktif === 'hakkimizda') {
      var rakamTopla = listeBagla({
        kap: '#rakamListe', ekle: '#rakamEkle',
        bosSatir: function () { return hakkRakamSatir({ sayi: '', etiket: '', aciklama: '' }, 0); }
      });
      var ilkeTopla = listeBagla({
        kap: '#ilkeListe', ekle: '#ilkeEkle',
        bosSatir: function () { return hakkIkiliSatir({ baslik: '', metin: '' }, 0, 'İlke'); }
      });
      var zanaatTopla = listeBagla({
        kap: '#zanaatListe', ekle: '#zanaatEkle',
        bosSatir: function () { return hakkIkiliSatir({ baslik: '', metin: '' }, 0, 'Malzeme'); }
      });

      kaydetBagla(kap, function () {
        var h = Store.site.hakkimizda;
        h.rakamlar = rakamTopla().filter(function (x) { return x.sayi; });
        h.ilkeler = ilkeTopla().filter(function (x) { return x.baslik; });
        h.zanaat = zanaatTopla().filter(function (x) { return x.baslik; });
        h.hikaye.paragraflar = $('#hikayeP').value.split('\n')
          .map(function (x) { return x.trim(); }).filter(Boolean);
        Store.kaydet();
        ciz();
      });
    }

    if (aktif === 'bilgi') {
      $('#bilgiSekme').addEventListener('click', function (e) {
        var c = e.target.closest('.chip');
        if (!c) return;
        bilgiAktifKonu = c.dataset.k;
        ciz();
      });

      var bolumTopla = listeBagla({
        kap: '#bolumListe', ekle: '#bolumEkle',
        bosSatir: function () { return bilgiBolumSatir({ baslik: '', metin: '', liste: [] }, 0); }
      });
      var sssTopla = listeBagla({
        kap: '#sssListe', ekle: '#sssEkle',
        bosSatir: function () { return bilgiSssSatir({ soru: '', cevap: '' }, 0); }
      });

      kaydetBagla(kap, function () {
        var v = Store.site.bilgiSayfalari[bilgiAktifKonu];
        v.bolumler = bolumTopla().filter(function (b) { return b.baslik || b.metin; }).map(function (b) {
          b.liste = String(b.liste || '').split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
          return b;
        });
        v.sss = sssTopla().filter(function (x) { return x.soru; });
        Store.kaydet();
        ciz();
      });
    }

    if (aktif === 'tema') {
      var oncekiIsik = Store.site.urunIsigi;
      kaydetBagla(kap, function () {
        if (Store.site.urunIsigi !== oncekiIsik) Isik.varsayilanaDon();
        location.reload();
      });
      var on = $('#temaOnizle');
      if (on) on.addEventListener('click', function () {
        var k = document.documentElement.style;
        k.setProperty('--brand', $('[data-yol="tema.anaRenk"]').value);
        k.setProperty('--m-500', $('[data-yol="tema.anaRenk"]').value);
        k.setProperty('--brand-deep', $('[data-yol="tema.anaRenkKoyu"]').value);
        k.setProperty('--m-600', $('[data-yol="tema.anaRenkKoyu"]').value);
        bildir('Önizleme uygulandı. Kalıcı olması için kaydedin.');
      });
      $$('#paletler .chip').forEach(function (b) {
        b.addEventListener('click', function () {
          $('[data-yol="tema.anaRenk"]').value = b.dataset.p1;
          $('[data-yol="tema.anaRenkKoyu"]').value = b.dataset.p2;
          bildir('Palet seçildi — kaydetmeyi unutmayın.');
        });
      });
    }

    if (aktif === 'ayarlar') kaydetBagla(kap);

    if (aktif === 'yedek') {
      $('#yedekIndir').addEventListener('click', function () {
        var b = new Blob([Store.disaAktar()], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.download = 'lambazade-yedek-' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(a.href);
        bildir('Yedek indirildi.');
      });
      $('#yedekKopyala').addEventListener('click', async function () {
        try { await navigator.clipboard.writeText(Store.disaAktar()); bildir('Panoya kopyalandı.'); }
        catch (e) { bildir('Kopyalanamadı, indirmeyi deneyin.', 'hata'); }
      });
      $('#yedekYukle').addEventListener('click', function () {
        try {
          Store.iceAktar($('#yedekMetin').value);
          bildir('Yedek yüklendi.');
          ciz();
        } catch (e) { bildir('Geçersiz JSON: ' + e.message, 'hata'); }
      });
      $('#yedekDosya').addEventListener('change', function (e) {
        var d = e.target.files[0];
        if (!d) return;
        var fr = new FileReader();
        fr.onload = function () { $('#yedekMetin').value = fr.result; bildir('Dosya okundu, “Yedeği yükle”ye basın.'); };
        fr.readAsText(d);
      });
      $('#sifirlaBtn').addEventListener('click', function () {
        if (!confirm('Tüm düzenlemeler silinecek ve başlangıç içeriği geri gelecek. Emin misiniz?')) return;
        Store.sifirla();
        bildir('Fabrika ayarlarına dönüldü.');
        ciz();
      });
    }
  }

  /* ============================================================
     Giriş kapısı
     ============================================================ */
  function kapi() {
    document.body.innerHTML = '<div class="ad-kapi"><div class="auth-card">' +
      '<div class="center">' + g.App.logoSvg() +
        '<h1 class="h-md" style="margin-top:12px">Yönetim paneli</h1>' +
        '<p class="muted" style="margin-top:8px;font-size:14px">Bu alana yalnızca yönetici hesabı girebilir.</p></div>' +
      '<div class="uyari uyari--bilgi" style="margin-top:20px">' +
        (Auth.girisli()
          ? 'Giriş yaptınız ama bu hesap yönetici değil.'
          : 'Devam etmek için yönetici hesabıyla giriş yapın.') +
        (Auth.mod === 'local' ? '<br><br>Demo yönetici: <b>' + kacir(g.MUSH_CONFIG.adminEmail) +
          '</b> / <b>' + kacir(g.MUSH_CONFIG.adminDemoSifre) + '</b>' : '') + '</div>' +
      '<a class="btn btn--primary btn--block" href="login.html">Giriş sayfasına git</a>' +
      '<a class="btn btn--ghost btn--block" style="margin-top:8px" href="index.html">Siteye dön</a>' +
      '</div></div>';
  }

  /* ============================================================
     Başlat
     ============================================================ */
  document.addEventListener('DOMContentLoaded', async function () {
    await Auth.baslat();
    var A = g.App;
    I = A.I; para = A.para; kacir = A.kacir; bildir = A.bildir; tarih = A.tarih; sayi = A.sayi;

    if (!Auth.adminMi()) { kapi(); return; }

    var k = Auth.kullanici();
    var logoVar = !!Store.site.marka.logo;
    $('#adSide').innerHTML =
      '<a class="ad-brand" href="index.html" title="Siteye dön">' + A.logoSvg() +
        (logoVar ? '<small class="ad-brand__rol">Yönetim</small>'
                 : '<span><b>' + kacir(Store.site.marka.ad) + '</b><small>Yönetim</small></span>') + '</a>' +
      sekmeler.map(function (s) {
        if (s.grup) return '<div class="ad-grup">' + s.grup + '</div>';
        return '<button class="ad-link" data-s="' + s.id + '">' + I[s.ikon] + s.ad + '</button>';
      }).join('') +
      '<div class="ad-side__alt">' +
        '<div class="ad-link" style="cursor:default"><span class="avatar" style="width:26px;height:26px;font-size:11px">' +
          kacir((k.ad || 'A')[0].toUpperCase()) + '</span>' + kacir(k.ad) + '</div>' +
        '<button class="ad-link" id="adCikis" style="color:#c81d43">' + I.cikis + 'Çıkış</button>' +
      '</div>';

    $$('.ad-link[data-s]').forEach(function (b) {
      b.addEventListener('click', function () {
        aktif = b.dataset.s;
        location.hash = '#' + aktif;
        window.scrollTo({ top: 0 });
        ciz();
      });
    });
    $('#adCikis').addEventListener('click', async function () {
      await Auth.cikis();
      location.href = 'index.html';
    });
    window.addEventListener('beforeunload', function (e) {
      if (!kirli) return;
      e.preventDefault();
      e.returnValue = '';
    });

    ciz();
  });
})(window);
