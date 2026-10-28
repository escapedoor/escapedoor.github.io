/* Mostly Paper - what every room of the story shares: a few sounds, small helpers, the things that come down the
   belt (drawn small, for the puzzles), and the people (standing in the scene, and as busts for the interviews).
   Loaded after engine.js. Nothing in here knows an answer. */
window.SR = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds, through the engine so that the sound button switches them. Nothing that beeps or rings:
     on a sorting line a beep means a fault, and a player would go looking for it. ---------- */
  X.sfx = {
    tag: function () { B({ type: 'highpass', f: 2600, dur: 0.07, peak: 0.08, a: 0.005 }); T({ f: 640, f2: 520, dur: 0.05, peak: 0.04 }); },
    puff: function () { B({ type: 'bandpass', f: 1500, f2: 500, q: 0.8, dur: 0.24, peak: 0.13, a: 0.01 }); },
    tock: function () { T({ f: 420, f2: 300, dur: 0.06, peak: 0.12 }); B({ dur: 0.03, f: 2400, q: 3, peak: 0.07 }); },
    shh: function () { B({ type: 'highpass', f: 3200, dur: 0.2, peak: 0.05, a: 0.05 }); },
    card: function () { B({ type: 'highpass', f: 2400, dur: 0.1, peak: 0.07, a: 0.01 }); },
    thud: function () { T({ f: 90, f2: 48, dur: 0.26, peak: 0.34 }); B({ type: 'lowpass', f: 500, dur: 0.12, peak: 0.18 }); },
    dial: function () { B({ dur: 0.018, f: 3800, q: 4, peak: 0.1 }); }
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
  X.mine = function (id, title, html, quiet) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'sr-mine', 'Your notes', quiet); };
  X.terms = function (list) {
    var G = window.GLOSS || [];
    list.forEach(function (w) { for (var i = 0; i < G.length; i++) if (G[i][0] === w) { ER.addWord(G[i][0], G[i][1]); break; } });
  };
  X.minutesPlayed = function () {
    var st = ER.state();
    if (st.fin && st.fin.secs) return Math.max(1, Math.round(st.fin.secs / 60));
    return Math.max(1, Math.round((Date.now() - (st.t0 || Date.now())) / 60000));
  };
  /* rain drawn as short slanting strokes inside a box of the scene (CSS moves them: no animation frames) */
  X.rain = function (x, y, w, h, n, col) {
    var s = '', i, rx, ry;
    for (i = 0; i < n; i++) {
      rx = x + ((i * 97) % w); ry = y + ((i * 53) % h);
      s += '<path class="drop d' + (i % 4) + '" d="M' + rx + ' ' + ry + 'l-7 26" stroke="' + (col || '#c9d6dc') + '" stroke-width="2" stroke-linecap="round"/>';
    }
    return s;
  };

  /* ---------- the things on the belt, drawn in a 120 x 100 box ---------- */
  var ICON = {
    canSilverCrushed: '<path d="M22 64q8 -22 30 -26t46 6l2 18q-6 18 -38 22t-40 -6z" fill="#cfd6dc" stroke="#7d8a94" stroke-width="3"/><path d="M34 58q18 -12 52 -6M30 70q24 6 60 -4" stroke="#f4f8fb" stroke-width="4" fill="none"/><path d="M52 44l10 18 12 -16" stroke="#8a969f" stroke-width="3" fill="none"/>',
    canSilverRound: '<rect x="38" y="16" width="44" height="72" rx="8" fill="#cfd6dc" stroke="#7d8a94" stroke-width="3"/><rect x="44" y="24" width="8" height="56" fill="#f4f8fb"/><ellipse cx="60" cy="18" rx="20" ry="5" fill="#e6ebef" stroke="#7d8a94" stroke-width="2"/>',
    canBlueCrushed: '<path d="M18 66q10 -18 36 -22t50 8l0 14q-10 16 -44 18t-42 -8z" fill="#3c6fb2" stroke="#244a7c" stroke-width="3"/><path d="M34 62q12 -8 22 0t22 -2" stroke="#e8f0fa" stroke-width="4" fill="none"/>',
    canBlueRound: '<rect x="38" y="16" width="44" height="72" rx="8" fill="#3c6fb2" stroke="#244a7c" stroke-width="3"/><path d="M42 54q9 -7 18 0t18 0" stroke="#e8f0fa" stroke-width="4" fill="none"/><ellipse cx="60" cy="18" rx="20" ry="5" fill="#9aa6b0" stroke="#244a7c" stroke-width="2"/>',
    canRedCrushed: '<path d="M20 64q10 -20 34 -24t48 8l0 14q-8 18 -42 20t-42 -6z" fill="#d23a32" stroke="#8a1e18" stroke-width="3"/><path d="M34 54q20 -8 50 -2" stroke="#ffd0c8" stroke-width="4" fill="none"/><path d="M32 70q24 4 56 -4" stroke="#f6f6f6" stroke-width="3" fill="none"/>',
    tin: '<rect x="34" y="18" width="52" height="68" rx="4" fill="#b9c0c6" stroke="#6d777f" stroke-width="3"/><rect x="34" y="30" width="52" height="44" fill="#e9e2d4"/><rect x="34" y="40" width="52" height="22" fill="#c8402e"/><circle cx="60" cy="51" r="8" fill="#f2c94c"/>',
    newspaper: '<path d="M14 30h86v54h-86z" fill="#eceae3" stroke="#8d8a80" stroke-width="2"/><rect x="20" y="36" width="74" height="9" fill="#55534e"/><g fill="#9b988e"><rect x="20" y="50" width="34" height="4"/><rect x="20" y="58" width="34" height="4"/><rect x="20" y="66" width="30" height="4"/><rect x="60" y="50" width="34" height="22"/></g>',
    magazine: '<path d="M22 14h72v76h-72z" fill="#f0f4f8" stroke="#7a8794" stroke-width="2"/><path d="M28 22h60v44h-60z" fill="#2e8bc0"/><circle cx="58" cy="44" r="14" fill="#f2b84b"/><path d="M28 22l60 44" stroke="#fff" stroke-width="5" opacity=".5"/><rect x="30" y="72" width="40" height="5" fill="#c2185b"/><path d="M80 18l10 0l-36 70h-10z" fill="#fff" opacity=".45"/>',
    carton: '<path d="M38 26l22 -12 22 12v62h-44z" fill="#e8efe2" stroke="#5b7a4a" stroke-width="3"/><rect x="38" y="44" width="44" height="30" fill="#6aa84f"/><circle cx="60" cy="58" r="9" fill="#f2c94c"/><path d="M50 20l10 -6 10 6" stroke="#5b7a4a" stroke-width="2" fill="none"/>',
    crisps: '<path d="M30 20h60l-4 10 4 10 -4 10 4 10 -4 10 4 10h-60l4 -10 -4 -10 4 -10 -4 -10 4 -10z" fill="#c8a42c" stroke="#7a6214" stroke-width="2"/><path d="M38 26h44v8h-44z" fill="#e5e9ec"/><circle cx="60" cy="56" r="11" fill="#e14b2b"/><path d="M76 26l6 54" stroke="#fff" stroke-width="4" opacity=".55"/>',
    card: '<path d="M10 40l40 -16 60 14 -40 22z" fill="#c49a62" stroke="#7e5f34" stroke-width="2"/><path d="M10 40v12l60 22 40 -22v-14l-40 22z" fill="#a98250" stroke="#7e5f34" stroke-width="2"/><path d="M40 34l30 8" stroke="#7e5f34" stroke-width="2"/>',
    bottle: '<path d="M50 12h20v10q12 8 12 22v40q0 6 -6 6h-32q-6 0 -6 -6v-40q0 -14 12 -22z" fill="#d6ecf2" stroke="#5f8fa0" stroke-width="3" opacity=".95"/><rect x="50" y="8" width="20" height="8" rx="2" fill="#2f7fd8"/><rect x="40" y="48" width="40" height="16" fill="#86c0d6"/><path d="M48 30v52" stroke="#fff" stroke-width="4" opacity=".7"/>',
    eggbox: '<path d="M14 50h92l-6 26h-80z" fill="#a8a59c" stroke="#6e6b63" stroke-width="2"/><g fill="#bbb8ae" stroke="#6e6b63" stroke-width="2"><path d="M18 50q10 -18 20 0"/><path d="M40 50q10 -18 20 0"/><path d="M62 50q10 -18 20 0"/><path d="M84 50q10 -18 20 0"/></g>',
    catalogue: '<path d="M22 14h72v76h-72z" fill="#dfe5ea" stroke="#6d7982" stroke-width="2"/><path d="M28 20h60v50h-60z" fill="#b7c2cb"/><path d="M34 26l48 38M82 26l-30 24" stroke="#f4f7f9" stroke-width="5" opacity=".9"/><rect x="30" y="76" width="44" height="6" fill="#555"/><path d="M84 16l8 0l-36 72h-8z" fill="#fff" opacity=".55"/>',
    cup: '<path d="M36 22h48l-6 66h-36z" fill="#f4f1ea" stroke="#8a7f70" stroke-width="3"/><rect x="34" y="16" width="52" height="8" rx="3" fill="#e2dccf" stroke="#8a7f70" stroke-width="2"/><path d="M40 44h40l-2 18h-36z" fill="#7a4a2a"/>',
    blur: '<rect x="14" y="14" width="92" height="72" fill="#9aa6ad"/>'
  };
  X.icon = function (k, w) { return '<svg viewBox="0 0 120 100" width="' + (w || 120) + '" height="' + Math.round((w || 120) * 100 / 120) + '" aria-hidden="true">' + (ICON[k] || '') + '</svg>'; };
  X.iconG = function (k, x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')">' + (ICON[k] || '') + '</g>'; };

  /* ---------- people, standing: feet at 0 0, about 300 high ----------
     o = {skin, hair, style, top, sleeve, bottom, vest, stripe, hat, gloves, beard, glasses, smile, extra} */
  var HAIR = {
    fringe: 'M-25 -272q0 -34 25 -34t25 34q-4 -8 -8 -12q-12 6 -24 2q-8 2 -14 8q-2 2 -4 2z',
    pony: 'M-24 -276q2 -30 24 -30t24 30q-10 -14 -24 -14t-24 14zM22 -282q18 6 14 40q-4 -14 -16 -26z',
    bald: 'M-25 -270q-2 -10 2 -14v18zM25 -270q2 -10 -2 -14v18z',
    crop: 'M-23 -280q3 -24 23 -24t23 24q-10 -8 -23 -8t-23 8z'
  };
  X.person = function (o) {
    var skin = o.skin || '#e8c4a2', hair = o.hair || '#3a2a1c', top = o.top || '#2b3a4e', bot = o.bottom || '#2c2c33', s = '';
    s += '<ellipse cx="0" cy="2" rx="46" ry="8" fill="#000" opacity=".25"/>';
    s += '<path d="M-20 0v-100h17v100zM3 0v-100h17v100z" fill="' + bot + '"/>';
    s += '<path d="M-26 0h24v8h-28zM2 0h24v8h-24z" fill="' + (o.shoes || '#2a2420') + '"/><path d="M-26 -2h24M2 -2h24" stroke="#c99a2e" stroke-width="2"/>';
    s += '<path d="M-38 -94q-7 -138 38 -146t38 146z" fill="' + top + '"/>';
    if (o.vest) s += '<path d="M-36 -98q-5 -120 22 -138l14 26 14 -26q27 18 22 138z" fill="' + o.vest + '"/><path d="M-37 -150h74M-37 -124h74" stroke="' + (o.stripe || '#d9dde0') + '" stroke-width="7"/><path d="M-8 -236l8 26 8 -26" fill="' + top + '"/>';
    s += '<path d="M-34 -204q-15 40 -5 88M34 -204q15 40 5 88" stroke="' + (o.sleeve || top) + '" stroke-width="15" fill="none" stroke-linecap="round"/>';
    s += '<circle cx="-39" cy="-112" r="9" fill="' + (o.gloves || skin) + '"/><circle cx="39" cy="-112" r="9" fill="' + (o.gloves || skin) + '"/>';
    s += '<rect x="-7" y="-256" width="14" height="20" fill="' + skin + '"/><circle cx="0" cy="-274" r="24" fill="' + skin + '"/>';
    if (o.style && HAIR[o.style]) s += '<path d="' + HAIR[o.style] + '" fill="' + hair + '"/>';
    if (o.beard) s += '<path d="M-22 -270q2 30 22 32q20 -2 22 -32q-6 14 -22 14t-22 -14z" fill="' + o.beard + '" opacity=".85"/>';
    s += '<path d="M-11 -273h7M4 -273h7" stroke="#2a2420" stroke-width="2.6" stroke-linecap="round"/><path d="M-6 -260q6 ' + (o.smile == null ? 3 : o.smile) + ' 12 0" stroke="#8c4a3c" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    if (o.glasses) s += '<circle cx="-8" cy="-273" r="7" fill="none" stroke="' + o.glasses + '" stroke-width="2"/><circle cx="8" cy="-273" r="7" fill="none" stroke="' + o.glasses + '" stroke-width="2"/>';
    if (o.goggles) s += '<path d="M-20 -300h40" stroke="#2a3a44" stroke-width="5"/><rect x="-18" y="-306" width="36" height="10" rx="5" fill="#bfe3ee" stroke="#2a3a44" stroke-width="2"/>';
    if (o.hat) s += '<path d="M-30 -284q0 -34 30 -34t30 34z" fill="' + o.hat + '"/><path d="M-36 -284h72" stroke="' + o.hat + '" stroke-width="6" stroke-linecap="round"/><path d="M0 -318v32" stroke="#000" stroke-width="3" opacity=".15"/>';
    if (o.extra) s += o.extra;
    return s;
  };
  X.PEOPLE = {
    gina: { skin: '#efd0b6', hair: '#8a7a6a', style: 'fringe', top: '#24324a', vest: '#ff8a1e', stripe: '#e6e9ec', bottom: '#2a2f3a', glasses: '#5a3a2a', smile: 2 },
    jaz: { skin: '#a8714a', hair: '#15100c', style: 'pony', top: '#22406a', sleeve: '#22406a', vest: '#e8e23a', stripe: '#c9ced2', bottom: '#22406a', goggles: 1, smile: 4 },
    lyle: { skin: '#f0cdb6', hair: '#c9c4bc', style: 'bald', top: '#3a3a36', vest: '#ff7a14', stripe: '#d8dcdf', bottom: '#2d3a2a', beard: '#c9c4bc', gloves: '#3f6d3a', smile: -2 }
  };
  X.who = function (name, more) {
    var o = {}, k, base = X.PEOPLE[name];
    for (k in base) o[k] = base[k];
    for (k in (more || {})) o[k] = more[k];
    return X.person(o);
  };

  /* ---------- the same people as busts, for the interviews (240 x 300) ---------- */
  var BUST = {
    gina: { bg: '#3a4a5e', skin: '#efd0b6', hair: '#8a7a6a', style: 'fringe', top: '#24324a', vest: '#ff8a1e', glasses: '#5a3a2a' },
    jaz: { bg: '#2c4f5a', skin: '#a8714a', hair: '#15100c', style: 'pony', top: '#22406a', vest: '#e8e23a', goggles: 1 },
    lyle: { bg: '#4a4436', skin: '#f0cdb6', hair: '#c9c4bc', style: 'bald', top: '#3a3a36', vest: '#ff7a14', beard: '#c9c4bc', tired: 1 }
  };
  var BHAIR = {
    fringe: 'M62 124q-4 -80 58 -80t58 80q-6 -20 -14 -30q-30 16 -60 2q-16 6 -26 20q-8 4 -16 8z',
    pony: 'M64 118q0 -68 56 -70t56 70q-14 -32 -56 -34t-56 34zM168 76q34 10 26 88q-10 -36 -30 -62z',
    bald: 'M64 128q-4 -26 6 -40q2 20 4 40zM176 128q4 -26 -6 -40q-2 20 -4 40z',
    crop: 'M66 108q4 -58 54 -60t54 60q-16 -22 -54 -22t-54 22z'
  };
  X.face = function (name, mood) {
    var o = BUST[name], s = '', sm = mood === 'smile' ? 10 : mood === 'cross' ? -6 : 3;
    s += '<svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg"><rect x="-200" y="-200" width="640" height="500" fill="' + o.bg + '"/>' +
      '<g opacity=".1" stroke="#fff" stroke-width="10"><path d="M-40 40l320 -60M-40 90l320 -60M-40 140l320 -60"/></g>';
    s += '<path d="M14 300q8 -96 106 -104q98 8 106 104z" fill="' + o.top + '"/>';
    if (o.vest) s += '<path d="M28 300q6 -80 62 -98l30 50 30 -50q56 18 62 98z" fill="' + o.vest + '"/><path d="M30 262h180" stroke="#e6e9ec" stroke-width="12"/>';
    s += '<rect x="104" y="164" width="32" height="36" fill="' + o.skin + '"/>';
    s += '<ellipse cx="120" cy="120" rx="54" ry="62" fill="' + o.skin + '"/><ellipse cx="66" cy="126" rx="8" ry="13" fill="' + o.skin + '"/><ellipse cx="174" cy="126" rx="8" ry="13" fill="' + o.skin + '"/>';
    s += '<path d="' + BHAIR[o.style] + '" fill="' + o.hair + '"/>';
    if (o.beard) s += '<path d="M68 130q4 64 52 68q48 -4 52 -68q-12 30 -52 30t-52 -30z" fill="' + o.beard + '" opacity=".8"/>';
    s += '<path d="M90 104q10 -6 20 0M130 104q10 -6 20 0" stroke="#3a2a20" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="100" cy="122" rx="5" ry="6.5" fill="#2a2420"/><ellipse cx="140" cy="122" rx="5" ry="6.5" fill="#2a2420"/><circle cx="102" cy="120" r="1.6" fill="#fff"/><circle cx="142" cy="120" r="1.6" fill="#fff"/>' +
      '<path d="M120 128q-5 14 2 18" stroke="#9a6a4a" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M104 156q16 ' + sm + ' 32 0" stroke="#7a3a32" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
    if (o.tired) s += '<path d="M90 134q10 5 20 0M130 134q10 5 20 0" stroke="#b08a74" stroke-width="2.5" fill="none" opacity=".8"/>';
    if (o.glasses) s += '<g fill="none" stroke="' + o.glasses + '" stroke-width="3"><rect x="84" y="108" width="32" height="26" rx="8"/><rect x="124" y="108" width="32" height="26" rx="8"/><path d="M116 120h8M84 118l-18 -4M156 118l18 -4"/></g>';
    if (o.goggles) s += '<path d="M62 64q58 -30 116 0" stroke="#2a3a44" stroke-width="7" fill="none"/><rect x="78" y="44" width="84" height="24" rx="12" fill="#bfe3ee" stroke="#2a3a44" stroke-width="4"/>';
    return s + '</svg>';
  };
  return X;
})();
