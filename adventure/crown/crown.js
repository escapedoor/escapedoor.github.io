/* Before the Doors Open - what every room of the story shares: the museum's own sounds, the people drawn in the
   scenes, the canonical facts of the night (so that no two documents can disagree), and small helpers.
   Loaded after engine.js. Nothing in here knows an answer to a lock.

   THE NIGHT, ONCE. Opening tomorrow 09:00; the inspector counts the collection at 09:00. Two night guards of
   Dovecourt Security:
     Dermot Amory  (ground floor: Bay, Hall, Long Gallery)  rounds begin 00:15 01:00 01:45 02:30 03:15, 20 min each.
     Cecil Ebden   (upper floor: Studio, Stores, Reading Room) rounds begin 00:30 01:15 02:00 02:45 03:30, 20 min each.
   Between rounds both watch the intruder panel at the front desk.
   Camera 3 sweeps the Long Gallery. It holds on the SERVICE-STAIR DOOR for the minute that begins at every time
     whose minute is 02, 06, 10, 14 ... (two past each four minutes: minute mod 4 === 2). At every other minute the
     door is in the camera's blind arc. (So the door is watched at :02 :06 :10 :14 :18 :22 :26, blind the rest.)
   01:45 a fault on the intruder panel pins Amory to the front desk; from 02:00 Ebden covers BOTH floors, so his
     02:00 round now also passes the stair foot, 02:04 to 02:07.

   LAST TUESDAY, when the crown was moved (the three accounts):
     Cecil Ebden's watch runs about twelve minutes FAST. The panel logged his round at 21:53; he wrote 22:05.
     The crown never left the building. Dominic Crozier lifted it from its case and carried it to the conservation
     studio store. His studio light burned until 22:20; he left by the east door, empty-handed, at 22:20; his bicycle
     stood in the yard until 22:30. The "figure in a dark coat" at the east door was Delia Carmody with a dust-sheet
     over her trolley, going to the bins. Delia left the east door on the latch for Dominic and later said she had
     locked it and seen nobody, to keep the boy out of it. */
window.CR = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  X.ROUNDS = {
    amory: ['00:15', '01:00', '01:45', '02:30', '03:15'],
    ebden: ['00:30', '01:15', '02:00', '02:45', '03:30'],
    len: 20
  };
  /* the minute the stair-door camera rests on the door, in its four-minute cycle */
  X.camWatches = function (min) { return ((min % 4) + 4) % 4 === 2; };
  X.PLAN = ['Loading Bay', 'Security Office', 'Records Room', 'Great Hall', 'Long Gallery', 'Egyptian Room',
    'Service Stair', 'Conservation Studio', 'Stores', 'Front Entrance'];

  /* ---------- the museum's sounds, all synthesised through the engine's switched output ---------- */
  X.sfx = {
    step: function () { [0, 0.34].forEach(function (w, i) { T({ f: 150 - i * 20, f2: 80, dur: 0.1, peak: 0.22, when: w }); B({ type: 'lowpass', f: 600, dur: 0.05, peak: 0.1, when: w }); }); },
    keypad: function () { B({ dur: 0.02, f: 2600, q: 5, peak: 0.1 }); T({ f: 1200, dur: 0.05, peak: 0.08 }); },
    beep: function () { T({ type: 'square', f: 1760, dur: 0.1, peak: 0.08 }); },
    radio: function () { B({ type: 'bandpass', f: 1500, q: 1.2, dur: 0.18, peak: 0.07, a: 0.02 }); B({ type: 'highpass', f: 2800, dur: 0.1, peak: 0.04, when: 0.14 }); },
    latch: function () { T({ f: 150, f2: 70, dur: 0.16, peak: 0.4 }); B({ type: 'lowpass', f: 1400, dur: 0.05, peak: 0.22 }); },
    clink: function () { T({ f: 2400, dur: 0.3, peak: 0.05 }); T({ f: 3600, dur: 0.22, peak: 0.025 }); },
    pen: function () { B({ type: 'bandpass', f: 1700, q: 1, dur: 0.16, peak: 0.05, a: 0.03 }); },
    servo: function () { B({ type: 'bandpass', f: 320, q: 4, dur: 0.5, peak: 0.05, a: 0.1 }); },
    stamp: function () { T({ f: 90, f2: 50, dur: 0.16, peak: 0.5 }); B({ type: 'lowpass', f: 900, dur: 0.05, peak: 0.3 }); },
    glass: function () { try { ER.sfx.glass(); } catch (e) {} }
  };
  /* a soft tick for the dials */
  X.tick = function () { B({ dur: 0.025, f: 4200, q: 6, peak: 0.08 }); };

  /* ---------- small helpers ---------- */
  X.thing = function (sel, word, line, busy) {
    ER.$$(sel).forEach(function (n) {
      n.addEventListener('click', function (e) {
        if (busy && busy()) return;
        if (word) ER.wordAt(e.clientX, e.clientY, word);
        if (line) ER.say(typeof line === 'function' ? line() : line);
      });
    });
  };
  X.mine = function (id, title, html, quiet) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'mine', 'Your own note', quiet); };
  X.words = function (list) {
    var G = window.GLOSS || [];
    list.forEach(function (w) { for (var i = 0; i < G.length; i++) if (G[i][0] === w) { ER.addWord(G[i][0], G[i][1]); break; } });
  };
  X.mins = function () {
    var st = ER.state(), end = Date.now();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((end - (st.t0 || end)) / 60000));
  };
  /* a clock-time from minutes-after-midnight, 24-hour */
  X.hhmm = function (mins) { var h = Math.floor(mins / 60) % 24, m = mins % 60; return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m; };
  X.toMin = function (s) { var p = String(s).split(':'); return (+p[0]) * 60 + (+p[1]); };

  /* a value set with two arrows.  o = {list:[values], start:index, show:fn(value)->text, unit, change} */
  X.count = function (box, o) {
    var i = o.start || 0, n = ER.el('span', 'cnt', '<button type="button" data-d="-1" title="back">&#9664;</button><b></b><button type="button" data-d="1" title="on">&#9654;</button>' + (o.unit ? '<i>' + o.unit + '</i>' : '')),
      cell = n.querySelector('b');
    function draw() { cell.textContent = o.show ? o.show(o.list[i]) : o.list[i]; }
    n.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null; if (!b) return;
      i = Math.max(0, Math.min(o.list.length - 1, i + (+b.getAttribute('data-d')))); X.tick(); draw(); if (o.change) o.change(o.list[i]);
    });
    box.appendChild(n); draw();
    return { node: n, get: function () { return o.list[i]; }, set: function (v) { var j = o.list.indexOf(v); if (j >= 0) { i = j; draw(); } } };
  };

  /* ---------- people in the scenes: a figure of about 300 x s units, feet at (x, y) ----------
     o = {coat, skin, hair, legs, hat:'cap'|'none'|'bun', sit, beard, specs, flip, dress, tie} */
  X.person = function (x, y, s, o) {
    var k = o.skin, c = o.coat, L = o.legs || '#2a2a30', g = '';
    if (o.sit) {
      g += '<path d="M-26 -78h52l6 60h-14l-4 -40h-28l-4 40h-14z" fill="' + L + '"/><path d="M-36 -18h20v10h-24zM16 -18h20l4 10h-24z" fill="#17181c"/>';
      g += '<path d="M-38 -80q-6 -96 38 -104q44 8 38 104z" fill="' + c + '"/>';
    } else {
      if (o.dress) g += '<path d="M-40 -12l10 -110h60l10 110z" fill="' + o.dress + '"/><path d="M-18 -12v14M14 -12v14" stroke="' + k + '" stroke-width="10"/>';
      else g += '<path d="M-22 0v-112h18V0zM4 0v-112h18V0z" fill="' + L + '"/>';
      g += '<path d="M-29 0h26v9h-30zM3 0h26l3 9h-29z" fill="#17181c"/>';
      g += '<path d="M-44 -96q-8 -100 44 -112q52 12 44 112z" fill="' + c + '"/>';
    }
    var top = o.sit ? -184 : -208;
    if (o.tie) g += '<path d="M-5 ' + (top + 14) + 'l-6 40 6 10 6 -10 -6 -40z" fill="' + o.tie + '"/>';
    g += '<path d="M-38 ' + (top + 20) + 'q-22 44 -12 100" stroke="' + c + '" stroke-width="17" fill="none" stroke-linecap="round"/><circle cx="-50" cy="' + (top + 124) + '" r="9.500" fill="' + k + '"/>';
    g += '<path d="M38 ' + (top + 20) + 'q22 44 12 100" stroke="' + c + '" stroke-width="17" fill="none" stroke-linecap="round"/><circle cx="50" cy="' + (top + 124) + '" r="9.500" fill="' + k + '"/>';
    g += '<rect x="-7" y="' + (top - 22) + '" width="14" height="24" fill="' + k + '"/><circle cx="0" cy="' + (top - 42) + '" r="26" fill="' + k + '"/>';
    if (o.hair && o.hat !== 'bun') g += '<path d="M-26 ' + (top - 44) + 'q2 -30 26 -30t26 30q-6 -14 -26 -14t-26 14z" fill="' + o.hair + '"/>';
    if (o.hat === 'bun') g += '<path d="M-26 ' + (top - 46) + 'q2 -28 26 -28t26 28q-6 -12 -26 -12t-26 12z" fill="' + o.hair + '"/><circle cx="0" cy="' + (top - 74) + '" r="13" fill="' + o.hair + '"/>';
    if (o.beard) g += '<path d="M-22 ' + (top - 38) + 'q0 34 22 36q22 -2 22 -36q-8 16 -22 14q-14 2 -22 -14z" fill="' + o.beard + '"/>';
    if (o.specs) g += '<g fill="none" stroke="#1a1a20" stroke-width="2"><circle cx="-9" cy="' + (top - 44) + '" r="6"/><circle cx="9" cy="' + (top - 44) + '" r="6"/><path d="M-3 ' + (top - 44) + 'h6"/></g>';
    else g += '<path d="M-12 ' + (top - 46) + 'h6M6 ' + (top - 46) + 'h6" stroke="#15110c" stroke-width="3" stroke-linecap="round"/>';
    if (o.hat === 'cap') g += '<path d="M-27 ' + (top - 58) + 'q27 -26 54 0z" fill="#20303e"/><path d="M-28 ' + (top - 58) + 'h56v8h-56z" fill="#16222c"/><path d="M-30 ' + (top - 50) + 'q30 8 46 0" stroke="#16222c" stroke-width="5" fill="none"/><path d="M-10 ' + (top - 62) + 'h20v5h-20z" fill="#c9a24a"/>';
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + (o.flip ? -s : s) + ' ' + s + ')">' + g + '</g>';
  };
  return X;
})();
