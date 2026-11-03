/* Still Here, part A (the investigator) - pictures and papers that more than one room shows, so that they read the
   same everywhere. Every string here is read by the player: proofread it with the rooms (wordlist.py --text does not
   read this file). */
window.SC = (function () {
  'use strict';

  /* the three fronts on the north side of the square, as a close look */
  function front(n) {
    var s = '<svg viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="420" fill="#8e98a2"/><rect y="380" width="400" height="40" fill="#4a4d50"/>';
    if (n === 7) s += '<path d="M60 380V100L200 40L340 100V380Z" fill="#b59a7c" stroke="#5e4a36" stroke-width="3"/><circle cx="200" cy="90" r="16" fill="#2e3440" stroke="#e8e0d0" stroke-width="4"/>' +
      '<rect x="90" y="140" width="64" height="94" fill="#2e3440" stroke="#e8e0d0" stroke-width="5"/><rect x="246" y="140" width="64" height="94" fill="#2e3440" stroke="#e8e0d0" stroke-width="5"/>' +
      '<rect x="60" y="250" width="280" height="26" fill="#6b5b8d"/><path d="M72 380V300L84 288H166L178 300V380ZM222 380V300L234 288H316L328 300V380Z" fill="#3a4250" stroke="#e8e0d0" stroke-width="4"/><rect x="184" y="292" width="32" height="88" fill="#3f2a4a" stroke="#e8e0d0" stroke-width="3"/>';
    else if (n === 9) s += '<path d="M50 380V104L200 30L350 104V380Z" fill="#c9b79a" stroke="#5e4a36" stroke-width="3"/><circle cx="200" cy="80" r="16" fill="#2e3440" stroke="#efe6d4" stroke-width="4"/><rect x="182" y="102" width="36" height="14" fill="#b8a585"/>' +
      '<g fill="#2e3440" stroke="#efe6d4" stroke-width="5"><rect x="74" y="150" width="56" height="100"/><rect x="172" y="150" width="56" height="100"/><rect x="270" y="150" width="56" height="100"/></g>' +
      '<ellipse cx="200" cy="132" rx="16" ry="13" fill="#d8c8a8" stroke="#7a6648" stroke-width="2"/><path d="M186 128q-8 -12 4 -16M214 128q8 -12 -4 -16" stroke="#7a8a4a" stroke-width="3" fill="none"/>' +
      '<rect x="50" y="268" width="300" height="26" fill="#2f4a3c"/><rect x="62" y="300" width="200" height="80" fill="#3a3a34" stroke="#efe6d4" stroke-width="4"/><rect x="280" y="300" width="56" height="80" fill="#2f4a3c" stroke="#efe6d4" stroke-width="4"/>' +
      '<path d="M144 380v-12h24v12" stroke="#22252a" stroke-width="3" fill="none"/>';
    else s += '<path d="M60 380V100L200 46L340 100V380Z" fill="#a8a29a" stroke="#5e5850" stroke-width="3"/><rect x="188" y="76" width="24" height="24" fill="#2e3440" stroke="#ece6dc" stroke-width="4"/>' +
      '<g fill="#2e3440" stroke="#ece6dc" stroke-width="5"><rect x="80" y="150" width="54" height="96"/><rect x="173" y="150" width="54" height="96"/><rect x="266" y="150" width="54" height="96"/></g>' +
      '<path d="M190 122h20v12q0 10 -10 14q-10 -4 -10 -14z" fill="#c8c0b0" stroke="#6e665a" stroke-width="2"/>' +
      '<rect x="60" y="262" width="280" height="26" fill="#1d3a5a"/><rect x="76" y="300" width="80" height="70" fill="#3a4250" stroke="#ece6dc" stroke-width="4"/><rect x="244" y="300" width="80" height="70" fill="#3a4250" stroke="#ece6dc" stroke-width="4"/><rect x="182" y="296" width="36" height="84" fill="#1d3a5a" stroke="#ece6dc" stroke-width="3"/>' +
      '<path d="M160 380V318M158 330q8 -20 18 -6" stroke="#5a4a36" stroke-width="4" fill="none"/><circle cx="162" cy="314" r="12" fill="#d9a83a"/>';
    return s + '</svg>';
  }
  function plate() {
    return '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#3a3c3a"/><path d="M200 300V180" stroke="#6a5a3a" stroke-width="14"/>' +
      '<rect x="60" y="70" width="280" height="120" rx="6" fill="#c9a24a" stroke="#6a5420" stroke-width="5"/><g font-family="Cinzel,serif" font-weight="700" fill="#3a2a08" text-anchor="middle">' +
      '<text x="200" y="104" font-size="17">PLANTED ON 7 JUNE 1977</text><text x="200" y="132" font-size="15">FOR THE SILVER JUBILEE</text><text x="200" y="160" font-size="15">OF QUEEN ELIZABETH II</text></g>' +
      '<g fill="#e2b246"><path d="M40 40l14 -6 6 14 -14 6z"/><path d="M330 230l14 -6 6 14 -14 6z"/><path d="M90 250l12 -8 8 12 -12 8z"/></g></svg>';
  }

  var LETTER = '<h4>Your phone</h4><p class="from">From: Bethan Daintree &middot; to the Missing Pictures Register</p>' +
    '<p>Thank you for coming. Dad (Lewis Daintree) doesn&rsquo;t know you&rsquo;re here yet. He&rsquo;s sixty-six and still lives near Chalkbourne.</p>' +
    '<p>In 1979 he was nineteen and worked at Gorringe&rsquo;s Gallery, on the square. On the night of Saturday 24 November 1979 there was a party there for the painter Ivy Dancy. The lights went out for four minutes, and when they came back on, her best painting, The Blue Kite, had gone.</p>' +
    '<p>The police never charged anybody. Everybody decided it was Dad. He left town in 1980 and didn&rsquo;t come back for thirty years.</p>' +
    '<p>I&rsquo;ve written to the Record Office as well. Their archivist will ring you. Please be kind to my father if you meet him. He is still nineteen about this.</p><p>Bethan</p>';
  function letter() { ER.read({ html: LETTER, cls: 'phone', clue: { id: 'bethan', title: 'Bethan&rsquo;s message', kind: 'On your phone' } }); }

  /* the laser tape measure, pointed at a line in the room */
  function tape(z) {
    return '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#2e2219"/>' +
      '<path d="M40 250H360" stroke="#a87a4e" stroke-width="40"/><path d="M40 250H360" stroke="#5a3a20" stroke-width="2" stroke-dasharray="30 4"/>' +
      '<path d="M40 70V250" stroke="#d4bc94" stroke-width="10"/><text x="54" y="80" font-family="Barlow Condensed,sans-serif" font-weight="600" font-size="14" fill="#d4bc94">FRONT WALL</text>' +
      '<path d="M60 160L' + (60 + z * 26).toFixed(0) + ' 160" stroke="#ff3a2a" stroke-width="2" stroke-dasharray="6 4"/><circle cx="' + (60 + z * 26).toFixed(0) + '" cy="160" r="6" fill="#ff3a2a"/>' +
      '<rect x="60" y="120" width="120" height="70" rx="12" fill="#e8b830" stroke="#6a5010" stroke-width="4"/><rect x="74" y="132" width="92" height="34" rx="4" fill="#1d2a1d"/>' +
      '<text x="120" y="158" font-family="Space Mono,monospace" font-weight="700" font-size="22" fill="#7fe08a" text-anchor="middle">' + z.toFixed(2) + '</text><text x="120" y="182" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="13" fill="#3a2a08" text-anchor="middle">METRES</text></svg>';
  }
  function mirror() {
    return '<svg viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="420" fill="#e8d6b4"/><rect x="70" y="20" width="260" height="380" rx="8" fill="#b8962e" stroke="#7a5a10" stroke-width="5"/>' +
      '<rect x="90" y="40" width="220" height="320" fill="#b9c6c2"/><rect x="90" y="40" width="220" height="320" fill="#dcc6a0" opacity=".55"/>' +
      '<rect x="150" y="190" width="100" height="90" fill="#e8d8b8" stroke="#a88a5a" stroke-width="3"/><rect x="140" y="182" width="120" height="10" fill="#8a6a44"/>' +
      '<path d="M120 300q-4 -50 30 -56q34 6 30 56z" fill="#3a4a5a"/><circle cx="150" cy="228" r="17" fill="#e2b896"/><path d="M104 70l90 260" stroke="#fff" stroke-width="10" opacity=".25"/>' +
      '<rect x="160" y="368" width="80" height="18" fill="#d8b85a" stroke="#6a5010" stroke-width="1.5"/><text x="200" y="381" font-family="Cinzel,serif" font-weight="700" font-size="7.5" fill="#3a2a08" text-anchor="middle">GORRINGE&#8217;S GALLERY · 1955</text></svg>';
  }
  function fire(n) {
    var s = '<svg viewBox="0 0 400 360" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="360" fill="#dcc6a0"/><path d="M0 60H400" stroke="#8a6a44" stroke-width="8"/>' +
      '<rect x="110" y="170" width="180" height="190" fill="#e8d8b8" stroke="#a88a5a" stroke-width="4"/><rect x="96" y="160" width="208" height="16" fill="#8a6a44"/><rect x="146" y="214" width="108" height="110" fill="#d8c8a6" stroke="#b89a6a" stroke-width="3" stroke-dasharray="8 6"/>';
    if (n === 1) s += '<path d="M44 80v14q0 8 -8 8" stroke="#5a4a3a" stroke-width="5" fill="none"/><path d="M356 80v14q0 8 -8 8" stroke="#5a4a3a" stroke-width="5" fill="none"/>' +
      '<text x="44" y="130" font-family="Barlow Condensed,sans-serif" font-weight="600" font-size="13" fill="#5a4a3a" text-anchor="middle">towards</text><text x="44" y="145" font-family="Barlow Condensed,sans-serif" font-weight="600" font-size="13" fill="#5a4a3a" text-anchor="middle">the back</text>' +
      '<text x="356" y="130" font-family="Barlow Condensed,sans-serif" font-weight="600" font-size="13" fill="#5a4a3a" text-anchor="middle">towards</text><text x="356" y="145" font-family="Barlow Condensed,sans-serif" font-weight="600" font-size="13" fill="#5a4a3a" text-anchor="middle">the front</text>';
    return s + '</svg>';
  }
  var FACE = {
    carys: '<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#4a3828"/><path d="M18 120q0 -40 42 -44q42 4 42 44z" fill="#c8553d"/><circle cx="60" cy="54" r="27" fill="#e6be9c"/><path d="M32 52q2 -34 28 -34q26 0 28 34q-6 -18 -28 -20q-22 2 -28 20z" fill="#9a9a96"/><circle cx="50" cy="56" r="3" fill="#2a2a2a"/><circle cx="70" cy="56" r="3" fill="#2a2a2a"/><path d="M50 70q10 6 20 0" stroke="#8a4a3a" stroke-width="2.5" fill="none"/><path d="M82 96l14 -8" stroke="#3a7ac8" stroke-width="5"/></svg>'
  };

  /* ---------- the visitors' book, open at 24 November 1979: Ivy Dancy drew every guest as they came in ---------- */
  var HEADS = {
    id: '<path d="M30 92q-2 -30 30 -34q32 4 30 34z" fill="none"/><circle cx="60" cy="42" r="17"/><circle cx="60" cy="20" r="8"/><path d="M44 36q16 -14 32 0"/><circle cx="54" cy="44" r="4"/><circle cx="66" cy="44" r="4"/><path d="M50 46q-8 14 -2 30M70 46q8 14 2 30" stroke-dasharray="2 3"/>',
    fa: '<path d="M26 96q-2 -34 34 -38q36 4 34 38z" fill="none"/><path d="M28 64q32 10 64 0" stroke-width="5"/><circle cx="60" cy="40" r="18"/><path d="M42 34q-6 -10 4 -14M78 34q6 -10 -4 -14M46 24q14 -10 28 0" /><circle cx="53" cy="41" r="5"/><circle cx="67" cy="41" r="5"/><path d="M58 41h4"/><path d="M38 20h44" stroke-width="3"/>',
    el: '<path d="M26 98q-2 -34 34 -38q36 4 34 38z" fill="none"/><circle cx="60" cy="36" r="19"/><path d="M44 44q16 22 32 0" stroke-width="4"/><path d="M52 62l8 4 8 -4 -8 -4z" stroke-width="2.5"/><path d="M50 32h6M64 32h6"/>',
    jk: '<path d="M28 98q-2 -30 32 -34q34 4 32 34z" fill="none"/><path d="M60 64V40"/><circle cx="60" cy="18" r="16"/><path d="M44 16q16 -20 32 0q-2 -14 -16 -16q-14 2 -16 16z" fill="currentColor"/><path d="M53 20h4M63 20h4"/><path d="M60 -2v-6M56 -6l4 -4 4 4" stroke-width="1.5"/>',
    cg: '<path d="M28 98q-2 -34 32 -38q34 4 32 34z" fill="none"/><path d="M48 24q0 30 12 34q12 -4 12 -34" /><path d="M46 22q14 -16 28 0"/><path d="M52 44q8 4 16 0" stroke-width="4"/><path d="M52 32h5M63 32h5"/>',
    ld: '<path d="M28 98q-2 -32 32 -36q34 4 32 36z" fill="none"/><circle cx="60" cy="38" r="16"/><path d="M42 54q-4 -34 18 -36q22 2 18 36" stroke-width="3"/><path d="M54 38h4M62 38h4M56 46q4 3 8 0"/>'
  };
  var GUESTS = [
    { id: 'id', name: 'Ivy Dancy', note: 'Forty years! Where did they go? (and my own nose)' },
    { id: 'fa', name: 'Freda Applegarth', note: 'My twenty-fifth private view here. Lovely as ever. F.A. (Ivy never could draw a hat.)' },
    { id: 'el', name: 'E. Lightfoot', note: 'Must not miss the 8.47.' },
    { id: 'jk', name: 'June Kitto', note: 'Chalkbourne Mercury. Smile, everybody! (Ivy could not get her on the page.)' },
    { id: 'cg', name: 'C. Gorringe', note: 'Our host. (written by Ivy)' },
    { id: 'ld', name: 'Lewis', note: 'Lewis, who pours the wine, and sometimes the floor. (written by Ivy)' }
  ];
  function head(id, w) { return '<svg viewBox="0 -14 120 116" width="' + (w || 110) + '" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#3a3a40" stroke-width="2.2" stroke-linecap="round" color="#3a3a40">' + HEADS[id] + '</g></svg>'; }
  var BOOK = '<h4>The visitors&rsquo; book &middot; 24th November 1979</h4><p class="bk-sub">Private View: Forty Years of Ivy Dancy. Ivy drew every guest as they came in, and they signed beside her drawing.</p><div class="bk">' +
    GUESTS.map(function (g) { return '<div class="bk-g" data-g="' + g.id + '">' + head(g.id) + '<b>' + g.name + '</b><span>' + g.note + '</span><i class="tick">&#10003;</i></div>'; }).join('') + '</div>';
  function book(done) { ER.read({ html: BOOK, cls: 'vbook', clue: { id: 'vbook', title: 'The visitors&rsquo; book, 24.11.79', kind: 'In the glass case' }, done: done }); }

  /* ---------- Carys's shelf of lost things, found in the building in 2019 ---------- */
  var LOST = [
    { id: 'o1', what: 'A pipe', where: 'Found under the floorboards when we sanded the floor in 2019: by the left wall, about seven metres from the front.', pic: '<path d="M20 60q30 10 60 -6l14 -2v-20h22v26q-6 18 -30 18q-30 4 -66 -10z" fill="#6a3a1a" stroke="#2a1a0a" stroke-width="3"/><ellipse cx="105" cy="34" rx="11" ry="4" fill="#2a1a0a"/>' },
    { id: 'o2', what: 'A long feather', where: 'Found behind the radiator under the big mirror.', pic: '<path d="M10 80Q60 40 120 10" stroke="#5a3a1a" stroke-width="2.5" fill="none"/><path d="M20 74q30 -40 96 -60q-30 30 -90 66z" fill="#b8843a"/><g stroke="#3a2a10" stroke-width="2"><path d="M40 66l10 -18M60 54l12 -16M80 40l14 -14"/></g>' },
    { id: 'o3', what: 'A small black cap', where: 'Found inside the old window seat at the front. Carys thinks it came off a camera.', pic: '<circle cx="64" cy="46" r="30" fill="#1d1d1f" stroke="#4a4a4e" stroke-width="3"/><circle cx="64" cy="46" r="20" fill="none" stroke="#3a3a3e" stroke-width="2"/><path d="M50 30h28" stroke="#5a5a5e" stroke-width="3"/>' },
    { id: 'o4', what: 'A corkscrew', where: 'Found in the cellar, on a ledge beside the steps.', pic: '<rect x="30" y="18" width="70" height="16" rx="8" fill="#8a5a2a" stroke="#3a2a10" stroke-width="2"/><path d="M65 34v10q-10 4 0 8t0 8t0 8t0 8" stroke="#8a8a90" stroke-width="4" fill="none"/>' },
    { id: 'o5', what: 'One black glove', where: 'A man&rsquo;s glove, leather. Found at the back of the old coat cupboard by the front.', pic: '<path d="M40 86V44q0 -6 6 -6t6 6v-14q0 -6 6 -6t6 6v-4q0 -6 6 -6t6 6v8q0 -6 6 -6t6 6v30q0 22 -24 22h-12q-12 0 -12 -10z" fill="#1d1d1f" stroke="#4a4a4e" stroke-width="2"/>' }
  ];
  function obj(o, w) { return '<svg viewBox="0 0 130 96" width="' + (w || 120) + '" xmlns="http://www.w3.org/2000/svg">' + o.pic + '</svg>'; }

  /* ---------- the wall of strangers: five portraits found in the cellar ---------- */
  /* sc: which side of the picture the scar is on, as you look at it ('L' or 'R'), or none */
  var PORTRAITS = [
    { id: 'p4', bg: '#3a5a5a', coat: '#1d2a3a', skin: '#d8a888', hair: '#e8e8e4', beard: true, cap: true, sign: '', depth: 2,
      text: 'An old sailor with a white beard and a peaked cap, looking out of the picture as if there were weather coming. There is no name and no date anywhere on it.' },
    { id: 'p1', bg: '#7a3a2a', coat: '#5a3a24', skin: '#e2b896', hair: '#2a1e18', must: '#2a1e18', sc: 'R', ring: true, sign: 'I.D. 1960', depth: 6,
      text: 'A young man of about thirty, with dark hair combed straight back and a neat dark moustache. A thin pale line runs through one eyebrow: the eyebrow on the right of the picture as you look at it. On his little finger, a gold signet ring. He looks very pleased with himself.' },
    { id: 'p3', bg: '#5a6a3a', coat: '#6a5a50', skin: '#e8c0a0', hair: '#9a9a96', hat: true, glasses: true, sign: 'I.D. 1958', depth: 2,
      text: 'A lady with round glasses and a hat with a long feather in it, which the painter has made the most important thing in the picture.' },
    { id: 'p5', bg: '#6a4a6a', coat: '#3a3a4a', skin: '#e2b896', hair: '#2a1e18', must: '#2a1e18', sc: 'L', sign: 'I.D. 1961', depth: 2.5,
      text: 'A young man with dark hair and a dark moustache. A thin pale line runs through one eyebrow: the eyebrow on the left of the picture as you look at it. He looks out of the picture as if he had been asked to wait.' },
    { id: 'p2', bg: '#3a4a6a', coat: '#6a5a3a', skin: '#e0b090', hair: '#c8c8c4', must: '#c8c8c4', pipe: true, sign: 'R.K. 1975', depth: 3,
      text: 'An older man with grey hair, a grey moustache and a pipe in his mouth, in a tweed jacket. He looks like somebody who owns a dog called Brigadier.' }
  ];
  function portrait(p, big) {
    var s = '<svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="380" fill="#b8962e"/><rect x="18" y="18" width="264" height="344" fill="' + p.bg + '"/>' +
      '<path d="M50 362q-4 -110 100 -120q104 10 100 120z" fill="' + p.coat + '"/><path d="M128 250l22 30 22 -30" fill="#f2ecd8"/><rect x="138" y="200" width="24" height="44" fill="' + p.skin + '"/>' +
      '<ellipse cx="150" cy="160" rx="54" ry="66" fill="' + p.skin + '"/>';
    if (p.hat) s += '<path d="M80 120q70 -40 140 0z" fill="#4a3a30"/><path d="M60 122h180" stroke="#4a3a30" stroke-width="10"/><path d="M200 112q50 -70 80 -90" stroke="#b8843a" stroke-width="7" fill="none"/>';
    else if (p.cap) s += '<path d="M92 112q58 -50 116 0z" fill="#1d2a3a"/><path d="M88 114h124" stroke="#0e1620" stroke-width="10"/>';
    else s += '<path d="M96 140q0 -66 54 -66q54 0 54 66q-10 -40 -54 -42q-44 2 -54 42z" fill="' + p.hair + '"/>';
    s += '<path d="M120 150q10 -6 20 0M160 150q10 -6 20 0" stroke="#2a1e18" stroke-width="5" fill="none"/><circle cx="130" cy="162" r="4" fill="#2a1e18"/><circle cx="170" cy="162" r="4" fill="#2a1e18"/>';
    if (p.sc === 'R') s += '<path d="M168 140l6 16" stroke="#f6ece0" stroke-width="3"/>';
    if (p.sc === 'L') s += '<path d="M126 140l6 16" stroke="#f6ece0" stroke-width="3"/>';
    if (p.glasses) s += '<circle cx="130" cy="162" r="12" fill="none" stroke="#2a1e18" stroke-width="3"/><circle cx="170" cy="162" r="12" fill="none" stroke="#2a1e18" stroke-width="3"/><path d="M142 162h16" stroke="#2a1e18" stroke-width="3"/>';
    if (p.must) s += '<path d="M128 192q22 -10 44 0q-22 6 -44 0z" fill="' + p.must + '"/>';
    if (p.beard) s += '<path d="M98 170q0 70 52 72q52 -2 52 -72q-12 30 -52 32q-40 -2 -52 -32z" fill="' + p.hair + '"/>';
    if (p.pipe) s += '<path d="M156 200q20 8 40 6l4 -22h16v26q-6 12 -24 10" fill="#5a3a1a" stroke="#2a1a0a" stroke-width="2"/>';
    s += '<path d="M140 206q10 5 20 0" stroke="#8a4a3a" stroke-width="3" fill="none"/>';
    if (p.ring) s += '<path d="M60 330q30 -20 60 -6" stroke="' + p.skin + '" stroke-width="20" stroke-linecap="round"/><circle cx="68" cy="324" r="6" fill="#e8c860" stroke="#8a6a10" stroke-width="2"/>';
    if (p.sign && big) s += '<text x="270" y="352" font-family="Homemade Apple,cursive" font-size="13" fill="#f2e8c8" text-anchor="end">' + p.sign + '</text>';
    else if (p.sign) s += '<path d="M226 348h44" stroke="#f2e8c8" stroke-width="3"/>';
    return s + '</svg>';
  }
  /* the girl, the kite, the town below (the same drawing as the archivist's photographs) */
  function kite(o) {
    var s = '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">', i;
    s += '<rect width="400" height="300" fill="#bcd6e6"/><path d="M0 210q110 -50 220 -18t180 -6V300H0Z" fill="#8eb06a"/><path d="M0 240q140 -30 260 -6t140 0V300H0Z" fill="#7a9a56"/>';
    s += '<path d="M320 222V176L330 140L340 176V222Z" fill="#6a6a72"/><g fill="#b07050"><rect x="284" y="206" width="26" height="16"/><rect x="348" y="204" width="30" height="18"/></g>';
    s += '<path d="M150 70l40 -30 22 44 -42 24z" fill="#2f6fc0" stroke="#1a3a7a" stroke-width="2"/><path d="M170 108q-20 40 -10 80q6 30 -10 60" stroke="#3a3a3a" stroke-width="1.5" fill="none"/>';
    for (i = 0; i < 7; i++) { var t = (i + 1) / 8, bx = 170 - 12 * Math.sin(t * 5), by = 108 + t * 140; s += '<path d="M' + (bx - 7).toFixed(1) + ' ' + (by - 4).toFixed(1) + 'l7 4 -7 4zM' + (bx + 7).toFixed(1) + ' ' + (by - 4).toFixed(1) + 'l-7 4 7 4z" fill="#fbfbf6" stroke="#5a5a5a" stroke-width=".8"/>'; }
    s += '<path d="M178 92Q220 160 236 214" stroke="#5a5a5a" stroke-width="1" fill="none"/>';
    s += '<path d="M226 286l6 -50h20l6 50z" fill="#f2cf4a"/><circle cx="242" cy="226" r="11" fill="#e8c0a0"/><path d="M232 220q10 -12 20 0" stroke="#7a4a20" stroke-width="5" fill="none"/><path d="M236 286v8M248 286v8" stroke="#c4372b" stroke-width="5"/><path d="M252 240l-14 -24" stroke="#e8c0a0" stroke-width="4"/>';
    s += '<g fill="#4a3a2a"><ellipse cx="282" cy="282" rx="16" ry="8"/><circle cx="296" cy="274" r="6"/></g><path d="M300 60q10 -8 18 0q8 -8 18 0" stroke="#fbfbf6" stroke-width="3" fill="none"/>';
    return s + '</svg>';
  }

  return { front: front, plate: plate, letter: letter, LETTER: LETTER, tape: tape, mirror: mirror, fire: fire, FACE: FACE,
    head: head, GUESTS: GUESTS, BOOK: BOOK, book: book, LOST: LOST, obj: obj, PORTRAITS: PORTRAITS, portrait: portrait, kite: kite };
})();
