/* The people of "Whilst You Were Out", as busts of 200 x 260 without a background, so that one drawing can stand in a
   scene and sit in the panel of a talk. FACE('keiko') gives the bust on its own colour, for ER.talk. */
window.CAST_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>' +

/* Commander Joss Kirwan: fifty-four, close-cropped grey hair, small gold earrings, a navy base suit with the sleeves
   pushed up and the mission patch (an orange planet with a juniper sprig) on the chest */
'<symbol id="ch-joss" viewBox="0 0 200 260">' +
'<path d="M0 260Q2 196 44 182L80 168H120L156 182Q198 196 200 260Z" fill="#1f2c48"/>' +
'<path d="M78 170L100 200L122 170L114 166H86Z" fill="#14203a"/><path d="M70 176L100 208L130 176" stroke="#3a4d74" stroke-width="3" fill="none"/>' +
'<circle cx="150" cy="214" r="14" fill="#e0782c"/><path d="M144 216q6 -10 12 0M150 206v16" stroke="#2f5a32" stroke-width="2.4" fill="none"/><circle cx="150" cy="214" r="14" fill="none" stroke="#f2e6c8" stroke-width="2"/>' +
'<rect x="88" y="136" width="24" height="36" fill="#5e3b29"/>' +
'<ellipse cx="58" cy="104" rx="6" ry="10" fill="#5a3826"/><ellipse cx="142" cy="104" rx="6" ry="10" fill="#5a3826"/>' +
'<circle cx="56" cy="116" r="3" fill="#e2b84a"/><circle cx="144" cy="116" r="3" fill="#e2b84a"/>' +
'<ellipse cx="100" cy="100" rx="41" ry="49" fill="#6b4430"/>' +
'<path d="M57 92Q54 50 100 46Q146 50 143 92Q138 66 100 62Q64 66 57 92Z" fill="#cfcdc6"/>' +
'<g fill="#bdbab2"><circle cx="70" cy="62" r="5"/><circle cx="84" cy="54" r="5"/><circle cx="100" cy="51" r="5"/><circle cx="116" cy="54" r="5"/><circle cx="130" cy="62" r="5"/><circle cx="62" cy="76" r="4"/><circle cx="138" cy="76" r="4"/></g>' +
'<path d="M70 92q11-6 22 -2M108 90q11-4 22 2" stroke="#2a1a12" stroke-width="3.6" fill="none" stroke-linecap="round"/>' +
'<path d="M74 106q8 -5 16 0q-8 4 -16 0zM110 106q8 -5 16 0q-8 4 -16 0z" fill="#f4ece2"/><circle cx="82" cy="105" r="2.9" fill="#1a110c"/><circle cx="118" cy="105" r="2.9" fill="#1a110c"/>' +
'<path d="M100 106q-6 14 0 19q5 2 9 -1" stroke="#4a2d1e" stroke-width="2.8" fill="none" stroke-linecap="round"/>' +
'<path d="M86 136h28" stroke="#3a1e16" stroke-width="3.4" stroke-linecap="round"/>' +
'<path d="M72 120q4 6 2 12M128 120q-4 6 -2 12" stroke="#5a3826" stroke-width="1.6" fill="none" opacity=".6"/>' +
'</symbol>' +

/* Dr Keiko Ishida, botanist and the base doctor: about forty-five, a black bob with a straight fringe, round glasses,
   a green fleece with seed packets sticking out of the chest pocket */
'<symbol id="ch-keiko" viewBox="0 0 200 260">' +
'<path d="M0 260Q2 198 42 184L80 170H120L158 184Q198 198 200 260Z" fill="#3f6e3a"/>' +
'<path d="M76 172Q100 196 124 172" stroke="#2f5a2c" stroke-width="8" fill="none"/><path d="M100 196V260" stroke="#2f5a2c" stroke-width="3"/>' +
'<rect x="128" y="206" width="38" height="30" rx="3" fill="#2f5a2c"/><rect x="132" y="192" width="12" height="20" fill="#f2c94a" transform="rotate(-8 138 202)"/><rect x="146" y="190" width="12" height="22" fill="#e86a5a" transform="rotate(6 152 200)"/>' +
'<rect x="88" y="138" width="24" height="36" fill="#e2bd98"/>' +
'<path d="M52 70Q50 30 100 30Q150 30 148 70L150 140Q140 150 132 140L130 96H70L68 140Q60 150 50 140Z" fill="#141216"/>' +
'<ellipse cx="100" cy="102" rx="38" ry="47" fill="#ecc9a6"/>' +
'<path d="M62 84Q64 50 100 50Q136 50 138 84Q120 74 100 76Q80 74 62 84Z" fill="#141216"/>' +
'<g fill="none" stroke="#3a2a22" stroke-width="3"><circle cx="83" cy="106" r="12"/><circle cx="117" cy="106" r="12"/><path d="M95 106h10M71 104l-9 -3M129 104l9 -3"/></g>' +
'<path d="M74 92q9-4 18 0M108 92q9-4 18 0" stroke="#141216" stroke-width="3" fill="none" stroke-linecap="round"/>' +
'<path d="M77 107q6 -4 12 0q-6 3 -12 0zM111 107q6 -4 12 0q-6 3 -12 0z" fill="#fbf6ee"/><circle cx="83" cy="106.5" r="2.6" fill="#1a1412"/><circle cx="117" cy="106.5" r="2.6" fill="#1a1412"/>' +
'<path d="M100 112q-4 10 0 14q4 1 6 -1" stroke="#b98c6c" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
'<path d="M88 134q12 5 24 0" stroke="#9a4a3e" stroke-width="3" fill="none" stroke-linecap="round"/>' +
'</symbol>' +

/* Hugh Lattimer, the base engineer: thirty-odd, untidy ginger hair and beard, a head torch pushed up on his forehead,
   orange overalls with too many pockets, a pencil behind one ear */
'<symbol id="ch-hugh" viewBox="0 0 200 260">' +
'<path d="M0 260Q2 196 40 182L80 168H120L160 182Q198 196 200 260Z" fill="#d9692a"/>' +
'<path d="M80 170L100 196L120 170" stroke="#b5521c" stroke-width="5" fill="none"/>' +
'<g fill="#b5521c"><rect x="34" y="208" width="36" height="28" rx="3"/><rect x="130" y="208" width="36" height="28" rx="3"/></g><path d="M40 208h24M136 208h24" stroke="#f0a060" stroke-width="2"/>' +
'<rect x="140" y="196" width="6" height="22" fill="#6a6a6a"/><rect x="150" y="194" width="6" height="24" fill="#2a6ab0"/>' +
'<rect x="88" y="136" width="24" height="36" fill="#eab896"/>' +
'<ellipse cx="57" cy="104" rx="7" ry="11" fill="#e8b292"/><ellipse cx="143" cy="104" rx="7" ry="11" fill="#e8b292"/>' +
'<path d="M138 82l18 -26" stroke="#e6c24a" stroke-width="4" stroke-linecap="round"/><path d="M155 57l4 -5" stroke="#3a3a3a" stroke-width="4" stroke-linecap="round"/>' +
'<ellipse cx="100" cy="98" rx="42" ry="50" fill="#f3cbb0"/>' +
'<path d="M56 86Q50 40 100 38Q152 40 144 86Q140 62 124 58Q110 70 92 60Q72 66 56 86Z" fill="#c4581e"/>' +
'<g fill="#c4581e"><circle cx="70" cy="46" r="10"/><circle cx="90" cy="38" r="11"/><circle cx="112" cy="38" r="10"/><circle cx="132" cy="48" r="10"/></g>' +
'<path d="M58 70Q100 52 142 70" stroke="#2a2a2a" stroke-width="7" fill="none"/><rect x="88" y="54" width="24" height="14" rx="4" fill="#3a3a3a"/><circle cx="100" cy="61" r="5" fill="#fff6c0"/>' +
'<path d="M60 110Q60 168 100 172Q140 168 140 110Q132 134 118 128Q100 138 82 128Q68 134 60 110Z" fill="#c4581e"/>' +
'<path d="M84 130q16 8 32 0" stroke="#7a2e14" stroke-width="3" fill="none" stroke-linecap="round"/>' +
'<path d="M70 88q12-6 22 -1M108 87q12-5 22 1" stroke="#a8461a" stroke-width="4" fill="none" stroke-linecap="round"/>' +
'<path d="M74 102q8 -5 16 0q-8 4 -16 0zM110 102q8 -5 16 0q-8 4 -16 0z" fill="#fbf4ec"/><circle cx="82" cy="101" r="2.8" fill="#2a4a6a"/><circle cx="118" cy="101" r="2.8" fill="#2a4a6a"/>' +
'<path d="M100 104q-7 14 0 19q5 2 9 -2" stroke="#d0a080" stroke-width="2.8" fill="none" stroke-linecap="round"/>' +
'</symbol>' +

/* Dr Liv Gundersen, geologist: about forty-five, a fair plait over one shoulder, freckles, a grey-blue base fleece
   with a rock hammer clipped to it. She is seen in a photograph and, at the end, on a screen. */
'<symbol id="ch-liv" viewBox="0 0 200 260">' +
'<path d="M0 260Q2 198 42 184L80 170H120L158 184Q198 198 200 260Z" fill="#5b7088"/>' +
'<path d="M76 172Q100 196 124 172" stroke="#465a70" stroke-width="8" fill="none"/>' +
'<path d="M40 214l26 30" stroke="#4a3a2a" stroke-width="5" stroke-linecap="round"/><path d="M30 218l18 -16 6 6 -18 16z" fill="#9aa2aa"/>' +
'<rect x="88" y="138" width="24" height="36" fill="#f0cdb2"/>' +
'<path d="M138 120q22 30 10 70q-4 14 -12 18" stroke="#d8b46a" stroke-width="16" fill="none" stroke-linecap="round"/>' +
'<g stroke="#b8924a" stroke-width="2" fill="none"><path d="M142 136l12 4M146 152l12 2M146 168l10 0M142 184l10 -2"/></g>' +
'<ellipse cx="58" cy="106" rx="6" ry="10" fill="#ecc4a8"/><ellipse cx="142" cy="106" rx="6" ry="10" fill="#ecc4a8"/>' +
'<ellipse cx="100" cy="102" rx="40" ry="48" fill="#f6d6bc"/>' +
'<path d="M58 96Q54 44 100 44Q148 44 142 96Q136 66 112 62Q92 72 72 66Q62 76 58 96Z" fill="#e0bf72"/>' +
'<path d="M70 94q11-5 22 -1M108 93q11-4 22 1" stroke="#b8924a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
'<path d="M74 106q8 -5 16 0q-8 4 -16 0zM110 106q8 -5 16 0q-8 4 -16 0z" fill="#fbf6ee"/><circle cx="82" cy="105" r="2.8" fill="#3a6a8a"/><circle cx="118" cy="105" r="2.8" fill="#3a6a8a"/>' +
'<g fill="#c88a5a" opacity=".7"><circle cx="76" cy="118" r="1.3"/><circle cx="82" cy="121" r="1.3"/><circle cx="88" cy="118" r="1.3"/><circle cx="112" cy="118" r="1.3"/><circle cx="118" cy="121" r="1.3"/><circle cx="124" cy="118" r="1.3"/></g>' +
'<path d="M100 108q-5 12 0 17q4 2 7 -1" stroke="#c99a7a" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
'<path d="M86 134q14 7 28 0" stroke="#a04a3e" stroke-width="3" fill="none" stroke-linecap="round"/>' +
'</symbol>' +
'</defs></svg>';

window.CAST = {
  joss: { id: 'ch-joss', who: 'Commander Joss Kirwan', role: 'Commander · Juniper Base', bg: '#22304a' },
  keiko: { id: 'ch-keiko', who: 'Dr Keiko Ishida', role: 'Botanist and base doctor', bg: '#2c4a2a' },
  hugh: { id: 'ch-hugh', who: 'Hugh Lattimer', role: 'Engineer · power, rovers, radios', bg: '#4a2e1c' },
  liv: { id: 'ch-liv', who: 'Dr Liv Gundersen', role: 'Geologist · at the Igloo', bg: '#2e3a4a' }
};
window.FACE = function (k, bg) {
  var c = window.CAST[k];
  return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:' + (bg || c.bg) + '"><use href="#' + c.id + '"/></svg>';
};
