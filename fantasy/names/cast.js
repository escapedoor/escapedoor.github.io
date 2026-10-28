/* The people of "A Name That Is True", as busts of 200 x 260 without a background, so that the same drawing can sit in
   a scene and in the panel of a talk. FACE('peregrine') gives the bust on its own colour. */
(function () {
  window.CAST_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>' +

    /* Peregrine Mottram, Licensed Guide No. 9: fifty-odd, round and ruddy, a grey moustache like a hedge, a battered
       green hat, a bottle-green coat, a mustard cravat and the guide's brass badge */
    '<symbol id="ch-peregrine" viewBox="0 0 200 260">' +
    '<path d="M4 260Q8 204 46 190L80 178H120L154 190Q192 204 196 260Z" fill="#2f5a3e"/>' +
    '<path d="M80 180L100 214L120 180Z" fill="#f4efe2"/><path d="M86 186q14 12 28 0l-6 22h-16z" fill="#d6a227"/><path d="M92 200q8 4 16 0" stroke="#a87a14" stroke-width="2" fill="none"/>' +
    '<circle cx="146" cy="222" r="11" fill="#d9b24a" stroke="#8a6a1c" stroke-width="2.500"/><text x="146" y="227" font-family="Cinzel,serif" font-weight="700" font-size="13" fill="#5a3c0a" text-anchor="middle">9</text>' +
    '<path d="M56 196l6 64M144 196l-6 64" stroke="#244832" stroke-width="3"/>' +
    '<rect x="88" y="150" width="24" height="32" fill="#e3ad8c"/>' +
    '<ellipse cx="56" cy="114" rx="8" ry="11" fill="#e3a888"/><ellipse cx="144" cy="114" rx="8" ry="11" fill="#e3a888"/>' +
    '<path d="M58 108Q56 164 100 168Q144 164 142 108Q140 66 100 64Q60 66 58 108Z" fill="#eebc9b"/>' +
    '<path d="M58 106q-6-14 4-24M142 106q6-14-4-24" stroke="#c9c4bc" stroke-width="9" fill="none" stroke-linecap="round"/>' +
    '<path d="M38 74Q100 58 162 74L154 80Q100 70 46 80Z" fill="#26472f"/><path d="M58 76Q60 26 100 24Q140 26 142 76Z" fill="#2f5a3e"/><path d="M60 66Q100 56 140 66" stroke="#7a5a2a" stroke-width="6" fill="none"/>' +
    '<path d="M72 96q10-8 22-3M106 93q12-5 22 3" stroke="#9c958c" stroke-width="4" fill="none" stroke-linecap="round"/>' +
    '<path d="M76 108q8-6 16 0" stroke="#3a2a22" stroke-width="3.400" fill="none" stroke-linecap="round"/><path d="M108 108q8-6 16 0" stroke="#3a2a22" stroke-width="3.400" fill="none" stroke-linecap="round"/>' +
    '<path d="M100 110q-8 20 0 26q7 1 10-3" stroke="#c98a6a" stroke-width="2.600" fill="none" stroke-linecap="round"/>' +
    '<circle cx="74" cy="126" r="10" fill="#e07a6a" opacity=".35"/><circle cx="126" cy="126" r="10" fill="#e07a6a" opacity=".35"/>' +
    '<path d="M100 138q-18-4-34 8q-4 8 6 6q14-8 28-6q14-2 28 6q10 2 6-6q-16-12-34-8z" fill="#bdb6ac"/>' +
    '<path d="M88 152q12 7 24 0" stroke="#8a3a2c" stroke-width="2.800" fill="none" stroke-linecap="round"/>' +
    '</symbol>' +

    /* Mistress Romola Nettleship, Namewright of Utter: sixty, silver braids pinned up in a crown, a plum velvet coat, and
       on a chain the little silver chisel of her office. Asleep (eyes shut, mouth open a little) and awake. */
    '<symbol id="ch-romola-base" viewBox="0 0 200 260">' +
    '<path d="M8 260Q12 206 48 192L82 180H118L152 192Q188 206 192 260Z" fill="#5a2a45"/>' +
    '<path d="M70 184Q100 210 130 184L136 200Q100 226 64 200Z" fill="#7a3a5e"/><path d="M66 196Q100 248 134 196" stroke="#c9c4cc" stroke-width="2.500" fill="none"/>' +
    '<path d="M100 222v22" stroke="#e6e2ea" stroke-width="4"/><path d="M96 244h8l-4 8z" fill="#e6e2ea"/>' +
    '<rect x="88" y="148" width="24" height="34" fill="#7a4a32"/>' +
    '<ellipse cx="60" cy="112" rx="7" ry="10" fill="#7f4d34"/><ellipse cx="140" cy="112" rx="7" ry="10" fill="#7f4d34"/>' +
    '<path d="M62 106Q60 160 100 164Q140 160 138 106Q136 62 100 60Q64 62 62 106Z" fill="#8c5a3c"/>' +
    '<path d="M58 100Q52 54 100 48Q148 54 142 100Q136 72 100 70Q64 72 58 100Z" fill="#d9d6dc"/>' +
    '<path d="M62 56Q100 22 138 56" stroke="#c4c0c8" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M66 50q12-10 22-4M90 40q10-6 20 0M112 44q12-4 22 6" stroke="#eeecf0" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<path d="M74 98q10-5 20-1M106 97q10-4 20 1" stroke="#e2e0e6" stroke-width="3.400" fill="none" stroke-linecap="round"/>' +
    '</symbol>' +
    '<symbol id="ch-romola" viewBox="0 0 200 260"><use href="#ch-romola-base"/>' +
    '<path d="M76 112q8 5 16 0M108 112q8 5 16 0" stroke="#2a1a14" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="144" rx="7" ry="5" fill="#4a1a1a"/>' +
    '</symbol>' +
    '<symbol id="ch-romola-awake" viewBox="0 0 200 260"><use href="#ch-romola-base"/>' +
    '<path d="M74 112q10-8 20 0q-10 6-20 0zM106 112q10-8 20 0q-10 6-20 0z" fill="#f4efe8"/><circle cx="84" cy="112" r="3.600" fill="#1a1210"/><circle cx="116" cy="112" r="3.600" fill="#1a1210"/>' +
    '<path d="M86 141q14 8 28 0" stroke="#4a1a1a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '</symbol>' +

    /* Quintus Merridew, Clerk of the Register: forty, long and pale and thin, black hair parted like a ruler, small round
       spectacles, a high black collar, and a pen behind his ear */
    '<symbol id="ch-quintus" viewBox="0 0 200 260">' +
    '<path d="M22 260Q26 206 60 194L86 182H114L140 194Q174 206 178 260Z" fill="#17171c"/>' +
    '<path d="M84 182L100 156L116 182L112 204H88Z" fill="#f4f2ec"/><path d="M92 184h16" stroke="#17171c" stroke-width="5"/>' +
    '<rect x="90" y="140" width="20" height="30" fill="#e8d6c8"/>' +
    '<ellipse cx="68" cy="104" rx="6" ry="10" fill="#e3cfc0"/><ellipse cx="132" cy="104" rx="6" ry="10" fill="#e3cfc0"/>' +
    '<path d="M70 98Q68 160 100 166Q132 160 130 98Q128 52 100 50Q72 52 70 98Z" fill="#efdccd"/>' +
    '<path d="M68 96Q64 44 100 40Q136 44 132 96Q130 64 108 60L106 52Q78 56 70 80Z" fill="#141418"/><path d="M106 52l2 10" stroke="#efdccd" stroke-width="2"/>' +
    '<path d="M134 88l26-34" stroke="#2a2a30" stroke-width="5" stroke-linecap="round"/><path d="M160 54l3-5" stroke="#d9c8a0" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M78 92h18M104 92h18" stroke="#141418" stroke-width="3.400" stroke-linecap="round"/>' +
    '<circle cx="87" cy="106" r="10" fill="#fff" fill-opacity=".14" stroke="#4a4a52" stroke-width="2.200"/><circle cx="113" cy="106" r="10" fill="#fff" fill-opacity=".14" stroke="#4a4a52" stroke-width="2.200"/><path d="M97 106h6" stroke="#4a4a52" stroke-width="2"/>' +
    '<circle cx="87" cy="107" r="2.800" fill="#1a1a1e"/><circle cx="113" cy="107" r="2.800" fill="#1a1a1e"/>' +
    '<path d="M100 112q-5 20 0 26q5 1 7-2" stroke="#cbb3a0" stroke-width="2.400" fill="none" stroke-linecap="round"/>' +
    '<path d="M90 150h20" stroke="#8a4a44" stroke-width="2.600" stroke-linecap="round"/>' +
    '</symbol>' +

    /* Noll Rickaby, apprentice lamplighter: fifteen, cropped black hair under a flat cap, a smudge of soot, a red scarf,
       and the brass buttons of the Lamplighters */
    '<symbol id="ch-noll" viewBox="0 0 200 260">' +
    '<path d="M14 260Q18 208 52 194L84 182H116L148 194Q182 208 186 260Z" fill="#33414d"/>' +
    '<path d="M70 186Q100 214 130 186L134 206Q100 232 66 206Z" fill="#b8322a"/><path d="M118 206l14 46" stroke="#b8322a" stroke-width="14" stroke-linecap="round"/>' +
    '<g fill="#d9b24a"><circle cx="100" cy="232" r="4"/><circle cx="100" cy="252" r="4"/></g>' +
    '<rect x="89" y="148" width="22" height="34" fill="#b98a62"/>' +
    '<ellipse cx="62" cy="114" rx="7" ry="10" fill="#b5855e"/><ellipse cx="138" cy="114" rx="7" ry="10" fill="#b5855e"/>' +
    '<path d="M64 108Q62 162 100 166Q138 162 136 108Q134 66 100 64Q66 66 64 108Z" fill="#c69a72"/>' +
    '<path d="M62 100Q62 74 100 72Q138 74 138 100Q132 84 100 84Q68 84 62 100Z" fill="#141210"/>' +
    '<path d="M54 82Q60 46 104 46Q146 48 150 76Q150 84 140 84L60 86Q52 88 54 82Z" fill="#4a4036"/><path d="M58 84Q100 92 160 82L162 88Q100 100 56 90Z" fill="#3a3028"/>' +
    '<path d="M76 100q9-5 18-1M106 99q9-4 18 1" stroke="#141210" stroke-width="3.600" fill="none" stroke-linecap="round"/>' +
    '<circle cx="85" cy="112" r="3.500" fill="#1a1410"/><circle cx="115" cy="112" r="3.500" fill="#1a1410"/>' +
    '<path d="M100 114q-5 15 0 19q5 1 7-2" stroke="#9c7050" stroke-width="2.400" fill="none" stroke-linecap="round"/>' +
    '<path d="M84 142q16 12 32 0" stroke="#6a2a20" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<path d="M118 122q10 4 14 12q-12 2-16-6z" fill="#3a3430" opacity=".55"/>' +
    '</symbol>' +

    /* Mrs Prudence Nockles, of the Market of Named Things: fifty, round, rosy, with a cold; a patterned headscarf, a
       knitted shawl, and a handkerchief tucked in at the neck */
    '<symbol id="ch-prudence" viewBox="0 0 200 260">' +
    '<path d="M2 260Q8 200 46 186L80 176H120L154 186Q192 200 198 260Z" fill="#8a5a2a"/>' +
    '<path d="M24 214Q100 174 176 214L186 260H14Z" fill="#c98a4a"/><g stroke="#8a5a2a" stroke-width="3" opacity=".6"><path d="M34 226l10 30M58 214l8 40M84 208l4 46M116 208l-4 46M142 214l-8 40M166 226l-10 30"/></g>' +
    '<path d="M86 180l14 22 14-22" fill="#f6f2ea"/>' +
    '<rect x="88" y="150" width="24" height="30" fill="#efc2a2"/>' +
    '<path d="M60 108Q58 166 100 170Q142 166 140 108Q138 66 100 64Q62 66 60 108Z" fill="#f5cfb2"/>' +
    '<path d="M50 112Q42 50 100 42Q158 50 150 112Q146 70 100 68Q54 70 50 112Z" fill="#3a6a8a"/><g fill="#f2d36a"><circle cx="70" cy="64" r="4"/><circle cx="100" cy="52" r="4"/><circle cx="130" cy="64" r="4"/><circle cx="58" cy="90" r="4"/><circle cx="142" cy="90" r="4"/></g>' +
    '<path d="M60 112Q50 150 70 168M140 112Q150 150 130 168" stroke="#3a6a8a" stroke-width="12" fill="none" stroke-linecap="round"/>' +
    '<path d="M76 100q9-5 18-1M106 99q9-4 18 1" stroke="#7a5a44" stroke-width="3.400" fill="none" stroke-linecap="round"/>' +
    '<path d="M78 112q7 4 14 0M108 112q7 4 14 0" stroke="#3a2a22" stroke-width="3.200" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="100" cy="130" rx="9" ry="8" fill="#e0605a"/>' +
    '<circle cx="74" cy="132" r="10" fill="#e88070" opacity=".35"/><circle cx="126" cy="132" r="10" fill="#e88070" opacity=".35"/>' +
    '<path d="M86 152q14 8 28 0" stroke="#8a3a2c" stroke-width="2.800" fill="none" stroke-linecap="round"/>' +
    '</symbol>' +
    '</defs></svg>';

  window.CAST = {
    peregrine: { id: 'ch-peregrine', who: 'Mr Peregrine Mottram', role: 'Licensed Guide No. 9 of the City of Utter', bg: '#24402e' },
    romola: { id: 'ch-romola', who: 'Mistress Romola Nettleship', role: 'Namewright of Utter · asleep', bg: '#3a2030' },
    romolaA: { id: 'ch-romola-awake', who: 'Mistress Romola Nettleship', role: 'Namewright of Utter', bg: '#3a2030' },
    quintus: { id: 'ch-quintus', who: 'Mr Quintus Merridew', role: 'Clerk of the Register', bg: '#24242c' },
    noll: { id: 'ch-noll', who: 'Noll Rickaby', role: 'Apprentice lamplighter', bg: '#2a3540' },
    prudence: { id: 'ch-prudence', who: 'Mrs Prudence Nockles', role: 'Market of Named Things · stall nine', bg: '#4a3420' }
  };
  window.FACE = function (k, bg) {
    var c = window.CAST[k];
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet"' + (bg ? ' style="background:' + bg + '"' : '') + '><use href="#' + c.id + '"/></svg>';
  };
})();
