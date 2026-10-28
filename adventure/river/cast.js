/* The people of "A Little Water", as busts of 200 x 260, drawn from a short list of features each.
   FACE('joba' | 'lemi' | 'gilroy' | 'grice' | 'isobel') */
window.FACE = (function () {
  var P = {
    /* Captain Joba Ilunde, master and pilot of the Jacana: a white cap gone the colour of tea, grey stubble, a pipe he never lights */
    joba: { bg: '#5f7f8f', skin: '#5a3a24', coat: '#1f2a3a', shirt: '#e9e2cf', hair: '#cfcac0', top: 'cap', face: ['stubble', 'flat', 'lines'], extra: 'pipe' },
    /* Lemi Ilunde, fourteen, apprentice pilot: an orange headscarf, a sounding pole, and no patience with fools */
    lemi: { bg: '#d9b05a', skin: '#6b4423', coat: '#2f6a5a', shirt: '#f2e6c8', hair: '#c96a2b', top: 'scarf', face: ['smile'], small: 1, extra: 'pole' },
    /* Mr Jasper Gilroy, "orchids": a white suit that was white in Port Gessin, a panama hat, round spectacles */
    gilroy: { bg: '#b9c4a8', skin: '#e2bc94', coat: '#ece5d0', shirt: '#7a2a22', hair: '#6b4a2a', top: 'panama', face: ['specs', 'tache', 'smile'] },
    /* Mr Lambert Grice, of Grice's Post: a great deal of beard, braces, and a pencil that lives behind his ear */
    grice: { bg: '#a8562a', skin: '#e0b48c', coat: '#4a3a2a', shirt: '#d9cdb0', hair: '#8f8a80', top: 'bald', face: ['beard', 'flat', 'pencil'], extra: 'braces' },
    /* Dr Isobel Kinnaird, collector for the Garden: a man's felt hat, grey hair escaping from it, a face that has stopped being surprised */
    isobel: { bg: '#2c3a4a', skin: '#e8c4a2', coat: '#6b6a4a', shirt: '#e9e2cf', hair: '#b9b5ac', top: 'felt', face: ['lines', 'smile'] }
  };
  function has(p, f) { return p.face.indexOf(f) >= 0; }
  return function (id) {
    var p = P[id], s = '', y = p.small ? 16 : 0;
    s += '<path d="M10 260q4 -78 90 -92q86 14 90 92z" fill="' + p.coat + '"/>';
    s += '<path d="M78 176l22 40 22 -40z" fill="' + p.shirt + '"/>';
    if (p.extra === 'braces') s += '<path d="M64 190l-8 70M136 190l8 70" stroke="#7a2a22" stroke-width="8"/>';
    s += '<g transform="translate(0 ' + y + ')">';
    s += '<rect x="86" y="150" width="28" height="30" fill="' + p.skin + '"/>';
    s += '<ellipse cx="100" cy="110" rx="44" ry="52" fill="' + p.skin + '"/>';
    if (p.top === 'scarf') s += '<path d="M54 104q-4 -64 46 -66q50 2 46 66q-10 -26 -46 -30q-36 4 -46 30z" fill="' + p.hair + '"/><path d="M140 70q26 -6 24 22q-8 -6 -18 -4z" fill="' + p.hair + '"/>';
    else if (p.top !== 'bald') s += '<path d="M56 104q-4 -56 44 -60q48 4 44 60q-8 -22 -44 -26q-36 4 -44 26z" fill="' + p.hair + '"/>';
    else s += '<path d="M56 112q-2 -20 6 -30M144 112q2 -20 -6 -30" stroke="' + p.hair + '" stroke-width="9" fill="none" stroke-linecap="round"/>';
    if (p.top === 'cap') s += '<path d="M50 70q50 -44 100 0z" fill="#ece3cc"/><path d="M48 68h104v14H48z" fill="#1f2a3a"/><path d="M52 82q40 14 70 0" stroke="#1f2a3a" stroke-width="8" fill="none"/><circle cx="100" cy="58" r="6" fill="#d9b05a"/>';
    else if (p.top === 'panama') s += '<ellipse cx="100" cy="66" rx="74" ry="14" fill="#efe8d2"/><path d="M60 66q0 -42 40 -42t40 42z" fill="#f4eedb"/><path d="M60 60h80" stroke="#2a2a30" stroke-width="8"/>';
    else if (p.top === 'felt') s += '<ellipse cx="100" cy="66" rx="70" ry="13" fill="#5a4a30"/><path d="M62 66q0 -44 38 -44t38 44z" fill="#6b5a3a"/><path d="M62 60h76" stroke="#3a2e1c" stroke-width="7"/><path d="M58 82q-10 14 -2 30M142 82q10 14 2 30" stroke="' + p.hair + '" stroke-width="6" fill="none" stroke-linecap="round"/>';
    s += '<path d="M78 104h12M110 104h12" stroke="#1c140c" stroke-width="4" stroke-linecap="round"/>';
    s += '<circle cx="84" cy="114" r="3.500" fill="#1c140c"/><circle cx="116" cy="114" r="3.500" fill="#1c140c"/>';
    if (has(p, 'specs')) s += '<g fill="none" stroke="#2a2a30" stroke-width="2.600"><circle cx="84" cy="114" r="12"/><circle cx="116" cy="114" r="12"/><path d="M96 113h8M72 112l-10 -3M128 112l10 -3"/></g>';
    if (has(p, 'lines')) s += '<path d="M66 128q6 4 10 2M134 128q-6 4 -10 2M88 92q12 -4 24 0" stroke="rgba(0,0,0,.28)" stroke-width="2" fill="none"/>';
    s += '<path d="M100 116l-5 18h9" stroke="rgba(0,0,0,.3)" stroke-width="2.400" fill="none"/>';
    if (has(p, 'beard')) s += '<path d="M58 122q-4 70 42 76q46 -6 42 -76q-10 30 -42 28q-32 2 -42 -28z" fill="' + p.hair + '"/>';
    if (has(p, 'stubble')) s += '<path d="M64 130q8 40 36 44q28 -4 36 -44q-10 24 -36 24t-36 -24z" fill="' + p.hair + '" opacity=".45"/>';
    if (has(p, 'tache')) s += '<path d="M82 140q9 -7 18 -2q9 -5 18 2q-9 4 -18 0q-9 4 -18 0z" fill="' + p.hair + '"/>';
    if (has(p, 'smile')) s += '<path d="M86 150q14 9 28 0" stroke="#5a2a22" stroke-width="3" fill="none" stroke-linecap="round"/>';
    else if (!has(p, 'beard')) s += '<path d="M87 152h26" stroke="#5a2a22" stroke-width="3" stroke-linecap="round"/>';
    if (has(p, 'pencil')) s += '<path d="M146 92l14 -30" stroke="#e8b017" stroke-width="4" stroke-linecap="round"/><path d="M160 62l3 -6" stroke="#22201c" stroke-width="4" stroke-linecap="round"/>';
    if (p.extra === 'pipe') s += '<path d="M112 154q20 4 30 -2" stroke="#3a2412" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M138 140h14v16h-14z" fill="#3a2412"/>';
    s += '</g>';
    if (p.extra === 'pole') s += '<path d="M172 260L188 10" stroke="#c9a46a" stroke-width="7" stroke-linecap="round"/><g stroke="#7a2a22" stroke-width="7"><path d="M181 120l0 10M178 160l0 10M176 200l0 10"/></g>';
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:' + p.bg + '">' + s + '</svg>';
  };
})();
