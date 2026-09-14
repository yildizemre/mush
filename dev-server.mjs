/* ============================================================
   Bağımlılıksız yerel sunucu — node dev-server.mjs

   • Statik dosyaları sunar (query string ve .html uzantısı korunur)
   • /.netlify/functions/<ad> isteklerini netlify/functions/<ad>.mjs
     modülüne yönlendirir → iyzico akışı yerelde de çalışır
   • .env dosyasını okuyup process.env'e aktarır (anahtarlar için)
   ============================================================ */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const KOK = resolve(import.meta.dirname);
const PORT = Number(process.env.PORT) || 4173;

/* ---------- .env yükle ---------- */
const envYol = join(KOK, '.env');
if (existsSync(envYol)) {
  let sayac = 0;
  for (const satir of readFileSync(envYol, 'utf8').split('\n')) {
    const t = satir.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 1) continue;
    const ad = t.slice(0, i).trim();
    if (!process.env[ad]) { process.env[ad] = t.slice(i + 1).trim(); sayac++; }
  }
  console.log('.env okundu — %d değişken', sayac);
}

const TIP = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

/* ---------- Netlify Function çalıştırıcı ---------- */
const fnOnbellek = new Map();

async function fonksiyonCalistir(ad, istek, tamUrl) {
  const dosya = join(KOK, 'netlify', 'functions', ad + '.mjs');
  if (!existsSync(dosya)) return null;

  // Geliştirirken değişiklikleri görmek için sorgu damgasıyla yeniden yükle
  const damga = (await stat(dosya)).mtimeMs;
  const anahtar = ad + ':' + damga;
  let mod = fnOnbellek.get(anahtar);
  if (!mod) {
    mod = await import(pathToFileURL(dosya).href + '?v=' + damga);
    fnOnbellek.set(anahtar, mod);
  }
  const isleyici = mod.default;
  if (typeof isleyici !== 'function') {
    throw new Error(ad + '.mjs bir default fonksiyon dışa aktarmıyor');
  }

  // Node http isteğini Web Request'e çevir
  const govde = ['GET', 'HEAD'].includes(istek.method)
    ? undefined
    : await new Promise((coz) => {
        const parcalar = [];
        istek.on('data', (p) => parcalar.push(p));
        istek.on('end', () => coz(Buffer.concat(parcalar)));
      });

  const req = new Request(tamUrl, {
    method: istek.method,
    headers: istek.headers,
    body: govde && govde.length ? govde : undefined
  });

  return isleyici(req, { ip: istek.socket.remoteAddress });
}

createServer(async (istek, yanit) => {
  const url = new URL(istek.url, 'http://' + (istek.headers.host || 'localhost:' + PORT));

  /* --- Netlify Functions --- */
  if (url.pathname.startsWith('/.netlify/functions/')) {
    const ad = url.pathname.replace('/.netlify/functions/', '').split('/')[0];
    try {
      const cevap = await fonksiyonCalistir(ad, istek, url.href);
      if (!cevap) {
        yanit.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
          .end(JSON.stringify({ hata: 'Fonksiyon bulunamadı: ' + ad }));
        return;
      }
      const basliklar = {};
      cevap.headers.forEach((v, k) => { basliklar[k] = v; });
      const metin = cevap.body ? Buffer.from(await cevap.arrayBuffer()) : Buffer.alloc(0);
      yanit.writeHead(cevap.status, basliklar).end(metin);
      console.log('fn %s → %d', ad, cevap.status);
    } catch (e) {
      console.error('fn %s hata:', ad, e);
      yanit.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
        .end(JSON.stringify({ hata: e.message }));
    }
    return;
  }

  /* --- Statik dosyalar --- */
  let yol = decodeURIComponent(url.pathname);
  if (yol.endsWith('/')) yol += 'index.html';

  const temiz = join(KOK, normalize(yol).replace(/^(\.\.[/\\])+/, ''));
  if (!temiz.startsWith(KOK)) { yanit.writeHead(403).end('Forbidden'); return; }

  const adaylar = extname(temiz) ? [temiz] : [temiz, temiz + '.html', join(temiz, 'index.html')];

  try {
    let hedef = null;
    for (const a of adaylar) {
      try { if ((await stat(a)).isFile()) { hedef = a; break; } } catch { /* sıradaki */ }
    }
    if (!hedef) throw new Error('bulunamadı');

    const govde = await readFile(hedef);
    yanit.writeHead(200, {
      'Content-Type': TIP[extname(hedef).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    }).end(govde);
  } catch {
    yanit.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
      .end('<h1>404</h1><p><a href="/">Ana sayfaya dön</a></p>');
  }
}).listen(PORT, () => {
  const iy = process.env.IYZICO_API_KEY ? 'anahtarlar yüklü' : 'anahtar yok (demo)';
  console.log('Lambazade → http://localhost:%d   | Netlify Functions aktif | iyzico: %s', PORT, iy);
});
