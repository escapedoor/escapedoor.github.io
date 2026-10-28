/* The Fourth Draft - the Goslings of Lewes, in flat colour with a soft dark outline.
   FACE(who)  a bust for an interview (200 x 260): phoebe, martin, alison, elliot, gran
   HT.fig(o)  a standing figure, feet at 0,0, about 300 units high before scaling by o.h / 300
              o.kind: 'woman', 'man', 'girl', 'teen' (a tall boy in a hoodie), 'gran' (skirt and coat)
   Nothing in here knows an answer. */
(function () {
  'use strict';
  var INK = '#2a2420';
  function K(w) { return ' stroke="' + INK + '" stroke-width="' + (w || 2.4) + '" stroke-linejoin="round" stroke-linecap="round"'; }

  function fig(o) {
    o = o || {};
    var s = '', kind = o.kind || 'woman', skin = o.skin || '#efc9a8', top = o.top || '#5a6a7a', hair = o.hair || '#4a3424';
    var kid = kind === 'girl', tall = kind === 'teen' || kind === 'man';
    var sh = kid ? -168 : (kind === 'gran' ? -214 : -228), hy = kid ? -194 : (kind === 'gran' ? -238 : -254);
    s += '<ellipse cx="0" cy="2" rx="40" ry="6" fill="#000" opacity=".2"/>';
    /* legs and feet */
    if (kind === 'gran') {
      s += '<path d="M-24 ' + (sh + 120) + 'L-30 -40H30L24 ' + (sh + 120) + 'z" fill="' + (o.skirt || '#3a3a4a') + '"' + K() + '/>';
      s += '<path d="M-12 -40v-4M12 -40v-4" stroke="' + INK + '"/><path d="M-14 -40v34M14 -40v34" stroke="' + (o.legs || '#6a5a5a') + '" stroke-width="9"/>';
      s += '<path d="M-24 0h18v-8h-16zM6 0h18l-2 -8h-16z" fill="#2a1e1a"/>';
    } else {
      var lt = kid ? -80 : -118;
      s += '<path d="M-17 -2l1 ' + lt + 'h14l1 ' + (-lt) + 'zM2 -2l1 ' + lt + 'h14l1 ' + (-lt) + 'z" fill="' + (o.legs || '#3a4a6a') + '"' + K(2) + '/>';
      var sc = o.shoes || '#f2f0ea';
      s += '<path d="M-24 0h22v-9h-18q-5 2 -4 9zM2 0h24q1 -7 -4 -9h-20z" fill="' + sc + '"' + K(1.6) + '/>';
      if (o.star) s += '<path d="M-20 -5l1.5 3h3l-2.4 1.8l1 3l-3.1 -2l-3.1 2l1 -3l-2.4 -1.8h3z" fill="#e8b830"/>';
    }
    /* body */
    var bw = kid ? 21 : 28, bot = kid ? -78 : -112;
    if (kind === 'gran') bot = sh + 128;
    s += '<path d="M' + (-bw) + ' ' + sh + 'Q' + (-bw - 6) + ' ' + ((sh + bot) / 2) + ' ' + (-bw - 2) + ' ' + bot + 'H' + (bw + 2) + 'Q' + (bw + 6) + ' ' + ((sh + bot) / 2) + ' ' + bw + ' ' + sh + 'z" fill="' + top + '"' + K() + '/>';
    if (o.check) s += '<g stroke="' + o.check + '" stroke-width="2" opacity=".55"><path d="M' + (-bw) + ' ' + (sh + 30) + 'H' + bw + 'M' + (-bw - 2) + ' ' + (sh + 62) + 'H' + (bw + 2) + 'M' + (-bw - 3) + ' ' + (sh + 94) + 'H' + (bw + 3) + 'M-10 ' + sh + 'V' + bot + 'M10 ' + sh + 'V' + bot + '"/></g>';
    if (o.hood) s += '<path d="M-14 ' + sh + 'q14 18 28 0" fill="none"' + K(1.6) + '/><path d="M-6 ' + (sh + 6) + 'v26M6 ' + (sh + 6) + 'v26" stroke="#e8e4dc" stroke-width="2"/><path d="M-16 ' + (bot - 34) + 'h32v20h-32z" fill="none" stroke="' + INK + '" stroke-width="1.4" opacity=".5"/>';
    if (o.collar) s += '<path d="M-12 ' + sh + 'l12 14l12 -14" fill="' + o.collar + '"' + K(1.6) + '/>';
    if (o.buttons) s += '<g fill="' + INK + '"><circle cx="0" cy="' + (sh + 30) + '" r="2.4"/><circle cx="0" cy="' + (sh + 60) + '" r="2.4"/><circle cx="0" cy="' + (sh + 90) + '" r="2.4"/></g>';
    if (o.dust) s += '<g fill="#e8d4a0" opacity=".9"><circle cx="-14" cy="' + (sh + 40) + '" r="2"/><circle cx="8" cy="' + (sh + 70) + '" r="1.6"/><circle cx="18" cy="' + (sh + 26) + '" r="1.8"/><circle cx="-6" cy="' + (sh + 96) + '" r="1.5"/></g>';
    /* arms */
    var len = kid ? 66 : 88;
    function arm(side, pose) {
      var x = side * (bw - 2), hand, path;
      if (pose === 'up') { path = 'M' + x + ' ' + sh + 'L' + (x + side * 18) + ' ' + (sh - len * 0.7); hand = [x + side * 20, sh - len * 0.76]; }
      else if (pose === 'out') { path = 'M' + x + ' ' + sh + 'L' + (x + side * 42) + ' ' + (sh + len * 0.45); hand = [x + side * 46, sh + len * 0.5]; }
      else if (pose === 'front') { path = 'M' + x + ' ' + sh + 'Q' + (x + side * 8) + ' ' + (sh + len * 0.55) + ' ' + (x - side * 16) + ' ' + (sh + len * 0.7); hand = [x - side * 19, sh + len * 0.72]; }
      else if (pose === 'hip') { path = 'M' + x + ' ' + sh + 'L' + (x + side * 22) + ' ' + (sh + len * 0.45) + 'L' + (x + side * 4) + ' ' + (sh + len * 0.78); hand = [x + side * 3, sh + len * 0.8]; }
      else { path = 'M' + x + ' ' + sh + 'L' + (x + side * 7) + ' ' + (sh + len); hand = [x + side * 8, sh + len + 5]; }
      return '<path d="' + path + '" fill="none" stroke="' + INK + '" stroke-width="' + (kid ? 13 : 16) + '" stroke-linecap="round" stroke-linejoin="round"/><path d="' + path + '" fill="none" stroke="' + top + '" stroke-width="' + (kid ? 9 : 11.5) + '" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<circle cx="' + hand[0] + '" cy="' + hand[1] + '" r="' + (kid ? 5.5 : 6.5) + '" fill="' + (o.gloves || skin) + '"' + K(1.5) + '/>' + (o.hold && side === 1 ? o.hold(hand[0], hand[1]) : '');
    }
    s += arm(-1, o.armL || 'down') + arm(1, o.armR || 'down');
    /* head */
    var hr = kid ? 19 : 20;
    s += '<rect x="-6" y="' + (hy + 16) + '" width="12" height="' + (sh - hy - 14) + '" fill="' + skin + '"/>';
    if (o.hairStyle === 'long') s += '<path d="M-20 ' + (hy - 4) + 'q-6 34 0 50h40q6 -16 0 -50z" fill="' + hair + '"/>';
    s += '<ellipse cx="0" cy="' + hy + '" rx="' + (hr - 1) + '" ry="' + (hr + 3) + '" fill="' + skin + '"' + K(2.1) + '/>';
    var hs = o.hairStyle || 'short';
    if (hs === 'bob') s += '<path d="M-21 ' + (hy + 10) + 'q-4 -36 21 -36q25 0 21 36l-6 0q0 -14 -6 -22q-12 6 -30 4q-2 8 -2 18z" fill="' + hair + '"' + K(1.6) + '/>';
    else if (hs === 'bun') s += '<path d="M-19 ' + (hy - 3) + 'q0 -22 19 -22q19 0 19 22q-8 -11 -19 -11q-11 0 -19 11z" fill="' + hair + '"' + K(1.6) + '/><circle cx="0" cy="' + (hy - 25) + '" r="8" fill="' + hair + '"' + K(1.6) + '/>';
    else if (hs === 'bald') s += '<path d="M-20 ' + (hy + 2) + 'q-2 -12 3 -16M20 ' + (hy + 2) + 'q2 -12 -3 -16" fill="none" stroke="' + hair + '" stroke-width="5" stroke-linecap="round"/>';
    else if (hs === 'fringe') s += '<path d="M-20 ' + (hy + 2) + 'q-2 -30 22 -28q22 2 18 26q-10 -10 -22 -8q-6 8 -18 10z" fill="' + hair + '"' + K(1.6) + '/>';
    else if (hs === 'long') s += '<path d="M-19 ' + (hy - 2) + 'q0 -24 19 -24q19 0 19 24q-10 -12 -19 -12q-9 0 -19 12z" fill="' + hair + '"' + K(1.6) + '/>';
    else s += '<path d="M-19 ' + (hy - 3) + 'q0 -22 19 -22q19 0 19 22q-6 -10 -19 -10q-13 0 -19 10z" fill="' + hair + '"' + K(1.6) + '/>';
    if (o.beard) s += '<path d="M-18 ' + (hy + 4) + 'q2 24 18 24q16 0 18 -24q-6 10 -18 10q-12 0 -18 -10z" fill="' + o.beard + '"' + K(1.4) + '/>';
    s += '<circle cx="-6.5" cy="' + hy + '" r="2" fill="' + INK + '"/><circle cx="6.5" cy="' + hy + '" r="2" fill="' + INK + '"/>';
    if (o.glasses) s += '<g fill="none" stroke="' + INK + '" stroke-width="1.6"><circle cx="-7" cy="' + hy + '" r="5.5"/><circle cx="7" cy="' + hy + '" r="5.5"/><path d="M-1.5 ' + hy + 'h3"/></g>';
    s += '<path d="M-5 ' + (hy + 12) + 'q5 ' + (o.smile === false ? '0' : '3') + ' 10 0" fill="none"' + K(1.6) + '/>';
    if (o.freckles) s += '<g fill="#c88a6a" opacity=".7"><circle cx="-10" cy="' + (hy + 6) + '" r="1.2"/><circle cx="-7" cy="' + (hy + 8) + '" r="1"/><circle cx="10" cy="' + (hy + 6) + '" r="1.2"/><circle cx="7" cy="' + (hy + 8) + '" r="1"/></g>';
    if (o.pen) s += '<path d="M14 ' + (hy - 12) + 'l14 -10" stroke="#1f8a3a" stroke-width="4" stroke-linecap="round"/><path d="M28 ' + (hy - 22) + 'l3 -2" stroke="#e8e4dc" stroke-width="3"/>';
    if (o.phones) s += '<path d="M-14 ' + (sh + 2) + 'q14 14 28 0" fill="none" stroke="#e8e4dc" stroke-width="3"/><circle cx="-14" cy="' + (sh + 2) + '" r="4" fill="#e8e4dc"' + K(1.2) + '/><circle cx="14" cy="' + (sh + 2) + '" r="4" fill="#e8e4dc"' + K(1.2) + '/>';
    if (o.extra) s += o.extra;
    return '<g transform="scale(' + ((o.h || 300) / 300) + ')">' + s + '</g>';
  }

  /* ---------- busts for the interviews ---------- */
  function sym(id, bg, body) { return '<symbol id="ht-' + id + '" viewBox="0 0 200 260"><rect width="200" height="260" fill="' + bg + '"/>' + body + '</symbol>'; }
  function shoulders(c, extra) { return '<path d="M8 260q4 -60 50 -72l30 -6h24l30 6q46 12 50 72z" fill="' + c + '"' + K(3) + '/>' + (extra || ''); }
  function head(skin, rx, ry) { return '<rect x="88" y="150" width="24" height="38" fill="' + skin + '"/><ellipse cx="100" cy="114" rx="' + (rx || 36) + '" ry="' + (ry || 46) + '" fill="' + skin + '"' + K(3) + '/>'; }
  function eyes(y, c) { return '<circle cx="85" cy="' + y + '" r="3.2" fill="' + (c || INK) + '"/><circle cx="115" cy="' + y + '" r="3.2" fill="' + (c || INK) + '"/>'; }
  function specs(y) { return '<g fill="none" stroke="' + INK + '" stroke-width="2.4"><rect x="70" y="' + (y - 10) + '" width="26" height="19" rx="6"/><rect x="104" y="' + (y - 10) + '" width="26" height="19" rx="6"/><path d="M96 ' + y + 'h8M70 ' + (y - 3) + 'l-8 -3M130 ' + (y - 3) + 'l8 -3"/></g>'; }
  var BUST = {
    phoebe: ['#cfe2d4', shoulders('#22345a', '<path d="M72 188l28 22l28 -22" fill="#f4f2ea"' + K(2) + '/><path d="M94 206l6 30l6 -30z" fill="#1f4a2e"' + K(1.6) + '/>') +
      head('#f2d2b6', 34, 44) +
      '<path d="M62 132q-8 -66 38 -68q46 2 38 68l-10 0q2 -26 -8 -40q-22 14 -50 8q-4 14 -2 32z" fill="#6a4026"' + K(2.2) + '/>' +
      eyes(118) + '<path d="M76 104q9 -4 18 0M106 104q9 -4 18 0" fill="none"' + K(2.2) + '/>' +
      '<path d="M100 122q5 9 -2 13" fill="none"' + K(2) + '/><path d="M90 144q10 3 20 -1" fill="none"' + K(2.4) + '/>' +
      '<g fill="#c88a6a" opacity=".65"><circle cx="78" cy="132" r="1.8"/><circle cx="84" cy="136" r="1.5"/><circle cx="116" cy="134" r="1.8"/><circle cx="122" cy="130" r="1.5"/></g>' +
      '<path d="M134 82l30 -24" stroke="#1f8a3a" stroke-width="7" stroke-linecap="round"/><path d="M164 58l6 -4" stroke="#e8e4dc" stroke-width="5" stroke-linecap="round"/>'],
    martin: ['#5a3e2a', '<g stroke="#000" stroke-opacity=".12" stroke-width="6"><path d="M0 30h200M0 90h200M0 150h200M0 210h200"/></g>' +
      shoulders('#b8473a', '<g stroke="#6a1e16" stroke-width="3" opacity=".6"><path d="M40 214h120M30 240h140M70 190v70M130 190v70M100 196v64"/></g><path d="M82 186l18 18l18 -18" fill="#f2e6d0"' + K(2) + '/><g fill="#e8d4a0"><circle cx="60" cy="230" r="2.4"/><circle cx="140" cy="220" r="2"/><circle cx="120" cy="248" r="2.2"/></g>') +
      head('#e8b896', 40, 48) +
      '<path d="M60 98q-2 -20 8 -30M140 98q2 -20 -8 -30" fill="none" stroke="#6a5a4a" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M62 120q4 50 38 50q34 0 38 -50q-10 22 -38 22q-28 0 -38 -22z" fill="#7a6250"' + K(2) + '/>' +
      eyes(110) + '<path d="M74 96l18 3M126 96l-18 3" fill="none"' + K(3) + '/>' +
      '<path d="M100 114q7 12 -2 17" fill="none"' + K(2.2) + '/><path d="M86 146q14 8 28 0" fill="none"' + K(2.6) + '/>'],
    alison: ['#e2eccc', '<g stroke="#8aa86a" stroke-width="2" opacity=".35"><path d="M0 0l200 260M60 0l140 180M0 80l140 180M120 0l80 100"/></g>' +
      shoulders('#3a7a4a', '<path d="M100 186v74" stroke="#2a5a36" stroke-width="3"/><path d="M76 190l24 10l24 -10" fill="none"' + K(2) + '/>') +
      head('#f0cdb2', 34, 46) +
      '<path d="M64 128q-6 -64 36 -64q42 0 36 64q-6 -30 -18 -36q-12 10 -40 10q-10 8 -14 26z" fill="#c8b07a"' + K(2) + '/>' +
      specs(116) + eyes(116) +
      '<path d="M100 124q5 10 -2 14" fill="none"' + K(2) + '/><path d="M88 148h24" stroke="' + INK + '" stroke-width="2.6"/><path d="M110 146l6 -2" stroke="' + INK + '" stroke-width="2"/>'],
    elliot: ['#2e3448', '<g fill="#fff" opacity=".05"><circle cx="40" cy="40" r="30"/><circle cx="170" cy="90" r="40"/></g>' +
      shoulders('#6a6e78', '<path d="M56 196q44 30 88 0" fill="none"' + K(2.6) + '/><path d="M90 206v34M110 206v34" stroke="#e8e4dc" stroke-width="3"/><path d="M60 192q40 -16 80 0" fill="#5a5e68"' + K(2) + '/>') +
      head('#ecc6a6', 32, 48) +
      '<path d="M64 112q-6 -54 40 -52q38 4 32 44q-18 -16 -36 -10q-20 16 -36 18z" fill="#2a2018"' + K(2) + '/>' +
      eyes(120) + '<path d="M76 110q9 -1 18 2M106 112q9 -3 18 -2" fill="none"' + K(2.2) + '/>' +
      '<path d="M100 126q5 9 -2 13" fill="none"' + K(2) + '/><path d="M90 150q10 -2 20 1" fill="none"' + K(2.4) + '/>' +
      '<path d="M62 184q38 26 76 0" fill="none" stroke="#e8e4dc" stroke-width="4"/><circle cx="62" cy="184" r="7" fill="#e8e4dc"' + K(1.6) + '/><circle cx="138" cy="184" r="7" fill="#e8e4dc"' + K(1.6) + '/>'],
    gran: ['#f2e2c8', '<g fill="#e8d0a8" opacity=".6"><rect x="0" y="0" width="200" height="40"/></g>' +
      shoulders('#b8322a', '<path d="M70 188l30 26l30 -26" fill="#e8dcc8"' + K(2) + '/><path d="M86 196q14 40 28 0" fill="none" stroke="#c8a040" stroke-width="2.4"/><g fill="' + INK + '"><circle cx="100" cy="230" r="3.4"/><circle cx="100" cy="250" r="3.4"/></g>') +
      head('#f0d0b8', 34, 46) +
      '<path d="M64 112q-2 -50 36 -50q38 0 36 50q-8 -26 -36 -28q-28 2 -36 28z" fill="#ecebe6"' + K(2) + '/><circle cx="100" cy="60" r="13" fill="#ecebe6"' + K(2) + '/>' +
      specs(116) + eyes(116) +
      '<path d="M76 102q9 -4 18 -1M106 101q9 -3 18 1" fill="none"' + K(2) + '/><path d="M70 126q-10 30 -6 70M130 126q10 30 6 70" fill="none" stroke="#c8a040" stroke-width="1.6"/>' +
      '<path d="M100 122q5 10 -2 14" fill="none"' + K(2) + '/><path d="M86 146q14 8 28 -1" fill="none"' + K(2.6) + '/>' +
      '<g stroke="#c8a088" stroke-width="1.4" fill="none" opacity=".8"><path d="M70 136q4 4 8 2M122 138q4 2 8 -2M84 158q16 6 32 0"/></g>']
  };
  var spr = '';
  Object.keys(BUST).forEach(function (k) { spr += sym(k, BUST[k][0], BUST[k][1]); });
  window.CAST_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>' + spr + '</defs></svg>';
  window.FACE = function (who) {
    var bg = BUST[who] ? BUST[who][0] : '#222';
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:' + bg + '"><use href="#ht-' + who + '"/></svg>';
  };
  window.HT = window.HT || {};
  window.HT.fig = fig;
  /* the people as they are drawn in every room, so that nobody changes clothes between the hut and the gate */
  window.HT.who = {
    phoebe: { kind: 'girl', top: '#22345a', legs: '#2a2e3a', shoes: '#f4f2ea', star: true, skin: '#f2d2b6', hair: '#6a4026', hairStyle: 'bob', freckles: true, pen: true, collar: '#f4f2ea' },
    martin: { kind: 'man', top: '#b8473a', check: '#6a1e16', legs: '#4a5a72', shoes: '#5a4030', skin: '#e8b896', hair: '#6a5a4a', hairStyle: 'bald', beard: '#7a6250', dust: true },
    alison: { kind: 'woman', top: '#3a7a4a', legs: '#5a5048', shoes: '#3a3a30', skin: '#f0cdb2', hair: '#c8b07a', hairStyle: 'bob', glasses: true, gloves: '#d8a848' },
    elliot: { kind: 'teen', top: '#6a6e78', hood: true, legs: '#2a2e3a', shoes: '#e8e4dc', skin: '#ecc6a6', hair: '#2a2018', hairStyle: 'fringe', phones: true, smile: false },
    gran: { kind: 'gran', top: '#b8322a', skirt: '#3a3a4a', legs: '#6a5a5a', skin: '#f0d0b8', hair: '#ecebe6', hairStyle: 'bun', glasses: true, buttons: true }
  };
  window.HT.as = function (who, more) {
    var o = {}, b = window.HT.who[who] || {}, k;
    for (k in b) o[k] = b[k];
    for (k in (more || {})) o[k] = more[k];
    return fig(o);
  };
})();
