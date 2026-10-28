/* Not a Soul Missed - what every room of the story shares: a few small sounds, the helpers, Miss Tunstall's tally
   counter, and the two pages of the enumerator's book of 1881 that the story turns on (pages 8 and 9, Church Lane).
   Loaded after engine.js. Nothing in here knows an answer: the pages are the record as it was written in 1881. */
window.CS = (function () {
  'use strict';
  var X = {};
  function T(o) { try { ER.tone(o); } catch (e) {} }
  function B(o) { try { ER.burst(o); } catch (e) {} }

  /* ---------- sounds (through the engine, so that the sound button switches them) ---------- */
  X.sfx = {
    count: function () { B({ dur: 0.018, f: 4200, q: 5, peak: 0.2 }); T({ f: 1900, dur: 0.03, peak: 0.04 }); },
    slip: function () { B({ type: 'highpass', f: 2800, dur: 0.07, peak: 0.07 }); },
    chalk: function () { B({ dur: 0.12, f: 2600, q: 0.8, peak: 0.06, a: 0.02 }); B({ dur: 0.08, f: 3400, q: 1, peak: 0.05, when: 0.1 }); },
    key: function () { B({ dur: 0.03, f: 3800, q: 4, peak: 0.13 }); B({ dur: 0.05, f: 1400, q: 3, peak: 0.12, when: 0.12 }); T({ f: 140, f2: 80, dur: 0.12, peak: 0.12, when: 0.14 }); },
    door: function () { T({ type: 'sawtooth', f: 180, f2: 120, dur: 0.5, peak: 0.04, a: 0.08 }); T({ f: 90, f2: 60, dur: 0.25, peak: 0.25, when: 0.45 }); },
    stone: function () { B({ type: 'lowpass', f: 700, dur: 0.09, peak: 0.25 }); },
    gust: function () { B({ type: 'bandpass', f: 500, f2: 260, q: 0.6, dur: 1.6, peak: 0.1, a: 0.5 }); }
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
  X.flash = function (n, cls, ms) { if (!n) return; n.classList.add(cls || 'bad'); setTimeout(function () { n.classList.remove(cls || 'bad'); }, ms || 1100); };
  X.minutesPlayed = function () {
    var st = ER.state(), end = ER.flag('tEnd') || Date.now();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((end - (st.t0 || end)) / 60000));
  };

  /* ---------- Miss Tunstall's tally counter: it shows what it shows, and now and then it clicks by itself ---------- */
  var clk = null;
  X.clicker = function (n, tick) {
    if (!clk) {
      clk = ER.el('div', 'clicker', '<svg viewBox="0 0 40 40"><circle cx="20" cy="22" r="15" fill="#b9bec4" stroke="#5a6068" stroke-width="2"/><circle cx="20" cy="22" r="10" fill="#d9dde2"/>' +
        '<rect x="13" y="18" width="14" height="7" rx="1" fill="#121212"/><rect x="17" y="2" width="6" height="6" rx="1.500" fill="#8a9098"/><path d="M33 12l4 -4" stroke="#8a9098" stroke-width="3" stroke-linecap="round"/></svg><span>Her counter</span><b></b>');
      clk.title = 'Miss Tunstall’s tally counter';
      document.body.appendChild(clk);
    }
    clk.querySelector('b').textContent = ('000' + n).slice(-3);
    if (tick) { clk.classList.remove('tick'); void clk.offsetWidth; clk.classList.add('tick'); X.sfx.count(); }
  };

  /* ---------- the enumerator's book, Sattersby, 1881: pages 8 and 9 ----------
     s schedule, h road and house, i inhabited, u uninhabited, n name, r relation, c condition, m/f age (males/females),
     o occupation, b where born, e 2 = the last line of a house */
  X.PAGES = {
    8: { tot: { i: '3', u: '1', m: '7', f: '7' }, rows: [
      { s: '27', h: 'Church Lane, Tup Inn', i: '1', n: 'Uriah Spence', r: 'Head', c: 'Mar', m: '46', o: 'Innkeeper', b: 'Yorkshire Sattersby' },
      { n: 'Tamar do.', r: 'Wife', c: 'Mar', f: '44', b: 'do. Ulgarth' },
      { n: 'Thomas do.', r: 'Son', m: '13', o: 'Scholar', b: 'do. Sattersby' },
      { n: 'Victoria do.', r: 'Dau', f: '11', o: 'Scholar', b: 'do. do.' },
      { n: 'Tryphena Ulyett', r: 'Servt', c: 'Unm', f: '16', o: 'General Servant', b: 'do. do.' },
      { n: 'Victor Tweddle', r: 'Lodger', c: 'Unm', m: '24', o: 'Quarryman', b: 'Durham Weardale', e: 2 },
      { s: '28', h: 'do. School House', i: '1', n: 'Septimus Tasker', r: 'Head', c: 'Mar', m: '52', o: 'Schoolmaster', b: 'Lincolnshire Louth' },
      { n: 'Selina do.', r: 'Wife', c: 'Mar', f: '48', o: 'Sewing Mistress', b: 'Yorkshire York' },
      { n: 'Zachary do.', r: 'Son', m: '12', o: 'Scholar', b: 'do. Sattersby', e: 2 },
      { h: 'do. Lane End', u: '1', e: 2 },
      { s: '29', h: 'do.', i: '1', n: 'Stephen Ulyett', r: 'Head', c: 'Mar', m: '39', o: 'Blacksmith', b: 'Yorkshire Sattersby' },
      { n: 'Thomasina do.', r: 'Wife', c: 'Mar', f: '37', b: 'do. do.' },
      { n: 'Stephen do.', r: 'Son', m: '12', o: 'Scholar', b: 'do. do.' },
      { n: 'Wilhelmina do.', r: 'Dau', f: '11', o: 'Scholar', b: 'do. do.' },
      { n: 'Theodora do.', r: 'Dau', f: '4', b: 'do. do.', e: 2 }] },
    9: { tot: { i: '3', u: '', m: '9', f: '7' }, rows: [
      { s: '30', h: 'Church Lane', i: '1', n: 'Samuel Wray', r: 'Head', c: 'Mar', m: '37', o: 'Stone Waller', b: 'Yorkshire Ulgarth' },
      { n: 'Tabitha do.', r: 'Wife', c: 'Mar', f: '34', b: 'do. Sattersby' },
      { n: 'Timothy do.', r: 'Son', m: '12', o: 'Scholar', b: 'do. do.' },
      { n: 'Sarah do.', r: 'Dau', f: '9', o: 'Scholar', b: 'do. do.' },
      { n: 'Sydney do.', r: 'Son', m: '5', o: 'Scholar', b: 'do. do.' },
      { n: 'Sophia Varey', r: 'Visitor', c: 'Wid', f: '61', o: 'Monthly Nurse', b: 'do. do.', e: 2 },
      { s: '31', h: 'do.', i: '1', n: 'Thomas Thackray', r: 'Head', c: 'Mar', m: '43', o: 'Ag Lab', b: 'Yorkshire Sattersby' },
      { n: 'Sarah do.', r: 'Wife', c: 'Mar', f: '40', b: 'do. Ulgarth' },
      { n: 'William do.', r: 'Son', c: 'Unm', m: '17', o: 'Ag Lab', b: 'do. Sattersby' },
      { n: 'Thomas do.', r: 'Son', m: '9', o: 'Scholar', b: 'do. do.' },
      { n: 'Sybil do.', r: 'Dau', f: '6', o: 'Scholar', b: 'do. do.' },
      { n: 'Samuel do.', r: 'Son', m: '3', b: 'do. do.' },
      { n: 'Susan do.', r: 'Dau', f: '3 mos', b: 'do. do.', e: 2 },
      { s: '32', h: 'do.', i: '1', n: 'William Swales', r: 'Head', c: 'Wid', m: '66', o: 'Ag Lab', b: 'Yorkshire Ulgarth' },
      { n: 'William do.', r: 'Grandson', m: '12', o: 'Scholar', b: 'do. do.', e: 2 }] }
  };
  /* ---------- Miss Tunstall, standing: feet at 0 0, about 300 high ----------
     o = {lamp: true (the lantern held out), back: true (seen from behind), coat: colour} */
  X.stella = function (o) {
    o = o || {};
    var coat = o.coat || '#34402e', scarf = '#a8322c', skin = '#ecc9ae', hair = '#e9e6e0', s = '';
    s += '<ellipse cx="0" cy="3" rx="46" ry="8" fill="#000" opacity=".3"/>';
    s += '<rect x="-18" y="-92" width="15" height="92" fill="#2a2a30"/><rect x="3" y="-92" width="15" height="92" fill="#2a2a30"/>';
    s += '<path d="M-26 0q0 -14 8 -14h15v14zM3 0v-14h15q8 0 8 14z" fill="#3a2a1c"/>';
    s += '<path d="M-40 -84L-34 -224Q-30 -246 0 -246Q30 -246 34 -224L40 -84Z" fill="' + coat + '"/>';
    s += '<path d="M-40 -84h80M-38 -150h18M20 -150h18" stroke="#000" stroke-opacity=".25" stroke-width="3"/>';
    if (!o.back) {
      s += '<path d="M0 -224V-88" stroke="#000" stroke-opacity=".25" stroke-width="2"/><path d="M-22 -246q22 16 44 0l-6 16q-16 10 -32 0z" fill="' + scarf + '"/><path d="M6 -236l12 70l-14 2l-6 -64z" fill="' + scarf + '"/>';
    } else s += '<path d="M-24 -246q24 14 48 0v10q-24 10 -48 0z" fill="' + scarf + '"/>';
    if (o.lamp) {
      s += '<path d="M-34 -214q-15 42 -5 92M34 -214q22 24 30 64" stroke="' + coat + '" stroke-width="15" fill="none" stroke-linecap="round"/><circle cx="-39" cy="-118" r="8" fill="' + skin + '"/><circle cx="64" cy="-148" r="8" fill="' + skin + '"/>';
      s += '<path d="M64 -150v-14" stroke="#1a1a1a" stroke-width="2.500"/><path d="M54 -164h20l-3 -8h-14z" fill="#1a1a1a"/><rect x="54" y="-140" width="20" height="30" rx="3" fill="#f6d27a"/><path d="M54 -140h20M54 -110h20" stroke="#1a1a1a" stroke-width="4"/><path d="M64 -136v22" stroke="#fff6d0" stroke-width="5" stroke-linecap="round"/>';
    } else s += '<path d="M-34 -214q-15 42 -5 92M34 -214q15 42 5 92" stroke="' + coat + '" stroke-width="15" fill="none" stroke-linecap="round"/><circle cx="-39" cy="-118" r="8" fill="' + skin + '"/><circle cx="39" cy="-118" r="8" fill="' + skin + '"/>';
    s += '<rect x="-7" y="-262" width="14" height="20" fill="' + skin + '"/><circle cx="0" cy="-277" r="22" fill="' + skin + '"/>';
    if (o.back) s += '<circle cx="0" cy="-280" r="23" fill="' + hair + '"/><path d="M-22 -276q22 16 44 0v8q-22 10 -44 0z" fill="' + hair + '"/>';
    else {
      s += '<path d="M-23 -274q-2 -30 23 -30t23 30q-6 -18 -23 -18t-23 18z" fill="' + hair + '"/>';
      s += '<rect x="-15" y="-281" width="12" height="8" rx="2.500" fill="none" stroke="#4a3a2a" stroke-width="1.800"/><rect x="3" y="-281" width="12" height="8" rx="2.500" fill="none" stroke="#4a3a2a" stroke-width="1.800"/>';
      s += '<path d="M-6 -262q6 2 12 0" stroke="#9c5a50" stroke-width="2.200" fill="none" stroke-linecap="round"/>';
    }
    return s;
  };

  /* ---------- the Revd Stephen Vavasour's figures: his 1 has a little flag; his 4 is open at the top and its upright runs
     on below the bar. In the margin of Violet Wray's baptism the first stroke of the 4 has faded. ---------- */
  X.glyph = function (k, big) {
    var w = big ? 40 : 13, h = big ? 60 : 19, s = '<svg class="gl" viewBox="0 0 20 30" width="' + w + '" height="' + h + '" style="display:inline-block;vertical-align:' + (big ? 'middle' : '-3px') + '">',
      st = ' stroke="#2c2440" stroke-width="2.300" stroke-linecap="round" fill="none"';
    if (k === '1') s += '<path d="M12 4L8 27"' + st + '/><path d="M12 4L7 9"' + st + '/>';
    else if (k === '4') s += '<path d="M11 3L5 19"' + st + '/><path d="M5 19H17"' + st + '/><path d="M14 10L11 29"' + st + '/>';
    else s += '<path d="M11 3L5 19"' + st + ' opacity=".09"/><path d="M6 19H16"' + st + ' opacity=".85"/><path d="M14 9L11 29"' + st + '/>';
    return s + '</svg>';
  };

  /* the line the enumerator never wrote, as it is written in at the end of the story */
  X.TABITHA = { n: 'Tabitha do.', r: 'Dau', f: '12', o: 'Scholar', b: 'do. do.', ins: true };

  /* o = {rows: a list in place of the page's own, sel: rows can be clicked (data-l = their place on the page), foot: false} */
  X.page = function (no, o) {
    o = o || {};
    var P = X.PAGES[no], rows = o.rows || P.rows, s = '<div class="eb" data-page="' + no + '">';
    s += '<div class="eb-top"><span>The undermentioned Houses are situate within the Boundaries of the Civil Parish of <i>Sattersby</i> &middot; Ecclesiastical Parish of <i>St Oswald, Sattersby</i></span><b>Page ' + no + '</b></div>';
    s += '<table><colgroup><col style="width:5%"><col style="width:15%"><col style="width:4%"><col style="width:4%"><col style="width:17%"><col style="width:8%"><col style="width:6%"><col style="width:5.5%"><col style="width:5.5%"><col style="width:14%"><col style="width:16%"></colgroup>';
    s += '<thead><tr><th rowspan="2">No. of Schedule</th><th rowspan="2">Road, Street, &amp;c., and No. or Name of House</th><th colspan="2">HOUSES</th><th rowspan="2">NAME and Surname of each Person</th>' +
      '<th rowspan="2">RELATION to Head of Family</th><th rowspan="2">CONDITION as to Marriage</th><th colspan="2">AGE last Birthday of</th><th rowspan="2">Rank, Profession, or OCCUPATION</th><th rowspan="2">WHERE BORN</th></tr>' +
      '<tr><th>In-habited</th><th>Unin-habited (U.)</th><th>Males</th><th>Females</th></tr></thead><tbody>';
    rows.forEach(function (r, k) {
      s += '<tr' + (o.sel && r.n ? ' class="sel' + (r.e === 2 ? ' end2' : '') + (r.ins ? ' ins' : '') + '" data-l="' + k + '"' : (r.e === 2 || r.ins ? ' class="' + (r.e === 2 ? 'end2' : '') + (r.ins ? ' ins' : '') + '"' : '')) + '>' +
        '<td class="num">' + (r.s || '') + '</td><td>' + (r.h || '') + '</td><td class="num">' + (r.i || '') + '</td><td class="num">' + (r.u || '') + '</td>' +
        '<td>' + (r.n || '') + '</td><td>' + (r.r || '') + '</td><td>' + (r.c || '') + '</td><td class="num">' + (r.m || '') + '</td><td class="num">' + (r.f || '') + '</td>' +
        '<td>' + (r.o || '') + '</td><td>' + (r.b || '') + '</td></tr>';
    });
    s += '</tbody>';
    if (o.foot !== false) s += '<tfoot><tr><td colspan="2" class="pr">Total of Houses</td><td class="hand">' + P.tot.i + '</td><td class="hand">' + P.tot.u + '</td>' +
      '<td colspan="3" class="pr" style="text-align:right">Total of Males and of Females</td><td class="hand">' + P.tot.m + '</td><td class="hand">' + P.tot.f + '</td><td colspan="2"></td></tr></tfoot>';
    return s + '</table></div>';
  };
  return X;
})();
