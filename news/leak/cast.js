/* The people of "Letterhead", as busts of 200 x 260, each in the light of the place where you meet them.
   FACE('rowena' | 'tariq' | 'pendry' | 'stringer' | 'stallard' | 'thea' | 'seb' | 'queenie' | 'pauline' | 'trish') */
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
  function brows(c, w, up) { return '<path d="M72 ' + (98 - (up || 0)) + 'q10 -4 20 0M108 98q11 -4 21 0" stroke="' + c + '" stroke-width="' + (w || 3) + '" fill="none" stroke-linecap="round"/>'; }
  function mouth(c, d) { return '<path d="M86 145q14 ' + (d == null ? 6 : d) + ' 28 0" stroke="' + c + '" stroke-width="3" fill="none" stroke-linecap="round"/>'; }
  function specs(c, round) {
    return round ? '<g fill="none" stroke="' + c + '" stroke-width="2.6"><circle cx="83" cy="113" r="12"/><circle cx="117" cy="113" r="12"/><path d="M95 112h10"/></g>' :
      '<g fill="none" stroke="' + c + '" stroke-width="3.4"><rect x="69" y="103" width="28" height="19" rx="4"/><rect x="103" y="103" width="28" height="19" rx="4"/><path d="M97 110h6"/></g>';
  }

  var S = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>';

  /* Rowena Prosser, editor and owner: cropped white hair, black glasses, a green jacket, a rust scarf, grey morning light */
  S += '<symbol id="lk-rowena" viewBox="0 0 200 260"><rect width="200" height="260" fill="#2c3a40"/><rect x="120" y="0" width="80" height="150" fill="#9fb4c0" opacity=".25"/>' +
    body('#2f4a3e') + '<path d="M84 178L100 214L116 178Z" fill="#f1ebe0"/><path d="M60 196Q100 222 140 196L146 212Q100 240 54 212Z" fill="#b8452a"/>' +
    head({ skin: '#efd0b8', shade: '#d2b098', glow: '#c8dce8' }) +
    '<path d="M58 100Q54 54 100 52Q146 54 142 100Q138 80 120 74Q100 82 80 74Q62 80 58 100Z" fill="#d8d2c8"/>' +
    brows('#a8a096', 3.2, 2) + eyes({ eye: '#3a4a3a', wide: 4.2 }) + nose('#d2b098') + specs('#1d1d1d') + mouth('#8c4a3c', 2) + '</symbol>';

  /* Tariq Shah, chief reporter: a beard, a tan corduroy jacket, a pencil behind his ear, the newsroom lamps */
  S += '<symbol id="lk-tariq" viewBox="0 0 200 260"><rect width="200" height="260" fill="#3a2e24"/><circle cx="30" cy="20" r="40" fill="#ffd28a" opacity=".18"/>' +
    body('#7a5a3a') + '<path d="M84 178L100 216L116 178Z" fill="#e6ecf2"/><path d="M84 178L66 214M116 178L134 214" stroke="#5a4028" stroke-width="5"/>' +
    head({ skin: '#b9845e', shade: '#9a6a48', glow: '#ffd28a', glowL: 1 }) +
    '<path d="M60 100Q58 56 100 54Q142 56 140 100Q132 76 100 74Q68 76 60 100Z" fill="#1c1612"/>' +
    '<path d="M60 118Q60 168 100 174Q140 168 140 118Q132 148 100 148Q68 148 60 118Z" fill="#1c1612"/>' +
    '<path d="M140 70l18 -26" stroke="#e8b84a" stroke-width="5" stroke-linecap="round"/><path d="M156 46l4 -6" stroke="#333" stroke-width="5"/>' +
    brows('#1c1612', 3.6) + eyes({ eye: '#2a1d14', wide: 4.6, look: 1 }) + nose('#9a6a48') + '<path d="M88 146q12 5 24 0" stroke="#e8c0a0" stroke-width="2.6" fill="none" stroke-linecap="round"/></symbol>';

  /* Cllr Sheila Pendry: a brown bob going grey at the front, red-framed glasses, a plum cardigan, the cream walls of the Corn Exchange */
  S += '<symbol id="lk-pendry" viewBox="0 0 200 260"><rect width="200" height="260" fill="#d9cdb4"/><rect x="0" y="180" width="200" height="80" fill="#5a7a5a" opacity=".4"/>' +
    body('#5a2a3a') + '<path d="M84 178L100 216L116 178Z" fill="#f2ece2"/><path d="M84 178L100 250L116 178" fill="none" stroke="#3a1a26" stroke-width="2"/>' +
    head({ skin: '#eccbb4', shade: '#cfa98f' }) +
    '<path d="M54 140Q42 56 100 52Q158 56 146 140L138 142Q142 104 132 82Q100 92 68 82Q58 104 62 142Z" fill="#8a5a3a"/><path d="M76 60Q100 52 122 62" stroke="#c8beb2" stroke-width="5" fill="none"/>' +
    brows('#6a4a2a', 3, 1) + eyes({ eye: '#4a3a2a', wide: 4.4 }) + nose('#cfa98f') + specs('#9a2a2a') + mouth('#8c4a3c', 1) + '</symbol>';

  /* Cllr Ralph Stringer: grey hair, a grey moustache, a red tie, a council corridor's green tiles */
  S += '<symbol id="lk-stringer" viewBox="0 0 200 260"><rect width="200" height="260" fill="#cfd8c6"/><g fill="#3f6a52" opacity=".55"><rect y="170" width="200" height="90"/></g><path d="M0 170h200" stroke="#2a4a3a" stroke-width="4"/>' +
    body('#3a3f4a') + '<path d="M84 178L100 222L116 178Z" fill="#f0f0ee"/><path d="M96 184h8l4 48l-8 10l-8 -10z" fill="#9a2a2a"/><path d="M84 178L68 212L98 240M116 178L132 212L102 240" fill="none" stroke="#24282f" stroke-width="5" stroke-linejoin="round"/>' +
    head({ skin: '#e9b89a', shade: '#cc9a7c', wide: 44, long: 50 }) +
    '<path d="M58 102Q56 56 100 54Q144 56 142 102Q136 80 100 76Q64 80 58 102Z" fill="#9a8f86"/>' +
    brows('#7a7068', 4.4) + eyes({ eye: '#3a4a5a', wide: 3.8, look: -2 }) + nose('#cc9a7c') +
    '<path d="M80 136q20 -8 40 0q-20 6 -40 0z" fill="#8a7f76"/>' + mouth('#7a3a2a', 4) + '</symbol>';

  /* Patrick Stallard, builder: dark hair, a navy quilted coat, the amber light of the Plough */
  S += '<symbol id="lk-stallard" viewBox="0 0 200 260"><rect width="200" height="260" fill="#3a1e14"/><circle cx="170" cy="40" r="70" fill="#ff9a3a" opacity=".22"/>' +
    body('#20406a') + '<path d="M84 178L100 214L116 178Z" fill="#dfe8f0"/><g stroke="#183256" stroke-width="2"><path d="M30 214h140M24 236h152"/></g>' +
    head({ skin: '#e3b796', shade: '#c4987a', glow: '#ffae5a' }) +
    '<path d="M60 98Q58 56 100 54Q142 56 140 98Q130 74 100 72Q70 74 60 98Z" fill="#3a2c22"/>' +
    '<path d="M62 120Q64 158 100 162Q136 158 138 120Q128 146 100 146Q72 146 62 120Z" fill="#3a2c22" opacity=".3"/>' +
    brows('#3a2c22', 4) + eyes({ eye: '#2a3a4a', wide: 4 }) + nose('#c4987a') + mouth('#7a3a2a', -2) + '</symbol>';

  /* Thea Rushton: a white bun, round glasses, a green cardigan, the fire in the snug */
  S += '<symbol id="lk-thea" viewBox="0 0 200 260"><rect width="200" height="260" fill="#40201a"/><circle cx="20" cy="200" r="80" fill="#ff7a2a" opacity=".22"/>' +
    body('#3a6a5a') + '<path d="M84 178L100 216L116 178Z" fill="#efe6d6"/><path d="M100 200v60" stroke="#244a3c" stroke-width="2"/>' +
    head({ skin: '#f0d6c4', shade: '#d4b6a2', glow: '#ff9a4a', glowL: 1 }) +
    '<path d="M58 104Q56 54 100 52Q144 54 142 104Q132 76 100 74Q68 76 58 104Z" fill="#f2efe8"/><circle cx="100" cy="44" r="18" fill="#f2efe8"/>' +
    brows('#d8d2c8') + eyes({ eye: '#3a5a6a', wide: 4 }) + nose('#d4b6a2') + specs('#4a4a4a', 1) + mouth('#8c4a3c', 5) + '</symbol>';

  /* Seb Rushton, nineteen: a beanie, a mustard hoodie, a phone in his hand, the snug window */
  S += '<symbol id="lk-seb" viewBox="0 0 200 260"><rect width="200" height="260" fill="#2a2a2a"/><rect x="130" y="20" width="60" height="80" fill="#8aa0b0" opacity=".35"/>' +
    body('#c8a03a') + '<path d="M70 190Q100 210 130 190" stroke="#a8842a" stroke-width="6" fill="none"/><path d="M92 200v40M108 200v40" stroke="#eee" stroke-width="2"/>' +
    head({ skin: '#f0cfb6', shade: '#d2b098' }) +
    '<path d="M60 96Q60 60 100 58Q140 60 140 96Q128 80 100 80Q72 80 60 96Z" fill="#6a4a2a"/>' +
    '<path d="M56 92Q56 38 100 38Q144 38 144 92Z" fill="#2a3a4a"/><rect x="54" y="84" width="92" height="14" rx="5" fill="#33475a"/>' +
    brows('#6a4a2a', 3, 3) + eyes({ eye: '#4a3a2a', wide: 5, look: 2 }) + nose('#d2b098') + mouth('#8c4a3c', 3) + '</symbol>';

  /* Queenie Sorrell, printer: white curls, amber glasses pushed up, a black apron, the green of the press */
  S += '<symbol id="lk-queenie" viewBox="0 0 200 260"><rect width="200" height="260" fill="#16262a"/><rect x="0" y="40" width="200" height="40" fill="#2f6a5a" opacity=".5"/><circle cx="160" cy="70" r="5" fill="#ffcf5a"/>' +
    body('#2a4a5a') + '<path d="M60 196h80v64H60z" fill="#3a3a3a"/><path d="M84 178L100 214L116 178Z" fill="#d8d2c4"/>' +
    head({ skin: '#e8c7ae', shade: '#caa88e', glow: '#9ad0c0' }) +
    (function () { var t = '', k; for (k = 0; k < 9; k++) t += '<circle cx="' + (58 + k * 10.5) + '" cy="' + (66 - Math.sin(k / 8 * Math.PI) * 16) + '" r="13" fill="#e8e2d8"/>'; return t + '<circle cx="56" cy="96" r="11" fill="#e8e2d8"/><circle cx="144" cy="96" r="11" fill="#e8e2d8"/>'; })() +
    '<g fill="none" stroke="#9a6a2a" stroke-width="3"><rect x="70" y="58" width="26" height="14" rx="4"/><rect x="104" y="58" width="26" height="14" rx="4"/></g>' +
    brows('#bcb4a8') + eyes({ eye: '#3a4a3a', wide: 4.2 }) + nose('#caa88e') + '<path d="M86 146q14 3 28 -3" stroke="#8c4a3c" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<path d="M60 150q-6 6 -4 14" stroke="#1d1d1d" stroke-width="3" opacity=".5"/></symbol>';

  /* Pauline Stacey, Members' Services: a dark bun, a lilac cardigan, a teal lanyard, the office hatch */
  S += '<symbol id="lk-pauline" viewBox="0 0 200 260"><rect width="200" height="260" fill="#e6dfcc"/><rect x="0" y="0" width="200" height="30" fill="#8a7a5a" opacity=".35"/><rect x="0" y="230" width="200" height="30" fill="#8a7a5a" opacity=".5"/>' +
    body('#8a6a9a') + '<path d="M84 178L100 214L116 178Z" fill="#f2ecf2"/><path d="M84 180L100 244L116 180" fill="none" stroke="#1f6f78" stroke-width="4"/><rect x="90" y="236" width="20" height="24" rx="2" fill="#fff"/>' +
    head({ skin: '#d9a985', shade: '#bc8c68' }) +
    '<path d="M58 104Q56 54 100 52Q144 54 142 104Q132 76 100 74Q68 76 58 104Z" fill="#3a2a20"/><circle cx="100" cy="44" r="16" fill="#3a2a20"/>' +
    brows('#3a2a20') + eyes({ eye: '#2a1d14', wide: 4.4, look: -1 }) + nose('#bc8c68') + mouth('#7a3a2a', 4) + '</symbol>';

  /* Trish Parkin, the Plough: long copper hair, a black shirt, a red apron, the optics behind the bar */
  S += '<symbol id="lk-trish" viewBox="0 0 200 260"><rect width="200" height="260" fill="#2a1410"/>' +
    (function () { var t = '', k, c = ['#c88a2a', '#6a8a3a', '#b84a2a', '#e8c86a', '#5a3a2a']; for (k = 0; k < 8; k++) t += '<rect x="' + (6 + k * 25) + '" y="20" width="14" height="40" rx="3" fill="' + c[k % 5] + '" opacity=".6"/>'; return t; })() +
    body('#1d1d22') + '<path d="M60 196h80v64H60z" fill="#7a1f1f"/><path d="M84 178L100 212L116 178Z" fill="#f4f0e8"/>' +
    head({ skin: '#f0c8aa', shade: '#d2a88a', glow: '#ffae5a', glowL: 1 }) +
    '<path d="M54 160Q40 56 100 52Q160 56 146 160L134 150Q142 104 132 82Q100 92 68 82Q58 104 66 150Z" fill="#b8562a"/>' +
    brows('#8a3a1a', 3, 2) + eyes({ eye: '#3a5a3a', wide: 4.6 }) + nose('#d2a88a') + mouth('#9a3a3a', 7) + '</symbol>';

  S += '</defs></svg>';
  window.CAST_SVG = S;
  window.FACE = function (who) {
    var bg = { rowena: '#2c3a40', tariq: '#3a2e24', pendry: '#d9cdb4', stringer: '#cfd8c6', stallard: '#3a1e14', thea: '#40201a', seb: '#2a2a2a', queenie: '#16262a', pauline: '#e6dfcc', trish: '#2a1410' }[who] || '#222';
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:' + bg + '"><use href="#lk-' + who + '"/></svg>';
  };
})();
