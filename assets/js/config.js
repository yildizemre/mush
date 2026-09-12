/* ============================================================
   MUSH — Yapılandırma
   Canlıya almadan önce düzenlemeniz gereken tek dosya.
   ============================================================ */
window.MUSH_CONFIG = {

  /* ---------- Kimlik doğrulama ----------
     'local'    : tarayıcıda çalışan demo modu (kurulum gerektirmez).
                  Gerçek güvenlik YOKTUR, sadece arayüzü denemek için.
     'supabase' : gerçek kullanıcı yönetimi + Google/Apple ile giriş.
                  supabase alanını doldurup bu değeri 'supabase' yapın. */
  authMode: 'local',

  supabase: {
    url: '',              // https://xxxx.supabase.co
    anonKey: '',          // public anon key (tarayıcıda görünmesi normaldir)
    redirectTo: ''        // boş bırakılırsa otomatik: <site>/account.html
  },

  /* ---------- Ödeme ----------
     'demo'   : ödeme adımı simüle edilir, para çekilmez.
     'iyzico' : Netlify Functions üzerinden gerçek iyzico Checkout Form.

     ⚠ ANAHTARLAR BU DOSYAYA YAZILMAZ. Bu dosya tarayıcıya indiği için
       buraya konan Güvenlik Anahtarı (secret key) herkese açık olurdu.
       Anahtarlar yalnızca sunucuda durur:
         • yerelde  → .env          (git'e girmez, .gitignore'da)
         • canlıda  → Netlify > Site configuration > Environment variables
       Değişkenler: IYZICO_API_KEY, IYZICO_SECRET_KEY, IYZICO_BASE_URL

     Not: 'iyzico' modu Netlify Functions gerektirir. Yerelde denemek için
     `netlify dev` kullanın; `node dev-server.mjs` fonksiyonları çalıştırmaz. */
  paymentMode: 'iyzico',
  paymentFunctionPath: '/.netlify/functions/iyzico-init',

  /* ---------- İletişim ---------- */
  whatsapp: '905418629190',
  whatsappMesaj: 'Merhaba, Mush lambaderleri hakkında bilgi almak istiyorum.',

  /* ---------- Yönetim paneli ----------
     local modda admin girişi bu e-posta ile yapılır. 'supabase' modunda
     kullanıcının user_metadata.role alanı 'admin' olmalıdır. */
  adminEmail: 'admin@mush.com',
  adminDemoSifre: 'mush1234',

  /* ---------- Site ---------- */
  siteUrl: '',            // https://mush.com.tr — boş ise mevcut origin
  paraBirimi: 'TRY'
};
