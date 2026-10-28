/* "The Seventh Book": things more than one room needs. The grey manuscript box, the two photographs of it,
   the player's own notes from Saturday night, the pages of the notebook Aunt Edwina typed, and the three pencils
   (saw / heard / assumed) used on statements in the study and on the player's own notes in the library.
   Nothing here holds an answer: the pencils only report what the player has marked. */
(function () {
'use strict';
var SV = window.SV = {};

/* ---------- the grey box, drawn in three-quarter view (200 x 80 before scaling) ----------
   o = {x, y, s: scale, flip: label upside down, open: lid off (the box is empty), hot: data-h names on the parts} */
SV.box = function (o) {
  var s = o.s || 1, h = function (n) { return o.hot ? ' data-h="' + n + '"' : ''; };
  var g = '<g transform="translate(' + o.x + ' ' + o.y + ') scale(' + s + ')">';
  g += '<ellipse cx="118" cy="84" rx="132" ry="9" fill="#000" opacity=".22"/>';
  if (o.open) {
    g += '<path d="M0 30L40 0H240L200 30Z" fill="#3c3f44"/><path d="M8 28L44 4H232L198 28Z" fill="#26282c"/>' +
      '<path d="M44 4L8 28" stroke="#4a4d52" stroke-width="2"/>' +
      '<path d="M0 30H200V80H0Z" fill="#8d9298"/><path d="M200 30L240 0V50L200 80Z" fill="#6f747a"/>' +
      '<text x="100" y="62" text-anchor="middle" font-family="Cinzel,serif" font-weight="700" font-size="10" letter-spacing="2" fill="#4a4f56">DABNEY &amp; FANE</text>';
  } else {
    g += '<g' + h('side') + '><path d="M200 30L240 0V50L200 80Z" fill="#6f747a"/><path d="M200 30L240 0V14L200 44Z" fill="#5d6268"/></g>' +
      '<g' + h('front') + '><path d="M0 30H200V80H0Z" fill="#8d9298"/>' +
      '<text x="100" y="66" text-anchor="middle" font-family="Cinzel,serif" font-weight="700" font-size="10" letter-spacing="2" fill="#4a4f56">DABNEY &amp; FANE</text></g>' +
      '<g' + h('rim') + '><path d="M0 30H200V44H0Z" fill="#7a7f86"/></g>' +
      '<g' + h('lid') + '><path d="M0 30L40 0H240L200 30Z" fill="#a3a8ae"/></g>' +
      '<g transform="matrix(1 0 -1.3333 1 40 0)"' + h('label') + '><g' + (o.flip ? ' transform="rotate(180 100 15)"' : '') + '>' +
      '<rect x="52" y="6" width="96" height="19" fill="#fbf7ea" stroke="#c9bfa4" stroke-width=".8"/>' +
      '<text x="100" y="14.5" text-anchor="middle" font-family="Cinzel,serif" font-weight="700" font-size="7" fill="#2a2620">COMFREY GOES HOME</text>' +
      '<text x="100" y="22" text-anchor="middle" font-family="EB Garamond,serif" font-style="italic" font-size="6" fill="#4a4030">A. Cleave · 412 pages</text></g></g>';
  }
  return g + '</g>';
};
SV.lid = function (x, y, s, flip) {          /* the lid on its own, leaning, after it has been lifted off */
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 30L40 0H240L200 30Z" fill="#a3a8ae"/><path d="M0 30H200V44H0Z" fill="#7a7f86"/>' +
    '<g transform="matrix(1 0 -1.3333 1 40 0)"><g' + (flip ? ' transform="rotate(180 100 15)"' : '') + '><rect x="52" y="6" width="96" height="19" fill="#fbf7ea"/>' +
    '<text x="100" y="14.5" text-anchor="middle" font-family="Cinzel,serif" font-weight="700" font-size="7" fill="#2a2620">COMFREY GOES HOME</text>' +
    '<text x="100" y="22" text-anchor="middle" font-family="EB Garamond,serif" font-style="italic" font-size="6" fill="#4a4030">A. Cleave · 412 pages</text></g></g></g>';
};

/* ---------- the two photographs ----------
   Ms Ahn's: the library table at 6.41 on Saturday, the box just closed, the label the right way up.
   Yours: the study desk at 10.06, before the door was locked. The label is upside down. */
SV.photoSvg = function (kind, hot) {
  var h = function (n) { return hot ? ' data-h="' + n + '"' : ''; }, s;
  if (kind === 'eunji') {
    s = '<svg class="ph-svg" viewBox="0 0 480 330" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="480" height="330" fill="#3a1f1a"/>' +
      '<g' + h('shelves') + '><rect x="0" y="0" width="480" height="150" fill="#4a2a20"/>' +
      '<g fill="#7a3a2a"><rect x="20" y="20" width="14" height="56"/><rect x="36" y="26" width="12" height="50"/><rect x="50" y="18" width="16" height="58"/><rect x="300" y="22" width="14" height="54"/><rect x="316" y="18" width="18" height="58"/><rect x="336" y="26" width="12" height="50"/><rect x="350" y="20" width="15" height="56"/><rect x="420" y="24" width="14" height="52"/><rect x="436" y="18" width="16" height="58"/></g>' +
      '<g fill="#2f4a3a"><rect x="68" y="24" width="12" height="52"/><rect x="368" y="22" width="13" height="54"/></g><path d="M0 78H480M0 148H480" stroke="#2a150f" stroke-width="5"/></g>' +
      '<g' + h('lamp') + '><path d="M392 150v-40" stroke="#c9a24a" stroke-width="5"/><path d="M360 112q0-26 32-26t32 26z" fill="#2f6a4e"/><circle cx="392" cy="140" r="70" fill="#ffd27a" opacity=".16"/></g>' +
      '<g' + h('table') + '><path d="M0 200H480V330H0Z" fill="#6b3a24"/><path d="M0 200H480" stroke="#8a5030" stroke-width="4"/></g>' +
      '<g' + h('glasses') + '><g fill="none" stroke="#2b2622" stroke-width="3"><circle cx="44" cy="290" r="13"/><circle cx="76" cy="290" r="13"/></g><path d="M57 290h6M31 288l-16-8M89 288l14-10" stroke="#2b2622" stroke-width="3" fill="none"/></g>' +
      '<g' + h('glass') + '><path d="M410 232h22l-4 34h-14z" fill="#e9c27a" opacity=".85"/><path d="M406 228h30" stroke="#f3e7cc" stroke-width="3"/></g>' +
      SV.box({ x: 112, y: 178, s: 1.1, hot: hot }) +
      '</svg>';
  } else {
    s = '<svg class="ph-svg" viewBox="0 0 480 330" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="480" height="330" fill="#2a2f2e"/>' +
      '<g' + h('window') + '><rect x="300" y="20" width="150" height="170" fill="#14202a"/><path d="M300 105H450M375 20V190" stroke="#d9d2bf" stroke-width="7"/><rect x="300" y="20" width="150" height="170" fill="none" stroke="#d9d2bf" stroke-width="9"/>' +
      '<rect x="362" y="98" width="26" height="9" rx="3" fill="#d4a93c"/><path d="M366 102h22" stroke="#8a6a22" stroke-width="2"/></g>' +
      '<g' + h('curtain') + '><path d="M276 10q20 90 4 200h26q-8-100 6-200z" fill="#7a2c2c"/><path d="M474 10q-20 90-4 200h-26q8-100-6-200z" fill="#7a2c2c"/></g>' +
      '<g' + h('desk') + '><path d="M0 200H480V330H0Z" fill="#4b2e1c"/><path d="M0 200H480" stroke="#6d4428" stroke-width="4"/><rect x="40" y="214" width="400" height="90" fill="#2f5a3a" opacity=".55"/></g>' +
      '<g' + h('ink') + '><rect x="18" y="228" width="58" height="16" fill="#c9a24a"/><rect x="24" y="216" width="16" height="14" fill="#1a1a22"/><rect x="54" y="216" width="16" height="14" fill="#1a1a22"/><path d="M32 216l30-30" stroke="#2a2a2a" stroke-width="3"/></g>' +
      SV.box({ x: 112, y: 178, s: 1.1, flip: true, hot: hot }) +
      '<text x="470" y="320" text-anchor="end" font-family="Oswald,sans-serif" font-size="13" fill="#ffb347" opacity=".9">22:06</text>' +
      '</svg>';
  }
  return s;
};
SV.photoDoc = function (kind) {
  return kind === 'eunji'
    ? '<h4>Ms Ahn’s photograph, Saturday, 6.41 pm</h4><div class="ph-frame">' + SV.photoSvg('eunji') + '</div><p class="ph-cap">The library table, a minute after Mrs Cleave put her book in the box. Her spectacles are beside it.</p>'
    : '<h4>Your photograph, Saturday, 10.06 pm</h4><div class="ph-frame">' + SV.photoSvg('mine') + '</div><p class="ph-cap">The study desk, two minutes before the door was locked. Taken for the insurance.</p>';
};

/* ---------- your notes, written in bed on Saturday night ---------- */
SV.NOTES = [
  ['n1', 'At twenty to seven Mrs Cleave put the manuscript of Comfrey Goes Home into a grey box in the library.'],
  ['n2', 'Everybody watched.'],
  ['n3', 'Aunt Edwina put the lid on and wrote the label.'],
  ['n4', 'I ate in the kitchen with Mrs Beddoes.'],
  ['n5', 'Nothing happened at dinner.'],
  ['n6', 'At five past ten Aunt Edwina and I carried the manuscript up to the study.'],
  ['n7', 'I took a photograph of the desk for the insurance.'],
  ['n8', 'Aunt Edwina looked behind the curtains, and the window catch was across.'],
  ['n9', 'She locked the door at eight minutes past ten.'],
  ['n10', 'She says the spare key has been in the bank since 1998.'],
  ['n11', 'She tied the key to my wrist with a ribbon.'],
  ['n12', 'Nobody can get in now.']
];
SV.notesDoc = function () {
  return '<h4>My notes · Saturday night</h4><p class="nt-when">Written in bed at a quarter past ten.</p><p>' +
    SV.NOTES.map(function (n) { return n[1]; }).join(' ') + '</p>';
};

/* ---------- a page of the notebook Aunt Edwina typed for you ---------- */
SV.page = function (n, title, body) {
  return '<h4><small>Page ' + n + '</small>' + title + '</h4>' + body + '<p class="np-sig">E. D.</p>';
};

/* ---------- the three pencils ----------
   docs: [{cls, head, sents: [[id, text], ...], foot}]   o: {state: {id: pen}, change: fn(state), locked: fn -> bool}
   Choose a pencil, then click a sentence; click it again with the same pencil to rub the line out. */
var PENS = [['saw', 'Saw', 'with my own eyes or hands'], ['heard', 'Heard', 'with my ears, or was told'], ['assumed', 'Assumed', 'worked out or took for granted']];
SV.marks = function (host, docs, o) {
  var state = o.state || {}, pen = 'saw', ph = o.pensHost || host;
  var pens = '<div class="mk-pens">' + PENS.map(function (p) {
    return '<button type="button" class="mk-pen p-' + p[0] + '" data-pen="' + p[0] + '"><i></i><b>' + p[1] + '</b><small>' + p[2] + '</small></button>';
  }).join('') + '</div>';
  var s = (o.pensHost ? '' : pens) + '<div class="mk-docs">';
  if (o.pensHost) o.pensHost.innerHTML = pens;
  docs.forEach(function (d) {
    s += '<div class="mk-sheet ' + (d.cls || '') + '">' + (d.head ? '<div class="mk-head">' + d.head + '</div>' : '') + '<p>' +
      d.sents.map(function (t) { return '<span class="mk" data-id="' + t[0] + '">' + ER.gloss(t[1]) + '</span>'; }).join(' ') + '</p>' +
      (d.foot ? '<div class="mk-foot">' + d.foot + '</div>' : '') + '</div>';
  });
  host.innerHTML = s + '</div>';
  function paint() {
    ER.$$('.mk', host).forEach(function (n) {
      var m = state[n.getAttribute('data-id')];
      n.className = 'mk' + (m ? ' m-' + m : '');
    });
    ER.$$('.mk-pen', ph).forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-pen') === pen); });
  }
  ph.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.mk-pen') : null;
    if (b) { pen = b.getAttribute('data-pen'); ER.sfx.click(); paint(); }
  });
  host.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.mk-pen')) return;
    var t = e.target.closest ? e.target.closest('.mk') : null;
    if (!t || (o.locked && o.locked())) return;
    var id = t.getAttribute('data-id');
    if (state[id] === pen) delete state[id]; else state[id] = pen;
    ER.sfx.paper(); paint();
    if (o.change) o.change(state);
  });
  paint();
  return { state: function () { return state; }, pen: function (p) { pen = p; paint(); }, paint: paint };
};
})();
