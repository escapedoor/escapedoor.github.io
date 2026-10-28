/* The people of "Before the Doors Open", as busts of 200 x 260, drawn from a short list of features each.
   FACE('crozier' | 'dominic' | 'darrow' | 'ebden' | 'carmody') */
window.FACE = (function () {
  var P = {
    /* Dr Adela Crozier, curator of the Caldmere Museum: silver hair in a bun, reading glasses on a chain, a face that measures you */
    crozier: { bg: '#3a4a5a', skin: '#e4c2a2', coat: '#4a3a52', shirt: '#e8e2d2', hair: '#cfcac0', top: 'bun', face: ['specs', 'lines'] },
    /* Dominic Crozier, seventeen, her grandson: a dark hooded coat, hair in his eyes, caught between scared and relieved */
    dominic: { bg: '#2c3642', skin: '#d8ad84', coat: '#273040', shirt: '#4a5a6a', hair: '#2a2420', top: 'hood', face: ['young'] },
    /* Dermot Amory, the old night guard: thirty years here, a grey beard, a cap gone soft, a very slow smile */
    darrow: { bg: '#4a5240', skin: '#c99a6a', coat: '#1c2a34', shirt: '#9aa6b0', hair: '#b8b4aa', top: 'cap', face: ['beard', 'lines', 'smile'] },
    /* Cecil Ebden, the new young guard: keen, upright, a cap set straight, and a watch he is very proud of */
    ebden: { bg: '#53607a', skin: '#8a5a38', coat: '#18242e', shirt: '#aeb8c2', hair: '#3a2a1c', top: 'cap', face: ['smile'] },
    /* Delia Carmody, who cleans the evenings: a flowered tabard, hair tied back, kind and worried at once */
    carmody: { bg: '#8a6a4a', skin: '#e8c6a4', coat: '#6a8a5a', shirt: '#f2e6c8', hair: '#5a4a3a', top: 'bun', face: ['lines', 'smile'] }
  };
  function has(p, f) { return p.face.indexOf(f) >= 0; }
  return function (id) {
    var p = P[id], s = '';
    s += '<path d="M10 260q4 -78 90 -92q86 14 90 92z" fill="' + p.coat + '"/>';
    s += '<path d="M78 176l22 40 22 -40z" fill="' + p.shirt + '"/>';
    s += '<rect x="86" y="150" width="28" height="30" fill="' + p.skin + '"/>';
    s += '<ellipse cx="100" cy="110" rx="44" ry="52" fill="' + p.skin + '"/>';
    if (p.top === 'bun') s += '<path d="M54 104q-4 -58 46 -60q50 2 46 60q-8 -24 -46 -28q-38 4 -46 28z" fill="' + p.hair + '"/><circle cx="100" cy="46" r="15" fill="' + p.hair + '"/>';
    else if (p.top === 'hood') s += '<path d="M44 128q-6 -96 56 -100q62 4 56 100q-8 -30 -16 -40q-40 -16 -80 0q-8 10 -16 40z" fill="' + p.coat + '"/><path d="M58 96q-2 -40 42 -42q44 2 42 42q-8 -20 -42 -24q-34 4 -42 24z" fill="' + p.hair + '"/>';
    else s += '<path d="M56 104q-4 -56 44 -60q48 4 44 60q-8 -22 -44 -26q-36 4 -44 26z" fill="' + p.hair + '"/>';
    if (p.top === 'cap') s += '<path d="M50 72q50 -42 100 0z" fill="' + p.coat + '"/><path d="M46 70h108v14H46z" fill="#12202a"/><path d="M52 84q40 14 70 0" stroke="#12202a" stroke-width="8" fill="none"/><path d="M90 60h20v6H90z" fill="#c9a24a"/>';
    s += '<path d="M78 104h12M110 104h12" stroke="#15110c" stroke-width="4" stroke-linecap="round"/>';
    s += '<circle cx="84" cy="114" r="3.500" fill="#15110c"/><circle cx="116" cy="114" r="3.500" fill="#15110c"/>';
    if (has(p, 'specs')) s += '<g fill="none" stroke="#2a2a30" stroke-width="2.600"><circle cx="84" cy="114" r="12"/><circle cx="116" cy="114" r="12"/><path d="M96 113h8M72 112l-10 -3M128 112l10 -3"/></g>';
    if (has(p, 'lines')) s += '<path d="M66 128q6 4 10 2M134 128q-6 4 -10 2M88 92q12 -4 24 0" stroke="rgba(0,0,0,.26)" stroke-width="2" fill="none"/>';
    s += '<path d="M100 116l-5 18h9" stroke="rgba(0,0,0,.3)" stroke-width="2.400" fill="none"/>';
    if (has(p, 'beard')) s += '<path d="M58 122q-4 70 42 76q46 -6 42 -76q-10 30 -42 28q-32 2 -42 -28z" fill="' + p.hair + '"/>';
    if (has(p, 'smile')) s += '<path d="M86 150q14 9 28 0" stroke="#5a2a22" stroke-width="3" fill="none" stroke-linecap="round"/>';
    else if (has(p, 'young')) s += '<path d="M88 151h24" stroke="#5a2a22" stroke-width="3" stroke-linecap="round"/>';
    else if (!has(p, 'beard')) s += '<path d="M87 152h26" stroke="#5a2a22" stroke-width="3" stroke-linecap="round"/>';
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:' + p.bg + '">' + s + '</svg>';
  };
})();
