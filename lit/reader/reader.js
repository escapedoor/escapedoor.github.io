/* Don't Skip to the End - what every room of the story shares: a few library sounds, small helpers and the six
   picture signs of Mrs Pumphrey's shelving guide. Loaded after engine.js. Nothing in here knows an answer. */
window.RD = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  X.sfx = {
    stamp: function () { T({ f: 120, f2: 70, dur: 0.12, peak: 0.35 }); B({ type: 'lowpass', f: 900, dur: 0.05, peak: 0.25 }); },
    slide: function () { B({ type: 'bandpass', f: 1400, f2: 700, q: 0.8, dur: 0.22, peak: 0.08, a: 0.04 }); },
    thump: function () { T({ f: 90, f2: 55, dur: 0.18, peak: 0.3 }); },
    chalk: function () { B({ type: 'highpass', f: 3000, dur: 0.12, peak: 0.05, a: 0.02 }); B({ type: 'highpass', f: 3400, dur: 0.1, peak: 0.04, a: 0.02, when: 0.14 }); },
    jingle: function () { [2600, 3100, 2850].forEach(function (f, i) { T({ f: f, dur: 0.12, peak: 0.03, when: i * 0.06 }); }); },
    snip: function () { B({ type: 'highpass', f: 4000, dur: 0.05, peak: 0.12 }); B({ type: 'highpass', f: 3600, dur: 0.05, peak: 0.1, when: 0.09 }); }
  };
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };
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
  X.minutesPlayed = function () {
    var st = ER.state();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((st.secs || 60) / 60));
  };
  /* with an item held, a click on a filled slot puts the held one there and sends the old one home */
  X.swapIn = function (root, itemSel, slotSel, home) {
    root.addEventListener('pointerdown', function (e) {
      var it = e.target.closest ? e.target.closest(itemSel) : null, slot = it && it.closest(slotSel), held = root.querySelector(itemSel + '.held');
      if (!it || !slot || !held || held === it || e.button) return;
      e.stopPropagation(); e.preventDefault();
      home.appendChild(it); slot.click();
    }, true);
  };
  X.told = function (key) {
    var t = ER.flag(key) || {};
    return { has: function (k) { return !!t[k]; }, set: function (k) { if (t[k]) return false; t[k] = 1; ER.flag(key, t); return true; } };
  };

  /* the six picture signs of the children's corner, drawn in a 40 x 40 box; the stacks use the same ones on their spines */
  var IC = {
    m: '<circle cx="17" cy="17" r="10" fill="none" stroke="CC" stroke-width="4"/><path d="M24 24l10 10" stroke="CC" stroke-width="5" stroke-linecap="round"/>',
    a: '<circle cx="20" cy="20" r="15" fill="none" stroke="CC" stroke-width="3"/><path d="M20 7l5 13 -5 13 -5 -13z" fill="CC"/><circle cx="20" cy="20" r="2.5" fill="#fff"/>',
    f: '<path d="M6 30l3 -18 7 9 4 -13 4 13 7 -9 3 18z" fill="CC"/><rect x="6" y="30" width="28" height="4" fill="CC"/>',
    s: '<path d="M20 4q9 9 7 22h-14q-2 -13 7 -22z" fill="CC"/><path d="M13 26l-5 8 6 -2zM27 26l5 8 -6 -2z" fill="CC"/><circle cx="20" cy="16" r="3" fill="#fff"/><path d="M17 30l3 7 3 -7" fill="#e8742a"/>',
    c: '<path d="M10 28q0 -18 10 -19q10 1 10 19z" fill="CC"/><rect x="7" y="28" width="26" height="4" rx="2" fill="CC"/><circle cx="20" cy="35" r="3" fill="CC"/><path d="M20 9v-4" stroke="CC" stroke-width="3"/>',
    g: '<rect x="15" y="16" width="10" height="20" fill="CC"/><path d="M20 6q5 6 0 10q-5 -4 0 -10z" fill="#f2b23a"/><path d="M20 16v-2" stroke="#333" stroke-width="1.5"/>'
  };
  X.GENRES = { m: 'Mystery', a: 'Adventure', f: 'Fairy tale', s: 'Science fiction', c: 'School story', g: 'Ghost story' };
  X.icon = function (g, col) { return (IC[g] || '').replace(/CC/g, col || '#2b2420'); };
  X.iconSvg = function (g, col, size) { return '<svg viewBox="0 0 40 40" width="' + (size || 26) + '" height="' + (size || 26) + '" aria-hidden="true">' + X.icon(g, col) + '</svg>'; };
  return X;
})();
