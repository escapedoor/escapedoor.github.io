/* The people of "Don't Skip to the End".
   FACE('pumphrey' | 'quigley' | 'archie' | 'croft') gives a bust of 200 x 260 for an interview;
   FIG(name) gives a small standing figure, feet at 0,0, for a scene. Nothing in here knows an answer. */
(function () {
  var K = ' stroke="#2b2420" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
  var k = ' stroke="#2b2420" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
  function sym(id, bg, body) { return '<symbol id="rd-' + id + '" viewBox="0 0 200 260"><rect width="200" height="260" fill="' + bg + '"/>' + body + '</symbol>'; }
  var BG = { pumphrey: '#dfe6d2', quigley: '#f1dccb', archie: '#d3dde8', croft: '#e2dbe6' };

  window.CAST_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>' +

  /* Mrs Elspeth Pumphrey: small and upright, a grey bun with three pencils in it, glasses on a chain, a moss-green cardigan */
  sym('pumphrey', BG.pumphrey,
    '<g fill="#cdd6bd"><rect x="14" y="30" width="16" height="70"/><rect x="34" y="40" width="12" height="60"/><rect x="50" y="26" width="18" height="74"/><rect x="150" y="34" width="14" height="66"/><rect x="168" y="44" width="18" height="56"/></g><path d="M0 100h200" stroke="#b9c3a6" stroke-width="5"/>' +
    '<path d="M18 260q4 -56 44 -68l38 -8 38 8q40 12 44 68z" fill="#6f8a4e"' + K + '/>' +
    '<path d="M84 186l16 30 16 -30" fill="#f4efe2"' + K + '/><path d="M100 216v44" stroke="#4f6636" stroke-width="3"/>' +
    '<g fill="#e8d9a8" stroke="#2b2420" stroke-width="1.5"><circle cx="108" cy="226" r="3.5"/><circle cx="108" cy="244" r="3.5"/><circle cx="92" cy="236" r="3.5"/></g>' +
    '<rect x="88" y="150" width="24" height="36" fill="#eac9ad"/>' +
    '<ellipse cx="100" cy="118" rx="36" ry="44" fill="#f2d6bd"' + K + '/>' +
    '<path d="M62 112q-4 -52 38 -54q42 2 38 54q-6 -28 -38 -30q-32 2 -38 30z" fill="#b9b6ae"' + K + '/>' +
    '<circle cx="100" cy="56" r="22" fill="#c4c1b8"' + K + '/><path d="M86 40l-12 -26M100 36l2 -28M112 40l14 -24" stroke="#e1b43a" stroke-width="5" stroke-linecap="round"/><path d="M74 14l-3 -6M102 8l0 -6M126 16l3 -6" stroke="#333" stroke-width="5" stroke-linecap="round"/>' +
    '<circle cx="84" cy="118" r="12" fill="#fff" fill-opacity=".35"' + k + '/><circle cx="116" cy="118" r="12" fill="#fff" fill-opacity=".35"' + k + '/><path d="M96 118h8" stroke="#2b2420" stroke-width="2.4"/>' +
    '<path d="M72 120q-14 40 -2 70M128 120q14 40 2 70" fill="none" stroke="#c9a642" stroke-width="1.6" stroke-dasharray="2 3"/>' +
    '<circle cx="84" cy="119" r="3" fill="#2b2420"/><circle cx="116" cy="119" r="3" fill="#2b2420"/><path d="M76 104q8 -5 16 0M108 104q8 -5 16 0" fill="none" stroke="#7e7a72" stroke-width="2.6"/>' +
    '<path d="M100 122q5 12 -3 15" fill="none" stroke="#b98d70" stroke-width="2.4"/><path d="M88 146q12 4 24 0" fill="none"' + k + '/>') +

  /* Councillor Derek Quigley: pink and shiny, hair combed flat, a camel coat, a red tie, a ring of keys */
  sym('quigley', BG.quigley,
    '<g fill="#e6c9b4"><rect x="10" y="150" width="60" height="40" rx="6"/><rect x="132" y="156" width="60" height="38" rx="6"/></g><text x="40" y="178" font-family="Oswald,sans-serif" font-size="20" fill="#f7ecdf" text-anchor="middle">P</text><text x="162" y="182" font-family="Oswald,sans-serif" font-size="20" fill="#f7ecdf" text-anchor="middle">P</text>' +
    '<path d="M8 260q4 -60 50 -72l42 -6 42 6q46 12 50 72z" fill="#c8a06a"' + K + '/>' +
    '<path d="M70 188l30 40 30 -40" fill="#f6f2ea"' + K + '/><path d="M94 196l6 -6 6 6 -6 50z" fill="#c4262e"' + K + '/>' +
    '<path d="M60 194l40 62M140 194l-40 62" fill="none" stroke="#a37f4c" stroke-width="3"/>' +
    '<rect x="86" y="150" width="28" height="40" fill="#efb4a0"/>' +
    '<ellipse cx="100" cy="114" rx="46" ry="48" fill="#f4b9a4"' + K + '/>' +
    '<path d="M56 100q4 -50 44 -52q42 2 46 50q-30 -26 -90 2z" fill="#4c3a2c"' + K + '/><path d="M62 92q30 -18 76 -4" fill="none" stroke="#7a604a" stroke-width="2.4"/>' +
    '<ellipse cx="80" cy="112" rx="5" ry="4" fill="#2b2420"/><ellipse cx="120" cy="112" rx="5" ry="4" fill="#2b2420"/><path d="M70 100q10 -6 20 -2M110 98q10 -4 20 2" fill="none" stroke="#4c3a2c" stroke-width="3.4"/>' +
    '<ellipse cx="100" cy="126" rx="9" ry="7" fill="#e9978a"/><path d="M78 144q22 14 44 0" fill="#fff"' + k + '/><path d="M80 145h40" stroke="#2b2420" stroke-width="1.6"/>' +
    '<circle cx="66" cy="132" r="8" fill="#ff8f84" opacity=".45"/><circle cx="134" cy="132" r="8" fill="#ff8f84" opacity=".45"/><path d="M118 70l6 -4M126 76l7 -2" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/>') +

  /* Archie Lumb, the caretaker: big and slow, blue overalls, a flat cap, a torch in the top pocket, a grey moustache */
  sym('archie', BG.archie,
    '<g stroke="#b8c6d6" stroke-width="4"><path d="M0 70h200M0 140h200"/></g><g fill="#c2b49a"><rect x="20" y="40" width="40" height="30"/><rect x="140" y="100" width="44" height="40"/></g>' +
    '<path d="M4 260q4 -64 54 -76l42 -6 42 6q50 12 54 76z" fill="#3e5f8c"' + K + '/>' +
    '<path d="M56 200v60M144 200v60" stroke="#2c4568" stroke-width="10"/><rect x="66" y="206" width="68" height="54" fill="#4a6c9a"' + k + '/><rect x="112" y="214" width="16" height="24" fill="#3e5f8c"' + k + '/><rect x="114" y="200" width="10" height="20" rx="3" fill="#d8d8d0"' + k + '/>' +
    '<rect x="84" y="150" width="32" height="36" fill="#dba98a"/>' +
    '<ellipse cx="100" cy="118" rx="44" ry="46" fill="#e7b693"' + K + '/>' +
    '<path d="M50 96q4 -40 52 -42q46 2 50 40q-50 -12 -102 2z" fill="#6b6e5e"' + K + '/><path d="M48 96q50 -14 108 0l14 10q-70 -16 -136 0z" fill="#585b4c"' + k + '/>' +
    '<circle cx="82" cy="114" r="3.6" fill="#2b2420"/><circle cx="118" cy="114" r="3.6" fill="#2b2420"/><path d="M72 104q10 -4 18 0M110 104q10 -4 18 0" fill="none" stroke="#8a8a80" stroke-width="3"/>' +
    '<path d="M96 116q-6 16 6 18" fill="none" stroke="#b88264" stroke-width="2.6"/><path d="M76 140q24 -12 48 0q-10 8 -24 4q-14 4 -24 -4z" fill="#a9a9a0"' + k + '/><path d="M90 150q10 4 20 0" fill="none" stroke="#2b2420" stroke-width="2.2"/>') +

  /* Mrs Brenda Croft, the Town Clerk: a dark suit, a neat grey bob, half-moon glasses, a folder */
  sym('croft', BG.croft,
    '<g fill="#d3cada"><rect x="16" y="24" width="168" height="10"/><rect x="16" y="44" width="168" height="4"/></g>' +
    '<path d="M14 260q4 -58 48 -70l38 -6 38 6q44 12 48 70z" fill="#2f3346"' + K + '/><path d="M80 190l20 36 20 -36" fill="#e9e4ef"' + K + '/>' +
    '<rect x="30" y="214" width="64" height="46" fill="#a3442e"' + k + '/><path d="M36 226h50" stroke="#e8c9a0" stroke-width="2"/>' +
    '<rect x="88" y="150" width="24" height="40" fill="#d9aa8e"/>' +
    '<ellipse cx="100" cy="116" rx="36" ry="44" fill="#e8bea0"' + K + '/>' +
    '<path d="M60 136q-10 -86 40 -88q50 2 40 88q-4 -40 -16 -58q-30 10 -48 0q-12 18 -16 58z" fill="#9c9aa2"' + K + '/>' +
    '<path d="M74 122h20M106 122h20" stroke="#2b2420" stroke-width="2.4"/><path d="M72 122q11 10 22 0M106 122q11 10 22 0" fill="none"' + k + '/>' +
    '<circle cx="84" cy="114" r="3" fill="#2b2420"/><circle cx="116" cy="114" r="3" fill="#2b2420"/><path d="M90 146h20" stroke="#2b2420" stroke-width="2.4" stroke-linecap="round"/>') +
  '</defs></svg>';

  window.FACE = function (who) {
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:' + (BG[who] || '#222') + '"><use href="#rd-' + who + '"/></svg>';
  };

  /* small figures for the scenes: feet at 0,0, about 300 high */
  var I = ' stroke="#241c18" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"';
  var FIG = {
    pumphrey: function (o) {
      var right = o && o.right;      /* the cardigan buttoned wrong, until it is buttoned right */
      return '<ellipse cx="0" cy="3" rx="40" ry="6" fill="#000" opacity=".28"/>' +
        '<path d="M-14 0v-50h10v50zM4 0v-50h10v50z" fill="#cfc4b2"' + I + '/><path d="M-20 0h17v-7h-14zM3 0h18l-3 -7h-15z" fill="#4a2e1e"/>' +
        '<path d="M-30 -46q-2 -60 30 -66q32 6 30 66z" fill="#8a7a5e"' + I + '/><path d="M-26 -60h52M-28 -76h56" stroke="#76684e" stroke-width="2"/>' +
        '<path d="M-32 -104q-4 -84 32 -92q36 8 32 92q-32 10 -64 0z" fill="#6f8a4e"' + I + '/>' +
        '<path d="M0 -190v84" stroke="#4f6636" stroke-width="2.4"/>' +
        (right ? '<g fill="#e8d9a8"><circle cx="5" cy="-176" r="3"/><circle cx="5" cy="-156" r="3"/><circle cx="5" cy="-136" r="3"/></g>'
               : '<g fill="#e8d9a8"><circle cx="5" cy="-168" r="3"/><circle cx="5" cy="-148" r="3"/><circle cx="-5" cy="-182" r="3"/></g><path d="M0 -190l-6 10" stroke="#4f6636" stroke-width="2"/>') +
        '<path d="M-30 -178q-14 40 -6 70M30 -178q14 40 6 70" fill="none" stroke="#6f8a4e" stroke-width="12" stroke-linecap="round"/><circle cx="-36" cy="-106" r="6" fill="#f2d6bd"/><circle cx="36" cy="-106" r="6" fill="#f2d6bd"/>' +
        '<path d="M-10 -194l10 16 10 -16" fill="#f4efe2"/><rect x="-6" y="-208" width="12" height="14" fill="#eac9ad"/>' +
        '<ellipse cx="0" cy="-228" rx="19" ry="23" fill="#f2d6bd"' + I + '/><path d="M-20 -232q0 -26 20 -27q20 1 20 27q-4 -14 -20 -15q-16 1 -20 15z" fill="#b9b6ae"' + I + '/>' +
        '<circle cx="0" cy="-262" r="11" fill="#c4c1b8"' + I + '/><path d="M-6 -270l-6 -14M2 -272l1 -15M8 -269l8 -12" stroke="#e1b43a" stroke-width="3" stroke-linecap="round"/>' +
        '<circle cx="-7" cy="-228" r="6" fill="#fff" fill-opacity=".35" stroke="#241c18" stroke-width="1.8"/><circle cx="7" cy="-228" r="6" fill="#fff" fill-opacity=".35" stroke="#241c18" stroke-width="1.8"/>' +
        '<circle cx="-7" cy="-228" r="1.8" fill="#241c18"/><circle cx="7" cy="-228" r="1.8" fill="#241c18"/><path d="M-6 -214q6 3 12 0" fill="none" stroke="#241c18" stroke-width="2"/>';
    },
    quigley: function (o) {
      var s = o && o.scissors;
      return '<ellipse cx="0" cy="3" rx="48" ry="7" fill="#000" opacity=".28"/>' +
        '<path d="M-20 0v-96h16v96zM4 0v-96h16v96z" fill="#3c3a40"' + I + '/><path d="M-28 0h25v-9h-22zM3 0h27l-3 -9h-24z" fill="#1c1a1e"/>' +
        '<path d="M-46 -60q-8 -130 46 -142q54 12 46 142z" fill="#c8a06a"' + I + '/><path d="M0 -196v136" stroke="#a37f4c" stroke-width="2.4"/>' +
        '<path d="M-14 -200l14 22 14 -22" fill="#f6f2ea"/><path d="M-3 -196l3 -4 3 4 -3 34z" fill="#c4262e"/>' +
        '<path d="M-38 -96h76" stroke="#7a5a32" stroke-width="5"/><g transform="translate(22 -92)"><circle r="9" fill="none" stroke="#c9a642" stroke-width="2.4"/><path d="M-4 6l-4 16M2 8l1 16M6 5l6 14" stroke="#c9a642" stroke-width="3"/></g>' +
        (s ? '<path d="M-44 -180q-24 30 -10 60M44 -180q30 10 44 -30" fill="none" stroke="#c8a06a" stroke-width="15" stroke-linecap="round"/><circle cx="88" cy="-212" r="8" fill="#f4b9a4"/><g transform="translate(88 -214) rotate(-40)"><path d="M0 0l70 -8M0 0l70 8" stroke="#bfc4cc" stroke-width="7" stroke-linecap="round"/><circle cx="-10" cy="-8" r="9" fill="none" stroke="#c4262e" stroke-width="5"/><circle cx="-10" cy="8" r="9" fill="none" stroke="#c4262e" stroke-width="5"/></g>'
           : '<path d="M-44 -180q-14 40 -4 80M44 -180q16 40 6 80" fill="none" stroke="#c8a06a" stroke-width="15" stroke-linecap="round"/><circle cx="-48" cy="-98" r="8" fill="#f4b9a4"/><circle cx="50" cy="-98" r="8" fill="#f4b9a4"/>') +
        '<rect x="-8" y="-218" width="16" height="18" fill="#efb4a0"/>' +
        '<ellipse cx="0" cy="-240" rx="26" ry="27" fill="#f4b9a4"' + I + '/><path d="M-26 -246q2 -28 26 -29q24 1 26 28q-18 -16 -52 1z" fill="#4c3a2c"' + I + '/>' +
        '<circle cx="-9" cy="-240" r="2.4" fill="#241c18"/><circle cx="9" cy="-240" r="2.4" fill="#241c18"/><ellipse cx="0" cy="-232" rx="5" ry="4" fill="#e9978a"/><path d="M-11 -222q11 8 22 0" fill="#fff" stroke="#241c18" stroke-width="1.8"/>' +
        '<circle cx="-17" cy="-230" r="5" fill="#ff8f84" opacity=".45"/><circle cx="17" cy="-230" r="5" fill="#ff8f84" opacity=".45"/>';
    },
    archie: function (o) {
      var box = !o || o.box !== false;
      return '<ellipse cx="0" cy="3" rx="48" ry="7" fill="#000" opacity=".28"/>' +
        '<path d="M-22 0v-110h18v110zM4 0v-110h18v110z" fill="#3e5f8c"' + I + '/><path d="M-30 0h27v-10h-24zM3 0h29l-3 -10h-26z" fill="#2a2018"/>' +
        '<path d="M-44 -100q-6 -112 44 -120q50 8 44 120z" fill="#3e5f8c"' + I + '/><rect x="-24" y="-176" width="48" height="50" fill="#4a6c9a"' + I + '/><rect x="8" y="-196" width="7" height="18" rx="2" fill="#d8d8d0"/>' +
        (box ? '<rect x="-46" y="-150" width="92" height="64" fill="#b48a58"' + I + '/><path d="M-46 -132h92" stroke="#8a6436" stroke-width="2"/><text x="0" y="-108" font-family="Special Elite,monospace" font-size="13" fill="#3a2614" text-anchor="middle">LOCAL HIST.</text><circle cx="-46" cy="-112" r="8" fill="#e7b693"/><circle cx="46" cy="-112" r="8" fill="#e7b693"/>'
             : '<path d="M-42 -196q-14 40 -4 80M42 -196q14 40 4 80" fill="none" stroke="#3e5f8c" stroke-width="15" stroke-linecap="round"/><circle cx="-46" cy="-114" r="8" fill="#e7b693"/><circle cx="46" cy="-114" r="8" fill="#e7b693"/>') +
        '<rect x="-9" y="-232" width="18" height="16" fill="#dba98a"/><ellipse cx="0" cy="-252" rx="25" ry="26" fill="#e7b693"' + I + '/>' +
        '<path d="M-28 -262q4 -24 28 -25q24 1 28 24q-28 -8 -56 1z" fill="#6b6e5e"' + I + '/><path d="M-30 -262q30 -9 64 0l8 6q-40 -9 -78 0z" fill="#585b4c"/>' +
        '<circle cx="-9" cy="-252" r="2.4" fill="#241c18"/><circle cx="9" cy="-252" r="2.4" fill="#241c18"/><path d="M-13 -238q13 -8 26 0q-6 5 -13 3q-7 2 -13 -3z" fill="#a9a9a0"/>';
    },
    croft: function () {
      return '<ellipse cx="0" cy="3" rx="36" ry="6" fill="#000" opacity=".28"/>' +
        '<path d="M-12 0l2 -66h8l2 66zM4 0l2 -66h8l2 66z" fill="#d9aa8e"' + I + '/><path d="M-18 0h16l-1 -6h-14zM4 0h16l-1 -6h-14z" fill="#1c1c22"/>' +
        '<path d="M-28 -62q-4 -60 28 -66q32 6 28 66z" fill="#2f3346"' + I + '/><path d="M-30 -120q-4 -70 30 -78q34 8 30 78q-30 8 -60 0z" fill="#2f3346"' + I + '/>' +
        '<path d="M-8 -196l8 16 8 -16" fill="#e9e4ef"/><rect x="-36" y="-150" width="40" height="30" fill="#a3442e"' + I + '/><circle cx="2" cy="-132" r="6" fill="#e8bea0"/>' +
        '<rect x="-6" y="-210" width="12" height="14" fill="#d9aa8e"/><ellipse cx="0" cy="-230" rx="18" ry="22" fill="#e8bea0"' + I + '/>' +
        '<path d="M-20 -218q-6 -42 20 -43q26 1 20 43q-2 -20 -8 -28q-12 5 -24 0q-6 8 -8 28z" fill="#9c9aa2"' + I + '/>' +
        '<path d="M-12 -228h9M3 -228h9" stroke="#241c18" stroke-width="1.8"/><path d="M-5 -214h10" stroke="#241c18" stroke-width="2"/>';
    },
    crowd: function (n, seed) {    /* townspeople in the dusk: dark shapes, a few with books */
      var s = '', i, x, h, c = ['#2a3046', '#353a52', '#3d3448', '#2e3a44', '#463a3a'];
      for (i = 0; i < n; i++) {
        x = i * 46 + ((i * 37 + seed) % 17); h = 150 + ((i * 53 + seed) % 50);
        s += '<g transform="translate(' + x + ' 0)"><path d="M-18 0q-4 -' + (h - 40) + ' 18 -' + (h - 30) + 'q22 10 18 ' + (h - 30) + 'z" fill="' + c[(i + seed) % 5] + '"/><circle cx="0" cy="-' + (h - 18) + '" r="15" fill="' + c[(i + seed + 2) % 5] + '"/>' +
          ((i + seed) % 3 === 0 ? '<rect x="8" y="-' + (h - 70) + '" width="16" height="22" fill="' + ['#b0402a', '#2f6a5a', '#c9a642'][(i + seed) % 3 === 0 ? i % 3 : 0] + '"/>' : '') + '</g>';
      }
      return s;
    }
  };
  window.FIG = function (who, o) { return FIG[who] ? FIG[who](o) : ''; };
  window.CROWD = FIG.crowd;
})();
