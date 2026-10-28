/* The people of "Under Seal". Each is a set of choices for CO.person() in cold.js, which draws them standing
   (feet at 0,0) in the scenes, and FACE(who) crops the same drawing to a bust for an interview. */
window.CAST = {
  /* Mrs Judith Grayling: the store manager, fifty-two. A brown store coat, reading glasses on a chain, a pencil behind her ear */
  judith: { skin: '#e8c4a8', hair: '#5a4a40', hairStyle: 'bob', coat: '#7a5a3a', long: true, legs: '#2e2a28', shoes: '#1a1612', shirt: '#e9e2d0',
    buttons: true, pocket: '#2a4a8a', chain: '#c9a54a', pencil: true, pose: 'clip', folder: '#8a6a3a', bg: '#3a2e24', mouth: 'flat' },
  /* Dr Gillian Hesketh: glass and fibres, retired, seventy-four. A camel coat, a red scarf, a lens on a chain, a stick she says she does not need */
  gillian: { skin: '#f0d6c2', hair: '#e8e4de', hairStyle: 'bun', coat: '#b08a5a', long: true, legs: '#3a3430', shoes: '#2a1c14', shirt: '#f2efe6',
    scarf: '#a8261c', chain: '#c9a54a', lens: true, glasses: 'round', lines: true, pose: 'stick', bg: '#2e2a34', mouth: 'firm', brows: '#cfc8be' },
  /* Dr Hamza Jalloh: DNA, thirty-one. A white suit for the clean room, blue gloves, square glasses */
  hamza: { skin: '#6a4430', hair: '#141010', hairStyle: 'crop', coat: '#eef2f4', legs: '#e2e8ec', shoes: '#c9d3d8', lapel: false, zip: true,
    gloves: '#5a8ad8', glasses: 'square', pose: 'hands', bg: '#1e2c3a', mouth: 'smile', badge: '#2a7a6a' }
};

/* the face for an interview: the same drawing, cropped to head and shoulders */
window.FACE = function (who) {
  var c = window.CAST[who] || {}, bg = c.bg || '#222';
  var fig = (window.CO && CO.person) ? CO.person(c, true) : '';
  return '<svg viewBox="-74 -356 148 192" preserveAspectRatio="xMidYMax meet" style="background:' + bg + '">' +
    '<rect x="-120" y="-420" width="240" height="320" fill="' + bg + '"/><circle cx="-40" cy="-320" r="62" fill="#fff" opacity=".05"/>' +
    '<path d="M-120 -196h240v36h-240z" fill="#000" opacity=".2"/>' + fig + '</svg>';
};
