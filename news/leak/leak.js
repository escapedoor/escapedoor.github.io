/* Letterhead - what every room of the story shares: a few sounds, small helpers, people standing in a room, tiles copied
   into slots, the two council letters and the email that brought one of them. Loaded after engine.js.
   Nothing in here knows an answer. */
window.LK = (function () {
  'use strict';
  var X = {}, D = document;
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so that the sound button switches them) ---------- */
  X.sfx = {
    slip: function () { B({ type: 'highpass', f: 2600, dur: 0.11, peak: 0.08, a: 0.02 }); },
    key: function () { B({ dur: 0.02, f: 1600, q: 2, peak: 0.22 }); T({ f: 240, f2: 150, dur: 0.05, peak: 0.12 }); },
    stamp: function () { T({ f: 130, f2: 70, dur: 0.12, peak: 0.3 }); B({ dur: 0.05, f: 900, q: 1, peak: 0.2 }); },
    pen: function () { B({ type: 'bandpass', f: 2600, f2: 3400, q: 2, dur: 0.2, peak: 0.05, a: 0.03 }); },
    shopbell: function () { [1, 2.4, 3.1].forEach(function (m, i) { T({ f: 1480 * m, dur: 0.9 / (i + 1), peak: 0.05 / (i + 1) }); }); T({ f: 1500, dur: 0.6, peak: 0.04, when: 0.16 }); },
    mat: function () { B({ type: 'lowpass', f: 900, dur: 0.06, peak: 0.16 }); },
    press: function () { [0, 0.22, 0.44, 0.66, 0.88].forEach(function (w) { B({ type: 'lowpass', f: 300, dur: 0.12, peak: 0.18, when: w }); B({ dur: 0.04, f: 2400, q: 3, peak: 0.05, when: w + 0.08 }); }); },
    click: function () { B({ dur: 0.015, f: 3200, q: 4, peak: 0.12 }); },
    phone: function () { [0, 0.4].forEach(function (w) { T({ type: 'square', f: 440, dur: 0.3, peak: 0.025, when: w }); T({ type: 'square', f: 480, dur: 0.3, peak: 0.02, when: w }); }); }
  };
  /* a step inside a room is done: the music answers in the room's key; without music, three plain notes */
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };

  /* ---------- small helpers ---------- */
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
  /* tiles copied into slots: click a tile, then a slot (or drag it there). A click on a filled slot with nothing held empties it.
     o = {tile, slot, lock: fn, change: fn(slot)} */
  X.tiles = function (root, o) {
    var held = null;
    function hold(t) { if (held) held.classList.remove('held'); held = t; if (t) t.classList.add('held'); }
    function fill(s, t) {
      var gs = s.getAttribute('data-g'), gt = t.getAttribute('data-g');
      if (gs && gt && gs !== gt) { if (o.refuse) o.refuse(s, t); return; }
      s.setAttribute('data-v', t.getAttribute('data-v')); s.innerHTML = t.innerHTML;
      s.classList.add('full'); s.classList.remove('bad', 'ok'); X.sfx.key();
      if (o.change) o.change(s);
    }
    function clear(s) {
      s.removeAttribute('data-v'); s.innerHTML = s.getAttribute('data-ph') || ''; s.classList.remove('full', 'bad', 'ok'); X.sfx.slip();
      if (o.change) o.change(s);
    }
    root.addEventListener('pointerdown', function (e) {
      var t = e.target.closest ? e.target.closest(o.tile) : null;
      if (!t || e.button || (o.lock && o.lock())) return;
      e.preventDefault();
      var sx = e.clientX, sy = e.clientY, moved = false, ghost = null;
      function mv(ev) {
        if (!moved) {
          if (Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 6) return;
          moved = true; hold(null); ghost = t.cloneNode(true); ghost.classList.add('ghost'); D.body.appendChild(ghost);
        }
        ghost.style.left = (ev.clientX - 18) + 'px'; ghost.style.top = (ev.clientY - 15) + 'px';
      }
      function up(ev) {
        D.removeEventListener('pointermove', mv); D.removeEventListener('pointerup', up); D.removeEventListener('pointercancel', up);
        if (moved) {
          if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
          var n = D.elementFromPoint(ev.clientX, ev.clientY), s = n && n.closest ? n.closest(o.slot) : null;
          if (s && root.contains(s)) fill(s, t);
        } else hold(held === t ? null : t);
      }
      D.addEventListener('pointermove', mv); D.addEventListener('pointerup', up); D.addEventListener('pointercancel', up);
    });
    root.addEventListener('click', function (e) {
      var s = e.target.closest ? e.target.closest(o.slot) : null;
      if (!s || !root.contains(s) || (o.lock && o.lock())) return;
      if (held) { fill(s, held); hold(null); } else if (s.getAttribute('data-v')) clear(s);
    });
    return { hold: hold, fill: fill, clear: clear };
  };
  X.vals = function (root, sel) { return ER.$$(sel, root).map(function (s) { return s.getAttribute('data-v') || ''; }); };
  X.put = function (slot, tile) {
    if (!slot || !tile) return;
    slot.setAttribute('data-v', tile.getAttribute('data-v')); slot.innerHTML = tile.innerHTML; slot.classList.add('full');
  };

  /* ---------- the council's marks ---------- */
  /* the otter, from 1 April 2026: an otter on its back on two lines of water */
  X.otter = function (x, y, s, col) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="' + col + '">' +
      '<path d="M2 22Q10 8 30 10Q44 11 52 4Q58 0 62 5Q63 10 56 13Q50 17 44 22Q36 28 22 28Q8 28 2 22Z"/><circle cx="58" cy="6" r="1.4" fill="#fff"/>' +
      '<path d="M0 33Q8 29 16 33T32 33T48 33T64 33" fill="none" stroke="' + col + '" stroke-width="2.6"/><path d="M6 39Q14 35 22 39T38 39T54 39" fill="none" stroke="' + col + '" stroke-width="2.6"/></g>';
  };
  /* the woolsack crest, 1974 to March 2026 */
  X.woolsack = function (x, y, s, col, col2) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 0H44V24Q44 44 22 52Q0 44 0 24Z" fill="' + col + '"/>' +
      '<path d="M9 16Q22 8 35 16Q38 30 22 36Q6 30 9 16Z" fill="' + col2 + '"/><path d="M14 18Q22 14 30 18M12 24Q22 20 32 24M14 30Q22 27 30 30" stroke="' + col + '" stroke-width="1.2" fill="none"/>' +
      '<path d="M18 10L22 4L26 10" fill="none" stroke="' + col2 + '" stroke-width="2"/></g>';
  };
  /* her signature: the same strokes wherever it is drawn (a copy lies exactly on top of the original) */
  X.SIG = 'M4 30C10 8 22 4 18 18C14 30 6 34 12 26C20 16 30 10 30 22C30 30 36 26 40 20C42 30 48 28 52 18C54 28 60 30 64 22C66 16 70 14 72 22C74 30 80 28 84 20Q92 8 100 16Q96 22 108 18';
  X.signature = function (x, y, s, col, w) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')"><path d="' + X.SIG + '" fill="none" stroke="' + (col || '#1d2a66') + '" stroke-width="' + (w || 2.2) + '" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M20 36Q60 30 104 34" fill="none" stroke="' + (col || '#1d2a66') + '" stroke-width="' + ((w || 2.2) * 0.8) + '" stroke-linecap="round"/></g>';
  };

  /* ---------- the papers several rooms need ---------- */
  function lhead() {
    return '<div class="lhead"><svg viewBox="0 0 70 44" class="lmark">' + X.otter(2, 2, 1, '#1f6f78') + '</svg><div><b>Raddlestone District Council</b><span>Corn Exchange &middot; Market Square &middot; Raddlestone</span></div></div>';
  }
  X.LEAK = '<div class="lsheet leak">' + lhead() +
    '<p class="lref">Our ref: MS/PL/0917</p><p class="ldate">16 March 2026</p>' +
    '<p class="laddr">Mr P. Stallard<br>Stallard Homes Ltd<br>Station Road<br>Raddlestone</p>' +
    '<p>Dear Patrick,</p><p class="lsub">Raddle Meadows (26/0042/FUL)</p>' +
    '<p>Thank you for a most enjoyable lunch at the Plough on Thursday 13 March, and for your generous offer of help with my campaign next year.</p>' +
    '<p>Rest assured, I will see that the Committee looks favorably on your application when it meets in June. I do not expect any difficulty from the other members.</p>' +
    '<p>Please do not hesitate to reach out if there is anything further I can do.</p>' +
    '<p>Yours sincerely,</p><svg viewBox="0 0 120 44" class="lsig">' + X.signature(4, 2, 1) + '</svg>' +
    '<p class="lname">Councilor Sheila Pendry<br>Chair, Planning Committee</p><div class="lband">the printout stops here: the rest of our A4 sheet is blank</div></div>';
  X.GENUINE = '<div class="lsheet real">' + lhead() +
    '<p class="lref">Our ref: MS/PL/0917</p><p class="ldate">4 June 2026</p>' +
    '<p class="laddr">Mrs T. Rushton<br>3 Sluice Lane<br>Raddlestone</p>' +
    '<p>Dear Mrs Rushton,</p><p class="lsub">Raddle Meadows (26/0042/FUL)</p>' +
    '<p>Thank you for your letter of 27 May, and for the photographs of your kitchen in February 2024. I am sorry. Nobody should have to mop a river out of their house.</p>' +
    '<p>The Committee will decide the application on Tuesday 9 June. The new flood report will be in front of every member, and so will your letter. I cannot tell you how the Committee will vote, because I do not know, and it would be wrong of me to promise you anything.</p>' +
    '<p>If you would like to talk, ring my office and I will ring you back.</p>' +
    '<p>Yours sincerely,</p><svg viewBox="0 0 120 44" class="lsig">' + X.signature(4, 2, 1) + '</svg>' +
    '<p class="lname">Councillor Sheila Pendry<br>Chair, Planning Committee</p></div>';
  X.LEAKDOC = '<h4><span>The leak, as Tariq printed it</span><span>letter.pdf</span></h4>' + X.LEAK;
  X.GENDOC = '<h4><span>From the Record&rsquo;s file MEADOWS: a printout of Mrs Rushton&rsquo;s post on Raddlestone Chat, Saturday 6 June 2026, shared 214 times</span><span>&ldquo;NOT GOOD ENOUGH, SHEILA&rdquo;</span></h4>' + X.GENUINE;
  X.MAIL = '<h4>From: friend.of.the.meadows (a free email address, no name)<br>To: the Record&rsquo;s news inbox<br>Sent: Tuesday 3 November 2026, 01.52<br>Subject: Raddle Meadows. You should see this<br>Attached: letter.pdf</h4>' +
    '<p>I think you should see this. It was never meant to be seen.</p><p>I am sure you will do the right thing with it. Feel free to reach out.</p>';

  /* ---------- people, standing in a room: feet at 0 0, about 300 high ---------- */
  X.person = function (o) {
    var skin = o.skin || '#e8c4a2', hair = o.hair || '#3a2a1c', top = o.top || '#3d4f63', bot = o.bottom || '#2b3038', s = '', i;
    s += '<ellipse cx="0" cy="3" rx="52" ry="9" fill="#000" opacity="' + (o.shadow == null ? 0.32 : o.shadow) + '"/>';
    if (o.sit) s += '<path d="M-24 -96h22v-8h-22zM2 -96h22v-8h-22z" fill="' + bot + '"/><path d="M-26 -100h22l4 100h-18zM4 -100h22l-6 100h-18z" fill="' + bot + '"/>';
    else if (o.skirt) s += '<path d="M-16 0v-70h12v70zM4 0v-70h12v70z" fill="' + (o.tights || '#2e2a33') + '"/><path d="M-36 -62h72l-9 -66h-54z" fill="' + bot + '"/>';
    else s += '<path d="M-21 0v-112h18v112zM3 0v-112h18v112z" fill="' + bot + '"/>';
    s += '<path d="M-27 0h25v8h-29zM2 0h25l4 8h-29z" fill="' + (o.shoes || '#141516') + '"/>';
    var hem = o.long ? -60 : -98;
    s += '<path d="M-36 ' + hem + 'C-41 -150 -45 -212 -28 -232Q0 -246 28 -232C45 -212 41 -150 36 ' + hem + 'Z" fill="' + top + '"/>';
    s += '<path d="M-10 -239l10 26 10 -26z" fill="' + (o.shirt || '#ecebe4') + '"/>';
    if (o.tie) s += '<path d="M-3 -234h6l3 40l-6 8l-6 -8z" fill="' + o.tie + '"/>';
    if (o.cardi) { s += '<path d="M-10 -239L0 -196L10 -239" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="2.6"/><path d="M0 -196V' + hem + '" stroke="#000" stroke-opacity=".22" stroke-width="2"/>'; for (i = 0; i < 4; i++) s += '<circle cx="5" cy="' + (-184 + i * 22) + '" r="2.6" fill="#fff" opacity=".7"/>'; }
    if (o.jacket) s += '<path d="M0 -212V' + hem + '" stroke="#000" stroke-opacity=".28" stroke-width="2"/><path d="M-10 -239L-19 -208L0 -192L19 -208L10 -239" fill="none" stroke="#000" stroke-opacity=".28" stroke-width="2.6" stroke-linejoin="round"/>';
    if (o.apron) s += '<path d="M-26 -200h52v' + (Math.abs(hem) - 200 + 96) + 'h-52z" fill="' + o.apron + '"/><path d="M-26 -200Q0 -220 26 -200" stroke="' + o.apron + '" stroke-width="3" fill="none"/>';
    if (o.scarf) s += '<path d="M-20 -240Q0 -226 20 -240L22 -230Q0 -214 -22 -230Z" fill="' + o.scarf + '"/><path d="M8 -226l8 52l-10 2l-6 -50z" fill="' + o.scarf + '"/>';
    if (o.lanyard) s += '<path d="M-12 -238L0 -170L12 -238" fill="none" stroke="' + o.lanyard + '" stroke-width="3"/><rect x="-9" y="-172" width="18" height="24" rx="2" fill="#fff"/><rect x="-6" y="-168" width="12" height="5" fill="' + o.lanyard + '"/>';
    if (o.lit) s += '<path d="M28 -232C45 -212 41 -150 36 ' + hem + '" fill="none" stroke="' + o.lit + '" stroke-width="3.5" opacity=".55"/>';
    var la = o.armL || 'M-31 -222Q-49 -170 -42 -122', ra = o.armR || 'M31 -222Q49 -170 42 -122';
    s += '<path d="' + la + '" stroke="' + (o.sleeve || top) + '" stroke-width="15" fill="none" stroke-linecap="round"/><path d="' + ra + '" stroke="' + (o.sleeve || top) + '" stroke-width="15" fill="none" stroke-linecap="round"/>';
    s += '<circle cx="' + (o.handL ? o.handL[0] : -42) + '" cy="' + (o.handL ? o.handL[1] : -113) + '" r="7.5" fill="' + skin + '"/><circle cx="' + (o.handR ? o.handR[0] : 42) + '" cy="' + (o.handR ? o.handR[1] : -113) + '" r="7.5" fill="' + skin + '"/>';
    s += '<rect x="-7" y="-256" width="14" height="20" fill="' + skin + '"/><ellipse cx="0" cy="-275" rx="22.5" ry="25" fill="' + skin + '"/>';
    if (o.style === 'bob') s += '<path d="M-24 -270Q-27 -304 0 -305Q27 -304 24 -270L24 -248Q20 -262 18 -282Q0 -292 -18 -282Q-20 -262 -24 -248Z" fill="' + hair + '"/>';
    else if (o.style === 'short') s += '<path d="M-23 -276Q-25 -303 0 -304Q25 -303 23 -276Q14 -291 0 -291Q-14 -291 -23 -276Z" fill="' + hair + '"/>';
    else if (o.style === 'bald') s += '<path d="M-23 -262Q-26 -276 -22 -282Q-21 -270 -19 -258ZM23 -262Q26 -276 22 -282Q21 -270 19 -258Z" fill="' + hair + '"/>';
    else if (o.style === 'bun') s += '<path d="M-23 -274Q-25 -303 0 -304Q25 -303 23 -274Q12 -292 0 -292Q-12 -292 -23 -274Z" fill="' + hair + '"/><circle cx="0" cy="-308" r="11" fill="' + hair + '"/>';
    else if (o.style === 'crop') s += '<path d="M-23 -270Q-27 -306 0 -306Q27 -306 23 -270Q20 -286 0 -288Q-20 -286 -23 -270Z" fill="' + hair + '"/>';
    else if (o.style === 'curly') { for (i = 0; i < 7; i++) s += '<circle cx="' + (-21 + i * 7) + '" cy="' + (-292 - (i === 0 || i === 6 ? -6 : i === 1 || i === 5 ? 3 : 7)) + '" r="8.5" fill="' + hair + '"/>'; s += '<circle cx="-22" cy="-272" r="7" fill="' + hair + '"/><circle cx="22" cy="-272" r="7" fill="' + hair + '"/>'; }
    else if (o.style === 'long') s += '<path d="M-25 -272Q-28 -306 0 -306Q28 -306 25 -272L28 -226Q20 -236 19 -270Q0 -290 -19 -270Q-20 -236 -28 -226Z" fill="' + hair + '"/>';
    if (o.beanie) s += '<path d="M-24 -282Q-24 -314 0 -314Q24 -314 24 -282Z" fill="' + o.beanie + '"/><rect x="-25" y="-288" width="50" height="9" rx="3" fill="' + o.beanie + '" opacity=".8"/>';
    s += '<ellipse cx="-8" cy="-275" rx="2.3" ry="2.8" fill="#221b17"/><ellipse cx="8" cy="-275" rx="2.3" ry="2.8" fill="#221b17"/>' +
      '<path d="M1 -273q-3 7 1 9" stroke="#000" stroke-opacity=".28" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<path d="M-6 -259q6 ' + (o.smile == null ? 3 : o.smile) + ' 12 0" stroke="#7d3f34" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    if (o.beard) s += '<path d="M-22 -272Q-22 -242 0 -238Q22 -242 22 -272Q16 -256 0 -256Q-16 -256 -22 -272Z" fill="' + o.beard + '"/>';
    if (o.tache) s += '<path d="M-10 -263q10 -6 20 0q-10 3 -20 0z" fill="' + o.tache + '"/>';
    if (o.glasses) s += '<g fill="none" stroke="' + o.glasses + '" stroke-width="2"><rect x="-15" y="-281" width="12" height="10" rx="3"/><rect x="3" y="-281" width="12" height="10" rx="3"/><path d="M-3 -277h6"/></g>';
    if (o.extra) s += o.extra;
    return s;
  };
  X.PEOPLE = {
    rowena: { skin: '#efd0b8', hair: '#d8d2c8', style: 'crop', top: '#2f4a3e', bottom: '#2a2a2e', shirt: '#f1ebe0', jacket: 1, glasses: '#2a2a2a', scarf: '#b8452a' },
    tariq: { skin: '#b9845e', hair: '#1c1612', style: 'short', top: '#7a5a3a', bottom: '#2a2f3a', shirt: '#e6ecf2', beard: '#1c1612', lanyard: '#b8452a' },
    pendry: { skin: '#eccbb4', hair: '#8a5a3a', style: 'bob', top: '#5a2a3a', bottom: '#2a262e', shirt: '#f2ece2', cardi: 1, glasses: '#7a3a2a' },
    stringer: { skin: '#e9b89a', hair: '#9a8f86', style: 'short', top: '#3a3f4a', bottom: '#2a2d33', shirt: '#f0f0ee', tie: '#9a2a2a', jacket: 1, tache: '#8a7f76' },
    stallard: { skin: '#e3b796', hair: '#3a2c22', style: 'short', top: '#20406a', bottom: '#2a3038', shirt: '#dfe8f0', long: 1 },
    thea: { skin: '#f0d6c4', hair: '#f2efe8', style: 'bun', top: '#3a6a5a', bottom: '#3a3530', shirt: '#efe6d6', cardi: 1, skirt: 1, glasses: '#4a4a4a' },
    seb: { skin: '#f0cfb6', hair: '#6a4a2a', style: 'short', top: '#c8a03a', bottom: '#2f3540', shirt: '#2a2a2a', beanie: '#2a3a4a' },
    queenie: { skin: '#e8c7ae', hair: '#e8e2d8', style: 'curly', top: '#2a4a5a', bottom: '#2a2a2e', shirt: '#d8d2c4', apron: '#3a3a3a', glasses: '#9a6a2a' },
    pauline: { skin: '#d9a985', hair: '#3a2a20', style: 'bun', top: '#8a6a9a', bottom: '#33303a', shirt: '#f2ecf2', cardi: 1, lanyard: '#1f6f78', skirt: 1 },
    trish: { skin: '#f0c8aa', hair: '#b8562a', style: 'long', top: '#1d1d22', bottom: '#2a2a2e', shirt: '#f4f0e8', apron: '#7a1f1f' }
  };
  X.who = function (name, more) {
    var o = {}, k, base = X.PEOPLE[name];
    for (k in base) o[k] = base[k];
    for (k in (more || {})) o[k] = more[k];
    return X.person(o);
  };
  return X;
})();
