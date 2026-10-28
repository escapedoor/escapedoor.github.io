/* The people of "A Nice Measure", as busts of 200 x 260 without a background, so that the same drawing can sit in a
   scene and in the panel of a talk. FACE('mundy') gives the bust on its own colour. */
(function () {
  window.CAST_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>' +

    /* Mapmaster Ysolde Brackenridge: sixty-six, cropped white hair, spectacles pushed up, three scarves for a lost voice,
       and the Guild's chain with a pair of dividers on it */
    '<symbol id="ch-brack" viewBox="0 0 200 260">' +
    '<path d="M8 260Q12 204 48 190L82 178H118L152 190Q188 204 192 260Z" fill="#2f4a3c"/>' +
    '<path d="M64 186Q100 222 136 186L142 214Q100 240 58 214Z" fill="#a8432f"/><path d="M58 206Q100 236 142 206L146 226Q100 254 54 226Z" fill="#d8b56a"/><path d="M70 220q8 26 2 40M126 220q-6 24 0 40" stroke="#7a2e20" stroke-width="10" fill="none" stroke-linecap="round"/>' +
    '<path d="M60 238Q100 262 140 238" stroke="#c9a23c" stroke-width="4" fill="none"/><path d="M100 248l-9 14M100 248l9 14" stroke="#e2c56f" stroke-width="3.500" stroke-linecap="round"/><circle cx="100" cy="248" r="4" fill="#e2c56f"/>' +
    '<rect x="88" y="150" width="24" height="34" fill="#d8b49a"/>' +
    '<ellipse cx="60" cy="112" rx="6" ry="9" fill="#d9b497"/><ellipse cx="140" cy="112" rx="6" ry="9" fill="#d9b497"/>' +
    '<path d="M62 104Q60 158 100 164Q140 158 138 104Q136 58 100 56Q64 58 62 104Z" fill="#e8c8ad"/>' +
    '<path d="M58 104Q50 48 100 42Q150 48 142 104Q138 76 122 70Q112 64 100 66Q74 66 64 82Q60 92 58 104Z" fill="#f1efe9"/><path d="M70 64q14-10 30-6M104 58q20-2 32 12" stroke="#d6d3cb" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<rect x="70" y="72" width="26" height="15" rx="5" fill="#fff" fill-opacity=".18" stroke="#8a6a26" stroke-width="2.400"/><rect x="104" y="72" width="26" height="15" rx="5" fill="#fff" fill-opacity=".18" stroke="#8a6a26" stroke-width="2.400"/><path d="M96 79h8" stroke="#8a6a26" stroke-width="2.200"/>' +
    '<path d="M72 100q10-6 20-1M108 99q10-5 20 1" stroke="#b9b3ac" stroke-width="3.400" fill="none" stroke-linecap="round"/>' +
    '<circle cx="83" cy="111" r="3.300" fill="#2b2a26"/><circle cx="117" cy="111" r="3.300" fill="#2b2a26"/>' +
    '<path d="M100 113q-6 16 0 21q5 1 7-2" stroke="#b98f70" stroke-width="2.400" fill="none" stroke-linecap="round"/>' +
    '<path d="M86 145q14-4 28 0" stroke="#8a4a3c" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<path d="M72 124l-6-2M128 124l6-2M74 136q4 6 10 7M126 136q-4 6-10 7" stroke="#c99a7c" stroke-width="1.800" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="100" cy="128" rx="7" ry="5" fill="#d9786a" opacity=".55"/>' +
    '</symbol>' +

    /* Sefton Wragg, apprentice, from Wethercote: dark curls, freckles, an inky smock and a pencil behind his ear */
    '<symbol id="ch-sefton" viewBox="0 0 200 260">' +
    '<path d="M6 260Q10 206 46 192L82 180H118L154 192Q190 206 194 260Z" fill="#6f6a58"/>' +
    '<path d="M80 182L100 206L120 182" fill="none" stroke="#4e4a3c" stroke-width="5"/><path d="M60 226q10 6 8 20M144 222q-6 10 2 24" stroke="#2b3550" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>' +
    '<rect x="88" y="150" width="24" height="34" fill="#c99877"/>' +
    '<ellipse cx="58" cy="114" rx="7" ry="10" fill="#cf9e7e"/><ellipse cx="142" cy="114" rx="7" ry="10" fill="#cf9e7e"/>' +
    '<path d="M60 106Q58 160 100 166Q142 160 140 106Q138 60 100 58Q62 60 60 106Z" fill="#dcab8a"/>' +
    '<g fill="#2a1c14"><circle cx="66" cy="76" r="15"/><circle cx="84" cy="62" r="16"/><circle cx="104" cy="56" r="17"/><circle cx="124" cy="62" r="16"/><circle cx="138" cy="78" r="14"/><circle cx="58" cy="94" r="11"/><circle cx="144" cy="96" r="10"/><circle cx="96" cy="70" r="12"/><circle cx="116" cy="72" r="11"/></g>' +
    '<path d="M138 92l26-30" stroke="#c9a23c" stroke-width="6" stroke-linecap="round"/><path d="M164 62l4-6" stroke="#2a2a2a" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M74 100q10-7 20-2M106 98q10-5 20 2" stroke="#2a1c14" stroke-width="4" fill="none" stroke-linecap="round"/>' +
    '<circle cx="84" cy="112" r="3.600" fill="#1f1712"/><circle cx="116" cy="112" r="3.600" fill="#1f1712"/>' +
    '<path d="M100 114q-6 15 0 20q5 1 7-2" stroke="#a87658" stroke-width="2.400" fill="none" stroke-linecap="round"/>' +
    '<path d="M84 142q16 10 32 0" stroke="#7a3a2c" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<g fill="#a86a4a" opacity=".6"><circle cx="76" cy="126" r="1.600"/><circle cx="82" cy="130" r="1.600"/><circle cx="72" cy="132" r="1.600"/><circle cx="124" cy="126" r="1.600"/><circle cx="118" cy="130" r="1.600"/><circle cx="128" cy="132" r="1.600"/></g>' +
    '<path d="M108 150l10 6" stroke="#2b3550" stroke-width="3" stroke-linecap="round" opacity=".6"/>' +
    '</symbol>' +

    /* Mistress Perpetua Mundy, Envoy of Querne: black hair in a hard bun, a high collar, the ochre sash of Querne, and a
       face that is waiting for you to be wrong */
    '<symbol id="ch-mundy" viewBox="0 0 200 260">' +
    '<path d="M10 260Q14 204 50 190L82 176H118L150 190Q186 204 190 260Z" fill="#26232a"/>' +
    '<path d="M78 176L100 160L122 176L118 200H82Z" fill="#f2ede0"/><path d="M84 178l16 18 16-18" fill="none" stroke="#c9bfa8" stroke-width="2"/>' +
    '<path d="M30 214L170 248L166 262L26 228Z" fill="#c98a1e"/><path d="M30 214L170 248" stroke="#8a5a10" stroke-width="2"/><circle cx="100" cy="232" r="9" fill="#e9c46a" stroke="#8a5a10" stroke-width="2.500"/>' +
    '<rect x="89" y="146" width="22" height="20" fill="#b98a6c"/>' +
    '<ellipse cx="62" cy="108" rx="6" ry="9" fill="#bf8f72"/><ellipse cx="138" cy="108" rx="6" ry="9" fill="#bf8f72"/>' +
    '<path d="M64 102Q62 152 100 158Q138 152 136 102Q134 58 100 56Q66 58 64 102Z" fill="#cd9c7e"/>' +
    '<path d="M60 102Q54 52 100 46Q146 52 140 102Q136 70 100 68Q64 70 60 102Z" fill="#14121a"/><circle cx="100" cy="34" r="17" fill="#14121a"/><path d="M84 30h32" stroke="#c98a1e" stroke-width="3"/>' +
    '<path d="M72 94l20 2M108 96l20-2" stroke="#14121a" stroke-width="3.600" stroke-linecap="round"/>' +
    '<circle cx="84" cy="106" r="3.200" fill="#1a1416"/><circle cx="116" cy="106" r="3.200" fill="#1a1416"/>' +
    '<path d="M100 108q-5 16 1 20q4 1 6-2" stroke="#a87458" stroke-width="2.400" fill="none" stroke-linecap="round"/>' +
    '<path d="M88 140h24" stroke="#7a3a34" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="118" cy="106" r="11" fill="none" stroke="#c98a1e" stroke-width="2"/><path d="M129 108q14 20 6 54" stroke="#c98a1e" stroke-width="1.600" fill="none"/>' +
    '</symbol>' +

    /* Sir Tristram Yelverton, Envoy of Selvan: tall, fair, a soft moustache, Selvan's blue-green coat, a sketchbook */
    '<symbol id="ch-yelv" viewBox="0 0 200 260">' +
    '<path d="M2 260Q6 202 44 188L80 174H120L156 188Q194 202 198 260Z" fill="#2c6e6a"/>' +
    '<path d="M80 176L100 214L120 176Z" fill="#f6f1e4"/><path d="M92 184q8 10 16 0l-4 26h-8z" fill="#c23a3a"/>' +
    '<path d="M44 196l10 64M156 196l-10 64" stroke="#d8c38a" stroke-width="5"/><g fill="#d8c38a"><circle cx="56" cy="214" r="4"/><circle cx="60" cy="236" r="4"/><circle cx="144" cy="214" r="4"/><circle cx="140" cy="236" r="4"/></g>' +
    '<rect x="88" y="148" width="24" height="30" fill="#e7c2a4"/>' +
    '<ellipse cx="58" cy="110" rx="6" ry="10" fill="#e6bfa0"/><ellipse cx="142" cy="110" rx="6" ry="10" fill="#e6bfa0"/>' +
    '<path d="M60 102Q58 156 100 162Q142 156 140 102Q138 56 100 54Q62 56 60 102Z" fill="#f0cfb2"/>' +
    '<path d="M56 100Q48 44 104 40Q152 44 144 96Q132 62 98 64Q74 64 66 74Q60 84 56 100Z" fill="#e3c06e"/><path d="M66 70q30-26 72-6" stroke="#c9a04a" stroke-width="4" fill="none" stroke-linecap="round"/>' +
    '<path d="M72 96q10-6 20-1M108 95q10-5 20 1" stroke="#b99a4e" stroke-width="3.400" fill="none" stroke-linecap="round"/>' +
    '<circle cx="84" cy="108" r="3.300" fill="#2a3a44"/><circle cx="116" cy="108" r="3.300" fill="#2a3a44"/>' +
    '<path d="M100 110q-7 18 0 22q6 1 8-2" stroke="#c99878" stroke-width="2.600" fill="none" stroke-linecap="round"/>' +
    '<path d="M100 136q-14-6-28 6q14 4 28-2q14 6 28 2q-14-12-28-6z" fill="#d9b25e"/><path d="M90 148q10 5 20 0" stroke="#9a4a3c" stroke-width="2.600" fill="none" stroke-linecap="round"/>' +
    '<circle cx="72" cy="124" r="8" fill="#e08a7a" opacity=".3"/><circle cx="128" cy="124" r="8" fill="#e08a7a" opacity=".3"/>' +
    '</symbol>' +
    '</defs></svg>';

  window.CAST = {
    brack: { id: 'ch-brack', who: 'Mapmaster Brackenridge', role: 'Mapmaster of the Guild · has lost her voice', bg: '#23382e' },
    sefton: { id: 'ch-sefton', who: 'Sefton Wragg', role: 'Apprentice of the Guild · from Wethercote', bg: '#3a3628' },
    mundy: { id: 'ch-mundy', who: 'Mistress Perpetua Mundy', role: 'Envoy of the Crown of Querne', bg: '#3a2a16' },
    yelv: { id: 'ch-yelv', who: 'Sir Tristram Yelverton', role: 'Envoy of the Crown of Selvan', bg: '#1f3a3a' }
  };
  window.FACE = function (k, bg) {
    var c = window.CAST[k];
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet"' + (bg ? ' style="background:' + bg + '"' : '') + '><use href="#' + c.id + '"/></svg>';
  };
})();
