/* Read It Back, part B (mission control) - what every room of this part shares.
   OP.card(...)    the card in the top left corner that says what to ask or tell the partner first
   OP.thing(...)   a thing in the scene that answers a click with a line (and a name tag)
   OP.work(...)    a piece of work on the desk, in an overlay with a message line and buttons
   The checklist, the manual pages, the radio rules, the whiteboard, the two walk reports and Flight's face live here,
   so that every room shows the same ones. */
window.OP = (function () {
  'use strict';
  var D = document, cardEl = null;

  function card(parts) {
    if (!cardEl) {
      cardEl = ER.el('div', 'pcard');
      D.body.appendChild(cardEl);
      cardEl.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('.w')) return;
        cardEl.classList.toggle('min');
        cardEl.querySelector('.fold').textContent = cardEl.classList.contains('min') ? 'open' : 'fold';
      });
    }
    var s = '<span class="fold">fold</span>';
    parts.forEach(function (p) { s += '<h6>' + p[0] + '</h6>' + p[1].map(function (l) { return '<p>' + l + '</p>'; }).join(''); });
    var was = cardEl.innerHTML;
    cardEl.innerHTML = ER.gloss(s);
    cardEl.classList.remove('min');
    if (was && was !== cardEl.innerHTML) { cardEl.classList.remove('ping'); void cardEl.offsetWidth; cardEl.classList.add('ping'); }
  }
  function thing(sel, word, text, busy) {
    var n = ER.$(sel); if (!n) return;
    n.addEventListener('click', function (e) {
      if (busy && busy()) return;
      var t = typeof text === 'function' ? text() : text;
      if (word) ER.wordAt(e.clientX, e.clientY, word);
      if (t) ER.say(t);
    });
  }
  /* a piece of work: o = {cls, html, btn: [{id, label, fn}], msg, onClose}; returns {box, msg(t)} */
  function work(o) {
    var box = ER.el('div', 'bx ' + (o.cls || ''));
    box.innerHTML = o.html + '<div class="bx-foot"><p class="pmsg"></p></div>';
    var foot = box.querySelector('.bx-foot'), api = { box: box, msg: function (t) { box.querySelector('.pmsg').innerHTML = ER.gloss(t || ''); } };
    (o.btn || []).forEach(function (b) {
      var e = ER.el('button', 'btn', b.label); e.type = 'button'; if (b.id) e.id = b.id;
      e.addEventListener('click', function () { b.fn(api); }); foot.appendChild(e);
    });
    if (o.msg) api.msg(o.msg);
    ER.open('ov-lock', box, o.onClose);
    return api;
  }

  /* ---------- the radio rules, pinned to every console ---------- */
  var ABC = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu'];
  var RULES = '<h4>Ops Room · how we talk to the crew</h4>' +
    '<p>1. Call, then say who you are: &ldquo;EV One, Control.&rdquo; The crew answer: &ldquo;Control, EV One. Go ahead.&rdquo;<br>' +
    '2. One instruction at a time, in order. Use the words of the checklist: first, then, until, before, once.<br>' +
    '3. Every number digit by digit: &ldquo;one five&rdquo;, never &ldquo;fifteen&rdquo;. In a helmet, fifteen and fifty sound the same.<br>' +
    '4. Ask for a read-back. If the read-back is wrong, say &ldquo;Negative&rdquo; and give it again.<br>' +
    '5. &ldquo;Say again&rdquo; = please repeat. &ldquo;Copy&rdquo; = I heard and I understand. &ldquo;Stand by&rdquo; = wait.<br>' +
    '6. The crew can see what you cannot. If they say the hardware does not look like the drawing, believe the hardware.</p>' +
    '<div class="abc">' + ABC.map(function (w) { return '<span><b>' + w.charAt(0) + '</b> ' + w + '</span>'; }).join('') + '</div>';

  /* ---------- I. the egress checklist (printed with step 2 in the wrong place) and the hatch drawing ---------- */
  var EGRESS = '<h4>Vesper Station · Checklist 2-1 · Egress · Rev F</h4>' +
    '<p class="sub">Egress: going out of the airlock. Read each step to EV One and wait for the read-back. Do the steps in this order.</p>' +
    '<ol class="steps">' +
    '<li><b>SUIT CHECK.</b> EV One reads you the three suit numbers. Check them against the limits at the bottom of this page. If all three are inside the limits, say GO.</li>' +
    '<li><b>HATCH.</b> EV One turns the handle of the outer hatch and opens it. The hatch opens inwards, towards EV One.</li>' +
    '<li><b>DEPRESS.</b> EV One opens the DEPRESS valve and leaves it open until the gauge reads zero.</li>' +
    '<li><b>SAFETY TETHER.</b> EV One hooks the safety tether to the TETHER RING in the hatch frame. The ring can only be reached once the hatch is open.</li>' +
    '<li><b>GO OUT.</b> Once the safety tether is hooked, EV One unclips the waist tether from the airlock wall and goes out, hands first.</li></ol>' +
    '<p class="lim"><b>LIMITS FOR THE SUIT CHECK</b><br>Suit pressure: 29.0 to 31.0 kPa &nbsp;·&nbsp; Oxygen: at least 85 % &nbsp;·&nbsp; Battery: at least 50 %</p>';
  var HATCH = '<h4>Airlock manual · page 2-4 · the hatch panel</h4>' +
    '<p class="sub">Drawn as EV One sees it, facing the outer hatch. (The labels on the real panel came off years ago. This drawing is the only place the names are written.)</p>' +
    '<svg viewBox="0 0 620 330" xmlns="http://www.w3.org/2000/svg"><rect width="620" height="330" fill="#f3f1ea"/>' +
    '<rect x="30" y="36" width="190" height="230" rx="10" fill="none" stroke="#2a3644" stroke-width="2.5"/>' +
    '<g transform="translate(78 96)"><path d="M-26 0h52M0 0v40" stroke="#2a3644" stroke-width="12" stroke-linecap="round"/><path d="M-26 0h52" stroke="#e8c33a" stroke-width="12" stroke-dasharray="7 7" stroke-linecap="butt"/></g>' +
    '<g transform="translate(172 106)"><circle r="24" fill="none" stroke="#2a3644" stroke-width="3"/><g stroke="#2a3644" stroke-width="2">' + [0, 30, 60, 90, 120, 150].map(function (a) { return '<path d="M0 -24v8" transform="rotate(' + a + ')"/><path d="M0 24v-8" transform="rotate(' + a + ')"/>'; }).join('') + '</g></g>' +
    '<g transform="translate(125 210)"><rect x="-15" y="-15" width="30" height="30" fill="none" stroke="#2a3644" stroke-width="3"/><path d="M-22 -22h44v10" fill="none" stroke="#2a3644" stroke-width="2" stroke-dasharray="4 3"/></g>' +
    '<circle cx="430" cy="160" r="120" fill="none" stroke="#2a3644" stroke-width="3"/><circle cx="430" cy="160" r="98" fill="none" stroke="#2a3644" stroke-width="1.5" stroke-dasharray="6 5"/>' +
    '<path d="M296 150q-14 0 -14 14t14 14" fill="none" stroke="#2a3644" stroke-width="5"/><rect x="270" y="176" width="16" height="24" fill="#e8c33a" stroke="#2a3644" stroke-width="1.5"/>' +
    '<circle cx="572" cy="164" r="13" fill="none" stroke="#2a3644" stroke-width="5"/>' +
    '<g font-family="Space Mono,monospace" font-size="12" fill="#2a3644"><text x="20" y="22">PANEL (left of the hatch)</text><text x="372" y="22">OUTER HATCH (frame)</text></g></svg>' +
    '<table class="names"><tr><td><b>DEPRESS VALVE</b></td><td>A T-shaped handle, striped black and yellow. Top left of the panel. Lets the air out of the airlock.</td></tr>' +
    '<tr><td><b>REPRESS VALVE</b></td><td>A round knob with ridges round its edge. Top right of the panel. Lets air back IN. Not today.</td></tr>' +
    '<tr><td><b>EMERGENCY VENT</b></td><td>A small square knob under a cap, low down on the panel. Emergencies only.</td></tr>' +
    '<tr><td><b>TETHER RING</b></td><td>The D-shaped ring with a yellow tag, on the left side of the hatch frame.</td></tr>' +
    '<tr><td><b>BAG RING</b></td><td>The round ring on the right side of the hatch frame. For tool bags only: never for a tether.</td></tr></table>';

  /* ---------- II. the route along the truss ---------- */
  var ROUTE = '<h4>Antenna Mast M3-B · Rev D · page 3-12</h4><h3>Translation path 3: airlock to mast</h3>' +
    '<p class="sub">A translation path is the way a spacewalker moves along the outside of the station, hand over hand. The handrails are yellow, and each one has a number. Use only the handrails named here, in this order.</p>' +
    '<ol class="steps"><li>From the hatch, go up onto the TOP of the truss, to handrail 13.</li>' +
    '<li>Go along the top, hand over hand, until you reach handrail 15. It has a blue cap. Do not go past 15: just after it, the camera boom crosses the top of the truss.</li>' +
    '<li>At 15, clip your waist tether to the handrail BEFORE you unclip it from the last one. Never be unclipped.</li>' +
    '<li>From 15, go straight down the front of the truss to handrail 33, and then on down to handrail 52, on the bottom edge.</li>' +
    '<li>Do not touch the radiator (the big white panel on the front of the truss, beyond 33). Do not use handrails 50 and 51: they carry the cooling pipe.</li>' +
    '<li>Go along the bottom edge, hand over hand, until you reach the last handrail, 55. Then go up to the foot of the mast.</li></ol>' +
    '<p class="note">Your safety tether reels out behind you all the way. It is 26 metres long; the mast is 22 metres from the hatch.</p>';

  /* ---------- III. the panel at the foot of the mast ---------- */
  function boltSvg(x, y, kind) {
    var s = '<g transform="translate(' + x + ' ' + y + ')">';
    if (kind === 'sq') s += '<rect x="-17" y="-17" width="34" height="34" fill="#fff" stroke="#2a3644" stroke-width="3"/>';
    else {
      if (kind === 'wash') s += '<circle r="27" fill="#fff" stroke="#2a3644" stroke-width="2.5"/>';
      s += '<polygon points="20,0 10,17.3 -10,17.3 -20,0 -10,-17.3 10,-17.3" fill="#fff" stroke="#2a3644" stroke-width="3"/>';
      if (kind === 'notch') s += '<path d="M-5 -17.3l5 9 5 -9z" fill="#2a3644"/>';
    }
    return s + '</g>';
  }
  var PANEL = '<h4>Antenna Mast M3-B · Rev D · page 3-18</h4><h3>Panel 4: opening it</h3>' +
    '<svg viewBox="0 0 620 360" xmlns="http://www.w3.org/2000/svg"><rect width="620" height="360" fill="#f3f1ea"/><rect x="120" y="40" width="380" height="280" fill="none" stroke="#2a3644" stroke-width="4"/>' +
    '<path d="M500 60v240" stroke="#2a3644" stroke-width="2" stroke-dasharray="10 6"/><text x="560" y="186" font-family="Space Mono,monospace" font-size="13" fill="#2a3644" text-anchor="middle">HINGE</text>' +
    '<text x="310" y="170" font-family="Stardos Stencil,serif" font-weight="700" font-size="30" fill="#2a3644" text-anchor="middle">PANEL 4</text><path d="M310 196l-14 22h28z" fill="#2a3644"/><text x="310" y="242" font-family="Stardos Stencil,serif" font-size="18" fill="#2a3644" text-anchor="middle">UP</text>' +
    boltSvg(180, 92, 'hex') + boltSvg(310, 92, 'notch') + boltSvg(440, 92, 'sq') + boltSvg(180, 270, 'sq') + boltSvg(310, 270, 'hex') + boltSvg(440, 270, 'wash') +
    '<g font-family="Space Mono,monospace" font-weight="700" font-size="15" fill="#c2421b" text-anchor="middle"><text x="180" y="138">B1</text><text x="310" y="138">B2</text><text x="440" y="138">B3</text><text x="180" y="316">B4</text><text x="310" y="316">B5</text><text x="440" y="316">B6</text></g>' +
    '<text x="60" y="60" font-family="Space Mono,monospace" font-size="12" fill="#2a3644">to the dish &#8593;</text></svg>' +
    '<p>The drawing shows the panel the right way up: UP is towards the dish. Six bolts. B1 and B5 are plain hexagonal bolts; B2 is hexagonal with a notch at the top of its head; B3 and B4 are square; B6 is hexagonal, with a washer under it.</p>' +
    '<p><b>To open:</b> undo the four bolts B1, B2, B4 and B5, fifteen turns each, anticlockwise. They stay in the panel. <b>Do not undo B3 or B6:</b> they hold the hinge, which runs down the right-hand edge of the panel. Then swing the panel open.</p>' +
    '<p><b>Torque stripes.</b> Every bolt has a stripe of yellow paint across its head and onto the panel. If a stripe is broken, that bolt has turned since it was fitted: report it to Control, by its number on this drawing.</p>';

  /* ---------- IV. the cable bracket (this page is out of date: see the walk report of 14 March 2024) ---------- */
  var BRACKET = '<h4>Antenna Mast M3-B · Rev D · page 3-21</h4><h3>The cable bracket</h3>' +
    '<svg viewBox="0 0 620 300" xmlns="http://www.w3.org/2000/svg"><rect width="620" height="300" fill="#f3f1ea"/><rect x="170" y="30" width="280" height="240" rx="12" fill="none" stroke="#2a3644" stroke-width="4"/>' +
    [[240, 100, 'J1'], [380, 100, 'J2'], [240, 210, 'J3'], [380, 210, 'J4']].map(function (j) { return '<circle cx="' + j[0] + '" cy="' + j[1] + '" r="36" fill="#fff" stroke="#2a3644" stroke-width="3"/><circle cx="' + j[0] + '" cy="' + j[1] + '" r="14" fill="none" stroke="#2a3644" stroke-width="2"/><text x="' + j[0] + '" y="' + (j[1] + 6) + '" font-family="Space Mono,monospace" font-weight="700" font-size="16" fill="#c2421b" text-anchor="middle">' + j[2] + '</text>'; }).join('') +
    '<path d="M540 140l-12 20h24z" fill="#2a3644"/><text x="540" y="182" font-family="Stardos Stencil,serif" font-size="16" fill="#2a3644" text-anchor="middle">UP</text></svg>' +
    '<p>Drawn the right way up (UP is towards the dish). Four sockets. Each plug goes into its own socket only.</p>' +
    '<table class="names"><tr><td><b>J1</b> top left</td><td>POWER. The thick cable with a red band.</td></tr>' +
    '<tr><td><b>J2</b> top right</td><td>DATA. The thin cable with two blue stripes.</td></tr>' +
    '<tr><td><b>J3</b> bottom left</td><td>MOTOR. The grey cable, with a notch in its plug.</td></tr>' +
    '<tr><td><b>J4</b> bottom right</td><td>HEATER. The thin white cable.</td></tr></table>' +
    '<p class="note">Printed in 2021.</p>';

  /* ---------- the whiteboard of pass times ---------- */
  var BOARD = '<h4>The whiteboard · today · all times GMT</h4>' +
    '<p><b>ONE ORBIT = 92 min</b> = about 56 min of DAY + 36 min of NIGHT</p>' +
    '<p>Sunrise 13:46 &nbsp;·&nbsp; Sunset 14:42 &nbsp;·&nbsp; Sunrise 15:18 &nbsp;·&nbsp; Sunset 16:14</p>' +
    '<p><b>YARNSIDE PASSES</b> (the big ground dish)<br>15:20 to 15:28 &nbsp;high, 8 min &nbsp;&larr; TEST THE DISH ON THIS ONE<br>16:57 to 17:03 &nbsp;low, 6 min: too short to test<br>next: 03:10 tomorrow</p>' +
    '<p><b>PLAN</b> &nbsp;Hatch open 13:55 · At the mast 14:15 · Panel open by 14:30 · New box in before sunset · Dish test 15:20</p>';

  /* ---------- the two walk reports that the records terminal can find ---------- */
  var REPORTS = {
    '2024-03-04': '<h4>Vesper Station · walk report · EVA 7</h4><p class="sub">4 March 2024 &nbsp;·&nbsp; EV One: Marit Solberg &nbsp;·&nbsp; EV Two: Nils Overgaard &nbsp;·&nbsp; 6 hours 10 minutes</p>' +
      '<p>We went out to the camera boom. The cover on the heater cable, where it runs past the camera, was cracked by the cold. I fitted a new cover. Nils took photographs of the dish.</p>' +
      '<p>We did not open Panel 4. Nothing at the cable bracket was touched on this walk.</p><p class="hand">M.S.</p>',
    '2024-03-14': '<h4>Vesper Station · walk report · EVA 8</h4><p class="sub">14 March 2024 &nbsp;·&nbsp; EV One: Marit Solberg &nbsp;·&nbsp; EV Two: Nils Overgaard &nbsp;·&nbsp; 5 hours 45 minutes</p>' +
      '<p>At the foot of the mast I opened Panel 4 and found the MOTOR cable rubbed through, where it bends round the mast. I fitted a new motor cable from the spares.</p>' +
      '<p><b>The new motor cable is BLACK, with one WHITE stripe.</b> Its plug goes into J3, the same socket as the old one. The old grey cable is cut, with a red cap on its end, and tied back beside the bracket: there was no room to take it out.</p>' +
      '<p>I have put a tag on the new cable. PLEASE CHANGE PAGE 3-21 OF THE MAST MANUAL.</p><p class="hand">M.S.</p>' +
      '<p class="hand pencil">Page 3-21 changed? &nbsp;Not yet. &nbsp;T.W., May 2024</p>'
  };

  /* ---------- Flight ---------- */
  var FACE = {
    thandi: '<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="320" fill="#162231"/><rect x="0" y="0" width="240" height="60" fill="#1d3550"/><path d="M0 40h240" stroke="#3fa9d8" stroke-width="2" opacity=".5"/>' +
      '<path d="M16 320q4 -112 104 -118q100 6 104 118z" fill="#3b4250"/><path d="M90 208l30 34 30 -34" fill="#e7e2d6"/><path d="M62 222l-10 98M178 222l10 98" stroke="#2a3038" stroke-width="10"/>' +
      '<rect x="102" y="176" width="36" height="36" fill="#7a4b34"/><ellipse cx="120" cy="128" rx="52" ry="60" fill="#8a5a3e"/>' +
      '<path d="M62 132q-10 -84 58 -86q68 2 58 86q-6 -50 -58 -52q-52 2 -58 52z" fill="#2a2420"/><path d="M60 118q-12 30 4 58M180 118q12 30 -4 58" stroke="#2a2420" stroke-width="10" fill="none" stroke-linecap="round"/>' +
      '<path d="M88 116q12 -6 24 0M128 116q12 -6 24 0" stroke="#2a2420" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="100" cy="128" r="5" fill="#1a1410"/><circle cx="140" cy="128" r="5" fill="#1a1410"/>' +
      '<g fill="none" stroke="#c8ccd2" stroke-width="2.5"><circle cx="100" cy="128" r="14"/><circle cx="140" cy="128" r="14"/><path d="M114 128h12"/></g>' +
      '<path d="M106 162q14 6 28 0" stroke="#4a2418" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M40 112q80 -60 160 0" stroke="#30363c" stroke-width="7" fill="none"/><rect x="34" y="112" width="16" height="32" rx="5" fill="#30363c"/><path d="M42 144q-4 30 30 38" stroke="#30363c" stroke-width="4" fill="none"/><circle cx="74" cy="182" r="5" fill="#30363c"/></svg>'
  };

  var sfx = {
    keys: function () { for (var i = 0; i < 4; i++) ER.burst({ dur: 0.02, f: 2400 + i * 300, q: 3, peak: 0.07, when: i * 0.07 }); },
    page: function () { ER.burst({ type: 'highpass', f: 2600, dur: 0.18, peak: 0.08, a: 0.03 }); },
    pen: function () { ER.burst({ type: 'bandpass', f: 3600, q: 2, dur: 0.25, peak: 0.05, a: 0.02 }); ER.burst({ type: 'bandpass', f: 3200, q: 2, dur: 0.2, peak: 0.04, a: 0.02, when: 0.3 }); },
    radio: function () { ER.burst({ type: 'bandpass', f: 1800, q: 0.6, dur: 0.12, peak: 0.06 }); }
  };
  function mins() { var s = ER.state(); return Math.max(1, Math.round(((s.fin ? s.fin.secs : s.secs) || 0) / 60)); }

  function read(id, title, html, cls, kind, done) { ER.read({ html: html, cls: cls || 'man', clue: { id: id, title: title, kind: kind || 'Manual page' }, done: done }); }

  return {
    card: card, thing: thing, work: work, FACE: FACE, sfx: sfx, mins: mins,
    RULES: RULES, EGRESS: EGRESS, HATCH: HATCH, ROUTE: ROUTE, PANEL: PANEL, BRACKET: BRACKET, BOARD: BOARD, REPORTS: REPORTS,
    rules: function () { read('rules', 'How we talk to the crew', RULES, 'rules', 'On the console'); },
    egress: function (done) { read('egress', 'Checklist 2-1: Egress (Rev F)', EGRESS, 'chk', 'Checklist', done); },
    hatch: function (done) { read('hatch', 'The hatch panel (airlock manual, page 2-4)', HATCH, 'man', 'Manual page', done); },
    route: function (done) { read('route', 'Translation path 3 (page 3-12)', ROUTE, 'man', 'Manual page', done); },
    panel: function (done) { read('panel', 'Panel 4 (page 3-18)', PANEL, 'man', 'Manual page', done); },
    bracket: function (done) { read('bracket', 'The cable bracket (page 3-21)', BRACKET, 'man', 'Manual page', done); },
    board: function (done) { read('board', 'The whiteboard of pass times', BOARD, 'board', 'On the wall', done); }
  };
})();
