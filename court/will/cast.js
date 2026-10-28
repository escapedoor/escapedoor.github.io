/* The people of "In Our Joint Presence", as busts of 200 x 260 without a background, so that the same drawing can stand
   in a scene (a counter, a bench, a witness box) and sit in the panel of an interview.
   FACE('seth') gives the bust on its own colour, for ER.talk and for the cross-examination.
   The face and the wig are drawn as in court/violin; the rest is put together from parts. */
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
  function head(skin, ear, y) { y = y || 110; return '<ellipse cx="62" cy="' + y + '" rx="6" ry="10" fill="' + ear + '"/><ellipse cx="138" cy="' + y + '" rx="6" ry="10" fill="' + ear + '"/><ellipse cx="100" cy="' + y + '" rx="37" ry="45" fill="' + skin + '"/>'; }
  function specs(y, c, half) {
    return half ? '<path d="M72 ' + (y + 8) + 'h24v4q-12 7-24 0zM104 ' + (y + 8) + 'h24v4q-12 7-24 0z" fill="none" stroke="' + c + '" stroke-width="2"/><path d="M96 ' + (y + 9) + 'h8" stroke="' + c + '" stroke-width="2"/>'
      : '<rect x="72" y="' + (y - 2) + '" width="24" height="16" rx="6" fill="none" stroke="' + c + '" stroke-width="2"/><rect x="104" y="' + (y - 2) + '" width="24" height="16" rx="6" fill="none" stroke="' + c + '" stroke-width="2"/><path d="M96 ' + (y + 4) + 'h8" stroke="' + c + '" stroke-width="2"/>';
  }
  function gown(under) { return '<path d="' + GROWN + '" fill="#141418"/><path d="M82 178L100 196L118 178Z" fill="' + (under || '#fbfbf8') + '"/><path d="M46 192Q60 214 64 260M154 192Q140 214 136 260" stroke="#26262c" stroke-width="5" fill="none"/>'; }
  var P = {};

  /* Ms Uzma Siddiqui, barrister, in the plum suit she travels in: dark hair tied back, small gold earrings */
  var UZ = neck('#b07c55') + head('#c08a62', '#b07c55') +
    '<path d="M62 108Q56 58 100 56Q144 58 138 108Q132 74 112 70Q92 82 66 92Z" fill="#17110e"/><circle cx="138" cy="74" r="14" fill="#17110e"/>' +
    '<circle cx="62" cy="122" r="3" fill="#d9b25a"/><circle cx="138" cy="122" r="3" fill="#d9b25a"/>' +
    face(110, { brow: '#17110e', eye: '#2a1a10', shade: '#8a5e3c', mouth: '89 148q11 4 22-2', lip: '#7a3a34', arch: 6 });
  P.siddiqui = '<path d="' + GROWN + '" fill="#4a2a44"/><path d="M82 178L100 214L118 178Z" fill="#f4f0ea"/><path d="M82 178L64 206L94 240ZM118 178L136 206L106 240Z" fill="#5a3454"/>' + UZ;
  /* ... and robed for court: wig, gown, bands */
  P.siddiquiw = gown() + BANDS + neck('#b07c55') + head('#c08a62', '#b07c55') + '<path d="M64 112Q62 80 82 74L66 120Z" fill="#17110e"/><path d="M136 112Q138 80 118 74L134 120Z" fill="#17110e"/>' + wig(100) +
    face(110, { brow: '#17110e', eye: '#2a1a10', shade: '#8a5e3c', mouth: '89 148q11 4 22-2', lip: '#7a3a34', arch: 6 });

  /* Mr Vernon Underhill, solicitor, seventy-four: a white fringe, half-moon glasses, a red spotted bow tie, tweed */
  P.underhill = '<path d="' + GROWN + '" fill="#7a6a4a"/><path d="M82 178L100 206L118 178Z" fill="#f4f2ea"/><path d="M88 186l12 6 12-6v12l-12-6-12 6z" fill="#a3262c"/><circle cx="94" cy="190" r="1.4" fill="#fff"/><circle cx="106" cy="194" r="1.4" fill="#fff"/>' +
    '<g stroke="#5a4a32" stroke-width="1.2" opacity=".6"><path d="M20 230h160M14 246h172M30 214h140"/></g>' +
    neck('#e2b896') + head('#ecc6a6', '#e2b896') + '<path d="M63 104Q60 84 70 78L66 112ZM137 104Q140 84 130 78L134 112Z" fill="#eeeae2"/>' +
    face(110, { brow: '#d8d2c6', eye: '#3a4a5a', shade: '#c08e6c', mouth: '90 147q10 3 20 0', lip: '#9a5348' }) + specs(110, '#6a5a3a', true);

  /* Mrs Meriel Voysey, fifty-two, district nurse: a red-brown bob, a navy cardigan, a fob watch pinned on */
  P.meriel = '<path d="' + GROWN + '" fill="#2a3a5a"/><path d="M82 178L100 200L118 178Z" fill="#9ab8d0"/><g fill="#d9dde3"><circle cx="100" cy="214" r="2"/><circle cx="100" cy="232" r="2"/><circle cx="100" cy="250" r="2"/></g>' +
    '<circle cx="132" cy="218" r="8" fill="#c9ccd0" stroke="#6a6e76" stroke-width="2"/><path d="M132 210v-10" stroke="#6a6e76" stroke-width="2"/>' +
    neck('#e8bfa0') + head('#f1cfb2', '#e8bfa0') + '<path d="M56 130Q50 60 100 58Q150 60 144 130Q140 96 128 84Q100 74 72 84Q60 96 56 130Z" fill="#8a3e22"/>' +
    face(112, { brow: '#7a3a20', eye: '#4a6a5a', shade: '#c59877', mouth: '90 150q10 3 20 0', lip: '#a3524a' });

  /* Zoe Ockenden, behind the post office counter: a maroon tabard, dark curls in a knot, a pencil */
  P.zoe = '<path d="' + GROWN + '" fill="#e8e4dc"/><path d="M40 196l40-14 20 30 20-30 40 14v64H40z" fill="#7a1f2a"/><rect x="118" y="214" width="26" height="14" fill="#f4f0ea"/>' +
    neck('#8a5a3c') + head('#a06a46', '#8a5a3c') + '<path d="M60 112Q54 58 100 56Q146 58 140 112Q136 82 100 80Q64 82 60 112Z" fill="#1d1410"/><circle cx="100" cy="50" r="17" fill="#1d1410"/><path d="M124 48l22-14" stroke="#d9a63a" stroke-width="4"/>' +
    face(110, { brow: '#1d1410', eye: '#22160f', shade: '#6a4228', mouth: '88 146q12 6 24 0', lip: '#5a2a24' });

  /* Mrs Sylvia Ockenden, sub-postmistress of Thrushcombe: silver curls, glasses on a chain, a lilac blouse and a brooch */
  P.sylvia = '<path d="' + GROWN + '" fill="#9a82b4"/><path d="M82 178L100 198L118 178Z" fill="#b8a2cc"/><circle cx="72" cy="206" r="6" fill="#d9b25a"/>' +
    neck('#e2b896') + head('#ecc6a6', '#e2b896') + '<g fill="#d4d4d8"><circle cx="70" cy="80" r="12"/><circle cx="86" cy="68" r="13"/><circle cx="104" cy="64" r="13"/><circle cx="122" cy="70" r="12"/><circle cx="134" cy="84" r="11"/><circle cx="64" cy="96" r="9"/><circle cx="138" cy="98" r="9"/></g>' +
    face(112, { brow: '#9a9aa0', eye: '#4a5a6a', shade: '#c08e6c', mouth: '89 150q11 4 22 0', lip: '#a3524a' }) + specs(112, '#8a7a9a') + '<path d="M72 118q-14 40 28 66q42-26 28-66" fill="none" stroke="#c9a45a" stroke-width="1.200"/>';

  /* Mr Seth Yelland, seventy-nine, farmer at Hill Barn: a flat cap, a weathered face, a waxed jacket over a checked shirt */
  P.seth = '<path d="' + GROWN + '" fill="#4a4a2a"/><path d="M82 178L100 206L118 178Z" fill="#c9b48a"/><g stroke="#8a3a2a" stroke-width="2"><path d="M90 182v20M100 184v22M110 182v20"/></g><path d="M46 192l36-14-8 40zM154 192l-36-14 8 40z" fill="#5a5a34"/>' +
    neck('#d08e6c') + head('#de9e7a', '#d08e6c') + '<path d="M56 92Q58 52 104 52Q148 54 146 90Q100 78 56 92Z" fill="#6b5a3a"/><path d="M52 92q48-16 104-4l4 8q-56-10-110 4z" fill="#5a4a2e"/>' +
    '<g fill="#f4f2ea" opacity=".75"><circle cx="82" cy="140" r="1.2"/><circle cx="90" cy="144" r="1.2"/><circle cx="100" cy="146" r="1.2"/><circle cx="110" cy="144" r="1.2"/><circle cx="118" cy="140" r="1.2"/><circle cx="95" cy="150" r="1.1"/><circle cx="105" cy="150" r="1.1"/></g>' +
    face(112, { brow: '#e8e4dc', eye: '#3a5a7a', shade: '#a86a4c', mouth: '89 148q11-3 22 1', lip: '#8a4a44', bw: 5 });

  /* Mr Nigel Wedlake, sixty-one, Mervyn's nephew: thin grey hair, glasses, a grey suit and a tie pulled loose */
  P.nigel = '<path d="' + GROWN + '" fill="#5a5e66"/><path d="M82 178L100 214L118 178Z" fill="#e8ecf2"/><path d="M98 186l-5 40 7 10 7-10-5-40z" fill="#2f4a6a"/><path d="M82 178L64 206L94 240ZM118 178L136 206L106 240Z" fill="#4a4e56"/>' +
    neck('#e2b896') + head('#ecc6a6', '#e2b896') + '<path d="M64 100Q62 70 82 66Q100 62 118 66Q138 70 136 100Q130 80 100 78Q70 80 64 100Z" fill="#a9a9a9"/>' +
    face(110, { brow: '#8a8a8a', eye: '#4a3a2a', shade: '#c08e6c', mouth: '90 149q10-3 20 0', lip: '#9a5348', arch: 2 }) + specs(110, '#3a3a40');

  /* Mr Quentin Yarde, counsel for Mr Wedlake: robed, long-faced, polite */
  P.yarde = gown() + BANDS + neck('#e8c2a2') + '<ellipse cx="62" cy="112" rx="6" ry="10" fill="#e8c2a2"/><ellipse cx="138" cy="112" rx="6" ry="10" fill="#e8c2a2"/><ellipse cx="100" cy="112" rx="34" ry="49" fill="#f1cfb2"/>' + wig(100) +
    face(112, { brow: '#b08a4a', eye: '#3a5a7a', shade: '#c59877', mouth: '90 152q10 2 20 0', lip: '#a3524a', arch: 3 });

  /* His Honour Judge Tremlett: grey hair, glasses pushed up on his forehead, the plain dark robe of a civil judge, no wig */
  P.tremlett = '<path d="' + GROWN + '" fill="#1c2230"/><path d="M82 178L100 200L118 178Z" fill="#f4f4f0"/><path d="M78 180q-20 30-14 80M122 180q20 30 14 80" stroke="#2c3446" stroke-width="6" fill="none"/>' +
    neck('#e2b896') + head('#ecc6a6', '#e2b896') + '<path d="M62 104Q58 60 100 58Q142 60 138 104Q134 78 100 74Q66 78 62 104Z" fill="#8a8a8e"/>' +
    face(110, { brow: '#6a6a6e', eye: '#4a3a2a', shade: '#c08e6c', mouth: '90 148h20', lip: '#9a5348', arch: 3 }) +
    '<rect x="72" y="66" width="24" height="12" rx="5" fill="none" stroke="#3a3a40" stroke-width="2"/><rect x="104" y="66" width="24" height="12" rx="5" fill="none" stroke="#3a3a40" stroke-width="2"/>';

  /* Mr Pradeep Ollerton, the usher: a black gown, a neat grey beard, a list of the day's hearings in his hand */
  P.ollerton = gown('#e8ecf2') + '<rect x="120" y="214" width="40" height="46" fill="#fbfbf8"/><path d="M126 224h28M126 232h22M126 240h28" stroke="#8d9097" stroke-width="2"/>' +
    neck('#8a5a3c') + head('#9a6644', '#8a5a3c') + '<path d="M66 96Q66 70 100 68Q134 70 134 96Q120 84 100 84Q80 84 66 96Z" fill="#2a2420"/>' +
    '<path d="M68 128Q70 168 100 172Q130 168 132 128Q120 150 100 150Q80 150 68 128Z" fill="#9a9a9a"/>' +
    face(108, { brow: '#2a2420', eye: '#22160f', shade: '#6a4228', mouth: '90 144q10 3 20 0', lip: '#5a2a24' });

  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>', k;
  for (k in P) s += '<symbol id="ch-' + k + '" viewBox="0 0 200 260">' + P[k] + '</symbol>';
  window.CAST_SVG = s + '</defs></svg>';
  var BG = { siddiqui: '#3a2a3a', siddiquiw: '#2e2a3a', underhill: '#3a3428', meriel: '#2a3444', zoe: '#3a2a2a', sylvia: '#3a3448',
    seth: '#34382a', nigel: '#30343c', yarde: '#2a2e3a', tremlett: '#2a2420', ollerton: '#2e3440' };
  window.FACE = function (id) {
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:' + (BG[id] || '#2a3038') + '"><use href="#ch-' + id + '"/></svg>';
  };
})();
