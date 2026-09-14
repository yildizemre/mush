/* ============================================================
   LAMBAZADE — Varsayılan içerik (seed)
   Admin panelinden yapılan her değişiklik bunun üzerine yazılır.
   Yedeği "Yönetim > Yedekle" ile JSON olarak alabilirsiniz.
   ============================================================ */
(function (g) {
  'use strict';

  var URUNLER = [
    {
      id: 'kule', ad: 'Kule', altbaslik: 'Üç boğumlu masif ceviz masa lambası',
      fiyat: 11900, type: 'tiered', koleksiyon: 'dogal',
      renk: 'ahsap', renkAd: 'Masif ceviz / kırık beyaz keten', etiket: 'En çok satan', oneCikan: true, aktif: true,
      palette: { metal: '#6b3f24', shade: '#f2ece2', glow: '#ffb347' },
      gorseller: {
        kapali: 'product/class15/kapali.webp',
        acik: 'product/class15/acik.webp',
        zeminKapali: '#837b75',
        zeminAcik: '#35251c',
        galeri: []
      },
      malzeme: 'Tek kütükten tornalanmış masif ceviz gövde, pirinç boyun, keten kaplı konik abajur',
      ampul: 'E27 · maks. 1×9W LED', yukseklik: '52 cm', abajur: 'Üst Ø 18 cm · alt Ø 30 cm', agirlik: '3,1 kg',
      puan: 4.9, yorum: 186, stok: 9,
      aciklama: 'Kule, atölyenin ilk tornasında, bir ceviz kütüğünün artık parçasından doğdu. Usta Hasan kütüğü atmak yerine tezgâha bağlayıp üç boğum çıkardı; biri geniş, biri dar, biri yine geniş. Ertesi sabah üstüne bir keten abajur geçirdik ve o masa lambası hâlâ Yıldız’ın çalışma masasında duruyor. Bugün her Kule aynı yöntemle, tek parça cevizden çıkıyor — boğumlar birbirine yapıştırılmıyor, bu yüzden damar deseni tabandan boyuna kesintisiz akıyor. Ceviz yalnızca doğal yağla bırakılıyor; ilk yılın sonunda bir ton koyulaşıyor, beşinci yılda bal rengine dönüyor.',
      detay: ['Tek kütükten tornalanmış üç boğum — yapıştırma yok', 'Doğal yağ finiş, yıllar içinde koyulaşan patina', 'Keten abajur ışığı sıcak ve dağınık verir', 'Başucu ve konsol için ideal 52 cm yükseklik']
    },
    {
      id: 'surahi', ad: 'Sürahi', altbaslik: 'Ceviz testi gövdeli, siyah keten abajurlu masa lambası',
      fiyat: 12900, type: 'cone', koleksiyon: 'heykel',
      renk: 'siyah', renkAd: 'Ceviz / kömür siyahı keten', etiket: 'Atölye serisi', oneCikan: true, aktif: true,
      palette: { metal: '#8a4b26', shade: '#2a2a2c', glow: '#ffbf5e' },
      gorseller: {
        kapali: 'product/class16/kapali.webp',
        acik: 'product/class16/acik.webp',
        zeminKapali: '#716a64',
        zeminAcik: '#3b281c',
        galeri: []
      },
      malzeme: 'Torna işi ceviz testi gövde, siyah boyalı gürgen boyun, kömür siyahı keten abajur',
      ampul: 'E27 · maks. 1×9W LED', yukseklik: '56 cm', abajur: 'Üst Ø 22 cm · alt Ø 34 cm', agirlik: '3,6 kg',
      puan: 4.9, yorum: 112, stok: 5,
      aciklama: 'Formu Kütahya’daki bir çömlekçi dükkânında gördüğümüz eski bir su testisinden geliyor: omuzdan yumuşakça daralan, boynu kısa, tabanı ağır bir gövde. Sürahi’yi bu yüzden kalın bir ceviz bloğundan, içini boşaltmadan tornalıyoruz — ağırlık aşağıda kalıyor, lamba masada kıpırdamıyor. Siyah keten abajur ışığı yandan geçirmiyor; bütün ışığı aşağıya, masanın üzerine ve yukarıya tavana veriyor. Kapalıyken odada koyu bir heykel gibi duruyor, yandığında abajurun altında altın rengi bir daire açılıyor.',
      detay: ['Dolu ceviz gövde — alçak ağırlık merkezi', 'Siyah keten: yandan kamaşma yok, yukarı ve aşağı ışık', 'Anadolu testi formundan uyarlanmış siluet', 'Kablo üzerinde pirinç çevirmeli şalter']
    },
    {
      id: 'pergel', ad: 'Pergel', altbaslik: 'Bordo üçayaklı lambader',
      fiyat: 15900, type: 'tripod', koleksiyon: 'modern',
      renk: 'kirmizi', renkAd: 'Bordo lake / beyaz keten', etiket: 'Yeni', oneCikan: true, aktif: true,
      palette: { metal: '#7a1f24', shade: '#f5f3ee', glow: '#ffc46b' },
      gorseller: {
        kapali: 'product/class17/kapali.webp',
        acik: 'product/class17/acik.webp',
        zeminKapali: '#ae9f8f',
        zeminAcik: '#805830',
        galeri: []
      },
      malzeme: 'Bordo fırın lake kaplı kayın bacaklar, pirinç birleşim başlığı, beyaz keten silindir abajur',
      ampul: 'E27 · maks. 1×12W LED', yukseklik: '158 cm', abajur: 'Ø 40 cm · 24 cm silindir', agirlik: '4,4 kg',
      puan: 4.8, yorum: 73, stok: 7,
      aciklama: 'Adını bir mimarlık masasından alıyor. Yıldız, eski ofisindeki çizim pergelini açıp masaya dikince üç bacağın aynı noktada nasıl kilitlendiğini fark etti ve Pergel’in eskizini o gece çizdi. Üç kayın bacak tepede tek bir pirinç başlıkta buluşuyor; vida yok, bacaklar başlığa geçme sistemle oturuyor ve lambanın kendi ağırlığıyla sıkışıyor. Bordo lake yedi kat fırınlanıyor, derin ve neredeyse şarap rengi. Silindir keten abajur ışığı her yöne eşit dağıttığı için Pergel bir köşeyi tek başına aydınlatabiliyor.',
      detay: ['Vidasız geçme sistem — 2 dakikada kurulur', 'Yedi kat fırınlanmış bordo lake', 'Silindir keten abajur: 360° dağınık ışık', 'Bacak uçlarında parkeyi çizmeyen keçe pabuç']
    },
    {
      id: 'turunc', ad: 'Turunç', altbaslik: 'Turuncu lake boğumlu masa lambası',
      fiyat: 10400, eskiFiyat: 11900, type: 'tiered', koleksiyon: 'modern',
      renk: 'turuncu', renkAd: 'Turunç lake / kırık beyaz keten', etiket: 'İndirim', oneCikan: true, aktif: true,
      palette: { metal: '#e8622a', shade: '#f4efe6', glow: '#ffb347' },
      gorseller: {
        kapali: 'product/class18/kapali.webp',
        acik: 'product/class18/acik.webp',
        zeminKapali: '#8a817c',
        zeminAcik: '#473227',
        galeri: []
      },
      malzeme: 'Dört boğumlu torna işi gürgen gövde, turunç yarı mat lake, pirinç boyun, keten abajur',
      ampul: 'E27 · maks. 1×9W LED', yukseklik: '54 cm', abajur: 'Üst Ø 20 cm · alt Ø 32 cm', agirlik: '2,9 kg',
      puan: 4.8, yorum: 94, stok: 11,
      aciklama: 'Adı, Antalya bahçelerinde yetişen acı portakaldan geliyor. Kış sonunda ağaçta kalan turunçların rengi ne sarı ne kırmızıdır; gri bir günde bile sıcak görünür. Bu tonu tutturmak için on dört lake denemesi yaptık. Dört boğumlu gürgen gövde tornadan çıktıktan sonra üç kat astar, iki kat yarı mat lake alıyor — parlak değil, yumuşak bir ipek gibi. Nötr bir oturma odasında gözün ilk takıldığı yer oluyor; yanınca lake ışığı yakalıyor ve gövde içten yanıyormuş gibi görünüyor.',
      detay: ['Dört boğumlu torna işi gürgen gövde', 'On dört denemeyle bulunan turunç lake', 'Yarı mat finiş — parmak izi tutmaz', 'Nötr odalara tek renk vurgu']
    },
    {
      id: 'lokum', ad: 'Lokum', altbaslik: 'Gül pembesi boğumlu masa lambası',
      fiyat: 10400, type: 'tiered', koleksiyon: 'heykel',
      renk: 'pembe', renkAd: 'Gül pembesi lake / kırık beyaz keten', etiket: 'Sınırlı', oneCikan: true, aktif: true,
      palette: { metal: '#e79aae', shade: '#f6f1ea', glow: '#ffb347' },
      gorseller: {
        kapali: 'product/class19/kapali.webp',
        acik: 'product/class19/acik.webp',
        zeminKapali: '#766d65',
        zeminAcik: '#3b291c',
        galeri: []
      },
      malzeme: 'Dört boğumlu torna işi gürgen gövde, gül pembesi yarı mat lake, pirinç boyun, keten abajur',
      ampul: 'E27 · maks. 1×9W LED', yukseklik: '46 cm', abajur: 'Üst Ø 18 cm · alt Ø 28 cm', agirlik: '2,5 kg',
      puan: 5.0, yorum: 41, stok: 4,
      aciklama: 'Lokum, Turunç’un küçük kardeşi. Bir müşterimiz kızının odası için “Turunç’u pembe yapabilir misiniz?” diye yazdı; tek bir parça boyadık, fotoğrafını paylaştık ve bir hafta içinde kırk sipariş geldi. Rengi Eminönü’ndeki eski bir akide dükkânının gül lokumundan aldık: tatlı ama çocuksu olmayan, tozlu bir pembe. Gövde Turunç’tan sekiz santim kısa, yatak odası komodinine ve okuma köşesine göre ölçülendi. Lake yalnızca küçük partiler halinde hazırlandığı için Lokum her ay sınırlı sayıda üretiliyor.',
      detay: ['Komodin boyu: 46 cm', 'Tozlu gül pembesi, yarı mat lake', 'Aylık sınırlı parti üretim', 'Yatak odası ve çocuk odası için sıcak 2700K önerilir']
    }
  ];

  // ---- Hediye kartları: mağazada listelenmez (aktif:false), sepete eklenir ----
  [5000, 10000, 15000, 25000, 50000].forEach(function (t) {
    URUNLER.push({
      id: 'hediye-' + t,
      ad: 'Hediye Kartı · ' + t.toLocaleString('tr-TR') + ' ₺',
      altbaslik: 'Dijital hediye kartı — e-posta ile teslim',
      fiyat: t, type: 'cone', koleksiyon: 'modern',
      renk: 'kirmizi', renkAd: 'Dijital kart',
      aktif: false, sanal: true, hediyeKarti: true,
      palette: { metal: '#8b3316', shade: '#c4623b', glow: '#ffb347' },
      malzeme: 'Dijital ürün — kargo gönderilmez',
      ampul: '—', yukseklik: '—', abajur: '—', agirlik: '0 kg',
      puan: 5, yorum: 0, stok: 999,
      aciklama: 'Tutarı ' + t.toLocaleString('tr-TR') + ' ₺ olan dijital hediye kartı. ' +
        'Ödeme tamamlandığında kart numarası ekranda gösterilir ve alıcının e-posta ' +
        'adresine gönderilir. 24 ay geçerlidir, kısmi kullanıma açıktır.',
      detay: ['E-posta ile anında teslim', '24 ay geçerli', 'Kısmi kullanıma açık', 'Kargo gönderilmez']
    });
  });

  var SITE = {
    marka: {
      ad: 'Lambazade',
      slogan: 'Lamba Atölyesi',
      logo: 'assets/lambazade-logo.png',        // açık tema (kiremit)
      logoKoyu: 'assets/lambazade-logo-beyaz.png', // koyu tema (krem) — boşsa çizim + site adı
      logoYuksekligi: 64  // px — header'daki yükseklik
    },

    tema: {
      anaRenk: '#b4441f',      // Lambazade kiremiti (logodan)
      anaRenkKoyu: '#8b3316',
      isikRengi: '#ffb347',    // lamba ışığı — marka renginden bağımsız, sıcak
      kose: 20
    },

    duyuru: {
      aktif: false,   // üstteki ince şerit — panelden tekrar açılabilir
      metin: '7.500 ₺ üzeri kargo bizden · 30 gün koşulsuz iade',
      link: 'shop.html'
    },

    header: {
      menu: [
        { ad: 'Bauhaus', yol: 'shop.html?koleksiyon=modern' },
        { ad: 'Art Deco', yol: 'shop.html?koleksiyon=heykel' },
        { ad: 'Vernaküler', yol: 'shop.html?koleksiyon=dogal' },
        { ad: 'Hakkımızda', yol: 'hakkimizda.html' }
      ],
      cta: { ad: 'Koleksiyon', yol: 'shop.html' }
    },

    hero: {
      etiket: 'Bomonti Atölyesi · 2026 Koleksiyonu',
      baslik: 'Işığı bir mobilya gibi',
      baslikVurgu: 'kurgula.',
      metin: 'Bir lamba satın almıyorsunuz; odanızın akşam nasıl göründüğüne karar veriyorsunuz. Beş gövdenin her biri, ışığın masada ve duvarda bıraktığı daire ölçülerek tasarlandı — ceviz tek kütükten tornalandı, lake yedi kat fırınlandı, keten abajur elde dikildi. Hiçbiri fason değil, hepsi Bomonti’deki atölyeden çıkıyor.',
      btn1: { ad: 'Koleksiyonu keşfet', yol: 'shop.html' },
      btn2: { ad: 'Atölyeyi gör', yol: '#bolumAtolye' },
      urunId: 'surahi',
      istatistik: [
        { sayi: '5', etiket: 'gövde tasarımı' },
        { sayi: '4.8', etiket: 'ortalama puan' },
        { sayi: '3 yıl', etiket: 'atölye garantisi' }
      ]
    },

    seritler: [
      'El dikimi keten abajur',
      'Tek kütükten masif ceviz',
      'Tüm siparişlerde ücretsiz kargo',
      '30 gün koşulsuz iade',
      'Numaralı atölye üretimi'
    ],

    // Hero altındaki güven şeridi
    guven: {
      aktif: true,
      ogeler: [
        { ikon: 'atolye', baslik: 'Numaralı atölye üretimi', metin: 'Her gövdenin kendi seri numarası ve üretim kaydı var' },
        { ikon: 'kalkan', baslik: '5 yıl garanti', metin: 'Elektronik aksam ve finiş dahil' },
        { ikon: 'iade', baslik: '30 gün koşulsuz iade', metin: 'Kurduktan sonra bile — dönüş kargosu bizde' },
        { ikon: 'kargo', baslik: 'Sigortalı ücretsiz kargo', metin: 'Tüm siparişlerde · İstanbul içi kurulum dahil' }
      ]
    },

    // Tam genişlikte koyu atmosfer bandı
    atmosfer: {
      aktif: true,
      etiket: 'Akşam 21:40',
      baslik: 'Odanın karakteri bu saatte belli olur.',
      metin: 'Gündüz her lamba aynı görünür. Fark, tavan lambasını kapattığınızda ortaya çıkar: ışığın duvarda çizdiği dairenin kenarı ne kadar yumuşak, gölge nerede bitiyor, kitap sayfasında parlama var mı. Beş gövdenin hepsini bu saatte, gerçek bir odada test ederek tasarladık.',
      urunId: 'pergel',
      btn: { ad: 'Gövdeleri gör', yol: 'shop.html' }
    },

    bolumler: {
      oneCikanlar: {
        aktif: true, etiket: 'Seçkiler', baslik: 'Bu ay en çok ışık verenler', metin: '',
        // Gösterilecek gövdeler ve sırası — panelden değiştirilebilir
        urunler: ['kule', 'surahi', 'pergel', 'turunc']
      },
      koleksiyonlar: { aktif: true, etiket: 'Üç mimari dil', baslik: 'Koleksiyonlar', metin: 'Aynı atölye, üç ayrı mimari dil: Bauhaus’un işlevselliği, Art Deco’nun gösterişi ve vernaküler geleneğin el işçiliği.' },
      atolye: { aktif: true, etiket: 'Atölye', baslik: 'Beş adım, tek çatı, altmış iki gün', metin: 'Bir gövdenin ilk çiziminden kutuya girmesine kadar ortalama 62 gün geçiyor. Torna, lake, pirinç, dikim ve test — hepsi Bomonti’deki 180 m²’lik atölyede, aynı altı kişilik ekip tarafından yapılıyor. Fason üretim yaptırmıyoruz; bu yüzden koleksiyon yavaş büyüyor.' },
      yorumlar: { aktif: true, etiket: 'Müşteri değerlendirmeleri', baslik: 'Işığı evine alanlar ne diyor?', metin: 'Yorumların tamamı sipariş teslim edildikten sonra, doğrulanmış alıcılar tarafından yazıldı.' },
      bulten: { aktif: true, etiket: 'Atölye mektubu', baslik: 'Yeni gövdeleri ilk sen gör', metin: 'Ayda bir e-posta: yeni koleksiyonlar, atölye notları, ışık rehberleri.' }
    },

    atolyeAdimlar: [
      { sure: '14 gün', baslik: 'Çizim ve 1:5 maket',
        metin: 'Her gövde kâğıtta değil, maketle başlar. Maketi karanlık bir odaya koyup ışığın masada bıraktığı dairenin çapını ölçüyoruz. Ölçü tutmazsa gövde üretime girmiyor — koleksiyona giremeyen dokuz tasarım var.' },
      { sure: '11 gün', baslik: 'Kütük seçimi ve torna',
        metin: 'Ceviz ve gürgen kütükler iki yıl kurutulmuş olarak geliyor. Kule’nin üç boğumu tek parçadan tornada çıkıyor, hiçbiri yapıştırma değil. Ahşap sonra iki hafta dinlendiriliyor; nemini vermeden yağ ya da lake sürülmüyor.' },
      { sure: '16 gün', baslik: 'Lake ve fırın',
        metin: 'Turunç ve Lokum üç kat astar, iki kat yarı mat lake alıyor; Pergel’in bordo bacakları yedi kat fırınlanıyor. Her kattan sonra elde ince zımpara yapılıyor — yüzeydeki ipek dokunun sırrı bu.' },
      { sure: '9 gün', baslik: 'Pirinç boyun ve abajur dikimi',
        metin: 'Pirinç boyunlar tornada çekilip fırçalanıyor, vernikle kapatılmıyor. Keten abajur kumaşı Denizli’den geliyor; kesim, germe ve dikiş atölyede elde yapılıyor.' },
      { sure: '12 gün', baslik: 'Yanık test, numara, kayıt',
        metin: 'Her lamba 24 saat kesintisiz yanık bırakılıyor; duy ısısı ve abajur rengi ölçülüyor. Testi geçen gövde numaralanıyor, üretim kaydı arşivleniyor, sonra kutuya giriyor.' }
    ],

    // Üretim kaydı — zengin marka dokunuşu
    uretimKaydi: {
      aktif: true,
      video: 'assets/uretim-web.mp4',
      poster: 'assets/uretim-poster.jpg',
      etiket: 'Üretim kaydı',
      baslik: 'Sizin gövdenizin nasıl yapıldığını izleyin',
      metin: 'Sipariş numaranız atölyeye düştüğü andan kutuya girdiği ana kadar tezgâh üstü kameralar kayıtta. Teslimattan sonra size özel bir bağlantı gönderiyoruz: kendi lambanızın tornası, lakesi, abajur dikimi ve 24 saatlik yanık testini hızlandırılmış olarak izleyebiliyorsunuz. Kayıt 12 ay saklanıyor, sonra siliniyor.',
      maddeler: [
        'Tezgâh üstü 4 kamera — yalnızca üretim alanı, çalışan yüzü kadraja alınmaz',
        'Teslimattan 48 saat sonra e-posta ile özel bağlantı',
        '24 saatlik yanık testinin ölçüm raporu PDF olarak ekte',
        'Kayıt 12 ay saklanır; isterseniz erken silinmesini talep edebilirsiniz'
      ]
    },

    // Hediye kartı
    hediye: {
      aktif: true,
      etiket: 'Hediye kartı',
      baslik: 'Işığı siz seçmeyin, o seçsin',
      metin: 'Lamba hediye etmek risklidir — odayı bilmeyen kimse doğru gövdeyi seçemez. Hediye kartı bu işi alıcıya bırakıyor: tutarı siz belirliyorsunuz, kart e-posta ile anında gidiyor, 24 ay geçerli.',
      tutarlar: [5000, 10000, 15000, 25000, 50000],
      btnAd: 'Hediye kartı al',
      teslimNotu: 'Ödeme tamamlandığında kart numarası hem ekranda görünür hem de alıcının e-posta adresine gönderilir.',
      maddeler: [
        'E-posta ile anında teslim, dilerseniz ileri tarihli gönderim',
        '24 ay geçerli, kısmi kullanıma açık',
        'Kalan bakiye kartta kalır, ikinci siparişte kullanılır',
        'Kart tutarı iade edilmez ama devredilebilir'
      ]
    },

    // Yorum bölümü başlığındaki puan özeti
    puanOzet: {
      ortalama: 4.8,
      adet: 1247,
      dagilim: [
        { etiket: 'Işık kalitesi', deger: 96 },
        { etiket: 'Malzeme', deger: 94 },
        { etiket: 'Kurulum kolaylığı', deger: 91 }
      ]
    },

    yorumlar: [
      {
        metin: 'Sürahi’yi çalışma masama aldım. Siyah abajur yüzünden ekrana hiç yansıma yapmıyor, bütün ışık klavyeye ve kâğıda düşüyor. Kapalıyken de odada küçük bir heykel gibi duruyor; misafirler ilk onu soruyor.',
        kisi: 'Deniz Karaca', yer: 'Kadıköy, İstanbul', puan: 5,
        urunId: 'surahi', dogrulanmis: true, tarih: '2026-07-18'
      },
      {
        metin: 'İç mimarım. Pergel’i önce kendi evime aldım, sonra üç projede kullandım. Vidasız geçme sistem gerçekten iki dakikada kuruluyor ve bordo lake fotoğraftakinden daha derin. Bu işçiliği bu fiyatta başka yerde görmedim.',
        kisi: 'Selin Aydın', yer: 'Alsancak, İzmir', puan: 5,
        urunId: 'pergel', dogrulanmis: true, tarih: '2026-06-02'
      },
      {
        metin: 'Kule’nin cevizini elle tuttuğunuzda boğumların tek parça olduğunu anlıyorsunuz, birleşim yeri yok. Başucumuzda iki tane var; keten abajur ışığı o kadar yumuşak veriyor ki yatmadan önce tavan lambasını hiç açmıyoruz.',
        kisi: 'Mert Toprak', yer: 'Çankaya, Ankara', puan: 5,
        urunId: 'kule', dogrulanmis: true, tarih: '2026-08-09'
      }
    ],

    footer: {
      metin: 'İstanbul Bomonti’deki atölyemizde tornalanan, lakelenen ve elde montajlanan lambalar. Işığı bir mobilya gibi kurguluyoruz.',
      adres: 'Bomonti Ada · Şişli / İstanbul',
      sutunlar: [
        {
          baslik: 'Mağaza', linkler: [
            { ad: 'Tüm lambalar', yol: 'shop.html' },
            { ad: 'Bauhaus', yol: 'shop.html?koleksiyon=modern' },
            { ad: 'Art Deco', yol: 'shop.html?koleksiyon=heykel' },
            { ad: 'Vernaküler', yol: 'shop.html?koleksiyon=dogal' }
          ]
        },
        {
          baslik: 'Yardım', linkler: [
            { ad: 'Kargo ve teslimat', yol: 'kargo.html' },
            { ad: 'İade ve değişim', yol: 'iade.html' },
            { ad: 'Ampul rehberi', yol: 'ampul-rehberi.html' },
            { ad: 'Garanti', yol: 'garanti.html' },
            { ad: 'İletişim formu', yol: 'iletisim.html' },
            { ad: 'WhatsApp ile yaz', yol: 'whatsapp' }
          ]
        },
        {
          baslik: 'Hesap', linkler: [
            { ad: 'Giriş yap', yol: 'login.html' },
            { ad: 'Üye ol', yol: 'login.html#uye' },
            { ad: 'Siparişlerim', yol: 'account.html' },
            { ad: 'Favorilerim', yol: 'account.html#favoriler' }
          ]
        },
        {
          baslik: 'Kurumsal', linkler: [
            { ad: 'Hakkımızda', yol: 'hakkimizda.html' },
            { ad: 'Atölyemiz', yol: 'hakkimizda.html#zanaat' },
            { ad: 'İletişim', yol: 'iletisim.html' },
            { ad: 'Hediye kartı', yol: 'index.html#bolumHediye' }
          ]
        }
      ],
      altMetin: 'Örnek/demo vitrin · Ürünler ve fiyatlar kurgudur'
    },

    iletisim: {
      telefon: '+90 541 862 91 90',
      eposta: 'merhaba@lambazade.com',
      whatsappAktif: true
    },

    // Taksit — sepette ve ürün sayfasında gösterilir
    odeme: {
      taksitAktif: true,
      enFazlaTaksit: 12,
      taksitler: [1, 3, 6, 9, 12],
      vadeFarksizMax: 6,          // bu sayıya kadar vade farkı yok
      notu: 'Tüm kartlara 6 taksite kadar vade farksız'
    },

    // Siteye ilk gelene açılan indirim kutusu
    karsilama: {
      aktif: true,
      etiket: 'Atölyeye hoş geldiniz',
      oran: '%10',
      baslik: 'İlk gövdeniz indirimli',
      metin: 'Kodu sepette kullanın. Beş gövdenin tamamında geçerli, son kullanma tarihi yok.',
      kod: 'MERHABA',
      kapatYazi: 'Şimdi değil',
      btnAd: 'Koleksiyona göz at',
      btnYol: 'shop.html',
      urunId: 'kule',
      gecikmeMs: 1600
    },

    kargo: {
      ucretsizLimit: 0,            // 0 = her siparişte ücretsiz
      ucret: 0,
      sure: '2–5 iş günü',
      sigortali: true,
      firmalar: ['Aras Kargo', 'MNG Kargo', 'Sürat Lojistik'],
      firmaNotu: 'Kırılabilir ürünlerde Sürat Lojistik paletli taşıma',
      montaj: 'İstanbul içi ücretsiz kurulum'
    },

    // 'temaya-gore' : açık temada lambalar kapalı, koyu temada yanık (önerilen)
    // 'acik' / 'kapali' : her zaman sabit
    urunIsigi: 'temaya-gore',

    // ---- Hakkımızda sayfası (panelden düzenlenir) ----
    hakkimizda: {
      etiket: 'Hakkımızda',
      baslik: 'Bir odayı değiştiren şey mobilya değil,',
      baslikVurgu: 'ışığın düştüğü yerdir.',
      girisMetni: 'Lambazade 2016’da Bomonti’de, üç kişilik bir atölyede başladı. Adı, eski İstanbul’da lambacı ustalarına verilen lakaptan geliyor: lambanın evladı. Amacımız basitti: Türkiye’de üretilmiş, ithal muadillerine baktığınızda “bu daha iyi” diyeceğiniz bir lamba yapmak. Bugün beş gövde tasarımımız var, hepsi hâlâ aynı çatı altında elde üretiliyor.',

      rakamlar: [
        { sayi: '2016', etiket: 'Kuruluş', aciklama: 'Bomonti’de 40 m²’lik bir atölyede' },
        { sayi: '180 m²', etiket: 'Atölye', aciklama: 'Kalıp, kaynak, finiş ve dikim aynı yerde' },
        { sayi: '5', etiket: 'Gövde tasarımı', aciklama: 'Hepsi kendi çizimimiz' },
        { sayi: '9.400+', etiket: 'Teslim edilen lamba', aciklama: '81 ile gönderildi' }
      ],

      hikaye: {
        baslik: 'Nasıl başladı',
        paragraflar: [
          'Kurucumuz bir mimarlık ofisinde çalışırken aynı sorunla sürekli karşılaşıyordu: proje bitiyor, mobilya yerleşiyor, sonra aydınlatmaya sıra geldiğinde ya fahiş fiyatlı bir ithal parça ya da ucuz ama ruhsuz bir kopya arasında seçim yapmak gerekiyordu. Arada hiçbir şey yoktu.',
          'İlk gövde — bugün Kule olarak sattığımız model — bir hafta sonunda, ödünç alınmış eski bir torna tezgâhında, bir ceviz kütüğünün artık parçasından yapıldı. Ofis arkadaşlarına gösterdi, üç kişi “bana da yapar mısın” dedi. O üç sipariş atölyenin kirasını ödedi.',
          'Sekiz yıl sonra hâlâ aynı prensiple çalışıyoruz: bir gövdeyi ancak kendi evimize koymak isteyeceksek üretime alıyoruz. Bu yüzden koleksiyon yavaş büyüyor. Yılda iki, bazen üç yeni model çıkarıyoruz — bazı yıllar hiç çıkarmıyoruz.'
        ],
        imzaAd: 'Yıldız',
        imzaRol: 'Kurucu ve baş tasarımcı'
      },

      ilkeler: [
        {
          baslik: 'Az sayıda, iyi yapılmış',
          metin: 'Katalogda 200 ürün yok. Beş gövde var ve her birinin neden var olduğunu anlatabiliyoruz. Bir modeli beğenmezsek, satıyor olsa bile üretimden çıkarıyoruz.'
        },
        {
          baslik: 'Malzemeyi saklamıyoruz',
          metin: 'Pirinç pirinçtir, boyayıp “altın” demiyoruz. Cevizin damarı her parçada farklıdır, bunu kusur diye pazarlamıyoruz. Ahşap zamanla koyulaşır — bu ürünün yaşlanması, bozulması değil.'
        },
        {
          baslik: 'Tek çatı, tek sorumluluk',
          metin: 'Kalıptan kutuya kadar her adım bizde. Bir vida gevşediğinde arayacağınız numara üretimi yapan ekibin numarası. Fason üretim yaptırmıyoruz.'
        },
        {
          baslik: 'On yıl yedek parça',
          metin: 'Ürettiğimiz her gövdenin yedek parçasını üretimden çıktıktan on yıl sonrasına kadar stokta tutuyoruz. Bir lamba, duyu bozulduğu için çöpe gitmemeli.'
        }
      ],

      zanaat: [
        {
          baslik: 'Lake ve pirinç',
          metin: 'Lake gövdeler üç kat astar ve iki kat yarı mat lake alıyor, her kattan sonra elde zımparalanıyor. Pirinç boyunlar tornada çekilip fırçalanıyor; vernikle kapatmıyoruz, zamanla patina alsın istiyoruz.'
        },
        {
          baslik: 'Ahşap',
          metin: 'Masif ceviz ve gürgen kullanıyoruz, hepsi FSC sertifikalı ve iki yıl kurutulmuş. Ceviz gövdeleri doğal yağla bırakıyoruz; damarı görünsün, eline alan ahşabı hissetsin.'
        },
        {
          baslik: 'Kumaş',
          metin: 'Keten ve pamuk karışımı abajur kumaşları Denizli’de dokunuyor, kesim, germe ve dikim atölyede elde yapılıyor. Keten dokusu ışığı yumuşatıyor; iki abajurun dokusu asla birebir aynı olmuyor.'
        }
      ],

      alinti: {
        metin: 'Her lambayı kutusuna koymadan önce 24 saat yanık bırakıyoruz. Bu testte yılda ortalama on beş gövde geri dönüyor — o on beşi kimse görmüyor, ama sizin eve gitmeyecekleri kesin.',
        kisi: 'Atölye ekibi'
      },

      kapanis: {
        baslik: 'Atölyeyi görmek ister misiniz?',
        metin: 'Bomonti’deki atölyemize randevuyla geliyoruz. Gövdeleri yanıkken görmek, ekranda bakmaktan çok farklı — hangi ışığın sizin odanıza oturduğuna orada karar vermek çok daha kolay.',
        btn1: { ad: 'Randevu için yazın', yol: 'whatsapp' },
        btn2: { ad: 'Koleksiyonu gör', yol: 'shop.html' }
      }
    },

    // ---- Yardım / bilgi sayfaları (footer'dan bağlanır, panelden düzenlenir) ----
    bilgiSayfalari: {
      kargo: {
        baslik: 'Kargo ve teslimat',
        ozet: 'Siparişiniz atölyeden çıkana kadar ve çıktıktan sonra ne oluyor.',
        bolumler: [
          {
            baslik: 'Kargo ücreti',
            metin: 'Tüm siparişlerde kargo bizden, tutar sınırı yok. Gönderiler Aras Kargo, MNG Kargo ve Sürat Lojistik ile sigortalı olarak yapılır.'
          },
          {
            baslik: 'Hazırlık ve teslim süresi',
            metin: 'Stokta olan ürünler 1–3 iş günü içinde kargoya verilir. Ürün sayfasında “son 3 adet” yazıyorsa o parça atölyede sıradaki üretime kalmış olabilir; bu durumda hazırlık 2–3 haftaya çıkar ve sipariş sonrası sizi arayıp tarih veririz.',
            liste: [
              'İstanbul içi: kargoya verildikten sonra 1 iş günü',
              'Diğer iller: 2–4 iş günü',
              'Köy / belde teslimatları: +1 iş günü'
            ]
          },
          {
            baslik: 'Nasıl paketliyoruz',
            metin: 'Gövde çift katmanlı köpük kalıpla, abajur ayrı bir kutuda gönderilir. Lake yüzeyler çizilmesin diye ayrıca kumaş kılıfa sarılır. Kutunun üzerinde “kırılabilir” etiketi bulunur.'
          },
          {
            baslik: 'Teslimatta ne yapmalısınız',
            metin: 'Kutuyu kurye önünde kontrol edin. Ezik, yırtık veya ıslaklık varsa teslim almayın; kurye ile birlikte hasar tespit tutanağı doldurup bize bildirin. Aynı gün yeni ürün gönderiyoruz, kargo masrafı bizde.'
          }
        ],
        sss: [
          { soru: 'Kargo takip kodumu nereden görürüm?', cevap: 'Ürün kargoya verildiğinde e-posta ile gönderiyoruz. Üye girişi yaptıysanız “Hesabım → Siparişlerim” sayfasında da görünür.' },
          { soru: 'Belirli bir güne teslimat isteyebilir miyim?', cevap: 'Evet. Sipariş notuna yazın ya da WhatsApp’tan bize ulaşın; kargo firmasıyla gün bazlı planlama yapıyoruz.' },
          { soru: 'Yurt dışına gönderiyor musunuz?', cevap: 'Şimdilik yalnızca Türkiye içine gönderim yapıyoruz. Yurt dışı talepleri için WhatsApp’tan yazın, tek tek değerlendiriyoruz.' }
        ]
      },

      iade: {
        baslik: 'İade ve değişim',
        ozet: '30 gün koşulsuz iade — kurduktan sonra bile.',
        bolumler: [
          {
            baslik: '30 gün, koşulsuz',
            metin: 'Ürünü teslim aldığınız günden itibaren 30 gün içinde sebep belirtmeden iade edebilirsiniz. Kutusundan çıkarmış, kurmuş, hatta bir hafta yakmış olmanız fark etmez — lambanın odanızda nasıl durduğunu ancak deneyerek anlarsınız.'
          },
          {
            baslik: 'Nasıl iade edilir',
            metin: 'Üç adım:',
            liste: [
              'WhatsApp’tan veya e-posta ile sipariş numaranızı yazıp iade talebinizi iletin',
              'Aynı gün size ücretsiz kargo kodu gönderiyoruz',
              'Ürünü orijinal kutusuyla paketleyip kodu kuryeye verin'
            ]
          },
          {
            baslik: 'Para iadesi',
            metin: 'Ürün atölyeye ulaşıp kontrol edildikten sonra 3 iş günü içinde iade işlemini başlatıyoruz. Kredi kartına yapılan iadeler bankanıza bağlı olarak 2–10 iş günü içinde hesabınıza yansır; havale ile ödediyseniz aynı IBAN’a geri gönderiyoruz.'
          },
          {
            baslik: 'Değişim',
            metin: 'Başka bir modelle ya da farklı bir finişle değiştirmek isterseniz fiyat farkını tamamlamanız yeterli. Fiyat farkı lehinize ise aradaki tutarı iade ediyoruz. Değişim kargosunu biz karşılıyoruz.'
          },
          {
            baslik: 'İade alınamayan durumlar',
            metin: 'Şu iki durum kapsam dışıdır:',
            liste: [
              'Kullanıcı kaynaklı fiziksel hasar (düşürme, kırılma, yanlış voltajda kullanma)',
              'Özel sipariş / ölçüye göre üretilmiş parçalar (sipariş öncesi bunu ayrıca belirtiyoruz)'
            ]
          }
        ],
        sss: [
          { soru: 'Orijinal kutusunu attım, iade edebilir miyim?', cevap: 'Edebilirsiniz ama ürünün yolda zarar görmemesi için bize yazın — uygun bir kutu gönderelim.' },
          { soru: 'Cayma hakkı süresi 14 gün değil mi?', cevap: 'Yasal cayma hakkı 14 gün. Biz bunu kendi isteğimizle 30 güne çıkarıyoruz.' },
          { soru: 'Ampulü de iade etmem gerekiyor mu?', cevap: 'Ampuller kutuda gelmiyor, dolayısıyla iade kapsamında da değil.' }
        ]
      },

      ampul: {
        baslik: 'Ampul rehberi',
        ozet: 'Doğru ampul, lambaderin yarısı. Hangi üründe ne kullanmalı?',
        bolumler: [
          {
            baslik: 'Kısa cevap',
            metin: '2700K sıcak beyaz, masa lambaları için 470–806 lümen, lambader için 806 lümen (60W eşdeğeri) bir LED alın. Tüm modellerimiz klasik E27 duy kullanır.'
          },
          {
            baslik: 'Renk sıcaklığı — en önemli ayar',
            metin: 'Kelvin (K) değeri ışığın rengini belirler. Oturma odası ve yatak odasında 2700K’nin altına inmeyin, üstüne de çıkmayın:',
            liste: [
              '2200K — çok sarı, mum ışığı; dekoratif ama okumaya yetmez',
              '2700K — sıcak beyaz; salon, yatak odası, okuma koltuğu için doğru seçim',
              '3000K — nötre yakın; banyo ve çalışma masası için uygun',
              '4000K ve üzeri — soğuk beyaz; keten abajurlarda dokuyu grileştirir, evde kullanmayın'
            ]
          },
          {
            baslik: 'Watt değil, lümen',
            metin: 'LED’lerde parlaklığı watt değil lümen gösterir. Kabaca karşılıkları:',
            liste: [
              '470 lm (≈40W) — ortam ışığı, ikincil aydınlatma',
              '806 lm (≈60W) — Pergel ve okuma köşeleri için önerimiz',
              '470 lm (≈40W) — Kule, Sürahi, Turunç ve Lokum başucunda yeterli',
              'Ürün sayfasındaki maksimum watt sınırını aşmayın — abajur ısınır'
            ]
          },
          {
            baslik: 'Dimmer kullanacaksanız',
            metin: 'Harici bir dimmer ya da akıllı priz kullanacaksanız ampulün kutusunda “dimmable” yazması şart. Dimmable olmayan bir LED’i kısmaya çalışırsanız titrer, vızıldar ve ömrü kısalır.'
          },
          {
            baslik: 'Hangi üründe hangi duy',
            metin: 'Koleksiyondaki duy tipleri:',
            liste: [
              'E27 (klasik büyük duy) — Kule, Sürahi, Turunç, Lokum: maks. 9W LED',
              'E27 — Pergel lambader: maks. 12W LED',
              'Ampul kutuda gelmez; önerimiz 2700K, dimmable, opal (buzlu) cam LED'
            ]
          }
        ],
        sss: [
          { soru: 'Filament (edison) ampul kullanabilir miyim?', cevap: 'Kullanabilirsiniz ama keten abajurlarda filamentin sıcaklığı kumaşı zamanla sarartabilir; 4W–6W düşük ısılı LED filament seçin.' },
          { soru: 'Akıllı ampul takabilir miyim?', cevap: 'Evet, tüm modellerimize Philips Hue / Ikea Trådfri gibi E27 akıllı ampuller takılır.' },
          { soru: 'Ampul kutuda geliyor mu?', cevap: 'Hayır. Herkesin ışık tercihi farklı olduğu için ampulü kutuya koymuyoruz.' }
        ]
      },

      garanti: {
        baslik: 'Garanti',
        ozet: '3 yıl atölye garantisi — elektronik aksam dahil.',
        bolumler: [
          {
            baslik: 'Kapsam',
            metin: 'Satın alma tarihinden itibaren 3 yıl boyunca üretim ve malzeme kaynaklı tüm arızaları ücretsiz onarıyoruz. Onarım mümkün değilse ürünü yenisiyle değiştiriyoruz.',
            liste: [
              'Duy, kablo, şalter, dimmer ve entegre LED sürücüleri',
              'Kaynak ve birleşim noktalarındaki ayrılmalar',
              'Boya ve kaplamada kendiliğinden dökülme, kabarma',
              'Taban ağırlığı kaynaklı denge sorunları'
            ]
          },
          {
            baslik: 'Kapsam dışı',
            metin: 'Şunlar garanti dışındadır:',
            liste: [
              'Düşme, çarpma, taşıma sırasında oluşan fiziksel hasar',
              'Yanlış voltaj ya da ürün sayfasında belirtilen maksimum watt değerinin üzerinde ampul kullanımı',
              'Ampuller (sarf malzemesi sayılır)',
              'Doğal malzemelerin zamanla renk değiştirmesi — cevizin koyulaşması, pirincin patina alması bir kusur değil, tasarımın parçasıdır'
            ]
          },
          {
            baslik: 'Nasıl başvurulur',
            metin: 'Sipariş numaranız ve sorunun fotoğrafı/videosuyla WhatsApp’tan yazın. Çoğu arızayı görüntüden teşhis edip yedek parçayı kargoyla gönderiyoruz — ürünü göndermenize gerek kalmıyor. Parça değişimiyle çözülemeyen durumlarda kargoyu biz karşılayarak ürünü atölyeye alıyoruz.'
          },
          {
            baslik: 'Garanti sonrası',
            metin: '3 yıl dolduktan sonra da ürününüzü onarıyoruz; bu durumda yalnızca parça ve kargo bedelini alıyoruz, işçilik ücreti almıyoruz. Ürettiğimiz her gövdenin yedek parçasını üretimden 10 yıl sonrasına kadar stokta tutuyoruz.'
          }
        ],
        sss: [
          { soru: 'Garanti belgesi kutuda mı geliyor?', cevap: 'Kutuda numaralı bir atölye kartı var. Ayrıca sipariş kaydınız bizde duruyor; belge kaybolsa bile sipariş numarasıyla garanti işler.' },
          { soru: 'İkinci el aldım, garanti geçerli mi?', cevap: 'Garanti ürüne bağlıdır, kişiye değil. Ürünün seri numarasıyla başvurabilirsiniz.' },
          { soru: 'Abajuru yıkarken lekelendi, garanti kapsamında mı?', cevap: 'Keten kılıflar yıkanabilir ama 30°C üzerinde yıkama ve kurutma makinesi çekmeye yol açar; bu kullanıcı kaynaklı sayılır. Yeni kılıfı maliyetine gönderiyoruz.' }
        ]
      }
    },

    seo: {
      baslik: 'Lambazade — El Yapımı Lamba Atölyesi',
      aciklama: 'İstanbul Bomonti’de tornalanan masif ceviz ve lake gövdeli masa lambaları ve lambaderler.'
    }
  };

  var KOLEKSIYONLAR = [
    {
      slug: 'modern', ad: 'Bauhaus', anaSayfa: true,
      ozet: 'İşlev önce gelir: net geometri, cesur renk ve süslemesiz birleşimler.'
    },
    {
      slug: 'heykel', ad: 'Art Deco', anaSayfa: true,
      ozet: 'Heykelsi siluetler, derin tonlar ve pirinç detay. Kapalıyken de odada duran gövdeler.'
    },
    {
      slug: 'dogal', ad: 'Vernaküler', anaSayfa: true,
      ozet: 'Yerel malzeme, el işçiliği: tek kütükten ceviz ve elde dikilmiş keten.'
    }
  ];

  var RENKLER = [
    { slug: 'ahsap', ad: 'Ceviz', hex: '#6b3f24' },
    { slug: 'siyah', ad: 'Siyah', hex: '#2c2c30' },
    { slug: 'kirmizi', ad: 'Bordo', hex: '#7a1f24' },
    { slug: 'turuncu', ad: 'Turuncu', hex: '#e8622a' },
    { slug: 'pembe', ad: 'Pembe', hex: '#e79aae' }
  ];

  var KAMPANYALAR = [
    { id: 'k0', kod: 'MERHABA', tip: 'yuzde', deger: 10, minTutar: 0, aktif: true, baslik: 'Hoş geldin indirimi', aciklama: 'İlk siparişinizde %10' },
    { id: 'k1', kod: 'LAMBA10', tip: 'yuzde', deger: 10, minTutar: 0, aktif: true, baslik: 'Hoş geldin indirimi', aciklama: 'İlk siparişinde %10' },
    { id: 'k2', kod: 'ISIK15', tip: 'yuzde', deger: 15, minTutar: 10000, aktif: true, baslik: 'Işık festivali', aciklama: '10.000 ₺ üzeri %15' },
    { id: 'k3', kod: 'KARGO0', tip: 'kargo', deger: 0, minTutar: 0, aktif: true, baslik: 'Ücretsiz kargo', aciklama: 'Tutar sınırı olmadan kargo bedava' },
    { id: 'k4', kod: 'LAMBA500', tip: 'tutar', deger: 500, minTutar: 6000, aktif: false, baslik: '500 ₺ indirim', aciklama: '6.000 ₺ üzeri 500 ₺ indirim' }
  ];

  g.MUSH_SEED = {
    site: SITE,
    urunler: URUNLER,
    koleksiyonlar: KOLEKSIYONLAR,
    renkler: RENKLER,
    kampanyalar: KAMPANYALAR,
    siparisler: []
  };
})(window);
