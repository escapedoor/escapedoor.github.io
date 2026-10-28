/* The living person of "Till the Lights Go Up", as a bust of 200 x 260.
   FACE('della') gives the picture for an interview. The people of 1929 and 1969 have no pictures but the staff
   photograph in the foyer, which is drawn in that room. */
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

  /* Della Fraser, the Bijou's last manager: thirty-eight, a work lamp, a bunch of keys and no patience with nonsense */
  S += '<symbol id="ch-della" viewBox="0 0 200 260">' + bust({
    bg: '#3a1418', skin: '#e3b894', shade: '#c4966e', eye: '#3a2a1e', cloth: '#26304a', look: 1,
    back: '<path d="M0 0h34v260H0zM166 0h34v260h-34z" fill="#5a1c22"/><path d="M8 0v260M20 0v260M180 0v260M192 0v260" stroke="#2a0c10" stroke-width="3" opacity=".6"/><rect x="40" y="18" width="120" height="10" fill="#c9a24a" opacity=".55"/>',
    dress: '<path d="M70 184q30 22 60 0l6 18q-36 24 -72 0z" fill="#b8322c"/><path d="M112 196l14 64h-18l-8 -60z" fill="#b8322c"/><path d="M100 206V260" stroke="#141a2a" stroke-width="3"/><circle cx="92" cy="226" r="3" fill="#d9c08a"/><circle cx="92" cy="248" r="3" fill="#d9c08a"/>',
    hair: '<path d="M58 112Q50 50 100 50Q150 50 142 112Q138 80 116 72Q96 66 78 74Q62 82 58 112Z" fill="#2a1c16"/><path d="M136 70q30 10 26 70q-10 -24 -20 -36z" fill="#2a1c16"/><path d="M80 64q16 -8 34 -4" stroke="#4a362a" stroke-width="3" fill="none" stroke-linecap="round"/>',
    brows: '<path d="M72 100q10 -3 20 -1M108 98q10 -4 20 2" stroke="#2a1c16" stroke-width="3.200" fill="none" stroke-linecap="round"/>',
    mouth: '<path d="M88 146q10 3 24 -1" stroke="#9c4a48" stroke-width="2.800" fill="none" stroke-linecap="round"/>',
    face: '<path d="M113 146q4 -1 6 -4" stroke="#9c4a48" stroke-width="2" fill="none" stroke-linecap="round"/>'
  }) + '</symbol>';

  S += '</defs></svg>';
  window.CAST_SVG = S;
  window.FACE = function (who) {
    return '<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" style="background:#3a1418"><use href="#ch-' + who + '"/></svg>';
  };
})();
