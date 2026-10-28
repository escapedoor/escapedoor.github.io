/* The Cave That Breathes - what every room of the story shares: a few sounds of a wet hillside and a cave (water, drips,
   a match, a candle, a quad bike far off), number wheels, choice buttons, small helpers, and the gauge of the Duck Pool
   through the night. Loaded after engine.js. Nothing in here knows an answer: the gauge is a list of what the water did. */
window.KARST = (function () {
  'use strict';
  var X = {}, D = document, NS = 'http://www.w3.org/2000/svg';
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so that the sound button switches them) ---------- */
  X.sfx = {
    step: function () { B({ type: 'lowpass', f: 520, dur: 0.12, peak: 0.14 }); B({ type: 'lowpass', f: 460, dur: 0.12, peak: 0.12, when: 0.38 }); },
    splash: function () { B({ type: 'bandpass', f: 900, f2: 380, q: 0.7, dur: 0.45, peak: 0.16, a: 0.02 }); B({ type: 'highpass', f: 3000, dur: 0.2, peak: 0.05, when: 0.05 }); },
    drip: function () { T({ f: 1700, f2: 600, dur: 0.08, peak: 0.1 }); },
    water: function () { B({ type: 'bandpass', f: 600, f2: 1100, q: 0.6, dur: 0.9, peak: 0.08, a: 0.25 }); },
    match: function () { B({ type: 'highpass', f: 2600, dur: 0.12, peak: 0.12, a: 0.01 }); B({ type: 'bandpass', f: 900, q: 0.8, dur: 0.6, peak: 0.05, a: 0.08, when: 0.08 }); },
    magnet: function () { T({ f: 320, f2: 210, dur: 0.05, peak: 0.16 }); B({ dur: 0.02, f: 2600, q: 3, peak: 0.1 }); },
    notch: function () { B({ dur: 0.018, f: 3400, q: 5, peak: 0.09 }); T({ f: 900, f2: 700, dur: 0.03, peak: 0.03 }); },
    pencil: function () { B({ type: 'highpass', f: 3000, dur: 0.16, peak: 0.05, a: 0.03 }); },
    click: function () { B({ dur: 0.02, f: 2600, q: 2, peak: 0.16 }); T({ f: 180, dur: 0.04, peak: 0.06 }); },
    lamp: function () { B({ dur: 0.015, f: 4200, q: 4, peak: 0.12 }); T({ f: 1200, f2: 1600, dur: 0.05, peak: 0.03 }); },
    ring: function () { [0, 0.5].forEach(function (w) { T({ f: 440, dur: 0.38, peak: 0.05, when: w }); T({ f: 480, dur: 0.38, peak: 0.05, when: w }); }); },
    no: function () { T({ type: 'triangle', f: 150, f2: 92, dur: 0.26, peak: 0.24 }); }
  };
  /* A quad bike a long way off, coming up the track: a buzz that comes and grows. */
  X.engine = function (dur, vol) {
    try {
      var c = ER.audio && ER.audio(), out = ER.out && ER.out(); if (!c || !out || !ER.sound()) return;
      var t = c.currentTime, o = c.createOscillator(), o2 = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain(), v = 0.03 * (vol || 1);
      o.type = 'sawtooth'; o.frequency.value = 58; o2.type = 'square'; o2.frequency.value = 87; f.type = 'lowpass'; f.frequency.value = 360;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + dur * 0.8); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(f); o2.connect(f); f.connect(g); g.connect(out); o.start(t); o2.start(t); o.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
    } catch (e) {}
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
  X.mine = function (id, title, html, quiet) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'mine', 'Your notes', quiet); };
  X.terms = function (list) {
    var G = window.GLOSS || [];
    list.forEach(function (w) { for (var i = 0; i < G.length; i++) if (G[i][0] === w) { ER.addWord(G[i][0], G[i][1]); break; } });
  };
  X.minutesPlayed = function () {
    var st = ER.state(), end = ER.flag('tEnd') || Date.now();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((end - (st.t0 || end)) / 60000));
  };
  X.el = function (tag, attrs, html) {
    var n = D.createElementNS(NS, tag), k;
    for (k in attrs) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  };
  X.clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  function two(n) { return (n < 10 ? '0' : '') + n; }
  X.two = two;
  /* minutes after midnight on Saturday -> "16.45" (and the day, when asked) */
  X.clock = function (m) { m = ((Math.round(m) % 1440) + 1440) % 1440; return two(Math.floor(m / 60)) + '.' + two(m % 60); };
  X.rnd = function (seed) { var s = seed || 1; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  /* a door opens: the music answers in the room's key (or three plain notes without music) */
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };

  /* ---------- wheels: a number set one figure at a time ----------
     o = {label, vals: [[...], ...] one list for each wheel, start: [index, ...], sep: {wheelIndex: 'text before it'}, tail: 'text after', cls, change: fn} */
  X.wheels = function (box, o) {
    var at = (o.start || o.vals.map(function () { return 0; })).slice(), s = o.label ? '<small>' + o.label + '</small>' : '', off = false;
    o.vals.forEach(function (v, i) {
      if (o.sep && o.sep[i]) s += '<i>' + o.sep[i] + '</i>';
      s += '<span class="wl"><button type="button" data-j="' + i + '" data-d="1" title="up">&#9650;</button><b></b><button type="button" data-j="' + i + '" data-d="-1" title="down">&#9660;</button></span>';
    });
    if (o.tail) s += '<i>' + o.tail + '</i>';
    var n = ER.el('span', 'wls ' + (o.cls || ''), s), cells = ER.$$('b', n);
    function draw() { cells.forEach(function (c, i) { c.textContent = o.vals[i][at[i]]; }); }
    n.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null, j, len;
      if (!b || off) return;
      j = +b.getAttribute('data-j'); len = o.vals[j].length;
      at[j] = (at[j] + (+b.getAttribute('data-d')) + len) % len;
      X.sfx.notch(); draw(); if (o.change) o.change();
    });
    box.appendChild(n); draw();
    return {
      node: n,
      get: function () { return at.map(function (k, i) { return o.vals[i][k]; }).join(''); },
      at: function () { return at.slice(); },
      set: function (list) { at = list.slice(); draw(); },
      lock: function (on) { off = !!on; n.classList.toggle('off', off); }
    };
  };
  X.DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  X.HOURS = (function () { var a = [], i; for (i = 0; i < 24; i++) a.push(two(i)); return a; })();
  X.QUARTERS = ['00', '15', '30', '45'];

  /* ---------- picks: a row of buttons, one of which is chosen ---------- */
  X.picks = function (box, list, o) {
    o = o || {};
    var n = ER.el('span', 'picks'), cur = o.start == null ? null : o.start;
    list.forEach(function (p) {
      var b = ER.el('button', '', p[1]); b.type = 'button'; b.setAttribute('data-v', p[0]);
      b.addEventListener('click', function () { if (n.classList.contains('off')) return; cur = p[0]; X.sfx.click(); draw(); if (o.change) o.change(cur); });
      n.appendChild(b);
    });
    function draw() { ER.$$('button', n).forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-v') === cur); }); }
    box.appendChild(n); draw();
    return { node: n, get: function () { return cur; }, set: function (v) { cur = v; draw(); }, lock: function (on) { n.classList.toggle('off', !!on); } };
  };

  /* ---------- the Duck gauge through the night ----------
     What the water in the Duck Pool did, read off the club's gauge board (metres above the survey zero), Saturday
     evening to Sunday morning. Minutes after midnight on Saturday; after midnight the minutes go on past 1440. */
  X.GAUGE = [[960, 0.10], [995, 0.30], [1005, 0.40], [1020, 0.55], [1050, 0.85], [1080, 1.15], [1110, 1.45], [1140, 1.70], [1170, 1.90],
    [1200, 2.10], [1230, 2.25], [1260, 2.40], [1290, 2.45], [1320, 2.45], [1350, 2.40], [1380, 2.35], [1410, 2.30], [1440, 2.25], [1470, 2.20],
    [1500, 2.15], [1530, 2.10], [1560, 2.05], [1590, 2.00], [1620, 1.95], [1650, 1.90], [1680, 1.85], [1710, 1.80], [1740, 1.75], [1770, 1.70], [1800, 1.65], [1830, 1.60], [1860, 1.55]];
  X.level = function (m) {
    var g = X.GAUGE, i;
    if (m <= g[0][0]) return g[0][1];
    for (i = 1; i < g.length; i++) if (m <= g[i][0]) return g[i - 1][1] + (g[i][1] - g[i - 1][1]) * (m - g[i - 1][0]) / (g[i][0] - g[i - 1][0]);
    return g[g.length - 1][1];
  };
  return X;
})();
