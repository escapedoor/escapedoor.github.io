/* Everything Is Somewhere - what every room shares: a few sounds of its own and small helpers.
   Loaded after engine.js and cast.js. Nothing in here knows an answer, and there is no story text in here:
   every paper is written out in the room where it is found. */
(function () {
  'use strict';
  var X = window.NY = window.NY || {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  X.sfx = {
    pencil: function () { B({ type: 'highpass', f: 3200, dur: 0.09, peak: 0.05, a: 0.01 }); B({ type: 'highpass', f: 3900, dur: 0.07, peak: 0.04, a: 0.01, when: 0.11 }); },
    tear: function () { B({ type: 'highpass', f: 1800, f2: 4200, dur: 0.32, peak: 0.08, a: 0.02 }); },
    mew: function () { T({ type: 'triangle', f: 720, f2: 980, dur: 0.18, peak: 0.06, a: 0.03 }); T({ type: 'triangle', f: 980, f2: 560, dur: 0.32, peak: 0.06, a: 0.02, when: 0.17 }); },
    whistle: function () { T({ f: 1480, f2: 1560, dur: 0.5, peak: 0.05, a: 0.05 }); B({ type: 'bandpass', f: 1500, q: 6, dur: 0.5, peak: 0.04, a: 0.05 }); },
    thread: function () { T({ type: 'triangle', f: 260, f2: 300, dur: 0.12, peak: 0.07 }); },
    stamp: function () { T({ f: 110, f2: 70, dur: 0.12, peak: 0.25 }); B({ type: 'lowpass', f: 700, dur: 0.08, peak: 0.2 }); },
    hooves: function (n) { for (var i = 0; i < (n || 8); i++) B({ type: 'bandpass', f: 700 + (i % 2) * 180, q: 3, dur: 0.06, peak: 0.12, when: i * 0.26 + (i % 2) * 0.05 }); },
    knock: function () { [0, 0.22].forEach(function (w) { T({ f: 140, f2: 90, dur: 0.1, peak: 0.25, when: w }); B({ type: 'lowpass', f: 900, dur: 0.05, peak: 0.18, when: w }); }); },
    sob: function () { T({ type: 'triangle', f: 520, f2: 380, dur: 0.3, peak: 0.04, a: 0.04 }); T({ type: 'triangle', f: 500, f2: 360, dur: 0.3, peak: 0.035, a: 0.04, when: 0.4 }); }
  };
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };
  /* a thing in the scene: a click puts its name in the notebook and/or says a line */
  X.thing = function (sel, word, line, busy) {
    ER.$$(sel).forEach(function (n) {
      n.addEventListener('click', function (e) {
        if (busy && busy()) return;
        if (word) ER.wordAt(e.clientX, e.clientY, word);
        if (line) ER.say(typeof line === 'function' ? line() : line);
      });
    });
  };
  X.mine = function (id, title, html, quiet) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'mine', 'Your notes', quiet); };
  /* a small thing noticed in a room that may matter later: it goes into the notebook as a seed */
  X.seed = function (id, title, html) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'seed', 'Noticed'); };
  X.terms = function (list) {
    var G = window.GLOSS || [];
    list.forEach(function (w) { for (var i = 0; i < G.length; i++) if (G[i][0] === w) { ER.addWord(G[i][0], G[i][1]); break; } });
  };
  X.told = function (key) {
    var t = ER.flag(key) || {};
    return { has: function (k) { return !!t[k]; }, set: function (k) { if (t[k]) return false; t[k] = 1; ER.flag(key, t); return true; } };
  };
  X.has = function (id) { return ER.state().clues.some(function (c) { return c.id === id; }); };
  X.minutesPlayed = function () {
    var st = ER.state();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((st.secs || 60) / 60));
  };
  /* a register page: rows of [date, time, entry] in Miss Inkster's ruled book */
  X.register = function (title, rows) {
    var s = '<div class="rg-head"><span>LOST &amp; FOUND</span><span>C. I.</span></div><h4>' + title + '</h4><table><tr><th>Date</th><th>Time</th><th>Entry</th></tr>';
    rows.forEach(function (r) { s += '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>'; });
    return s + '</table>';
  };
  /* shuffle with a fixed seed, so that a reload shows the same order */
  X.mix = function (list, seed) {
    var a = list.slice(), s = seed || 7, i, j, t;
    for (i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; j = Math.floor(s / 233280 * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
})();
