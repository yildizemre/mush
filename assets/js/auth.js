/* ============================================================
   MUSH — Kimlik doğrulama katmanı
   İki sağlayıcı: 'local' (demo) ve 'supabase' (gerçek).
   config.js içindeki authMode hangisinin kullanılacağını belirler.
   ============================================================ */
(function (g) {
  'use strict';

  var C = g.MUSH_CONFIG;
  var OTURUM = 'mush.oturum.v2';
  var KULLANICILAR = 'mush.kullanicilar.v2';

  function oku(k, v) { try { var x = JSON.parse(localStorage.getItem(k)); return x === null ? v : x; } catch (e) { return v; } }
  function yaz(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  async function ozet(metin) {
    // Demo modda şifreyi düz metin tutmamak için SHA-256.
    // NOT: tarayıcıda tuzsuz özet gerçek güvenlik sağlamaz — canlıda 'supabase' kullanın.
    if (!g.crypto || !g.crypto.subtle) return 'plain:' + metin;
    var buf = new TextEncoder().encode('mush.' + metin);
    var hash = await g.crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash)).map(function (b) {
      return ('0' + b.toString(16)).slice(-2);
    }).join('');
  }

  function duyur() { document.dispatchEvent(new CustomEvent('oturum:degisti')); }

  /* ============================================================
     LOCAL sağlayıcı — kurulum gerektirmez, sadece bu tarayıcıda geçerli
     ============================================================ */
  var Local = {
    ad: 'local',

    kullanici: function () { return oku(OTURUM, null); },

    async kayit(bilgi) {
      var liste = oku(KULLANICILAR, []);
      var eposta = (bilgi.eposta || '').trim().toLowerCase();
      if (!eposta || !bilgi.sifre) throw new Error('E-posta ve şifre gerekli.');
      if (bilgi.sifre.length < 6) throw new Error('Şifre en az 6 karakter olmalı.');
      if (liste.some(function (k) { return k.eposta === eposta; })) {
        throw new Error('Bu e-posta ile bir hesap zaten var.');
      }
      var k = {
        id: 'u' + Date.now().toString(36),
        ad: (bilgi.ad || '').trim() || eposta.split('@')[0],
        eposta: eposta,
        sifreOzet: await ozet(bilgi.sifre),
        rol: eposta === (C.adminEmail || '').toLowerCase() ? 'admin' : 'musteri',
        saglayici: 'eposta',
        kayitTarihi: new Date().toISOString(),
        telefon: bilgi.telefon || '',
        adresler: []
      };
      liste.push(k);
      yaz(KULLANICILAR, liste);
      yaz(OTURUM, temiz(k));
      duyur();
      return temiz(k);
    },

    async giris(eposta, sifre) {
      eposta = (eposta || '').trim().toLowerCase();
      var liste = oku(KULLANICILAR, []);
      var k = liste.filter(function (x) { return x.eposta === eposta; })[0];

      // Admin hesabı ilk girişte otomatik oluşur
      if (!k && eposta === (C.adminEmail || '').toLowerCase() && sifre === C.adminDemoSifre) {
        return this.kayit({ ad: 'Yönetici', eposta: eposta, sifre: sifre });
      }
      if (!k) throw new Error('Bu e-posta ile kayıtlı hesap bulunamadı.');
      if (k.sifreOzet !== await ozet(sifre)) throw new Error('Şifre hatalı.');
      yaz(OTURUM, temiz(k));
      duyur();
      return temiz(k);
    },

    async saglayiciGiris(saglayici) {
      // Demo: gerçek OAuth yok. Google/Apple akışını taklit eden bir hesap açar.
      var eposta = 'demo-' + saglayici + '@lambazade.local';
      var liste = oku(KULLANICILAR, []);
      var k = liste.filter(function (x) { return x.eposta === eposta; })[0];
      if (!k) {
        k = {
          id: 'u' + Date.now().toString(36),
          ad: saglayici === 'google' ? 'Google Kullanıcısı' : 'Apple Kullanıcısı',
          eposta: eposta, sifreOzet: null, rol: 'musteri',
          saglayici: saglayici, kayitTarihi: new Date().toISOString(), adresler: []
        };
        liste.push(k);
        yaz(KULLANICILAR, liste);
      }
      yaz(OTURUM, temiz(k));
      duyur();
      return temiz(k);
    },

    async cikis() { yaz(OTURUM, null); duyur(); },

    async guncelle(yama) {
      var mevcut = oku(OTURUM, null);
      if (!mevcut) throw new Error('Oturum yok.');
      var liste = oku(KULLANICILAR, []);
      liste.forEach(function (k) { if (k.id === mevcut.id) Object.assign(k, yama); });
      yaz(KULLANICILAR, liste);
      var yeni = Object.assign({}, mevcut, yama);
      yaz(OTURUM, yeni);
      duyur();
      return yeni;
    }
  };

  function temiz(k) {
    var o = Object.assign({}, k);
    delete o.sifreOzet;
    return o;
  }

  /* ============================================================
     SUPABASE sağlayıcı — gerçek kullanıcı yönetimi + Google/Apple
     Kurulum: DEPLOY.md → "Giriş / üyelik"
     ============================================================ */
  var Supa = {
    ad: 'supabase',
    istemci: null,
    _kullanici: null,

    async hazirla() {
      if (this.istemci) return this.istemci;
      if (!C.supabase.url || !C.supabase.anonKey) {
        throw new Error('config.js içinde supabase.url ve supabase.anonKey dolu olmalı.');
      }
      if (!g.supabase) {
        await new Promise(function (coz, hata) {
          var s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
          s.onload = coz; s.onerror = function () { hata(new Error('Supabase kütüphanesi yüklenemedi.')); };
          document.head.appendChild(s);
        });
      }
      this.istemci = g.supabase.createClient(C.supabase.url, C.supabase.anonKey);
      var o = this;
      this.istemci.auth.onAuthStateChange(function (_olay, oturum) {
        o._kullanici = oturum ? o.donustur(oturum.user) : null;
        duyur();
      });
      var mevcut = await this.istemci.auth.getSession();
      this._kullanici = mevcut.data.session ? this.donustur(mevcut.data.session.user) : null;
      return this.istemci;
    },

    donustur: function (u) {
      if (!u) return null;
      var m = u.user_metadata || {};
      return {
        id: u.id,
        eposta: u.email,
        ad: m.full_name || m.name || m.ad || (u.email || '').split('@')[0],
        rol: m.role === 'admin' ? 'admin' : 'musteri',
        saglayici: (u.app_metadata && u.app_metadata.provider) || 'eposta',
        telefon: m.phone || '',
        adresler: m.adresler || []
      };
    },

    kullanici: function () { return this._kullanici; },

    async kayit(bilgi) {
      var c = await this.hazirla();
      var r = await c.auth.signUp({
        email: bilgi.eposta, password: bilgi.sifre,
        options: { data: { full_name: bilgi.ad, phone: bilgi.telefon || '' } }
      });
      if (r.error) throw new Error(r.error.message);
      if (!r.data.session) throw new Error('E-postanıza gönderilen doğrulama bağlantısına tıklayın.');
      return this.donustur(r.data.user);
    },

    async giris(eposta, sifre) {
      var c = await this.hazirla();
      var r = await c.auth.signInWithPassword({ email: eposta, password: sifre });
      if (r.error) throw new Error(r.error.message);
      return this.donustur(r.data.user);
    },

    async saglayiciGiris(saglayici) {
      var c = await this.hazirla();
      var hedef = C.supabase.redirectTo || (location.origin + '/account.html');
      var r = await c.auth.signInWithOAuth({
        provider: saglayici,           // 'google' | 'apple'
        options: { redirectTo: hedef }
      });
      if (r.error) throw new Error(r.error.message);
      return null; // tarayıcı yönlendirilir
    },

    async cikis() {
      var c = await this.hazirla();
      await c.auth.signOut();
      this._kullanici = null;
      duyur();
    },

    async guncelle(yama) {
      var c = await this.hazirla();
      var r = await c.auth.updateUser({ data: yama });
      if (r.error) throw new Error(r.error.message);
      this._kullanici = this.donustur(r.data.user);
      duyur();
      return this._kullanici;
    }
  };

  /* ============================================================
     Dışa açılan API
     ============================================================ */
  var saglayici = C.authMode === 'supabase' ? Supa : Local;

  var Auth = {
    mod: saglayici.ad,

    async baslat() {
      if (saglayici.hazirla) {
        try { await saglayici.hazirla(); }
        catch (e) { console.warn('Supabase başlatılamadı, local moda düşüldü:', e.message); saglayici = Local; Auth.mod = 'local'; }
      }
      return this.kullanici();
    },

    kullanici: function () { return saglayici.kullanici(); },
    girisli: function () { return !!saglayici.kullanici(); },
    adminMi: function () {
      var k = saglayici.kullanici();
      return !!k && k.rol === 'admin';
    },

    kayit: function (b) { return saglayici.kayit(b); },
    giris: function (e, s) { return saglayici.giris(e, s); },
    google: function () { return saglayici.saglayiciGiris('google'); },
    apple: function () { return saglayici.saglayiciGiris('apple'); },
    cikis: function () { return saglayici.cikis(); },
    guncelle: function (y) { return saglayici.guncelle(y); },

    /* Siparişler — local modda kullanıcıya bağlı olarak saklanır */
    siparislerim: function () {
      var k = this.kullanici();
      if (!k) return [];
      return Store.siparisler.filter(function (s) {
        return s.musteri && s.musteri.eposta === k.eposta;
      });
    }
  };

  g.Auth = Auth;
})(window);
