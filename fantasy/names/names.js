/* A Name That Is True - small helpers that every room of Utter shares. Loaded after engine.js.
   Nothing in here knows an answer: the tiles below carry only their own meanings, which the city's carved lists
   give anyway, and every check is made against the hashed tags of the room. */
window.NM = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so the sound button switches them) ---------- */
  X.sfx = {
    chisel: function () { for (var i = 0; i < 3; i++) { B({ dur: 0.04, f: 3600, q: 4, peak: 0.16, when: i * 0.16 }); T({ f: 900, dur: 0.05, peak: 0.05, when: i * 0.16 }); } },
    tile: function () { B({ dur: 0.03, f: 2200, q: 3, peak: 0.12 }); T({ f: 640, dur: 0.06, peak: 0.05 }); },
    hum: function () { T({ type: 'triangle', f: 220, f2: 330, dur: 0.5, peak: 0.06, a: 0.08 }); },                    /* a thing hears its name */
    wrong: function () { T({ type: 'triangle', f: 196, f2: 150, dur: 0.35, peak: 0.08, a: 0.04 }); },
    stone: function () { T({ f: 90, f2: 55, dur: 0.5, peak: 0.4 }); B({ type: 'lowpass', f: 500, dur: 0.4, peak: 0.25, a: 0.02 }); },
    chain: function () { for (var i = 0; i < 7; i++) B({ dur: 0.05, f: 5200 - i * 200, q: 3, peak: 0.08, when: i * 0.09 }); },
    lamp: function () { T({ type: 'sine', f: 660, f2: 990, dur: 0.4, peak: 0.05, a: 0.05 }); },
    snore: function () { B({ type: 'lowpass', f: 300, f2: 180, dur: 0.9, peak: 0.07, a: 0.35 }); },
    splash: function () { B({ type: 'bandpass', f: 1400, f2: 500, q: 0.8, dur: 0.5, peak: 0.12, a: 0.02 }); },
    bells: function () { [0, 0.55, 1.1].forEach(function (w, i) { [1, 2.01, 2.76].forEach(function (m, j) { T({ f: [392, 349.2, 293.7][i] * m, dur: 1.6 / (j + 1), peak: 0.07 / (j + 1), when: w }); }); }); },
    rub: function () { B({ type: 'highpass', f: 1800, dur: 0.35, peak: 0.07, a: 0.08 }); }
  };

  /* A door opens. The music answers in the room's own key; without music, three plain notes. */
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };

  /* a thing in the scene that has a name and something to say */
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
  X.learn = function (list) {
    var G = window.GLOSS || [];
    list.forEach(function (w) {
      for (var i = 0; i < G.length; i++) if (G[i][0].toLowerCase() === w.toLowerCase()) { ER.addWord(G[i][0], G[i][1]); return; }
    });
  };
  X.bump = function (flag) { var n = (ER.flag(flag) || 0) + 1; ER.flag(flag, n); return n; };

  /* Every name that is called and does not answer is counted. Nobody minds; the last page tells you how many. */
  X.miss = function () { X.sfx.wrong(); return X.bump('misses'); };
  X.misses = function () { return ER.flag('misses') || 0; };

  /* minutes played, for the last page */
  X.minutes = function () {
    var st = ER.state(), secs = st.fin && st.fin.secs ? st.fin.secs : (st.secs || 0);
    return Math.max(1, Math.round(secs / 60));
  };

  /* a name tile: kind is 'pre', 'root' or 'suf'; text as it is cut; mean is what the carved lists say it means */
  X.tile = function (id, kind, text, mean) {
    var b = ER.el('button', 'ntile dnd-item ' + kind, text + (mean ? '<small>' + mean + '</small>' : ''));
    b.type = 'button'; b.setAttribute('data-t', id); b.setAttribute('data-k', kind);
    return b;
  };
  return X;
})();
