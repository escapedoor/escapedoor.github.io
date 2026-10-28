/* Passed for Press - what every room of the story shares: a few sounds, small helpers, the people (standing in the
   scene, and as busts for the interviews), Folio the cat, and the lift (the little dumb waiter that carries notes
   between the floors of Dace House). Loaded after engine.js. Nothing in here knows an answer. */
window.RT = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  X.sfx = {
    tile: function () { B({ dur: 0.03, f: 2400, q: 3, peak: 0.12 }); T({ f: 520, dur: 0.05, peak: 0.05 }); },
    slip: function () { B({ type: 'highpass', f: 3000, f2: 5200, dur: 0.12, peak: 0.06, a: 0.02 }); },
    pin: function () { B({ dur: 0.02, f: 5200, q: 5, peak: 0.1 }); T({ f: 900, f2: 700, dur: 0.05, peak: 0.05 }); },
    pencil: function () { B({ type: 'bandpass', f: 4200, f2: 2600, q: 4, dur: 0.16, peak: 0.07, a: 0.01 }); },
    lift: function () { T({ type: 'triangle', f: 1180, dur: 0.6, peak: 0.07 }); T({ type: 'triangle', f: 1770, dur: 0.4, peak: 0.03, when: 0.02 }); B({ type: 'lowpass', f: 500, dur: 0.3, peak: 0.15, when: 0.25 }); },
    stamp: function () { T({ f: 140, f2: 70, dur: 0.16, peak: 0.45 }); B({ type: 'lowpass', f: 1200, dur: 0.06, peak: 0.3 }); },
    mew: function () { T({ type: 'triangle', f: 700, f2: 1050, dur: 0.18, peak: 0.05, a: 0.04 }); T({ type: 'triangle', f: 1050, f2: 620, dur: 0.28, peak: 0.05, when: 0.17 }); }
  };
  /* a lock opens without leaving the room: the music answers in the room's key, or three plain notes */
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };
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
    var st = ER.state();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((Date.now() - (st.t0 || Date.now())) / 60000));
  };
  /* a note that comes up in the lift from the press room, in Dr Fanshawe's hand */
  X.note = function (html, id, title, done) {
    X.sfx.lift();
    ER.read({ html: '<h4>Up in the lift, from the press room</h4>' + html + '<p class="sig">C.F.</p>', cls: 'cf', clue: id ? { id: id, title: title, kind: 'From the press room' } : null, done: done });
  };

  /* ---------- the eight new Word Stories, as they stand in the proofs tonight ---------- */
  X.STORIES = [
    ['window', 'The Vikings&rsquo; wind-eye', '<i>Window</i> comes from Old Norse <i>vindauga</i>: <i>vindr</i> &lsquo;wind&rsquo; + <i>auga</i> &lsquo;eye&rsquo;. It was a hole in the roof or the wall that let the air in and the smoke out. First known use: early 1200s.'],
    ['sky', 'When the sky was a cloud', 'In Old Norse, <i>sk&yacute;</i> meant &lsquo;cloud&rsquo;. English borrowed it about 1200 and used it for the whole sky, and the Old English word for it, <i>heofon</i>, which became <i>heaven</i>, came to mean, more and more, the home of God.'],
    ['skirt', 'One word, two doors', 'Old English <i>scyrte</i> became <i>shirt</i>. Old Norse <i>skyrta</i>, the same word in the Vikings&rsquo; mouths, became <i>skirt</i>. Two words from one old word are called a doublet.'],
    ['sirloin', 'Arise, Sir Loin!', '<i>Sirloin</i> comes from <i>sir</i>, the title of a knight, + <i>loin</i>. At a feast in Lancashire in 1617, King James I was so pleased with a loin of beef that he drew his sword and knighted it. First known use: 1617.'],
    ['posh', 'Nobody knows', '<i>Posh</i>, meaning smart and expensive, is first found in 1914. Where it came from is not known. The famous story that it stands for &lsquo;Port Out, Starboard Home&rsquo; has no evidence behind it.'],
    ['shampoo', 'Press!', 'From Hindi <i>ch&#257;mpo</i>, &lsquo;press!&rsquo;, from <i>ch&#257;mpn&#257;</i>, to press or knead. In English it first meant a massage (1762). Washing the hair came about a hundred years later.'],
    ['ketchup', 'First, a fish sauce', '<i>Ketchup</i> probably comes from <i>k&ecirc;-tsiap</i>, a fish sauce in Hokkien, a Chinese language of the south coast, perhaps by way of Malay. English had it by 1690, spelt <i>catchup</i>. Tomatoes came much later.'],
    ['kindergarten', 'A garden of children', '<i>Kindergarten</i> is German: <i>Kinder</i> &lsquo;children&rsquo; + <i>Garten</i> &lsquo;garden&rsquo;. Friedrich Fr&ouml;bel gave the name to his school for small children in 1840, and English took it in the 1850s.']
  ];
  X.storiesHtml = function () {
    return '<h4>The thirteenth edition &middot; the eight new Word Stories, as proofed</h4><div class="ws">' + X.STORIES.map(function (s) {
      return '<div><b>' + s[0] + '</b><em>' + s[1] + '</em><p>' + s[2] + '</p></div>';
    }).join('') + '</div>';
  };

  /* ---------- people, standing: feet at 0 0, about 300 high ---------- */
  var HAIR = {
    bob: 'M-25 -272q0 -34 25 -34t25 34l-2 26q-4 -30 -23 -32q-19 2 -23 32z',
    puff: 'M-24 -278q0 -30 24 -30t24 30q-10 -12 -24 -12t-24 12zM-22 -306a22 18 0 1 1 44 0a22 18 0 1 1 -44 0z',
    short: 'M-24 -276q2 -29 24 -29t24 29q-10 -13 -24 -13t-24 13z',
    bald: 'M-24 -268q-3 -18 7 -28q-3 12 -1 24zM24 -268q3 -18 -7 -28q3 12 1 24z'
  };
  X.person = function (o) {
    var skin = o.skin || '#e8c4a2', hair = o.hair || '#3a2a1c', top = o.top || '#2e6b8f', bot = o.bottom || '#2c2c33', s = '';
    s += '<ellipse cx="0" cy="2" rx="46" ry="8" fill="#000" opacity=".25"/>';
    if (o.legs === 'skirt') s += '<path d="M-16 0v-60h12v60zM4 0v-60h12v60z" fill="' + (o.stock || '#3a3a44') + '"/><path d="M-36 -54h72l-8 -86h-56z" fill="' + bot + '"/>';
    else s += '<path d="M-20 0v-100h17v100zM3 0v-100h17v100z" fill="' + bot + '"/>';
    s += '<path d="M-25 0h23v7h-27zM2 0h23v7h-23z" fill="' + (o.shoes || '#2a2420') + '"/>';
    s += '<path d="M-38 -94q-7 -138 38 -146t38 146z" fill="' + top + '"/>';
    if (o.cardi) s += '<path d="M-38 -94q-7 -138 38 -146v146z" fill="' + o.cardi + '" opacity=".55"/><path d="M0 -240v146" stroke="#2a2a2a" stroke-width="1.5" opacity=".4"/>';
    if (o.apron) s += '<path d="M-28 -96v-104h56v104z" fill="' + o.apron + '"/><path d="M-28 -200l-4 -36M28 -200l4 -36" stroke="' + o.apron + '" stroke-width="4"/><path d="M-16 -150q6 -4 12 2M6 -132q8 -6 14 0" stroke="#1a1a1a" stroke-width="3" opacity=".5" fill="none"/>';
    if (o.pencils) s += '<path d="M-24 -196l6 -26M-16 -196l3 -24" stroke="#e2b42a" stroke-width="4"/><path d="M-18 -222l1 -4M-13 -220l1 -4" stroke="#3a2a1a" stroke-width="3"/>';
    s += '<path d="M-34 -204q-15 40 -5 88M34 -204q15 40 5 88" stroke="' + (o.sleeve || top) + '" stroke-width="15" fill="none" stroke-linecap="round"/>' +
      '<circle cx="-39" cy="-112" r="8" fill="' + skin + '"/><circle cx="39" cy="-112" r="8" fill="' + skin + '"/>';
    s += '<rect x="-7" y="-256" width="14" height="20" fill="' + skin + '"/><circle cx="0" cy="-274" r="24" fill="' + skin + '"/>';
    if (o.style && HAIR[o.style]) s += '<path d="' + HAIR[o.style] + '" fill="' + hair + '"/>';
    s += '<path d="M-11 -273h7M4 -273h7" stroke="#2a2420" stroke-width="2.6" stroke-linecap="round"/><path d="M-6 -260q6 ' + (o.smile == null ? 4 : o.smile) + ' 12 0" stroke="#7c3a30" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    if (o.beard) s += '<path d="M-22 -270q-2 34 22 40q24 -6 22 -40q-6 14 -22 14t-22 -14z" fill="' + o.beard + '"/><path d="M-6 -259q6 3 12 0" stroke="#5a4a40" stroke-width="2" fill="none"/>';
    if (o.glasses) s += '<circle cx="-8" cy="-273" r="7" fill="none" stroke="' + o.glasses + '" stroke-width="2"/><circle cx="8" cy="-273" r="7" fill="none" stroke="' + o.glasses + '" stroke-width="2"/>';
    if (o.chain) s += '<path d="M-15 -272q-8 30 15 40q23 -10 15 -40" stroke="#d9b44a" stroke-width="1.4" fill="none" stroke-dasharray="2 2"/>';
    if (o.extra) s += o.extra;
    return s;
  };
  X.PEOPLE = {
    celia: { skin: '#f0d4bc', hair: '#c9c6c0', style: 'bob', top: '#5a6a5a', cardi: '#3a4a3a', bottom: '#2c2c33', legs: 'skirt', stock: '#3a3a44', glasses: '#3a2a20', chain: 1, pencils: 1, smile: 2 },
    ayo: { skin: '#6a4430', hair: '#1a1210', style: 'puff', top: '#d9a42a', bottom: '#2c3040', pencils: 1, smile: 6 },
    eamon: { skin: '#eac0a0', hair: '#9a8a7a', style: 'bald', top: '#4a5a6a', bottom: '#2a2a30', apron: '#2e2e34', beard: '#a89a8a', smile: 5 }
  };
  X.who = function (name, more) {
    var o = {}, k, base = X.PEOPLE[name];
    for (k in base) o[k] = base[k];
    for (k in (more || {})) o[k] = more[k];
    return '<rect x="-60" y="-330" width="120" height="340" fill="transparent"/>' + X.person(o);
  };

  /* ---------- the same people as busts, for the interviews (240 x 300) ---------- */
  var BUST = {
    celia: { bg: '#3a4a3a', skin: '#f0d4bc', hair: '#c9c6c0', top: '#5a6a5a', bob: 1, glasses: '#3a2a20', chain: 1, old: 1 },
    ayo: { bg: '#8a5a12', skin: '#6a4430', hair: '#1a1210', top: '#d9a42a', puff: 1, pencil: 1 },
    eamon: { bg: '#2e3a46', skin: '#eac0a0', hair: '#9a8a7a', top: '#4a5a6a', bald: 1, beard: '#a89a8a', apron: '#2e2e34', old: 1 }
  };
  X.face = function (name, mood) {
    var o = BUST[name], s = '', sm = mood === 'smile' ? 10 : mood === 'cross' ? -6 : 3;
    s += '<svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg"><rect x="-200" y="-200" width="640" height="500" fill="' + o.bg + '"/><circle cx="196" cy="54" r="80" fill="#fff" opacity=".08"/>';
    s += '<path d="M14 300q8 -96 106 -104q98 8 106 104z" fill="' + o.top + '"/>';
    if (o.apron) s += '<path d="M70 300v-84q50 -14 100 0v84z" fill="' + o.apron + '"/>';
    s += '<rect x="104" y="164" width="32" height="36" fill="' + o.skin + '"/>';
    if (o.bob) s += '<path d="M58 120q-4 -76 62 -78t62 78l-6 50q-8 -70 -56 -76q-48 6 -56 76z" fill="' + o.hair + '"/>';
    if (o.puff) s += '<ellipse cx="120" cy="40" rx="50" ry="36" fill="' + o.hair + '"/>';
    s += '<ellipse cx="120" cy="120" rx="54" ry="62" fill="' + o.skin + '"/><ellipse cx="66" cy="126" rx="8" ry="13" fill="' + o.skin + '"/><ellipse cx="174" cy="126" rx="8" ry="13" fill="' + o.skin + '"/>';
    if (o.bald) s += '<path d="M64 118q-2 -26 10 -40q-2 20 2 40zM176 118q2 -26 -10 -40q2 20 -2 40z" fill="' + o.hair + '"/>';
    else if (o.bob) s += '<path d="M64 110q4 -60 56 -62t56 62q-20 -30 -56 -32t-56 32z" fill="' + o.hair + '"/>';
    else s += '<path d="M64 112q0 -62 56 -64t56 64q-14 -28 -56 -30t-56 30z" fill="' + o.hair + '"/>';
    s += '<path d="M90 106q10 -6 20 0M130 106q10 -6 20 0" stroke="#2a1a14" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="100" cy="122" rx="5" ry="6.5" fill="#1a1410"/><ellipse cx="140" cy="122" rx="5" ry="6.5" fill="#1a1410"/><circle cx="102" cy="120" r="1.6" fill="#fff"/><circle cx="142" cy="120" r="1.6" fill="#fff"/>' +
      '<path d="M120 128q-5 14 2 18" stroke="' + (o.puff ? '#4a2a1a' : '#b07a5a') + '" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    if (o.beard) s += '<path d="M66 128q-4 70 54 76q58 -6 54 -76q-14 34 -54 34t-54 -34z" fill="' + o.beard + '"/><path d="M106 160q14 ' + (sm / 2) + ' 28 0" stroke="#6a5a50" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
    else s += '<path d="M104 156q16 ' + sm + ' 32 0" stroke="#7c3a30" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
    if (o.old) s += '<path d="M84 98q8 -3 16 -1M140 97q8 -2 16 1M86 136q6 4 12 3M142 139q6 1 12 -3" stroke="#a07a60" stroke-width="2" fill="none" opacity=".6"/>';
    if (o.glasses) s += '<g fill="none" stroke="' + o.glasses + '" stroke-width="3"><circle cx="100" cy="122" r="15"/><circle cx="140" cy="122" r="15"/><path d="M115 120h10M85 118l-18 -4M155 118l18 -4"/></g>';
    if (o.chain) s += '<path d="M68 122q-6 70 52 80q58 -10 52 -80" stroke="#d9b44a" stroke-width="2" fill="none" stroke-dasharray="3 3"/>';
    if (o.pencil) s += '<path d="M168 112l30 -34" stroke="#e2b42a" stroke-width="7" stroke-linecap="round"/><path d="M196 80l6 -7" stroke="#3a2a1a" stroke-width="5" stroke-linecap="round"/>';
    return s + '</svg>';
  };

  /* Folio, the dictionary's cat: grey tabby, white bib. Sitting, about 70 high, feet at 0 0 (asleep: lying down) */
  X.cat = function (asleep) {
    if (asleep) return '<g class="cat"><ellipse cx="0" cy="-16" rx="44" ry="18" fill="#8a8a8a"/><path d="M-30 -24q10 -8 22 0M-6 -26q10 -8 20 0M16 -22q8 -6 16 0" stroke="#5a5a5a" stroke-width="4" fill="none"/>' +
      '<circle cx="-40" cy="-24" r="15" fill="#8a8a8a"/><path d="M-52 -34l3 -12 8 8zM-36 -38l6 -10 4 11z" fill="#8a8a8a"/><path d="M-46 -24q4 3 8 0" stroke="#3a3a3a" stroke-width="1.6" fill="none"/>' +
      '<path id="tail" d="M42 -10q20 4 14 18" stroke="#8a8a8a" stroke-width="8" fill="none" stroke-linecap="round"/></g>';
    return '<g class="cat"><path d="M-22 0q-6 -40 10 -56q-6 -16 2 -26l8 10q6 -2 12 0l8 -10q8 10 2 26q16 16 10 56z" fill="#8a8a8a"/>' +
      '<path d="M-12 -30q12 10 24 0v24h-24z" fill="#f2efe6"/><path d="M-16 -48h8M8 -48h8M-14 -70l6 4M14 -70l-6 4" stroke="#5a5a5a" stroke-width="3"/>' +
      '<path id="tail" d="M20 -4q30 -2 30 -26" stroke="#8a8a8a" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<circle cx="-5" cy="-62" r="2.4" fill="#d8e84a"/><circle cx="7" cy="-62" r="2.4" fill="#d8e84a"/><path d="M-8 -6v6M8 -6v6" stroke="#4a4a4a" stroke-width="2"/></g>';
  };
  return X;
})();
