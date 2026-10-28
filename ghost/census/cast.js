/* The living people of "Not a Soul Missed", as busts of 200 x 260. FACE('stella') or FACE('vince') gives the picture for
   an interview. The people of 1881 have no pictures: they are in the records, which is the point. */
(function () {
  function bust(o) {
    var s = '<rect width="200" height="260" fill="' + o.bg + '"/>' + (o.back || '');
    s += '<path d="M2 260Q4 206 46 191L84 178H116L154 191Q196 206 198 260Z" fill="' + o.cloth + '"/>' + (o.dress || '');
    s += '<rect x="87" y="146" width="26" height="40" fill="' + o.skin + '"/><path d="M87 166q13 11 26 0v20h-26z" fill="' + o.shade + '" opacity=".55"/>';
    s += '<ellipse cx="58" cy="113" rx="6.500" ry="10.500" fill="' + o.skin + '"/><ellipse cx="142" cy="113" rx="6.500" ry="10.500" fill="' + o.skin + '"/>';
    s += '<ellipse cx="100" cy="108" rx="' + (o.wide || 40) + '" ry="50" fill="' + o.skin + '"/>';
    s += o.hair || '';
    s += '<ellipse cx="83" cy="112" rx="6.500" ry="4.200" fill="#fbf7ee"/><ellipse cx="117" cy="112" rx="6.500" ry="4.200" fill="#fbf7ee"/>' +
      '<circle cx="' + (84 + (o.look || 0)) + '" cy="112.400" r="3.400" fill="' + o.eye + '"/><circle cx="' + (118 + (o.look || 0)) + '" cy="112.400" r="3.400" fill="' + o.eye + '"/>' +
      '<circle cx="' + (85 + (o.look || 0)) + '" cy="111.200" r="1" fill="#fff"/><circle cx="' + (119 + (o.look || 0)) + '" cy="111.200" r="1" fill="#fff"/>';
    s += o.brows + '<path d="M100 117q-5 12 0 16q5 2 7 -2" stroke="' + o.shade + '" stroke-width="2.600" fill="none" stroke-linecap="round"/>' + o.mouth + (o.face || '');
    return s;
  }
  var S = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs>';

  /* Miss Stella Tunstall: seventy-one, head of Sattersby School for twenty-six years, churchwarden, guide of the
     Lantern Walk. White hair cut short, glasses on a chain, a waxed jacket and a red scarf. She does not count wrong. */
  S += '<symbol id="ch-stella" viewBox="0 0 200 260">' + bust({
    bg: '#2a2c3e', skin: '#ecc9ae', shade: '#c9a080', eye: '#3a4a5a', cloth: '#2f3a2c', look: -1,
    back: '<path d="M0 200Q60 150 100 160T200 190V260H0Z" fill="#1c1e2c"/><circle cx="168" cy="40" r="22" fill="#f0b860" opacity=".22"/><circle cx="168" cy="40" r="10" fill="#f0b860" opacity=".5"/>',
    dress: '<path d="M64 182q36 26 72 0l8 16q-44 28 -88 0z" fill="#a8322c"/><path d="M108 194l18 66h-20l-10 -62z" fill="#a8322c"/><path d="M60 200l-8 60M140 200l8 60" stroke="#1e2620" stroke-width="3"/>' +
      '<path d="M84 178l-10 30M116 178l10 30" stroke="#1e2620" stroke-width="2.500" opacity=".7"/><circle cx="96" cy="236" r="3" fill="#1e2620"/>',
    hair: '<path d="M58 116Q50 52 100 52Q150 52 142 116Q140 84 122 76Q100 70 80 78Q62 86 58 116Z" fill="#e9e6e0"/><path d="M60 100q-6 -30 18 -42" stroke="#cfcac2" stroke-width="3" fill="none"/>' +
      '<path d="M78 64q22 -10 46 -2" stroke="#cfcac2" stroke-width="3" fill="none" stroke-linecap="round"/>',
    brows: '<path d="M72 101q10 -4 20 -1M108 100q10 -3 20 1" stroke="#9a948c" stroke-width="3" fill="none" stroke-linecap="round"/>',
    mouth: '<path d="M88 146q12 2 24 -1" stroke="#9c5a50" stroke-width="2.800" fill="none" stroke-linecap="round"/>',
    face: '<rect x="71" y="104" width="25" height="17" rx="5" fill="none" stroke="#5a4a3a" stroke-width="2.200"/><rect x="104" y="104" width="25" height="17" rx="5" fill="none" stroke="#5a4a3a" stroke-width="2.200"/>' +
      '<path d="M96 110h8" stroke="#5a4a3a" stroke-width="2"/><path d="M71 112q-12 30 -2 70M129 112q12 30 2 70" stroke="#c9a24a" stroke-width="1.300" fill="none"/>' +
      '<path d="M76 128q4 3 8 1M116 129q4 2 8 -1" stroke="#c9a080" stroke-width="1.500" fill="none"/>'
  }) + '</symbol>';

  /* Vince Thewlis, landlord of the Tup: fifty-five, bald, a grey beard, a striped apron, and the patience of a man who
     has heard every ghost story in the dale twice */
  S += '<symbol id="ch-vince" viewBox="0 0 200 260">' + bust({
    bg: '#4a1c16', skin: '#e2b08e', shade: '#bf8a6a', eye: '#2a2a2a', cloth: '#2c3442', wide: 43, look: 2,
    back: '<rect x="0" y="0" width="200" height="40" fill="#2a120c"/><path d="M0 40h200" stroke="#7a4a2a" stroke-width="6"/><circle cx="34" cy="80" r="12" fill="#c9a24a" opacity=".6"/><circle cx="166" cy="80" r="12" fill="#c9a24a" opacity=".6"/>',
    dress: '<path d="M70 196h60l8 64H62z" fill="#e9e2d0"/><path d="M76 196v64M88 196v64M100 196v64M112 196v64M124 196v64" stroke="#3a5a8a" stroke-width="3"/><path d="M70 196l-14 -14M130 196l14 -14" stroke="#e9e2d0" stroke-width="5"/>',
    hair: '<path d="M60 104q-2 -16 4 -24M140 104q2 -16 -4 -24" stroke="#9a9088" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M68 132q10 44 32 46q22 -2 32 -46q-8 20 -32 22q-24 -2 -32 -22z" fill="#a8a29a"/>',
    brows: '<path d="M71 100q11 -6 21 -2M108 98q11 -4 21 2" stroke="#6a6058" stroke-width="3.400" fill="none" stroke-linecap="round"/>',
    mouth: '<path d="M90 148q10 3 20 0" stroke="#7a4a40" stroke-width="2.800" fill="none" stroke-linecap="round"/>',
    face: '<path d="M70 70q30 -14 60 0" stroke="#f0caa8" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>'
  }) + '</symbol>';

  S += '</defs></svg>';
  window.CAST_SVG = S;
  window.FACE = function (who) {
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:' + (who === 'vince' ? '#4a1c16' : '#2a2c3e') + '"><use href="#ch-' + who + '"/></svg>';
  };
})();
