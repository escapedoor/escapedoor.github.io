/* Everything Is Somewhere - the people of No. 9 Ilbert Square, in flat colour with a warm brown outline.
   FACE(who)  a bust for an interview (200 x 260): felicity, inkster, spink, digby, harbottle
   NY.fig(o)  a standing figure, feet at 0,0, about 300 units high before scaling by o.h / 300
              o.kind: 'woman' (skirt to the floor), 'man', 'girl' (pinafore, plaits), 'boy' (sailor suit)
   Nothing in here knows an answer. */
(function () {
  'use strict';
  var INK = '#2b1d14';
  function K(w) { return ' stroke="' + INK + '" stroke-width="' + (w || 2.4) + '" stroke-linejoin="round" stroke-linecap="round"'; }

  function fig(o) {
    o = o || {};
    var s = '', kind = o.kind || 'woman', skin = o.skin || '#f0cfb2', coat = o.coat || '#55606e', hair = o.hair || '#5a3a22';
    var child = kind === 'girl' || kind === 'boy';
    s += '<ellipse cx="0" cy="2" rx="38" ry="6" fill="#000" opacity=".22"/>';
    if (kind === 'woman') {
      s += '<path d="M-24 -176Q-30 -110 -50 -4L-46 0H46L50 -4Q30 -110 24 -176z" fill="' + (o.skirt || coat) + '"' + K() + '/>';
      if (o.apron) s += '<path d="M-20 -168Q-26 -100 -34 -16H34Q26 -100 20 -168z" fill="' + o.apron + '"' + K(1.8) + '/>';
      s += '<path d="M-26 -230Q-30 -200 -24 -170H24Q30 -200 26 -230z" fill="' + coat + '"' + K() + '/>';
      if (o.apron) s += '<path d="M-14 -226h28v50h-28z" fill="' + o.apron + '"' + K(1.6) + '/>';
      s += '<path d="M-14 0v-8h-14l-4 8zM14 0v-8h14l4 8z" fill="#1c1410"/>';
    } else if (kind === 'man') {
      s += '<path d="M-16 0l1 -118h13l1 118zM2 0l1 -118h13l1 118z" fill="' + (o.legs || '#2c2c34') + '"' + K(2) + '/>';
      s += '<path d="M-21 0h19v-8h-16zM2 0h21l-3 -8h-18z" fill="#141014"/>';
      s += '<path d="M-31 -232Q-37 -170 -30 -104L-27 -96H27L30 -104Q37 -170 31 -232z" fill="' + coat + '"' + K() + '/>';
      s += '<path d="M-10 -232l10 50l10 -50" fill="' + (o.vest || '#d8d0c0') + '"' + K(1.6) + '/>';
      if (o.chain) s += '<path d="M-12 -170q12 10 24 0" fill="none" stroke="#d8b040" stroke-width="2.4"/>';
    } else if (kind === 'girl') {
      s += '<path d="M-10 0v-78M10 0v-78" stroke="' + (o.legs || '#2a2228') + '" stroke-width="11"/>';
      s += '<path d="M-17 0h14v-7h-12zM3 0h16l-2 -7h-14z" fill="#1c1410"/>';
      s += '<path d="M-20 -170Q-26 -120 -38 -72H38Q26 -120 20 -170z" fill="' + coat + '"' + K() + '/>';
      s += '<path d="M-14 -166Q-18 -120 -26 -78H26Q18 -120 14 -166z" fill="' + (o.pinafore || '#f6f2e8') + '"' + K(1.6) + '/>';
      s += '<path d="M-20 -176h40v14h-40z" fill="' + coat + '"' + K(1.8) + '/>';
    } else {
      s += '<path d="M-10 0v-70M10 0v-70" stroke="' + (o.legs || '#e8e2d8') + '" stroke-width="10"/>';
      s += '<path d="M-17 0h14v-7h-12zM3 0h16l-2 -7h-14z" fill="#1c1410"/>';
      s += '<path d="M-20 -110h40l2 40h-18v-6h-8v6h-18z" fill="' + coat + '"' + K(2) + '/>';
      s += '<path d="M-21 -176Q-25 -140 -21 -106H21Q25 -140 21 -176z" fill="' + coat + '"' + K() + '/>';
      s += '<path d="M-22 -178h44l-6 22h-32z" fill="' + (o.collar || '#1f3a6a') + '"' + K(1.6) + '/><path d="M-16 -170h32M-14 -164h28" stroke="#f6f2e8" stroke-width="1.6"/>';
      s += '<path d="M-6 -154l6 10l6 -10" fill="#c83a2a"' + K(1.2) + '/>';
    }
    /* arms */
    var top = child ? -170 : -226, len = child ? 62 : 86;
    function arm(side, pose) {
      var x = side * (child ? 19 : 26), hand, path;
      if (pose === 'up') { path = 'M' + x + ' ' + top + 'L' + (x + side * 18) + ' ' + (top - len * 0.7); hand = [x + side * 20, top - len * 0.75]; }
      else if (pose === 'out') { path = 'M' + x + ' ' + top + 'L' + (x + side * 40) + ' ' + (top + len * 0.45); hand = [x + side * 44, top + len * 0.5]; }
      else if (pose === 'front') { path = 'M' + x + ' ' + top + 'Q' + (x + side * 6) + ' ' + (top + len * 0.55) + ' ' + (x - side * 16) + ' ' + (top + len * 0.7); hand = [x - side * 19, top + len * 0.72]; }
      else { path = 'M' + x + ' ' + top + 'L' + (x + side * 7) + ' ' + (top + len); hand = [x + side * 8, top + len + 5]; }
      var sl = kind === 'boy' ? coat : (kind === 'girl' ? coat : coat);
      return '<path d="' + path + '" fill="none" stroke="' + INK + '" stroke-width="' + (child ? 13 : 16) + '" stroke-linecap="round"/><path d="' + path + '" fill="none" stroke="' + sl + '" stroke-width="' + (child ? 9 : 11.5) + '" stroke-linecap="round"/>' +
        '<circle cx="' + hand[0] + '" cy="' + hand[1] + '" r="' + (child ? 5.5 : 6.5) + '" fill="' + (o.gloves || skin) + '"' + K(1.5) + '/>';
    }
    s += arm(-1, o.armL || 'down') + arm(1, o.armR || 'down');
    /* head */
    var hy = child ? -196 : -256, hr = child ? 19 : 20;
    s += '<rect x="-6" y="' + (hy + 16) + '" width="12" height="' + (child ? 12 : 16) + '" fill="' + skin + '"/>';
    if (kind === 'man' && o.collarW !== false) s += '<path d="M-10 ' + (hy + 26) + 'h20v8h-20z" fill="#fbfaf4"' + K(1.4) + '/>';
    if (o.hairStyle === 'plaits') s += '<path d="M-18 ' + (hy + 2) + 'q-6 30 -2 50M18 ' + (hy + 2) + 'q6 30 2 50" fill="none" stroke="' + hair + '" stroke-width="7" stroke-linecap="round"/><circle cx="-20" cy="' + (hy + 54) + '" r="4" fill="#c83a2a"/><circle cx="20" cy="' + (hy + 54) + '" r="4" fill="#c83a2a"/>';
    s += '<ellipse cx="0" cy="' + hy + '" rx="' + (hr - 1) + '" ry="' + (hr + 3) + '" fill="' + skin + '"' + K(2.1) + '/>';
    if (o.hairStyle === 'bun') s += '<path d="M-19 ' + (hy - 4) + 'q0 -22 19 -22q19 0 19 22q-6 -12 -19 -12q-13 0 -19 12z" fill="' + hair + '"' + K(1.6) + '/><circle cx="0" cy="' + (hy - 26) + '" r="8" fill="' + hair + '"' + K(1.6) + '/>';
    else if (o.hairStyle === 'plaits') s += '<path d="M-18 ' + (hy - 2) + 'q1 -22 18 -22q17 0 18 22q-9 -10 -18 -10q-9 0 -18 10z" fill="' + hair + '"' + K(1.6) + '/>';
    else if (o.hairStyle === 'tousled') s += '<path d="M-19 ' + (hy - 2) + 'l-2 -12l8 4l2 -12l8 6l6 -10l5 10l8 -6l2 12l-4 10q-12 -10 -33 -2z" fill="' + hair + '"' + K(1.6) + '/>';
    else if (o.hairStyle !== 'none') s += '<path d="M-19 ' + (hy - 4) + 'q0 -22 19 -22q19 0 19 22q-8 -10 -19 -10q-11 0 -19 10z" fill="' + hair + '"' + K(1.6) + '/>';
    if (o.hat === 'nanny') s += '<path d="M-30 ' + (hy - 14) + 'h60v-5h-60z" fill="#1c1a1e"' + K(1.6) + '/><path d="M-17 ' + (hy - 18) + 'q2 -16 17 -16q15 0 17 16z" fill="#1c1a1e"' + K(1.6) + '/>';
    else if (o.hat === 'top') s += '<path d="M-28 ' + (hy - 15) + 'h56v-5h-56z" fill="#141016"' + K(1.6) + '/><path d="M-17 ' + (hy - 19) + 'v-34h34v34z" fill="#141016"' + K(1.6) + '/>';
    else if (o.hat === 'cap') s += '<path d="M-24 ' + (hy - 8) + 'q-4 -22 24 -24q28 2 24 24q-10 -8 -24 -8q-14 0 -24 8z" fill="#fbfaf4"' + K(1.6) + '/>';
    else if (o.hat === 'sailor') s += '<ellipse cx="0" cy="' + (hy - 15) + '" rx="22" ry="7" fill="#f6f2e8"' + K(1.6) + '/><path d="M-15 ' + (hy - 17) + 'q15 -14 30 0" fill="#f6f2e8"' + K(1.6) + '/><path d="M-16 ' + (hy - 17) + 'h32" stroke="#1f3a6a" stroke-width="3"/>';
    s += '<circle cx="-6.5" cy="' + hy + '" r="2" fill="' + INK + '"/><circle cx="6.5" cy="' + hy + '" r="2" fill="' + INK + '"/>';
    if (o.tash) s += '<path d="M-10 ' + (hy + 9) + 'q5 -5 10 -1q5 -4 10 1q-5 3 -10 1q-5 2 -10 -1z" fill="' + o.tash + '"/>';
    s += '<path d="M-5 ' + (hy + 13) + 'q5 ' + (o.smile === false ? '0' : (o.smile === 'down' ? '-3' : '3')) + ' 10 0" fill="none"' + K(1.6) + '/>';
    if (o.cheeks) s += '<circle cx="-12" cy="' + (hy + 7) + '" r="4.5" fill="#e88a7a" opacity=".55"/><circle cx="12" cy="' + (hy + 7) + '" r="4.5" fill="#e88a7a" opacity=".55"/>';
    if (o.extra) s += o.extra;
    return '<g transform="scale(' + ((o.h || 300) / 300) + ')">' + s + '</g>';
  }

  /* ---------- busts for the interviews ---------- */
  function sym(id, bg, body) { return '<symbol id="ny-' + id + '" viewBox="0 0 200 260"><rect width="200" height="260" fill="' + bg + '"/>' + body + '</symbol>'; }
  function shoulders(c, extra) { return '<path d="M10 260q4 -60 48 -72l30 -6h24l30 6q44 12 48 72z" fill="' + c + '"' + K(3) + '/>' + (extra || ''); }
  function head(skin, rx, ry) { return '<rect x="88" y="150" width="24" height="36" fill="' + skin + '"/><ellipse cx="100" cy="114" rx="' + (rx || 36) + '" ry="' + (ry || 46) + '" fill="' + skin + '"' + K(3) + '/>'; }
  function eyes(y, c) { return '<circle cx="85" cy="' + y + '" r="3.2" fill="' + (c || INK) + '"/><circle cx="115" cy="' + y + '" r="3.2" fill="' + (c || INK) + '"/>'; }
  var PAPER = '<g stroke="#000" stroke-opacity=".06" stroke-width="2"><path d="M0 40h200M0 80h200M0 120h200M0 160h200M0 200h200M0 240h200"/></g>';
  var BUST = {
    felicity: ['#cfe0ea', PAPER + shoulders('#3a5a8a', '<path d="M62 196q38 20 76 0v64H62z" fill="#f6f2e8"' + K(2.4) + '/><path d="M86 196l14 14l14 -14" fill="none"' + K(2) + '/>') +
      '<path d="M60 118q-14 40 -8 92M140 118q14 40 8 92" fill="none" stroke="#6a4424" stroke-width="13" stroke-linecap="round"/><circle cx="52" cy="214" r="7" fill="#c83a2a"/><circle cx="148" cy="214" r="7" fill="#c83a2a"/>' +
      head('#f3d4bc', 34, 44) +
      '<path d="M64 104q4 -40 36 -40q32 0 36 40q-14 -18 -36 -18q-22 0 -36 18z" fill="#6a4424"' + K(2.2) + '/><path d="M100 66v22" stroke="#4e3018" stroke-width="2"/>' +
      eyes(116) + '<path d="M76 102q9 -5 18 -1M106 101q9 -4 18 1" fill="none"' + K(2.2) + '/>' +
      '<path d="M100 120q5 9 -2 13" fill="none"' + K(2) + '/><path d="M88 142q12 6 24 0" fill="none"' + K(2.4) + '/>' +
      '<g fill="#d0906a" opacity=".55"><circle cx="78" cy="130" r="1.6"/><circle cx="84" cy="134" r="1.4"/><circle cx="118" cy="132" r="1.6"/><circle cx="124" cy="128" r="1.4"/></g>' +
      '<path d="M150 236l20 -40" stroke="#2a3a5a" stroke-width="5" stroke-linecap="round"/><path d="M170 196l4 -8" stroke="#1c1c22" stroke-width="3"/>'],
    inkster: ['#6a6a62', '<g fill="#fff" opacity=".07"><rect x="0" y="0" width="100" height="260"/></g>' + shoulders('#5c6066', '<path d="M100 186v74" stroke="#3c4046" stroke-width="2.4"/><g fill="#2c2e32"><circle cx="100" cy="206" r="3.4"/><circle cx="100" cy="228" r="3.4"/><circle cx="100" cy="250" r="3.4"/></g><path d="M74 190l26 8l26 -8" fill="none"' + K(2) + '/>') +
      head('#ecd2bd', 32, 50) +
      '<path d="M68 96q2 -36 32 -36q30 0 32 36q-10 -14 -32 -14q-22 0 -32 14z" fill="#7a6a5a"' + K(2) + '/>' +
      '<path d="M40 74h120v-8H40z" fill="#1c1a1e"' + K(2) + '/><path d="M64 68q4 -30 36 -30q32 0 36 30z" fill="#1c1a1e"' + K(2) + '/><path d="M66 64h68" stroke="#3a3a42" stroke-width="3"/>' +
      '<ellipse cx="85" cy="116" rx="6" ry="3.6" fill="#fbfbf6"' + K(1.4) + '/><ellipse cx="115" cy="116" rx="6" ry="3.6" fill="#fbfbf6"' + K(1.4) + '/>' + eyes(116, '#5a6a72') +
      '<path d="M76 104q9 -3 18 0M106 104q9 -3 18 0" fill="none"' + K(2.2) + '/>' +
      '<path d="M100 122q4 12 -3 16" fill="none"' + K(2) + '/><path d="M90 148h20" stroke="' + INK + '" stroke-width="2.4"/>'],
    spink: ['#e8dcc0', shoulders('#4a6a4a', '<path d="M54 200q46 24 92 0v60H54z" fill="#fbfaf4"' + K(2.4) + '/><g fill="#fff" opacity=".9"><circle cx="70" cy="226" r="4"/><circle cx="130" cy="214" r="3"/></g>') +
      head('#f2c0a2', 42, 46) +
      '<path d="M50 104q-6 -54 50 -56q56 2 50 56q-12 -20 -50 -22q-38 2 -50 22z" fill="#fbfaf4"' + K(2.4) + '/><path d="M54 96q46 -16 92 0" fill="none" stroke="#c83a2a" stroke-width="3"/>' +
      eyes(116) + '<path d="M74 100q10 6 20 2M106 102q10 4 20 -2" fill="none"' + K(2.6) + '/>' +
      '<path d="M100 120q7 10 -3 14" fill="none"' + K(2.2) + '/><path d="M84 146q16 -6 32 0" fill="none"' + K(2.6) + '/>' +
      '<circle cx="70" cy="134" r="9" fill="#e87a6a" opacity=".5"/><circle cx="130" cy="134" r="9" fill="#e87a6a" opacity=".5"/>' +
      '<g fill="#fff" opacity=".85"><circle cx="128" cy="98" r="3"/><circle cx="72" cy="150" r="2.4"/></g>'],
    digby: ['#d8e6d0', shoulders('#f6f2e8', '<path d="M34 196l66 30l66 -30l10 64H24z" fill="#1f3a6a"' + K(2.4) + '/><path d="M44 206l56 26l56 -26" fill="none" stroke="#f6f2e8" stroke-width="3"/><path d="M90 228l10 16l10 -16" fill="#c83a2a"' + K(1.6) + '/>') +
      head('#f6d6c0', 38, 44) +
      '<path d="M60 108l-6 -26l16 8l4 -24l14 14l12 -20l10 20l14 -12l2 24l14 -6l-6 26q-30 -20 -74 -4z" fill="#b8843a"' + K(2.2) + '/>' +
      eyes(118) + '<path d="M76 106q9 -2 18 2M106 108q9 -4 18 -2" fill="none"' + K(2.2) + '/>' +
      '<path d="M100 124q5 8 -2 12" fill="none"' + K(2) + '/><path d="M88 146h24" stroke="' + INK + '" stroke-width="3.4" stroke-linecap="round"/>' +
      '<circle cx="74" cy="138" r="8" fill="#ec9a8a" opacity=".5"/><circle cx="126" cy="138" r="8" fill="#ec9a8a" opacity=".5"/>'],
    harbottle: ['#3a2a2a', shoulders('#22222a', '<path d="M80 186l20 50l20 -50" fill="#d8d0c0"' + K(2) + '/><path d="M90 190h20v10h-20z" fill="#fbfaf4"' + K(1.6) + '/><path d="M70 236q30 14 60 0" fill="none" stroke="#d8b040" stroke-width="3"/>') +
      head('#ecc4a6', 36, 48) +
      '<path d="M64 98q0 -40 36 -40q36 0 36 40q-6 -20 -36 -22q-30 2 -36 22z" fill="#4a3a30"' + K(2) + '/><path d="M64 98q-4 14 2 26M136 98q4 14 -2 26" fill="none" stroke="#7a6a60" stroke-width="5"/>' +
      eyes(114) + '<path d="M74 100l20 4M126 100l-20 4" fill="none"' + K(3) + '/>' +
      '<path d="M100 118q6 12 -2 16" fill="none"' + K(2) + '/>' +
      '<path d="M74 140q14 -12 26 -4q12 -8 26 4q-14 6 -26 2q-12 4 -26 -2z" fill="#4a3a30"' + K(1.6) + '/><path d="M90 152h20" stroke="' + INK + '" stroke-width="2.2"/>']
  };
  var spr = '';
  Object.keys(BUST).forEach(function (k) { spr += sym(k, BUST[k][0], BUST[k][1]); });
  window.CAST_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>' + spr + '</defs></svg>';
  window.FACE = function (who) {
    var bg = BUST[who] ? BUST[who][0] : '#222';
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:' + bg + '"><use href="#ny-' + who + '"/></svg>';
  };
  window.NY = window.NY || {};
  window.NY.fig = fig;
  /* the people as they are drawn in every room, so that nobody changes clothes between floors */
  window.NY.who = {
    felicity: { kind: 'girl', coat: '#3a5a8a', pinafore: '#f6f2e8', skin: '#f3d4bc', hair: '#6a4424', hairStyle: 'plaits', legs: '#2a2228' },
    digby: { kind: 'boy', coat: '#f6f2e8', collar: '#1f3a6a', skin: '#f6d6c0', hair: '#b8843a', hairStyle: 'tousled', legs: '#e8e2d8' },
    inkster: { kind: 'woman', coat: '#5c6066', skin: '#ecd2bd', hair: '#7a6a5a', hairStyle: 'bun', hat: 'nanny', gloves: '#2a2a2e', smile: false },
    spink: { kind: 'woman', coat: '#4a6a4a', apron: '#fbfaf4', skin: '#f2c0a2', hair: '#8a7a6a', hat: 'cap', cheeks: true },
    harbottle: { kind: 'man', coat: '#22222a', vest: '#d8d0c0', skin: '#ecc4a6', hair: '#4a3a30', tash: '#4a3a30', chain: true }
  };
  window.NY.as = function (who, more) {
    var o = {}, b = window.NY.who[who] || {}, k;
    for (k in b) o[k] = b[k];
    for (k in (more || {})) o[k] = more[k];
    return fig(o);
  };
})();
