/* The Needle Points Down - what every room of the story shares: a few sounds of an ice sheet (gusts, a skidoo far off,
   radio hiss, a probe going into snow, canvas), number wheels, choice buttons, a dial that turns, small helpers, and the
   big laminated map of the ice round Camp Yoke (contours, the flow of the ice, the Hump, Yoke Nunatak, the flag line).
   Loaded after engine.js. Nothing in here knows an answer: the map is a picture of the ice, and the rooms ask questions. */
window.ICE = (function () {
  'use strict';
  var X = {}, D = document, NS = 'http://www.w3.org/2000/svg';
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so that the sound button switches them) ---------- */
  X.sfx = {
    gust: function () { B({ type: 'lowpass', f: 380, f2: 900, q: 0.6, dur: 1.6, peak: 0.12, a: 0.5 }); B({ type: 'highpass', f: 2600, dur: 1.2, peak: 0.03, a: 0.4, when: 0.2 }); },
    crunch: function () { B({ type: 'bandpass', f: 1400, q: 0.8, dur: 0.09, peak: 0.16 }); B({ type: 'bandpass', f: 900, q: 0.8, dur: 0.1, peak: 0.12, when: 0.11 }); },
    probe: function () { B({ type: 'bandpass', f: 1800, f2: 600, q: 1.2, dur: 0.22, peak: 0.12, a: 0.01 }); },
    hollow: function () { B({ type: 'bandpass', f: 700, f2: 260, q: 1.5, dur: 0.5, peak: 0.12, a: 0.01 }); T({ f: 180, f2: 90, dur: 0.4, peak: 0.08 }); },
    hiss: function () { B({ type: 'highpass', f: 1800, dur: 0.7, peak: 0.05, a: 0.05 }); },
    tap: function () { B({ dur: 0.02, f: 4200, q: 4, peak: 0.12 }); T({ f: 1500, f2: 1200, dur: 0.05, peak: 0.03 }); },
    flap: function () { B({ type: 'bandpass', f: 500, q: 0.7, dur: 0.18, peak: 0.12 }); B({ type: 'bandpass', f: 420, q: 0.7, dur: 0.16, peak: 0.1, when: 0.22 }); },
    pencil: function () { B({ type: 'highpass', f: 3000, dur: 0.16, peak: 0.05, a: 0.03 }); },
    notch: function () { B({ dur: 0.018, f: 3400, q: 5, peak: 0.09 }); T({ f: 900, f2: 700, dur: 0.03, peak: 0.03 }); },
    click: function () { B({ dur: 0.02, f: 2600, q: 2, peak: 0.16 }); T({ f: 180, dur: 0.04, peak: 0.06 }); },
    beep: function () { T({ type: 'square', f: 1250, dur: 0.07, peak: 0.03 }); T({ type: 'square', f: 1250, dur: 0.07, peak: 0.03, when: 0.14 }); },
    no: function () { T({ type: 'triangle', f: 150, f2: 92, dur: 0.26, peak: 0.24 }); }
  };
  /* An engine: a skidoo near or a plane far off. */
  X.engine = function (dur, vol, plane) {
    try {
      var c = ER.audio && ER.audio(), out = ER.out && ER.out(); if (!c || !out || !ER.sound()) return;
      var t = c.currentTime, o = c.createOscillator(), o2 = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain(), v = 0.03 * (vol || 1);
      o.type = 'sawtooth'; o.frequency.value = plane ? 96 : 64; o2.type = 'square'; o2.frequency.value = plane ? 143 : 97; f.type = 'lowpass'; f.frequency.value = plane ? 520 : 380;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + dur * 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
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
  X.rnd = function (seed) { var s = seed || 1; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };
  X.deg = function (a) { return ((Math.round(a) % 360) + 360) % 360; };
  X.d3 = function (a) { a = X.deg(a); return (a < 10 ? '00' : a < 100 ? '0' : '') + a; };

  /* ---------- wheels: a number set one figure at a time ----------
     o = {label, vals: [[...], ...] one list for each wheel, start: [index, ...], sep: {wheelIndex: 'text before it'}, tail, cls, change} */
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
  X.HOURS = (function () { var a = [], i; for (i = 0; i < 24; i++) a.push(two(i)); return a; })();
  X.MIN5 = (function () { var a = [], i; for (i = 0; i < 60; i += 5) a.push(two(i)); return a; })();

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

  /* ---------- a dial: an SVG group that turns round a point when it is dragged ----------
     o = {svg, cx, cy, step (degrees), start (degrees clockwise from up), change(angle), center: fn -> [x, y] in svg coordinates
     when the dial sits inside a group that moves}. Returns {get, set}. */
  X.turn = function (node, o) {
    var a = o.start || 0, step = o.step || 5;
    function draw() { node.setAttribute('transform', 'rotate(' + a + ' ' + o.cx + ' ' + o.cy + ')'); }
    ER.drag(node, {
      move: function (e) {
        var p = ER.pt(o.svg, e), c = o.center ? o.center() : [o.cx, o.cy], na = Math.atan2(p.x - c[0], c[1] - p.y) * 180 / Math.PI;
        na = X.deg(Math.round(na / step) * step);
        if (na !== a) { a = na; X.sfx.notch(); draw(); if (o.change) o.change(a); }
      }
    });
    draw();
    return { get: function () { return a; }, set: function (v) { a = X.deg(v); draw(); if (o.change) o.change(a); } };
  };

  /* ---------- the big map ----------
     The ice round Camp Yoke, 23 km by 23 km, north at the top. Kilometres east (x) and north (y) of the camp.
     o: {flow, speeds, hump, zones, routes, flags, stakes, labels, extra} : which layers to draw. Returns SVG markup for a
     640 x 640 viewBox. */
  var S = 28, OX = 196, OY = 584;
  function px(x) { return +(OX + x * S).toFixed(1); }
  function py(y) { return +(OY - y * S).toFixed(1); }
  X.px = px; X.py = py; X.KM = S;
  function line(pts) { return pts.map(function (p, i) { return (i ? 'L' : 'M') + px(p[0]) + ' ' + py(p[1]); }).join(''); }
  function curve(pts) {          /* a smooth path through the points */
    var s = 'M' + px(pts[0][0]) + ' ' + py(pts[0][1]), i, a, b, c, d;
    for (i = 0; i < pts.length - 1; i++) {
      a = pts[Math.max(0, i - 1)]; b = pts[i]; c = pts[i + 1]; d = pts[Math.min(pts.length - 1, i + 2)];
      s += 'C' + px(b[0] + (c[0] - a[0]) / 6) + ' ' + py(b[1] + (c[1] - a[1]) / 6) + ' ' + px(c[0] - (d[0] - b[0]) / 6) + ' ' + py(c[1] - (d[1] - b[1]) / 6) + ' ' + px(c[0]) + ' ' + py(c[1]);
    }
    return s;
  }
  X.line = line; X.curve = curve;
  X.CONTOURS = [
    [2050, [[-7, 0.2], [15.8, 0.2]]],
    [2000, [[-7, 4.6], [15.8, 4.6]]],
    [1950, [[-7, 9.0], [15.8, 9.0]]],
    [1900, [[-7, 13.4], [2, 13.4], [4.5, 13.25], [6.5, 12.4], [8.6, 11.0], [11, 10.6], [15.8, 10.6]]],
    [1850, [[-7, 17.8], [1, 17.7], [4, 16.8], [6.5, 15.3], [8.2, 14.5]]],
    [1800, [[-7, 20.7], [2, 20.4], [6, 18.7], [8.8, 17.3]]]
  ];
  X.FLOW = [
    [[-4, -1.5], [-4, 6], [-4, 13], [-3.8, 20.6]],
    [[-0.8, -1.5], [-0.8, 6], [-0.8, 13.6], [0.4, 17.6], [1.8, 20.6]],
    [[2.2, -1.5], [2.2, 5.5], [2.2, 11.6], [3.4, 15.4], [5, 18.4], [6.4, 20.6]],
    [[4.5, -1.5], [4.5, 5.5], [4.6, 11.2], [5.9, 14.2], [7.6, 17.4], [9.2, 20.6]],
    [[7, -1.5], [7, 6], [7.1, 11], [7.6, 13.4], [7.95, 14.8], [8.5, 17.0], [10.6, 19.6]]
  ];
  X.ROCK = [[8.25, 14.6], [9.0, 14.35], [9.9, 14.7], [10.3, 15.3], [10.4, 16.3], [9.7, 16.8], [8.7, 16.5], [8.3, 15.7]];
  X.P = { C: [0, 0], F: [0, 12], S: [6.5, 14], W1: [7.9, 14.5], SKI: [-0.17, -0.98], N: [9.3, 15.6] };
  X.map = function (o) {
    o = o || {};
    var s = '', i, k;
    s += '<rect x="-40" y="-40" width="720" height="720" fill="#f7fafb"/>';
    for (i = -6; i <= 14; i += 2) s += '<path d="M' + px(i) + ' 0V640" stroke="#cfe0ea" stroke-width="1"/>';
    for (i = -2; i <= 20; i += 2) s += '<path d="M0 ' + py(i) + 'H640" stroke="#cfe0ea" stroke-width="1"/>';
    /* contours: height above the sea, in metres */
    X.CONTOURS.forEach(function (c) {
      s += '<path d="' + curve(c[1]) + '" fill="none" stroke="#b08a66" stroke-width="1.4"/>';
      var p = c[1][0];
      s += '<text x="' + (px(p[0]) + 6) + '" y="' + (py(p[1]) - 4) + '" font-family="Overpass,sans-serif" font-size="11" fill="#8a6a4a">' + c[0] + ' m</text>';
    });
    if (o.zones) {
      s += '<g fill="url(#hatch)" stroke="#c8321e" stroke-width="1.6" stroke-dasharray="5 3">' +
        '<rect x="' + px(1.2) + '" y="' + py(8.4) + '" width="' + (4.6 * S) + '" height="' + (1.6 * S) + '"/>' +
        '<path d="' + line([[3.4, 16.2], [6.4, 15.6], [7.2, 18.2], [4.4, 19.0]]) + 'Z"/>' +
        '<path d="' + line([[7.75, 14.1], [8.25, 14.6], [8.3, 15.7], [8.7, 16.5], [8.35, 16.8], [7.75, 15.6]]) + 'Z"/></g>';
    }
    if (o.hump) {
      s += '<ellipse cx="' + px(3.5) + '" cy="' + py(6.2) + '" rx="' + (2.6 * S) + '" ry="' + (1.15 * S) + '" fill="rgba(120,90,160,.10)" stroke="#6a4a9a" stroke-width="1.6" stroke-dasharray="2 4"/>' +
        '<path d="M' + px(1.0) + ' ' + py(6.3) + 'H' + px(6.0) + '" stroke="#6a4a9a" stroke-width="2" stroke-dasharray="8 5"/>' +
        '<text x="' + px(3.5) + '" y="' + (py(6.2) + 4) + '" text-anchor="middle" font-family="Overpass,sans-serif" font-weight="700" font-size="11.5" fill="#5a3a8a">THE HUMP</text>' +
        '<text x="' + px(3.5) + '" y="' + (py(6.2) + 58) + '" text-anchor="middle" font-family="Overpass,sans-serif" font-size="10" fill="#5a3a8a">rock under the ice, by radar</text>';
    }
    if (o.flow) {
      X.FLOW.forEach(function (f) { s += '<path d="' + curve(f) + '" fill="none" stroke="#2a6ab0" stroke-width="1.8" marker-end="url(#arr)" opacity=".85"/>'; });
    }
    if (o.speeds) {
      [[2.2, 4.2, 13], [2.2, 8.4, 21], [4.5, 4.2, 14], [4.5, 8.4, 23], [4.6, 11.0, 17], [-0.8, 4.2, 12], [-0.8, 8.4, 12], [-4, 8.4, 11],
       [5.5, 13.6, 18], [4.6, 17.6, 27], [6.6, 18.4, 29], [7.95, 15.3, 8], [7.2, 12.4, 15]].forEach(function (v) {
        s += '<g font-family="Overpass,sans-serif" font-weight="700" font-size="11" fill="#1f4f8a"><rect x="' + (px(v[0]) + 5) + '" y="' + (py(v[1]) - 9) + '" width="' + (v[2] > 9 ? 20 : 13) + '" height="13" fill="#f7fafb" opacity=".85"/><text x="' + (px(v[0]) + 7) + '" y="' + (py(v[1]) + 1) + '">' + v[2] + '</text></g>';
      });
    }
    /* the rock */
    s += '<path d="' + line(X.ROCK) + 'Z" fill="#4a3c34" stroke="#2a201a" stroke-width="2"/>' +
      '<path d="M' + px(8.8) + ' ' + py(15.0) + 'l10 -12l10 12M' + px(9.6) + ' ' + py(15.9) + 'l9 -11l9 11" stroke="#8a7a6a" stroke-width="2" fill="none"/>';
    if (o.labels !== false) s += '<text x="' + px(10.6) + '" y="' + py(16.9) + '" font-family="Fjalla One,sans-serif" font-size="14" letter-spacing="1" fill="#2a201a">YOKE NUNATAK</text>';
    if (o.flags !== false) {
      for (k = 1; k <= 30; k++) s += '<circle cx="' + px(0) + '" cy="' + py(k * 0.4) + '" r="' + (k % 5 ? 1.7 : 2.6) + '" fill="#1e8a3e"/>';
      s += '<path d="' + line([[-0.6, -1.4], [0.27, -0.56]]) + '" stroke="#2a2a2a" stroke-width="5" stroke-linecap="round"/>';
      s += '<rect x="' + (px(0) - 7) + '" y="' + (py(0) - 7) + '" width="14" height="14" fill="#e8641c" stroke="#2a2a2a" stroke-width="2"/>' +
        '<path d="M' + px(0) + ' ' + (py(12) - 9) + 'l8 14h-16z" fill="#f2c230" stroke="#2a2a2a" stroke-width="2"/>';
      if (o.labels !== false) s += '<g font-family="Overpass,sans-serif" font-weight="700" font-size="11.5" fill="#1a2230"><text x="' + (px(0) + 12) + '" y="' + (py(0) + 4) + '">CAMP YOKE</text>' +
        '<text x="' + (px(0) - 66) + '" y="' + (py(-1.25) + 4) + '">skiway</text>' +
        '<text x="' + (px(0) - 12) + '" y="' + (py(12) - 14) + '" text-anchor="end">FUEL CACHE</text><text x="' + (px(0) - 12) + '" y="' + (py(12) - 2) + '" text-anchor="end" font-weight="400" font-size="10">weather mast</text>' +
        '<text x="' + (px(0) - 8) + '" y="' + py(3.2) + '" text-anchor="end" font-weight="400" font-size="10" fill="#1e8a3e">green flags,</text><text x="' + (px(0) - 8) + '" y="' + (py(3.2) + 12) + '" text-anchor="end" font-weight="400" font-size="10" fill="#1e8a3e">every 400 m</text></g>';
    }
    if (o.stakes) {
      for (k = 0; k < 9; k++) {
        var sx = 6.5 + (7.9 - 6.5) * k / 8, sy = 14 + 0.5 * k / 8;
        s += '<circle cx="' + px(sx) + '" cy="' + py(sy) + '" r="2.4" fill="#e8641c" stroke="#2a2a2a" stroke-width=".8"/>';
      }
      if (o.labels !== false) s += '<text x="' + (px(6.5) - 4) + '" y="' + (py(14) + 15) + '" text-anchor="middle" font-family="Overpass,sans-serif" font-weight="700" font-size="10.5" fill="#a8460e">W9</text><text x="' + (px(7.9) + 2) + '" y="' + (py(14.5) + 15) + '" font-family="Overpass,sans-serif" font-weight="700" font-size="10.5" fill="#a8460e">W1</text>' +
        '<text x="' + (px(6.2)) + '" y="' + (py(14) + 28) + '" text-anchor="middle" font-family="Overpass,sans-serif" font-size="10" fill="#a8460e">the stakes</text>';
    }
    if (o.routes) {
      s += '<g fill="none" stroke-width="2.6" stroke-linecap="round">' +
        '<path d="' + line([[0.15, 0.35], [6.4, 13.8]]) + '" stroke="#7a3aa8" stroke-dasharray="9 6"/>' +
        '<path d="' + line([[0.15, 12.2], [4.6, 17.4], [6.45, 14.2]]) + '" stroke="#c8321e" stroke-dasharray="3 5"/>' +
        '<path d="' + line([[0.2, 12.05], [6.35, 13.95]]) + '" stroke="#1a6a3a" stroke-dasharray="12 4 2 4"/></g>' +
        '<g font-family="Fjalla One,sans-serif" font-size="17"><text x="' + px(2.2) + '" y="' + py(4.0) + '" fill="#7a3aa8">A</text><text x="' + px(2.2) + '" y="' + py(15.5) + '" fill="#c8321e">B</text><text x="' + px(3.0) + '" y="' + py(12.2) + '" fill="#1a6a3a">C</text></g>';
    }
    /* north and scale */
    s += '<g transform="translate(600 586)"><path d="M0 -40v34M0 -40l-6 12h12z" stroke="#1a2230" stroke-width="2" fill="#1a2230"/><text y="12" text-anchor="middle" font-family="Overpass,sans-serif" font-weight="700" font-size="13" fill="#1a2230">N</text></g>' +
      '<g transform="translate(452 618)"><path d="M0 0h' + (2 * S) + '" stroke="#1a2230" stroke-width="4"/><text x="' + (2 * S + 8) + '" y="5" font-family="Overpass,sans-serif" font-size="11" fill="#1a2230">2 km</text></g>';
    if (o.extra) s += o.extra;
    return s;
  };
  /* the shared defs of the map: an arrow head for the flow lines, a hatch for crevasse ground */
  X.MAPDEFS = '<defs><marker id="arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1L9 5L0 9z" fill="#2a6ab0"/></marker>' +
    '<pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V7" stroke="#c8321e" stroke-width="1.4" opacity=".55"/></pattern></defs>';
  return X;
})();
