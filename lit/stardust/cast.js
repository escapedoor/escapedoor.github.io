/* Stardust at Half Past Seven - the people, drawn in flat colour with a dark outline.
   FACE(who)  a bust for an interview (200 x 260): zainab, terry, nuala, sabine
   SD.fig(o)  a standing figure with its feet at 0,0, 300 units high before scaling (o.h)
   Nothing in here knows an answer. */
(function () {
  'use strict';
  var INK = '#1b1f2c';
  function K(w) { return ' stroke="' + INK + '" stroke-width="' + (w || 2.4) + '" stroke-linejoin="round" stroke-linecap="round"'; }

  /* ---------- a standing figure, 300 high: feet at 0 ---------- */
  function fig(o) {
    o = o || {};
    var s = '', skin = o.skin || '#e8c4a4', coat = o.coat || '#3a3f52', legs = o.legs || '#2a2e3c', hair = o.hair || '#4a3a2a', w = o.w || 1;
    var sh = 32 * w;
    s += '<ellipse cx="0" cy="2" rx="' + (40 * w) + '" ry="6" fill="#000" opacity=".25"/>';
    if (o.skirt) s += '<path d="M-' + (sh + 6) + ' -90L-' + sh + ' -205H' + sh + 'L' + (sh + 6) + ' -90z" fill="' + o.skirt + '"' + K(2) + '/>';
    s += '<path d="M-15 0l1 -120h12l1 120zM3 0l1 -120h12l1 120z" fill="' + legs + '"' + K(2) + '/>';
    s += '<path d="M-21 0h19v-8h-16zM2 0h21l-3 -8h-18z" fill="' + (o.shoes || '#1a1a20') + '"/>';
    /* the body */
    s += '<path d="M' + (-sh) + ' -214Q' + (-sh - 6) + ' -160 ' + (-sh + 3) + ' -112L' + (-sh + 5) + ' ' + (o.long ? -70 : -104) + 'H' + (sh - 5) + 'L' + (sh - 3) + ' -112Q' + (sh + 6) + ' -160 ' + sh + ' -214z" fill="' + coat + '"' + K() + '/>';
    if (o.bib) s += '<path d="M-20 -206h40v94h-40z" fill="' + o.bib + '"' + K(1.6) + '/><path d="M-20 -206l-8 -6M20 -206l8 -6" stroke="' + o.bib + '" stroke-width="6"/>';
    if (o.spots) s += '<g fill="#fbfbf6" opacity=".9"><circle cx="-12" cy="-150" r="4"/><circle cx="14" cy="-130" r="3"/><circle cx="-4" cy="-60" r="5"/><circle cx="8" cy="-30" r="3"/><circle cx="-18" cy="-180" r="2.5"/></g>';
    if (o.lanyard) s += '<path d="M-12 -212l12 40l12 -40" fill="none" stroke="' + o.lanyard + '" stroke-width="4"/><rect x="-9" y="-174" width="18" height="24" fill="#f4f1e6"' + K(1.4) + '/>';
    if (o.scarf) s += '<path d="M-16 -214q16 12 32 0l2 10q-18 12 -36 0z" fill="' + o.scarf + '"' + K(1.6) + '/><path d="M8 -206l6 100h14l-8 -100z" fill="' + o.scarf + '"' + K(1.6) + '/>';
    /* the arms */
    var aL = o.armL || 'down', aR = o.armR || 'down';
    function arm(side, pose) {
      var x = side * (sh - 2), hand, path;
      if (pose === 'up') { path = 'M' + x + ' -206L' + (x + side * 22) + ' -268'; hand = [x + side * 24, -274]; }
      else if (pose === 'out') { path = 'M' + x + ' -206L' + (x + side * 44) + ' -170'; hand = [x + side * 48, -166]; }
      else if (pose === 'front') { path = 'M' + x + ' -206Q' + (x + side * 6) + ' -160 ' + (x - side * 18) + ' -146'; hand = [x - side * 22, -144]; }
      else { path = 'M' + x + ' -206L' + (x + side * 8) + ' -122'; hand = [x + side * 9, -116]; }
      return '<path d="' + path + '" fill="none" stroke="' + INK + '" stroke-width="17" stroke-linecap="round"/><path d="' + path + '" fill="none" stroke="' + coat + '" stroke-width="12" stroke-linecap="round"/>' +
        '<circle cx="' + hand[0] + '" cy="' + hand[1] + '" r="7" fill="' + skin + '"' + K(1.6) + '/>';
    }
    s += arm(-1, aL) + arm(1, aR);
    /* the head */
    s += '<rect x="-7" y="-232" width="14" height="20" fill="' + skin + '"/>';
    if (o.hairStyle === 'scarf') s += '<path d="M-27 -250q-2 -44 27 -44q29 0 27 44q2 26 -8 40q-19 10 -38 0q-10 -14 -8 -40z" fill="' + hair + '"' + K(2) + '/>';
    s += '<ellipse cx="0" cy="-254" rx="20" ry="24" fill="' + skin + '"' + K(2.2) + '/>';
    if (o.hairStyle === 'bald') s += '<path d="M-20 -256q-2 -12 4 -16M20 -256q2 -12 -4 -16" fill="none" stroke="' + hair + '" stroke-width="6" stroke-linecap="round"/>';
    else if (o.hairStyle === 'bob') s += '<path d="M-24 -238q-6 -46 24 -44q30 -2 24 44q-6 -2 -8 -22q-16 -12 -32 0q-2 20 -8 22z" fill="' + hair + '"' + K(1.8) + '/>';
    else if (o.hairStyle === 'tied') s += '<path d="M-20 -260q2 -22 20 -22q18 0 20 22q-20 -10 -40 0z" fill="' + hair + '"' + K(1.8) + '/><path d="M-22 -266q22 -14 44 0" fill="none" stroke="' + (o.band || '#3a8a5a') + '" stroke-width="7"/>';
    else if (o.hairStyle !== 'scarf') s += '<path d="M-21 -258q0 -24 21 -24q21 0 21 24q-8 -12 -21 -12q-13 0 -21 12z" fill="' + hair + '"' + K(1.8) + '/>';
    s += '<circle cx="-7" cy="-254" r="2.2" fill="' + INK + '"/><circle cx="7" cy="-254" r="2.2" fill="' + INK + '"/>';
    if (o.specs) s += '<g fill="none"' + K(1.6) + '><circle cx="-7" cy="-254" r="6"/><circle cx="7" cy="-254" r="6"/><path d="M-1 -254h2"/></g>';
    s += '<path d="M-6 -241q6 ' + (o.smile === false ? '0' : '4') + ' 12 0" fill="none"' + K(1.8) + '/>';
    if (o.extra) s += o.extra;
    return '<g transform="scale(' + ((o.h || 300) / 300) + ')">' + s + '</g>';
  }

  /* ---------- busts for the interviews ---------- */
  function sym(id, bg, body) { return '<symbol id="sd-' + id + '" viewBox="0 0 200 260"><rect width="200" height="260" fill="' + bg + '"/>' + body + '</symbol>'; }
  function shoulders(c, extra) { return '<path d="M8 260q4 -62 50 -74l30 -6h24l30 6q46 12 50 74z" fill="' + c + '"' + K(3) + '/>' + (extra || ''); }
  function head(o) {
    var skin = o.skin || '#e8c4a4', s = '<rect x="88" y="150" width="24" height="34" fill="' + skin + '"' + K(0) + '/>';
    s += '<ellipse cx="100" cy="114" rx="' + (o.rx || 36) + '" ry="' + (o.ry || 46) + '" fill="' + skin + '"' + K(3) + '/>';
    return s;
  }
  var STARS = '<g fill="#fff" opacity=".55"><circle cx="22" cy="30" r="1.6"/><circle cx="170" cy="22" r="1.2"/><circle cx="182" cy="70" r="1.8"/><circle cx="40" cy="80" r="1"/><circle cx="150" cy="44" r="1"/><circle cx="16" cy="140" r="1.3"/></g>';
  var BUST = {
    zainab: ['#1d2b48', STARS + shoulders('#1c1c26', '<path d="M84 186l16 40l16 -40" fill="none" stroke="#e8802a" stroke-width="6"/><rect x="88" y="224" width="24" height="32" fill="#f4f1e6"' + K(2) + '/><path d="M92 234h16M92 242h12" stroke="#2a4a8a" stroke-width="2"/>') +
      '<path d="M50 124q-6 -82 50 -84q56 2 50 84q2 44 -16 66q-14 14 -34 16q-20 -2 -34 -16q-18 -22 -16 -66z" fill="#2a7a78"' + K(2.6) + '/>' +
      '<path d="M56 196q44 30 88 0l8 22q-52 30 -104 0z" fill="#2a7a78"' + K(2.4) + '/>' +
      head({ skin: '#a8724e', rx: 32, ry: 42 }) +
      '<path d="M66 96q34 -30 68 0" fill="none" stroke="#236866" stroke-width="5"/>' +
      '<g fill="none"' + K(2) + '><circle cx="85" cy="112" r="11"/><circle cx="115" cy="112" r="11"/><path d="M96 112h8"/></g>' +
      '<circle cx="85" cy="112" r="3" fill="' + INK + '"/><circle cx="115" cy="112" r="3" fill="' + INK + '"/>' +
      '<path d="M76 96q8 -5 16 -1M108 95q8 -4 16 1" fill="none"' + K(2.2) + '/>' +
      '<path d="M100 118q5 10 -2 14" fill="none"' + K(2) + '/><path d="M88 140q12 7 26 -2" fill="none"' + K(2.4) + '/>' +
      '<path d="M134 128l12 30" stroke="#333" stroke-width="3"/><circle cx="147" cy="160" r="5" fill="#333"/>'],
    terry: ['#2c2822', shoulders('#26324a', '<path d="M100 184v76" stroke="#8a94aa" stroke-width="3"/><path d="M70 196l30 -6l30 6" fill="none"' + K(2) + '/><rect x="128" y="206" width="22" height="30" fill="#1c2436"' + K(1.6) + '/><path d="M134 204v-14" stroke="#e8b830" stroke-width="5"/>') +
      head({ skin: '#e6bf9c', rx: 38, ry: 46 }) +
      '<path d="M62 118q-4 -30 6 -44M138 118q4 -30 -6 -44" fill="none" stroke="#b8b4ae" stroke-width="11" stroke-linecap="round"/>' +
      '<g fill="none"' + K(2) + '><circle cx="84" cy="80" r="10"/><circle cx="116" cy="80" r="10"/><path d="M94 80h12"/></g>' +
      '<path d="M76 104q9 -6 18 -2M106 102q9 -4 18 2" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="85" cy="112" r="3" fill="' + INK + '"/><circle cx="115" cy="112" r="3" fill="' + INK + '"/>' +
      '<path d="M100 116q7 12 -2 16" fill="none"' + K(2) + '/><path d="M86 142h28" stroke="' + INK + '" stroke-width="2.6"/>' +
      '<path d="M68 132q32 40 64 0" fill="#9a948c" opacity=".35"/>' +
      '<path d="M140 104l14 -22" stroke="#e8b830" stroke-width="6" stroke-linecap="round"/><path d="M154 82l6 -10" stroke="#8a8a8a" stroke-width="3"/>'],
    nuala: ['#e3dfd2', shoulders('#f2f0ea', '<path d="M70 186v74M130 186v74" stroke="#d8d4c8" stroke-width="10"/><g fill="#a8b8c8"><circle cx="60" cy="230" r="5"/><circle cx="150" cy="214" r="4"/><circle cx="120" cy="246" r="6"/></g>') +
      '<path d="M58 132q-10 -74 42 -76q52 2 42 76q-4 30 -16 40l-4 -36q-6 -30 -22 -40q-16 10 -22 40l-4 36q-12 -10 -16 -40z" fill="#c0562a"' + K(2.4) + '/>' +
      head({ skin: '#f2cfb0', rx: 34, ry: 44 }) +
      '<path d="M62 90q38 -40 76 0" fill="none" stroke="#3a8a5a" stroke-width="11"/><path d="M136 88l14 -8l2 14z" fill="#3a8a5a"' + K(1.6) + '/>' +
      '<path d="M66 100q4 -26 34 -28q30 2 34 28q-14 -14 -34 -14q-20 0 -34 14z" fill="#c0562a"' + K(1.8) + '/>' +
      '<circle cx="86" cy="112" r="3" fill="' + INK + '"/><circle cx="114" cy="112" r="3" fill="' + INK + '"/>' +
      '<g fill="#b8724a" opacity=".6"><circle cx="76" cy="126" r="1.6"/><circle cx="82" cy="130" r="1.4"/><circle cx="118" cy="128" r="1.6"/><circle cx="124" cy="124" r="1.4"/><circle cx="72" cy="132" r="1.2"/></g>' +
      '<path d="M100 116q6 10 -2 14" fill="none"' + K(2) + '/><path d="M86 140q14 10 28 0" fill="none"' + K(2.4) + '/>' +
      '<ellipse cx="128" cy="138" rx="9" ry="4" fill="#fbfbf6" opacity=".9"/>'],
    sabine: ['#3a1e2c', '<g fill="#fff" opacity=".4"><circle cx="30" cy="40" r="1.5"/><circle cx="168" cy="30" r="1.2"/><circle cx="176" cy="96" r="1.4"/></g>' +
      shoulders('#5a6a4a', '<path d="M60 190q40 26 80 0l6 14q-46 30 -92 0z" fill="#b8322a"' + K(2.2) + '/><path d="M118 200l12 60h20l-14 -62z" fill="#b8322a"' + K(2.2) + '/><g fill="#d8c890"><circle cx="100" cy="226" r="3.5"/><circle cx="100" cy="246" r="3.5"/></g>') +
      head({ skin: '#f0d6c0', rx: 35, ry: 45 }) +
      '<path d="M58 128q-10 -76 42 -78q52 2 42 78q-6 -4 -8 -30q-12 -22 -34 -24q-22 2 -34 24q-2 26 -8 30z" fill="#efeeea"' + K(2.2) + '/>' +
      '<g fill="none" stroke="' + INK + '" stroke-width="3.2"><circle cx="84" cy="112" r="14"/><circle cx="116" cy="112" r="14"/><path d="M98 112h4"/></g>' +
      '<circle cx="84" cy="112" r="3.2" fill="' + INK + '"/><circle cx="116" cy="112" r="3.2" fill="' + INK + '"/>' +
      '<path d="M72 94q10 -6 20 -2M108 92q10 -4 20 2" fill="none" stroke="#c8c6c0" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M100 120q6 12 -2 16" fill="none"' + K(2) + '/><path d="M84 142q16 12 32 0" fill="none"' + K(2.4) + '/>' +
      '<path d="M72 134q-2 6 2 10M128 134q2 6 -2 10" fill="none" stroke="#c8a088" stroke-width="1.6"/>']
  };
  var spr = '';
  Object.keys(BUST).forEach(function (k) { spr += sym(k, BUST[k][0], BUST[k][1]); });
  window.CAST_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>' + spr + '</defs></svg>';
  window.FACE = function (who) {
    var bg = BUST[who] ? BUST[who][0] : '#222';
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:' + bg + '"><use href="#sd-' + who + '"/></svg>';
  };
  window.SD = window.SD || {};
  window.SD.fig = fig;
  window.SD.INK = INK;
})();
