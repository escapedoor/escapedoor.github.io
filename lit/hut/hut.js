/* The Fourth Draft - what every room shares: a few sounds of its own and small helpers.
   Loaded after engine.js and cast.js. Nothing in here knows an answer, and there is no story text in here:
   every paper is written out in the room where it is found. */
(function () {
  'use strict';
  var X = window.HT = window.HT || {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  X.sfx = {
    pencil: function () { B({ type: 'highpass', f: 3200, dur: 0.09, peak: 0.05, a: 0.01 }); B({ type: 'highpass', f: 3900, dur: 0.07, peak: 0.04, a: 0.01, when: 0.11 }); },
    saw: function () { for (var i = 0; i < 4; i++) B({ type: 'bandpass', f: 2400 + (i % 2) * 700, q: 2, dur: 0.16, peak: 0.07, a: 0.04, when: i * 0.19 }); },
    plane: function () { B({ type: 'highpass', f: 1800, f2: 5200, dur: 0.42, peak: 0.07, a: 0.05 }); },
    stamp: function () { T({ f: 110, f2: 70, dur: 0.12, peak: 0.25 }); B({ type: 'lowpass', f: 700, dur: 0.08, peak: 0.2 }); },
    peg: function () { T({ type: 'triangle', f: 900, f2: 1300, dur: 0.06, peak: 0.08 }); },
    pot: function () { T({ f: 240, f2: 180, dur: 0.14, peak: 0.12 }); B({ type: 'bandpass', f: 600, q: 3, dur: 0.06, peak: 0.08 }); },
    latch: function () { T({ f: 520, f2: 300, dur: 0.08, peak: 0.12 }); B({ type: 'bandpass', f: 2600, q: 4, dur: 0.05, peak: 0.1, when: 0.06 }); },
    dial: function () { B({ type: 'bandpass', f: 4200, q: 5, dur: 0.03, peak: 0.1 }); },
    robin: function () { [0, 0.16, 0.3, 0.52].forEach(function (w, i) { T({ f: 3200 + i * 380, f2: 2600 + i * 300, dur: 0.11, peak: 0.03, a: 0.01, when: w }); }); },
    gate: function () { T({ type: 'sawtooth', f: 330, f2: 210, dur: 0.4, peak: 0.03, a: 0.06 }); T({ f: 160, f2: 120, dur: 0.12, peak: 0.18, when: 0.42 }); },
    match: function () { B({ type: 'highpass', f: 2600, f2: 900, dur: 0.3, peak: 0.12, a: 0.01 }); B({ type: 'lowpass', f: 500, dur: 0.6, peak: 0.06, a: 0.1, when: 0.2 }); }
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
        var l = typeof line === 'function' ? line() : line;
        if (l) ER.say(l);
      });
    });
  };
  X.mine = function (id, title, html, quiet) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'mine', 'Your notes', quiet); };
  /* a small thing noticed in a room that may matter later: it goes into the notebook */
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
  /* shuffle with a fixed seed, so that a reload shows the same order */
  X.mix = function (list, seed) {
    var a = list.slice(), s = seed || 7, i, j, t;
    for (i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; j = Math.floor(s / 233280 * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  /* a person drawn into a <g> of the scene */
  X.put = function (sel, who, more) { var n = ER.$(sel); if (n) n.innerHTML = window.HT.as(who, more); };
})();
