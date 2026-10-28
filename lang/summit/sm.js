/* Eventually - what every room of the story shares: a few sounds, small helpers, and the people, standing in the scene
   and as busts for the interviews. Loaded after engine.js. Nothing in here knows an answer.
   (No story text lives here: every paper and every line is in the room pages.) */
window.SM = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  X.sfx = {
    pin: function () { T({ f: 900, f2: 300, dur: 0.06, peak: 0.12 }); B({ dur: 0.03, f: 3200, q: 3, peak: 0.1 }); },
    stamp: function () { T({ f: 140, f2: 70, dur: 0.12, peak: 0.35 }); B({ type: 'lowpass', f: 700, dur: 0.06, peak: 0.2 }); },
    knob: function () { B({ dur: 0.025, f: 2400, q: 5, peak: 0.12 }); B({ dur: 0.02, f: 1600, q: 5, peak: 0.08, when: 0.04 }); },
    print: function () { for (var i = 0; i < 6; i++) B({ type: 'bandpass', f: 900 + (i % 2) * 500, q: 2, dur: 0.09, peak: 0.07, when: i * 0.11 }); },
    string: function () { T({ type: 'triangle', f: 330, f2: 300, dur: 0.25, peak: 0.07 }); },
    beep: function () { T({ type: 'square', f: 1250, dur: 0.07, peak: 0.04 }); }
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
  /* French, Spanish and German in running text: their own colour, never underlined */
  X.fl = function (s) { return '<!--nogloss--><span class="fl">' + s + '</span><!--/nogloss-->'; };
  X.minutesPlayed = function () {
    var st = ER.state();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((Date.now() - (st.t0 || Date.now())) / 60000));
  };
  /* a small state helper: told = {} kept in the room's flag */
  X.told = function (key) {
    var t = ER.flag(key) || {};
    return { has: function (k) { return !!t[k]; }, tell: function (k) { if (t[k]) return false; t[k] = 1; ER.flag(key, t); return true; } };
  };

  /* ---------- people, standing: feet at 0 0, about 300 high ---------- */
  var HAIR = {
    bob: 'M-26 -270q0 -36 26 -36t26 36l-3 30q-5 -34 -23 -36q-18 2 -23 36z',
    bun: 'M-24 -276q2 -29 24 -29t24 29q-10 -13 -24 -13t-24 13zM-11 -312a11 11 0 1 1 22 0a11 11 0 1 1 -22 0z',
    curls: 'M-30 -262q-8 -44 30 -48q38 4 30 48q-6 -6 -8 -22q-8 6 -22 4q-14 2 -22 -4q-2 16 -8 22z',
    pony: 'M-24 -276q2 -29 24 -29t24 29q-10 -13 -24 -13t-24 13zM20 -294q22 4 18 50q-8 -8 -9 -26q-5 -10 -11 -12z',
    short: 'M-24 -276q2 -29 24 -29t24 29q-10 -13 -24 -13t-24 13z',
    bald: 'M-25 -270q-2 -12 4 -18M25 -270q2 -12 -4 -18'
  };
  X.person = function (o) {
    var skin = o.skin || '#e8c4a2', hair = o.hair || '#3a2a1c', top = o.top || '#2e6b8f', bot = o.bottom || '#2c2c33', s = '', k = o.big ? 1.12 : 1;
    s += '<ellipse cx="0" cy="2" rx="' + (46 * k) + '" ry="8" fill="#000" opacity="' + (o.shadow == null ? 0.25 : o.shadow) + '"/>';
    if (o.legs === 'skirt') s += '<path d="M-16 0v-60h12v60zM4 0v-60h12v60z" fill="' + (o.stock || '#2a2a30') + '"/><path d="M-36 -54h72l-8 -86h-56z" fill="' + bot + '"/>';
    else s += '<path d="M-20 0v-100h17v100zM3 0v-100h17v100z" fill="' + bot + '"/>';
    s += '<path d="M-25 0h23v7h-27zM2 0h23v7h-23z" fill="' + (o.shoes || '#2a2420') + '"/>';
    s += '<path d="M' + (-38 * k) + ' -94q' + (-7 * k) + ' -138 ' + (38 * k) + ' -146t' + (38 * k) + ' 146z" fill="' + top + '"/>';
    if (o.cardi) s += '<path d="M-38 -94q-7 -138 38 -146q-14 60 -10 146zM38 -94q7 -138 -38 -146q14 60 10 146z" fill="' + o.cardi + '"/>';
    if (o.jacket) s += '<path d="M' + (-40 * k) + ' -92q' + (-7 * k) + ' -140 ' + (40 * k) + ' -148q-16 30 -14 70l-6 78zM' + (40 * k) + ' -92q' + (7 * k) + ' -140 ' + (-40 * k) + ' -148q16 30 14 70l6 78z" fill="' + o.jacket + '"/>';
    if (o.tie) s += '<path d="M0 -232l-6 8 6 70 6 -70z" fill="' + o.tie + '"/>';
    if (o.mac) s += '<path d="M-40 -60q-8 -170 40 -180t40 180z" fill="' + o.mac + '"/><path d="M0 -236v176" stroke="rgba(0,0,0,.25)" stroke-width="3"/><path d="M-36 -130h72" stroke="rgba(0,0,0,.2)" stroke-width="5"/>';
    if (o.scarf) s += '<path d="M-18 -240q18 14 36 0l4 12q-22 16 -44 0zM8 -232l10 60h-14l-4 -56z" fill="' + o.scarf + '"/>';
    if (o.lanyard) s += '<path d="M-12 -236l12 70 12 -70" stroke="' + o.lanyard + '" stroke-width="3" fill="none"/><rect x="-9" y="-170" width="18" height="24" rx="2" fill="#fff" stroke="#888"/>';
    if (o.pearls) s += '<path d="M-14 -238q14 12 28 0" stroke="#f4f0e6" stroke-width="4" stroke-dasharray="1 4" stroke-linecap="round" fill="none"/>';
    s += '<path d="M' + (-34 * k) + ' -204q-15 40 -5 88M' + (34 * k) + ' -204q15 40 5 88" stroke="' + (o.sleeve || o.jacket || o.cardi || o.mac || top) + '" stroke-width="15" fill="none" stroke-linecap="round"/>' +
      '<circle cx="' + (-39 * k) + '" cy="-112" r="8" fill="' + skin + '"/><circle cx="' + (39 * k) + '" cy="-112" r="8" fill="' + skin + '"/>';
    s += '<rect x="-7" y="-256" width="14" height="20" fill="' + skin + '"/><circle cx="0" cy="-274" r="24" fill="' + skin + '"/>';
    if (o.style && HAIR[o.style]) s += '<path d="' + HAIR[o.style] + '" fill="' + (o.style === 'bald' ? 'none' : hair) + '"' + (o.style === 'bald' ? ' stroke="' + hair + '" stroke-width="6" stroke-linecap="round"' : '') + '/>';
    s += '<path d="M-11 -273h7M4 -273h7" stroke="#2a2420" stroke-width="2.6" stroke-linecap="round"/><path d="M-6 -260q6 ' + (o.smile == null ? 4 : o.smile) + ' 12 0" stroke="#8c4a3c" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    if (o.glasses) s += '<rect x="-16" y="-279" width="13" height="10" rx="2" fill="none" stroke="' + o.glasses + '" stroke-width="2"/><rect x="3" y="-279" width="13" height="10" rx="2" fill="none" stroke="' + o.glasses + '" stroke-width="2"/><path d="M-3 -275h6" stroke="' + o.glasses + '" stroke-width="2"/>';
    if (o.phones) s += '<path d="M-27 -276q0 -38 27 -38t27 38" stroke="#1a1a1a" stroke-width="5" fill="none"/><rect x="-32" y="-284" width="10" height="20" rx="4" fill="#1a1a1a"/><rect x="22" y="-284" width="10" height="20" rx="4" fill="#1a1a1a"/>';
    if (o.cup) s += '<g transform="translate(40 -118)"><path d="M-7 -12h14l-2 18h-10z" fill="' + o.cup + '"/><path d="M-8 -12h16" stroke="#fff" stroke-width="2"/></g>';
    if (o.folder) s += '<g transform="translate(-36 -150) rotate(-8)"><rect x="-14" y="-30" width="34" height="46" rx="2" fill="' + o.folder + '"/><rect x="-10" y="-34" width="26" height="6" fill="#f4f2ea"/></g>';
    if (o.papers) s += '<g transform="translate(40 -122) rotate(10)"><rect x="-12" y="-20" width="26" height="34" fill="#fdfdf8" stroke="#aaa"/><path d="M-7 -12h16M-7 -6h16M-7 0h12" stroke="#888" stroke-width="1.5"/></g>';
    if (o.extra) s += o.extra;
    return s;
  };
  X.PEOPLE = {
    morag: { skin: '#f2d6c4', hair: '#a89a90', style: 'bob', top: '#efe8dc', cardi: '#5e4a78', bottom: '#30323c', legs: 'skirt', glasses: '#8a2a2a', lanyard: '#2a5a9a', smile: 2 },
    udo: { skin: '#efd0b6', hair: '#b8986a', style: 'short', top: '#f0f2f6', jacket: '#3a404c', tie: '#2a5a9a', bottom: '#3a404c', folder: '#c8382e', smile: 0 },
    otterburn: { big: 1, skin: '#e8b898', hair: '#e8e4dc', style: 'bald', top: '#efe6d8', jacket: '#6a5a48', tie: '#8a2a2a', bottom: '#5a4c3c', smile: 3, papers: 1 },
    mischa: { skin: '#c89a78', hair: '#2a1a14', style: 'curls', top: '#f0ece0', cardi: '#c8962a', bottom: '#2a3550', smile: 6, shoes: '#e8e4dc' },
    noemie: { skin: '#f0d4c0', hair: '#1a1410', style: 'pony', top: '#2a2a33', mac: '#b8864a', scarf: '#b8322a', bottom: '#22242c', smile: 0, cup: '#e8e4dc' },
    rosine: { skin: '#e2b896', hair: '#7a3a1a', style: 'bun', top: '#f2eee6', jacket: '#666a74', bottom: '#666a74', legs: 'skirt', stock: '#3a3a40', smile: 1, shoes: '#3a3a40' },
    ximena: { skin: '#d8a880', hair: '#d4d0cc', style: 'bob', top: '#f4f0e8', jacket: '#1f2f55', bottom: '#1f2f55', legs: 'skirt', glasses: '#b8902a', pearls: 1, smile: 2 },
    rouvier: { skin: '#f2d8c8', hair: '#4a2a1a', style: 'bob', top: '#f4f0ea', jacket: '#a8323a', bottom: '#2a2a33', legs: 'skirt', smile: 1 }
  };
  X.who = function (name, more) {
    var o = {}, k, base = X.PEOPLE[name];
    for (k in base) o[k] = base[k];
    for (k in (more || {})) o[k] = more[k];
    return X.person(o);
  };

  /* ---------- busts for the interviews (240 x 300) ---------- */
  var BUST = {
    morag: { bg: '#5e4a78', skin: '#f2d6c4', hair: '#a89a90', top: '#5e4a78', shirt: '#efe8dc', bob: 1, glasses: '#8a2a2a', old: 1, phones: 1 },
    udo: { bg: '#3a404c', skin: '#efd0b6', hair: '#b8986a', top: '#3a404c', shirt: '#f0f2f6', tie: '#2a5a9a' },
    otterburn: { bg: '#6a5a48', skin: '#e8b898', hair: '#e8e4dc', top: '#6a5a48', shirt: '#efe6d8', tie: '#8a2a2a', bald: 1, old: 1 },
    mischa: { bg: '#c8962a', skin: '#c89a78', hair: '#2a1a14', top: '#c8962a', shirt: '#f0ece0', curls: 1 },
    noemie: { bg: '#2a3a5a', skin: '#f0d4c0', hair: '#1a1410', top: '#b8864a', scarf: '#b8322a', pony: 1 },
    rosine: { bg: '#666a74', skin: '#e2b896', hair: '#7a3a1a', top: '#666a74', shirt: '#f2eee6', bun: 1 },
    ximena: { bg: '#1f2f55', skin: '#d8a880', hair: '#d4d0cc', top: '#1f2f55', shirt: '#f4f0e8', bob: 1, glasses: '#b8902a', old: 1, pearls: 1 },
    rouvier: { bg: '#a8323a', skin: '#f2d8c8', hair: '#4a2a1a', top: '#a8323a', shirt: '#f4f0ea', bob: 1 }
  };
  X.face = function (name, mood) {
    var o = BUST[name], s = '', sm = mood === 'smile' ? 10 : mood === 'cross' ? -6 : mood === 'worried' ? -2 : 3;
    s += '<svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg"><rect x="-200" y="-200" width="640" height="500" fill="' + o.bg + '"/><path d="M-20 300L120 -40L260 300z" fill="#fff" opacity=".06"/>';
    s += '<path d="M14 300q8 -96 106 -104q98 8 106 104z" fill="' + o.top + '"/>';
    if (o.shirt) s += '<path d="M92 200l28 60 28 -60q-28 -10 -56 0z" fill="' + o.shirt + '"/>';
    if (o.tie) s += '<path d="M120 206l-9 12 9 70 9 -70z" fill="' + o.tie + '"/>';
    if (o.scarf) s += '<path d="M78 200q42 26 84 0l6 22q-48 30 -96 0zM130 216l14 70h-20l-6 -64z" fill="' + o.scarf + '"/>';
    if (o.pearls) s += '<path d="M96 204q24 20 48 0" stroke="#f4f0e6" stroke-width="6" stroke-dasharray="1 7" stroke-linecap="round" fill="none"/>';
    s += '<rect x="104" y="164" width="32" height="36" fill="' + o.skin + '"/>';
    if (o.bob) s += '<path d="M56 124q-4 -80 64 -82t64 82l-6 52q-8 -74 -58 -80q-50 6 -58 80z" fill="' + o.hair + '"/>';
    if (o.curls) s += '<path d="M50 140q-20 -110 70 -110t70 110q-10 -10 -14 -30q-8 10 -20 4q-14 8 -36 4q-22 4 -36 -4q-12 6 -20 -4q-4 20 -14 30z" fill="' + o.hair + '"/>';
    if (o.pony) s += '<path d="M168 70q48 10 36 110q-14 -16 -16 -50q-8 -30 -20 -40z" fill="' + o.hair + '"/>';
    s += '<ellipse cx="120" cy="120" rx="54" ry="62" fill="' + o.skin + '"/><ellipse cx="66" cy="126" rx="8" ry="13" fill="' + o.skin + '"/><ellipse cx="174" cy="126" rx="8" ry="13" fill="' + o.skin + '"/>';
    if (o.bob) s += '<path d="M62 112q4 -62 58 -64t58 64q-22 -32 -58 -34t-58 34z" fill="' + o.hair + '"/>';
    else if (o.curls) s += '<path d="M60 112q2 -64 60 -66t60 66q-10 -14 -22 -24q-10 10 -38 8q-28 2 -38 -8q-12 10 -22 24z" fill="' + o.hair + '"/>';
    else if (o.bald) s += '<path d="M66 128q-6 -30 8 -46M174 128q6 -30 -8 -46" stroke="' + o.hair + '" stroke-width="12" fill="none" stroke-linecap="round"/>';
    else s += '<path d="M64 116q0 -66 56 -68t56 68q-14 -30 -56 -32t-56 32z" fill="' + o.hair + '"/>';
    if (o.bun) s += '<circle cx="120" cy="50" r="22" fill="' + o.hair + '"/>';
    s += '<path d="M90 106q10 -6 20 0M130 106q10 -6 20 0" stroke="#3a2a20" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="100" cy="122" rx="5" ry="6.5" fill="#2a2420"/><ellipse cx="140" cy="122" rx="5" ry="6.5" fill="#2a2420"/><circle cx="102" cy="120" r="1.6" fill="#fff"/><circle cx="142" cy="120" r="1.6" fill="#fff"/>' +
      '<path d="M120 128q-5 14 2 18" stroke="#a8745a" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    s += '<path d="M104 156q16 ' + sm + ' 32 0" stroke="#8c3a32" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
    if (o.old) s += '<path d="M84 98q8 -3 16 -1M140 97q8 -2 16 1M86 138q6 4 12 3M142 141q6 1 12 -3" stroke="#a07a60" stroke-width="2" fill="none" opacity=".6"/>';
    s += '<ellipse cx="88" cy="146" rx="9" ry="5" fill="#e88a7a" opacity=".3"/><ellipse cx="152" cy="146" rx="9" ry="5" fill="#e88a7a" opacity=".3"/>';
    if (o.glasses) s += '<g fill="none" stroke="' + o.glasses + '" stroke-width="3.5"><rect x="83" y="110" width="32" height="24" rx="5"/><rect x="125" y="110" width="32" height="24" rx="5"/><path d="M115 120h10M83 118l-16 -4M157 118l16 -4"/></g>';
    if (o.phones) s += '<path d="M58 118q0 -96 62 -96t62 96" stroke="#15151a" stroke-width="10" fill="none"/><rect x="46" y="104" width="22" height="42" rx="9" fill="#15151a"/><rect x="172" y="104" width="22" height="42" rx="9" fill="#15151a"/>';
    return s + '</svg>';
  };
  return X;
})();
