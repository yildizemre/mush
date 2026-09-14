# MERRY — Lambader E-Ticaret

Beyaz zeminli, **#ff3962** kırmızısıyla kurulmuş modern bir lambader mağazası. Framework yok, derleme adımı yok —
dosyaları açmanız yeterli. Canlıya alma adımları: **[DEPLOY.md](DEPLOY.md)**

## Çalıştırma

```bash
npm run dev
```

`npm install` gerekmiyor — projenin hiç bağımlılığı yok. Doğrudan da
çalıştırabilirsiniz:

```bash
node dev-server.mjs
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | Yerel sunucu + Netlify Functions (iyzico dahil), port 4173 |
| `npm run netlify` | Netlify CLI ile çalıştırır (`npm i -g netlify-cli` gerekir) |
| `npm run kontrol` | Tüm JS dosyalarının sözdizimini denetler |

Farklı port: `PORT=4199 npm run dev`

Sonra `http://localhost:4173`. (`index.html`'e çift tıklamak da çalışır.)

> `npx serve` kullanmayın: `.html` uzantısını temiz URL'e yönlendirirken
> `?id=...` parametresini düşürüp ürün detay linklerini bozuyor.

## Sayfalar

| Adres | İçerik |
| --- | --- |
| `index.html` | Hero (ışık anahtarlı), seçkiler, koleksiyonlar, atölye, yorumlar, bülten |
| `shop.html` | Katalog: arama, koleksiyon/renk/fiyat filtresi, sıralama, "hepsini yak/söndür" |
| `product.html?id=pergel` | Galeri + ışık anahtarı, teknik özellikler, WhatsApp'tan sor |
| `cart.html` | Sepet → teslimat → ödeme → onay |
| `login.html` | Giriş / üye ol · Google · Apple |
| `account.html` | Siparişlerim, favorilerim, profil, adreslerim |
| `hakkimizda.html` | Marka hikâyesi: rakamlar, ilkeler, zanaat anlatısı |
| `kargo.html` · `iade.html` · `ampul-rehberi.html` · `garanti.html` | Yardım sayfaları — içerikleri panelden düzenlenir |
| `admin.html` | **Yönetim paneli** — sitedeki her şey buradan düzenlenir |
| `odeme-sonuc.html` | iyzico dönüş sayfası |

## Giriş bilgileri (demo mod)

| | |
| --- | --- |
| Yönetici | `admin@mush.com` / `mush1234` |
| Müşteri | Üye ol'dan kendiniz oluşturun |

`config.js → adminEmail / adminDemoSifre` ile değişir. Gerçek kullanıcı
yönetimi için Supabase'e bağlanır (DEPLOY.md bölüm 3).

## Koleksiyonlar

Mimari akım isimleriyle adlandırıldı — hem menüde hem mağaza filtrelerinde:

| Ad | Slug | Ne var içinde |
| --- | --- | --- |
| **Bauhaus** | `modern` | İşlevsel geometri, mat metal, süslemesiz birleşim |
| **Art Deco** | `heykel` | Pirinç, mermer, cam küre — gösterişli gövdeler |
| **Vernaküler** | `dogal` | Masif meşe, rattan dokuma, ham keten |
| **Brütalist** | `minimal` | Silindir ve dikey çizgi; tek hamle |

Slug'lar değişmedi, yalnızca görünen adlar değişti — eski `?koleksiyon=modern`
bağlantıları çalışmaya devam eder.

## Öne çıkan şeyler

**Işığı aç / kapat.** Her ürün kartında, hero'da ve ürün sayfasında bir ampul
anahtarı var. Açıkken lamba gerçekten yanıyor: sıcak halo, aşağı düşen ışık
huzmesi, kartın arka planı ısınıyor. Kapalıyken soğuk ve konturlu.
Seçim ziyaretçinin tarayıcısında hatırlanıyor. Varsayılanı yönetim
panelinden (Tema & renkler → Ürün ışığı) belirliyorsunuz.

**Gerçek fotoğraf + SVG yedeği.** Fotoğrafı olan ürünlerde ışık anahtarı iki
kareyi çapraz geçişle değiştirir: `light` (beyaz zemin, lamba kapalı) ↔
`dark` (karanlık oda, lamba yanıyor). Şu an iki ürün gerçek fotoğrafla geliyor
(**Aurora Ark**, **Atlas Kol**, **Kanarya Duo**); geri kalanlar `lamp-art.js`'in ürettiği SVG
çizimlerle çalışıyor — 8 gövde tipi (ark, konik, küre, üçayak, silindir,
katmanlı, çoklu küre, fener) ürünün üç renginden türetiliyor.

### Yeni ürüne fotoğraf eklemek

1. Dosyaları `product/<ürün-adı>/` klasörüne koyun. Önerilen isimlendirme:
   `light.webp` (ışık kapalı), `dark.webp` (ışık açık), `urunyakin1.webp`…
2. Yönetim paneli → **Ürünler** → ürünü düzenle → **Fotoğraflar** bölümüne
   yolları girin (örn. `product/class1/light.jpg`).
3. "Işık kapalı" alanını boş bırakırsanız o ürün otomatik olarak SVG çizime döner.

Fotoğraf ipuçları: dikey kadraj (≈3:4), ürün ortada, `light`/`dark` kareleri
aynı açıdan — geçiş o zaman "ışık yandı" gibi görünüyor. WebP kullanın;
`class2/dark.png` 1,7 MB idi, WebP'e çevirince 48 KB'a düştü.

**Tek renkten tüm tema.** Panelde marka rengini değiştirdiğinizde açıktan
koyuya 8 basamaklı skala otomatik türetilir; butonlar, duyuru çubuğu,
etiketler, gölgeler hepsi birlikte değişir. Lamba ışığının sıcak sarısı
marka renginden bağımsızdır — kırmızı bir lamba ışığı gerçekçi olmazdı.

**Tema düğmesi bütün ışıkları çevirir.** Header'daki ay/güneş düğmesi ana
şalter gibi çalışır:

- **Koyu temaya geçiş** → bütün lambalar yanar, fotoğraflı ürünler `dark`
  karesine döner.
- **Açık temaya dönüş** → hepsi söner, `light` karesine döner.
- Her iki temada tek tek ürünlerin ampulüne dokunup o ürünü ayrıca
  açıp kapatabilirsiniz. Bu tek tek yapılan seçimler **bir sonraki tema
  değişiminde sıfırlanır** — tema düğmesi her zaman tüm vitrini eşitler.

Varsayılan davranış panelden değişir: **Tema & renkler → Ürün ışığı**
(*site temasına göre* / *her zaman yanık* / *her zaman kapalı*).

## Yapı

```
index.html shop.html product.html cart.html
login.html account.html admin.html odeme-sonuc.html
hakkimizda.html kargo.html iade.html ampul-rehberi.html garanti.html

product/
  class1/ class2/ class3/   ürün fotoğrafları (light = kapalı, dark = açık)

assets/css/
  main.css      tasarım sistemi (token, bileşen, açık/koyu tema, duyarlı)
  admin.css     yönetim paneli

assets/js/
  config.js     ← canlıya almadan önce düzenlenecek TEK dosya
  seed.js       başlangıç içeriği: 14 ürün, koleksiyon, kampanya,
                hakkımızda + bilgi sayfaları, tüm site metinleri
  store.js      mini CMS + sepet + favori + ışık durumu (localStorage)
  auth.js       kimlik doğrulama: local (demo) | supabase (Google/Apple)
  payment.js    ödeme: demo | iyzico
  lamp-art.js   prosedürel SVG lambader üretici (fotoğrafı olmayan ürünler)
  media.js      görsel katmanı: fotoğraf varsa fotoğraf, yoksa SVG
  app.js        çekirdek: header, footer, çekmece, ürün kartı, tema
  pages.js      sayfa denetleyicileri
  admin.js      yönetim paneli

netlify/functions/
  _iyzico.mjs           IYZWSv2 imzalama
  iyzico-init.mjs       Checkout Form başlatma
  iyzico-callback.mjs   ödeme dönüşü — sonucu iyzico'ya sorarak doğrular

netlify.toml    yayın ayarları, temiz URL'ler, güvenlik başlıkları
dev-server.mjs  bağımlılıksız yerel sunucu
DEPLOY.md       Netlify + iyzico + Supabase kurulumu
```

ES modülü kullanılmadı (klasik `<script>`), böylece `file://` üzerinden de açılır.

## Denemeye değer

- Ürün kartındaki **ampul ikonuna** basın — fotoğraflı ürünlerde oda kararıp
  lamba yanıyor, SVG ürünlerde çizim yeniden ışıklandırılıyor.
- Sağ üstteki **ay düğmesine** basın — bütün vitrin karanlık odaya geçip lambalar yanar.
- Mağazada **"Hepsini yak / söndür / Temaya göre"** düğmeleriyle toplu kontrol.
- Sepette kupon: `MUSH10` (%10), `ISIK15` (10.000 ₺ üzeri %15), `KARGO0` (kargo bedava).
- Yönetici girip **Tema & renkler → Hazır paletler → Terrakota** seçin, kaydedin.
- **Ana sayfa → Yorumlar bölümü**ndeki anahtarı kapatın; bölüm siteden kalkar.
- **Bilgi sayfaları** sekmesinden kargo/iade metinlerini düzenleyin — bölüm
  ve SSS ekleyip çıkarabilirsiniz.
- **Yedek & sıfırla → JSON olarak indir** — tüm içeriğin yedeği.

## Responsive

320 / 375 / 414 / 768 / 1024 / 1440 px genişliklerde 11 sayfanın hepsi
yatay taşma vermeden ölçüldü.

Mobilde (≤860 px) üst bar sadeleşir: **tema düğmesi barda kalır** — yan
menüye taşınmaz. Arama ikonu (mağaza filtrelerinde zaten var) ve hesap
ikonu (yan menüde "Giriş yap" olarak var) gizlenir; geriye tema, sepet ve
menü düğmesi kalır. Header 82 → 64 px, logo 54 → 38 px (≤440 px'te 34 px).

Diğer kırılmalar: ürün ızgarası tek kolona düşer ve kart çerçevesi 3:4'ten
4:5'e kısalır, mağaza filtreleri "Filtreler" düğmesinin arkasına girer,
ürün detay/sepet/hesap iki kolondan tek kolona iner, Hakkımızda rakam
şeridi 4 → 2 → 1 kolon olur.

## Marka notu

Logo `assets/lambazade-logo.png` (koyu tema için krem varyantı `assets/lambazade-logo-beyaz.png`).
İkisi de içerik sınırına kırpıldı; kırpılmamış orijinaller `*-ham.png` olarak
duruyor. Üstteki duyuru şeridi kapatıldı — panelden
**Header & duyuru → Duyuru çubuğu** ile geri açabilirsiniz.

## Ödeme

`paymentMode: 'iyzico'` açık. Anahtarlar `.env` dosyasında (git'e girmez) ve
Netlify ortam değişkenlerine de girilmeli. Ayrıntı + anahtarlarınızın
sandbox test sonucu: **[DEPLOY.md](DEPLOY.md) bölüm 2**.

## Not

Ürünler, fiyatlar ve atölye hikâyesi kurgudur. Ödeme `demo` modunda
hiçbir yere istek atmaz, kart bilgisi istemez. Yönetim panelindeki
değişiklikler şimdilik tarayıcıda saklanır — ziyaretçilere yansıması için
DEPLOY.md bölüm 4'e bakın.
