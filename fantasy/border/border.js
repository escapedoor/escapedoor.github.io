/* A Nice Measure - small helpers that every room of the story shares. Loaded after engine.js.
   The Treaty of Ninefold is kept here (proofread it with the pages: wordlist.py does not read .js files).
   Nothing in here knows an answer: the First Article is kept as the water left it, with its small words washed out,
   and the margin of the Reading Copy is filled in by the player. */
window.BDR = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so the sound button switches them) ---------- */
  X.sfx = {
    pen: function () { for (var i = 0; i < 6; i++) B({ type: 'highpass', f: 3800 + i * 150, dur: 0.05, peak: 0.05, when: i * 0.07 }); },       /* the Table's pen on paper */
    lift: function () { T({ type: 'triangle', f: 330, f2: 300, dur: 0.18, peak: 0.07 }); },                                            /* the pen lifts and waits */
    seal: function () { T({ f: 110, f2: 70, dur: 0.18, peak: 0.35 }); B({ type: 'lowpass', f: 600, dur: 0.1, peak: 0.2 }); },            /* wax pressed */
    quill: function () { B({ type: 'bandpass', f: 5200, f2: 3000, q: 4, dur: 0.22, peak: 0.06, a: 0.03 }); },
    page: function () { B({ type: 'highpass', f: 2200, dur: 0.22, peak: 0.08, a: 0.05 }); },
    turn: function () { B({ dur: 0.04, f: 2400, q: 3, peak: 0.12 }); T({ f: 520, dur: 0.06, peak: 0.05, when: 0.02 }); },
    flap: function () { B({ type: 'lowpass', f: 900, f2: 500, dur: 0.35, peak: 0.12, a: 0.06 }); B({ type: 'lowpass', f: 800, f2: 400, dur: 0.3, peak: 0.08, a: 0.05, when: 0.3 }); },
    hm: function () { T({ type: 'triangle', f: 196, f2: 165, dur: 0.3, peak: 0.1, a: 0.05 }); },                                        /* the Mapmaster's pencil taps twice */
    tap: function () { B({ dur: 0.02, f: 2600, q: 5, peak: 0.12 }); B({ dur: 0.02, f: 2600, q: 5, peak: 0.12, when: 0.16 }); },
    chime: function () { [1, 1.5, 2].forEach(function (m, i) { T({ type: 'triangle', f: 523.25 * m, dur: 1.2, peak: 0.07, when: i * 0.18 }); }); }
  };

  /* A door opens. The music answers in the room's own key; without music, three plain notes. */
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

  /* The Mapmaster cannot speak, but she can count. Every wrong try is a blot on your copy, and she marks it in red. */
  X.blot = function () { X.sfx.tap(); return X.bump('blots'); };
  X.blots = function () { return ER.flag('blots') || 0; };

  /* minutes played, for the last page */
  X.minutes = function () {
    var st = ER.state(), secs = st.fin && st.fin.secs ? st.fin.secs : (st.secs || 0);
    return Math.max(1, Math.round(secs / 60));
  };

  /* ---------- the Treaty of Ninefold ---------- */
  X.TITLE = 'The Treaty of Ninefold';
  X.PREAMBLE = 'Made between the Crown of Querne and the Crown of Selvan in the Guild-house of the Mapmakers at Ninefold, and sealed there on the first day of October, in the first year of the Long Peace. Three copies were made: one for each Crown, and one for the Guild.';
  /* The First Article as the Guild's own copy has it since the flood: seven small words gone, and one more under a blot.
     {1} ... {7} are the gaps; {B} is the blot. */
  X.FIRST = 'The bound shall begin at the Thrum Springs, where the Wimble rises, and shall run {1} the Wimble {2} the Weir of Ninefold. There it shall go {3} the water, {4} Mardle Wood, {5} Raven Knoll and {6} the Two Sisters; and so {7} the Hermit&rsquo;s Well, {B} the north of Mardle, to the Bridge of Ninefold.';
  X.ART = [
    null, null,
    ['II', 'From the Bridge the bound shall run along the middle of the Wimble to the sea. The left bank shall be Querne&rsquo;s, and the right bank Selvan&rsquo;s. If the Wimble move its bed little by little, the bound shall move with it; but if it leave its bed all at once, in one flood, the bound shall stay in the old bed.'],
    ['III', 'The Bridge of Ninefold, and all the ground within a bowshot of it, shall belong to neither Crown, but to the Guild of Mapmakers, who shall keep it in repair. The people of both Crowns may cross by the Bridge at any hour.'],
    ['IV', 'The shepherds of Selvan may graze their flocks on Withy Mead, on the left bank, from the Feast of First Lambs until the Feast of Last Leaves, unless the Wimble be in flood. But they shall build nothing there, and they shall own no part of it.'],
    ['V', 'The fishers of Querne may fish the Wimble upstream of the Weir, from either bank. Downstream of the Weir, each Crown shall fish from its own bank only.'],
    ['VI', 'No man of Querne shall {let} any of Selvan that cross by the Bridge, nor take any toll of them; and they may have {meat} and drink at the inns of Querne at the common price.'],
    ['VII', 'When the barges of Querne come down to the Bridge, the heralds of Selvan shall {prevent} them through the arches, for the deep water lies by the right bank, and Selvan knows it best.'],
    ['VIII', 'Either Crown may build mills, houses and walls on its own bank.'],
    ['IX', 'But nothing in this Treaty gives any person leave to build within a bowshot of the Bridge.'],
    ['X', 'This bound shall be kept to a {nice} measure. Every fifty years it shall be read aloud over the Great Map of the Guild, before both Crowns; the Map shall draw what is read, and both Crowns shall hold to what is drawn.']
  ];
  /* An article as HTML. o.mark: show the four old words in red; o.gloss: {let: 'sense', ...} written in the margin */
  X.art = function (n, o) {
    o = o || {};
    var a = X.ART[n]; if (!a) return '';
    var t = a[1].replace(/\{(\w+)\}/g, function (m, w) {
      var g = o.gloss && o.gloss[w];
      return (o.mark || g ? '<u class="old">' + w + '</u>' : w) + (g ? '<span class="gl">' + g + '</span>' : '');
    });
    return '<p class="art"><b>' + a[0] + '.</b> ' + t + '</p>';
  };
  X.arts = function (from, to, o) { var s = '', i; for (i = from; i <= to; i++) s += X.art(i, o); return s; };
  return X;
})();
