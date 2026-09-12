/* ============================================================
   MUSH — Varsayılan içerik (seed)
   Admin panelinden yapılan her değişiklik bunun üzerine yazılır.
   Yedeği "Yönetim > Yedekle" ile JSON olarak alabilirsiniz.
   ============================================================ */
(function (g) {
  'use strict';

  var URUNLER = [
    {
      id: 'atlas-kol', ad: 'Atlas Kol', altbaslik: 'Karşı ağırlıklı pirinç okuma lambaderi',
      fiyat: 14900, type: 'arc', koleksiyon: 'modern',
      renk: 'pirinc', renkAd: 'Eskitme pirinç', etiket: 'En çok satan', oneCikan: true, aktif: true,
      palette: { metal: '#c2a06a', shade: '#f0e6d2', glow: '#ffbf5e' },
      gorseller: {
        kapali: 'product/class1/kapali.webp',
        acik: 'product/class1/acik.webp',
        zeminKapali: '#e1e1dd',
        zeminAcik: '#3d3328',
        galeri: [
          'product/class1/norm-urunozellik.webp',
          'product/class1/norm-urunyakin.webp',
          'product/class1/norm-urunyakin2.webp',
          'product/class1/norm-urunyakin3.webp',
          'product/class1/norm-urunyakin4.webp',
          'product/class1/norm-urunyakin5.webp'
        ]
      },
      malzeme: 'Eskitme pirinç gövde, dökme disk abajur, kurşun kristal bilezikler',
      ampul: 'E27 · maks. 1×15W LED', yukseklik: '160 cm · kol 82 cm uzanır', abajur: 'Ø 24 cm disk', agirlik: '9,4 kg',
      puan: 4.9, yorum: 204, stok: 7,
      aciklama: 'Kolun ucundaki pirinç küre bir karşı ağırlık: abajuru tek parmakla aşağı indirip okuduğunuz sayfaya yaklaştırıyor, bıraktığınız yerde duruyor. Disk abajur ışığı aşağı ve öne verdiği için göze hiç kaçmıyor. Gövdedeki kristal bilezikler dekoratif değil — kolun eklem noktalarını gizliyorlar.',
      detay: ['Karşı ağırlıklı serbest kol, tek elle ayarlanır', 'Disk abajur — yönlü, göz almayan ışık', 'Kurşun kristal eklem bilezikleri', 'Tabanda ayak şalteri, 2 m tekstil kablo']
    },
    {
      id: 'aurora-ark', ad: 'Aurora Ark', altbaslik: 'Beyaz mermer tabanlı pirinç ark',
      fiyat: 18750, eskiFiyat: 21900, type: 'arc', koleksiyon: 'heykel',
      renk: 'pirinc', renkAd: 'Parlak pirinç / Carrara mermer', etiket: 'İndirim', oneCikan: true, aktif: true,
      palette: { metal: '#c79a4b', shade: '#f3e6cd', glow: '#ffb347' },
      gorseller: {
        kapali: 'product/class2/kapali.webp',
        acik: 'product/class2/acik.webp',
        zeminKapali: '#f5f5f2',
        zeminAcik: '#2d2722',
        galeri: [
          'product/class2/urunyakin1.webp'
        ]
      },
      malzeme: 'Parlak pirinç ark, kubbe metal abajur, doğal Carrara mermer taban',
      ampul: 'E27 · maks. 1×12W LED', yukseklik: '205 cm · ark 120 cm uzanır', abajur: 'Ø 40 cm kubbe', agirlik: '14,2 kg',
      puan: 4.9, yorum: 128, stok: 4,
      aciklama: 'Tek parça kavisli pirinç, koltuğun ya da yemek masasının üzerinden uzanıyor; kubbe abajur ışığı dar bir daire içine topluyor, masanın dışına taşmıyor. Ağırlığı taşıyan Carrara mermer taban 14 kg — arkın gerilimini dengeliyor ve her parçanın damar deseni kendine özgü çıkıyor.',
      detay: ['120 cm uzanan tek parça ark', 'Doğal Carrara mermer taban — desen eşsiz', 'Yüksekliği ayarlanabilir gövde', 'Ayak şalteri']
    },
    {
      id: 'kanarya-duo', ad: 'Kanarya Duo', altbaslik: 'Çift başlıklı hardal sarısı lambader',
      fiyat: 12400, type: 'cone', koleksiyon: 'modern',
      renk: 'sari', renkAd: 'Hardal sarısı', etiket: 'Yeni', oneCikan: true, aktif: true,
      palette: { metal: '#e8a81c', shade: '#ffd24a', glow: '#ffc247' },
      gorseller: {
        kapali: 'product/class3/kapali.webp',
        acik: 'product/class3/acik.webp',
        zeminKapali: '#f5f5f1',
        zeminAcik: '#221d19',
        galeri: []
      },
      malzeme: 'Toz boyalı çelik gövde, emaye kaplı metal abajurlar, siyah eklem detayları',
      ampul: '2 × E27 · maks. 2×12W LED', yukseklik: '178 cm', abajur: 'Ø 36 cm disk + Ø 12 cm koni', agirlik: '7,8 kg',
      puan: 4.8, yorum: 67, stok: 9,
      aciklama: 'İki ışık, tek gövde. Üstteki geniş disk tavana vurup odayı dolduruyor; yandaki küçük koni tam koltuğun üstüne düşüyor. İkisi ayrı düğmelerden açılıyor — akşam sadece okuma ışığını yakıp kalanını karanlık bırakabiliyorsunuz. Hardal sarısı emaye, nötr bir odada tek başına renk oluyor.',
      detay: ['İki bağımsız ışık, iki ayrı şalter', 'Üst disk: tavana yansıyan dolgu ışığı', 'Alt koni: yönlendirilebilir okuma ışığı', 'Emaye kaplama — parmak izi tutmaz']
    },
    {
      id: 'sinyal', ad: 'Sinyal', altbaslik: 'Kırmızı kubbe abajurlu minimal lambader',
      fiyat: 9900, type: 'globe', koleksiyon: 'minimal',
      renk: 'kirmizi', renkAd: 'Sinyal kırmızısı', aktif: true,
      palette: { metal: '#c1352b', shade: '#e0574c', glow: '#ffb347' },
      gorseller: {
        kapali: 'product/class4/kapali.webp',
        acik: 'product/class4/acik.webp',
        zeminKapali: '#f1f1f3',
        zeminAcik: '#372c22',
        galeri: []
      },
      malzeme: 'Tek renk toz boyalı çelik; gövde, abajur ve taban aynı finiş',
      ampul: 'E27 · maks. 1×12W LED', yukseklik: '152 cm', abajur: 'Ø 30 cm yarım küre', agirlik: '5,6 kg',
      puan: 4.7, yorum: 91, stok: 16,
      aciklama: 'Kubbenin tepesindeki delik tesadüf değil: ışığın bir kısmını yukarı kaçırıp tavanda yumuşak bir halka bırakıyor, böylece abajurun altı ile üstü arasındaki sert kontrast kırılıyor. Gövde, abajur ve taban aynı kırmızıya boyandığı için oda içinde tek bir çizgi gibi okunuyor.',
      detay: ['Tepe deliği — tavana yansıyan ikinci ışık', 'Tek renk finiş: gövde, abajur, taban', 'Ø 26 cm ağırlıklı taban', 'Kablo gövde içinden geçer']
    },
    {
      id: 'konsey', ad: 'Konsey', altbaslik: 'Çift konili yönlendirilebilir lambader',
      fiyat: 16500, type: 'cone', koleksiyon: 'modern',
      renk: 'yesil', renkAd: 'Yeşil / sarı, gri gövde', oneCikan: true, aktif: true,
      palette: { metal: '#9aa39a', shade: '#4f9c6d', glow: '#ffc46b' },
      gorseller: {
        kapali: 'product/class5/kapali.webp',
        acik: 'product/class5/acik.webp',
        zeminKapali: '#ffffff',
        zeminAcik: '#3d2d1f',
        galeri: []
      },
      malzeme: 'Anodize alüminyum gövde, iki parça boyalı alüminyum koni abajur',
      ampul: '2 × E27 · maks. 2×10W LED', yukseklik: '168 cm', abajur: 'Üst Ø 14 cm · alt Ø 22 cm koni', agirlik: '6,2 kg',
      puan: 4.8, yorum: 54, stok: 6,
      aciklama: 'Biri yukarı, biri aşağı bakan iki koni: sarı olan tavanı yıkıyor, yeşil olan yere iniyor. Eklem noktası 300 derece dönüyor, böylece ışığı duvara ya da kitaba çevirebiliyorsunuz. 1950’lerin modernist parlamento lambalarına açık bir gönderme — renk ayrımı da oradan geliyor.',
      detay: ['Yukarı + aşağı iki yönlü koni', '300° dönen eklem', 'Anodize gövde, çizilmeye dayanıklı', 'İki koni ayrı ayrı açılır']
    },
    {
      id: 'tutulma', ad: 'Tutulma', altbaslik: 'Pileli halka abajurlu heykel lambader',
      fiyat: 21900, type: 'tiered', koleksiyon: 'heykel',
      renk: 'yesil', renkAd: 'Zeytin yeşili / dövme demir', etiket: 'Atölye serisi', oneCikan: true, aktif: true,
      palette: { metal: '#3b3b3b', shade: '#8a8f5c', glow: '#ffbf5e' },
      gorseller: {
        kapali: 'product/class6/kapali.webp',
        acik: 'product/class6/acik.webp',
        zeminKapali: '#cccac8',
        zeminAcik: '#3e3024',
        galeri: []
      },
      malzeme: 'El pileli keten halka abajur, elde dövülmüş demir üçayak, pirinç ışık kolu',
      ampul: 'E27 · maks. 1×9W LED', yukseklik: '176 cm', abajur: 'Ø 62 cm halka, 14 cm derinlik', agirlik: '8,9 kg',
      puan: 5.0, yorum: 38, stok: 3,
      aciklama: 'Abajur bir daire değil, ortası boş bir halka: ışık kaynağı halkanın arkasında duruyor ve duvara tam bir daire çiziyor — tutulma anına benzediği için adı bu. Keten 180 pile halinde elde katlanıyor, bu yüzden iki abajurun gölge deseni asla birebir aynı olmuyor.',
      detay: ['Ø 62 cm ortası boş halka abajur', '180 pile, elde katlanmış keten', 'Duvara tam daire çizen arkadan aydınlatma', 'Elde dövülmüş demir üçayak — numaralı üretim']
    },
    {
      id: 'sutun', ad: 'Sütun', altbaslik: 'Perfore akrilik ışık kolonu',
      fiyat: 34900, type: 'cylinder', koleksiyon: 'minimal',
      renk: 'beyaz', renkAd: 'Buzlu beyaz / krom', etiket: 'Sınırlı', oneCikan: true, aktif: true,
      palette: { metal: '#b9bdc2', shade: '#f7f8fa', glow: '#fff0d0' },
      gorseller: {
        kapali: 'product/class7/kapali.webp',
        acik: 'product/class7/acik.webp',
        zeminKapali: '#ffffff',
        zeminAcik: '#261f19',
        galeri: []
      },
      malzeme: 'Enjeksiyon kalıp opal akrilik yapraklar, krom çelik taban, entegre LED kolon',
      ampul: 'Entegre LED · 42W · 2700K · kısılabilir', yukseklik: '192 cm', abajur: 'Ø 30 cm kolon', agirlik: '11,5 kg',
      puan: 4.9, yorum: 22, stok: 2,
      aciklama: 'Yüz doksan iki santimlik kolonu, üst üste dizilmiş iki yüz kırk opal akrilik yaprak oluşturuyor. Yapraklar ışığı kırdığı için kolon yanınca tek bir lamba gibi değil, içten aydınlanan bir doku gibi görünüyor. Koleksiyonun en iddialı parçası: bir köşeye koyduğunuzda orada başka bir şeye gerek kalmıyor.',
      detay: ['240 opal akrilik yaprak, elde dizilir', 'Entegre kısılabilir LED — 50.000 saat', 'Krom ayna taban', 'Sınırlı üretim: yılda 60 adet']
    },
    {
      id: 'disk', ad: 'Disk', altbaslik: 'İnce profilli beyaz disk lambader',
      fiyat: 13750, type: 'cylinder', koleksiyon: 'modern',
      renk: 'beyaz', renkAd: 'Mat beyaz / pirinç detay', aktif: true,
      palette: { metal: '#c9cbcc', shade: '#f8f8f6', glow: '#ffd79a' },
      gorseller: {
        kapali: 'product/class8/kapali.webp',
        acik: 'product/class8/acik.webp',
        zeminKapali: '#bdbebd',
        zeminAcik: '#2d261f',
        galeri: []
      },
      malzeme: 'Mat beyaz toz boyalı alüminyum, pirinç uç kapağı, akrilik difüzör',
      ampul: 'Entegre LED · 18W · 2700K · kısılabilir', yukseklik: '158 cm', abajur: 'Ø 32 cm disk', agirlik: '4,9 kg',
      puan: 4.7, yorum: 112, stok: 14,
      aciklama: 'Sadece dokuz milimetre kalınlığında bir disk. Işık diskin içine gömülü LED şeritten geliyor, akrilik difüzörden geçip aşağı yayılıyor — ampul hiçbir açıdan görünmüyor. Yan profilden bakıldığında neredeyse kayboluyor; küçük odalarda bu yüzden iyi çalışıyor.',
      detay: ['9 mm ince disk profili', 'Gizli LED, görünür ampul yok', 'Dokunmatik kısma — 3 kademe', 'Ø 24 cm taban, 4,9 kg']
    },
    {
      id: 'cekirge', ad: 'Çekirge', altbaslik: 'Eğik üçayaklı siyah okuma lambaderi',
      fiyat: 11900, type: 'tripod', koleksiyon: 'modern',
      renk: 'siyah', renkAd: 'Mat siyah / pirinç', aktif: true,
      palette: { metal: '#2c2c30', shade: '#3a3a3e', glow: '#ffc46b' },
      gorseller: {
        kapali: 'product/class9/kapali.webp',
        acik: 'product/class9/acik.webp',
        zeminKapali: '#fefefe',
        zeminAcik: '#3e3021',
        galeri: []
      },
      malzeme: 'Toz boyalı çelik boru üçayak, dökme konik abajur, pirinç eklem',
      ampul: 'E27 · maks. 1×15W LED', yukseklik: '125 cm · eğik duruş', abajur: 'Ø 16 cm koni', agirlik: '3,8 kg',
      puan: 4.8, yorum: 143, stok: 18,
      aciklama: 'Üç bacağı öne eğik, gövdesi geriye yatık; ayakta durmak için birbirine yaslanan bir yapı. Bu duruş sayesinde abajur koltuğun koluna 40 santime kadar yaklaşıyor, ışığı omzunuzun üstünden veriyor. Koleksiyonun en hafif parçası — odadan odaya taşımak için tasarlandı.',
      detay: ['Öne eğik üçayak, 40 cm yaklaşım', 'Eğilebilir konik başlık', 'Yalnızca 3,8 kg — kolay taşınır', 'Keçe ayak pabuçları, parkeyi çizmez']
    },
    {
      id: 'tespih', ad: 'Tespih', altbaslik: 'Boncuk gövdeli ahşap lambader',
      fiyat: 15400, type: 'cylinder', koleksiyon: 'dogal',
      renk: 'ahsap', renkAd: 'Ceviz / kirli beyaz keten', aktif: true,
      palette: { metal: '#7a5334', shade: '#f4efe2', glow: '#ffb347' },
      gorseller: {
        kapali: 'product/class10/kapali.webp',
        acik: 'product/class10/acik.webp',
        zeminKapali: '#e7e5e3',
        zeminAcik: '#2c251f',
        galeri: []
      },
      malzeme: 'Torna işi masif ceviz gövde, keten kaplı silindir abajur',
      ampul: 'E27 · maks. 1×15W LED', yukseklik: '162 cm', abajur: 'Ø 42 cm silindir', agirlik: '8,1 kg',
      puan: 4.9, yorum: 86, stok: 8,
      aciklama: 'Gövde tek bir ahşap parçasından tornada çıkarılıyor: on dokuz boncuk, hiçbiri yapıştırılmış değil. Ceviz doğal yağla bırakıldığı için zamanla koyulaşıyor ve boncukların arasındaki tornalama izleri elle hissediliyor. Keten abajur ışığa hafif bir toprak tonu katıyor.',
      detay: ['Tek parçadan tornalanmış 19 boncuk', 'Masif ceviz, doğal yağ finiş', 'Yıkanabilir keten abajur kılıfı', 'Zamanla koyulaşan patina']
    },
    {
      id: 'huni', ad: 'Huni', altbaslik: 'Konik ahşap gövdeli pileli lambader',
      fiyat: 17900, type: 'cone', koleksiyon: 'dogal',
      renk: 'ahsap', renkAd: 'Kızıl maun / krem pileli keten', aktif: true,
      palette: { metal: '#8f4a2c', shade: '#f2e6cf', glow: '#ffb347' },
      gorseller: {
        kapali: 'product/class11/kapali.webp',
        acik: 'product/class11/acik.webp',
        zeminKapali: '#dddddd',
        zeminAcik: '#3f2e1f',
        galeri: []
      },
      malzeme: 'Torna işi masif maun koni gövde, el pileli keten abajur',
      ampul: 'E27 · maks. 1×15W LED', yukseklik: '168 cm', abajur: 'Üst Ø 38 cm · alt Ø 52 cm', agirlik: '10,6 kg',
      puan: 4.8, yorum: 61, stok: 5,
      aciklama: 'Gövde tabanda yirmi dört, tepede altı santim: ağırlık merkezi yerde olduğu için devrilmesi neredeyse imkânsız. Maun yüzey tornadan çıktığı gibi, tek kat yağla bırakıldı. Yukarı doğru genişleyen pileli keten abajur, ışığı yukarıya da yaydığı için oda tek lambayla aydınlanıyor.',
      detay: ['Tabanda Ø 24 cm — devrilmeye karşı kütlesel denge', 'Torna işi masif maun, tek kat yağ finiş', 'Yukarı ve aşağı yayan pileli abajur', '120 pile, elde katlanmış keten']
    },
    {
      id: 'fener', ad: 'Fener', altbaslik: 'Ham keten fener abajurlu lambader',
      fiyat: 13200, type: 'lantern', koleksiyon: 'dogal',
      renk: 'keten', renkAd: 'Ham keten / mat siyah', aktif: true,
      palette: { metal: '#2a2a2a', shade: '#ded2ba', glow: '#ffc06a' },
      gorseller: {
        kapali: 'product/class12/kapali.webp',
        acik: 'product/class12/acik.webp',
        zeminKapali: '#fbfcfc',
        zeminAcik: '#332a21',
        galeri: []
      },
      malzeme: 'Yıkanmış ham keten fener abajur, mat siyah çelik silindir taban',
      ampul: 'E27 · maks. 1×12W LED', yukseklik: '172 cm', abajur: 'Ø 38 cm · 54 cm yüksek', agirlik: '7,3 kg',
      puan: 4.7, yorum: 74, stok: 12,
      aciklama: 'Abajur iki koninin tabandan birleşmesiyle oluşuyor — elmas gibi bir siluet. Yıkanmış ham keten ışığı geçirdiği için abajurun kendisi de aydınlanıyor; odada asılı duran bir fener etkisi bırakıyor. Ağırlığın tamamı alttaki silindir tabanda toplanmış, gövde bilinçli olarak çok ince tutuldu.',
      detay: ['Çift koni — elmas siluet', 'Yıkanmış ham keten, ışık geçiren doku', 'Ø 14 cm dolu çelik silindir taban', 'Kablo üzerinde ayak dimmeri']
    },
    {
      id: 'ikizler', ad: 'İkizler', altbaslik: 'Çift tabaklı bronz lambader',
      fiyat: 24500, type: 'cluster', koleksiyon: 'heykel',
      renk: 'bronz', renkAd: 'Yaşlandırılmış bronz', oneCikan: true, aktif: true,
      palette: { metal: '#7d6a4f', shade: '#cdbb99', glow: '#ffbf5e' },
      gorseller: {
        kapali: 'product/class13/kapali.webp',
        acik: 'product/class13/acik.webp',
        zeminKapali: '#e7e5e3',
        zeminAcik: '#31281e',
        galeri: []
      },
      malzeme: 'Yaşlandırılmış bronz gövde ve kollar, elde dövülmüş tabak abajurlar',
      ampul: '2 × E27 · maks. 2×12W LED', yukseklik: '164 cm', abajur: '2 × Ø 34 cm tabak', agirlik: '12,4 kg',
      puan: 4.9, yorum: 44, stok: 3,
      aciklama: 'Karşılıklı iki kol, iki farklı yükseklikte iki tabak abajur taşıyor: biri kanepeyi, diğeri yandaki koltuğu aydınlatıyor. Abajurlar elde dövüldüğü için iç yüzeydeki çekiç izleri ışığı dağıtıyor — yansıma sert değil, dalgalı. Bronz kaplama yaşlandırılmış geliyor, zamanla daha da koyulaşacak.',
      detay: ['İki bağımsız kol, iki farklı yükseklik', 'Elde dövülmüş tabak abajurlar — dalgalı yansıma', 'Yaşlandırılmış bronz, kaplama değil masif', 'Her kol 340° döner']
    },
    {
      id: 'amber', ad: 'Amber', altbaslik: 'Amber pleksi kubbeli lambader',
      fiyat: 19400, type: 'globe', koleksiyon: 'heykel',
      renk: 'amber', renkAd: 'Amber pleksi / siyah-pirinç', aktif: true,
      palette: { metal: '#2b2723', shade: '#e8a23c', glow: '#ffb347' },
      gorseller: {
        kapali: 'product/class14/kapali.webp',
        acik: 'product/class14/acik.webp',
        zeminKapali: '#fefefe',
        zeminAcik: '#25201b',
        galeri: []
      },
      malzeme: 'Dökme amber akrilik kubbe, opal iç difüzör, siyah çelik ve pirinç gövde',
      ampul: 'E27 · maks. 1×12W LED', yukseklik: '156 cm', abajur: 'Ø 40 cm kubbe', agirlik: '6,8 kg',
      puan: 4.8, yorum: 57, stok: 6,
      aciklama: 'Amber renkli dökme akrilik kubbenin altında ikinci bir opal difüzör var: ampul doğrudan görünmüyor, ama kubbenin kendisi bal rengi bir fener gibi yanıyor. Yandan bakıldığında ışık amberden geçip duvara sıcak bir leke bırakıyor. Zincirli çekme şalteri orijinal 1970’ler detayı.',
      detay: ['Çift katman: amber kubbe + opal difüzör', 'Zincirli çekme şalteri', 'Pirinç geçişli siyah gövde', 'Kubbe ayrı yedek parça olarak alınabilir']
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
      palette: { metal: '#e81a4a', shade: '#ff6c8c', glow: '#ffb347' },
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
      ad: 'Muush',
      slogan: 'Aydınlatma Atölyesi',
      logo: 'assets/logo.png',       // acik tema
      logoKoyu: 'assets/logo-beyaz.png',  // koyu tema  // boşsa çizilmiş ışık simgesi + site adı kullanılır
      logoYuksekligi: 54  // px — header'daki yukseklik
    },

    tema: {
      anaRenk: '#ff3962',      // merry kırmızısı
      anaRenkKoyu: '#e81a4a',
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
      metin: 'Bir lambader satın almıyorsunuz; odanızın akşam nasıl göründüğüne karar veriyorsunuz. On dört gövdenin her biri, ışığın duvarda bıraktığı daire ölçülerek tasarlandı — pirinç elde büküldü, mermer tek tek kesildi, keten 180 pile halinde katlandı. Hiçbiri fason değil, hepsi Bomonti’deki atölyeden çıkıyor.',
      btn1: { ad: 'Koleksiyonu keşfet', yol: 'shop.html' },
      btn2: { ad: 'Atölyeyi gör', yol: '#bolumAtolye' },
      urunId: 'aurora-ark',
      istatistik: [
        { sayi: '12', etiket: 'gövde tasarımı' },
        { sayi: '4.8', etiket: 'ortalama puan' },
        { sayi: '3 yıl', etiket: 'atölye garantisi' }
      ]
    },

    seritler: [
      'El dikimi keten abajur',
      'FSC sertifikalı masif meşe',
      '7.500 ₺ üzeri ücretsiz kargo',
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
      metin: 'Gündüz her lamba aynı görünür. Fark, tavan lambasını kapattığınızda ortaya çıkar: ışığın duvarda çizdiği dairenin kenarı ne kadar yumuşak, gölge nerede bitiyor, kitap sayfasında parlama var mı. On dört gövdeyi de bu saatte, gerçek bir odada test ederek tasarladık.',
      urunId: 'aurora-ark',
      btn: { ad: 'Gövdeleri gör', yol: 'shop.html' }
    },

    bolumler: {
      oneCikanlar: { aktif: true, etiket: 'Seçkiler', baslik: 'Bu ay en çok ışık verenler', metin: '' },
      koleksiyonlar: { aktif: true, etiket: 'Üç mimari dil', baslik: 'Koleksiyonlar', metin: 'Aynı atölye, üç ayrı mimari dil: Bauhaus’un işlevselliği, Art Deco’nun gösterişi ve vernaküler geleneğin el işçiliği.' },
      atolye: { aktif: true, etiket: 'Atölye', baslik: 'Beş adım, tek çatı, altmış iki gün', metin: 'Bir gövdenin ilk çiziminden kutuya girmesine kadar ortalama 62 gün geçiyor. Kalıp, kaynak, torna, finiş ve dikim — hepsi Bomonti’deki 180 m²’lik atölyede, aynı altı kişilik ekip tarafından yapılıyor. Fason üretim yaptırmıyoruz; bu yüzden koleksiyon yavaş büyüyor.' },
      yorumlar: { aktif: true, etiket: 'Müşteri değerlendirmeleri', baslik: 'Işığı evine alanlar ne diyor?', metin: 'Yorumların tamamı sipariş teslim edildikten sonra, doğrulanmış alıcılar tarafından yazıldı.' },
      bulten: { aktif: true, etiket: 'Atölye mektubu', baslik: 'Yeni gövdeleri ilk sen gör', metin: 'Ayda bir e-posta: yeni koleksiyonlar, atölye notları, ışık rehberleri.' }
    },

    atolyeAdimlar: [
      { sure: '14 gün', baslik: 'Çizim ve 1:5 maket',
        metin: 'Her gövde kâğıtta değil, maketle başlar. Maketi karanlık bir odaya koyup ışığın duvarda bıraktığı dairenin çapını ölçüyoruz. Ölçü tutmazsa gövde üretime girmiyor — koleksiyona giremeyen dokuz tasarım var.' },
      { sure: '9 gün', baslik: 'Metal bükme ve kaynak',
        metin: 'Pirinç ve çelik borular atölyede elde bükülüyor. Aurora’nın 120 cm’lik arkı tek parça; eklemsiz bükmek üç denemede bir tutuyor. Kaynak izleri üç kademe zımparadan geçiyor.' },
      { sure: '11 gün', baslik: 'Torna ve ahşap',
        metin: 'Tespih’in on dokuz boncuğu tek bir ceviz kütükten tornada çıkıyor, hiçbiri yapıştırma değil. Ahşap sonra iki hafta dinlendiriliyor; nemini vermeden yağ sürülmüyor.' },
      { sure: '16 gün', baslik: 'Finiş ve abajur dikimi',
        metin: 'Fırın boya 200°C’de pişiyor. Keten abajurlar Denizli’den geliyor, kesim ve pileleme atölyede elde yapılıyor — Tutulma’nın halkasında 180, Huni’de 120 pile var.' },
      { sure: '12 gün', baslik: 'Yanık test, numara, kayıt',
        metin: 'Her lambader 24 saat kesintisiz yanık bırakılıyor; duy ısısı ve difüzör rengi ölçülüyor. Testi geçen gövde numaralanıyor, üretim kaydı arşivleniyor, sonra kutuya giriyor.' }
    ],

    // Üretim kaydı — zengin marka dokunuşu
    uretimKaydi: {
      aktif: true,
      video: 'assets/uretim-web.mp4',
      poster: 'assets/uretim-poster.jpg',
      etiket: 'Üretim kaydı',
      baslik: 'Sizin gövdenizin nasıl yapıldığını izleyin',
      metin: 'Sipariş numaranız atölyeye düştüğü andan kutuya girdiği ana kadar tezgâh üstü kameralar kayıtta. Teslimattan sonra size özel bir bağlantı gönderiyoruz: kendi lambaderinizin bükülme, zımpara, dikim ve 24 saatlik yanık testini hızlandırılmış olarak izleyebiliyorsunuz. Kayıt 12 ay saklanıyor, sonra siliniyor.',
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
      metin: 'Lambader hediye etmek risklidir — odayı bilmeyen kimse doğru gövdeyi seçemez. Hediye kartı bu işi alıcıya bırakıyor: tutarı siz belirliyorsunuz, kart e-posta ile anında gidiyor, 24 ay geçerli.',
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
        metin: 'Aurora’yı okuma koltuğunun arkasına koyduk. İki aydır salondaki tavan lambasını hiç açmadık — akşamları bütün ışık artık bu lambadan geliyor. Mermer tabanın ağırlığı da beni şaşırttı, kedi tırmanıyor ama kıpırdamıyor bile.',
        kisi: 'Deniz Karaca', yer: 'Kadıköy, İstanbul', puan: 5,
        urunId: 'aurora-ark', dogrulanmis: true, tarih: '2026-07-18'
      },
      {
        metin: 'Mimarım, müşterilerime aydınlatma önerirken genelde ithal markalara gidiyordum. Atlas Kol’u kendi evime aldıktan sonra üç projede kullandım. Karşı ağırlıklı kol gerçekten tek elle ayarlanıyor — bu detayı bu fiyatta başka yerde görmedim.',
        kisi: 'Selin Aydın', yer: 'Alsancak, İzmir', puan: 5,
        urunId: 'atlas-kol', dogrulanmis: true, tarih: '2026-06-02'
      },
      {
        metin: 'Kutudan çıkardım, sekiz dakikada kurdum, alet bile gerekmedi. Sarı rengi ekranda biraz endişe vermişti ama gri duvarın önünde tam oturdu. Üstteki disk tavanı yıkıyor, alttaki koni kitaba düşüyor; ikisini ayrı açabilmek düşünülmüş bir şey.',
        kisi: 'Mert Toprak', yer: 'Çankaya, Ankara', puan: 5,
        urunId: 'kanarya-duo', dogrulanmis: true, tarih: '2026-08-09'
      }
    ],

    footer: {
      metin: 'İstanbul Bomonti’deki atölyemizde tasarlanan ve montajlanan lambaderler. Işığı bir mobilya gibi kurguluyoruz.',
      adres: 'Bomonti Ada · Şişli / İstanbul',
      sutunlar: [
        {
          baslik: 'Mağaza', linkler: [
            { ad: 'Tüm lambaderler', yol: 'shop.html' },
            { ad: 'Bauhaus', yol: 'shop.html?koleksiyon=modern' },
            { ad: 'Art Deco', yol: 'shop.html?koleksiyon=heykel' },
            { ad: 'Vernaküler', yol: 'shop.html?koleksiyon=dogal' },
            { ad: 'Brütalist', yol: 'shop.html?koleksiyon=minimal' }
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
      eposta: 'merhaba@mush.com.tr',
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
      metin: 'Kodu sepette kullanın. On dört gövdenin tamamında geçerli, son kullanma tarihi yok.',
      kod: 'MERHABA',
      kapatYazi: 'Şimdi değil',
      btnAd: 'Koleksiyona göz at',
      btnYol: 'shop.html',
      urunId: 'aurora-ark',
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
      girisMetni: 'Muush 2016’da Bomonti’de, üç kişilik bir atölyede başladı. Amacımız basitti: Türkiye’de üretilmiş, ithal muadillerine baktığınızda “bu daha iyi” diyeceğiniz bir lambader yapmak. Bugün on dört gövde tasarımımız var, hepsi hâlâ aynı çatı altında elde montajlanıyor.',

      rakamlar: [
        { sayi: '2016', etiket: 'Kuruluş', aciklama: 'Bomonti’de 40 m²’lik bir atölyede' },
        { sayi: '180 m²', etiket: 'Atölye', aciklama: 'Kalıp, kaynak, finiş ve dikim aynı yerde' },
        { sayi: '14', etiket: 'Gövde tasarımı', aciklama: 'Hepsi kendi çizimimiz' },
        { sayi: '9.400+', etiket: 'Teslim edilen lambader', aciklama: '81 ile gönderildi' }
      ],

      hikaye: {
        baslik: 'Nasıl başladı',
        paragraflar: [
          'Kurucumuz bir mimarlık ofisinde çalışırken aynı sorunla sürekli karşılaşıyordu: proje bitiyor, mobilya yerleşiyor, sonra aydınlatmaya sıra geldiğinde ya fahiş fiyatlı bir ithal parça ya da ucuz ama ruhsuz bir kopya arasında seçim yapmak gerekiyordu. Arada hiçbir şey yoktu.',
          'İlk gövde — bugün Lumen Kone olarak sattığımız model — bir hafta sonunda, ödünç alınmış bir boru bükme makinesiyle yapıldı. Ofis arkadaşlarına gösterdi, üç kişi “bana da yapar mısın” dedi. O üç sipariş atölyenin kirasını ödedi.',
          'Sekiz yıl sonra hâlâ aynı prensiple çalışıyoruz: bir gövdeyi ancak kendi evimize koymak isteyeceksek üretime alıyoruz. Bu yüzden koleksiyon yavaş büyüyor. Yılda iki, bazen üç yeni model çıkarıyoruz — bazı yıllar hiç çıkarmıyoruz.'
        ],
        imzaAd: 'Yıldız',
        imzaRol: 'Kurucu ve baş tasarımcı'
      },

      ilkeler: [
        {
          baslik: 'Az sayıda, iyi yapılmış',
          metin: 'Katalogda 200 ürün yok. On dört gövde var ve her birinin neden var olduğunu anlatabiliyoruz. Bir modeli beğenmezsek, satıyor olsa bile üretimden çıkarıyoruz.'
        },
        {
          baslik: 'Malzemeyi saklamıyoruz',
          metin: 'Pirinç pirinçtir, boyayıp “altın” demiyoruz. Mermerin damarı her parçada farklıdır, bunu kusur diye pazarlamıyoruz. Meşe zamanla koyulaşır — bu ürünün yaşlanması, bozulması değil.'
        },
        {
          baslik: 'Tek çatı, tek sorumluluk',
          metin: 'Kalıptan kutuya kadar her adım bizde. Bir vida gevşediğinde arayacağınız numara üretimi yapan ekibin numarası. Fason üretim yaptırmıyoruz.'
        },
        {
          baslik: 'On yıl yedek parça',
          metin: 'Ürettiğimiz her gövdenin yedek parçasını üretimden çıktıktan on yıl sonrasına kadar stokta tutuyoruz. Bir lambader, duyu bozulduğu için çöpe gitmemeli.'
        }
      ],

      zanaat: [
        {
          baslik: 'Metal',
          metin: 'Pirinç ve çelik gövdeler atölyede elde bükülüyor. Kaynak izleri tek tek zımparalanıp ya fırın boyaya ya da fırçalama finişe gidiyor. Pirinci vernikle kapatmıyoruz; zamanla patina alsın istiyoruz.'
        },
        {
          baslik: 'Ahşap',
          metin: 'Masif meşe ve huş kontrplak kullanıyoruz, hepsi FSC sertifikalı. Doğal yağ finişle bırakıyoruz — lake kaplama ahşabı plastikleştiriyor.'
        },
        {
          baslik: 'Kumaş',
          metin: 'Keten ve pamuk karışımı abajur kumaşları Denizli’de dokunuyor, kesim ve dikim atölyede yapılıyor. Rattan dokumalar ise tamamen el işi; iki abajurun dokusu asla birebir aynı olmaz.'
        }
      ],

      alinti: {
        metin: 'Her lambaderi kutusuna koymadan önce 24 saat yanık bırakıyoruz. Bu testte yılda ortalama on beş gövde geri dönüyor — o on beşi kimse görmüyor, ama sizin eve gitmeyecekleri kesin.',
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
            metin: 'Sepet toplamı 7.500 ₺ ve üzerindeki siparişlerde kargo bizden. Altındaki siparişlerde sabit 349 ₺ kargo bedeli uygulanır — lambaderler hacimli ürünler olduğu için desi üzerinden değişken ücret almıyoruz, tek fiyat.'
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
            metin: 'Gövde çift katmanlı köpük kalıpla, abajur ayrı bir kutuda gönderilir. Cam ve mermer parçalar ilave köpük yatakta gider. Kutunun üzerinde “kırılabilir” etiketi bulunur.'
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
            metin: 'Ürünü teslim aldığınız günden itibaren 30 gün içinde sebep belirtmeden iade edebilirsiniz. Kutusundan çıkarmış, kurmuş, hatta bir hafta yakmış olmanız fark etmez — lambaderin odanızda nasıl durduğunu ancak deneyerek anlarsınız.'
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
            metin: '2700K sıcak beyaz, 806 lümen (60W eşdeğeri), kısılabilir (dimmable) bir LED alın. Duy tipini ürün sayfasındaki “Ampul” satırından teyit edin — çoğu modelimiz E27, Solis Cluster ise G9 kullanır.'
          },
          {
            baslik: 'Renk sıcaklığı — en önemli ayar',
            metin: 'Kelvin (K) değeri ışığın rengini belirler. Oturma odası ve yatak odasında 2700K’nin altına inmeyin, üstüne de çıkmayın:',
            liste: [
              '2200K — çok sarı, mum ışığı; dekoratif ama okumaya yetmez',
              '2700K — sıcak beyaz; salon, yatak odası, okuma koltuğu için doğru seçim',
              '3000K — nötre yakın; banyo ve çalışma masası için uygun',
              '4000K ve üzeri — soğuk beyaz; keten ve rattan abajurlarda dokuyu grileştirir, evde kullanmayın'
            ]
          },
          {
            baslik: 'Watt değil, lümen',
            metin: 'LED’lerde parlaklığı watt değil lümen gösterir. Kabaca karşılıkları:',
            liste: [
              '470 lm (≈40W) — ortam ışığı, ikincil aydınlatma',
              '806 lm (≈60W) — okuma koltuğu için ideal; önerimiz bu',
              '1055 lm (≈75W) — geniş salonlarda tek lambader kullanıyorsanız',
              'Ürün sayfasındaki maksimum watt sınırını aşmayın — abajur ısınır'
            ]
          },
          {
            baslik: 'Dimmer kullanacaksanız',
            metin: 'Kısılabilir modellerimizde (Lumen Kone, Mist Opal, Monolit) ampulün kutusunda “dimmable” yazması şart. Dimmable olmayan bir LED’i kısmaya çalışırsanız titrer, vızıldar ve ömrü kısalır.'
          },
          {
            baslik: 'Hangi üründe hangi duy',
            metin: 'Koleksiyondaki duy tipleri:',
            liste: [
              'E27 (klasik büyük duy) — Aurora Ark, Atlas Kol, Lumen Kone, Halo Küre, Nordic Tripod, Vertigo, Obsidyen Ark, Mist Opal, Bambu Kone, Studio Tripod, Silo, Kanarya Duo',
              'G9 (küçük iğne duy) — Solis Cluster, üç küre için üç ayrı ampul',
              'Entegre LED (ampul değiştirilmez) — Monolit; 50.000 saat ömürlü, yaklaşık 25 yıl'
            ]
          }
        ],
        sss: [
          { soru: 'Filament (edison) ampul kullanabilir miyim?', cevap: 'Opal cam ve rattan abajurlarda çok güzel durur. Keten abajurlarda filamentin sıcaklığı kumaşı zamanla sararttığı için önermiyoruz.' },
          { soru: 'Akıllı ampul takabilir miyim?', cevap: 'Evet, E27 duylu tüm modellerimize Philips Hue / Ikea Trådfri gibi akıllı ampuller takılır. Bu durumda lambaderin kendi dimmerini en yüksek konumda bırakın.' },
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
              'Doğal malzemelerin zamanla renk değiştirmesi — meşenin koyulaşması, pirincin patina alması bir kusur değil, tasarımın parçasıdır'
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
      baslik: 'Muush — Modern Lambader Atölyesi',
      aciklama: 'İstanbul’da tasarlanan modern lambaderler. Ark, küre, tripod ve heykel serisi aydınlatmalar.'
    }
  };

  var KOLEKSIYONLAR = [
    {
      slug: 'modern', ad: 'Bauhaus', anaSayfa: true,
      ozet: 'İşlev önce gelir: keskin geometri, mat metal ve süslemesiz birleşimler.'
    },
    {
      slug: 'heykel', ad: 'Art Deco', anaSayfa: true,
      ozet: 'Pirinç, mermer ve cam küre. Odanın merkezine kurulan gösterişli gövdeler.'
    },
    {
      slug: 'dogal', ad: 'Vernaküler', anaSayfa: true,
      ozet: 'Yerel malzeme, el işçiliği: masif meşe, rattan dokuma ve ham keten.'
    },
    {
      slug: 'minimal', ad: 'Brütalist', anaSayfa: false,
      ozet: 'Tek hamle, çıplak gövde. Silindir ve dikey çizgiden başka bir şey yok.'
    }
  ];

  var RENKLER = [
    { slug: 'pirinc', ad: 'Pirinç', hex: '#c79a4b' },
    { slug: 'bronz', ad: 'Bronz', hex: '#7d6a4f' },
    { slug: 'siyah', ad: 'Siyah', hex: '#2c2c30' },
    { slug: 'beyaz', ad: 'Beyaz', hex: '#f2f2f0' },
    { slug: 'ahsap', ad: 'Ahşap', hex: '#8f5a34' },
    { slug: 'keten', ad: 'Keten', hex: '#ded2ba' },
    { slug: 'sari', ad: 'Sarı', hex: '#e8a81c' },
    { slug: 'kirmizi', ad: 'Kırmızı', hex: '#c1352b' },
    { slug: 'yesil', ad: 'Yeşil', hex: '#4f9c6d' },
    { slug: 'amber', ad: 'Amber', hex: '#e8a23c' }
  ];

  var KAMPANYALAR = [
    { id: 'k0', kod: 'MERHABA', tip: 'yuzde', deger: 10, minTutar: 0, aktif: true, baslik: 'Hoş geldin indirimi', aciklama: 'İlk siparişinizde %10' },
    { id: 'k1', kod: 'MUSH10', tip: 'yuzde', deger: 10, minTutar: 0, aktif: true, baslik: 'Hoş geldin indirimi', aciklama: 'İlk siparişinde %10' },
    { id: 'k2', kod: 'ISIK15', tip: 'yuzde', deger: 15, minTutar: 10000, aktif: true, baslik: 'Işık festivali', aciklama: '10.000 ₺ üzeri %15' },
    { id: 'k3', kod: 'KARGO0', tip: 'kargo', deger: 0, minTutar: 0, aktif: true, baslik: 'Ücretsiz kargo', aciklama: 'Tutar sınırı olmadan kargo bedava' },
    { id: 'k4', kod: 'MUSH500', tip: 'tutar', deger: 500, minTutar: 6000, aktif: false, baslik: '500 ₺ indirim', aciklama: '6.000 ₺ üzeri 500 ₺ indirim' }
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
