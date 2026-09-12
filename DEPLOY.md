# Mush — Canlıya Alma Rehberi

Sıra önemli: **1) Netlify'a çık → 2) iyzico'yu bağla → 3) üyeliği bağla.**
Her adım bağımsız; 1. adımdan sonra site zaten çalışır (ödeme demo modunda kalır).

---

## 1. Netlify'a yükle

Derleme adımı yok — dosyalar olduğu gibi yayınlanır. `netlify.toml` hazır.

### A) GitHub üzerinden (önerilen)

```bash
git init
git add .
git commit -m "Mush e-ticaret vitrini"
git branch -M main
git remote add origin https://github.com/<kullanici>/mush.git
git push -u origin main
```

Netlify → **Add new site → Import an existing project** → repoyu seç.
Ayarları `netlify.toml` okur, elle bir şey girmenize gerek yok:

| Alan | Değer |
| --- | --- |
| Build command | (boş) |
| Publish directory | `.` |
| Functions directory | `netlify/functions` |

### B) Sürükle-bırak (hızlı deneme)

Klasörü `app.netlify.com/drop` adresine bırakın. **Not:** bu yöntemle
fonksiyonlar bazen yüklenmez; iyzico kullanacaksanız A yolunu seçin.

### Alan adı

Netlify → **Domain management → Add custom domain**. SSL otomatik gelir.
Sonra `assets/js/config.js` içinde `siteUrl` alanına adresi yazın.

---

## 2. iyzico ile ödeme

### 2.1 Anahtarları alın

iyzico panelinde **Ayarlar → API Anahtarları**:

- Test için: **Sandbox** API key + secret (`sandbox-...`)
- Canlı için: **Production** API key + secret

### 2.2 Anahtarlarınızın durumu (test edildi)

Verdiğiniz anahtarlar `.env` dosyasına yazıldı (bu dosya `.gitignore`'da,
repoya girmez) ve iki ortamda da denendi:

| Ortam | Sonuç |
| --- | --- |
| `https://api.iyzipay.com` (canlı) | ✅ Kimlik doğrulama **geçti** — Checkout Form açıldı, gerçek ödeme sayfası URL'i döndü |
| `https://sandbox-api.iyzipay.com` | ❌ `errorCode 1001 · api bilgileri bulunamadı` |

Yani elinizdeki anahtarlar **canlı (production)** anahtarlar ve `.env` buna göre
production uç noktasına ayarlandı. Entegrasyon uçtan uca çalışıyor.

> ⚠ **CANLI MOD.** Bu ayarla tamamlanan her ödeme gerçek para çeker. Önce test
> etmek isterseniz iyzico panelinden *Sandbox* anahtar çifti alıp `.env`'deki
> iki satırı onlarla değiştirin, `IYZICO_BASE_URL`'i de sandbox'a çevirin.

> 🔑 **Anahtarları yenileyin.** Anahtarlar sohbet geçmişine yazıldığı için artık
> "sızmış" sayılmalı. iyzico panelinden yeni bir çift üretip eskilerini iptal
> edin; yenilerini yalnızca `.env` dosyasına ve Netlify ortam değişkenlerine girin.

### 2.3 Netlify'a girilecek üç ortam değişkeni

Netlify → **Site configuration → Environment variables → Add a variable**.
Üç değişkenin adı tam olarak şöyle olmalı:

| Değişken adı | Değer |
| --- | --- |
| `IYZICO_API_KEY` | iyzico panelindeki **API Anahtarı** |
| `IYZICO_SECRET_KEY` | iyzico panelindeki **Güvenlik Anahtarı** |
| `IYZICO_BASE_URL` | canlı: `https://api.iyzipay.com` · test: `https://sandbox-api.iyzipay.com` |

Değerler yerel makinede `.env` dosyasında duruyor (git'e girmez). Aynı üçünü
Netlify'a da girmeniz gerekiyor, yoksa canlıda ödeme çalışmaz.

Scope: **All scopes** / **All deploy contexts** seçin. Değişkenleri ekledikten
sonra siteyi bir kez yeniden deploy edin (env değişiklikleri mevcut deploy'a
uygulanmaz).



Netlify → **Site configuration → Environment variables → Add a variable**:

| Değişken | Test değeri | Canlı değeri |
| --- | --- | --- |
| `IYZICO_API_KEY` | sandbox api key | canlı api key |
| `IYZICO_SECRET_KEY` | sandbox secret key | canlı secret key |
| `IYZICO_BASE_URL` | `https://sandbox-api.iyzipay.com` | `https://api.iyzipay.com` |

> Bu üç değer **yalnızca sunucuda** durur, tarayıcıya hiç gitmez.
> Secret key'i asla `config.js` gibi istemci dosyalarına yazmayın.

### 2.4 Siteyi iyzico moduna alın

`assets/js/config.js`:

`assets/js/config.js` içinde bu **zaten yapıldı**:

```js
paymentMode: 'iyzico',
```

Demo moda dönmek isterseniz `'demo'` yazın. Artık "Siparişi tamamla" iyzico'nun kendi güvenli
ödeme sayfasına yönlendirir — **kart bilgisi sitenize hiç girilmez.**

### 2.5 Akış nasıl çalışıyor?

```
cart.html                                    (tarayıcı)
   │ POST sepet + müşteri
   ▼
/.netlify/functions/iyzico-init              (sunucu — imzalı istek)
   │ iyzico Checkout Form başlat
   ▼
iyzico ödeme sayfası                          (kart burada girilir)
   │ ödeme sonucu POST
   ▼
/.netlify/functions/iyzico-callback          (sunucu — token doğrulanır)
   │ 302
   ▼
odeme-sonuc.html?status=success|failure
```

Kritik nokta: başarı bilgisi tarayıcıdan değil, **iyzico'dan token ile
tekrar sorularak** doğrulanıyor (`iyzico-callback.mjs`). Bu, sahte "ödendi"
isteklerini engeller.

### 2.6 iyzico panelinde yapılacak ayar

**Ayarlar → Bildirim/Callback URL** alanına:

```
https://<siteniz>/.netlify/functions/iyzico-callback
```

### 2.7 Test kartı (sandbox)

iyzico dokümanındaki güncel test kartlarını kullanın — en yaygını:
`5528 7900 0000 0008`, son kullanma `12/2030`, CVC `123`, 3D şifre `283126`.
Kart numaraları iyzico tarafında değişebiliyor, panelinizdeki listeyi teyit edin.

### 2.8 Bilmeniz gerekenler

- `identityNumber` alanı iyzico'da zorunludur. Formda TCKN toplamadığımız için
  `iyzico-init.mjs` içinde dolgu bir değer gönderiliyor. iyzico hesabınız TCKN
  doğrulaması istiyorsa checkout formuna bir TCKN alanı ekleyip bu değeri
  oradan besleyin.
- **Sipariş kaydı şu an tarayıcıda tutuluyor.** Gerçek operasyon için
  `iyzico-callback.mjs` içindeki `console.log` satırının yerine kendi
  veritabanınıza (Supabase/Neon/Airtable) yazan bir çağrı koyun — aksi halde
  müşterinin ödemesini kendi tarayıcısı dışında göremezsiniz. Bu, canlıya
  geçmeden önce **mutlaka** yapılmalı.
- İmzalama (IYZWSv2) canlı bir istekle doğrulandı — iyzico isteği kabul
  ediyor. Kalan tek adım geçerli ortam anahtarları (bkz. 2.2).
- Hata ayıklarken Netlify → **Functions → Logs** ekranında iyzico'nun
  döndürdüğü `errorCode` + `errorMessage` net biçimde görünür.
- Yerelde denemek için `netlify dev` gerekir; `node dev-server.mjs`
  fonksiyonları çalıştırmaz (ödeme adımında bunu söyleyen bir uyarı çıkar).

---

## 3. Giriş / üyelik (Google + Apple)

Şu an `authMode: 'local'` — hesaplar **yalnızca ziyaretçinin tarayıcısında**
tutulur. Arayüzü denemek için yeterli, gerçek üyelik için değil.

### 3.1 Supabase projesi açın

1. [supabase.com](https://supabase.com) → yeni proje.
2. **Project Settings → API**: `Project URL` ve `anon public` anahtarını kopyalayın.
3. `assets/js/config.js`:

```js
authMode: 'supabase',
supabase: {
  url: 'https://xxxx.supabase.co',
  anonKey: 'eyJhbGci...',
  redirectTo: 'https://<siteniz>/account.html'
}
```

`anonKey`'in tarayıcıda görünmesi normaldir — yetkiyi Supabase'in
Row Level Security kuralları belirler.

### 3.2 Google ile giriş

1. Google Cloud Console → **APIs & Services → Credentials → OAuth client ID**
   (tip: Web application).
2. **Authorized redirect URI**:
   `https://xxxx.supabase.co/auth/v1/callback`
3. Client ID + Secret'ı Supabase → **Authentication → Providers → Google**
   ekranına girin, etkinleştirin.

### 3.3 Apple ile giriş

1. Apple Developer → **Certificates, Identifiers & Profiles**
   → bir **Services ID** oluşturun, "Sign in with Apple"ı açın.
2. Return URL: `https://xxxx.supabase.co/auth/v1/callback`
3. Bir **Key** (Sign in with Apple) üretip Team ID, Key ID ve `.p8` içeriğini
   Supabase → **Authentication → Providers → Apple** ekranına girin.

> Apple ile giriş için ücretli Apple Developer üyeliği (yıllık 99 USD) gerekir.
> Google ücretsizdir. Önce Google'ı açıp Apple'ı sonra ekleyebilirsiniz —
> Apple kapalıyken butona basan kullanıcı anlaşılır bir hata mesajı görür.

### 3.4 Yönetici yetkisi

Supabase → **Authentication → Users** → kendi kullanıcınız →
**User Metadata** alanına:

```json
{ "role": "admin" }
```

Bu kullanıcı artık `admin.html` panelini açabilir. `role` alanı olmayan
kullanıcılar panele giremez.

---

## 4. Yönetim panelini anlamak

`/admin.html` (veya `/yonetim`) adresinden girilir.

| Sekme | Ne yapar |
| --- | --- |
| Gösterge | Sipariş/ciro/stok özeti + canlı site önizlemesi |
| Siparişler | Durum değiştirme (ödeme bekliyor → hazırlanıyor → kargoda → teslim) |
| Ürünler | Ekle/düzenle/sil; fiyat, stok, gövde tipi, renk paleti, öne çıkarma |
| Koleksiyonlar | Ürün gruplarını yönet, ana sayfada göster/gizle |
| Kampanyalar | Kupon kodları: % indirim, ₺ indirim veya ücretsiz kargo |
| Ana sayfa | Hero, bölüm başlıkları, bölüm aç/kapa, atölye adımları, yorumlar, kayan şerit |
| Header & duyuru | Marka adı, turuncu duyuru çubuğu, menü öğeleri |
| Footer | Sütunlar ve bağlantılar (WhatsApp için link alanına `whatsapp` yazın) |
| Tema & renkler | Marka rengi (tüm skala türetilir), köşe yumuşaklığı, ürün ışığı varsayılanı |
| Ayarlar | Kargo limiti/ücreti, iletişim, SEO, entegrasyon durumu |
| Hakkımızda | Marka hikâyesi, rakamlar, ilkeler, zanaat anlatısı |
| Bilgi sayfaları | Kargo, iade, ampul rehberi ve garanti metinleri (bölüm + SSS) |
| Yedek & sıfırla | JSON dışa/içe aktarma, fabrika ayarları |

### Şu an nerede saklanıyor?

Panelden yaptığınız değişiklikler **o tarayıcının `localStorage`'ında**
tutulur. Yani:

- ✅ Kendi bilgisayarınızda düzenler, anında görürsünüz.
- ❌ Değişiklikler ziyaretçilere **otomatik yansımaz.**

**Kalıcı hale getirmenin iki yolu:**

1. **Hızlı yol (kod sürümleme):** Yedek sekmesinden JSON indirin,
   `assets/js/seed.js` içeriğini bu veriyle güncelleyip push edin.
   Küçük ekipler için yeterlidir, sürüm geçmişi de git'te durur.
2. **Doğru yol (veritabanı):** Supabase'de bir `site_icerik` tablosu açıp
   `assets/js/store.js` içindeki `oku`/`yaz` fonksiyonlarını Supabase'e
   bağlayın. `Store` API'si (`urunKaydet`, `kaydet`, `siparisEkle`…)
   aynı kalır, sadece kalıcılık katmanı değişir.

---

## 5. Canlıya geçmeden kontrol listesi

- [x] `config.js` → `paymentMode: 'iyzico'` (yapıldı) · `siteUrl` doldurulacak
- [ ] iyzico anahtarları yenilendi (eskiler sohbette paylaşıldı)
- [ ] `.env` **commit edilmedi** (`.gitignore` hazır — `git status` ile teyit edin)
- [ ] Netlify'da 3 iyzico ortam değişkeni tanımlı
- [ ] iyzico panelinde callback URL girildi
- [ ] Sandbox'ta test kartıyla başarılı **ve** başarısız ödeme denendi
- [ ] Sipariş kaydı bir veritabanına yazılıyor (bkz. 2.7)
- [ ] `config.js` → `authMode: 'supabase'`, Google/Apple sağlayıcıları açık
- [ ] Yönetici kullanıcının metadata'sında `"role": "admin"` var
- [ ] `adminDemoSifre` satırı `config.js`'den **silindi** (demo moddan çıkınca gereksiz)
- [ ] WhatsApp numarası doğru: `config.js → whatsapp`
- [ ] Mesafeli satış sözleşmesi, iade ve gizlilik metinleri eklendi
      (e-ticarette yasal zorunluluk — şu an sitede yok)
- [ ] KVKK aydınlatma metni ve çerez bildirimi eklendi

---

## 6. Eksikler / bilinçli bırakılanlar

Dürüst olmak gerekirse gerçek bir mağaza için hâlâ şunlar gerekli:

| Konu | Durum |
| --- | --- |
| Ürün fotoğrafı | 2 üründe var (`product/class1`, `class2`); diğerleri SVG çizim |
| Stok düşümü | Sipariş sonrası stok otomatik azalmıyor |
| E-posta bildirimi | Yok (Netlify + Resend/SendGrid ile eklenebilir) |
| Kargo entegrasyonu | Yok, takip kodu elle girilir |
| Fatura / e-arşiv | Yok |
| Yasal metinler | Kargo/iade/garanti/ampul sayfaları yazıldı; **mesafeli satış sözleşmesi, KVKK ve çerez metni hâlâ yok** |
| Çok dilli destek | Yok, sadece Türkçe |
