/* ============================================================
   MUSH — Lambader illüstrasyon motoru
   Her ürün için kendi paletiyle prosedürel SVG üretir.
   LampArt.render(urun, { glow:true|false, view:'tam'|'detay'|'taban' })

   glow:false  → lamba kapalı (soğuk, kontrastlı kontur)
   glow:true   → lamba yanıyor (sıcak halo + ışık huzmesi)
   ============================================================ */
(function (global) {
  'use strict';

  var W = 400, H = 580;

  function uid() { return 'l' + Math.random().toString(36).slice(2, 9); }

  /* Hex rengi aydınlat/karart (%) */
  function shade(hex, pct) {
    var h = String(hex || '#cccccc').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (isNaN(n)) n = 0xcccccc;
    var r = (n >> 16) & 255, gg = (n >> 8) & 255, b = n & 255;
    var f = pct / 100;
    function mix(c) {
      var v = f >= 0 ? c + (255 - c) * f : c * (1 + f);
      return Math.max(0, Math.min(255, Math.round(v)));
    }
    return '#' + [mix(r), mix(gg), mix(b)].map(function (c) {
      return ('0' + c.toString(16)).slice(-2);
    }).join('');
  }

  /* Beyaz zeminde siluetin kaybolmaması için kontur rengi */
  function kontur(p) { return shade(p.shade, -58); }

  /* --- Ortak tanımlar --- */
  function defs(id, p, on) {
    return [
      '<defs>',
      '<linearGradient id="sh' + id + '" x1="0" y1="0" x2="1" y2="0">',
      '<stop offset="0" stop-color="' + shade(p.shade, on ? -26 : -34) + '"/>',
      '<stop offset=".34" stop-color="' + p.shade + '"/>',
      '<stop offset=".56" stop-color="' + shade(p.shade, on ? 20 : 10) + '"/>',
      '<stop offset="1" stop-color="' + shade(p.shade, on ? -34 : -42) + '"/>',
      '</linearGradient>',

      '<linearGradient id="mt' + id + '" x1="0" y1="0" x2="1" y2="0">',
      '<stop offset="0" stop-color="' + shade(p.metal, -46) + '"/>',
      '<stop offset=".42" stop-color="' + shade(p.metal, 26) + '"/>',
      '<stop offset="1" stop-color="' + shade(p.metal, -54) + '"/>',
      '</linearGradient>',

      '<radialGradient id="gl' + id + '" cx=".5" cy=".5" r=".5">',
      '<stop offset="0" stop-color="' + p.glow + '" stop-opacity="' + (on ? .78 : 0) + '"/>',
      '<stop offset=".5" stop-color="' + p.glow + '" stop-opacity="' + (on ? .26 : 0) + '"/>',
      '<stop offset="1" stop-color="' + p.glow + '" stop-opacity="0"/>',
      '</radialGradient>',

      '<linearGradient id="bm' + id + '" x1="0" y1="0" x2="0" y2="1">',
      '<stop offset="0" stop-color="' + p.glow + '" stop-opacity="' + (on ? .42 : 0) + '"/>',
      '<stop offset=".6" stop-color="' + p.glow + '" stop-opacity="' + (on ? .1 : 0) + '"/>',
      '<stop offset="1" stop-color="' + p.glow + '" stop-opacity="0"/>',
      '</linearGradient>',

      '<filter id="bl' + id + '" x="-70%" y="-70%" width="240%" height="240%">',
      '<feGaussianBlur stdDeviation="18"/></filter>',
      '<filter id="sf' + id + '" x="-40%" y="-70%" width="180%" height="240%">',
      '<feGaussianBlur stdDeviation="10"/></filter>',
      '</defs>'
    ].join('');
  }

  function floor(id, p, x, on) {
    x = x == null ? W / 2 : x;
    return '<ellipse cx="' + x + '" cy="524" rx="112" ry="15" fill="#2a2118" opacity="' +
      (on ? .2 : .16) + '" filter="url(#sf' + id + ')"/>' +
      (on ? '<ellipse cx="' + x + '" cy="516" rx="164" ry="30" fill="url(#gl' + id + ')" opacity=".7"/>' : '');
  }

  function base(id, p, x) {
    x = x == null ? W / 2 : x;
    return '<ellipse cx="' + x + '" cy="512" rx="64" ry="12" fill="url(#mt' + id + ')"/>' +
      '<path d="M' + (x - 64) + ' 512 q64 21 128 0 v-7 q-64 19 -128 0 z" fill="' + shade(p.metal, -40) + '"/>' +
      '<ellipse cx="' + x + '" cy="506" rx="64" ry="12" fill="' + shade(p.metal, 14) + '"/>' +
      '<ellipse cx="' + x + '" cy="505" rx="44" ry="7" fill="' + shade(p.metal, -24) + '" opacity=".65"/>';
  }

  function stem(id, p, x, top, bottom, w) {
    x = x == null ? W / 2 : x;
    w = w || 7;
    return '<rect x="' + (x - w / 2) + '" y="' + top + '" width="' + w + '" height="' + (bottom - top) +
      '" rx="' + (w / 2) + '" fill="url(#mt' + id + ')"/>';
  }

  function beam(id, cx, top, wTop, wBot, bottom, on) {
    if (!on) return '';
    return '<path d="M' + (cx - wTop) + ' ' + top + ' L' + (cx + wTop) + ' ' + top +
      ' L' + (cx + wBot) + ' ' + bottom + ' L' + (cx - wBot) + ' ' + bottom + ' Z" fill="url(#bm' + id + ')"/>';
  }

  /* Abajur alt açıklığı: yanıyorsa ışık, kapalıysa iç gölge */
  function agiz(id, p, cx, cy, rx, ry, on) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' +
      (on ? p.glow : shade(p.shade, -46)) + '"/>' +
      (on ? '<ellipse cx="' + cx + '" cy="' + (cy + 2) + '" rx="' + (rx * .68) + '" ry="' + (ry * .7) +
        '" fill="#fff" opacity=".55" filter="url(#bl' + id + ')"/>' : '');
  }

  /* ---------------- Gövde tipleri ---------------- */
  var shapes = {

    cone: function (id, p, on) {
      var cx = W / 2;
      return [
        floor(id, p, cx, on),
        beam(id, cx, 196, 74, 132, 502, on),
        stem(id, p, cx, 180, 508, 8),
        base(id, p, cx),
        '<path d="M' + (cx - 52) + ' 96 L' + (cx + 52) + ' 96 L' + (cx + 92) + ' 196 L' + (cx - 92) + ' 196 Z" fill="url(#sh' + id + ')" stroke="' + kontur(p) + '" stroke-opacity=".35" stroke-width="1.2"/>',
        '<ellipse cx="' + cx + '" cy="96" rx="52" ry="10" fill="' + shade(p.shade, -16) + '" stroke="' + kontur(p) + '" stroke-opacity=".3" stroke-width="1"/>',
        agiz(id, p, cx, 196, 92, 17, on)
      ].join('');
    },

    globe: function (id, p, on) {
      var cx = W / 2, cy = 150, r = 78;
      return [
        floor(id, p, cx, on),
        stem(id, p, cx, cy, 508, 7),
        base(id, p, cx),
        on ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 78) + '" fill="url(#gl' + id + ')"/>' : '',
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#sh' + id + ')" stroke="' + kontur(p) + '" stroke-opacity=".32" stroke-width="1.2"/>',
        on ? '<circle cx="' + cx + '" cy="' + (cy + 10) + '" r="44" fill="' + p.glow + '" opacity=".6" filter="url(#bl' + id + ')"/>' : '',
        '<ellipse cx="' + (cx - 26) + '" cy="' + (cy - 30) + '" rx="22" ry="15" fill="#fff" opacity="' + (on ? .4 : .22) + '" transform="rotate(-22 ' + (cx - 26) + ' ' + (cy - 30) + ')"/>',
        '<path d="M' + (cx - 14) + ' ' + (cy - r - 5) + ' h28 v11 h-28 z" fill="' + shade(p.metal, -14) + '"/>'
      ].join('');
    },

    arc: function (id, p, on) {
      var bx = 300, sx = 148;
      return [
        floor(id, p, bx, false),
        on ? '<ellipse cx="' + sx + '" cy="500" rx="132" ry="26" fill="url(#gl' + id + ')"/>' : '',
        beam(id, sx, 214, 46, 112, 502, on),
        '<path d="M' + bx + ' 505 C' + bx + ' 250 ' + (bx - 30) + ' 108 ' + sx + ' 108" fill="none" stroke="url(#mt' + id + ')" stroke-width="9" stroke-linecap="round"/>',
        base(id, p, bx),
        '<path d="M' + (sx - 46) + ' 132 L' + (sx + 46) + ' 132 L' + (sx + 58) + ' 214 L' + (sx - 58) + ' 214 Z" fill="url(#sh' + id + ')" stroke="' + kontur(p) + '" stroke-opacity=".35" stroke-width="1.2"/>',
        '<ellipse cx="' + sx + '" cy="132" rx="46" ry="9" fill="' + shade(p.shade, -18) + '"/>',
        agiz(id, p, sx, 214, 58, 11, on)
      ].join('');
    },

    tripod: function (id, p, on) {
      var cx = W / 2, legTop = 260;
      var leg = function (x2, w) {
        return '<path d="M' + (cx - w / 2) + ' ' + legTop + ' L' + (x2 - w * .7) + ' 506 l' + (w * 1.4) + ' 0 L' + (cx + w / 2) + ' ' + legTop + ' Z" fill="url(#mt' + id + ')"/>';
      };
      return [
        floor(id, p, cx, on),
        beam(id, cx, 214, 72, 126, 502, on),
        leg(cx - 96, 9), leg(cx + 96, 9),
        '<path d="M' + (cx - 5) + ' ' + legTop + ' L' + (cx - 7) + ' 506 h14 L' + (cx + 5) + ' ' + legTop + ' Z" fill="' + shade(p.metal, -28) + '"/>',
        '<circle cx="' + cx + '" cy="' + legTop + '" r="11" fill="' + shade(p.metal, 20) + '"/>',
        stem(id, p, cx, 208, legTop, 6),
        '<path d="M' + (cx - 60) + ' 112 L' + (cx + 60) + ' 112 L' + (cx + 88) + ' 214 L' + (cx - 88) + ' 214 Z" fill="url(#sh' + id + ')" stroke="' + kontur(p) + '" stroke-opacity=".35" stroke-width="1.2"/>',
        '<ellipse cx="' + cx + '" cy="112" rx="60" ry="11" fill="' + shade(p.shade, -16) + '"/>',
        agiz(id, p, cx, 214, 88, 16, on)
      ].join('');
    },

    cylinder: function (id, p, on) {
      var cx = W / 2;
      return [
        floor(id, p, cx, on),
        beam(id, cx, 220, 62, 104, 502, on),
        on ? '<ellipse cx="' + cx + '" cy="100" rx="120" ry="70" fill="url(#gl' + id + ')" opacity=".7"/>' : '',
        stem(id, p, cx, 210, 508, 10),
        base(id, p, cx),
        '<rect x="' + (cx - 62) + '" y="104" width="124" height="116" fill="url(#sh' + id + ')" stroke="' + kontur(p) + '" stroke-opacity=".32" stroke-width="1.2"/>',
        '<ellipse cx="' + cx + '" cy="104" rx="62" ry="12" fill="' + (on ? shade(p.glow, 16) : shade(p.shade, -12)) + '"/>',
        '<rect x="' + (cx - 62) + '" y="158" width="124" height="1.5" fill="' + shade(p.shade, -30) + '" opacity=".28"/>',
        agiz(id, p, cx, 220, 62, 12, on)
      ].join('');
    },

    tiered: function (id, p, on) {
      var cx = W / 2;
      var out = [floor(id, p, cx, on), beam(id, cx, 250, 58, 100, 502, on), stem(id, p, cx, 240, 508, 8), base(id, p, cx)];
      var rows = [[96, 30], [128, 44], [160, 58], [192, 72], [224, 58]];
      rows.forEach(function (r, i) {
        var y = r[0], rx = r[1];
        if (on) out.push('<ellipse cx="' + cx + '" cy="' + (y + 12) + '" rx="' + (rx + 26) + '" ry="12" fill="url(#gl' + id + ')" opacity=".5"/>');
        out.push('<ellipse cx="' + cx + '" cy="' + y + '" rx="' + rx + '" ry="' + (rx * .22) + '" fill="' + shade(p.shade, i % 2 ? 4 : -14) + '"/>');
        out.push('<path d="M' + (cx - rx) + ' ' + y + ' a' + rx + ' ' + (rx * .22) + ' 0 0 0 ' + (rx * 2) + ' 0 v14 a' + rx + ' ' + (rx * .22) + ' 0 0 1 ' + (-rx * 2) + ' 0 z" fill="url(#sh' + id + ')" stroke="' + kontur(p) + '" stroke-opacity=".24" stroke-width="1"/>');
      });
      if (on) out.push('<ellipse cx="' + cx + '" cy="248" rx="52" ry="11" fill="' + p.glow + '" opacity=".7" filter="url(#bl' + id + ')"/>');
      return out.join('');
    },

    cluster: function (id, p, on) {
      var cx = W / 2;
      var nodes = [[cx - 84, 168, 34], [cx + 6, 108, 42], [cx + 88, 196, 28]];
      var out = [floor(id, p, cx, on)];
      nodes.forEach(function (n) {
        out.push('<path d="M' + cx + ' 330 C' + cx + ' 250 ' + n[0] + ' ' + (n[1] + 90) + ' ' + n[0] + ' ' + (n[1] + n[2]) +
          '" fill="none" stroke="url(#mt' + id + ')" stroke-width="5" stroke-linecap="round"/>');
      });
      out.push(stem(id, p, cx, 320, 508, 9), base(id, p, cx));
      nodes.forEach(function (n) {
        if (on) out.push('<circle cx="' + n[0] + '" cy="' + n[1] + '" r="' + (n[2] + 62) + '" fill="url(#gl' + id + ')"/>');
        out.push('<circle cx="' + n[0] + '" cy="' + n[1] + '" r="' + n[2] + '" fill="url(#sh' + id + ')" stroke="' + kontur(p) + '" stroke-opacity=".3" stroke-width="1.1"/>');
        if (on) out.push('<circle cx="' + n[0] + '" cy="' + n[1] + '" r="' + (n[2] * .6) + '" fill="' + p.glow + '" opacity=".55" filter="url(#bl' + id + ')"/>');
        out.push('<ellipse cx="' + (n[0] - n[2] * .32) + '" cy="' + (n[1] - n[2] * .36) + '" rx="' + (n[2] * .26) + '" ry="' + (n[2] * .18) + '" fill="#fff" opacity="' + (on ? .38 : .22) + '"/>');
      });
      return out.join('');
    },

    lantern: function (id, p, on) {
      var cx = W / 2;
      var out = [floor(id, p, cx, on), beam(id, cx, 246, 60, 108, 502, on), stem(id, p, cx, 236, 508, 7), base(id, p, cx)];
      if (on) out.push('<ellipse cx="' + cx + '" cy="168" rx="168" ry="168" fill="url(#gl' + id + ')"/>');
      out.push('<path d="M' + cx + ' 92 C' + (cx + 104) + ' 110 ' + (cx + 104) + ' 228 ' + cx + ' 246 C' + (cx - 104) + ' 228 ' + (cx - 104) + ' 110 ' + cx + ' 92 Z" fill="url(#sh' + id + ')" stroke="' + kontur(p) + '" stroke-opacity=".34" stroke-width="1.2"/>');
      for (var i = -3; i <= 3; i++) {
        var k = i * 24;
        out.push('<path d="M' + (cx + k * .42) + ' ' + (98 + Math.abs(i) * 5) + ' C' + (cx + k * 1.05) + ' 140 ' + (cx + k * 1.05) + ' 198 ' + (cx + k * .42) + ' ' + (240 - Math.abs(i) * 5) +
          '" fill="none" stroke="' + (on ? shade(p.glow, -12) : kontur(p)) + '" stroke-width="1" opacity="' + (on ? .55 : .3) + '"/>');
      }
      out.push(agiz(id, p, cx, 246, 30, 6, on));
      return out.join('');
    }
  };

  /* ---------------- Genel render ---------------- */
  function render(p, opts) {
    opts = opts || {};
    var on = opts.glow !== false;
    var id = uid();
    var fn = shapes[p.type] || shapes.cone;
    var pal = p.palette || { metal: '#b9a37c', shade: '#f2ead9', glow: '#ffb347' };
    var extra = opts.class ? ' class="' + opts.class + '"' : '';
    var vb = opts.view === 'detay' ? '58 58 284 284'
      : (opts.view === 'taban' ? '80 300 240 260' : '0 0 ' + W + ' ' + H);

    return '<svg viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" role="img" ' +
      'aria-label="' + (p.ad || p.name || 'Lambader') + (on ? ' (ışık açık)' : ' (ışık kapalı)') + '"' + extra + '>' +
      defs(id, pal, on) + fn(id, pal, on) + '</svg>';
  }

  global.LampArt = { render: render, shade: shade, shapes: Object.keys(shapes) };
})(window);
