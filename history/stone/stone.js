/* Sign by Sign - what every room of the story shares: the hieroglyphs (drawn once, here), the royal rings, faces,
   a few sounds, the papers needed in more than one room, and small helpers. Loaded after engine.js.
   Nothing in here knows an answer: the rings are only the order of signs as they stand on the copies. */
window.ST = (function () {
  'use strict';
  var X = {};
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds ---------- */
  X.sfx = {
    pencil: function () { B({ type: 'highpass', f: 3200, dur: 0.12, peak: 0.05, a: 0.03 }); },
    pin: function () { B({ dur: 0.025, f: 4200, q: 4, peak: 0.16 }); T({ f: 240, dur: 0.05, peak: 0.07 }); },
    thread: function () { T({ type: 'triangle', f: 660, f2: 720, dur: 0.12, peak: 0.05 }); },
    snip: function () { B({ dur: 0.03, f: 5200, q: 3, peak: 0.12 }); B({ dur: 0.03, f: 4400, q: 3, peak: 0.1, when: 0.05 }); },
    press: function () { T({ f: 90, f2: 60, dur: 0.5, peak: 0.25, a: 0.08 }); B({ type: 'lowpass', f: 400, dur: 0.6, peak: 0.12, a: 0.1 }); },
    cup: function () { T({ f: 2400, dur: 0.18, peak: 0.05 }); T({ f: 3100, dur: 0.12, peak: 0.025, when: 0.02 }); },
    thump: function () { T({ f: 110, f2: 50, dur: 0.35, peak: 0.45 }); B({ type: 'lowpass', f: 300, dur: 0.3, peak: 0.3 }); },
    bell: function () { [1, 2.4, 3.9].forEach(function (m, i) { T({ f: 880 * m, dur: 1.2 / (i + 1), peak: 0.07 / (i + 1) }); }); }
  };
  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };
  X.mood = function (m) { try { if (ER.mood) ER.mood(m); } catch (e) {} };
  X.thing = function (sel, word, line, busy) {
    ER.$$(sel).forEach(function (n) {
      n.addEventListener('click', function (e) {
        if (busy && busy()) return;
        if (word) ER.wordAt(e.clientX, e.clientY, word);
        if (line) { var l = typeof line === 'function' ? line() : line; if (l) ER.say(l); }
      });
    });
  };
  X.mine = function (id, title, html, quiet) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'mine', 'Your notes', quiet); };
  X.learn = function () {
    for (var i = 0; i < arguments.length; i++) {
      var w = arguments[i], list = window.GLOSS || [], j;
      for (j = 0; j < list.length; j++) if (list[j][0].toLowerCase() === w.toLowerCase()) { ER.addWord(list[j][0], list[j][1]); break; }
    }
  };
  /* a paper from an earlier room must be in the notebook even when a room is opened directly */
  X.need = function (id, title, html, cls, kind) {
    var c = ER.state().clues, i;
    for (i = 0; i < c.length; i++) if (c[i].id === id) return;
    ER.addClue(id, title, html, cls, kind, true);
  };
  X.has = function (id) { return ER.state().clues.some(function (c) { return c.id === id; }); };
  X.slip = function () { ER.flag('slips', (ER.flag('slips') || 0) + 1); };
  X.slips = function () { return ER.flag('slips') || 0; };
  X.done = function (id) { var st = ER.state(); st.done = st.done || {}; st.done[id] = 1; ER.persist(true); };

  /* ---------- the hieroglyphs ----------
     Each sign sits in a box 40 high (its own width), drawn in currentColor. Animals and the hand face left: towards
     the beginning of the name, which is read from left to right. Simple shapes, after the usual printed forms. */
  var G = {
    p: [34, '<rect x="5" y="11" width="24" height="24"/>'],                                              /* square (a stool): p */
    t: [40, '<path d="M5 35Q5 21 20 21Q35 21 35 35z"/>'],                                                  /* half-loaf: t */
    o: [30, '<path d="M12 23C3 16 6 4 15 4C24 4 27 16 18 23L9 37M12 23L22 37" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>'],   /* lasso, a loop of rope: o */
    l: [66, '<path d="M22 35H6C3 35 2 31 5 30H14V26C9 25 6 21 6 17C6 11 11 8 15 9C19 9 22 12 23 17L23 18H50C56 18 60 22 60 28V35H53V30H25V35z"/><path d="M60 23C66 21 66 13 62 11" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M9 13Q8 22 15 24" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="2"/>'],   /* lion lying down: l */
    m: [56, '<path d="M4 20H52Q46 32 28 32Q10 32 4 20z"/>'],                                               /* the flat sign: m */
    i: [22, '<path d="M9 37V17C7 11 10 5 16 2C15 8 14 13 13 17V37z"/>'],                                   /* one reed leaf: e, i */
    ii: [32, '<path d="M7 37V17C5 11 8 5 14 2C13 8 12 13 11 17V37z"/><path d="M19 37V17C17 11 20 5 26 2C25 8 24 13 23 17V37z"/>'],   /* two reed leaves: i (y) */
    s: [24, '<path d="M6 37V9C6 4 10 2 14 2C19 2 21 5 21 9V18H17V10C17 8 16 7 14 7C12 7 11 8 11 10V37z"/>'],   /* folded cloth: s */
    q: [40, '<path d="M4 35C8 20 18 10 34 9V35z"/>'],                                                      /* hill slope: k */
    a: [46, '<path d="M10 4C13 2 16 3 16 7C16 10 14 13 15 17C21 14 30 15 35 20C38 23 39 26 38 28L45 35H33L30 31H23C18 31 15 28 14 24C13 20 12 16 11 12C10 10 8 10 7 10z"/><path d="M10 4L4 7L5 11L8 9z"/><path d="M22 31V38M27 31V38M19 38H24M24 38H29" fill="none" stroke="currentColor" stroke-width="2.2"/>'],   /* vulture: a */
    r: [48, '<path d="M4 24Q24 11 44 24Q24 36 4 24z"/>'],                                                  /* mouth: r */
    d: [48, '<path d="M45 21V31H18C12 31 6 30 4 28C2 27 2 25 4 24C6 22 12 22 17 22H19C18 18 18 14 20 11C21 9 24 9 24 12L25 20H34z"/><path d="M7 26.5H17" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.2"/>'],   /* hand: t (or d) */
    egg: [24, '<ellipse cx="12" cy="25" rx="7" ry="10" fill="none" stroke="currentColor" stroke-width="2.8"/>'],   /* egg */
    n: [52, '<path d="M3 25l4.6-5 4.6 5 4.6-5 4.6 5 4.6-5 4.6 5 4.6-5 4.6 5 4.6-5 4.6 5" fill="none" stroke="currentColor" stroke-width="2.6"/>'],   /* water: n */
    k: [42, '<path d="M4 18H30Q30 33 17 33Q4 33 4 18z"/><path d="M30 20C39 20 39 31 29 29" fill="none" stroke="currentColor" stroke-width="2.6"/>'],   /* basket with a handle: k */
    ra: [36, '<circle cx="18" cy="22" r="13" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="18" cy="22" r="3.2"/>'],   /* the sun */
    ms: [34, '<path d="M8 7H26" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="17" cy="5" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 9C9 19 8 28 6 36L10 35C11 26 12 17 13 9zM16 9C16 19 16 28 15 37H19C18 28 18 19 18 9zM24 9C25 17 26 26 28 35L24 36C22 27 21 17 21 9z"/>'],   /* three skins tied together */
    /* only for the rest of a line of signs on a copy, never read */
    owl: [34, '<path d="M9 36V16C9 9 13 6 17 6C22 6 25 9 25 15L27 28C27 33 24 36 20 36z"/><circle cx="14" cy="13" r="2.4" fill="#fff" fill-opacity=".5"/><circle cx="20" cy="13" r="2.4" fill="#fff" fill-opacity=".5"/>'],
    seat: [34, '<path d="M6 35V27H20V11H28V35z"/>'],
    bar: [40, '<rect x="4" y="24" width="32" height="6"/>'],
    eye: [44, '<path d="M4 22Q22 10 40 22Q22 32 4 22z" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="22" cy="22" r="4"/>'],
    ankh: [26, '<path d="M13 4C7 4 6 13 13 16C20 13 19 4 13 4z" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M4 18H22M13 16V37" fill="none" stroke="currentColor" stroke-width="3"/>']
  };
  X.G = G;
  X.gw = function (k) { return (G[k] || G.bar)[0]; };
  X.glyph = function (k) { return (G[k] || G.bar)[1]; };
  /* one sign as an inline svg, h px high */
  X.sign = function (k, h, cls) {
    var w = X.gw(k);
    return '<svg class="sgn' + (cls ? ' ' + cls : '') + '" viewBox="0 0 ' + w + ' 40" width="' + Math.round(w * (h || 40) / 40) + '" height="' + (h || 40) + '" aria-hidden="true">' + X.glyph(k) + '</svg>';
  };
  /* a royal ring: an oval round the signs, the tie bar at the end of the name. Returns {svg (a group), w, h, at[]}.
     o = {x, y, gap, pad, cls, id, color} */
  X.ringG = function (signs, o) {
    o = o || {}; var gap = o.gap == null ? 6 : o.gap, pad = o.pad == null ? 16 : o.pad, x = pad, at = [], s = '';
    signs.forEach(function (k, i) {
      var w = X.gw(k);
      s += '<g class="sg" data-i="' + (i + 1) + '" transform="translate(' + x + ' 10)"><rect class="sg-hit" x="-3" y="-2" width="' + (w + 6) + '" height="44" fill="transparent"/>' + X.glyph(k) + '</g>';
      at.push(x + w / 2); x += w + gap;
    });
    var W = x - gap + pad + 10, H = 60;
    var ring = '<rect x="2" y="2" width="' + (W - 14) + '" height="' + (H - 4) + '" rx="28" fill="none" stroke="currentColor" stroke-width="3"/>' +
      '<path d="M' + (W - 12) + ' 6V' + (H - 6) + 'M' + (W - 6) + ' 10V' + (H - 10) + '" stroke="currentColor" stroke-width="3"/>';
    return { svg: '<g' + (o.cls ? ' class="' + o.cls + '"' : '') + (o.id ? ' id="' + o.id + '"' : '') + ' transform="translate(' + (o.x || 0) + ' ' + (o.y || 0) + ')">' + ring + s + '</g>', w: W, h: H, at: at };
  };
  X.ring = function (signs, h, cls) {
    var r = X.ringG(signs);
    return '<svg class="ringsv' + (cls ? ' ' + cls : '') + '" viewBox="0 0 ' + r.w + ' ' + r.h + '" width="' + Math.round(r.w * (h || 60) / 60) + '" height="' + (h || 60) + '">' + r.svg + '</svg>';
  };
  /* the rings, sign by sign, as they stand on the copies */
  X.PTOL = ['p', 't', 'o', 'l', 'm', 'ii', 's'];
  X.CLEO = ['q', 'l', 'i', 'o', 'p', 'a', 'd', 'r', 'a', 't', 'egg'];
  X.ALEX = ['a', 'l', 'k', 's', 'i', 'n', 'd', 'r', 's'];
  X.RAMS = ['ra', 'ms', 's', 's'];
  X.NAME = { p: 'the square', t: 'the half-loaf', o: 'the lasso', l: 'the lion', m: 'the flat sign', i: 'the reed', ii: 'the two reeds', s: 'the folded cloth',
    q: 'the hill', a: 'the vulture', r: 'the mouth', d: 'the hand', egg: 'the egg', n: 'the water', k: 'the basket', ra: 'the sun', ms: 'the three skins' };

  /* ---------- faces ---------- */
  var F = {
    jj: { skin: '#eac3a0', hair: '#4a3324', coat: '#1f2229', trim: '#f4f0e6', whisk: 1, collar: 1 },
    zelie: { skin: '#f0cfb2', hair: '#6a3a1e', coat: '#5a6e8a', trim: '#e9dcc2', bun: '#6a3a1e', ribbon: '#b33a3a', girl: 1 },
    thorel: { skin: '#e2b894', hair: '#5a4a3a', coat: '#3c3a36', trim: '#efe8da', cap: '#f4efe4', apron: 1, girl: 1 },
    usson: { skin: '#ecc8aa', hair: '#b9b0a4', coat: '#4a2f3a', trim: '#e9e1d2', cap: '#f6f1e6', specs: 1, girl: 1 },
    sautel: { skin: '#dba886', hair: '#cfc8bc', coat: '#2a3a6a', trim: '#b3262a', tache: 1, collar: 1, bald: 1 },
    jf: { skin: '#e6b68e', hair: '#1e1612', coat: '#22252c', trim: '#f4f0e6', curls: 1, collar: 1 },
    dacier: { skin: '#efcfb6', hair: '#eeeae2', coat: '#2a2a30', trim: '#f4f0e6', bald: 1, collar: 1 }
  };
  X.FACE = function (k) {
    var p = F[k] || F.jj, s = '<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">';
    s += '<path d="M18 240q8-70 82-78q74 8 82 78z" fill="' + p.coat + '"/>';
    if (p.apron) s += '<path d="M62 190h76v50H62z" fill="#e9e4d6"/>';
    if (p.collar) s += '<path d="M70 162l30 26 30-26 6 20-36 14-36-14z" fill="' + p.trim + '"/><path d="M90 176h20l-4 22h-12z" fill="' + p.trim + '"/>';
    else s += '<path d="M66 170q34 26 68 0l6 16q-40 26-80 0z" fill="' + p.trim + '"/>';
    if (k === 'sautel') s += '<path d="M40 196l30-20M160 196l-30-20" stroke="#d9b24a" stroke-width="6"/>';
    s += '<rect x="88" y="130" width="24" height="34" fill="' + p.skin + '"/>';
    s += '<ellipse cx="100" cy="100" rx="38" ry="46" fill="' + p.skin + '"/>';
    if (p.bald) s += '<path d="M62 106q-4-26 8-38M138 106q4-26-8-38" stroke="' + p.hair + '" stroke-width="10" fill="none" stroke-linecap="round"/>';
    else if (p.girl) s += '<path d="M60 104q-4-60 40-60t40 60q-6-34-40-36q-34 2-40 36z" fill="' + p.hair + '"/>';
    else s += '<path d="M62 96q0-52 38-52t38 52q-8-26-38-28q-30 2-38 28z" fill="' + p.hair + '"/>';
    if (p.curls) s += '<g fill="' + p.hair + '"><circle cx="66" cy="74" r="10"/><circle cx="80" cy="60" r="11"/><circle cx="100" cy="54" r="12"/><circle cx="120" cy="60" r="11"/><circle cx="134" cy="74" r="10"/></g>';
    if (p.whisk) s += '<path d="M64 98q-2 30 8 40M136 98q2 30-8 40" stroke="' + p.hair + '" stroke-width="9" fill="none" stroke-linecap="round"/>';
    if (p.bun) s += '<circle cx="100" cy="50" r="16" fill="' + p.bun + '"/><path d="M84 58q16 8 32 0" stroke="' + p.ribbon + '" stroke-width="5" fill="none"/>';
    if (p.cap) s += '<path d="M58 84q2-46 42-46t42 46q-20-14-42-14t-42 14z" fill="' + p.cap + '"/><path d="M58 84q42-20 84 0" stroke="#c9c0ae" stroke-width="3" fill="none"/>';
    s += '<circle cx="86" cy="100" r="3.4" fill="#1b1512"/><circle cx="114" cy="100" r="3.4" fill="#1b1512"/>';
    s += '<path d="M78 90q8-5 16 0M106 90q8-5 16 0" stroke="' + (p.bald || p.cap ? '#7a6a5a' : p.hair) + '" stroke-width="3" fill="none"/>';
    if (p.specs) s += '<g fill="none" stroke="#5a4a2a" stroke-width="2.4"><circle cx="86" cy="101" r="10"/><circle cx="114" cy="101" r="10"/><path d="M96 101h8"/></g>';
    if (p.tache) s += '<path d="M82 124q18-12 36 0q-18 6-36 0z" fill="' + p.hair + '"/>';
    s += '<path d="M90 131q10 5 20 0" stroke="#7a3a2a" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    if (p.girl && !p.cap) s += '<ellipse cx="82" cy="114" rx="7" ry="4" fill="#e08a7a" opacity=".35"/><ellipse cx="118" cy="114" rx="7" ry="4" fill="#e08a7a" opacity=".35"/>';
    return s + '</svg>';
  };

  /* ---------- papers that more than one room needs ---------- */
  X.STONE = '<h4>How to read the copy of the stone</h4><h5>In M. Champollion-Figeac&rsquo;s hand, pinned to the easel</h5>' +
    '<p>The stone was found at Rosetta, in Egypt, by French soldiers in 1799. Since 1802 it has been in the British Museum in London.</p>' +
    '<p>It carries <b>one decree</b>, made by the priests at Memphis in 196 BC in honour of King Ptolemy, a boy of thirteen, written out <b>three times</b>: in sacred signs (hieroglyphs) at the top, in the everyday script of Egypt in the middle (my brother calls it Demotic), and at the bottom in Greek, which we can read. The last line of the Greek says so: the decree is to be written &ldquo;in sacred and native and Greek letters&rdquo;.</p>' +
    '<p>The top is broken, so the sacred signs that are left match only the end of the Greek: work from the end. A word that comes back again and again in the Greek must come back as often, and in the same order, in the other two. In the sacred signs, an oval ring is drawn round the king&rsquo;s name.</p>' +
    '<p>Besides the king, the Greek names old kings and queens whom the priests served: Alexander, Berenice, Arsinoe. There is no Cleopatra. The king was not yet married.</p>';
  X.CUTTING = '<h4>Courier of Egypt</h4><h5>Cairo, 29 Fructidor, Year VII of the Republic &middot; a cutting, framed</h5>' +
    '<p>At Rosetta, in Messidor last, the engineers working on the old fort found a stone of black granite, with three bands of writing in different characters: sacred signs, a second script that nobody knows, and Greek.</p>' +
    '<p>It is hoped that the Greek will give the key to the others.</p>';
  X.PAMPH = '<h4>A Key to the Sacred Letters</h4><h5>by X. Sautel, formerly engineer with the Army of the East &middot; Paris, Germinal, Year X</h5>' +
    '<p>I have stood before the stone of Rosetta with my own eyes, and I say that the riddle is simpler than the scholars think.</p>' +
    '<p><b>First.</b> The middle script is an alphabet, like ours. In its last lines the group that comes most often must be the king&rsquo;s own name, PTOLEMY, for a decree is all about its king. I have counted it: four times.</p>' +
    '<p><b>Second.</b> The sacred signs are not letters at all. Each picture is a word: the lion means strength, the square a throne, the bird a soul.</p>' +
    '<p><b>Third.</b> I have found on the stone the name of Queen Cleopatra, which proves all the rest.</p>';
  X.BIRTH = '<p>M. Champollion-Figeac marked one more group on the proof, in pencil. Where the Greek has <b>BIRTHDAY</b>, the sacred signs have a group that begins with this sign, like three skins tied together:</p>' +
    '<p class="sgrow">' + X.sign('ms', 46) + '</p><p>It comes nowhere else in the part that is left. Nobody knows its sound.</p>';
  var OBEL = '<svg viewBox="0 0 520 300" class="obel"><rect width="520" height="300" fill="#e3e6e4"/>' +
    '<path d="M70 280L84 40 96 22 108 40 122 280z" fill="#d2cfc4" stroke="#55606a" stroke-width="2"/><path d="M60 280h72v14H60z" fill="#bdb8aa" stroke="#55606a" stroke-width="2"/>' +
    '<g stroke="#55606a" stroke-width="1.2" opacity=".6"><path d="M90 60v200M102 60v200"/></g>' +
    '<g fill="#55606a" opacity=".55"><rect x="91" y="70" width="10" height="7"/><rect x="91" y="84" width="10" height="5"/><rect x="91" y="96" width="10" height="9"/><rect x="91" y="196" width="10" height="7"/><rect x="91" y="212" width="10" height="6"/><rect x="91" y="226" width="10" height="9"/></g>' +
    '<rect x="88" y="112" width="16" height="34" rx="7" fill="none" stroke="#8c2f24" stroke-width="2"/><rect x="88" y="152" width="16" height="38" rx="7" fill="none" stroke="#8c2f24" stroke-width="2"/>' +
    '<g font-family="\'EB Garamond\',serif" font-size="14" fill="#2a3440"><text x="138" y="290">base: Greek, to a King Ptolemy and a Queen Cleopatra</text></g>' +
    '<path d="M106 129h40M106 171h40" stroke="#8c2f24" stroke-width="1.5" stroke-dasharray="4 3"/>' +
    '<g transform="translate(150 104) scale(.6)" color="#2a3440">' + X.ringG(X.PTOL).svg + '</g>' +
    '<g transform="translate(150 150) scale(.6)" color="#2a3440">' + X.ringG(X.CLEO).svg + '</g>' +
    '<text x="300" y="216" font-family="\'Caveat\',cursive" font-size="24" fill="#5a5f66" transform="rotate(-4 300 216)">Cleopatra</text>' +
    '<path d="M330 198q-10-6-14-14" stroke="#5a5f66" stroke-width="1.5" fill="none"/></svg>';
  X.PHILAE = '<h4>The obelisk from Philae</h4><h5>A lithograph, printed in London in 1821 &middot; a note pinned to its corner</h5>' + OBEL +
    '<p>Mr William Bankes, an English traveller, found this small obelisk on the island of Philae, far up the Nile, and had it carried to England. On the block it stood on there is Greek: a request from the priests of the island to a King Ptolemy and a Queen Cleopatra.</p>' +
    '<p>The Greek is not a translation of the signs on the obelisk. But kings and queens put their names on what is made for them, so it was worth looking for those two names. There are two rings on the obelisk. One is very like the ring of Ptolemy on the Rosetta Stone. Beside the other, Mr Bankes wrote in pencil: Cleopatra.</p>' +
    '<p>He had the drawing printed on stone, and sent copies to scholars. One reached the rue Mazarine early this year.</p>';
  X.METHOD = '<h4>Two names, sign by sign</h4><h5>M. Champollion-Figeac&rsquo;s card, for the two of you</h5>' +
    '<p>If the signs in a ring stand for sounds, three things must be true.</p>' +
    '<ol><li>The same sound has the same sign, in every name.</li><li>The signs come in the order of the sounds of the Greek name.</li><li>A sound that one name has and the other has not needs a sign of its own.</li></ol>' +
    '<p>Read towards the faces: the lion and the bird look towards the beginning of the name. Do not expect a sign for every Greek letter: short sounds in the middle are often left out.</p>' +
    '<p>The Greek spellings: <b>&Pi;&Tau;&Omicron;&Lambda;&Epsilon;&Mu;&Alpha;&Iota;&Omicron;&Sigma;</b>, P-T-O-L-E-M-A-I-O-S. <b>&Kappa;&Lambda;&Epsilon;&Omicron;&Pi;&Alpha;&Tau;&Rho;&Alpha;</b>, K-L-E-O-P-A-T-R-A.</p>';
  X.CAL = '<h4>The calendar of the Republic</h4><h5>From an old almanac on Madame Usson&rsquo;s shelf</h5>' +
    '<p>From 1793 to the end of 1805 France counted time in a calendar of its own. The years were counted from the first day of the Republic, 22 September 1792: that day began <b>Year I</b>. So each year began in late September, and most of a Republican year falls in the next year of ours.</p>' +
    '<p>Twelve months of thirty days, named after the seasons, and five or six extra days at the end of the year:</p>' +
    '<table class="cal"><tr><th>autumn, from late September</th><td>Vend&eacute;miaire &middot; Brumaire &middot; Frimaire</td></tr><tr><th>winter, from late December</th><td>Niv&ocirc;se &middot; Pluvi&ocirc;se &middot; Vent&ocirc;se</td></tr>' +
    '<tr><th>spring, from late March</th><td>Germinal &middot; Flor&eacute;al &middot; Prairial</td></tr><tr><th>summer, from late June</th><td>Messidor &middot; Thermidor &middot; Fructidor</td></tr></table>' +
    '<p>To change a date: find the September in which its year began (Year I in 1792, Year II in 1793, and so on), then count on through the months.</p>';
  X.YOUNG = '<h4>Dr Young&rsquo;s article</h4><h5>Supplement to the Encyclopaedia Britannica, 1819, under EGYPT &middot; Madame Usson&rsquo;s note, slipped inside</h5>' +
    '<p>Dr Thomas Young of London is a physician and a man of science, known for his work on light and on the eye. In this long article he showed that the ring on the Rosetta Stone holds the name of Ptolemy, and he gave sounds to its signs: some right (the square is P, the half-loaf is T), some only half right. He also made a long list of words in the middle script, matched to the Greek.</p>' +
    '<p>He believes that signs for sounds were used only to write foreign names, such as those of the Greek kings, and that the Egyptians wrote their own words in signs for ideas.</p>';
  X.POCKET = '<h4>A pocket book</h4><h5>M. Sautel&rsquo;s, from the war &middot; faded pencil</h5>' +
    '<p>Cairo, 12 Vend&eacute;miaire, Year VIII. Saw the stone from Rosetta today, at the Institute. Copied the last line of the Greek. It says the decree is to be cut in sacred, native and Greek letters. So the three bands are one text. Nobody listens to me.</p>';
  X.COPTIC = '<h4>A grammar of the Coptic tongue</h4><h5>Printed in Rome, newly bound &middot; M. Champollion&rsquo;s name inside the cover</h5>' +
    '<p><b>Coptic</b> is the last form of the language of the old Egyptians. It is written in the Greek letters, with six or seven more taken from the Demotic. Nobody speaks it in the street any more, but it is still read aloud in the churches of Egypt&rsquo;s Christians.</p>' +
    '<p>In Coptic the little word for &ldquo;the&rdquo; shows whether a thing is male or female: <b>p-</b> before a man or a male thing, <b>t-</b> before a woman or a female thing. <i>p-r&omacr;me</i>, the man. <i>t-shime</i>, the woman.</p>' +
    '<table class="cop"><tr><td>r&emacr;</td><td>the sun</td></tr><tr><td>mise</td><td>to give birth</td></tr><tr><td>shime</td><td>a woman</td></tr><tr><td>r&omacr;me</td><td>a man</td></tr><tr><td>mou</td><td>water</td></tr></table>';
  X.QUEEN = '<h4>The end of a queen&rsquo;s ring</h4><h5>From another copy in M. Champollion&rsquo;s folder &middot; a note in his brother&rsquo;s hand</h5>' +
    '<p class="sgrow torn">&hellip; ' + X.sign('t', 40) + X.sign('egg', 40) + '</p>' +
    '<p>Queen Berenice&rsquo;s ring, from a temple wall. The beginning is torn away. Like Cleopatra&rsquo;s, it ends with the half-loaf and the egg.</p>' +
    '<p>My brother has looked through every ring in his folders. The queens&rsquo; names end so. The kings&rsquo; names never do.</p>';
  X.KINGS = '<h4>The old kings, as the Greeks wrote them</h4><h5>A page from a little history of Egypt, from Madame Usson&rsquo;s shop</h5>' +
    '<p>Long before Alexander came, Egypt had kings of its own, for many hundreds of years. An Egyptian priest called Manetho wrote their history in Greek, and later writers copied out his lists. Some of the names:</p>' +
    '<p class="kl">Amenophis &middot; Thoutmosis &middot; Ramesses &middot; Sesostris &middot; Psammetichus</p>' +
    '<p>Nobody has yet found one of these names among the sacred signs. If the signs for sounds were used only for foreign names, nobody ever will.</p>';
  X.HUYOT = '<h4>From a temple far up the Nile</h4><h5>A drawing by M. Huyot, an architect, made at the temple of Abu Simbel in Nubia &middot; it came on the morning of the 14th</h5>' +
    '<p class="sgrow">' + X.ring(X.RAMS, 70) + '</p>' +
    '<p>A ring of a king, from a temple far older than any Greek in Egypt. More signs follow in the drawing. M. Champollion has marked these first four in pencil.</p>';
  X.KARNAK = '<h4>A ring from Karnak</h4><h5>A copy of a temple wall at Thebes, in M. Champollion&rsquo;s folder &middot; no Greek with it</h5>' +
    '<p class="sgrow">' + X.ring(X.ALEX, 62) + '</p><p>In pencil, underneath: &ldquo;?&rdquo;</p>';
  return X;
})();
