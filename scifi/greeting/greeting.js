/* With Open Arms - what every room of the story shares. Loaded after engine.js.
   The senders' symbols and their picture are drawn from the bitmaps below. Nothing in here knows an answer: which
   reading is right is checked against case.json by each room. */
window.GR = (function () {
  'use strict';
  var X = {}, D = document;
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so the sound button switches them) ---------- */
  X.sfx = {
    pulse: function (n, when) {             /* the neighbours: n short, pure pulses (the same pitch every time) */
      for (var i = 0; i < n; i++) T({ f: 1180, dur: 0.07, peak: 0.05, when: (when || 0) + i * 0.16 });
    },
    key: function () { B({ dur: 0.022, f: 2600, q: 3, peak: 0.12 }); },
    print: function () { for (var i = 0; i < 7; i++) B({ dur: 0.035, f: 3100, q: 2, peak: 0.07, when: i * 0.055 }); },
    pen: function () { B({ type: 'highpass', f: 3800, dur: 0.18, peak: 0.06, a: 0.04 }); B({ type: 'highpass', f: 3400, dur: 0.12, peak: 0.05, a: 0.03, when: 0.2 }); },
    dial: function () { B({ dur: 0.02, f: 4200, q: 5, peak: 0.12 }); },
    motor: function (d) { T({ type: 'sawtooth', f: 62, f2: 70, dur: d || 1.2, peak: 0.06, a: 0.2 }); B({ type: 'lowpass', f: 300, dur: d || 1.2, peak: 0.06, a: 0.2 }); },
    ding: function () { T({ f: 1568, dur: 0.9, peak: 0.08 }); T({ f: 3136, dur: 0.5, peak: 0.02 }); },
    sweep: function () { T({ type: 'triangle', f: 2400, f2: 700, dur: 0.35, peak: 0.05 }); },
    hm: function () { T({ type: 'triangle', f: 160, f2: 122, dur: 0.26, peak: 0.12, a: 0.05 }); },
    clank: function () { T({ f: 330, f2: 300, dur: 0.18, peak: 0.08 }); B({ dur: 0.04, f: 2200, q: 3, peak: 0.12 }); },
    wind: function (d) { B({ type: 'bandpass', f: 500, f2: 380, q: 0.6, dur: d || 2.5, peak: 0.05, a: 0.8 }); },
    hiss: function (d) { B({ type: 'highpass', f: 2800, dur: d || 1.2, peak: 0.06, a: 0.2 }); }
  };

  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };
  X.done = function (id) { var st = ER.state(); st.done = st.done || {}; st.done[id] = 1; ER.persist(true); };
  X.thing = function (sel, word, line, busy) {
    ER.$$(sel).forEach(function (n) {
      n.addEventListener('click', function (e) {
        if (busy && busy()) return;
        if (word) ER.wordAt(e.clientX, e.clientY, word);
        var t = typeof line === 'function' ? line() : line;
        if (t) ER.say(t);
      });
    });
  };
  /* your own notes: pencil on the back of the night's observing sheet */
  X.mine = function (id, title, html, quiet) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'mine', 'Your notes', quiet); };
  X.learn = function (list) {
    var G = window.GLOSS || [];
    list.forEach(function (w) {
      for (var i = 0; i < G.length; i++) if (G[i][0].toLowerCase() === w.toLowerCase()) { ER.addWord(G[i][0], G[i][1]); return; }
    });
  };
  X.bump = function (flag) { var n = (ER.flag(flag) || 0) + 1; ER.flag(flag, n); return n; };
  X.minutes = function () {
    var st = ER.state(), secs = st.fin && st.fin.secs ? st.fin.secs : (st.secs || 0);
    return Math.max(1, Math.round(secs / 60));
  };
  X.seq = function (steps, done) {
    var i = 0, t = 0, dead = false;
    function next() {
      if (dead) return;
      if (i >= steps.length) { if (done) done(); return; }
      var s = steps[i++];
      t = setTimeout(function () { if (dead) return; if (s[1]) s[1](); next(); }, s[0]);
    }
    next();
    return function () { dead = true; clearTimeout(t); };
  };

  /* ---------- the senders' symbols ----------
     Every symbol came as a block of 25 pulses, which Yusuf's program lays out five by five. */
  var G = {
    fork:  ['#...#', '.#.#.', '..#..', '..#..', '..#..'],
    bars:  ['#####', '.....', '.#.#.', '.....', '#####'],
    diam:  ['..#..', '.#.#.', '#...#', '.#.#.', '..#..'],
    hook:  ['##.##', '#...#', '.....', '#...#', '##.##'],
    we:    ['.###.', '.#.#.', '.###.', '#.#.#', '#.#.#'],
    you:   ['#.#.#', '.....', '#.#.#', '.....', '#.#.#'],
    t:     ['...##', '...#.', '..#..', '.#...', '#....'],
    hand:  ['#.#.#', '#.#.#', '#####', '.###.', '..#..'],
    give:  ['#....', '##...', '###..', '##...', '#....'],
    stone: ['.....', '.###.', '#####', '#####', '.###.'],
    house: ['..#..', '.###.', '#####', '#...#', '#.#.#'],
    frame: ['#####', '#...#', '#...#', '#...#', '#####']
  };
  /* PART FOUR: the picture, 29 across and 17 down (493 pulses) */
  var PIC = [
    '.###.........................',
    '#####......##................',
    '#####..#.#.##..#..#..........',
    '#####........................',
    '.###.........................',
    '.................###....###..',
    '.................###....###..',
    '..................#......#...',
    '.................###..#.###..',
    '.................##########..',
    '.................###..#.###..',
    '..#...............#......#...',
    '.###.............###....###..',
    '#####...........#.#.#..#.#.#.',
    '#...#.##......#.#.#.#..#.#.#.',
    '#.#.#.##..#####.#.#.#..#.#.#.',
    '#############################'
  ];
  /* small pictures: pieces cut from PART FOUR (the senders sent them again in PART FIVE), and two of ours */
  var PICT = {
    figure: ['.###.', '.###.', '..#..', '.###.', '.###.', '.###.', '..#..', '.###.', '#.#.#', '#.#.#', '#.#.#'],
    palms:  ['..#..', '#####', '..#..'],
    block:  ['##', '##'],
    home:   ['..#..', '.###.', '#####', '#...#', '#.#.#'],
    human:  ['..#..', '.###.', '#.#.#', '#.#.#', '..#..', '.#.#.', '.#.#.'],
    dish:   ['#.......#', '.#.....#.', '..#####..', '....#....', '....#....', '..#####..']
  };
  X.picRows = function () { return PIC.slice(); };
  X.picBits = function () { return PIC.join('').replace(/#/g, '1').replace(/\./g, '0'); };
  X.isGlyph = function (n) { return !!G[n]; };

  function rects(rows, w, h) {
    var s = '', y, x;
    for (y = 0; y < rows.length; y++) for (x = 0; x < rows[y].length; x++) if (rows[y].charAt(x) === '#') s += 'M' + x + ' ' + y + 'h1v1h-1z';
    return '<path d="' + s + '"/>';
  }
  /* a symbol as a little drawing: size in px (the drawing is square) */
  X.glyph = function (name, px, cls) {
    var r = G[name]; if (!r) return '';
    return '<svg class="gl ' + (cls || '') + '" data-g="' + name + '" viewBox="-0.6 -0.6 6.2 6.2" width="' + (px || 26) + '" height="' + (px || 26) + '" aria-hidden="true">' + rects(r) + '</svg>';
  };
  X.pict = function (name, px) {
    var r = PICT[name], w = r[0].length, h = r.length, u = (px || 4);
    return '<svg class="pc" viewBox="-0.5 -0.5 ' + (w + 1) + ' ' + (h + 1) + '" width="' + Math.round((w + 1) * u) + '" height="' + Math.round((h + 1) * u) + '" aria-hidden="true">' + rects(r) + '</svg>';
  };
  /* bits laid in rows of `cols`: an SVG of small squares */
  X.grid = function (bits, cols, px) {
    var rows = Math.ceil(bits.length / cols), s = '', i, x, y, u = px || 10;
    for (i = 0; i < bits.length; i++) { if (bits.charAt(i) !== '1') continue; x = i % cols; y = Math.floor(i / cols); s += 'M' + x + ' ' + y + 'h1v1h-1z'; }
    return '<svg class="lay" viewBox="-0.5 -0.5 ' + (cols + 1) + ' ' + (rows + 1) + '" width="' + Math.round((cols + 1) * u) + '" height="' + Math.round((rows + 1) * u) + '"><rect x="-0.5" y="-0.5" width="' + (cols + 1) + '" height="' + (rows + 1) + '" class="lay-bg"/><path d="' + s + '" class="lay-on"/></svg>';
  };
  X.dots = function (n) { var s = '<span class="dts">', i; for (i = 0; i < n; i++) s += '<i></i>'; return s + '</span>'; };
  /* one line of the message: numbers are counts of pulses, names are symbols, 'p:name' a small picture */
  X.line = function (toks, px) {
    return '<span class="ml">' + toks.map(function (t) {
      if (typeof t === 'number') return X.dots(t);
      if (t.indexOf('p:') === 0) return '<span class="mp">' + X.pict(t.slice(2), 3) + '</span>';
      return X.glyph(t, px || 26);
    }).join('') + '</span>';
  };

  /* the message as it was recorded, part by part */
  X.MSG = {
    p1: [[1], [2], [3], [4], [5]],
    p2: [[1, 'fork', 1, 'bars', 2], [2, 'fork', 1, 'bars', 3], [3, 'bars', 3], [2, 'fork', 2, 'bars', 5, 'diam'],
      [3, 'fork', 1, 'bars', 'hook'], [4], [4, 'bars', 3, 'diam']],
    p3: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29],
    p5: {
      d1: ['we', 'bars', 'p:figure'], d2: ['hand', 'bars', 'p:palms'], d3: ['stone', 'bars', 'p:block'], d4: ['house', 'bars', 'p:home'],
      c1: ['we', 'fork', 't', 'fork', 'stone', 'bars', 'house'],
      c2: ['we', 'fork', 'hand', 'fork', 'stone', 'bars', 'stone'],
      c3: [3, 'we', 'fork', 't', 'bars', 1, 'we', 'diam'],
      c4: [1, 'we', 'fork', 'hand', 'fork', 1, 'we', 'bars', 2, 'we'],
      c5: ['we', 'give', 'you', 'frame'],
      c6: ['you', 'give', 'we', 'hook']
    }
  };
  return X;
})();
