/* The people of "Lane Seven". Each is a set of choices for OR.person() in orchid.js, which draws them standing
   (feet at 0,0) in the scenes, and FACE(who) crops the same drawing to a bust for an interview. */
window.CAST = {
  /* Dr Ada Kinsella: the port's plant health inspector, a botanist. Grey hair cut short, a hand lens on a cord, a hi-vis vest over a green fleece */
  ada: { skin: '#efcfb6', hair: '#b8b4ae', hairStyle: 'crop', coat: '#3e5a3a', legs: '#2a2e2a', shoes: '#1a1a16', boots: '#1f2a1f', shirt: '#d9d4c4',
    hivis: '#d9e021', lens: true, glasses: 'half', pose: 'down', bg: '#22302a', mouth: 'flat' },
  /* Officer Kamal Lakhani: customs, twenty-six, navy jumper with epaulettes, very tidy */
  kamal: { skin: '#a8714c', hair: '#141010', hairStyle: 'short', coat: '#1d2a44', legs: '#1d2a44', shoes: '#0e0e10', shirt: '#e8ecf0',
    epaulettes: '#121a2c', badge: '#2a4a7a', pose: 'hold', folder: '#141a26', bg: '#1c2433', mouth: 'flat', knit: true },
  /* Benny Gault: a courier driver, forties, a grey hoodie under a work jacket, not slept */
  benny: { skin: '#e2b49a', hair: '#6a5240', hairStyle: 'short', coat: '#4a4a46', legs: '#2c3442', shoes: '#2a2420', shirt: '#8a8f94',
    stubble: '#5a4434', tired: true, pose: 'hands', bg: '#2a2a2e', mouth: 'flat', w: 1.08 },
  /* Mr Hector Blakely: an orchid grower, sixty, a moss-green cardigan, a tweed cap, very polite */
  blakely: { skin: '#eccab0', hair: '#d6d2ca', hairStyle: 'short', coat: '#5a6a3a', legs: '#4a3e32', shoes: '#3a2a1c', shirt: '#e8e2d2',
    tie: '#7a2a2a', knit: true, cap: '#6b5a44', moustache: '#cfcac0', pose: 'cup', bg: '#2e3424', mouth: 'smile', brows: '#c9c4bc' },
  /* Gwen Elphick: the lane marshal, a long hi-vis coat, a torch */
  gwen: { skin: '#f0d2bc', hair: '#c46a3a', hairStyle: 'bun', coat: '#e2e64a', long: true, legs: '#1e2228', shoes: '#141414', shirt: '#2a2a2a',
    hivis: '#e2e64a', cap: '#22283a', pose: 'torch', bg: '#1e2430', mouth: 'flat' },
  /* Second Officer Caitlin Ebdon: the ferry Eider. White shirt, black jumper, gold stripes */
  caitlin: { skin: '#d9a07c', hair: '#2a1c14', hairStyle: 'bun', coat: '#15171c', legs: '#15171c', shoes: '#0a0a0a', shirt: '#f2f2f2',
    epaulettes: '#0e0e10', pose: 'fold', bg: '#1a1e26', mouth: 'flat' }
};

/* the face for an interview: the same drawing, cropped to head and shoulders */
window.FACE = function (who) {
  var c = window.CAST[who] || {}, bg = c.bg || '#222';
  var fig = (window.OR && OR.person) ? OR.person(c, true) : '';
  return '<svg viewBox="-74 -356 148 192" preserveAspectRatio="xMidYMax meet" style="background:' + bg + '">' +
    '<rect x="-120" y="-420" width="240" height="320" fill="' + bg + '"/><circle cx="46" cy="-330" r="58" fill="#fff" opacity=".06"/>' +
    '<path d="M-120 -200h240v40h-240z" fill="#000" opacity=".18"/>' + fig + '</svg>';
};
