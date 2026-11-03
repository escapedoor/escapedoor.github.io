/* Meet Me Halfway - what the rooms of both parts share (expedition-a and expedition-b carry the same copy of this file).
   XP.card(...)    the card in the top left corner: what to tell or ask the partner first
   XP.thing(...)   a thing in the scene that answers a click with a line (and a name tag)
   XP.look(...)    a close look at one thing, with buttons
   XP.says(...)    a button that stands in for the partner's screen while the two screens are not linked
   XP.phone(...)   the field telephone: what one player does with it buzzes on the other screen when linked
   XP.compass / XP.watch / XP.tape / XP.lamp   instruments, drawn and never written as words
   XP.survey(...)  the published survey of 1975, drawn from data (with the player's red-pencil corrections)
   The papers (the 1968 notebook, the survey legend, the club card, the explorer's kit card) live here too, so that they
   read the same in every room. The cave, the club and the people are invented. */
window.XP = (function () {
  'use strict';
  var D = document, cardEl = null, saysEl = null;

  function card(parts) {
    if (!cardEl) {
      cardEl = ER.el('div', 'pcard');
      D.body.appendChild(cardEl);
      cardEl.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('.w')) return;
        cardEl.classList.toggle('min');
        cardEl.querySelector('.fold').textContent = cardEl.classList.contains('min') ? 'open' : 'fold';
      });
    }
    var s = '<span class="fold">fold</span>';
    parts.forEach(function (p) { s += '<h6>' + p[0] + '</h6>' + p[1].map(function (l) { return '<p>' + l + '</p>'; }).join(''); });
    var was = cardEl.innerHTML;
    cardEl.innerHTML = ER.gloss(s);
    cardEl.classList.remove('min');
    if (was && was !== cardEl.innerHTML) { cardEl.classList.remove('ping'); void cardEl.offsetWidth; cardEl.classList.add('ping'); }
  }

  function thing(sel, word, text, busy) {
    var n = ER.$(sel); if (!n) return;
    n.addEventListener('click', function (e) {
      if (busy && busy()) return;
      var t = typeof text === 'function' ? text() : text;
      if (word) ER.wordAt(e.clientX, e.clientY, word);
      if (t) ER.say(t);
    });
  }

  /* o = {kicker, title, pic, text, acts: [{id, label, fn(api)}], msg, lock (false: a plain look), onClose} */
  function look(o) {
    var box = ER.el('div', 'xl'), api;
    box.innerHTML = '<div class="xl-pic"></div><div class="xl-body"><h5><small></small></h5><div class="xl-text"></div><p class="xl-msg"></p><div class="xl-acts"></div></div>';
    box.querySelector('.xl-pic').innerHTML = o.pic || '';
    box.querySelector('h5 small').textContent = o.kicker || '';
    box.querySelector('h5').appendChild(D.createTextNode(o.title));
    box.querySelector('.xl-text').innerHTML = ER.gloss(o.text || '');
    api = {
      box: box,
      msg: function (t) { box.querySelector('.xl-msg').innerHTML = ER.gloss(t || ''); },
      pic: function (s) { box.querySelector('.xl-pic').innerHTML = s; },
      text: function (t) { box.querySelector('.xl-text').innerHTML = ER.gloss(t || ''); },
      acts: function (list) {
        var a = box.querySelector('.xl-acts'); a.innerHTML = '';
        (list || []).forEach(function (x) {
          var b = ER.el('button', 'btn' + (x.cls ? ' ' + x.cls : ''), x.label); b.type = 'button';
          if (x.id) b.id = x.id;
          b.addEventListener('click', function () { x.fn(api); });
          a.appendChild(b);
        });
      }
    };
    api.acts(o.acts);
    if (o.msg) api.msg(o.msg);
    ER.open(o.lock === false ? 'ov-look' : 'ov-lock', box, o.onClose);
    return api;
  }

  /* ---------- the link ---------- */
  function linked() { return !!(window.Link && Link.linked()); }
  function set(k, v) { if (window.Link) Link.set(k, v === undefined ? true : v); }
  function when(k, fn) { if (window.Link) Link.when(k, fn); }
  /* fn(value) every time the partner's screen changes key k (not for the value it had when the page opened) */
  function watchKey(k, fn) {
    if (!window.Link) return;
    var last = Link.get(k);
    Link.on(function () { var v = Link.get(k); if (v !== undefined && v !== null && v !== last) { last = v; fn(v); } });
  }
  /* a button that does by hand what the partner's linked screen would do: shown only while the screens are not linked */
  function says(id, label, fn) {
    if (!saysEl) { saysEl = ER.el('div', 'xp-says'); D.body.appendChild(saysEl); }
    var b = ER.el('button', '', label); b.type = 'button'; b.id = id; saysEl.appendChild(b);
    var want = false;
    function paint() { b.classList.toggle('on', want && !linked()); }
    b.addEventListener('click', function () { if (!ER.isOpen()) fn(); });
    setInterval(paint, 700);
    return { show: function (on) { want = on !== false; paint(); }, node: b };
  }
  /* the field telephone. mine: the key this screen sets when its player rings; theirs: the partner's key */
  function phone(o) {
    var n = 0;
    watchKey(o.theirs, function () { if (o.buzz) o.buzz(); });
    return function ring() { n++; set(o.mine, Date.now() + n); buzzSound(); };
  }

  /* ---------- sounds ---------- */
  function buzzSound() { for (var i = 0; i < 3; i++) ER.tone({ type: 'square', f: 220, dur: 0.18, peak: 0.035, when: i * 0.26 }); }
  var sfx = {
    buzz: buzzSound,
    drip: function () { ER.tone({ f: 1500, f2: 520, dur: 0.09, peak: 0.12 }); },
    splash: function () { ER.burst({ type: 'lowpass', f: 900, f2: 200, dur: 0.6, peak: 0.22, a: 0.02 }); },
    scrape: function () { ER.burst({ type: 'bandpass', f: 1400, f2: 700, q: 0.7, dur: 0.45, peak: 0.12, a: 0.05 }); ER.burst({ type: 'bandpass', f: 1200, f2: 600, q: 0.7, dur: 0.4, peak: 0.1, a: 0.05, when: 0.5 }); },
    stone: function () { ER.tone({ f: 330, f2: 180, dur: 0.12, peak: 0.12 }); ER.burst({ dur: 0.05, f: 2600, q: 2, peak: 0.1 }); },
    rope: function () { ER.burst({ type: 'highpass', f: 1800, dur: 0.35, peak: 0.07, a: 0.08 }); },
    click: function () { ER.burst({ dur: 0.02, f: 3000, q: 2, peak: 0.16 }); },
    lamp: function (on) { ER.tone({ f: on ? 880 : 520, dur: 0.06, peak: 0.06 }); }
  };

  /* ---------- instruments ---------- */
  var P8 = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  /* a card compass: the card turns with the needle, and the letter under the black mark at the top is the way you face */
  function compass(face) {
    var s = '<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="220" fill="#2b2620"/>' +
      '<rect x="22" y="14" width="176" height="196" rx="16" fill="#cfd8d2" stroke="#7d8a84" stroke-width="3"/>' +
      '<circle cx="110" cy="116" r="78" fill="#151a1c"/><circle cx="110" cy="116" r="70" fill="#f2efe2"/><g transform="rotate(' + (-face) + ' 110 116)">', i, a;
    for (i = 0; i < 72; i++) {
      a = i * 5 * Math.PI / 180;
      s += '<path d="M' + (110 + 66 * Math.sin(a)).toFixed(1) + ' ' + (116 - 66 * Math.cos(a)).toFixed(1) + 'L' + (110 + (i % 9 ? 61 : 54) * Math.sin(a)).toFixed(1) + ' ' + (116 - (i % 9 ? 61 : 54) * Math.cos(a)).toFixed(1) + '" stroke="#2a2a2a" stroke-width="' + (i % 9 ? 1 : 2.4) + '"/>';
    }
    P8.forEach(function (l, j) {
      a = j * 45 * Math.PI / 180;
      s += '<text x="' + (110 + 42 * Math.sin(a)).toFixed(1) + '" y="' + (116 - 42 * Math.cos(a) + 6).toFixed(1) + '" transform="rotate(' + (j * 45) + ' ' + (110 + 42 * Math.sin(a)).toFixed(1) + ' ' + (116 - 42 * Math.cos(a)).toFixed(1) + ')" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="' + (l.length > 1 ? 15 : 20) + '" fill="' + (l === 'N' ? '#c0391b' : '#1d1d1d') + '" text-anchor="middle">' + l + '</text>';
    });
    s += '<path d="M110 62l9 54h-18z" fill="#c0391b"/><path d="M110 170l9 -54h-18z" fill="#e8e3d0" stroke="#555" stroke-width="1"/></g><circle cx="110" cy="116" r="5" fill="#333"/>' +
      '<path d="M110 26l10 16h-20z" fill="#111"/><path d="M110 46v8" stroke="#111" stroke-width="4"/>' +
      '<text x="110" y="206" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="12" letter-spacing="2" fill="#38423e" text-anchor="middle">THE WAY YOU FACE IS AT THE TOP</text></svg>';
    return s;
  }
  function watch(h, m) {
    var s = '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#241d16"/><circle cx="100" cy="100" r="92" fill="#3a3a3a"/>' +
      '<circle cx="100" cy="100" r="80" fill="#f4f0e2"/>', i, a, r1, ha, ma;
    for (i = 0; i < 60; i++) {
      a = i * 6 * Math.PI / 180; r1 = i % 5 ? 72 : 63;
      s += '<path d="M' + (100 + r1 * Math.sin(a)).toFixed(1) + ' ' + (100 - r1 * Math.cos(a)).toFixed(1) + 'L' + (100 + 77 * Math.sin(a)).toFixed(1) + ' ' + (100 - 77 * Math.cos(a)).toFixed(1) + '" stroke="#222" stroke-width="' + (i % 5 ? 1.1 : 3.2) + '"/>';
    }
    for (i = 1; i <= 12; i++) { a = i * 30 * Math.PI / 180; s += '<text x="' + (100 + 50 * Math.sin(a)).toFixed(1) + '" y="' + (100 - 50 * Math.cos(a) + 7).toFixed(1) + '" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="19" fill="#222" text-anchor="middle">' + i + '</text>'; }
    ha = ((h % 12) + m / 60) * 30; ma = m * 6;
    s += '<g transform="rotate(' + ha.toFixed(1) + ' 100 100)"><path d="M100 110V58" stroke="#111" stroke-width="7" stroke-linecap="round"/></g>' +
      '<g transform="rotate(' + ma.toFixed(1) + ' 100 100)"><path d="M100 114V32" stroke="#111" stroke-width="4" stroke-linecap="round"/></g><circle cx="100" cy="100" r="5" fill="#c0391b"/>' +
      '<text x="100" y="150" font-family="Barlow Condensed,sans-serif" font-weight="600" font-size="12" letter-spacing="2" fill="#666" text-anchor="middle">' + (h >= 12 ? 'PM' : 'AM') + '</text></svg>';
    return s;
  }
  /* a survey tape, in metres and centimetres, showing the stretch round v (metres) under a red line at v */
  function tape(v, note) {
    var s = '<svg viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="220" fill="#1f1a14"/>' +
      '<rect x="0" y="70" width="380" height="80" fill="#f5d33a" stroke="#8a7210" stroke-width="2"/>', c, x, c0 = Math.round(v * 100) - 30;
    for (c = c0; c <= c0 + 60; c++) {
      x = 190 + (c - v * 100) * 6;
      if (x < 0 || x > 380) continue;
      var big = c % 10 === 0, mid = c % 5 === 0;
      s += '<path d="M' + x.toFixed(1) + ' 70v' + (big ? 34 : mid ? 24 : 14) + '" stroke="#1a1a1a" stroke-width="' + (big ? 2.4 : 1.2) + '"/>';
      if (big) s += '<text x="' + x.toFixed(1) + '" y="128" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="' + (c % 100 === 0 ? 26 : 17) + '" fill="' + (c % 100 === 0 ? '#c0391b' : '#1a1a1a') + '" text-anchor="middle">' + (c % 100 === 0 ? (c / 100) + 'm' : (c % 100)) + '</text>' +
        (c % 100 ? '<text x="' + x.toFixed(1) + '" y="145" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="11" fill="#c0391b" text-anchor="middle">' + Math.floor(c / 100) + 'm</text>' : '');
    }
    s += '<path d="M190 52v118" stroke="#c0391b" stroke-width="3"/><path d="M182 52h16" stroke="#c0391b" stroke-width="3"/>' +
      '<text x="190" y="196" font-family="Barlow Condensed,sans-serif" font-weight="600" font-size="14" letter-spacing="2" fill="#e8dcc4" text-anchor="middle">' + (note || 'METRES · the big red number is the whole metre') + '</text></svg>';
    return s;
  }
  function lamp(bars) {
    var s = '<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="104" height="28" rx="4" fill="#111" stroke="#bbb" stroke-width="2"/><rect x="106" y="14" width="8" height="12" fill="#bbb"/>', i;
    for (i = 0; i < 5; i++) s += '<rect x="' + (8 + i * 20) + '" y="11" width="16" height="18" fill="' + (i < bars ? (bars <= 1 ? '#e0574a' : '#5fe08a') : '#333') + '"/>';
    return s + '</svg>';
  }

  /* ---------- the survey of 1975 ----------
     Coordinates in metres, east and north of a point in the Laundry; the drawing uses 10 units to the metre.
     TRUE is where things really are. Mostyn Teasdale drew the first climb of the Way Over on the wrong wall, which moves
     everything after it 6 m east, and he drew the Flatiron 40 m long where the notes said 40 feet, which moves
     everything after that 27.8 m north-west. */
  var TRUE = { 14: [1, -30], 15: [-1.5, -31], 16: [2.7, -26.8], 17: [3.5, -17.7], 18: [18.4, -35.9], 19: [-3.3, -27.3], 20: [9.1, -2.3], 21: [10.8, 7.3],
    22: [4.4, 0.9], 23: [-4.2, 9.5], 24: [-9.8, 3.9], mg: [-6.3, 11.6], rb: [0, 13.7], swE: [1.6, -1.9], neE: [17.9, 14.4], win: [-10.8, 3.2] };
  var OFF1 = [6, 1], OFF2 = [6 - 19.7, 1 + 19.7];
  function T(id) {
    var p = TRUE[id], o = [0, 0];
    if (/^(15|16|17|18|19|20|21|22|swE|neE)$/.test(String(id))) o = OFF1;
    else if (/^(23|24|mg|rb)$/.test(String(id))) o = OFF2;
    return [p[0] + o[0], p[1] + o[1]];
  }
  function X(p) { return (p[0] * 10).toFixed(1); }
  function Y(p) { return (-p[1] * 10).toFixed(1); }
  function pts(list) { return list.map(function (p) { return X(p) + ',' + Y(p); }).join(' '); }
  function pass(list, w, fill) {        /* a passage: walls drawn as a dark band round a paper-coloured middle */
    var d = 'M' + list.map(function (p) { return X(p) + ' ' + Y(p); }).join('L');
    return '<path d="' + d + '" stroke="#1f2a36" stroke-width="' + (w * 10 + 5) + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" stroke="' + (fill || '#fbf8ee') + '" stroke-width="' + (w * 10) + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function poly(list, fill) { return '<polygon points="' + pts(list) + '" fill="' + (fill || '#fbf8ee') + '" stroke="#1f2a36" stroke-width="2.6" stroke-linejoin="round"/>'; }
  function txt(p, s, fs, o) {
    o = o || {};
    return '<text x="' + X(p) + '" y="' + Y(p) + '" font-family="' + (o.hand ? 'Caveat,cursive' : 'EB Garamond,Georgia,serif') + '" font-size="' + fs + '" font-style="' + (o.it ? 'italic' : 'normal') + '" font-weight="' + (o.b ? 700 : 500) +
      '" fill="' + (o.col || '#1f2a36') + '" text-anchor="' + (o.a || 'middle') + '"' + (o.rot ? ' transform="rotate(' + o.rot + ' ' + X(p) + ' ' + Y(p) + ')"' : '') + '>' + s + '</text>';
  }
  function arrowAt(a, b, col) {             /* a small arrowhead half way from a to b, pointing to b */
    var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, ang = Math.atan2(-(b[1] - a[1]), b[0] - a[0]) * 180 / Math.PI;
    return '<path d="M-9 -6L4 0L-9 6" transform="translate(' + (mx * 10).toFixed(1) + ' ' + (-my * 10).toFixed(1) + ') rotate(' + ang.toFixed(1) + ')" fill="none" stroke="' + (col || '#2563a8') + '" stroke-width="3"/>';
  }
  function along(a, deg, m) { var r = deg * Math.PI / 180; return [a[0] + m * Math.sin(r), a[1] + m * Math.cos(r)]; }
  var STREAM = [[-3, 36], [-3, 20], [-3, 6], [-3, -9], [-1.5, -17], [-0.5, -24], [0.5, -30], [1, -34], [2, -38], [2.5, -42], [3, -46], [3, -51], [3, -55], [4, -61]];
  var LEGS16 = { 15: { to: 15, b: 225, m: 6.1, sl: '-15', name: 'the Airing Cupboard (the way you came)' }, 17: { to: 17, b: 5, m: 9.1, sl: '0', name: 'crawl' },
    18: { to: 18, b: 120, m: 18.3, sl: '+8', name: 'E passage' }, 19: { to: 19, b: 265, m: 7.0, sl: '-30', name: 'slope to the Tub' } };

  /* o = {box:[x0,y0,x1,y1] in metres, fix:{wash, flat}, dot:{x, y, dark}, legs: true (the four legs from station 16 can be clicked), extra: svg string} */
  function survey(o) {
    var b = o.box, w = (b[2] - b[0]) * 10, h = (b[3] - b[1]) * 10, fs = Math.max(11, w / 42), s, i, x, y;
    s = '<svg class="srv" viewBox="' + (b[0] * 10) + ' ' + (-b[3] * 10) + ' ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="' + (b[0] * 10 - 500) + '" y="' + (-b[3] * 10 - 500) + '" width="' + (w + 1000) + '" height="' + (h + 1000) + '" fill="#f6f2e6"/><g stroke="#9db8cf" stroke-width="1" opacity=".55">';
    for (x = Math.ceil(b[0] / 10) * 10; x <= b[2]; x += 10) s += '<path d="M' + x * 10 + ' ' + (-b[3] * 10) + 'V' + (-b[1] * 10) + '"/>';
    for (y = Math.ceil(b[1] / 10) * 10; y <= b[3]; y += 10) s += '<path d="M' + b[0] * 10 + ' ' + (-y * 10) + 'H' + b[2] * 10 + '"/>';
    s += '</g>';
    /* the lower level: the stream way */
    s += pass([[-3, 38], [-3, 7]], 3) + poly([[-11, 6], [-8, 8.5], [-1.5, 8.5], [-1, 4], [-1, -6], [-2.5, -9], [-8, -9], [-11.5, -5]]) +
      pass([[-3, -8.5], [-1.5, -17], [-0.5, -24], [0, -26]], 2.4) +
      poly([[-2.5, -26], [4.5, -26], [5, -30], [4.5, -34], [-2.5, -34], [-3, -30]]) + pass([[1, -34], [2, -38]], 2) +
      poly([[-1, -38], [5.5, -38], [6, -46], [-0.5, -46]]) + pass([[3, -46], [3, -51]], 1.4) +
      '<circle cx="30" cy="550" r="40" fill="#fbf8ee" stroke="#1f2a36" stroke-width="2.6"/>' + pass([[3, -59], [4, -61]], 1.4) +
      '<circle cx="40" cy="632" r="22" fill="#9cc3e4" stroke="#1f2a36" stroke-width="2.6"/>';
    /* the upper level: the Way Over, as Teasdale drew it (buff) */
    var UP = '#f1e3c2';
    s += pass([T(15), T(16)], 1.2, UP) + pass([T(16), T(17)], 1.0, UP) + pass([T(16), T(18)], 2.4, UP) + pass([T(16), T(19)], 1.4, UP) +
      '<circle cx="' + X(T(19)) + '" cy="' + Y(T(19)) + '" r="15" fill="#1f2a36"/>' +
      pass([T(17), T(20)], 2, UP) + pass([T(20), T(21)], 1.5, UP) + pass([T('swE'), T('neE')], 1.4, UP) +
      pass([T(22), T(23)], 1.2, UP) + pass([T(23), T('mg')], 0.6, UP) + pass([T(23), T('rb')], 0.8, UP) + pass([T(23), T(24)], 1.5, UP);
    var c24 = T(24), dr = [];
    for (i = 0; i < 9; i++) { var an = i * 40 * Math.PI / 180, rr = i % 2 ? 4.2 : 5; dr.push([c24[0] + rr * Math.sin(an), c24[1] + rr * Math.cos(an)]); }
    s += poly(dr, UP);
    [[-1.5, 1], [1.4, -1.2], [-0.6, -2.4]].forEach(function (d) { s += '<circle cx="' + X([c24[0] + d[0], c24[1] + d[1]]) + '" cy="' + Y([c24[0] + d[0], c24[1] + d[1]]) + '" r="5" fill="#1f2a36"/>'; });
    /* choke at the end of the E passage: boulders */
    var c18 = T(18);
    for (i = 0; i < 6; i++) s += '<circle cx="' + ((c18[0] + (i % 3) * 0.9 - 0.9) * 10).toFixed(1) + '" cy="' + (-(c18[1] + Math.floor(i / 3) * 0.9 - 0.4) * 10).toFixed(1) + '" r="4.5" fill="none" stroke="#1f2a36" stroke-width="2"/>';
    /* water */
    s += '<path d="M' + STREAM.map(function (p) { return X(p) + ' ' + Y(p); }).join('L') + '" stroke="#2563a8" stroke-width="3.2" fill="none"/>';
    for (i = 0; i < STREAM.length - 1; i += 2) s += arrowAt(STREAM[i], STREAM[i + 1]);
    s += '<path d="M' + X(T('swE')) + ' ' + Y(T('swE')) + 'L' + X([-1, -1.5]) + ' ' + Y([-1, -1.5]) + 'L' + X([-3, -1.3]) + ' ' + Y([-3, -1.3]) + '" stroke="#2563a8" stroke-width="2.4" fill="none" stroke-dasharray="6 6"/>';
    /* the Low Duck: the roof comes down to the water */
    s += '<path d="M' + X([-2.2, -23.4]) + ' ' + Y([-2.2, -23.4]) + 'L' + X([1.2, -24.4]) + ' ' + Y([1.2, -24.4]) + '" stroke="#1f2a36" stroke-width="3" stroke-dasharray="3 4"/>';
    /* the Window, in the west wall of the Laundry */
    s += '<path d="M' + X([-11.4, 2.2]) + ' ' + Y([-11.4, 2.2]) + 'q-8 10 0 20" stroke="#1f2a36" stroke-width="3" fill="none"/><path d="M' + X([-12.4, 3.2]) + ' ' + Y([-12.4, 3.2]) + 'l-14 0" stroke="#1f2a36" stroke-width="2"/>';
    /* stations */
    [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].forEach(function (id) {
      var p = id === 14 ? TRUE[14] : T(id);
      s += '<path d="M' + X(p) + ' ' + (Y(p) - 6) + 'l5 9h-10z" fill="#1f2a36"/>' + txt([p[0] + 0.9, p[1] + 0.6], String(id), fs * 0.62, { a: 'start', col: '#4a5866' });
    });
    /* names and notes */
    var F = fs;
    s += txt([-6, 0.6], 'THE LAUNDRY', F * 0.9, { b: 1 }) + txt([-6, -1.4], '(camp)', F * 0.7, { it: 1 }) +
      txt([-0.5, 31], 'to the entrance (420 m)', F * 0.7, { it: 1, a: 'start' }) +
      txt([-13, 6.8], 'Window', F * 0.75, { it: 1, a: 'end' }) + txt([-13, 4.8], '(not entered)', F * 0.6, { it: 1, a: 'end' }) + txt([-13, 1.4], '↑ 25', F * 0.8, { b: 1, a: 'end' }) +
      txt([2.3, -21.4], 'Low Duck', F * 0.72, { it: 1, a: 'start' }) + txt([1, -32.4], 'Washhouse', F * 0.8, { b: 1 }) +
      txt([2.5, -42.3], 'Scullery', F * 0.75, { b: 1 }) + txt([4.6, -50], 'Letterbox', F * 0.65, { it: 1, a: 'start' }) + txt([3, -55.3], 'Copper', F * 0.7, { b: 1 }) +
      txt([6.6, -63.4], 'Plughole (sump)', F * 0.68, { it: 1, a: 'start' }) +
      txt([5.6, -33.2], 'climb 2.4 (TL) ↑ WAY OVER', F * 0.62, { a: 'start', b: 1 }) +
      txt([5.6, -35.2], 'TL: rope fixed 1979 — CHOKES. No way on. W.C.C.', F * 0.62, { a: 'start', hand: 1, col: '#3348a0' }) +
      txt([T(16)[0] + 1.6, T(16)[1] - 1.2], 'Wringer', F * 0.7, { b: 1, a: 'start' }) +
      txt([T(18)[0], T(18)[1] - 2.2], 'choke (draughts)', F * 0.6, { it: 1 }) + txt([T(19)[0], T(19)[1] + 2.4], 'the Tub (pot 6 m)', F * 0.6, { it: 1 }) +
      txt([(T(15)[0] + T(16)[0]) / 2 + 1.3, (T(15)[1] + T(16)[1]) / 2 - 1], 'Airing Cupboard', F * 0.58, { it: 1, a: 'start' }) +
      txt([(T(21)[0] + T('neE')[0]) / 2 + 1.5, (T(21)[1] + T('neE')[1]) / 2 - 1.5], 'Clothes Line (rift)', F * 0.68, { b: 1, a: 'start' }) +
      txt([(T(21)[0] + T('neE')[0]) / 2 + 1.5, (T(21)[1] + T('neE')[1]) / 2 - 3.3], 'stream 6 m below: flow not seen', F * 0.56, { it: 1, a: 'start' }) +
      txt([T('swE')[0] + 1.2, T('swE')[1] - 2.4], 'waterfall inlet: source?', F * 0.56, { it: 1, a: 'start', col: '#2563a8' }) +
      txt([T(22)[0] - 1.2, T(22)[1] + 1.4], 'Hamper', F * 0.62, { it: 1, a: 'end' }) +
      txt([(T(22)[0] + T(23)[0]) / 2 + 1.4, (T(22)[1] + T(23)[1]) / 2 + 1.0], 'Flatiron 40', F * 0.7, { b: 1, a: 'start' }) +
      txt([T('mg')[0] - 0.8, T('mg')[1] + 1.2], 'Mangle', F * 0.58, { it: 1, a: 'end' }) +
      txt([T(24)[0], T(24)[1] + 6.4], 'Drying Room', F * 0.75, { b: 1 }) + txt([T(24)[0], T(24)[1] - 6.6], 'holes in floor', F * 0.56, { it: 1 });
    /* the four legs from the Wringer, to be clicked */
    if (o.legs) {
      [15, 17, 18, 19].forEach(function (k) {
        var a = T(16), e = T(k);
        s += '<g class="leg" data-leg="' + k + '"><path d="M' + X(a) + ' ' + Y(a) + 'L' + X(e) + ' ' + Y(e) + '" stroke="rgba(0,0,0,.001)" stroke-width="28" fill="none"/>' +
          '<path d="M' + X(a) + ' ' + Y(a) + 'L' + X(e) + ' ' + Y(e) + '" stroke="#1f2a36" stroke-width="2.2" stroke-dasharray="7 5" fill="none"/></g>';
      });
    }
    /* red pencil */
    if (o.fix && o.fix.wash) s += txt([-4.5, -31.6], 'TR! (Mavis)', F * 0.8, { hand: 1, col: '#c0391b', a: 'end' }) + '<path d="M' + X([-4.2, -31]) + ' ' + Y([-4.2, -31]) + 'L' + X([-2.6, -31]) + ' ' + Y([-2.6, -31]) + '" stroke="#c0391b" stroke-width="3"/>';
    if (o.fix && o.fix.flat) {
      var t22 = TRUE[22], t23 = TRUE[23], t24 = TRUE[24], rd = [];
      for (i = 0; i < 9; i++) { var an2 = i * 40 * Math.PI / 180, r2 = i % 2 ? 4.2 : 5; rd.push([t24[0] + r2 * Math.sin(an2), t24[1] + r2 * Math.cos(an2)]); }
      s += '<polygon points="' + pts(rd) + '" fill="rgba(192,57,27,.08)" stroke="#c0391b" stroke-width="2.6" stroke-dasharray="8 5"/>' +
        '<path d="M' + X(t22) + ' ' + Y(t22) + 'L' + X(t23) + ' ' + Y(t23) + 'L' + X(t24) + ' ' + Y(t24) + '" stroke="#c0391b" stroke-width="3" fill="none" stroke-dasharray="8 5"/>' +
        txt([t24[0] + 5.6, t24[1] + 5.6], 'Drying Room, really here', F * 0.72, { hand: 1, col: '#c0391b', a: 'start' }) +
        txt([(t22[0] + t23[0]) / 2 + 1.2, (t22[1] + t23[1]) / 2 - 1.2], o.fix.flat, F * 0.72, { hand: 1, col: '#c0391b', a: 'start' });
    }
    if (o.dot) s += '<circle cx="' + X([o.dot.x, o.dot.y]) + '" cy="' + Y([o.dot.x, o.dot.y]) + '" r="' + (o.dot.dark ? 7 : 9) + '" fill="' + (o.dot.dark ? '#444' : '#ffcf3a') + '" stroke="#7a4a00" stroke-width="2.5" class="adot"/>';
    /* north arrow and scale bar, in the top right and bottom left of the view */
    var nx = b[2] - (b[2] - b[0]) * 0.06, ny = b[3] - (b[3] - b[1]) * 0.08;
    s += '<g transform="translate(' + (nx * 10).toFixed(1) + ' ' + (-ny * 10).toFixed(1) + ') scale(' + (w / 520).toFixed(2) + ')"><path d="M0 -26l10 30l-10 -7l-10 7z" fill="#1f2a36"/><text x="0" y="-32" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="20" text-anchor="middle" fill="#1f2a36">N</text></g>';
    var sx = b[0] + (b[2] - b[0]) * 0.05, sy = b[1] + (b[3] - b[1]) * 0.05;
    s += '<path d="M' + X([sx, sy]) + ' ' + Y([sx, sy]) + 'h100" stroke="#1f2a36" stroke-width="4"/><path d="M' + X([sx, sy]) + ' ' + (Y([sx, sy]) - 6) + 'v12M' + (sx * 10 + 50).toFixed(1) + ' ' + (Y([sx, sy]) - 4) + 'v8M' + (sx * 10 + 100).toFixed(1) + ' ' + (Y([sx, sy]) - 6) + 'v12" stroke="#1f2a36" stroke-width="2.4"/>' +
      txt([sx + 5, sy + 0.9], '10 metres', fs * 0.62, {});
    return s + (o.extra || '') + '</svg>';
  }

  var LEGEND = '<h4>Tallow Hole · the Laundry and the Way Over</h4>' +
    '<p><b>Published survey, Wolfstone Caving Club Journal No. 7, 1975.</b> Surveyed by M. Rowcliffe and M. Nutbrown, April 1968. Drawn by M. Teasdale from the 1968 notes. <b>Plan: north is at the top.</b> Lengths in metres, converted from the notes in feet (1 ft = 0.3048 m). Bearings are compass bearings in degrees, from north, clockwise.</p>' +
    '<p><b>A leg</b> joins two stations (numbered triangles). Each leg has a length (measured with a tape), a bearing (compass) and a slope (clinometer: + up, &minus; down).</p>' +
    '<p><b>TL and TR: true left and true right.</b> Face DOWNSTREAM, the way the water goes. The true left is then on your left, and the true right on your right. They do not change when you turn round: walking upstream, the true left is on your RIGHT.</p>' +
    '<p>Blue line: stream, with arrows the way the water flows. Dotted line across the passage: a duck (the roof comes down nearly to the water). Blue circle: a sump (the water reaches the roof). Small circles: a choke of boulders. Buff: the upper level (the Way Over), above the stream way.</p>';
  function legend() { ER.read({ html: LEGEND, cls: 'legend', clue: { id: 'legend', title: 'The survey: its key', kind: 'The 1975 survey' } }); }

  var CLUB = '<h4>Wolfstone Caving Club · Underground rules</h4>' +
    '<p>1. FLOODS. Water in a cave rises an hour or more after the rain starts on the hill, and goes on rising after the rain stops. In a flood go UP, not THROUGH. Never go into a duck while the water is rising: a duck can become a sump while you are in it.</p>' +
    '<p>2. CALL TIMES. Call the hut at the times you agreed. Underground nobody can feel time passing: watch the watch. (In 1962 the French scientist Michel Siffre lived for two months in a cave with no clock. When his team told him it was over, he thought it was still the twentieth of August, almost a month too early.)</p>' +
    '<p>3. LADDERS. The ladder must reach from the anchor to the floor: the drop, PLUS the distance from the anchor back to the edge. Take the shortest ladder that is long enough: ladders are heavy, and a heavy ladder is hard to pull up a thin line.</p>' +
    '<p>4. Anyone on a ladder has a lifeline, held by somebody at the bottom.</p>';
  function club() { ER.read({ html: CLUB, cls: 'club', clue: { id: 'club', title: 'The club card: underground rules', kind: 'On the radio box' } }); }

  var KIT = '<h4>What is in your pack</h4>' +
    '<p><b>Compass.</b> Hold it flat in front of you. The card turns by itself; the letter under the black mark at the top is the way you are facing.</p>' +
    '<p><b>Survey tape</b>, 30 metres. Tie the end to something and pay it out as you go.</p>' +
    '<p><b>Two sachets of fluorescein dye</b>, for the water tracing you were going to do at the Plughole. A few grams turn a whole stream bright green. Pour it in at one place and somebody watches for green at another: then you know where the water goes, and how long it takes.</p>' +
    '<p><b>A lighter</b>, for draughts: hold the flame still at the mouth of a passage. If it leans, the air is moving, and moving air means the cave goes on somewhere.</p>' +
    '<p><b>Your main lamp</b> (its battery shows in bars) and a little spare lamp. The spare battery is in the camp bag, at the Laundry.</p>' +
    '<p><b>The field telephone</b>: a handset on a reel of thin wire. The wire goes back to the Laundry, so your partner hears you. Press the button to make the handset at the other end buzz.</p>';
  function kit() { ER.read({ html: KIT, cls: 'kit', clue: { id: 'kit', title: 'What is in your pack', kind: 'Your kit' } }); }

  /* ---------- Mavis's notebook: the 1968 survey book ---------- */
  var SKETCH = {
    washhouse: { head: 'WASHHOUSE', look: 'drawn looking DOWNSTREAM (from the ledge)', top: 'on to the Scullery', bottom: 'LOW DUCK (from the Laundry) · high hole above it', left: ['big flat boulder', 'mud bank: Mud Chute (chokes)'], right: ['ledge 8 ft', 'our cairn · WAY OVER!'], flowUp: true, ledge: 'right', arch: 'bottom', hole: true },
    scullery: { head: 'SCULLERY', look: '', top: 'from the Washhouse (walking)', bottom: 'to the Letterbox', left: ['boulders, big ones'], right: ['inlet trickle'], flowUp: false, ledge: null, arch: null },
    copper: { head: 'THE COPPER', look: '', top: 'LETTERBOX (low arch, from the Scullery)', bottom: 'on to the Plughole', left: ['ledge 10 ft', 'cairn · goes nowhere'], right: ['boulder, with a stal', 'as tall as Murray'], flowUp: false, ledge: 'left', arch: 'top', stal: true },
    plughole: { head: 'PLUGHOLE', look: 'drawn looking DOWNSTREAM', top: 'SUMP: deep, blue, the end', bottom: 'from the Copper', left: ['sand bank'], right: ['rock wall'], flowUp: true, ledge: null, arch: null, sump: true }
  };
  function sketch(k) {
    var o = SKETCH[k], s = '<svg viewBox="-90 0 640 300" xmlns="http://www.w3.org/2000/svg">', ink = '#34344a';
    function T2(x, y, t, fs, an) { return '<text x="' + x + '" y="' + y + '" font-family="Caveat,cursive" font-weight="700" font-size="' + (fs || 21) + '" fill="' + ink + '" text-anchor="' + (an || 'middle') + '">' + t + '</text>'; }
    s += '<path d="M120 40q-30 110 0 220h220q30 -110 0 -220z" fill="none" stroke="' + ink + '" stroke-width="2.6"/>';
    s += '<path d="M230 26q-14 60 6 124t-6 124" stroke="#4d73b8" stroke-width="3" fill="none"/>';
    for (var i = 0; i < 3; i++) { var yy = 80 + i * 70; s += o.flowUp ? '<path d="M222 ' + (yy + 8) + 'l10 -12l10 12" stroke="#4d73b8" stroke-width="2.5" fill="none"/>' : '<path d="M222 ' + (yy - 8) + 'l10 12l10 -12" stroke="#4d73b8" stroke-width="2.5" fill="none"/>'; }
    s += T2(230, 22, o.top, 19) + T2(230, 292, o.bottom, 19);
    if (o.arch === 'top') s += '<path d="M196 44q34 -26 68 0" stroke="' + ink + '" stroke-width="5" fill="none"/>';
    if (o.arch === 'bottom') s += '<path d="M196 256q34 26 68 0" stroke="' + ink + '" stroke-width="5" fill="none"/>';
    if (o.hole) s += '<ellipse cx="230" cy="236" rx="16" ry="9" fill="' + ink + '"/>';
    if (o.sump) s += '<ellipse cx="230" cy="62" rx="60" ry="22" fill="#9cc3e4" stroke="' + ink + '" stroke-width="2"/>';
    if (o.ledge) { var lx = o.ledge === 'right' ? 330 : 130; s += '<path d="M' + (lx - 12) + ' 120v70M' + (lx + 2) + ' 120v70" stroke="' + ink + '" stroke-width="3"/><path d="M' + (lx - 10) + ' 140l5 -9l5 9zM' + (lx - 11) + ' 150h12" stroke="' + ink + '" stroke-width="2" fill="' + ink + '"/>'; }
    if (k === 'washhouse') s += '<rect x="148" y="150" width="56" height="34" fill="none" stroke="' + ink + '" stroke-width="2.4"/><path d="M140 200q20 30 40 40" stroke="' + ink + '" stroke-width="2" stroke-dasharray="4 4" fill="none"/>';
    if (k === 'copper') s += '<rect x="262" y="140" width="50" height="34" fill="none" stroke="' + ink + '" stroke-width="2.4"/><path d="M287 140v-40l-5 0l5 -10l5 10z" stroke="' + ink + '" stroke-width="2" fill="' + ink + '"/>';
    if (k === 'scullery') s += '<circle cx="165" cy="120" r="12" fill="none" stroke="' + ink + '" stroke-width="2"/><circle cx="160" cy="170" r="16" fill="none" stroke="' + ink + '" stroke-width="2"/><path d="M350 150q-40 0 -112 6" stroke="#4d73b8" stroke-width="2" stroke-dasharray="5 5" fill="none"/>';
    s += T2(105, 120, o.left[0], 19, 'end') + (o.left[1] ? T2(105, 144, o.left[1], 19, 'end') : '');
    s += T2(355, 120, o.right[0], 19, 'start') + (o.right[1] ? T2(355, 144, o.right[1], 19, 'start') : '');
    return s + '</svg>';
  }
  var NB = {
    cover: '<h4>Survey book No. 3 &middot; M. Rowcliffe &middot; Wolfstone C.C.</h4><p>Tallow Hole, April 1968. M. Rowcliffe and M. Nutbrown.</p>' +
      '<p>All lengths in FEET. Bearings by compass, in degrees. Slopes by clino, in degrees: + up, &minus; down.</p>' +
      '<p>My sketches are drawn looking UPSTREAM, unless I say so.</p><p>TL / TR = true left, true right.</p>' +
      '<p>Our arrows point OUT: towards the Laundry and the way home.</p>' +
      '<p>The names are all from Mother&rsquo;s laundry, because this is a wet, noisy, steamy sort of cave, and so was the laundry.</p>',
    sat: '<h4>Saturday 13 April 1968</h4><p>Camp at the Laundry: dry in any flood. The flood marks on the wall stop 6 ft below our camp ledge.</p>' +
      '<p>Downstream: the Low Duck (1 ft of air today: in a flood it SUMPS), the Washhouse, the Scullery, the Letterbox (a low arch), the Copper, the Plughole. The Plughole is a sump, and it is the end, for us.</p>' +
      '<p>High in the W wall of the Laundry there is a black hole we cannot reach. Murray calls it the Window.</p>',
    sketches: '<h4>Sketches</h4>',
    sun: '<h4>Sunday 14 April 1968</h4><p>Murray at the Laundry with the stove. I went down to the Washhouse to finish my sketch. Two o&rsquo;clock: the water came up brown and fast, and the Low Duck sumped while I watched.</p>' +
      '<p>Climbed the TR wall, 8 ft, to a ledge. Built a cairn. A way on! Crawl 20 ft NE (the Airing Cupboard) to a junction: the Wringer.</p>' +
      '<p>Wringer: the E passage is big and it draughts, but it chokes after 60 ft. Wasted an hour on it. The N crawl draughts too, and it GOES. I am calling it the Way Over.</p>',
    sun2: '<h4>Sunday, later</h4><p>Clothes Line: a rift, with the stream far below. I cannot see which way it goes. Left a line along the ledge.</p>' +
      '<p>Hamper: from where the crawl comes in, 30 ft along the ledge DOWNSTREAM, the 2nd hole on the TR. (I went the wrong way first.)</p>' +
      '<p>Flatiron: flat out, NW, <span class="stain">??</span> ft to a T. LEFT at the T: up a sand slope into a big dry chamber, the Drying Room. RIGHT: low and wet, back towards the Clothes Line. Straight on: see Monday.</p>',
    sun3: '<h4>Sunday night</h4><p>Drying Room: holes in the floor. Put my lamp out to save it, and sat in the dark. After a while, a glow coming up one of the holes: Murray&rsquo;s stove! Scratched an arrow by it.</p>' +
      '<p>Shouted down, and Murray heard. It is the Window, about 25 ft up the W wall of the Laundry. Let my string down (always carry string), Murray tied on the 30 ft ladder, and I belayed it round a thread on the UPSTREAM side of the Window. Down at 9 p.m., cold and cross and very pleased.</p>',
    mon: '<h4>Monday 15 April 1968</h4><p>Surveyed the Way Over, Washhouse to Window, both of us. Murray went straight on at the T and got stuck in the Mangle for twenty minutes, and said things. The Mangle does not go.</p>' +
      '<p>Murray hammered a peg into the DOWNSTREAM side of the Window &ldquo;to be safe&rdquo;. I did not like the sound it made. We used the thread.</p>',
    legs: '<h4>Legs, Way Over (feet)</h4><table><tr><th>from&ndash;to</th><th>feet</th><th>bearing</th><th>slope</th></tr>' +
      '<tr><td>14&ndash;15</td><td>8</td><td>climb</td><td>up</td></tr><tr><td>15&ndash;16</td><td>20</td><td>045</td><td>+15</td></tr>' +
      '<tr><td>16&ndash;17</td><td>30</td><td>005</td><td>0</td></tr><tr><td>16&ndash;18</td><td>60</td><td>120</td><td>+8</td></tr>' +
      '<tr><td>16&ndash;19</td><td>23</td><td>265</td><td>&minus;30</td></tr><tr><td>17&ndash;20</td><td>54</td><td>020</td><td>+20</td></tr>' +
      '<tr><td>20&ndash;21</td><td>32</td><td>010</td><td>+15</td></tr><tr><td>21&ndash;22</td><td>30</td><td>225</td><td>0</td></tr>' +
      '<tr><td>22&ndash;23</td><td><span class="stain">??</span></td><td>315</td><td>0</td></tr><tr><td>23&ndash;24</td><td>28</td><td>225</td><td>+25</td></tr></table>' +
      '<p>(The corner of these pages spent fifty-seven years in a damp box. &mdash; R.W.)</p>'
  };
  /* the photocopy is in order: every page can be read in every room */
  var ORDER = ['cover', 'sat', 'sketches', 'sun', 'sun2', 'sun3', 'mon', 'legs'];
  function sketchesHtml(pick) {
    return ['washhouse', 'scullery', 'copper', 'plughole'].map(function (k) {
      var o = SKETCH[k];
      return '<div class="sk" data-sk="' + k + '"><p><b>' + o.head + '</b>' + (o.look ? ' &mdash; ' + o.look : '') + '</p>' + sketch(k) + (pick ? '<button type="button" class="btn skb" data-sk="' + k + '">My partner is here</button>' : '') + '</div>';
    }).join('');
  }
  function page(k) { return k === 'sketches' ? NB.sketches + sketchesHtml(false) : NB[k]; }
  function notebookAll() { return ORDER.map(page).join('<hr>'); }
  function notebook(start) {
    var i = Math.max(0, ORDER.indexOf(start || 'cover')), box = ER.el('div', 'doc nb68');
    function show() {
      box.innerHTML = ER.gloss(page(ORDER[i])) + '<p style="margin-top:8px;text-align:right;font-family:Barlow Condensed,sans-serif;font-size:15px;letter-spacing:.1em">' +
        '<button type="button" class="btn nbp">&larr; page</button> ' + (i + 1) + ' / ' + ORDER.length + ' <button type="button" class="btn nbn">page &rarr;</button></p>';
      box.querySelector('.nbp').disabled = !i; box.querySelector('.nbn').disabled = i === ORDER.length - 1;
      box.querySelector('.nbp').onclick = function () { if (i) { i--; ER.sfx.paper(); show(); } };
      box.querySelector('.nbn').onclick = function () { if (i < ORDER.length - 1) { i++; ER.sfx.paper(); show(); } };
    }
    show();
    ER.sfx.paper();
    ER.open('ov-read', box, function () { ER.addClue('nb68', 'Mavis&rsquo;s notebook, 1968 (photocopy)', notebookAll(), 'nb68', 'Survey book No. 3'); });
  }

  /* the explorer's pack: the telephone and the instruments. o = {face, time: [h, m], bars, ring (fn), onPhone (fn), acts: [...] more buttons} */
  var PACKPIC = '<svg viewBox="0 0 380 300" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="300" fill="#1c1611"/><path d="M90 280q-20 -170 30 -200h140q50 30 30 200z" fill="#a8551c" stroke="#5a2a0c" stroke-width="5"/>' +
    '<path d="M120 90q70 -40 140 0" stroke="#5a2a0c" stroke-width="10" fill="none"/><rect x="130" y="130" width="120" height="70" rx="8" fill="#2a2a26"/><rect x="150" y="146" width="44" height="38" rx="4" fill="#4a4a40"/><circle cx="222" cy="165" r="14" fill="#c0391b"/>' +
    '<circle cx="300" cy="220" r="40" fill="#d8c25a" stroke="#6a5a1a" stroke-width="5"/><circle cx="300" cy="220" r="12" fill="#3a3220"/></svg>';
  function pack(o) {
    var api = look({
      kicker: 'On your back, most of the time', title: 'Your pack', pic: PACKPIC, lock: false,
      text: '<p>The telephone handset, the reel of wire, your compass, your watch, the survey tape, the dye, a lighter, and the spare lamp. Everything you own down here, in one orange bag.</p>',
      acts: [
        { id: 'p-phone', label: 'Answer the telephone', fn: function (a) { a.msg('It is your partner, at the Laundry. Talk to them: they can hear you, and you can hear them.'); if (o.onPhone) o.onPhone(); } },
        { id: 'p-ring', label: 'Buzz your partner', fn: function (a) { if (o.ring) o.ring(); a.msg('You press the button. At the Laundry, the other handset buzzes.'); } },
        { id: 'p-compass', label: 'Compass', fn: function (a) { a.pic(compass(o.face)); a.msg('You hold the compass flat in front of you, facing the way you are facing.'); ER.addWord('compass', 'a tool whose needle always points north'); } },
        { id: 'p-watch', label: 'Watch', fn: function (a) { a.pic(watch(o.time[0], o.time[1])); a.msg('Your watch. Down here, the only clock there is.'); } },
        { id: 'p-lamp', label: 'Lamp', fn: function (a) { a.pic('<svg viewBox="0 0 380 300" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="300" fill="#1c1611"/><g transform="translate(70 110) scale(2)">' + lamp(o.bars).replace(/^<svg[^>]*>|<\/svg>$/g, '') + '</g></svg>'); a.msg('The battery of your main lamp. Each bar is about an hour.'); } },
        { id: 'p-kit', label: 'Kit card', fn: function () { ER.close(); kit(); } }
      ].concat(o.acts || [])
    });
    return api;
  }

  function mins() { var s = ER.state(); return Math.max(1, Math.round(((s.fin ? s.fin.secs : s.secs) || 0) / 60)); }

  var KNOW = [
    'The banks of a stream are named looking downstream: the true left is on your left when you face the way the water goes, whichever way you are walking.',
    'A cave survey is made of legs from station to station. Each leg has a length (tape), a bearing (compass) and a slope (clinometer), and the plan is drawn with north at the top.',
    'One foot is 0.3048 metres, so 40 feet is about 12.2 metres. Old notes in feet must be converted before they are drawn in metres.',
    'Cave water rises some time after rain falls on the hill, and a duck can close completely: in a flood, go up, not through.',
    'A draught shows that a cave goes on somewhere, but a choke of boulders can draught too.',
    'Dye such as fluorescein shows where water goes: pour it in at one place, watch for green at another, and the time between tells you how fast the water travels.',
    'Underground nobody can feel time passing, so cavers keep to their call times by the watch; a radio such as the HeyPhone talks to the surface through the rock.'
  ];

  /* the card at the end: time, hints, the notebook, what you now know, a task */
  function ending(o) {
    var st = ER.state(), m = mins(), hn = ER.hintsUsed(), el = ER.$('#done');
    el.innerHTML = '<h3><small>' + o.kicker + '</small>' + o.head + '</h3><p>Time: ' + m + (m === 1 ? ' minute' : ' minutes') + '.</p><p>' + (hn ? 'Hints asked for: ' + hn + '.' : 'Hints asked for: none at all.') + '</p>' +
      '<p>In your notebook: ' + st.clues.length + (st.clues.length === 1 ? ' thing' : ' things') + ' and ' + Object.keys(st.words).length + ' words.</p><p>' + o.other + '</p>' +
      '<h4>What you now know</h4><ul>' + KNOW.map(function (k) { return '<li>' + k + '</li>'; }).join('') + '</ul>' +
      '<div class="row"><button type="button" class="btn" id="b-task">' + o.taskLabel + '</button><button type="button" class="btn" id="b-book">Notebook</button><button type="button" class="btn" id="b-lobby">Back to the stories</button></div>' +
      '<small>Meet Me Halfway &middot; <button type="button" id="b-reset">play this part again from the start</button></small>';
    ER.glossIn(el, 'li');
    el.classList.add('on');
    ER.$('#b-book').addEventListener('click', ER.notebook);
    ER.$('#b-lobby').addEventListener('click', function () { ER.leave('../index.html'); });
    ER.$('#b-reset').addEventListener('click', function () {
      var b = ER.$('#b-reset');
      if (b.getAttribute('data-sure')) { ER.resetStory(); location.href = '../index.html'; return; }
      b.setAttribute('data-sure', '1'); b.textContent = 'this empties your notebook. click again to do it';
    });
    ER.$('#b-task').addEventListener('click', function () {
      var saved = ER.flag('task') || {}, box = ER.el('div', 'rp');
      box.innerHTML = '<h4>' + o.taskKicker + '</h4><h3>' + o.taskHead + '</h3>' + o.taskText +
        '<textarea id="r1"></textarea><div class="count"></div><label for="r2">Written by</label><input type="text" id="r2" maxlength="60">' +
        '<div class="foot"><span>Nobody marks this. It is saved in this browser as you write.</span><button type="button" class="btn" id="r-print">Print</button><button type="button" class="btn" id="r-done">Done</button></div>';
      ER.glossIn(box, '.rp > p');
      box.querySelector('#r1').value = saved.r1 || ''; box.querySelector('#r2').value = saved.r2 || '';
      function keep() {
        var v = { r1: box.querySelector('#r1').value, r2: box.querySelector('#r2').value }, n = (v.r1.match(/[A-Za-z’']+/g) || []).length;
        box.querySelector('.count').textContent = n + (n === 1 ? ' word' : ' words');
        ER.flag('task', v);
      }
      box.addEventListener('input', keep);
      box.addEventListener('keydown', function (e) { e.stopPropagation(); });
      box.querySelector('#r-print').addEventListener('click', function () { keep(); window.print(); });
      box.querySelector('#r-done').addEventListener('click', ER.close);
      ER.open('ov-report', box); keep();
    });
  }

  return { card: card, thing: thing, look: look, says: says, phone: phone, set: set, when: when, watchKey: watchKey, linked: linked, sfx: sfx,
    compass: compass, watch: watch, tape: tape, lamp: lamp, survey: survey, T: T, TRUE: TRUE, LEGS16: LEGS16, along: along, legend: legend, LEGEND: LEGEND,
    club: club, CLUB: CLUB, kit: kit, KIT: KIT, notebook: notebook, NB: NB, sketch: sketch, sketchesHtml: sketchesHtml, notebookAll: notebookAll,
    mins: mins, KNOW: KNOW, ending: ending, pack: pack };
})();
