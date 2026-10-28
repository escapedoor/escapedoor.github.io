/* The people of "Under the Lamp", as busts of 200 x 260 without a background, so that the same drawing can stand in a
   scene (a desk, a bench, a café table) and sit in the panel of an interview.
   FACE('nathan') gives the bust on its own colour, for ER.talk. The face and the wig are drawn as in court/will. */
(function () {
  function face(y, o) {          /* y: the middle of the head. brows, eyes, nose, mouth */
    var s = '<path d="M72 ' + (y - 9) + 'q11-' + (o.arch || 5) + ' 22 0M106 ' + (y - 9) + 'q11-' + (o.arch || 5) + ' 22 0" stroke="' + o.brow + '" stroke-width="' + (o.bw || 4) + '" fill="none" stroke-linecap="round"/>';
    s += '<ellipse cx="84" cy="' + (y + 6) + '" rx="6.500" ry="4.400" fill="#f7f1e6"/><ellipse cx="116" cy="' + (y + 6) + '" rx="6.500" ry="4.400" fill="#f7f1e6"/>';
    s += '<circle cx="85" cy="' + (y + 6) + '" r="3.200" fill="' + o.eye + '"/><circle cx="117" cy="' + (y + 6) + '" r="3.200" fill="' + o.eye + '"/><circle cx="86" cy="' + (y + 5) + '" r="1" fill="#fff"/><circle cx="118" cy="' + (y + 5) + '" r="1" fill="#fff"/>';
    s += '<path d="M100 ' + (y + 7) + 'q-6 15 0 19q5 2 8-2" stroke="' + o.shade + '" stroke-width="2.600" fill="none" stroke-linecap="round"/>';
    s += '<path d="M' + (o.mouth || ('88 ' + (y + 39) + 'q12 5 24-1')) + '" stroke="' + (o.lip || '#8a4a44') + '" stroke-width="3.200" fill="none" stroke-linecap="round"/>';
    return s;
  }
  function wig(y) {
    var s = '<path d="M70 ' + (y + 50) + 'l-6 24h12zM130 ' + (y + 50) + 'l6 24h-12z" fill="#d8d2c2" stroke="#a9a28e" stroke-width="1.500"/>';
    s += '<path d="M58 ' + (y + 6) + 'Q54 ' + (y - 46) + ' 100 ' + (y - 48) + 'Q146 ' + (y - 46) + ' 142 ' + (y + 6) + 'Q132 ' + (y - 24) + ' 100 ' + (y - 26) + 'Q68 ' + (y - 24) + ' 58 ' + (y + 6) + 'z" fill="#e9e4d6" stroke="#b5ae99" stroke-width="1.500"/>';
    s += '<g stroke="#b5ae99" stroke-width="1.400" fill="none"><path d="M70 ' + (y - 30) + 'q30-14 60 0M66 ' + (y - 20) + 'q34-14 68 0"/></g>';
    [0, 12, 24].forEach(function (d) {
      s += '<ellipse cx="57" cy="' + (y + 2 + d) + '" rx="11" ry="6.500" fill="#ece7da" stroke="#a9a28e" stroke-width="1.500"/><ellipse cx="143" cy="' + (y + 2 + d) + '" rx="11" ry="6.500" fill="#ece7da" stroke="#a9a28e" stroke-width="1.500"/>';
    });
    return s;
  }
  var BANDS = '<path d="M91 182h8v40h-9zM101 182h8l1 40h-9z" fill="#fbfbf8" stroke="#c9ccd0" stroke-width="1"/>';
  var GROWN = 'M6 260Q8 206 46 192L82 178H118L154 192Q192 206 194 260Z';
  function neck(skin) { return '<rect x="89" y="150" width="22" height="34" fill="' + skin + '"/>'; }
  function head(skin, ear, y, rx) { y = y || 110; return '<ellipse cx="62" cy="' + y + '" rx="6" ry="10" fill="' + ear + '"/><ellipse cx="138" cy="' + y + '" rx="6" ry="10" fill="' + ear + '"/><ellipse cx="100" cy="' + y + '" rx="' + (rx || 37) + '" ry="45" fill="' + skin + '"/>'; }
  function specs(y, c, half) {
    return half ? '<path d="M72 ' + (y + 8) + 'h24v4q-12 7-24 0zM104 ' + (y + 8) + 'h24v4q-12 7-24 0z" fill="none" stroke="' + c + '" stroke-width="2"/><path d="M96 ' + (y + 9) + 'h8" stroke="' + c + '" stroke-width="2"/>'
      : '<rect x="72" y="' + (y - 2) + '" width="24" height="16" rx="6" fill="none" stroke="' + c + '" stroke-width="2"/><rect x="104" y="' + (y - 2) + '" width="24" height="16" rx="6" fill="none" stroke="' + c + '" stroke-width="2"/><path d="M96 ' + (y + 4) + 'h8" stroke="' + c + '" stroke-width="2"/>';
  }
  function gown(under) { return '<path d="' + GROWN + '" fill="#141418"/><path d="M82 178L100 196L118 178Z" fill="' + (under || '#fbfbf8') + '"/><path d="M46 192Q60 214 64 260M154 192Q140 214 136 260" stroke="#26262c" stroke-width="5" fill="none"/>'; }
  var P = {};

  /* Ms Niamh Lorimer, barrister, forty-four: short dark-red hair, a charcoal suit and a long navy coat */
  var NL_HEAD = neck('#e6bfa2') + head('#f0cdb2', '#e6bfa2') +
    '<path d="M60 116Q52 60 100 56Q148 60 140 116Q138 84 122 74Q96 88 64 94Z" fill="#7a2a1e"/>' +
    face(110, { brow: '#6a2418', eye: '#3a5a4a', shade: '#c59877', mouth: '90 149q10 2 21-2', lip: '#9a4a44', arch: 4 });
  P.lorimer = '<path d="' + GROWN + '" fill="#26304a"/><path d="M82 178L100 216L118 178Z" fill="#f2f2ee"/><path d="M82 178L60 210L94 246ZM118 178L140 210L106 246Z" fill="#3a3e48"/>' + NL_HEAD;
  /* ... and robed for court: wig, gown, bands */
  P.lorimerw = gown() + BANDS + neck('#e6bfa2') + head('#f0cdb2', '#e6bfa2') + wig(100) +
    face(110, { brow: '#6a2418', eye: '#3a5a4a', shade: '#c59877', mouth: '90 149q10 2 21-2', lip: '#9a4a44', arch: 4 });

  /* Mr Kelvin Mott, senior clerk, sixty-one: bald on top, a grey fringe, glasses pushed up, a waistcoat and shirtsleeves */
  P.mott = '<path d="' + GROWN + '" fill="#e8ecf2"/><path d="M46 192l36-14 18 40 18-40 36 14v68H46z" fill="#4a3a2a"/><g fill="#c9a45a"><circle cx="100" cy="226" r="2.400"/><circle cx="100" cy="244" r="2.400"/></g><path d="M96 182l4 16 4-16z" fill="#7a2a3a"/>' +
    neck('#e2b896') + head('#ecc6a6', '#e2b896') + '<path d="M63 112Q60 92 70 86L66 120ZM137 112Q140 92 130 86L134 120Z" fill="#b9b4ac"/>' +
    face(112, { brow: '#9a948a', eye: '#3a3a4a', shade: '#c08e6c', mouth: '90 150q10-3 20 1', lip: '#9a5348', arch: 2 }) +
    '<rect x="72" y="70" width="24" height="12" rx="5" fill="none" stroke="#3a3a40" stroke-width="2"/><rect x="104" y="70" width="24" height="12" rx="5" fill="none" stroke="#3a3a40" stroke-width="2"/>';

  /* Mrs Odette Kemp, night librarian of the Inn: grey plait, a long green cardigan, a pencil behind her ear */
  P.kemp = '<path d="' + GROWN + '" fill="#3a5a3a"/><path d="M82 178L100 202L118 178Z" fill="#e8e0cc"/><g fill="#2a442a"><circle cx="100" cy="214" r="2"/><circle cx="100" cy="232" r="2"/><circle cx="100" cy="250" r="2"/></g>' +
    neck('#d8a888') + head('#e4b898', '#d8a888') + '<path d="M60 112Q56 60 100 58Q144 60 140 112Q134 80 100 78Q66 80 60 112Z" fill="#a8a4a0"/><path d="M136 100q16 30 6 80" stroke="#a8a4a0" stroke-width="12" fill="none" stroke-linecap="round"/>' +
    '<path d="M136 70l18-26" stroke="#d9a63a" stroke-width="4"/>' +
    face(112, { brow: '#8a8480', eye: '#4a3a2a', shade: '#b08060', mouth: '90 150q10 3 20 0', lip: '#9a4a44' }) + specs(112, '#6a5a3a', true);

  /* Nathan Kershaw, thirty-one, bicycle mechanic: close-cropped dark hair, stubble, a work jacket; and in a suit for court */
  var NK_HEAD = neck('#c8906c') + head('#d69e7a', '#c8906c', 110, 39) + '<path d="M60 104Q58 64 100 62Q142 64 140 104Q132 80 100 80Q68 80 60 104Z" fill="#2a1e16"/>' +
    '<g fill="#3a2a20" opacity=".35"><ellipse cx="100" cy="146" rx="30" ry="12"/></g>' +
    face(110, { brow: '#2a1e16', eye: '#3a2a1a', shade: '#a86a4c', mouth: '89 148q11-2 22 0', lip: '#7a4038', bw: 5, arch: 3 });
  P.nathan = '<path d="' + GROWN + '" fill="#3a4a3a"/><path d="M82 178L100 200L118 178Z" fill="#8a8a7a"/><path d="M100 200v60" stroke="#2a3a2a" stroke-width="3"/><rect x="120" y="212" width="22" height="14" fill="#e8742a"/>' + NK_HEAD;
  P.nathans = '<path d="' + GROWN + '" fill="#2a2e38"/><path d="M82 178L100 214L118 178Z" fill="#eef0f4"/><path d="M98 186l-5 40 7 10 7-10-5-40z" fill="#5a2a2a"/><path d="M82 178L64 206L94 240ZM118 178L136 206L106 240Z" fill="#20242c"/>' + NK_HEAD;

  /* Mr Laurie Mendes, solicitor, fifty-eight: brown skin, neat white beard, round glasses, a tweed jacket */
  P.mendes = '<path d="' + GROWN + '" fill="#7a5a3a"/><g stroke="#5a3e24" stroke-width="1.200" opacity=".6"><path d="M20 230h160M14 246h172M30 214h140"/></g><path d="M82 178L100 206L118 178Z" fill="#dfe8f0"/><path d="M98 186l-4 30 6 8 6-8-4-30z" fill="#2a4a6a"/>' +
    neck('#9a6a48') + head('#a87652', '#9a6a48') + '<path d="M64 98Q64 70 100 68Q136 70 136 98Q124 84 100 84Q76 84 64 98Z" fill="#3a3430"/>' +
    '<path d="M66 126Q68 170 100 174Q132 170 134 126Q122 152 100 152Q78 152 66 126Z" fill="#e8e4dc"/>' +
    face(108, { brow: '#d8d2c6', eye: '#22160f', shade: '#6a4228', mouth: '90 144q10 3 20 0', lip: '#5a2a24' }) +
    '<circle cx="84" cy="114" r="11" fill="none" stroke="#2a2a30" stroke-width="2"/><circle cx="116" cy="114" r="11" fill="none" stroke="#2a2a30" stroke-width="2"/><path d="M95 114h10" stroke="#2a2a30" stroke-width="2"/>';

  /* Mr Liam O'Kane, fifty-four, once a delivery driver: ginger hair going grey, freckles, a fleece zipped to the chin */
  P.okane = '<path d="' + GROWN + '" fill="#2a5a6a"/><path d="M88 178h24v30H88z" fill="#24505e"/><path d="M100 178v82" stroke="#c9ccd0" stroke-width="3"/>' +
    neck('#efc4a4') + head('#f6d0b2', '#efc4a4') + '<path d="M60 108Q56 60 100 58Q144 60 140 108Q132 76 104 78Q76 74 60 108Z" fill="#b8784a"/>' +
    '<g fill="#c9845a" opacity=".55"><circle cx="78" cy="128" r="1.6"/><circle cx="86" cy="132" r="1.4"/><circle cx="114" cy="132" r="1.4"/><circle cx="122" cy="128" r="1.6"/><circle cx="82" cy="136" r="1.2"/><circle cx="118" cy="136" r="1.2"/></g>' +
    face(110, { brow: '#a8683e', eye: '#3a6a8a', shade: '#c59877', mouth: '87 146q13 8 26 0', lip: '#a3524a' });

  /* Mrs Maureen Kilner, seventy-nine: white hair set in waves, glasses, a good camel coat and a small felt hat */
  P.kilner = '<path d="' + GROWN + '" fill="#b08a5a"/><path d="M82 178L100 200L118 178Z" fill="#e8d8c8"/><path d="M82 178L64 204L92 236ZM118 178L136 204L108 236Z" fill="#9a764a"/><circle cx="72" cy="214" r="5" fill="#d9b25a"/>' +
    neck('#ecc6a6') + head('#f4d2b6', '#ecc6a6') + '<g fill="#eeeeee"><circle cx="70" cy="86" r="12"/><circle cx="86" cy="76" r="12"/><circle cx="114" cy="76" r="12"/><circle cx="130" cy="86" r="12"/><circle cx="64" cy="102" r="9"/><circle cx="136" cy="102" r="9"/></g>' +
    '<path d="M62 76q38-34 76 0q-38-12-76 0z" fill="#5a3a4a"/><path d="M56 78h88" stroke="#4a2a3a" stroke-width="5" stroke-linecap="round"/>' +
    face(114, { brow: '#b8b8b8', eye: '#4a5a6a', shade: '#c08e6c', mouth: '90 152q10 2 20 0', lip: '#a3524a' }) + specs(114, '#7a5a6a');

  /* Mr Magnus Ormsby, counsel for the Crown: robed, tall, long-faced, amused */
  P.ormsby = gown() + BANDS + neck('#e8c2a2') + '<ellipse cx="62" cy="112" rx="6" ry="10" fill="#e8c2a2"/><ellipse cx="138" cy="112" rx="6" ry="10" fill="#e8c2a2"/><ellipse cx="100" cy="114" rx="33" ry="50" fill="#f1cfb2"/>' + wig(100) +
    face(112, { brow: '#5a4a3a', eye: '#3a4a5a', shade: '#c59877', mouth: '90 154q10 4 21-2', lip: '#a3524a', arch: 7 });

  /* Lady Justice Lanyon, who presides: a judge's wig and black robe, steel-grey eyes, reading glasses on a cord */
  P.lanyon = gown('#f4f4f0') + BANDS + neck('#e2b896') + head('#ecc6a6', '#e2b896') + wig(100) +
    face(112, { brow: '#7a6a5a', eye: '#4a5a6a', shade: '#c08e6c', mouth: '90 150h20', lip: '#9a5348', arch: 3 }) + specs(112, '#3a3a40', true) +
    '<path d="M72 122q-10 40 28 70M128 122q10 40-28 70" fill="none" stroke="#c9a45a" stroke-width="1.200"/>';
  /* the two judges beside her, seen only at a distance */
  P.judge2 = gown('#f4f4f0') + BANDS + neck('#a87652') + head('#b88460', '#a87652') + wig(100) + face(112, { brow: '#2a1e16', eye: '#22160f', shade: '#7a4a2c', mouth: '90 150h20', lip: '#5a2a24' });
  P.judge3 = gown('#f4f4f0') + BANDS + neck('#e6bfa2') + head('#f0cdb2', '#e6bfa2') + wig(100) + face(112, { brow: '#8a7a5a', eye: '#3a5a7a', shade: '#c59877', mouth: '90 150q10 2 20 0', lip: '#a3524a' }) + specs(112, '#6a5a3a');

  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>', k;
  for (k in P) s += '<symbol id="ch-' + k + '" viewBox="0 0 200 260">' + P[k] + '</symbol>';
  window.CAST_SVG = s + '</defs></svg>';
  var BG = { lorimer: '#2e2a3a', lorimerw: '#2a2e3a', mott: '#3a3428', kemp: '#2e3a2e', nathan: '#30382e', nathans: '#2e3038', mendes: '#3a3024',
    okane: '#2a3a40', kilner: '#3a2e34', ormsby: '#2a2e36', lanyon: '#2a2420' };
  window.FACE = function (id) {
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:' + (BG[id] || '#2a3038') + '"><use href="#ch-' + id + '"/></svg>';
  };
})();
