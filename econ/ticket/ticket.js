/* The Second Night - what every room of the story shares: a few sounds, small helpers, the people of Ambermoor
   (standing in the scene, and as busts for the interviews) and the number drum that most of the locks are set with.
   Loaded after engine.js. Nothing in here knows an answer. */
window.TIX = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so that the sound button switches them) ---------- */
  X.sfx = {
    drum: function () { B({ dur: 0.025, f: 2600, q: 5, peak: 0.1 }); T({ f: 420, dur: 0.04, peak: 0.05 }); },
    stamp: function () { T({ f: 150, f2: 70, dur: 0.16, peak: 0.4 }); B({ type: 'lowpass', f: 800, dur: 0.06, peak: 0.25 }); },
    chalk: function () { B({ type: 'highpass', f: 4200, dur: 0.12, peak: 0.06, a: 0.02 }); B({ type: 'highpass', f: 3800, dur: 0.09, peak: 0.05, when: 0.14 }); },
    magnet: function () { T({ f: 900, f2: 300, dur: 0.06, peak: 0.12 }); B({ dur: 0.03, f: 1500, q: 2, peak: 0.12 }); },
    print: function () { var i; for (i = 0; i < 6; i++) B({ dur: 0.04, f: 1800 + (i % 2) * 400, q: 3, peak: 0.07, when: i * 0.07 }); },
    chirp: function () { T({ f: 3200, f2: 4200, dur: 0.07, peak: 0.04 }); T({ f: 3600, f2: 4600, dur: 0.06, peak: 0.035, when: 0.11 }); },
    rattle: function () { var i; for (i = 0; i < 9; i++) B({ dur: 0.03, f: 1200 + (i % 3) * 500, q: 4, peak: 0.08, when: i * 0.09 }); },
    pluck: function () { T({ type: 'triangle', f: 196, dur: 0.9, peak: 0.12 }); T({ type: 'triangle', f: 247, dur: 0.8, peak: 0.08, when: 0.06 }); }
  };
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };

  /* ---------- small helpers ---------- */
  X.thing = function (sel, word, line, busy, after) {
    ER.$$(sel).forEach(function (n) {
      n.addEventListener('click', function (e) {
        if (busy && busy()) return;
        if (word) ER.wordAt(e.clientX, e.clientY, word);
        if (line) ER.say(typeof line === 'function' ? line() : line);
        if (after) after();
      });
    });
  };
  X.mine = function (id, title, html, quiet) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'mine', 'Your notes', quiet); };
  X.terms = function (list) {
    var G = window.GLOSS || [];
    list.forEach(function (w) { for (var i = 0; i < G.length; i++) if (G[i][0] === w) { ER.addWord(G[i][0], G[i][1]); break; } });
  };
  X.minutesPlayed = function () {
    var st = ER.state();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((Date.now() - (st.t0 || Date.now())) / 60000));
  };
  X.pounds = function (n) { return '£' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
  /* a little state object kept in one flag: told.x = 1 once something has been heard or read */
  X.told = function (key) {          /* read lazily: a room makes this before ER.init has loaded the saved game */
    var t = null;
    function get() { if (!t) t = ER.flag(key) || {}; return t; }
    return { has: function (k) { return !!get()[k]; }, set: function (k) { var o = get(); if (o[k]) return false; o[k] = 1; ER.flag(key, o); return true; } };
  };

  /* ---------- the number drum: a row of wheels, one for each figure ----------
     node: an empty element. o = {digits, sep (commas), before, after, val, change(v), lock()}.
     Click above or below a figure, or turn the mouse wheel over it. */
  X.drum = function (node, o) {
    var n = o.digits || 3, dig = [], i, v = Math.max(0, Math.round(o.val || 0)), s = '';
    for (i = n - 1; i >= 0; i--) { dig[i] = v % 10; v = Math.floor(v / 10); }
    node.classList.add('dr');
    if (o.before) s += '<span class="dr-fix">' + o.before + '</span>';
    for (i = 0; i < n; i++) {
      var left = n - i;
      if (i && o.sep && left % 3 === 0) s += '<span class="dr-fix dr-pt">,</span>';
      s += '<span class="dr-w" data-i="' + i + '"><button type="button" class="dr-up" aria-label="up">&#9650;</button><b></b><button type="button" class="dr-dn" aria-label="down">&#9660;</button></span>';
    }
    if (o.after) s += '<span class="dr-fix">' + o.after + '</span>';
    node.innerHTML = s;
    function val() { var x = 0; for (var j = 0; j < n; j++) x = x * 10 + dig[j]; return x; }
    function paint() { ER.$$('.dr-w', node).forEach(function (w) { w.querySelector('b').textContent = dig[+w.getAttribute('data-i')]; }); }
    function turn(j, d) {
      if (o.lock && o.lock()) return;
      dig[j] = (dig[j] + d + 10) % 10; paint(); X.sfx.drum(); if (o.change) o.change(val());
    }
    ER.$$('.dr-w', node).forEach(function (w) {
      var j = +w.getAttribute('data-i');
      w.querySelector('.dr-up').addEventListener('click', function (e) { e.stopPropagation(); turn(j, 1); });
      w.querySelector('.dr-dn').addEventListener('click', function (e) { e.stopPropagation(); turn(j, -1); });
      w.addEventListener('wheel', function (e) { e.preventDefault(); turn(j, e.deltaY < 0 ? 1 : -1); }, { passive: false });
    });
    paint();
    return {
      get: val, node: node,
      set: function (x) { x = Math.max(0, Math.round(x)); for (var j = n - 1; j >= 0; j--) { dig[j] = x % 10; x = Math.floor(x / 10); } paint(); }
    };
  };

  /* ---------- people, standing: feet at 0 0, about 300 high ---------- */
  var HAIR = {
    short: 'M-24 -276q2 -29 24 -29t24 29q-10 -13 -24 -13t-24 13z',
    bob: 'M-25 -276q2 -30 25 -30t25 30q-10 -12 -25 -12t-25 12zM-25 -282q-7 26 -2 42h10q-4 -22 -1 -34zM25 -282q7 26 2 42h-10q4 -22 1 -34z',
    bun: 'M-24 -276q2 -29 24 -29t24 29q-10 -13 -24 -13t-24 13zM-11 -308a11 11 0 1 1 22 0a11 11 0 1 1 -22 0z',
    plait: 'M-24 -276q2 -29 24 -29t24 29q-10 -13 -24 -13t-24 13zM18 -290q14 10 12 50q-2 20 4 40l-8 2q-8 -24 -4 -46q2 -22 -10 -38z',
    curly: 'M-27 -280a9 9 0 1 1 9 -9a11 11 0 1 1 18 -7a11 11 0 1 1 18 7a9 9 0 1 1 9 9q-12 -12 -27 -12t-27 12z',
    thin: 'M-24 -268q-3 -18 7 -28q-3 12 -1 24zM24 -268q3 -18 -7 -28q3 12 1 24z',
    crop: 'M-25 -272q0 -34 25 -34t25 34q-4 -18 -25 -20t-25 20z'
  };
  X.person = function (o) {
    var skin = o.skin || '#e8c4a2', hair = o.hair || '#3a2a1c', top = o.top || '#2e6b8f', bot = o.bottom || '#2c2c33', s = '';
    s += '<ellipse cx="0" cy="2" rx="46" ry="8" fill="#000" opacity="' + (o.shadow == null ? 0.22 : o.shadow) + '"/>';
    if (o.legs === 'skirt') s += '<path d="M-17 0v-74h13v74zM4 0v-74h13v74z" fill="' + (o.tights || skin) + '"/><path d="M-33 -66h66l-6 -66h-54z" fill="' + bot + '"/>';
    else s += '<path d="M-20 0v-100h17v100zM3 0v-100h17v100z" fill="' + bot + '"/>';
    s += '<path d="M-24 0h22v7h-26zM2 0h22v7h-22z" fill="' + (o.shoes || '#2a2420') + '"/>';
    if (o.coat) s += '<path d="M-42 -40q-8 -150 42 -200t42 200z" fill="' + o.coat + '"/>';
    s += '<path d="M-38 -94q-7 -138 38 -146t38 146z" fill="' + top + '"/>';
    if (o.shirt) s += '<path d="M-9 -238l9 24 9 -24z" fill="' + o.shirt + '"/>';
    if (o.lanyard) s += '<path d="M-12 -236l12 40 12 -40" stroke="' + o.lanyard + '" stroke-width="3" fill="none"/><rect x="-9" y="-198" width="18" height="22" rx="2" fill="#f4f1ea" stroke="' + o.lanyard + '" stroke-width="2"/>';
    s += '<path d="M-34 -204q-15 40 -5 88M34 -204q15 40 5 88" stroke="' + (o.sleeve || o.coat || top) + '" stroke-width="15" fill="none" stroke-linecap="round"/>' +
      '<circle cx="-39" cy="-112" r="8" fill="' + skin + '"/><circle cx="39" cy="-112" r="8" fill="' + skin + '"/>';
    s += '<rect x="-7" y="-256" width="14" height="20" fill="' + skin + '"/><circle cx="0" cy="-274" r="24" fill="' + skin + '"/>';
    if (o.back) s += '<circle cx="0" cy="-277" r="24.5" fill="' + hair + '"/>';
    else {
      if (o.style && HAIR[o.style]) s += '<path d="' + HAIR[o.style] + '" fill="' + hair + '"/>';
      s += '<path d="M-11 -273h7M4 -273h7" stroke="#2a2420" stroke-width="2.6" stroke-linecap="round"/><path d="M-6 -260q6 ' + (o.smile == null ? 3 : o.smile) + ' 12 0" stroke="#8c4a3c" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
      if (o.glasses) s += '<path d="M-15 -272h11M4 -272h11" stroke="' + o.glasses + '" stroke-width="2.2"/><path d="M-15 -272q5 6 11 0M4 -272q5 6 11 0" stroke="' + o.glasses + '" stroke-width="2" fill="none"/>';
      if (o.beard) s += '<path d="M-22 -268q0 26 22 30t22 -30q-6 12 -22 12t-22 -12z" fill="' + o.beard + '"/><path d="M-6 -259q6 3 12 0" stroke="#5a2a1c" stroke-width="2" fill="none"/>';
    }
    if (o.beanie) s += '<path d="M-26 -282q0 -32 26 -32t26 32z" fill="' + o.beanie + '"/><rect x="-27" y="-286" width="54" height="8" rx="3" fill="' + o.beanie + '" stroke="rgba(0,0,0,.25)"/><circle cx="0" cy="-316" r="7" fill="' + o.beanie + '"/>';
    if (o.extra) s += o.extra;
    return s;
  };
  X.PEOPLE = {
    amara: { skin: '#b98a62', hair: '#1a1412', style: 'plait', top: '#2f6b5a', sleeve: '#2f6b5a', bottom: '#2a2a33', lanyard: '#e2453a' },
    dina: { skin: '#7a4e34', hair: '#3a3634', style: 'crop', top: '#7a1f3a', sleeve: '#7a1f3a', bottom: '#2a2a30', legs: 'skirt', tights: '#3a2a2a', shirt: '#f2e6d8', glasses: '#c9a24a', lanyard: '#e2453a' },
    bram: { skin: '#efc8a8', hair: '#a3522a', style: 'short', top: '#d8a030', sleeve: '#d8a030', bottom: '#3a4a6a', beard: '#a3522a', shoes: '#f4f1ea' },
    cleo: { skin: '#efd2b8', hair: '#e8e0c8', style: 'bob', top: '#1a1a22', sleeve: '#1a1a22', bottom: '#2a2a33', shirt: '#c2185b' },
    ewan: { skin: '#e6c4a0', hair: '#5a3a20', style: 'curly', top: '#55606a', sleeve: '#55606a', bottom: '#2a3040', glasses: '#2a2420' },
    cosmo: { skin: '#c69a72', hair: '#2a1a10', style: 'short', top: '#c2402a', sleeve: '#c2402a', bottom: '#2a2a33', beanie: '#2a5a8a' },
    adrian: { skin: '#e8c4a2', hair: '#c8c4bc', style: 'thin', top: '#5a6a4a', bottom: '#3a3a38', coat: '#3a4a3a' },
    becky: { skin: '#f0d6b8', hair: '#a3602a', style: 'bun', top: '#6a4a8a', sleeve: '#6a4a8a', bottom: '#2a2a33' },
    denise: { skin: '#5a3a28', hair: '#141010', style: 'curly', top: '#2a6a9a', sleeve: '#2a6a9a', bottom: '#2a2a33', coat: '#1f4a6a' }
  };
  X.who = function (name, more) {
    var o = {}, k, base = X.PEOPLE[name];
    for (k in base) o[k] = base[k];
    for (k in (more || {})) o[k] = more[k];
    return X.person(o);
  };
  /* somebody small in a crowd or a queue: feet at 0 0, about 90 high; dir 1 faces right, -1 left */
  X.small = function (x, y, c, h, dir, sit) {
    var s = '<g transform="translate(' + x + ' ' + y + ')">';
    if (sit) s += '<path d="M-14 0l4 -24h22l4 24" stroke="#2a2a2a" stroke-width="3" fill="none"/><path d="M-12 -24h24v-6h-24z" fill="#2a4a6a"/><path d="M-9 -30v-4h18v4z" fill="#3a3a44"/><path d="M-13 -30q-2 -36 13 -40t13 40z" fill="' + c + '"/><circle cx="0" cy="-76" r="9" fill="#e6c4a4"/><path d="M-9 -79q0 -11 9 -11t9 11z" fill="' + h + '"/>';
    else s += '<path d="M-9 0v-30h7v30zM2 0v-30h7v30z" fill="#3a3a44"/><path d="M-13 -28q-2 -40 13 -44t13 44z" fill="' + c + '"/><circle cx="0" cy="-80" r="9" fill="#e6c4a4"/><path d="M-9 -83q0 -11 9 -11t9 11z" fill="' + h + '"/><circle cx="' + (dir * 4) + '" cy="-80" r="1.5" fill="#2a2420"/>';
    return s + '</g>';
  };

  /* ---------- the same people as busts, for the interviews (240 x 300) ---------- */
  var BUST = {
    amara: { bg: '#2f6b5a', skin: '#b98a62', hair: '#1a1412', style: 'plait', top: '#2f6b5a', lanyard: '#e2453a' },
    dina: { bg: '#7a1f3a', skin: '#7a4e34', hair: '#3a3634', style: 'crop', top: '#7a1f3a', shirt: '#f2e6d8', half: '#c9a24a', lanyard: '#e2453a' },
    bram: { bg: '#d8a030', skin: '#efc8a8', hair: '#a3522a', style: 'short', top: '#d8a030', beard: '#a3522a' },
    cleo: { bg: '#1a1a22', skin: '#efd2b8', hair: '#e8e0c8', style: 'bob', top: '#1a1a22', shirt: '#c2185b', ear: 1 },
    ewan: { bg: '#55606a', skin: '#e6c4a0', hair: '#5a3a20', style: 'curly', top: '#55606a', glasses: '#2a2420', hood: 1 },
    cosmo: { bg: '#c2402a', skin: '#c69a72', hair: '#2a1a10', style: 'short', top: '#c2402a', beanie: '#2a5a8a' },
    adrian: { bg: '#3a4a3a', skin: '#e8c4a2', hair: '#c8c4bc', style: 'thin', top: '#3a4a3a', brows: 1, stubble: 1 },
    becky: { bg: '#6a4a8a', skin: '#f0d6b8', hair: '#a3602a', style: 'bun', top: '#6a4a8a' },
    denise: { bg: '#1f4a6a', skin: '#5a3a28', hair: '#141010', style: 'curly', top: '#1f4a6a', shirt: '#2a6a9a' }
  };
  var BHAIR = {
    plait: 'M64 120q0 -70 56 -72t56 72q-14 -34 -56 -36t-56 36zM166 92q26 16 22 80q-4 34 6 70l-16 4q-14 -40 -8 -76q4 -40 -14 -64z',
    short: 'M64 116q0 -66 56 -68t56 68q-14 -30 -56 -32t-56 32z',
    crop: 'M62 114q2 -70 58 -70t58 70q-10 -40 -58 -42t-58 42z',
    bun: 'M64 118q0 -68 56 -70t56 70q-14 -32 -56 -34t-56 34zM98 42a22 22 0 1 1 44 0a22 22 0 1 1 -44 0z',
    bob: 'M60 124q-2 -76 60 -78t60 78q-16 -36 -60 -38t-60 38zM58 118q-8 40 4 64h18q-10 -26 -6 -60zM182 118q8 40 -4 64h-18q10 -26 6 -60z',
    curly: 'M58 118a18 18 0 1 1 14 -30a22 22 0 1 1 30 -26a22 22 0 1 1 36 0a22 22 0 1 1 30 26a18 18 0 1 1 14 30q-30 -34 -62 -34t-62 34z',
    thin: 'M62 128q-6 -34 12 -54q-4 22 -2 48zM178 128q6 -34 -12 -54q4 22 2 48z'
  };
  X.face = function (name, mood) {
    var o = BUST[name], s = '', sm = mood === 'smile' ? 10 : mood === 'cross' ? -7 : 3;
    s += '<svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg"><rect x="-200" y="-200" width="640" height="500" fill="' + o.bg + '"/><circle cx="196" cy="54" r="80" fill="#fff" opacity=".1"/>';
    if (o.hood) s += '<path d="M40 300q-10 -110 80 -122q90 12 80 122z" fill="#454f58"/>';
    s += '<path d="M14 300q8 -96 106 -104q98 8 106 104z" fill="' + o.top + '"/>';
    if (o.shirt) s += '<path d="M98 200l22 40 22 -40z" fill="' + o.shirt + '"/>';
    if (o.lanyard) s += '<path d="M92 202l28 70 28 -70" stroke="' + o.lanyard + '" stroke-width="5" fill="none"/><rect x="104" y="268" width="32" height="28" rx="3" fill="#f4f1ea"/>';
    s += '<rect x="104" y="164" width="32" height="36" fill="' + o.skin + '"/>';
    s += '<ellipse cx="120" cy="120" rx="54" ry="62" fill="' + o.skin + '"/><ellipse cx="66" cy="126" rx="8" ry="13" fill="' + o.skin + '"/><ellipse cx="174" cy="126" rx="8" ry="13" fill="' + o.skin + '"/>';
    if (o.ear) s += '<circle cx="66" cy="142" r="4" fill="#e6c873"/><circle cx="174" cy="142" r="4" fill="#e6c873"/>';
    s += '<path d="' + BHAIR[o.style] + '" fill="' + o.hair + '"/>';
    if (o.beanie) s += '<path d="M60 104q0 -66 60 -66t60 66z" fill="' + o.beanie + '"/><rect x="56" y="96" width="128" height="18" rx="6" fill="' + o.beanie + '" stroke="rgba(0,0,0,.25)" stroke-width="2"/><circle cx="120" cy="34" r="14" fill="' + o.beanie + '"/>';
    if (o.beard) s += '<path d="M70 130q0 66 50 70t50 -70q-10 30 -50 30t-50 -30z" fill="' + o.beard + '"/>';
    if (o.stubble) s += '<path d="M76 146q4 40 44 44t44 -44q-8 26 -44 28t-44 -28z" fill="#8a8478" opacity=".35"/>';
    s += '<path d="M90 ' + (o.brows ? 102 : 106) + 'q10 ' + (o.brows ? -2 : -6) + ' 20 0M130 ' + (o.brows ? 102 : 106) + 'q10 ' + (o.brows ? -2 : -6) + ' 20 0" stroke="#3a2a20" stroke-width="' + (o.brows ? 5 : 3.5) + '" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="100" cy="122" rx="5" ry="6.5" fill="#2a2420"/><ellipse cx="140" cy="122" rx="5" ry="6.5" fill="#2a2420"/><circle cx="102" cy="120" r="1.6" fill="#fff"/><circle cx="142" cy="120" r="1.6" fill="#fff"/>' +
      '<path d="M120 128q-5 14 2 18" stroke="#6a4030" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M104 156q16 ' + sm + ' 32 0" stroke="#7c2e28" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="88" cy="146" rx="9" ry="5" fill="#e88a7a" opacity=".25"/><ellipse cx="152" cy="146" rx="9" ry="5" fill="#e88a7a" opacity=".25"/>';
    if (o.glasses) s += '<g fill="none" stroke="' + o.glasses + '" stroke-width="3"><rect x="84" y="110" width="31" height="24" rx="6"/><rect x="125" y="110" width="31" height="24" rx="6"/><path d="M115 120h10M84 118l-18 -4M156 118l18 -4"/></g>';
    if (o.half) s += '<g fill="none" stroke="' + o.half + '" stroke-width="3"><path d="M84 128h32q-2 12 -16 12t-16 -12zM124 128h32q-2 12 -16 12t-16 -12zM116 130h8M84 128l-18 -6M156 128l18 -6"/><path d="M66 124q-6 50 20 70M174 124q6 50 -20 70" stroke-width="1.5"/></g>';
    return s + '</svg>';
  };
  return X;
})();
