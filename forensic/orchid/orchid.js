/* Lane Seven - what every room of the story shares: a few sounds, small helpers, the people as figures,
   the slipper orchids, the white vans and the pollen grains. Loaded after engine.js (cast.js before it).
   Nothing in here knows an answer. */
window.OR = (function () {
  'use strict';
  var X = {}, D = document, NS = 'http://www.w3.org/2000/svg';
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so that the sound button switches them) ---------- */
  X.sfx = {
    stamp: function () { T({ f: 110, f2: 52, dur: 0.17, peak: 0.5 }); B({ type: 'lowpass', f: 900, dur: 0.06, peak: 0.35 }); },
    slide: function () { B({ type: 'bandpass', f: 1500, f2: 2600, q: 0.7, dur: 0.16, peak: 0.04, a: 0.04 }); },
    focus: function () { B({ dur: 0.012, f: 5200, q: 6, peak: 0.07 }); },
    pencil: function () { B({ type: 'highpass', f: 3400, dur: 0.14, peak: 0.06, a: 0.03 }); },
    roll: function () { B({ type: 'lowpass', f: 420, f2: 260, q: 0.8, dur: 0.6, peak: 0.12, a: 0.1 }); },
    tape: function () { B({ type: 'bandpass', f: 2600, f2: 1400, q: 1.5, dur: 0.32, peak: 0.07, a: 0.02 }); },
    scrape: function () { B({ type: 'bandpass', f: 1900, q: 3, dur: 0.22, peak: 0.08, a: 0.03 }); B({ type: 'bandpass', f: 1400, q: 3, dur: 0.18, peak: 0.06, when: 0.2 }); },
    rustle: function () { B({ type: 'highpass', f: 1800, dur: 0.28, peak: 0.07, a: 0.06 }); },
    beep: function () { T({ type: 'square', f: 1760, dur: 0.07, peak: 0.04 }); },
    dot: function () { T({ type: 'triangle', f: 660, dur: 0.07, peak: 0.12 }); },
    horn: function () { T({ type: 'sawtooth', f: 98, dur: 1.6, peak: 0.07, a: 0.2 }); T({ type: 'sawtooth', f: 147, dur: 1.6, peak: 0.04, a: 0.2 }); },
    clank: function () { T({ f: 240, f2: 180, dur: 0.3, peak: 0.12 }); B({ type: 'bandpass', f: 2400, q: 6, dur: 0.25, peak: 0.08 }); }
  };
  /* A door opens. The music answers in the room's own key, as it does after ER.exit; without music, three plain notes. */
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };

  /* ---------- small helpers ---------- */
  X.thing = function (sel, word, line, busy) {          /* a thing in the scene that has a name and something to say */
    ER.$$(sel).forEach(function (n) {
      n.addEventListener('click', function (e) {
        if (busy && busy()) return;
        if (word) ER.wordAt(e.clientX, e.clientY, word);
        if (line) ER.say(typeof line === 'function' ? line() : line);
      });
    });
  };
  X.mine = function (id, title, html, quiet) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'mine', 'Your notes', quiet); };
  X.terms = function (list) {                            /* the subject's words go into the notebook when the page that teaches them has been read */
    var G = window.GLOSS || [];
    list.forEach(function (w) { for (var i = 0; i < G.length; i++) if (G[i][0] === w) { ER.addWord(G[i][0], G[i][1]); break; } });
  };
  X.minutesPlayed = function () {
    var st = ER.state(), end = ER.flag('tEnd') || Date.now();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((end - (st.t0 || end)) / 60000));
  };
  X.clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  X.mix = function (a, b, k) {                          /* k of the way from colour a to colour b */
    var i, out = '#', va, vb;
    for (i = 1; i < 7; i += 2) { va = parseInt(a.substr(i, 2), 16); vb = parseInt(b.substr(i, 2), 16); out += ('0' + Math.round(va + (vb - va) * k).toString(16)).slice(-2); }
    return out;
  };
  X.rnd = function (seed) { var s = seed || 1; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };

  /* ---------- the people: a standing figure, feet at 0,0, about 330 tall. bust = no shadow, for FACE() ---------- */
  X.person = function (o, bust) {
    o = o || {};
    var sk = o.skin || '#e4c19c', hr = o.hair || '#3a2a20', coat = o.coat || '#555', dk = X.mix(coat, '#000000', 0.3);
    var skd = X.mix(sk, '#5a2a14', 0.22), hem = o.long ? -44 : -100, s = '', w = o.w || 1, st = o.hairStyle || 'short';
    if (!bust) s += '<ellipse cx="0" cy="3" rx="' + (56 * w) + '" ry="8" fill="#000" opacity=".3"/>';
    s += '<g transform="scale(' + w + ' 1)">';
    s += '<path d="M-20 0v-124h17v124zM3 0v-124h17v124z" fill="' + (o.legs || '#2a2a30') + '"/>';
    if (o.boots) s += '<path d="M-22 0v-30h20v30zM2 0v-30h20v30z" fill="' + o.boots + '"/>';
    s += '<path d="M-25 0h23v8h-27zM2 0h23v8h-23z" fill="' + (o.shoes || '#151210') + '"/>';
    if (st === 'bob') s += '<path d="M-34 -294q0 -42 34 -42t34 42v32h-13v-26h-42v26h-13z" fill="' + hr + '"/>';
    if (st === 'bun') s += '<circle cx="0" cy="-330" r="14" fill="' + hr + '"/>';
    if (st === 'long') s += '<path d="M-30 -300q0 -40 30 -40t30 40v70h-14v-60h-32v60h-14z" fill="' + hr + '"/>';
    /* coat */
    s += '<path d="M-46 ' + hem + 'C-53 -150 -51 -232 -30 -250L30 -250C51 -232 53 -150 46 ' + hem + 'Z" fill="' + coat + '"/>';
    s += '<path d="M-46 ' + hem + 'C-53 -150 -51 -232 -30 -250L-18 -250C-34 -200 -30 -140 -26 ' + hem + 'Z" fill="#000" opacity=".12"/>';
    if (o.knit) s += '<g stroke="' + X.mix(coat, '#ffffff', 0.18) + '" stroke-width="1.4" opacity=".55"><path d="M-36 -230v' + (230 + hem) + 'M-24 -244v' + (244 + hem) + 'M24 -244v' + (244 + hem) + 'M36 -230v' + (230 + hem) + '"/></g>';
    s += '<path d="M-14 -250L0 -204L14 -250Z" fill="' + (o.shirt || '#eee') + '"/>';
    if (o.tie) s += '<path d="M-4 -246h8l-1 6 3 36 -6 8 -6 -8 3 -36z" fill="' + o.tie + '"/>';
    s += '<path d="M-14 -250L-25 -214L-6 -196M14 -250L25 -214L6 -196" fill="none" stroke="' + dk + '" stroke-width="2.4"/>';
    if (!o.long) s += '<circle cx="0" cy="-180" r="2.6" fill="' + dk + '"/><circle cx="0" cy="-150" r="2.6" fill="' + dk + '"/>';
    else s += '<circle cx="-4" cy="-182" r="2.6" fill="' + dk + '"/><circle cx="-4" cy="-150" r="2.6" fill="' + dk + '"/><circle cx="-4" cy="-118" r="2.6" fill="' + dk + '"/>';
    if (o.epaulettes) s += '<path d="M-44 -244h20v7h-20zM24 -244h20v7h-20z" fill="' + o.epaulettes + '"/><path d="M-40 -241h4M-34 -241h4M30 -241h4M36 -241h4" stroke="#e8d27a" stroke-width="2"/>';
    if (o.hivis) {                                     /* a yellow vest with silver stripes */
      s += '<path d="M-44 -236C-50 -170 -48 -140 -44 -108H-10L-14 -246H-30zM44 -236C50 -170 48 -140 44 -108H10L14 -246H30z" fill="' + o.hivis + '"/>';
      s += '<path d="M-47 -150H-11M11 -150H47M-46 -128H-11M11 -128H46" stroke="#e9eef2" stroke-width="5"/><path d="M-47 -150H-11M11 -150H47M-46 -128H-11M11 -128H46" stroke="#9aa6ae" stroke-width="1" opacity=".6"/>';
      if (o.vestText) s += '<text x="-28" y="-188" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="9" fill="#1a1a1a" text-anchor="middle">' + o.vestText + '</text>';
    }
    if (o.lens) s += '<path d="M-9 -250q-6 50 9 76M9 -250q6 50 -9 76" stroke="#1a1a1a" stroke-width="1.2" fill="none"/><circle cx="0" cy="-168" r="8" fill="#d9eef2" fill-opacity=".5" stroke="#c9a54a" stroke-width="2.6"/>';
    if (o.badge) s += '<rect x="18" y="-214" width="16" height="20" rx="2" fill="#f4f6f2"/><rect x="21" y="-210" width="10" height="6" fill="' + o.badge + '"/>';
    /* arms and hands */
    var hand = o.gloves || sk, P = o.pose || 'down', arm = function (d) { return '<path d="' + d + '" stroke="' + (o.sleeve || coat) + '" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; };
    var hd = function (x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="8" fill="' + hand + '"/>'; };
    if (P === 'fold') s += arm('M-40 -236q-12 52 2 70l34 -4') + arm('M40 -236q12 52 -2 70l-34 -4') + hd(-4, -170) + hd(4, -166);
    else if (P === 'hold') s += arm('M-40 -236q-12 60 -6 116') + arm('M40 -236q16 44 2 76l-22 -8') + hd(-46, -118) + '<rect x="2" y="-196" width="34" height="44" rx="2" fill="' + (o.folder || '#2f5a3a') + '" transform="rotate(-8 18 -174)"/><rect x="8" y="-190" width="22" height="30" fill="#f2f0ea" transform="rotate(-8 18 -174)"/>' + hd(19, -168);
    else if (P === 'cup') s += arm('M-40 -236q-12 60 -6 116') + arm('M40 -236q16 44 2 76l-22 -8') + hd(-46, -118) + '<path d="M8 -196h20l-3 26h-14z" fill="' + (o.cupc || '#f2efe6') + '"/><path d="M28 -190q8 2 4 10" stroke="#f2efe6" stroke-width="2.5" fill="none"/>' + hd(19, -172);
    else if (P === 'hands') s += arm('M-40 -236q-10 50 10 74') + arm('M40 -236q10 50 -10 74') + hd(-30, -160) + hd(30, -160);
    else if (P === 'torch') s += arm('M-40 -236q-12 60 -6 116') + arm('M40 -236q16 44 2 76l-22 -8') + hd(-46, -118) + '<rect x="12" y="-190" width="9" height="28" rx="3" fill="#2a2a2a" transform="rotate(-18 16 -175)"/><circle cx="11" cy="-191" r="4.5" fill="#fff6c8"/>' + hd(19, -168);
    else s += arm('M-40 -236q-12 60 -6 116') + arm('M40 -236q12 60 6 116') + hd(-46, -118) + hd(46, -118);
    /* neck, head, face */
    s += '<rect x="-8" y="-272" width="16" height="24" fill="' + skd + '"/>';
    s += '<ellipse cx="-26" cy="-290" rx="5" ry="8" fill="' + skd + '"/><ellipse cx="26" cy="-290" rx="5" ry="8" fill="' + skd + '"/>';
    if (o.earrings) s += '<circle cx="-26" cy="-280" r="2.6" fill="' + o.earrings + '"/><circle cx="26" cy="-280" r="2.6" fill="' + o.earrings + '"/>';
    s += '<ellipse cx="0" cy="-292" rx="25" ry="29" fill="' + sk + '"/>';
    if (o.beard) s += '<path d="M-24 -290q0 30 24 32q24 -2 24 -32q-6 16 -24 16t-24 -16z" fill="' + (o.beardc || hr) + '"/>';
    if (o.stubble) s += '<path d="M-22 -286q2 24 22 26q20 -2 22 -26q-6 14 -22 15t-22 -15z" fill="' + o.stubble + '" opacity=".35"/>';
    s += '<ellipse cx="-10" cy="-293" rx="4.6" ry="3.2" fill="#f7f1e6"/><ellipse cx="10" cy="-293" rx="4.6" ry="3.2" fill="#f7f1e6"/>' +
      '<circle cx="-9.4" cy="-293" r="2.3" fill="#231a14"/><circle cx="10.6" cy="-293" r="2.3" fill="#231a14"/>';
    if (o.tired) s += '<path d="M-15 -288q5 3 10 0M5 -288q5 3 10 0" stroke="' + skd + '" stroke-width="1.4" fill="none"/>';
    s += '<path d="M-16 -301q6 -4 12 -1M4 -302q6 -3 12 1" stroke="' + (o.brows || X.mix(hr, '#000000', 0.2)) + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    s += '<path d="M0 -290q-4 10 0 12q3 1 5 -1" stroke="' + skd + '" stroke-width="2" fill="none" stroke-linecap="round"/>';
    if (o.moustache) s += '<path d="M-11 -279q11 -6 22 0q-11 3 -22 0z" fill="' + o.moustache + '"/>';
    s += o.mouth === 'smile' ? '<path d="M-8 -276q8 6 16 0" stroke="' + (o.lips || '#8c4a3c') + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' :
      '<path d="M-7 -275h14" stroke="' + (o.lips || '#8c4a3c') + '" stroke-width="2.4" stroke-linecap="round"/>';
    /* hair in front */
    if (st === 'short') s += '<path d="M-26 -296q-2 -36 26 -36t26 36q-8 -20 -26 -20t-26 20z" fill="' + hr + '"/>';
    else if (st === 'bob') s += '<path d="M-26 -298q3 -30 26 -31q23 1 26 31q-10 -14 -26 -14q-16 0 -26 14z" fill="' + hr + '"/>';
    else if (st === 'bun' || st === 'long') s += '<path d="M-26 -294q-1 -36 26 -37q27 1 26 37q-6 -18 -26 -20q-20 2 -26 20z" fill="' + hr + '"/>';
    else if (st === 'crop') s += '<path d="M-25 -300q0 -30 25 -31q25 1 25 31q-8 -16 -25 -17q-17 1 -25 17z" fill="' + hr + '"/>';
    else if (st === 'curly') { for (var k = 0; k < 9; k++) { var t = Math.PI * (1.05 + 0.9 * k / 8); s += '<circle cx="' + (Math.cos(t) * 24).toFixed(1) + '" cy="' + (-298 + Math.sin(t) * 24).toFixed(1) + '" r="10" fill="' + hr + '"/>'; } }
    else if (st === 'bald') s += '<path d="M-26 -290q-5 -16 4 -24v22zM26 -290q5 -16 -4 -24v22z" fill="' + hr + '"/>';
    if (o.hat) s += '<path d="M-28 -298q0 -40 28 -40t28 40z" fill="' + o.hat + '"/><path d="M-29 -300h58v9h-58z" fill="' + X.mix(o.hat, '#000000', 0.25) + '"/><circle cx="0" cy="-340" r="6" fill="' + o.hat + '"/>';
    if (o.cap) s += '<path d="M-27 -300q0 -34 27 -34t27 34z" fill="' + o.cap + '"/><path d="M-27 -300h66q-6 8 -66 6z" fill="' + X.mix(o.cap, '#000000', 0.3) + '"/>';
    if (o.glasses === 'round') s += '<g fill="#fff" fill-opacity=".14" stroke="#1a1614" stroke-width="2"><circle cx="-10" cy="-293" r="8"/><circle cx="10" cy="-293" r="8"/></g><path d="M-2 -293h4M-18 -294l-8 -3M18 -294l8 -3" stroke="#1a1614" stroke-width="2"/>';
    if (o.glasses === 'half') s += '<g fill="#fff" fill-opacity=".14" stroke="#6b4a2a" stroke-width="2"><path d="M-19 -292h16v5q-8 4 -16 0z"/><path d="M3 -292h16v5q-8 4 -16 0z"/></g><path d="M-3 -291h6" stroke="#6b4a2a" stroke-width="2"/>';
    return s + '</g>';
  };
  X.fig = function (who) { return X.person((window.CAST || {})[who] || {}); };

  /* ---------- a slipper orchid out of its pot, as it lies under the lamp; 0,0 is where the leaves meet the roots ----------
     o = {roots: 'long'|'torn', bed: 'bark'|'grit', leaf: 'clean'|'bite'|'scar', moss, label, pot, lichen, n (leaves), s (size), seed} */
  X.plant = function (o) {
    o = o || {};
    var s = '', r = X.rnd(o.seed || 7), n = o.n || 6, sz = o.s || 1, i, a, L, x2, y2, g = '#4f7d36', gl = '#7fa95a';
    /* roots below (none when only the top shows, as in the crate) */
    var nr = o.top ? 0 : o.roots === 'torn' ? 7 : 6;
    for (i = 0; i < nr; i++) {
      a = -0.9 + 1.8 * i / (nr - 1) + (r() - 0.5) * 0.2;
      L = (o.roots === 'torn' ? 18 + r() * 14 : 46 + r() * 22) * sz;
      x2 = Math.sin(a) * L; y2 = Math.cos(a) * L * 0.9 + 6;
      s += '<path d="M0 4Q' + (x2 * 0.4).toFixed(1) + ' ' + (y2 * 0.6).toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '" stroke="#e8e2c8" stroke-width="' + (5.5 * sz).toFixed(1) + '" fill="none" stroke-linecap="round"/>';
      if (o.roots === 'torn') s += '<path d="M' + (x2 - 3).toFixed(1) + ' ' + (y2 - 1).toFixed(1) + 'l2 5 2 -4 2 4" stroke="#8a6a3a" stroke-width="1.6" fill="none"/>';
      else s += '<circle cx="' + x2.toFixed(1) + '" cy="' + y2.toFixed(1) + '" r="' + (2.6 * sz).toFixed(1) + '" fill="#9fc27a"/>';
    }
    /* what is caught among the roots */
    for (i = 0; i < (o.top ? 0 : 16); i++) {
      var px = (r() - 0.5) * 70 * sz, py = 8 + r() * 34 * sz;
      if (o.bed === 'grit') {
        if (i % 3 === 0) s += '<path d="M' + px.toFixed(1) + ' ' + py.toFixed(1) + 'l7 -3 4 5 -6 3z" fill="#6b4a2a" opacity=".85"/>';
        else s += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="' + (1.2 + r() * 1.8).toFixed(1) + '" fill="' + (i % 2 ? '#8e8e86' : '#3a2e24') + '"/>';
      } else s += '<rect x="' + px.toFixed(1) + '" y="' + py.toFixed(1) + '" width="' + (6 + r() * 5).toFixed(1) + '" height="' + (3 + r() * 2).toFixed(1) + '" rx="1.5" fill="' + (i % 2 ? '#a0663a' : '#c48450') + '" transform="rotate(' + ((r() - 0.5) * 60).toFixed(0) + ' ' + px.toFixed(1) + ' ' + py.toFixed(1) + ')"/>';
    }
    if (o.moss) for (i = 0; i < 9; i++) s += '<circle cx="' + ((r() - 0.5) * 30).toFixed(1) + '" cy="' + (2 + r() * 6).toFixed(1) + '" r="' + (3 + r() * 3).toFixed(1) + '" fill="' + (i % 2 ? '#6f9a2c' : '#4f7a20') + '"/>';
    /* leaves: a fan of straps (their own random numbers, so the top looks the same with or without roots) */
    r = X.rnd((o.seed || 7) + 101);
    for (i = 0; i < n; i++) {
      a = -1.15 + 2.3 * i / (n - 1) + (r() - 0.5) * 0.12;
      L = (62 + r() * 26) * sz * (i % 2 ? 0.92 : 1);
      var ex = Math.sin(a) * L, ey = -Math.cos(a) * L * 0.85, cx = ex * 0.35 + Math.sin(a) * 6, cy = ey * 0.75;
      var wdt = 7.5 * sz, nx = Math.cos(a) * wdt, ny = Math.sin(a) * wdt;
      s += '<path d="M' + (-nx).toFixed(1) + ' ' + (-ny).toFixed(1) + 'Q' + (cx - nx).toFixed(1) + ' ' + (cy - ny).toFixed(1) + ' ' + ex.toFixed(1) + ' ' + ey.toFixed(1) +
        'Q' + (cx + nx).toFixed(1) + ' ' + (cy + ny).toFixed(1) + ' ' + nx.toFixed(1) + ' ' + ny.toFixed(1) + 'Z" fill="' + (i % 2 ? g : X.mix(g, gl, 0.3)) + '" stroke="#2f5a22" stroke-width="1"/>';
      s += '<path d="M0 0Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + (ex * 0.94).toFixed(1) + ' ' + (ey * 0.94).toFixed(1) + '" stroke="#9fc27a" stroke-width="1" fill="none" opacity=".6"/>';
      if (o.leaf === 'bite' && i === 1) s += '<circle cx="' + (ex * 0.6 + nx * 0.8).toFixed(1) + '" cy="' + (ey * 0.6 + ny * 0.8).toFixed(1) + '" r="' + (5 * sz).toFixed(1) + '" fill="#e9e4d4"/>';
      if (o.leaf === 'scar' && (i === 2 || i === 4)) s += '<path d="M' + (ex * 0.35).toFixed(1) + ' ' + (ey * 0.35).toFixed(1) + 'L' + (ex * 0.6).toFixed(1) + ' ' + (ey * 0.6).toFixed(1) + '" stroke="#7a5a2a" stroke-width="3" stroke-linecap="round"/>';
      if (o.lichen && (i === 0 || i === 3 || i === 5)) s += '<circle cx="' + (ex * 0.7).toFixed(1) + '" cy="' + (ey * 0.7).toFixed(1) + '" r="3.2" fill="#c9d3b4"/><circle cx="' + (ex * 0.55 + 3).toFixed(1) + '" cy="' + (ey * 0.55).toFixed(1) + '" r="2.2" fill="#d8dfc6"/>';
    }
    if (o.label) s += '<path d="M28 34l20 -66" stroke="#f4f4ee" stroke-width="7" stroke-linecap="round"/><text x="0" y="0" font-family="Patrick Hand,cursive" font-size="8" fill="#2a3a2a" transform="translate(36 6) rotate(-74)">Paph. insigne</text>';
    return s;
  };
  /* a slipper orchid flower: an upright striped sepal, two long side petals and the pouch; 0,0 at its middle, about 150 wide */
  X.flower = function (c) {
    c = c || {};
    var sep = c.sepal || '#ece4cc', str = c.stripe || '#6b7a3a', pet = c.petal || '#b98a7a', pou = c.pouch || '#a8503a';
    var s = '<path d="M-24 -4Q-34 -62 0 -70Q34 -62 24 -4Q0 4 -24 -4z" fill="' + sep + '"/>';
    for (var i = -2; i <= 2; i++) s += '<path d="M' + (i * 7) + ' -4Q' + (i * 9) + ' -40 ' + (i * 4) + ' -64" stroke="' + str + '" stroke-width="2.2" fill="none"/>';
    s += '<path d="M-10 -2Q-46 -10 -76 10Q-70 16 -60 12Q-38 6 -10 10z" fill="' + pet + '"/><path d="M10 -2Q46 -10 76 10Q70 16 60 12Q38 6 10 10z" fill="' + pet + '"/>';
    s += '<g stroke="' + X.mix(pet, '#000000', 0.3) + '" stroke-width="1.4" fill="none"><path d="M-20 3Q-46 0 -66 9M20 3Q46 0 66 9"/></g>';
    s += '<path d="M-20 4Q-26 50 0 52Q26 50 20 4Q0 14 -20 4z" fill="' + pou + '"/><path d="M-12 16Q-14 38 -2 42" stroke="#fff" stroke-width="3" opacity=".35" fill="none"/>';
    s += '<path d="M-8 -2h16l-4 12h-8z" fill="#c9c46a"/>';
    return s;
  };
  /* a pot, for the plants that came in one: 0,0 is the middle of its rim */
  X.pot = function (c) { return '<path d="M-26 0h52l-7 46h-38z" fill="' + (c || '#1e2226') + '"/><path d="M-28 -4h56v8h-56z" fill="' + X.mix(c || '#1e2226', '#ffffff', 0.12) + '"/>'; };

  /* ---------- a white van seen from the side, 0,0 on the ground under its middle, about 440 long ----------
     o = {body, plate, name, door (sliding door open), mud (on the front wheel arch), facing: 1 right / -1 left} */
  X.van = function (o) {
    o = o || {};
    var b = o.body || '#e9ecee', sh = X.mix(b, '#000000', 0.2), s = '', f = o.facing === -1 ? -1 : 1;
    s += '<g transform="scale(' + f + ' 1)">';
    s += '<ellipse cx="0" cy="4" rx="230" ry="12" fill="#000" opacity=".35"/>';
    s += '<path d="M-220 -40V-190q0 -14 14 -14H96q16 0 26 10l58 64q16 4 30 10q10 6 10 20V-40q0 10 -10 10H-210q-10 0 -10 -10z" fill="' + b + '"/>';
    s += '<path d="M-220 -70H230" stroke="' + sh + '" stroke-width="2"/><path d="M-220 -46H230V-40q0 10 -10 10H-210q-10 0 -10 -10z" fill="#2a2e32"/>';
    s += '<path d="M104 -186l58 62H98v-62z" fill="#3d5260"/><path d="M110 -180l44 48" stroke="#9fb4c2" stroke-width="3" opacity=".5"/>';
    s += '<path d="M92 -200v168" stroke="' + sh + '" stroke-width="2"/>';
    if (o.door) s += '<rect x="-30" y="-196" width="118" height="152" fill="#15181b"/><rect x="-150" y="-198" width="118" height="156" fill="' + b + '" stroke="' + sh + '" stroke-width="2"/><path d="M-30 -200h122" stroke="#5a6066" stroke-width="3"/>';
    else s += '<path d="M-30 -200v156" stroke="' + sh + '" stroke-width="2"/><rect x="66" y="-130" width="16" height="5" rx="2" fill="#5a6066"/>';
    s += '<rect x="-214" y="-176" width="6" height="40" fill="#c43a2a"/><rect x="214" y="-104" width="10" height="16" rx="3" fill="#fff4c8"/>';
    if (o.name) s += '<text x="-110" y="-120" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="22" fill="' + (o.nameColour || '#2a5a3a') + '" text-anchor="middle"' + (f < 0 ? ' transform="scale(-1 1) translate(220 0)"' : '') + '>' + o.name + '</text>';
    /* wheel arches and wheels */
    [[-140, 'r'], [140, 'f']].forEach(function (wv) {
      var x = wv[0];
      s += '<path d="M' + (x - 50) + ' -30a50 50 0 0 1 100 0z" fill="#1a1c1e"/>';
      if (o.mud && wv[1] === 'f') s += '<path d="M' + (x - 50) + ' -32a50 50 0 0 1 100 0" stroke="#c9b48a" stroke-width="9" fill="none" opacity=".8"/><path d="M' + (x - 46) + ' -34a46 46 0 0 1 92 0" stroke="#b5642e" stroke-width="3" fill="none" opacity=".7"/>';
      s += '<circle cx="' + x + '" cy="-30" r="40" fill="#141516"/><circle cx="' + x + '" cy="-30" r="22" fill="#8a9096"/><circle cx="' + x + '" cy="-30" r="8" fill="#4a5056"/>';
      for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; s += '<path d="M' + (x + Math.cos(a) * 34).toFixed(1) + ' ' + (-30 + Math.sin(a) * 34).toFixed(1) + 'L' + (x + Math.cos(a) * 40).toFixed(1) + ' ' + (-30 + Math.sin(a) * 40).toFixed(1) + '" stroke="#2a2c2e" stroke-width="3"/>'; }
    });
    s += '</g>';
    if (o.plate) s += '<rect x="' + (f * 222 - 24) + '" y="-62" width="48" height="14" fill="#f2d33a"/><text x="' + (f * 222) + '" y="-51" font-family="IBM Plex Mono,monospace" font-weight="600" font-size="9" fill="#141414" text-anchor="middle">' + o.plate + '</text>';
    return s;
  };

  /* ---------- pollen grains, as they look in the microscope (stained pink, as palynologists stain them) ----------
     type: pine | heather | grass | ivy | hazel | dandelion; r = radius; returns SVG */
  X.grain = function (type, cx, cy, r, rot, sharp) {
    var s = '<g transform="translate(' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ') rotate(' + (rot || 0) + ')">', f = '#e9a6b8', st = '#a8506a', sw = Math.max(1, r / 9);
    if (type === 'pine') {
      s += '<ellipse cx="-' + (r * 0.75) + '" cy="' + (r * 0.12) + '" rx="' + (r * 0.62) + '" ry="' + (r * 0.58) + '" fill="#f3d0da" stroke="' + st + '" stroke-width="' + sw + '"/>' +
        '<ellipse cx="' + (r * 0.75) + '" cy="' + (r * 0.12) + '" rx="' + (r * 0.62) + '" ry="' + (r * 0.58) + '" fill="#f3d0da" stroke="' + st + '" stroke-width="' + sw + '"/>' +
        '<ellipse cx="0" cy="-' + (r * 0.1) + '" rx="' + (r * 0.7) + '" ry="' + (r * 0.5) + '" fill="' + f + '" stroke="' + st + '" stroke-width="' + sw + '"/>';
      for (var i = 0; i < 6; i++) s += '<circle cx="' + ((i % 2 ? 1 : -1) * r * (0.6 + (i % 3) * 0.12)) + '" cy="' + (r * (0.05 + (i % 3) * 0.12)) + '" r="' + (r * 0.07) + '" fill="' + st + '" opacity=".45"/>';
    } else if (type === 'heather') {
      var k = r * 0.48;
      [[-k, -k * 0.5], [k, -k * 0.5], [0, k * 0.75]].forEach(function (p) { s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (r * 0.56).toFixed(1) + '" fill="' + f + '" stroke="' + st + '" stroke-width="' + sw + '"/>'; });
      s += '<circle cx="0" cy="' + (-k * 0.1).toFixed(1) + '" r="' + (r * 0.3).toFixed(1) + '" fill="#d98ea4" stroke="' + st + '" stroke-width="' + sw + '"/>';
      s += '<path d="M0 ' + (-k * 0.4).toFixed(1) + 'V' + (-r * 0.95).toFixed(1) + 'M' + (-k * 0.3).toFixed(1) + ' ' + (k * 0.1).toFixed(1) + 'L' + (-r * 0.85).toFixed(1) + ' ' + (r * 0.45).toFixed(1) + 'M' + (k * 0.3).toFixed(1) + ' ' + (k * 0.1).toFixed(1) + 'L' + (r * 0.85).toFixed(1) + ' ' + (r * 0.45).toFixed(1) + '" stroke="' + st + '" stroke-width="' + sw + '"/>';
    } else if (type === 'grass') {
      s += '<circle r="' + r + '" fill="' + f + '" stroke="' + st + '" stroke-width="' + sw + '"/><circle cx="' + (r * 0.45) + '" cy="-' + (r * 0.35) + '" r="' + (r * 0.17) + '" fill="#fbe3ea" stroke="' + st + '" stroke-width="' + (sw * 1.6) + '"/>';
    } else if (type === 'ivy') {
      s += '<ellipse rx="' + r + '" ry="' + (r * 0.9) + '" fill="' + f + '" stroke="' + st + '" stroke-width="' + sw + '"/>';
      for (var j = 0; j < 14; j++) s += '<circle cx="' + ((((j * 37) % 17) / 17 - 0.5) * r * 1.4).toFixed(1) + '" cy="' + ((((j * 53) % 13) / 13 - 0.5) * r * 1.2).toFixed(1) + '" r="' + (r * 0.06).toFixed(1) + '" fill="' + st + '" opacity=".4"/>';
      [0, 120, 240].forEach(function (d) { s += '<path d="M0 -' + (r * 0.18) + 'V-' + (r * 0.9) + '" stroke="' + st + '" stroke-width="' + (sw * 2.2) + '" stroke-linecap="round" transform="rotate(' + d + ')"/>'; });
    } else if (type === 'hazel') {
      s += '<path d="M0 -' + r + 'Q' + (r * 0.95) + ' -' + (r * 0.3) + ' ' + (r * 0.88) + ' ' + (r * 0.5) + 'Q0 ' + (r * 0.95) + ' -' + (r * 0.88) + ' ' + (r * 0.5) + 'Q-' + (r * 0.95) + ' -' + (r * 0.3) + ' 0 -' + r + 'z" fill="' + f + '" stroke="' + st + '" stroke-width="' + sw + '"/>';
      [[0, -r * 0.82], [r * 0.72, r * 0.42], [-r * 0.72, r * 0.42]].forEach(function (p) { s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (r * 0.13).toFixed(1) + '" fill="#fbe3ea" stroke="' + st + '" stroke-width="' + (sw * 1.4) + '"/>'; });
    } else if (type === 'dandelion') {
      for (var m = 0; m < 18; m++) { var a = m * Math.PI / 9; s += '<path d="M' + (Math.cos(a) * r * 0.86).toFixed(1) + ' ' + (Math.sin(a) * r * 0.86).toFixed(1) + 'L' + (Math.cos(a) * r * 1.14).toFixed(1) + ' ' + (Math.sin(a) * r * 1.14).toFixed(1) + '" stroke="' + st + '" stroke-width="' + sw + '"/>'; }
      s += '<circle r="' + (r * 0.9) + '" fill="' + f + '" stroke="' + st + '" stroke-width="' + sw + '"/>';
      [[-0.35, -0.3], [0.32, -0.32], [0, 0.38], [-0.42, 0.22], [0.42, 0.2]].forEach(function (p) { s += '<path d="M' + (p[0] * r).toFixed(1) + ' ' + (p[1] * r - r * 0.18).toFixed(1) + 'l' + (r * 0.17).toFixed(1) + ' ' + (r * 0.1).toFixed(1) + 'v' + (r * 0.18).toFixed(1) + 'l-' + (r * 0.17).toFixed(1) + ' ' + (r * 0.1).toFixed(1) + 'l-' + (r * 0.17).toFixed(1) + ' -' + (r * 0.1).toFixed(1) + 'v-' + (r * 0.18).toFixed(1) + 'z" fill="#fbe3ea" stroke="' + st + '" stroke-width="' + (sw * 0.9) + '"/>'; });
    }
    return s + '</g>';
  };
  X.GRAINS = ['pine', 'heather', 'grass', 'ivy', 'hazel', 'dandelion'];
  return X;
})();
