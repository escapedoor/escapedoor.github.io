/* In Our Joint Presence - small helpers that every room of the story shares. Loaded after engine.js.
   Nothing in here knows an answer. */
window.WL = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so the sound button switches them).
     The typewriter's strike and its bell are story sounds: the music of every room keeps clear of both. ---------- */
  X.sfx = {
    card: function () { B({ type: 'highpass', f: 1800, dur: 0.08, peak: 0.12, a: 0.01 }); },                    /* a slip of paper on a desk */
    flag: function () { B({ type: 'highpass', f: 2600, f2: 4200, dur: 0.1, peak: 0.08, a: 0.02 }); },            /* a sticky flag pressed down */
    stamp: function () { T({ f: 110, f2: 70, dur: 0.16, peak: 0.32 }); B({ type: 'lowpass', f: 700, dur: 0.09, peak: 0.25 }); },   /* a rubber stamp */
    key: function () { B({ type: 'bandpass', f: 2400, q: 2, dur: 0.035, peak: 0.22 }); T({ f: 190, dur: 0.04, peak: 0.08 }); },     /* one typebar striking */
    ret: function () { B({ type: 'highpass', f: 1500, f2: 3000, dur: 0.32, peak: 0.08, a: 0.06 }); T({ f: 2350, dur: 0.6, peak: 0.05, when: 0.34 }); },   /* the carriage, and its little bell */
    pen: function () { B({ type: 'highpass', f: 3200, dur: 0.26, peak: 0.07, a: 0.05 }); },
    hm: function () { T({ type: 'triangle', f: 160, f2: 140, dur: 0.22, peak: 0.07, a: 0.05 }); },               /* a small doubtful sound, for a wrong try */
    shop: function () { T({ f: 1320, dur: 0.5, peak: 0.05 }); T({ f: 990, dur: 0.6, peak: 0.04, when: 0.16 }); }    /* the bell over the post office door */
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
  X.look = function (id, missing) {
    var c = ER.state().clues.filter(function (x) { return x.id === id; })[0];
    var d = c ? ER.el('div', 'doc ' + c.c, ER.gloss(c.h)) : ER.el('div', 'doc typed', '<p>' + missing + '</p>');
    ER.sfx.paper(); ER.open('ov-read', d, null, { top: true });
  };
  X.minutes = function () {
    var st = ER.state(), secs = st.fin && st.fin.secs ? st.fin.secs : (st.secs || 0);
    return Math.max(1, Math.round(secs / 60));
  };

  /* ---------- the Vellacott's faults ----------
     A page typed on Mervyn Wedlake's machine, as it was at the time: f.R = the capital R has lost its foot (a chipped slug),
     f.e = the small e and the capital E sit high (one bent typebar carries both). */
  X.typed = function (text, f) {
    f = f || {};
    return String(text).replace(/R|e|E/g, function (c) {
      if (c === 'R') return f.R ? '<span class="fR">R</span>' : c;
      return f.e ? '<span class="fe">' + c + '</span>' : c;
    });
  };

  /* ---------- signatures, drawn ----------
     One hand: "M. A. Wedlake". A real signature is never twice the same, so each kind gets its own small differences;
     'shaky' adds a tremor. Two signatures drawn from the same seed lie exactly on top of each other. */
  var STROKES = [
    [[10, 62], [16, 20], [26, 56], [36, 18], [43, 62]], [[49, 60], [50, 61]],
    [[58, 62], [68, 22], [79, 62]], [[62, 46], [76, 45]], [[85, 60], [86, 61]],
    [[96, 22], [104, 62], [114, 32], [124, 62], [134, 22], [140, 50], [150, 45], [146, 38], [141, 52], [152, 59], [160, 40], [166, 10], [170, 58],
      [178, 46], [187, 57], [194, 44], [190, 40], [186, 52], [198, 59], [204, 12], [208, 58], [214, 42], [223, 36], [216, 50], [228, 58], [236, 46],
      [230, 40], [226, 52], [246, 58]],
    [[38, 72], [150, 76], [252, 66]]];
  function rnd(seed) { var s = seed % 2147483647; if (s <= 0) s += 2147483646; return function () { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; }; }
  X.sigPath = function (seed, o) {
    o = o || {};
    var r = rnd(seed), sl = (r() - 0.5) * (o.slant || 0.12), sc = 1 + (r() - 0.5) * (o.scale || 0.08), d = '';
    STROKES.forEach(function (st) {
      var pts = st.map(function (p) {
        var x = p[0] + (r() - 0.5) * (o.jit || 3), y = p[1] + (r() - 0.5) * (o.jit || 3);
        return [130 + (x - 130) * sc + (y - 40) * sl, 40 + (y - 40) * sc];
      });
      if (o.shake) {
        var out = [pts[0]], i, k;
        for (i = 1; i < pts.length; i++) for (k = 1; k <= 3; k++) {
          var t = k / 3; out.push([pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t + (r() - 0.5) * o.shake, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t + (r() - 0.5) * o.shake]);
        }
        pts = out;
      }
      d += 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
      for (var j = 1; j < pts.length - 1; j++) {
        var mx = (pts[j][0] + pts[j + 1][0]) / 2, my = (pts[j][1] + pts[j + 1][1]) / 2;
        d += 'Q' + pts[j][0].toFixed(1) + ' ' + pts[j][1].toFixed(1) + ' ' + mx.toFixed(1) + ' ' + my.toFixed(1);
      }
      var L = pts[pts.length - 1]; d += 'L' + L[0].toFixed(1) + ' ' + L[1].toFixed(1);
    });
    return d;
  };
  var SIGS = { y2008: [4021, {}], y2019: [913, { shake: 7, slant: 0.2, jit: 4 }], y2025: [7177, { jit: 3.5, scale: 0.14 }], letter: [4021, {}] };
  X.sig = function (kind, ink, w) {
    var k = SIGS[kind] || SIGS.y2008;
    return '<svg class="sig" viewBox="0 0 260 84" width="' + (w || 190) + '" height="' + Math.round((w || 190) * 84 / 260) + '"><path d="' + X.sigPath(k[0], k[1]) + '" fill="none" stroke="' + (ink || '#1d2a52') + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  };
  return X;
})();
