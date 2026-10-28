/* The people of "Same Rules", as busts of 200 x 260, each in the light of the place where you meet them.
   FACE('iona' | 'colm' | 'lydia' | 'frank' | 'fergus' | 'hilda' | 'aled') gives the picture for an interview. */
(function () {
  function head(o) {
    var s = '';
    s += '<rect x="87" y="144" width="26" height="44" fill="' + o.skin + '"/><path d="M87 166q13 11 26 0v22h-26z" fill="' + o.shade + '" opacity=".6"/>';
    s += '<ellipse cx="58" cy="112" rx="6" ry="10" fill="' + o.skin + '"/><ellipse cx="142" cy="112" rx="6" ry="10" fill="' + o.skin + '"/>';
    s += '<ellipse cx="100" cy="106" rx="' + (o.wide || 41) + '" ry="' + (o.long || 49) + '" fill="' + o.skin + '"/>';
    if (o.glow) s += '<path d="' + (o.glowL ? 'M73 68Q50 106 74 146' : 'M127 68Q150 106 126 146') + '" fill="none" stroke="' + o.glow + '" stroke-width="7" stroke-linecap="round" opacity=".42"/>';
    return s;
  }
  function eyes(o) {
    var e = o.eye || '#3a2a1c', w = o.wide || 5, y = o.y || 112;
    return '<ellipse cx="83" cy="' + y + '" rx="6.5" ry="' + w + '" fill="#fbf7ee"/><ellipse cx="117" cy="' + y + '" rx="6.5" ry="' + w + '" fill="#fbf7ee"/>' +
      '<circle cx="' + (83 + (o.look || 0)) + '" cy="' + (y + 0.5) + '" r="3.4" fill="' + e + '"/><circle cx="' + (117 + (o.look || 0)) + '" cy="' + (y + 0.5) + '" r="3.4" fill="' + e + '"/>' +
      '<circle cx="' + (84 + (o.look || 0)) + '" cy="' + (y - 0.7) + '" r="1" fill="#fff"/><circle cx="' + (118 + (o.look || 0)) + '" cy="' + (y - 0.7) + '" r="1" fill="#fff"/>';
  }
  function nose(c) { return '<path d="M100 116q-5 12 0 16q5 2 7 -2" stroke="' + c + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>'; }
  function body(fill) { return '<path d="M6 260Q8 206 48 192L84 178H116L152 192Q192 206 194 260Z" fill="' + fill + '"/>'; }
  function brows(c, w) { return '<path d="M72 98q10 -4 20 0M108 98q11 -4 21 0" stroke="' + c + '" stroke-width="' + (w || 3) + '" fill="none" stroke-linecap="round"/>'; }

  var S = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>';

  /* Iona Bellwood, the fact-check producer: a grey-brown bob, red glasses, a purple cardigan, the coral lanyard of IBTV,
     and the blue light of the screens on the desk */
  S += '<symbol id="fc-iona" viewBox="0 0 200 260"><rect width="200" height="260" fill="#1d1830"/>' +
    '<g fill="#4a6ad0" opacity=".28"><rect x="8" y="22" width="60" height="40"/><rect x="132" y="22" width="60" height="40"/></g><path d="M200 0L80 260H200Z" fill="#ffb27a" opacity=".07"/>' +
    body('#5a3d6e') + '<path d="M84 178L100 216L116 178Z" fill="#ece6dc"/><path d="M84 180L100 244L116 180" fill="none" stroke="#ff7a59" stroke-width="4"/><rect x="90" y="236" width="20" height="24" rx="2" fill="#fff"/>' +
    head({ skin: '#eac4a6', shade: '#cfa686', glow: '#8fb0ff', glowL: 1 }) +
    '<path d="M54 140Q42 56 100 52Q158 56 146 140L138 142Q142 104 132 82Q100 92 68 82Q58 104 62 142Z" fill="#5b4a46"/><path d="M70 60Q100 50 128 62" stroke="#a69a92" stroke-width="3" fill="none" opacity=".7"/>' +
    brows('#4a3a36') + eyes({ eye: '#4a5a3a', wide: 4.5, look: 1 }) + nose('#cfa686') +
    '<g fill="none" stroke="#c0392b" stroke-width="4"><rect x="69" y="103" width="28" height="19" rx="5"/><rect x="103" y="103" width="28" height="19" rx="5"/><path d="M97 110h6M69 108l-11 -3M131 108l11 -3"/></g>' +
    '<path d="M87 147q13 3 26 -3" stroke="#8c4a3c" stroke-width="3.2" fill="none" stroke-linecap="round"/></symbol>';

  /* Colm Hadley, the presenter: a good suit, a plum tie, the hair of a man who has a mirror in his dressing room */
  S += '<symbol id="fc-colm" viewBox="0 0 200 260"><rect width="200" height="260" fill="#241a48"/><circle cx="100" cy="90" r="90" fill="#6a4ad0" opacity=".18"/>' +
    body('#1f2a44') + '<path d="M84 178L100 222L116 178Z" fill="#eef1f6"/><path d="M96 184h8l4 48l-8 10l-8 -10z" fill="#7a2a5a"/><path d="M84 178L68 212L98 240M116 178L132 212L102 240" fill="none" stroke="#141c30" stroke-width="5" stroke-linejoin="round"/>' +
    head({ skin: '#f1d2bb', shade: '#d4b098' }) +
    '<path d="M58 104Q54 52 100 50Q146 52 142 104Q136 74 104 72Q82 64 72 78Q62 86 58 104Z" fill="#7a5a3a"/>' +
    brows('#6a4a2a') + eyes({ eye: '#3a5a7a', wide: 4.6 }) + nose('#d4b098') +
    '<path d="M84 142q16 10 32 0" stroke="#8c4a3c" stroke-width="3" fill="#fff" stroke-linecap="round"/></symbol>';

  /* Lydia Gethin, independent: black curls, an orange scarf (her colour), a green jacket, notes on her knee */
  S += '<symbol id="fc-lydia" viewBox="0 0 200 260"><rect width="200" height="260" fill="#3a2a2e"/><g fill="#ffe1b0" opacity=".55"><circle cx="16" cy="30" r="7"/><circle cx="16" cy="70" r="7"/><circle cx="16" cy="110" r="7"/><circle cx="16" cy="150" r="7"/></g>' +
    body('#2f5a3a') + '<path d="M84 178L100 214L116 178Z" fill="#f3efe6"/><path d="M60 196Q100 222 140 196L146 214Q100 244 54 214Z" fill="#d4682a"/><path d="M118 214l10 46h-16l-4 -42z" fill="#d4682a"/>' +
    head({ skin: '#c48a64', shade: '#a8704c', glow: '#ffd9a0' }) +
    (function () { var t = '', k; for (k = 0; k < 9; k++) t += '<circle cx="' + (58 + k * 10.5) + '" cy="' + (66 - Math.sin(k / 8 * Math.PI) * 16) + '" r="14" fill="#1d1512"/>'; t += '<circle cx="56" cy="96" r="12" fill="#1d1512"/><circle cx="144" cy="96" r="12" fill="#1d1512"/><circle cx="54" cy="120" r="10" fill="#1d1512"/><circle cx="146" cy="120" r="10" fill="#1d1512"/>'; return t; })() +
    brows('#1d1512') + eyes({ eye: '#2a1a12', wide: 5 }) + nose('#a8704c') +
    '<path d="M86 144q14 8 28 0" stroke="#7a3a2a" stroke-width="3" fill="none" stroke-linecap="round"/></symbol>';

  /* Frank Lavery, leader of the council: bald, a white fringe, a blue tie (his colour), a face that has shaken a lot of hands */
  S += '<symbol id="fc-frank" viewBox="0 0 200 260"><rect width="200" height="260" fill="#3a2a2e"/><g fill="#ffe1b0" opacity=".55"><circle cx="184" cy="30" r="7"/><circle cx="184" cy="70" r="7"/><circle cx="184" cy="110" r="7"/><circle cx="184" cy="150" r="7"/></g>' +
    body('#1e2c48') + '<path d="M84 178L100 222L116 178Z" fill="#f2f3f6"/><path d="M96 184h8l4 48l-8 10l-8 -10z" fill="#2f6db5"/><path d="M84 178L68 212L98 240M116 178L132 212L102 240" fill="none" stroke="#141c30" stroke-width="5" stroke-linejoin="round"/>' +
    '<circle cx="62" cy="214" r="6" fill="#2f6db5"/><circle cx="62" cy="214" r="3" fill="#fff"/>' +
    head({ skin: '#efc6a8', shade: '#d2a688', wide: 44, long: 50 }) +
    '<path d="M57 120Q54 92 63 82Q61 102 65 122ZM143 120Q146 92 137 82Q139 102 135 122Z" fill="#ecebe6"/>' +
    brows('#d8d4ca', 4.4) + eyes({ eye: '#3a4a6a', wide: 4, look: -1 }) + nose('#d2a688') +
    '<path d="M74 132q-4 8 2 14M126 132q4 8 -2 14" stroke="#d2a688" stroke-width="2" fill="none"/><path d="M84 146q16 6 32 0" stroke="#8c4a3c" stroke-width="3.2" fill="none" stroke-linecap="round"/></symbol>';

  /* Fergus Dowd, Mr Lavery's agent: a beige raincoat, grey stubble, a cigarette, and the orange light of the car park */
  S += '<symbol id="fc-fergus" viewBox="0 0 200 260"><rect width="200" height="260" fill="#14161e"/><circle cx="170" cy="20" r="80" fill="#ff9a3a" opacity=".2"/>' +
    '<g stroke="#9ab" stroke-width="1" opacity=".35"><path d="M20 0l-6 40M60 10l-6 40M120 0l-6 40M170 30l-6 40M40 120l-6 40M150 140l-6 40"/></g>' +
    body('#a8916a') + '<path d="M84 178L100 214L116 178Z" fill="#d9d4c8"/><path d="M84 178L58 260M116 178L142 260" stroke="#8a754f" stroke-width="6"/>' +
    head({ skin: '#e7c3a8', shade: '#c9a488', glow: '#ff9a3a', long: 52, wide: 39 }) +
    '<path d="M60 98Q58 56 100 54Q142 56 140 98Q134 76 100 74Q68 76 60 98Z" fill="#8f8a82"/>' +
    '<path d="M62 120Q64 158 100 162Q136 158 138 120Q128 146 100 146Q72 146 62 120Z" fill="#6a625a" opacity=".35"/>' +
    brows('#6a645c', 3.6) + eyes({ eye: '#4a4a3a', wide: 3.6, look: 2 }) + nose('#c9a488') +
    '<path d="M88 146q12 -2 24 1" stroke="#7a3f34" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M110 146l26 -6" stroke="#f2efe6" stroke-width="4"/><circle cx="137" cy="140" r="3" fill="#ff6a2a"/>' +
    '<path d="M140 134q6 -16 -2 -30q-6 -12 4 -26" stroke="#cfd4da" stroke-width="2" fill="none" opacity=".5"/></symbol>';

  /* Hilda Cawley, the tape librarian since 1989: a white bun, glasses on a chain, a mustard cardigan, shelves of tapes */
  S += '<symbol id="fc-hilda" viewBox="0 0 200 260"><rect width="200" height="260" fill="#2a2a1e"/>' +
    (function () { var t = '', k, j, c = ['#7a3a2a', '#2a4a6a', '#5a6a2a', '#8a6a2a', '#3a3a5a']; for (j = 0; j < 3; j++) for (k = 0; k < 10; k++) t += '<rect x="' + (2 + k * 20) + '" y="' + (16 + j * 52) + '" width="16" height="44" fill="' + c[(k + j * 3) % 5] + '" opacity=".55"/>'; return t; })() +
    body('#b98a2a') + '<path d="M84 178L100 216L116 178Z" fill="#f2ece0"/><path d="M100 200v60" stroke="#8a6418" stroke-width="2"/>' +
    head({ skin: '#efd2bc', shade: '#d4b49e' }) +
    '<path d="M58 104Q56 54 100 52Q144 54 142 104Q132 76 100 74Q68 76 58 104Z" fill="#eeeae2"/><circle cx="100" cy="44" r="18" fill="#eeeae2"/>' +
    brows('#cfc8bc') + eyes({ eye: '#4a5a6a', wide: 4 }) + nose('#d4b49e') +
    '<g fill="none" stroke="#3a3a3a" stroke-width="2.6"><circle cx="83" cy="113" r="12"/><circle cx="117" cy="113" r="12"/><path d="M95 112h10"/><path d="M71 116Q60 160 84 186M129 116Q140 160 116 186" stroke="#c9a23a" stroke-width="1.6"/></g>' +
    '<path d="M86 145q14 6 28 0" stroke="#8c4a3c" stroke-width="3" fill="none" stroke-linecap="round"/></symbol>';

  /* Aled Jenkins, the director: a black T-shirt, a beard, a headset, and the coloured light of thirty monitors */
  S += '<symbol id="fc-aled" viewBox="0 0 200 260"><rect width="200" height="260" fill="#0b0d14"/>' +
    '<g opacity=".55"><rect x="6" y="14" width="44" height="30" fill="#2a6ab0"/><rect x="56" y="14" width="44" height="30" fill="#b03a5a"/><rect x="106" y="14" width="44" height="30" fill="#2a8a6a"/><rect x="156" y="14" width="44" height="30" fill="#c08a2a"/></g><rect x="150" y="10" width="54" height="38" fill="none" stroke="#ff2a2a" stroke-width="3"/>' +
    body('#1d1d22') +
    head({ skin: '#d9a37c', shade: '#bb8660', glow: '#ff5a5a', glowL: 1 }) +
    '<path d="M60 100Q58 56 100 54Q142 56 140 100Q132 78 100 76Q68 78 60 100Z" fill="#2a2420"/>' +
    '<path d="M60 118Q60 170 100 176Q140 170 140 118Q132 150 100 150Q68 150 60 118Z" fill="#2a2420"/>' +
    brows('#2a2420', 3.6) + eyes({ eye: '#2a1d14', wide: 4.2 }) + nose('#bb8660') +
    '<path d="M88 146q12 4 24 0" stroke="#e8c0a0" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M56 108Q56 40 100 40Q144 40 144 108" fill="none" stroke="#111" stroke-width="7"/><rect x="46" y="96" width="16" height="30" rx="5" fill="#111"/><path d="M54 126Q60 150 86 150" fill="none" stroke="#111" stroke-width="3"/><circle cx="88" cy="150" r="4" fill="#111"/></symbol>';

  S += '</defs></svg>';
  window.CAST_SVG = S;
  window.FACE = function (who) {
    var bg = { iona: '#1d1830', colm: '#241a48', lydia: '#3a2a2e', frank: '#3a2a2e', fergus: '#14161e', hilda: '#2a2a1e', aled: '#0b0d14' }[who] || '#222';
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:' + bg + '"><use href="#fc-' + who + '"/></svg>';
  };
})();
