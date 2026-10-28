/* Under Seal - what every room of the story shares: a few sounds, small helpers, the people as figures, the
   continuity labels of the exhibits (evidence, not answers), and the drawing of a broken panel of glass and of the
   edge of a crack under the lens. Loaded after engine.js (cast.js before it). */
window.CO = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so that the sound button switches them) ---------- */
  X.sfx = {
    stamp: function () { T({ f: 105, f2: 50, dur: 0.18, peak: 0.5 }); B({ type: 'lowpass', f: 900, dur: 0.06, peak: 0.35 }); },
    pen: function () { B({ type: 'highpass', f: 3600, dur: 0.12, peak: 0.05, a: 0.02 }); B({ type: 'highpass', f: 3000, dur: 0.1, peak: 0.04, when: 0.14 }); },
    tape: function () { B({ type: 'bandpass', f: 2600, f2: 1400, q: 1.5, dur: 0.3, peak: 0.07, a: 0.02 }); },
    rustle: function () { B({ type: 'highpass', f: 1800, dur: 0.26, peak: 0.07, a: 0.06 }); },
    chink: function () { T({ f: 2950, dur: 0.22, peak: 0.05 }); T({ f: 4410, dur: 0.16, peak: 0.025, when: 0.01 }); },
    slide: function () { B({ type: 'bandpass', f: 1500, f2: 2600, q: 0.7, dur: 0.16, peak: 0.04, a: 0.04 }); },
    click: function () { B({ dur: 0.015, f: 4200, q: 4, peak: 0.12 }); },
    thud: function () { T({ f: 90, f2: 55, dur: 0.22, peak: 0.4 }); B({ type: 'lowpass', f: 500, dur: 0.1, peak: 0.25 }); },
    beep: function () { T({ type: 'square', f: 1568, dur: 0.06, peak: 0.035 }); T({ type: 'square', f: 1568, dur: 0.06, peak: 0.035, when: 0.12 }); },
    bang: function () { B({ type: 'lowpass', f: 320, dur: 0.5, peak: 0.16, a: 0.01 }); },      /* a firework a long way off, through a wall */
    van: function () { T({ type: 'sawtooth', f: 62, f2: 70, dur: 1.8, peak: 0.05, a: 0.4 }); B({ type: 'lowpass', f: 300, dur: 1.6, peak: 0.08, a: 0.4 }); }
  };
  /* A door opens. The music answers in the room's own key, as it does after ER.exit; without music, three plain notes. */
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };

  /* ---------- small helpers ---------- */
  X.thing = function (sel, word, line, busy) {           /* a thing in the scene that has a name and something to say */
    ER.$$(sel).forEach(function (n) {
      n.addEventListener('click', function (e) {
        if (busy && busy()) return;
        if (word) ER.wordAt(e.clientX, e.clientY, word);
        if (line) ER.say(typeof line === 'function' ? line() : line);
      });
    });
  };
  X.mine = function (id, title, html, quiet) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'mine', 'Your notes', quiet); };
  X.terms = function (list) {                             /* the subject's words go into the notebook when the page that teaches them has been read */
    var G = window.GLOSS || [];
    list.forEach(function (w) { for (var i = 0; i < G.length; i++) if (G[i][0] === w) { ER.addWord(G[i][0], G[i][1]); break; } });
  };
  X.minutesPlayed = function () {
    var st = ER.state(), end = ER.flag('tEnd') || Date.now();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((end - (st.t0 || end)) / 60000));
  };
  X.clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  X.mix = function (a, b, k) {
    var i, out = '#', va, vb;
    for (i = 1; i < 7; i += 2) { va = parseInt(a.substr(i, 2), 16); vb = parseInt(b.substr(i, 2), 16); out += ('0' + Math.round(va + (vb - va) * k).toString(16)).slice(-2); }
    return out;
  };
  X.rnd = function (seed) { var s = seed || 1; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  X.esc = function (s) { return String(s).replace(/&rsquo;/g, '’').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”').replace(/&middot;/g, '·').replace(/&times;/g, '×'); };

  /* A room's bookkeeping: the people and papers that must be seen before its lock, the pips, the door out.
     o = {need: [keys], total: pips (need + 1 for the lock), file: flag name of the next page} */
  X.room = function (o) {
    var R = { busy: true }, told = ER.flag(o.id + '-told') || {};
    R.next = ER.flag(o.id + '-file') || null;
    R.tell = function (k) { if (told[k]) return false; told[k] = 1; ER.flag(o.id + '-told', told); R.paint(); return true; };
    R.told = function (k) { return !!told[k]; };
    R.ready = function () { return o.need.every(function (k) { return told[k]; }); };
    R.missing = function () { return o.need.filter(function (k) { return !told[k]; }); };
    R.isBusy = function () { return R.busy; };
    R.paint = function () {
      ER.pips(o.need.filter(function (k) { return told[k]; }).length + (R.next ? 1 : 0), o.need.length + 1);
      if (o.lock) { var n = ER.$(o.lock); if (n) n.classList.toggle('ready', R.ready() && !R.next); }
    };
    R.solve = function (file) {
      R.next = file; ER.flag(o.id + '-file', file);
      var s0 = ER.state(); s0.done = s0.done || {}; s0.done[o.id] = 1; ER.persist(true);
      R.paint();
    };
    R.go = function () { var b = ER.$('#go'); if (b) b.classList.add('on'); };
    var gb = ER.$('#go');
    if (gb) gb.addEventListener('click', function () { if (R.next && !R.busy) ER.leave(R.next); });
    return R;
  };

  /* ---------- the people: a standing figure, feet at 0,0, about 330 tall. bust = no shadow, for FACE() ---------- */
  X.person = function (o, bust) {
    o = o || {};
    var sk = o.skin || '#e4c19c', hr = o.hair || '#3a2a20', coat = o.coat || '#555', dk = X.mix(coat, '#000000', 0.32);
    var skd = X.mix(sk, '#5a2a14', 0.24), hem = o.long ? -40 : -96, s = '', w = o.w || 1, st = o.hairStyle || 'short';
    if (!bust) s += '<ellipse cx="0" cy="3" rx="' + (54 * w) + '" ry="8" fill="#000" opacity=".32"/>';
    s += '<g transform="scale(' + w + ' 1)">';
    s += '<path d="M-19 0v-122h16v122zM3 0v-122h16v122z" fill="' + (o.legs || '#2a2a30') + '"/>';
    s += '<path d="M-24 0h22v8h-26zM2 0h22v8h-22z" fill="' + (o.shoes || '#151210') + '"/>';
    if (st === 'bun') s += '<circle cx="2" cy="-331" r="13" fill="' + hr + '"/>';
    if (st === 'bob') s += '<path d="M-33 -292q0 -42 33 -42t33 42v30h-12v-24h-42v24h-12z" fill="' + hr + '"/>';
    if (o.hood) s += '<path d="M-36 -268q-4 -78 36 -80q40 2 36 80q-10 6 -14 -4q2 -54 -22 -56q-24 2 -22 56q-4 10 -14 4z" fill="' + o.hood + '"/>';
    /* coat */
    s += '<path d="M-45 ' + hem + 'C-52 -150 -50 -230 -30 -248L30 -248C50 -230 52 -150 45 ' + hem + 'Z" fill="' + coat + '"/>';
    s += '<path d="M-45 ' + hem + 'C-52 -150 -50 -230 -30 -248L-19 -248C-33 -200 -30 -140 -26 ' + hem + 'Z" fill="#000" opacity=".13"/>';
    if (o.lapel !== false) s += '<path d="M-14 -248L0 -206L14 -248Z" fill="' + (o.shirt || '#eee') + '"/>' +
      '<path d="M-14 -248L-24 -212L-6 -194M14 -248L24 -212L6 -194" fill="none" stroke="' + dk + '" stroke-width="2.4"/>';
    if (o.zip) s += '<path d="M0 -246V' + (hem + 2) + '" stroke="' + dk + '" stroke-width="2"/>';
    if (o.buttons) for (var b = 0; b < 3; b++) s += '<circle cx="0" cy="' + (-178 + b * 30) + '" r="2.6" fill="' + dk + '"/>';
    if (o.pocket) s += '<path d="M14 -214h18v4h-18z" fill="' + dk + '" opacity=".6"/><path d="M18 -222v10M23 -224v12" stroke="' + o.pocket + '" stroke-width="2.4"/>';
    if (o.scarf) s += '<path d="M-22 -252q22 14 44 0l2 12q-24 14 -48 0z" fill="' + o.scarf + '"/><path d="M8 -244l10 52 8 -2 -6 -50z" fill="' + o.scarf + '"/><path d="M10 -196l14 -2M11 -201l13 -2" stroke="' + X.mix(o.scarf, '#000000', 0.3) + '" stroke-width="1.6"/>';
    if (o.chain) s += '<path d="M-10 -250q-4 40 10 58q14 -18 10 -58" stroke="' + o.chain + '" stroke-width="1.3" fill="none"/>' +
      (o.lens ? '<circle cx="0" cy="-186" r="7" fill="#dfeef4" fill-opacity=".55" stroke="' + o.chain + '" stroke-width="2.4"/>' : '<path d="M-9 -192h7v4h-7zM2 -192h7v4h-7z" fill="none" stroke="' + o.chain + '" stroke-width="1.5"/>');
    if (o.badge) s += '<rect x="17" y="-232" width="15" height="20" rx="2" fill="#f4f6f2"/><rect x="20" y="-228" width="9" height="5" fill="' + o.badge + '"/>';
    /* arms and hands */
    var hand = o.gloves || sk, P = o.pose || 'down',
      arm = function (d) { return '<path d="' + d + '" stroke="' + (o.sleeve || coat) + '" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; },
      hd = function (x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="8" fill="' + hand + '"/>'; };
    if (P === 'fold') s += arm('M-39 -234q-12 52 2 70l34 -4') + arm('M39 -234q12 52 -2 70l-34 -4') + hd(-4, -168) + hd(4, -164);
    else if (P === 'clip') s += arm('M-39 -234q-12 60 -6 114') + arm('M39 -234q16 44 2 76l-22 -8') + hd(-45, -118) +
      '<rect x="0" y="-198" width="36" height="46" rx="2" fill="' + (o.folder || '#6a4a2a') + '" transform="rotate(-8 18 -175)"/><rect x="6" y="-192" width="24" height="32" fill="#f2efe4" transform="rotate(-8 18 -175)"/><rect x="11" y="-200" width="14" height="6" fill="#9aa0a6" transform="rotate(-8 18 -175)"/>' + hd(19, -168);
    else if (P === 'mug') s += arm('M-39 -234q-12 60 -6 114') + arm('M39 -234q16 44 2 76l-22 -8') + hd(-45, -118) + '<path d="M8 -196h20l-2 24h-16z" fill="' + (o.mugc || '#e9e2cf') + '"/><path d="M28 -190q8 2 4 10" stroke="' + (o.mugc || '#e9e2cf') + '" stroke-width="2.5" fill="none"/>' + hd(19, -172);
    else if (P === 'torch') s += arm('M-39 -234q-12 60 -6 114') + arm('M39 -234q16 40 6 70l-6 -6') + hd(-45, -118) + '<rect x="28" y="-178" width="10" height="30" rx="3" fill="#2a2a2a" transform="rotate(-62 34 -166)"/><circle cx="50" cy="-176" r="5" fill="#fff6c8"/>' + hd(40, -168);
    else if (P === 'stick') s += arm('M-39 -234q-12 60 -6 114') + arm('M39 -234q14 60 14 118') + hd(-45, -118) + hd(54, -116) + '<path d="M56 -112L62 0" stroke="#3a2618" stroke-width="5" stroke-linecap="round"/><path d="M48 -116q8 -10 16 0" stroke="#3a2618" stroke-width="5" fill="none"/>';
    else if (P === 'hands') s += arm('M-39 -234q-10 50 10 74') + arm('M39 -234q10 50 -10 74') + hd(-29, -158) + hd(29, -158);
    else s += arm('M-39 -234q-12 60 -6 114') + arm('M39 -234q12 60 6 114') + hd(-45, -118) + hd(45, -118);
    /* neck, head, face */
    s += '<rect x="-8" y="-270" width="16" height="24" fill="' + skd + '"/>';
    s += '<ellipse cx="-25" cy="-288" rx="5" ry="8" fill="' + skd + '"/><ellipse cx="25" cy="-288" rx="5" ry="8" fill="' + skd + '"/>';
    s += '<ellipse cx="0" cy="-290" rx="24.5" ry="29" fill="' + sk + '"/>';
    s += '<ellipse cx="-10" cy="-291" rx="4.4" ry="3.1" fill="#f7f1e6"/><ellipse cx="10" cy="-291" rx="4.4" ry="3.1" fill="#f7f1e6"/>' +
      '<circle cx="-9.4" cy="-291" r="2.2" fill="#231a14"/><circle cx="10.6" cy="-291" r="2.2" fill="#231a14"/>';
    if (o.lines) s += '<path d="M-17 -284q4 3 8 0M9 -284q4 3 8 0M-12 -272q3 2 4 6M12 -272q-3 2 -4 6" stroke="' + skd + '" stroke-width="1.3" fill="none"/>';
    s += '<path d="M-16 -299q6 -4 12 -1M4 -300q6 -3 12 1" stroke="' + (o.brows || X.mix(hr, '#000000', 0.2)) + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    s += '<path d="M0 -288q-4 10 0 12q3 1 5 -1" stroke="' + skd + '" stroke-width="2" fill="none" stroke-linecap="round"/>';
    if (o.mask) s += '<path d="M-20 -284q20 -6 40 0v16q-20 12 -40 0z" fill="' + o.mask + '"/><path d="M-20 -280l-6 -6M20 -280l6 -6" stroke="' + o.mask + '" stroke-width="2"/>';
    else s += o.mouth === 'smile' ? '<path d="M-8 -274q8 6 16 0" stroke="' + (o.lips || '#8c4a3c') + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' :
      o.mouth === 'firm' ? '<path d="M-8 -273q8 -2 16 0" stroke="' + (o.lips || '#8c4a3c') + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' :
      '<path d="M-7 -273h14" stroke="' + (o.lips || '#8c4a3c') + '" stroke-width="2.4" stroke-linecap="round"/>';
    /* hair in front */
    if (st === 'short') s += '<path d="M-25 -294q-2 -36 25 -36t25 36q-8 -20 -25 -20t-25 20z" fill="' + hr + '"/>';
    else if (st === 'bob') s += '<path d="M-25 -296q3 -30 25 -31q22 1 25 31q-10 -14 -25 -14q-15 0 -25 14z" fill="' + hr + '"/>';
    else if (st === 'bun') s += '<path d="M-25 -292q-1 -36 25 -37q26 1 25 37q-6 -18 -25 -20q-19 2 -25 20z" fill="' + hr + '"/>';
    else if (st === 'crop') s += '<path d="M-24 -298q0 -30 24 -31q24 1 24 31q-8 -16 -24 -17q-16 1 -24 17z" fill="' + hr + '"/>';
    if (o.glasses === 'round') s += '<g fill="#fff" fill-opacity=".14" stroke="#1a1614" stroke-width="2"><circle cx="-10" cy="-291" r="8"/><circle cx="10" cy="-291" r="8"/></g><path d="M-2 -291h4M-18 -292l-7 -3M18 -292l7 -3" stroke="#1a1614" stroke-width="2"/>';
    if (o.glasses === 'half') s += '<g fill="#fff" fill-opacity=".14" stroke="#6b4a2a" stroke-width="2"><path d="M-19 -290h16v5q-8 4 -16 0z"/><path d="M3 -290h16v5q-8 4 -16 0z"/></g><path d="M-3 -289h6" stroke="#6b4a2a" stroke-width="2"/>';
    if (o.glasses === 'square') s += '<g fill="#fff" fill-opacity=".12" stroke="#222" stroke-width="2.4"><rect x="-19" y="-298" width="15" height="12" rx="2"/><rect x="4" y="-298" width="15" height="12" rx="2"/></g><path d="M-4 -293h8" stroke="#222" stroke-width="2.4"/>';
    if (o.pencil) s += '<path d="M21 -312l12 22" stroke="#e8b631" stroke-width="4" stroke-linecap="round"/><path d="M33 -290l2 4" stroke="#3a2a1a" stroke-width="3"/>';
    return s + '</g>';
  };
  X.fig = function (who) { return X.person((window.CAST || {})[who] || {}); };

  /* ---------- the continuity labels of case G06/1187 (and the one stapled to the wrong bag) ----------
     Each row: [date, time, handed over by, received by, what happened]. Rows can carry a kind:
     'corr' a time crossed out and initialled, 'long' the store kept it for twenty years, 'tape' a mended corner. */
  var POL = [['05.11.06', '', 'F. Holroyd', 'H. Jagger', 'Into the property store, Gatherley police station'],
    ['07.11.06', '08.20', 'H. Jagger', 'G. Firth', 'To the Laboratory by courier'],
    ['07.11.06', '11.45', 'G. Firth', 'J. Grayling', 'Received in the Laboratory store. Case G06/1187']];
  function pol(t1, t2) { var a = POL.map(function (r) { return r.slice(); }); a[0][1] = t1; return a; }
  X.LABELS = {
    'FH/2': { what: 'Tape lifts (four sheets) from the glass panel of the rear door: <b>lower part, by the latch</b>, both faces', where: 'Iveson&rsquo;s, 14 Fore Street, rear door', seized: ['05.11.06', '01.10', 'PC F. Holroyd'], seal: '03910', bag: ['03910', '04503'],
      rows: [['05.11.06', '01.10', '', 'F. Holroyd', 'Seized at the scene and sealed, seal 03910']].concat(pol('03.10')).concat([
        ['10.11.06', '<s>11.00</s> 11.20 <span class="ini">GH</span>', 'J. Grayling', 'G. Hesketh', 'Microscope room, for fibres', 'corr'],
        ['13.11.06', '16.40', 'G. Hesketh', 'J. Grayling', 'Opened by a cut at the side and resealed, seal 04503']]) },
    'FH/3': { what: 'Tape lifts (four sheets) from the glass panel of the rear door: <b>upper part</b>, both faces', where: 'Iveson&rsquo;s, 14 Fore Street, rear door', seized: ['05.11.06', '01.20', 'PC F. Holroyd'], seal: '03911', bag: ['03911', '04504'],
      rows: [['05.11.06', '01.20', '', 'F. Holroyd', 'Seized at the scene and sealed, seal 03911']].concat(pol('03.10')).concat([
        ['10.11.06', '11.20', 'J. Grayling', 'G. Hesketh', 'Microscope room, for fibres'],
        ['13.11.06', '16.40', 'G. Hesketh', 'J. Grayling', 'Opened by a cut at the side and resealed, seal 04504']]) },
    'FH/4': { what: 'Glass panel from the rear door, removed whole. Yard side marked S1', where: 'Iveson&rsquo;s, 14 Fore Street, rear door', seized: ['05.11.06', '01.40', 'PC F. Holroyd'], seal: '03912', bag: ['04417', '04502'],
      rows: [['05.11.06', '01.40', '', 'F. Holroyd', 'Seized at the scene and sealed, seal 03912']].concat(pol('03.10')).concat([
        ['08.11.06', '14.10', 'J. Grayling', 'G. Ingham', 'To Photographic, to be photographed'],
        ['09.11.06', '09.05', '', 'J. Grayling', 'Received from Photographic'],
        ['10.11.06', '09.30', 'J. Grayling', 'G. Hesketh', 'Glass bench, for glass'],
        ['13.11.06', '16.40', 'G. Hesketh', 'J. Grayling', 'Opened by a cut at the side and resealed, seal 04502']]) },
    'FH/5': { what: 'Glove, black, knitted, left hand. Found by the bins in the yard', where: 'Iveson&rsquo;s, 14 Fore Street, back yard', seized: ['05.11.06', '01.50', 'PC F. Holroyd'], seal: '03913', bag: ['03913', '04510', '26-00881'],
      rows: [['05.11.06', '01.50', '', 'F. Holroyd', 'Seized at the scene and sealed, seal 03913']].concat(pol('03.10')).concat([
        ['10.11.06', '09.30', 'J. Grayling', 'G. Hesketh', 'Bench 3, for fibres'],
        ['10.11.06', '15.15', 'G. Hesketh', 'J. Hirst', 'DNA unit, for DNA'],
        ['13.11.06', '12.00', 'J. Hirst', 'J. Grayling', 'Swabbed, resealed, seal 04510'],
        ['28.10.26', '10.05', 'J. Grayling', 'H. Jalloh', 'DNA again, at the Commission&rsquo;s request', 'long'],
        ['29.10.26', '15.30', 'H. Jalloh', 'J. Grayling', 'Swabbed, resealed, seal 26-00881']]) },
    'FH/6': { what: 'Jumper, red, wool, crew neck', where: 'From Joel Garside, at 21 Harcourt Road', seized: ['05.11.06', '14.20', 'PC F. Holroyd'], seal: '03921', bag: ['03921', '04505'],
      rows: [['05.11.06', '14.20', '', 'F. Holroyd', 'Seized from Mr J. Garside and sealed, seal 03921']].concat(pol('16.00')).concat([
        ['10.11.06', '09.30', 'J. Grayling', 'G. Hesketh', 'Bench 3, for fibres'],
        ['13.11.06', '16.40', 'G. Hesketh', 'J. Grayling', 'Opened by a cut at the side and resealed, seal 04505']]) },
    'FH/7': { what: 'Mouth swab, Joel Garside (reference sample)', where: 'Gatherley police station', seized: ['05.11.06', '15.05', 'PC F. Holroyd'], seal: '03922', bag: ['03922', '04509', '26-00882'],
      rows: [['05.11.06', '15.05', '', 'F. Holroyd', 'Taken from Mr J. Garside, with his consent, and sealed, seal 03922']].concat(pol('15.30')).concat([
        ['10.11.06', '10.15', 'J. Grayling', 'J. Hirst', 'DNA unit, reference profile'],
        ['10.11.06', '17.00', 'J. Hirst', 'J. Grayling', 'Sample taken, resealed, seal 04509'],
        ['28.10.26', '10.05', 'J. Grayling', 'H. Jalloh', 'DNA again, at the Commission&rsquo;s request', 'long'],
        ['29.10.26', '15.30', 'H. Jalloh', 'J. Grayling', 'Resealed, seal 26-00882. Label torn at one corner: taped, and signed across the tape, H.J.', 'tape']]) }
  };
  X.LABEL_ORDER = ['FH/2', 'FH/3', 'FH/4', 'FH/5', 'FH/6', 'FH/7'];
  /* the continuity label as a paper tag; o.mark = row number with a pencil query, o.clear = stamped */
  X.label = function (ref, o) {
    var L = X.LABELS[ref], s = '', i;
    o = o || {};
    s += '<div class="tag-head"><b>' + ref + '</b><span>Lab case G06/1187 &middot; R v Garside</span></div>';
    s += '<p class="tag-what">' + L.what + '</p><p class="tag-where">' + L.where + '</p>';
    s += '<table class="tag-rows"><tr><th></th><th>Date</th><th>Time</th><th>Handed over by</th><th>Received by</th><th>What for</th></tr>';
    L.rows.forEach(function (r, j) {
      i = j + 1;
      s += '<tr class="row' + (o.mark === i ? ' q' : '') + '" data-r="' + i + '"><td class="n">' + i + '</td><td>' + r[0] + '</td><td>' + r[1] + '</td><td class="sg">' + (r[2] || (j ? '<span class="blank"></span>' : '<span class="seized">(the start)</span>')) + '</td><td class="sg">' + r[3] + '</td><td class="nt">' + r[4] + '</td></tr>';
    });
    s += '</table><p class="tag-seals">Seals on the bag now: ' + L.bag.map(function (n) { return '<span class="seal">' + n + '</span>'; }).join(' ') + '</p>';
    if (o.clear) s += '<div class="clr">CLEAR</div>';
    return s;
  };

  /* ---------- broken glass ----------
     A panel on a cutting mat, in centimetres. spec = {w, h, ox, oy (where the panel's corner lies on the mat), mw, mh (mat size),
     x0, y0 (the mat's corner in the drawing), k (px per cm), holes: [{x, y, r}], cracks: [{id, kind, pts}], stickers: [{x, y, w, h, html}]} */
  X.radial = function (c, e, seed, flat) {                    /* a crack from the hole out to e: straight near the hole (where the rings meet it), wandering further out */
    var r = X.rnd(seed || 3), dx = e[0] - c[0], dy = e[1] - c[1], L = Math.sqrt(dx * dx + dy * dy), pts = [], n, i, t, j;
    var nx = -dy / L, ny = dx / L;
    pts.push([c[0] + dx * (1.0 / L), c[1] + dy * (1.0 / L)]);
    t = Math.min(0.95, 10 / L); pts.push([c[0] + dx * t, c[1] + dy * t]);
    n = Math.max(1, Math.round((L - 10) / 4));
    for (i = 1; i < n; i++) { t = (10 + (L - 10) * i / n) / L; if (t >= 1) break; j = flat ? 0 : (r() - 0.5) * 0.9 * Math.min(1, (1 - t) * 4); pts.push([c[0] + dx * t + nx * j, c[1] + dy * t + ny * j]); }
    pts.push([e[0], e[1]]);
    return pts;
  };
  X.ring = function (c, R, a1, a2) {                    /* an arc round the hole from one radial crack to the next (angles in degrees) */
    var pts = [], n = Math.max(3, Math.round(Math.abs(a2 - a1) / 8)), i, a;
    if (a2 < a1) a2 += 360;
    for (i = 0; i <= n; i++) { a = (a1 + (a2 - a1) * i / n) * Math.PI / 180; pts.push([c[0] + Math.cos(a) * R * (1 + 0.02 * Math.sin(i * Math.PI / n) * Math.sin(i * 0.6 + R)), c[1] + Math.sin(a) * R * (1 + 0.02 * Math.sin(i * Math.PI / n) * Math.sin(i * 0.6 + R))]); }
    return pts;
  };
  X.ang = function (c, e) { var a = Math.atan2(e[1] - c[1], e[0] - c[0]) * 180 / Math.PI; return a < 0 ? a + 360 : a; };
  X.paneSVG = function (sp) {
    var k = sp.k, s = '', i, PX = function (p) { return (sp.x0 + (sp.ox + p[0]) * k).toFixed(1) + ' ' + (sp.y0 + (sp.oy + p[1]) * k).toFixed(1); };
    /* the cutting mat, with a line every centimetre and a number every five */
    s += '<rect x="' + sp.x0 + '" y="' + sp.y0 + '" width="' + sp.mw * k + '" height="' + sp.mh * k + '" fill="#2f5a4a" rx="3"/>';
    for (i = 0; i <= sp.mw; i++) s += '<path d="M' + (sp.x0 + i * k) + ' ' + sp.y0 + 'v' + sp.mh * k + '" stroke="#5f8a78" stroke-width="' + (i % 5 ? 0.6 : 1.4) + '" opacity="' + (i % 5 ? 0.55 : 0.9) + '"/>';
    for (i = 0; i <= sp.mh; i++) s += '<path d="M' + sp.x0 + ' ' + (sp.y0 + i * k) + 'h' + sp.mw * k + '" stroke="#5f8a78" stroke-width="' + (i % 5 ? 0.6 : 1.4) + '" opacity="' + (i % 5 ? 0.55 : 0.9) + '"/>';
    for (i = 0; i <= sp.mw; i += 5) s += '<text x="' + (sp.x0 + i * k) + '" y="' + (sp.y0 - 5) + '" class="tM" font-size="11" fill="#c9d8cf" text-anchor="middle">' + i + '</text>';
    for (i = 0; i <= sp.mh; i += 5) s += '<text x="' + (sp.x0 - 5) + '" y="' + (sp.y0 + i * k + 4) + '" class="tM" font-size="11" fill="#c9d8cf" text-anchor="end">' + i + '</text>';
    /* the panel: a pale sheet with a sheen */
    s += '<rect x="' + (sp.x0 + sp.ox * k) + '" y="' + (sp.y0 + sp.oy * k) + '" width="' + sp.w * k + '" height="' + sp.h * k + '" fill="#d9ecea" fill-opacity=".34" stroke="#e9f6f4" stroke-width="2.2"/>';
    s += '<path d="M' + (sp.x0 + (sp.ox + 2) * k) + ' ' + (sp.y0 + (sp.oy + sp.h - 2) * k) + 'L' + (sp.x0 + (sp.ox + sp.w * 0.45) * k) + ' ' + (sp.y0 + (sp.oy + 2) * k) + '" stroke="#ffffff" stroke-width="16" opacity=".06"/>';
    (sp.stickers || []).forEach(function (t) { s += '<g transform="translate(' + PX([t.x, t.y]) + ')">' + t.svg + '</g>'; });
    /* the cracks: a thin bright line with a dark one beside it, and a wide invisible line to click */
    sp.cracks.forEach(function (c) {
      var d = 'M' + c.pts.map(PX).join('L');
      s += '<g class="ck" data-id="' + c.id + '" data-kind="' + c.kind + '"><path d="' + d + '" stroke="#000" stroke-width="16" fill="none" opacity="0" class="ckhit"/>' +
        '<path d="' + d + '" stroke="#0e2a24" stroke-width="2.6" fill="none" opacity=".55" transform="translate(1 1)"/>' +
        '<path d="' + d + '" stroke="' + (c.kind === 'old' ? '#9aa69c' : '#f4fbfa') + '" stroke-width="' + (c.kind === 'old' ? 1.8 : 1.5) + '" fill="none" class="ckline"/></g>';
    });
    (sp.holes || []).forEach(function (h, j) {
      var r = X.rnd(11 + j * 7), pts = [], a;
      for (a = 0; a < 360; a += 30) { var rr = h.r * (0.75 + r() * 0.5); pts.push([h.x + Math.cos(a * Math.PI / 180) * rr, h.y + Math.sin(a * Math.PI / 180) * rr]); }
      s += '<path d="M' + pts.map(PX).join('L') + 'Z" fill="#163a32" stroke="#f4fbfa" stroke-width="1.4"/>';
      if (h.name) s += '<text x="' + (sp.x0 + (sp.ox + h.x + h.r + 1.2) * k) + '" y="' + (sp.y0 + (sp.oy + h.y + h.r + 2.6) * k) + '" class="tK" font-size="18" fill="#ffd34a">' + h.name + '</text>';
    });
    return s;
  };
  /* the edge of a crack under the lens: the face that lies up above, the face that lies down below; the rib marks meet one face at a right angle (square = 'up' or 'down') */
  X.edgeSVG = function (x, y, w, h, square) {
    var s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#cfe3df"/>', i, n = 9;
    s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="url(#edgeG)"/>';
    if (square === 'old') {
      s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#8a948c" opacity=".55"/>';
      for (i = 0; i < 40; i++) s += '<circle cx="' + (x + 8 + (i * 53) % (w - 16)) + '" cy="' + (y + 6 + (i * 29) % (h - 12)) + '" r="' + (1 + i % 3) + '" fill="#4a4a40" opacity=".5"/>';
      return s;
    }
    for (i = 0; i < n; i++) {
      var x1 = x + 22 + i * (w - 70) / (n - 1), d;
      /* a rib mark: at right angles to the square face, curving over until it runs nearly along the other face */
      if (square === 'down') d = 'M' + x1 + ' ' + (y + h) + 'C' + x1 + ' ' + (y + h * 0.45) + ' ' + (x1 + 10) + ' ' + (y + h * 0.18) + ' ' + (x1 + 34) + ' ' + (y + 2);
      else d = 'M' + x1 + ' ' + y + 'C' + x1 + ' ' + (y + h * 0.55) + ' ' + (x1 + 10) + ' ' + (y + h * 0.82) + ' ' + (x1 + 34) + ' ' + (y + h - 2);
      s += '<path d="' + d + '" stroke="#2c5a52" stroke-width="2.2" fill="none" opacity=".8"/><path d="' + d + '" stroke="#f4fbfa" stroke-width="1" fill="none" transform="translate(-2 0)" opacity=".8"/>';
    }
    return s;
  };

  return X;
})();
