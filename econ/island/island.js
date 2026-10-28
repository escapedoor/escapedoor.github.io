/* Small Change - what every room of the story shares: a few sounds, small helpers, the chalk dial, and the people
   of Nessary (standing in the scene, and as busts for the interviews). Loaded after engine.js.
   Nothing in here knows an answer. */
window.ISL = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so that the sound button switches them) ---------- */
  X.sfx = {
    coin: function () { T({ f: 2300, dur: 0.2, peak: 0.07 }); T({ f: 3480, dur: 0.14, peak: 0.04, when: 0.01 }); B({ dur: 0.02, f: 6000, q: 3, peak: 0.08 }); },
    chalk: function () { B({ type: 'bandpass', f: 3200, f2: 2200, q: 3, dur: 0.12, peak: 0.07, a: 0.01 }); },
    pin: function () { T({ f: 900, f2: 700, dur: 0.06, peak: 0.12 }); B({ dur: 0.02, f: 2400, q: 2, peak: 0.1 }); },
    thud: function () { T({ f: 140, f2: 70, dur: 0.16, peak: 0.4 }); B({ type: 'lowpass', f: 700, dur: 0.06, peak: 0.25 }); },
    stamp: function () { T({ f: 110, f2: 60, dur: 0.12, peak: 0.45 }); B({ type: 'lowpass', f: 1200, dur: 0.05, peak: 0.3 }); B({ dur: 0.03, f: 3800, q: 2, peak: 0.08, when: 0.03 }); },
    bell: function () { [1, 2.4, 3.1].forEach(function (m, i) { T({ f: 1480 * m, dur: 0.9 / (i + 1), peak: 0.06 / (i + 1) }); }); },
    wave: function () { B({ type: 'lowpass', f: 900, f2: 300, dur: 1.6, peak: 0.12, a: 0.5 }); }
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
  /* a half as people write it: ½, 1½ */
  X.half = function (v) {
    var w = Math.floor(v), h = v - w > 0.25;
    return w ? w + (h ? '½' : '') : (h ? '½' : '0');
  };
  /* A puzzle that is finished: the music answers in the room's key, as after ER.exit; without music, three notes. */
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };

  /* ---------- the dial: a number that goes up and down ----------
     node: an empty element. o = {min, max, step, val, fmt(v), change(v), lock()}. Click the arrows, or turn the mouse wheel over it. */
  X.dial = function (node, o) {
    var v = o.val == null ? o.min : o.val;
    node.classList.add('dl');
    node.innerHTML = '<button type="button" class="dl-up" aria-label="up">&#9650;</button><b></b><button type="button" class="dl-dn" aria-label="down">&#9660;</button>';
    var out = node.querySelector('b');
    function paint() { out.textContent = o.fmt ? o.fmt(v) : String(v); }
    function set(n, quiet) {
      n = Math.max(o.min, Math.min(o.max, Math.round(n * 2) / 2));
      if (n === v) return;
      v = n; paint(); if (!quiet) X.sfx.chalk(); if (o.change) o.change(v);
    }
    node.querySelector('.dl-up').addEventListener('click', function (e) { e.stopPropagation(); if (o.lock && o.lock()) return; set(v + (o.step || 1)); });
    node.querySelector('.dl-dn').addEventListener('click', function (e) { e.stopPropagation(); if (o.lock && o.lock()) return; set(v - (o.step || 1)); });
    node.addEventListener('wheel', function (e) { e.preventDefault(); if (o.lock && o.lock()) return; set(v + (e.deltaY < 0 ? 1 : -1) * (o.step || 1)); }, { passive: false });
    paint();
    return { get: function () { return v; }, set: function (n) { set(n, true); paint(); }, node: node };
  };

  /* ---------- people, standing: feet at 0 0, about 300 high ----------
     o = {skin, hair, style, top, bottom, legs, shirt, apron, sleeve, coat, hat, beard, glasses, smile, extra} */
  var HAIR = {
    short: 'M-24 -276q2 -29 24 -29t24 29q-10 -13 -24 -13t-24 13z',
    bob: 'M-24 -276q2 -29 24 -29t24 29q-10 -13 -24 -13t-24 13zM-24 -282q-7 24 -2 40h9q-4 -20 -1 -32zM24 -282q7 24 2 40h-9q4 -20 1 -32z',
    bun: 'M-24 -276q2 -29 24 -29t24 29q-10 -13 -24 -13t-24 13zM-11 -308a11 11 0 1 1 22 0a11 11 0 1 1 -22 0z',
    plait: 'M-24 -276q2 -29 24 -29t24 29q-10 -13 -24 -13t-24 13zM18 -270q14 20 8 62l-8 -2q4 -34 -8 -52z',
    curly: 'M-27 -280a9 9 0 1 1 9 -9a11 11 0 1 1 18 -7a11 11 0 1 1 18 7a9 9 0 1 1 9 9q-12 -12 -27 -12t-27 12z',
    mop: 'M-27 -270q-4 -38 27 -38t27 38q-6 -12 -14 -14l-4 8 -6 -10 -6 10 -6 -10 -4 10q-8 2 -14 16z',
    thin: 'M-24 -268q-3 -18 7 -28q-3 12 -1 24zM24 -268q3 -18 -7 -28q3 12 1 24z',
    wavy: 'M-26 -276q0 -32 26 -32t26 32q-6 -6 -10 -2q-6 -10 -16 -10t-16 10q-4 -4 -10 2zM-26 -280q-10 26 -4 52h10q-6 -24 0 -46zM26 -280q10 26 4 52h-10q6 -24 0 -46z'
  };
  X.person = function (o) {
    var skin = o.skin || '#e8c4a2', hair = o.hair || '#3a2a1c', top = o.top || '#2e6b8f', bot = o.bottom || '#2c2c33', s = '';
    s += '<ellipse cx="0" cy="2" rx="46" ry="8" fill="#000" opacity="' + (o.shadow == null ? 0.22 : o.shadow) + '"/>';
    if (o.legs === 'skirt') s += '<path d="M-17 0v-74h13v74zM4 0v-74h13v74z" fill="' + (o.tights || skin) + '"/><path d="M-34 -64h68l-8 -70h-52z" fill="' + bot + '"/>';
    else if (o.legs === 'boots') s += '<path d="M-20 0v-100h17v100zM3 0v-100h17v100z" fill="' + bot + '"/><path d="M-22 0v-46h21v46zM1 0v-46h21v46z" fill="' + (o.boots || '#2a2c30') + '"/>';
    else s += '<path d="M-20 0v-100h17v100zM3 0v-100h17v100z" fill="' + bot + '"/>';
    s += '<path d="M-24 0h22v7h-26zM2 0h22v7h-22z" fill="' + (o.shoes || '#3a3530') + '"/>';
    s += '<path d="M-38 -94q-7 -138 38 -146t38 146z" fill="' + top + '"/>';
    if (o.coat) s += '<path d="M-42 -80q-8 -150 42 -160t42 160zM-2 -236v156" fill="' + o.coat + '" stroke="rgba(0,0,0,.18)" stroke-width="3"/>';
    if (o.apron) s += '<path d="M-26 -94v-98h52v98z" fill="' + o.apron + '"/><path d="M-26 -192l-8 -34M26 -192l8 -34" stroke="' + o.apron + '" stroke-width="4"/>';
    if (o.shirt) s += '<path d="M-9 -238l9 24 9 -24z" fill="' + o.shirt + '"/>';
    s += '<path d="M-34 -204q-15 40 -5 88M34 -204q15 40 5 88" stroke="' + (o.sleeve || o.coat || top) + '" stroke-width="15" fill="none" stroke-linecap="round"/>' +
      '<circle cx="-39" cy="-112" r="8" fill="' + skin + '"/><circle cx="39" cy="-112" r="8" fill="' + skin + '"/>';
    s += '<rect x="-7" y="-256" width="14" height="20" fill="' + skin + '"/><circle cx="0" cy="-274" r="24" fill="' + skin + '"/>';
    if (o.style && HAIR[o.style]) s += '<path d="' + HAIR[o.style] + '" fill="' + hair + '"/>';
    if (o.beard) s += '<path d="M-22 -270q0 30 22 32t22 -32q-6 14 -22 14t-22 -14z" fill="' + o.beard + '"/>';
    s += '<path d="M-11 -273h7M4 -273h7" stroke="#2a2420" stroke-width="2.6" stroke-linecap="round"/>';
    if (!o.beard) s += '<path d="M-6 -260q6 ' + (o.smile == null ? 4 : o.smile) + ' 12 0" stroke="#8c4a3c" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    if (o.glasses) s += '<circle cx="-8" cy="-273" r="7" fill="none" stroke="' + o.glasses + '" stroke-width="2"/><circle cx="8" cy="-273" r="7" fill="none" stroke="' + o.glasses + '" stroke-width="2"/>';
    if (o.hat === 'cap') s += '<path d="M-26 -284q2 -26 26 -26t26 26zM20 -286h22v6h-22z" fill="' + (o.hatc || '#1f2b3a') + '"/>';
    if (o.hat === 'beanie') s += '<path d="M-26 -282q0 -32 26 -32t26 32z" fill="' + (o.hatc || '#c0392b') + '"/><path d="M-27 -284h54v8h-54z" fill="' + (o.hatc || '#c0392b') + '" stroke="rgba(0,0,0,.2)" stroke-width="2"/>';
    if (o.extra) s += o.extra;
    return s;
  };
  X.PEOPLE = {
    romy: { skin: '#f1d2b6', hair: '#2b1d14', style: 'plait', top: '#3f6e4a', sleeve: '#3f6e4a', bottom: '#2f3440', legs: 'boots', boots: '#b8342a', shirt: '#f4efe2' },
    orla: { skin: '#efcfb4', hair: '#8a3a1e', style: 'bun', top: '#2d4a6b', sleeve: '#2d4a6b', bottom: '#3b3b44', legs: 'skirt', tights: '#3b3b44', shirt: '#f4efe2', glasses: '#4a3a2a' },
    perran: { skin: '#f1d2b6', hair: '#2b1d14', style: 'mop', top: '#e0a528', sleeve: '#e0a528', bottom: '#3a4a5a', legs: 'boots', boots: '#2f6b8f' },
    nico: { skin: '#d8a882', hair: '#2a1e18', style: 'curly', top: '#f4efe2', sleeve: '#f4efe2', bottom: '#2c2c33', apron: '#1f7a74', beard: '#2a1e18' },
    merryn: { skin: '#8a5a3c', hair: '#1a1210', style: 'wavy', top: '#7a3b6e', sleeve: '#7a3b6e', bottom: '#2a2a33', legs: 'skirt', tights: '#2a2a33', shirt: '#f2e6c8', glasses: '#c9a24a' },
    ruby: { skin: '#f0cdb0', hair: '#d9d4cc', style: 'bun', top: '#f6f1e6', sleeve: '#f6f1e6', bottom: '#4a3a30', apron: '#e9e2d2', shoes: '#2a2420' },
    ronan: { skin: '#f3d9c4', hair: '#c9873a', style: 'short', top: '#2a4a6a', bottom: '#34383f', legs: 'boots', boots: '#e0b020', coat: '#e0b020', hat: 'beanie', hatc: '#2a5a8a' },
    piran: { skin: '#e9c4a4', hair: '#e8e4dc', style: 'thin', top: '#1e2a3c', sleeve: '#1e2a3c', bottom: '#1e2a3c', shirt: '#dfe6ee', beard: '#e8e4dc', glasses: '#6a5a3a', hat: 'cap', hatc: '#1a2433' },
    rob: { skin: '#e8b494', hair: '#8a8478', style: 'short', top: '#6a6a3a', sleeve: '#6a6a3a', bottom: '#4a4030', legs: 'boots', boots: '#3a5a2a', shirt: '#c9b48a', hat: 'cap', hatc: '#5a5a4a' }
  };
  X.who = function (name, more) {
    var o = {}, k, base = X.PEOPLE[name];
    for (k in base) o[k] = base[k];
    for (k in (more || {})) o[k] = more[k];
    return X.person(o);
  };

  /* ---------- the same people as busts, for the interviews (240 x 300) ---------- */
  var BUST = {
    romy: { bg: '#3f6e4a', skin: '#f1d2b6', hair: '#2b1d14', style: 'plait', top: '#3f6e4a', collar: '#f4efe2', pencil: 1, freckles: 1 },
    orla: { bg: '#2d4a6b', skin: '#efcfb4', hair: '#8a3a1e', style: 'bun', top: '#2d4a6b', collar: '#f4efe2', glasses: '#4a3a2a', pencil: 1 },
    perran: { bg: '#e0a528', skin: '#f1d2b6', hair: '#2b1d14', style: 'mop', top: '#c98a18', freckles: 1 },
    nico: { bg: '#1f7a74', skin: '#d8a882', hair: '#2a1e18', style: 'curly', top: '#f4efe2', apron: '#1f7a74', beard: '#2a1e18' },
    merryn: { bg: '#7a3b6e', skin: '#8a5a3c', hair: '#1a1210', style: 'wavy', top: '#7a3b6e', collar: '#f2e6c8', glasses: '#c9a24a', ear: '#c9a24a' },
    ruby: { bg: '#b8642a', skin: '#f0cdb0', hair: '#d9d4cc', style: 'bun', top: '#f6f1e6', apron: '#e9e2d2', flour: 1 },
    ronan: { bg: '#2a5a8a', skin: '#f3d9c4', hair: '#c9873a', style: 'short', top: '#e0b020', hat: 'beanie', hatc: '#2a5a8a', freckles: 1 },
    piran: { bg: '#1e2a3c', skin: '#e9c4a4', hair: '#e8e4dc', style: 'thin', top: '#1e2a3c', collar: '#dfe6ee', beard: '#e8e4dc', glasses: '#6a5a3a', hat: 'cap', hatc: '#1a2433' },
    rob: { bg: '#6a6a3a', skin: '#e8b494', hair: '#8a8478', style: 'short', top: '#6a6a3a', collar: '#c9b48a', hat: 'cap', hatc: '#5a5a4a' }
  };
  var BHAIR = {
    plait: 'M64 120q0 -70 56 -72t56 72q-14 -34 -56 -36t-56 36zM164 140q30 40 18 120l-18 -4q10 -66 -12 -104z',
    bun: 'M64 118q0 -68 56 -70t56 70q-14 -32 -56 -34t-56 34zM98 42a22 22 0 1 1 44 0a22 22 0 1 1 -44 0z',
    mop: 'M58 128q-8 -84 62 -84t62 84q-10 -26 -26 -30l-8 18 -12 -22 -12 22 -12 -22 -10 22q-18 4 -24 12z',
    curly: 'M60 120a18 18 0 1 1 18 -26a20 20 0 1 1 32 -18a20 20 0 1 1 36 4a18 18 0 1 1 30 22a16 16 0 1 1 4 18q-22 -30 -60 -32t-60 32z',
    wavy: 'M62 122q0 -72 58 -74t58 74q-12 -14 -22 -6q-12 -22 -36 -22t-36 22q-10 -8 -22 6zM58 118q-18 70 -6 132h26q-14 -64 -2 -124zM182 118q18 70 6 132h-26q14 -64 2 -124z',
    short: 'M64 116q0 -66 56 -68t56 68q-14 -30 -56 -32t-56 32z',
    thin: 'M62 128q-6 -34 12 -54q-4 22 -2 48zM178 128q6 -34 -12 -54q4 22 2 48z'
  };
  X.face = function (name, mood) {
    var o = BUST[name], s = '', sm = mood === 'smile' ? 10 : mood === 'cross' ? -6 : 3;
    s += '<svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg"><rect x="-200" y="-200" width="640" height="500" fill="' + o.bg + '"/><circle cx="196" cy="54" r="80" fill="#fff" opacity=".1"/>';
    s += '<path d="M14 300q8 -96 106 -104q98 8 106 104z" fill="' + o.top + '"/>';
    if (o.collar) s += '<path d="M92 200l28 30 28 -30z" fill="' + o.collar + '"/>';
    if (o.apron) s += '<path d="M70 300v-84q50 -14 100 0v84z" fill="' + o.apron + '"/><path d="M84 214l-14 -22M156 214l14 -22" stroke="' + o.apron + '" stroke-width="7"/>';
    s += '<rect x="104" y="164" width="32" height="36" fill="' + o.skin + '"/>';
    if (o.style === 'wavy') s += '<path d="M58 118q-18 70 -6 132h26q-14 -64 -2 -124zM182 118q18 70 6 132h-26q14 -64 2 -124z" fill="' + o.hair + '"/>';
    s += '<ellipse cx="120" cy="120" rx="54" ry="62" fill="' + o.skin + '"/><ellipse cx="66" cy="126" rx="8" ry="13" fill="' + o.skin + '"/><ellipse cx="174" cy="126" rx="8" ry="13" fill="' + o.skin + '"/>';
    s += '<path d="' + BHAIR[o.style] + '" fill="' + o.hair + '"/>';
    if (o.beard) s += '<path d="M68 128q2 66 52 70t52 -70q-10 30 -52 30t-52 -30z" fill="' + o.beard + '"/>';
    if (o.hat === 'cap') s += '<path d="M62 92q0 -50 58 -50t58 50zM160 88h50v12h-50z" fill="' + o.hatc + '"/><path d="M92 62h56" stroke="#c9a24a" stroke-width="4"/>';
    if (o.hat === 'beanie') s += '<path d="M62 96q0 -66 58 -66t58 66z" fill="' + o.hatc + '"/><path d="M60 82h120v20h-120z" fill="' + o.hatc + '" stroke="rgba(0,0,0,.25)" stroke-width="3"/>';
    s += '<path d="M90 106q10 -6 20 0M130 106q10 -6 20 0" stroke="#3a2a20" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="100" cy="122" rx="5" ry="6.5" fill="#2a2420"/><ellipse cx="140" cy="122" rx="5" ry="6.5" fill="#2a2420"/><circle cx="102" cy="120" r="1.6" fill="#fff"/><circle cx="142" cy="120" r="1.6" fill="#fff"/>' +
      '<path d="M120 128q-5 14 2 18" stroke="#b07a5a" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    if (!o.beard) s += '<path d="M104 156q16 ' + sm + ' 32 0" stroke="#8c3a32" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="88" cy="146" rx="9" ry="5" fill="#e88a7a" opacity=".35"/><ellipse cx="152" cy="146" rx="9" ry="5" fill="#e88a7a" opacity=".35"/>';
    else s += '<path d="M106 160q14 ' + (sm / 2) + ' 28 0" stroke="#5a3a30" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
    if (o.freckles) s += '<g fill="#b0603a" opacity=".55"><circle cx="92" cy="138" r="1.6"/><circle cx="99" cy="141" r="1.6"/><circle cx="86" cy="142" r="1.4"/><circle cx="148" cy="138" r="1.6"/><circle cx="141" cy="141" r="1.6"/><circle cx="154" cy="142" r="1.4"/></g>';
    if (o.glasses) s += '<g fill="none" stroke="' + o.glasses + '" stroke-width="3"><circle cx="100" cy="122" r="15"/><circle cx="140" cy="122" r="15"/><path d="M115 120h10M85 118l-18 -4M155 118l18 -4"/></g>';
    if (o.ear) s += '<circle cx="66" cy="142" r="4" fill="' + o.ear + '"/><circle cx="174" cy="142" r="4" fill="' + o.ear + '"/>';
    if (o.pencil) s += '<path d="M168 84l26 -16" stroke="#e8b020" stroke-width="6" stroke-linecap="round"/><path d="M194 68l6 -4" stroke="#3a2a20" stroke-width="5" stroke-linecap="round"/>';
    if (o.flour) s += '<g fill="#fff" opacity=".7"><circle cx="150" cy="96" r="5"/><circle cx="84" cy="150" r="4"/><circle cx="160" cy="250" r="9"/><circle cx="96" cy="262" r="6"/></g>';
    return s + '</svg>';
  };
  return X;
})();
