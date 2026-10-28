/* Till the Lights Go Up - what every room of the story shares: the small sounds of an old picture house, a few
   helpers, the one living person drawn as a standing figure, and the tune. Loaded after engine.js. Nothing in here
   knows an answer. */
window.PH = (function () {
  'use strict';
  var X = {};
  function T(o) { try { ER.tone(o); } catch (e) {} }
  function B(o) { try { ER.burst(o); } catch (e) {} }

  /* ---------- sounds (through the engine, so that the sound button switches them) ---------- */
  X.sfx = {
    seat: function () { B({ type: 'lowpass', f: 900, dur: 0.07, peak: 0.3 }); T({ f: 150, f2: 90, dur: 0.12, peak: 0.16, when: 0.02 }); },
    card: function () { B({ type: 'lowpass', f: 1500, dur: 0.06, peak: 0.18 }); },
    strip: function () { B({ type: 'highpass', f: 2600, dur: 0.08, peak: 0.08 }); T({ f: 2400, dur: 0.05, peak: 0.02 }); },
    splice: function () { B({ dur: 0.02, f: 3200, q: 3, peak: 0.22 }); B({ dur: 0.05, f: 900, q: 2, peak: 0.2, when: 0.09 }); },
    dial: function () { B({ dur: 0.02, f: 2100, q: 5, peak: 0.15 }); T({ f: 330, f2: 250, dur: 0.04, peak: 0.06 }); },
    shutter: function () { T({ f: 140, f2: 55, dur: 0.3, peak: 0.45 }); B({ dur: 0.12, f: 1200, q: 1, peak: 0.28 }); },
    key: function () { B({ dur: 0.03, f: 4200, q: 4, peak: 0.12 }); B({ dur: 0.03, f: 3600, q: 4, peak: 0.1, when: 0.08 }); },
    /* the strings of an old upright, set humming by a train going by */
    hum: function () {
      [55, 82.4, 110, 164.8, 220].forEach(function (f, i) { T({ f: f, dur: 3.6, peak: 0.035 / (i * 0.5 + 1), a: 1.2 }); });
      B({ type: 'lowpass', f: 160, dur: 3.4, peak: 0.12, a: 1.1 });
    },
    /* a projector running: the clatter of the claw, about twenty times a second, for a few seconds */
    run: function (secs, fps) {
      var n = Math.round((secs || 2) * (fps || 20)), i;
      for (i = 0; i < n; i++) B({ dur: 0.018, f: 2600, q: 2.5, peak: 0.07, when: i / (fps || 20) });
      T({ type: 'sawtooth', f: 62, dur: secs || 2, peak: 0.02, a: 0.2 });
    }
  };
  /* "If You Ask Me": the old tune, slowly, on a piano that nobody is playing. Returns how long it lasts, in seconds. */
  var TUNE = [[64, 1], [67, 1], [69, 1], [67, 3], [64, 1], [62, 1], [60, 3], [62, 1], [64, 1], [67, 1], [64, 2], [62, 4],
    [64, 1], [67, 1], [69, 1], [72, 3], [71, 1], [69, 1], [67, 3], [69, 1], [67, 1], [64, 1], [62, 2], [60, 4]];
  X.song = function (beat) {
    var t = 0, b = beat || 0.5;
    TUNE.forEach(function (n) {
      var f = 440 * Math.pow(2, (n[0] - 69) / 12);
      T({ type: 'triangle', f: f, dur: Math.min(2.4, n[1] * b * 1.6), peak: 0.13, when: t });
      T({ type: 'sine', f: f * 2, dur: 0.6, peak: 0.025, when: t });
      t += n[1] * b;
    });
    return t;
  };
  /* A lock opens. The music answers in the room's own key, as it does after ER.exit; without music, three plain notes. */
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };

  /* ---------- small helpers ---------- */
  /* a thing in the scene that has a name and something to say */
  X.thing = function (sel, word, line, busy, after) {
    ER.$$(sel).forEach(function (n) {
      n.addEventListener('click', function (e) {
        if (busy && busy()) return;
        if (word) ER.wordAt(e.clientX, e.clientY, word);
        if (line) ER.say(typeof line === 'function' ? line() : line);
        if (after) after();
      });
    });
  };
  /* a note of your own in the notebook */
  X.mine = function (id, title, html, quiet) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'mine', 'Your notes', quiet); };
  /* words go into the notebook when the paper that uses them has been read */
  X.terms = function (list) {
    var G = window.GLOSS || [];
    list.forEach(function (w) { for (var i = 0; i < G.length; i++) if (G[i][0] === w) { ER.addWord(G[i][0], G[i][1]); break; } });
  };
  X.flash = function (n, cls, ms) { n.classList.add(cls || 'bad'); setTimeout(function () { n.classList.remove(cls || 'bad'); }, ms || 1000); };
  X.num = function (v) { return (Math.round(v * 10) / 10).toString(); };
  X.minutesPlayed = function () {
    var st = ER.state(), end = ER.flag('tEnd') || Date.now();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((end - (st.t0 || end)) / 60000));
  };

  /* ---------- Della, standing: feet at 0 0, about 300 high ----------
     o = {coat, scarf, back: true (seen from behind), lamp: true (a work lamp in her hand), sit: true (at the piano, from behind)} */
  X.della = function (o) {
    o = o || {};
    var coat = o.coat || '#26304a', scarf = o.scarf || '#b8322c', skin = '#e3b894', hair = '#2a1c16', s = '';
    s += '<ellipse cx="0" cy="3" rx="46" ry="8" fill="#000" opacity=".3"/>';
    s += '<rect x="-19" y="-96" width="16" height="96" fill="#1c1e26"/><rect x="3" y="-96" width="16" height="96" fill="#1c1e26"/>';
    s += '<path d="M-25 0q0 -12 8 -12h15v12zM2 0v-12h15q8 0 8 12z" fill="#3a2418"/>';
    s += '<path d="M-38 -86L-33 -222Q-29 -246 0 -246Q29 -246 33 -222L38 -86Z" fill="' + coat + '"/>';
    s += '<path d="M-38 -86h76" stroke="#000" stroke-opacity=".25" stroke-width="3"/>';
    if (!o.back) {
      s += '<path d="M0 -222V-90" stroke="#000" stroke-opacity=".22" stroke-width="2"/><circle cx="-4" cy="-200" r="2.5" fill="#d9c08a"/><circle cx="-4" cy="-170" r="2.5" fill="#d9c08a"/><circle cx="-4" cy="-140" r="2.5" fill="#d9c08a"/>';
      s += '<path d="M-20 -246q20 16 40 0l-6 16q-14 10 -28 0z" fill="' + scarf + '"/><path d="M8 -236l10 64l-14 2l-4 -60z" fill="' + scarf + '"/>';
    } else s += '<path d="M-22 -246q22 14 44 0v10q-22 10 -44 0z" fill="' + scarf + '"/>';
    if (o.lamp) {
      s += '<path d="M-33 -214q-15 42 -5 88M33 -214q20 30 24 70" stroke="' + coat + '" stroke-width="15" fill="none" stroke-linecap="round"/><circle cx="-38" cy="-122" r="8" fill="' + skin + '"/><circle cx="58" cy="-142" r="8" fill="' + skin + '"/>';
      s += '<path d="M50 -142h18v-6h-18z" fill="#2a2a2a"/><rect x="48" y="-136" width="22" height="30" rx="4" fill="#f2c94c"/><rect x="51" y="-110" width="16" height="10" fill="#fff6d0"/>';
    } else s += '<path d="M-33 -214q-15 42 -5 92M33 -214q15 42 5 92" stroke="' + coat + '" stroke-width="15" fill="none" stroke-linecap="round"/><circle cx="-38" cy="-118" r="8" fill="' + skin + '"/><circle cx="38" cy="-118" r="8" fill="' + skin + '"/>';
    s += '<rect x="-7" y="-262" width="14" height="20" fill="' + skin + '"/><circle cx="0" cy="-276" r="22" fill="' + skin + '"/>';
    if (o.back) s += '<circle cx="0" cy="-279" r="23" fill="' + hair + '"/><path d="M-6 -262q-6 26 4 44q10 -18 2 -44z" fill="' + hair + '"/>';
    else {
      s += '<path d="M-22 -276q0 -30 22 -30t22 30q-8 -16 -22 -16t-22 16z" fill="' + hair + '"/><path d="M14 -298q22 6 18 40q-6 -14 -14 -20z" fill="' + hair + '"/>';
      s += '<path d="M-11 -274h7M4 -274h7" stroke="#2a2420" stroke-width="2.6" stroke-linecap="round"/><path d="M-6 -262q6 2 12 0" stroke="#8c4a3c" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    }
    return s;
  };
  return X;
})();
