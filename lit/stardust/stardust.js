/* Stardust at Half Past Seven - what every room shares: a few sounds of its own and small helpers.
   Loaded after engine.js. Nothing in here knows an answer: every scene that a lock restores is written out by the room
   that restores it, from what the player put back. */
(function () {
  'use strict';
  var X = window.SD = window.SD || {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  X.sfx = {
    pencil: function () { B({ type: 'highpass', f: 3200, dur: 0.09, peak: 0.05, a: 0.01 }); B({ type: 'highpass', f: 3900, dur: 0.07, peak: 0.04, a: 0.01, when: 0.11 }); },
    gust: function () { B({ type: 'bandpass', f: 280, f2: 900, q: 0.6, dur: 1.5, peak: 0.12, a: 0.5 }); },
    flutter: function () { for (var i = 0; i < 5; i++) B({ type: 'highpass', f: 2500 + i * 240, dur: 0.05, peak: 0.05, a: 0.01, when: i * 0.07 }); },
    whirr: function () { T({ type: 'sawtooth', f: 64, f2: 92, dur: 1.6, peak: 0.025, a: 0.4 }); B({ type: 'lowpass', f: 520, dur: 1.6, peak: 0.04, a: 0.4 }); },
    tick: function () { T({ type: 'triangle', f: 1900, dur: 0.05, peak: 0.05 }); },
    slide: function () { B({ type: 'bandpass', f: 1400, q: 2, dur: 0.12, peak: 0.08 }); T({ f: 160, f2: 110, dur: 0.12, peak: 0.08 }); },
    ting: function () { T({ f: 1320, dur: 0.7, peak: 0.05 }); T({ f: 1980, dur: 0.45, peak: 0.025 }); },
    /* the town clock striking: shown on screen whenever it sounds */
    strike: function (n) { for (var i = 0; i < (n || 7); i++) [1, 2.4, 3.05].forEach(function (m, j) { T({ f: 330 * m, dur: 1.5 / (j + 1), peak: 0.07 / (j + 1), when: i * 1.1 }); }); },
    murmur: function () { B({ type: 'bandpass', f: 420, q: 0.8, dur: 2.4, peak: 0.05, a: 0.8 }); B({ type: 'bandpass', f: 700, q: 1, dur: 2, peak: 0.03, a: 0.7, when: 0.3 }); },
    clap: function () { for (var i = 0; i < 26; i++) B({ type: 'bandpass', f: 1300 + Math.random() * 900, q: 1.4, dur: 0.05, peak: 0.05 + Math.random() * 0.05, a: 0.003, when: i * 0.09 + Math.random() * 0.05 }); }
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
  X.terms = function (list) {
    var G = window.GLOSS || [];
    list.forEach(function (w) { for (var i = 0; i < G.length; i++) if (G[i][0] === w) { ER.addWord(G[i][0], G[i][1]); break; } });
  };
  X.told = function (key) {
    var t = ER.flag(key) || {};
    return { has: function (k) { return !!t[k]; }, set: function (k) { if (t[k]) return false; t[k] = 1; ER.flag(key, t); return true; } };
  };
  X.minutesPlayed = function () {
    var st = ER.state();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((st.secs || 60) / 60));
  };
  /* a page of Sabine's typescript */
  X.page = function (title, body, foot) {
    return '<div class="rh"><span>A YEAR IN THE DARK</span><span>S. QUENNELL &middot; 1992</span></div><h4>' + title + '</h4>' + body +
      (foot ? '<p class="src">' + foot + '</p>' : '');
  };
  /* the text of a clue the player has already filed (a scene restored in an earlier room) */
  X.clue = function (id) {
    var c = ER.state().clues.filter(function (x) { return x.id === id; })[0];
    return c ? c.h : '';
  };
})();
