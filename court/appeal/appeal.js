/* Under the Lamp - small helpers that every room of the story shares. Loaded after engine.js.
   Nothing in here knows an answer. */
window.AP = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so the sound button switches them) ---------- */
  X.sfx = {
    card: function () { B({ type: 'highpass', f: 1800, dur: 0.08, peak: 0.12, a: 0.01 }); },                     /* a card or a slip on a desk */
    spike: function () { B({ type: 'bandpass', f: 900, q: 3, dur: 0.06, peak: 0.25 }); T({ f: 210, f2: 120, dur: 0.12, peak: 0.12 }); },   /* paper pushed down on a spike */
    pencil: function () { B({ type: 'highpass', f: 3400, dur: 0.22, peak: 0.06, a: 0.04 }); },
    fold: function () { B({ type: 'highpass', f: 2200, f2: 1200, dur: 0.18, peak: 0.08, a: 0.03 }); },             /* a yellow note folded */
    dial: function () { B({ type: 'bandpass', f: 4200, q: 5, dur: 0.02, peak: 0.12 }); },
    hm: function () { T({ type: 'triangle', f: 160, f2: 140, dur: 0.22, peak: 0.07, a: 0.05 }); }                /* a small doubtful sound, for a wrong try */
  };

  /* A door opens: the music answers in the room's own key, as after ER.exit; without music, three plain notes. */
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };
  X.done = function (id) { var st = ER.state(); st.done = st.done || {}; st.done[id] = 1; ER.persist(true); };

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
  X.has = function (id) { return ER.state().clues.some(function (c) { return c.id === id; }); };
  /* a paper already in the notebook, opened on top of a puzzle */
  X.look = function (id, missing) {
    var c = ER.state().clues.filter(function (x) { return x.id === id; })[0];
    var d = c ? ER.el('div', 'doc ' + c.c, ER.gloss(c.h)) : ER.el('div', 'doc typed', '<p>' + missing + '</p>');
    ER.sfx.paper(); ER.open('ov-read', d, null, { top: true });
  };
  X.minutes = function () {
    var st = ER.state(), secs = st.fin && st.fin.secs ? st.fin.secs : (st.secs || 0);
    return Math.max(1, Math.round(secs / 60));
  };
  /* "And two more." */
  X.more = function (n, what) {
    if (!n) return '';
    var w = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'][n] || String(n);
    return ' <em>And ' + w + ' more ' + what + (n === 1 ? '' : 's') + ' to look at again.</em>';
  };
  return X;
})();
