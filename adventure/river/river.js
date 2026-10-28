/* A Little Water - what every room of the story shares: sounds (the Jacana's whistle above all), people drawn in the
   scenes, and small helpers. Loaded after engine.js. Nothing in here knows an answer.
   THE RIVER, ONCE (every page that names a mile or a current takes it from here, so that they cannot disagree):
     Port Gessin 0 · Goat Island 30 · Kapok Point 42 · Hollow Tree 66 · Jaw Bend 78 · Grice's Post 96 · Ironwood Creek 114 ·
     Kalumi Falls 116.  Currents: Lower River 0-42 2 mph, the Shoals 42-84 3 mph, the Narrows 84-96 5 mph, Upper River
     96-116 3 mph. The Jacana makes 9 mph through the water and draws 4 feet. */
window.RV = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  X.STATIONS = [
    { id: 'goat', name: 'Goat Island', mile: 30 }, { id: 'kapok', name: 'Kapok Point', mile: 42 },
    { id: 'hollow', name: 'Hollow Tree', mile: 66 }, { id: 'jaw', name: 'Jaw Bend', mile: 78 },
    { id: 'grice', name: 'Grice’s Post', mile: 96 }, { id: 'ironwood', name: 'Ironwood Creek', mile: 114 }];
  X.REACHES = [
    { name: 'the Lower River', from: 0, to: 42, current: 2 }, { name: 'the Shoals', from: 42, to: 84, current: 3 },
    { name: 'the Narrows', from: 84, to: 96, current: 5 }, { name: 'the Upper River', from: 96, to: 116, current: 3 }];

  /* ---------- the Jacana's whistle: a held chord with breath in it, through the engine's switched output ---------- */
  function whistle(len, when) {
    var c = ER.audio && ER.audio(), out = ER.out && ER.out();
    if (!c || !out || !ER.sound()) return;
    var t = c.currentTime + (when || 0), g = c.createGain(), lp = c.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 2600; g.connect(lp); lp.connect(out);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.09, t + 0.09);
    g.gain.setValueAtTime(0.09, t + len - 0.12); g.gain.exponentialRampToValueAtTime(0.0001, t + len + 0.25);
    [[311, 'sawtooth', 0.5], [392, 'sawtooth', 0.42], [466, 'triangle', 0.6], [622, 'sine', 0.22]].forEach(function (v) {
      var o = c.createOscillator(), a = c.createGain(); o.type = v[1]; o.frequency.setValueAtTime(v[0] * 0.94, t);
      o.frequency.exponentialRampToValueAtTime(v[0], t + 0.18); a.gain.value = v[2]; o.connect(a); a.connect(g); o.start(t); o.stop(t + len + 0.3);
    });
    B({ type: 'bandpass', f: 1800, q: 0.7, dur: len + 0.2, peak: 0.05, a: 0.08, when: when || 0 });
  }
  /* a signal: 'S' short (about one second), 'L' long (four seconds). Returns how long it takes, in ms. */
  X.blow = function (sig) {
    var w = 0; String(sig).split('').forEach(function (k) { var len = k === 'L' ? 3.6 : 0.55; whistle(len, w); w += len + 0.45; });
    return Math.round(w * 1000);
  };
  X.sig = function (s) { return String(s).split('').map(function (k) { return k === 'L' ? '▬' : '●'; }).join(' '); };

  X.sfx = {
    knock: function () { [0, 0.31].forEach(function (w, i) { T({ f: 120 - i * 14, f2: 70, dur: 0.18, peak: 0.34, when: w }); B({ type: 'lowpass', f: 700, dur: 0.06, peak: 0.16, when: w }); }); },
    tick: function () { B({ dur: 0.025, f: 4200, q: 6, peak: 0.08 }); },
    splash: function () { B({ type: 'bandpass', f: 900, f2: 300, q: 0.6, dur: 0.5, peak: 0.22, a: 0.01 }); },
    pole: function () { B({ type: 'lowpass', f: 500, dur: 0.12, peak: 0.2 }); B({ type: 'bandpass', f: 1400, q: 1, dur: 0.25, peak: 0.05, when: 0.08 }); },
    wheel: function () { [0, 0.12, 0.24].forEach(function (w) { B({ dur: 0.03, f: 2400, q: 4, peak: 0.08, when: w }); }); },
    pen: function () { B({ type: 'bandpass', f: 1700, q: 1, dur: 0.16, peak: 0.05, a: 0.03 }); },
    stamp: function () { T({ f: 90, f2: 50, dur: 0.16, peak: 0.5 }); B({ type: 'lowpass', f: 900, dur: 0.05, peak: 0.3 }); },
    frog: function () { [0, 0.22, 0.44].forEach(function (w) { T({ type: 'square', f: 260, f2: 200, dur: 0.07, peak: 0.02, when: w }); }); },
    moth: function () { B({ type: 'bandpass', f: 220, q: 3, dur: 0.9, peak: 0.05, a: 0.3 }); }
  };

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
  X.hour = function (h) { return h === 12 ? 'noon' : h < 12 ? h + ' a.m.' : (h - 12) + ' p.m.'; };
  /* a value set with two arrows.  o = {list: [values], start: index, show: fn(value) -> text, unit, change} */
  X.count = function (box, o) {
    var i = o.start || 0, n = ER.el('span', 'cnt', '<button type="button" data-d="-1" title="back">&#9664;</button><b></b><button type="button" data-d="1" title="on">&#9654;</button>' + (o.unit ? '<i>' + o.unit + '</i>' : '')),
      cell = n.querySelector('b');
    function draw() { cell.textContent = o.show ? o.show(o.list[i]) : o.list[i]; }
    n.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null; if (!b) return;
      i = Math.max(0, Math.min(o.list.length - 1, i + (+b.getAttribute('data-d')))); X.sfx.tick(); draw(); if (o.change) o.change(o.list[i]);
    });
    box.appendChild(n); draw();
    return { node: n, get: function () { return o.list[i]; }, set: function (v) { var j = o.list.indexOf(v); if (j >= 0) { i = j; draw(); } } };
  };

  /* ---------- people in the scenes: a figure of about 300 x s units, feet at (x, y) ----------
     o = {coat, skin, hair, legs, hat: 'cap'|'panama'|'felt'|'scarf'|'none', sit, beard, specs, apron, flip, dress} */
  X.person = function (x, y, s, o) {
    var k = o.skin, c = o.coat, L = o.legs || '#3a3328', g = '';
    if (o.sit) {
      g += '<path d="M-26 -78h52l6 60h-14l-4 -40h-28l-4 40h-14z" fill="' + L + '"/><path d="M-36 -18h20v10h-24zM16 -18h20l4 10h-24z" fill="#2a2018"/>';
      g += '<path d="M-38 -80q-6 -96 38 -104q44 8 38 104z" fill="' + c + '"/>';
    } else {
      if (o.dress) g += '<path d="M-40 -12l10 -110h60l10 110z" fill="' + o.dress + '"/><path d="M-18 -12v14M14 -12v14" stroke="' + k + '" stroke-width="10"/>';
      else g += '<path d="M-22 0v-112h18V0zM4 0v-112h18V0z" fill="' + L + '"/>';
      g += '<path d="M-29 0h26v9h-30zM3 0h26l3 9h-29z" fill="#2a2018"/>';
      g += '<path d="M-44 -96q-8 -100 44 -112q52 12 44 112z" fill="' + c + '"/>';
      if (o.apron) g += '<path d="M-26 -150h52l6 110h-64z" fill="' + o.apron + '"/>';
    }
    var top = o.sit ? -184 : -208;
    g += '<path d="M-38 ' + (top + 20) + 'q-22 44 -12 100" stroke="' + c + '" stroke-width="17" fill="none" stroke-linecap="round"/><circle cx="-50" cy="' + (top + 124) + '" r="9.500" fill="' + k + '"/>';
    g += '<path d="M38 ' + (top + 20) + 'q22 44 12 100" stroke="' + c + '" stroke-width="17" fill="none" stroke-linecap="round"/><circle cx="50" cy="' + (top + 124) + '" r="9.500" fill="' + k + '"/>';
    g += '<rect x="-7" y="' + (top - 22) + '" width="14" height="24" fill="' + k + '"/><circle cx="0" cy="' + (top - 42) + '" r="26" fill="' + k + '"/>';
    if (o.hair && o.hat !== 'scarf') g += '<path d="M-26 ' + (top - 44) + 'q2 -30 26 -30t26 30q-6 -14 -26 -14t-26 14z" fill="' + o.hair + '"/>';
    if (o.beard) g += '<path d="M-22 ' + (top - 38) + 'q0 34 22 36q22 -2 22 -36q-8 16 -22 14q-14 2 -22 -14z" fill="' + o.beard + '"/>';
    if (o.specs) g += '<g fill="none" stroke="#2a2a30" stroke-width="2"><circle cx="-9" cy="' + (top - 44) + '" r="6"/><circle cx="9" cy="' + (top - 44) + '" r="6"/><path d="M-3 ' + (top - 44) + 'h6"/></g>';
    else g += '<path d="M-12 ' + (top - 46) + 'h6M6 ' + (top - 46) + 'h6" stroke="#1c140c" stroke-width="3" stroke-linecap="round"/>';
    if (o.hat === 'cap') g += '<path d="M-27 ' + (top - 58) + 'q27 -26 54 0z" fill="#f4f1e8"/><path d="M-28 ' + (top - 58) + 'h56v8h-56z" fill="#1f2a3a"/><path d="M-30 ' + (top - 50) + 'q30 8 46 0" stroke="#1f2a3a" stroke-width="5" fill="none"/><circle cx="0" cy="' + (top - 66) + '" r="4" fill="#d9b05a"/>';
    else if (o.hat === 'panama') g += '<ellipse cx="0" cy="' + (top - 60) + '" rx="46" ry="9" fill="#efe8d2"/><path d="M-24 ' + (top - 60) + 'q0 -26 24 -26t24 26z" fill="#f4eedb"/><path d="M-24 ' + (top - 64) + 'h48" stroke="#2a2a30" stroke-width="5"/>';
    else if (o.hat === 'felt') g += '<ellipse cx="0" cy="' + (top - 60) + '" rx="40" ry="8" fill="#6b5a3a"/><path d="M-22 ' + (top - 60) + 'q0 -26 22 -26t22 26z" fill="#7a6644"/>';
    else if (o.hat === 'scarf') g += '<path d="M-28 ' + (top - 40) + 'q-2 -40 28 -40t28 40q-6 -12 -28 -14q-22 2 -28 14z" fill="' + (o.hair || '#c96a2b') + '"/><path d="M22 ' + (top - 64) + 'q16 -6 14 10" stroke="' + (o.hair || '#c96a2b') + '" stroke-width="7" fill="none" stroke-linecap="round"/>';
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + (o.flip ? -s : s) + ' ' + s + ')">' + g + '</g>';
  };
  /* the Jacana, side on: a white two-decked stern-wheeler, drawn about 900 x 360 at scale 1, bow to the left */
  X.boat = function (x, y, s, o) {
    o = o || {};
    var g = '<ellipse cx="460" cy="10" rx="520" ry="18" fill="#000" opacity=".18"/>' +
      '<path d="M0 -40h830l40 40H30z" fill="#e9e2cf"/><path d="M0 -40h830" stroke="#7a2a22" stroke-width="6"/><path d="M30 0h840" stroke="#5a1f1a" stroke-width="5"/>' +
      '<rect x="40" y="-150" width="760" height="110" fill="#f4efe1"/><g fill="#3b4a44">';
    for (var i = 0; i < 12; i++) g += '<rect x="' + (60 + i * 60) + '" y="-128" width="34" height="46" rx="3"/>';
    g += '</g><path d="M30 -150h790" stroke="#c9bfa4" stroke-width="7"/><path d="M40 -84h760" stroke="#c9bfa4" stroke-width="3"/>' +
      '<g stroke="#bdb39a" stroke-width="4">';
    for (i = 0; i < 14; i++) g += '<path d="M' + (50 + i * 56) + ' -40v-110"/>';
    g += '</g><rect x="60" y="-230" width="640" height="80" fill="#f4efe1"/><path d="M40 -230h680" stroke="#c9bfa4" stroke-width="6"/>' +
      '<rect x="120" y="-300" width="150" height="70" fill="#f8f4e8" stroke="#7a2a22" stroke-width="4"/><g fill="#5f7f8f"><rect x="132" y="-290" width="38" height="32"/><rect x="176" y="-290" width="38" height="32"/><rect x="220" y="-290" width="38" height="32"/></g>' +
      '<rect x="380" y="-420" width="36" height="190" fill="#1f1f22"/><path d="M372 -420h52v14h-52z" fill="#7a2a22"/>' +
      '<path d="M418 -380q8 -6 16 0" stroke="#d9b05a" stroke-width="5" fill="none"/>' +
      '<g transform="translate(860 -70)"><circle r="78" fill="#7a2a22"/><circle r="62" fill="none" stroke="#5a1f1a" stroke-width="5"/>';
    for (i = 0; i < 12; i++) g += '<path d="M0 0L' + (78 * Math.cos(i * Math.PI / 6)).toFixed(1) + ' ' + (78 * Math.sin(i * Math.PI / 6)).toFixed(1) + '" stroke="#5a1f1a" stroke-width="7"/>';
    g += '<circle r="12" fill="#2a1010"/></g><text x="195" y="-198" class="sg" font-size="26" fill="#7a2a22" letter-spacing="3">JACANA</text>';
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + g + '</g>';
  };
  return X;
})();
