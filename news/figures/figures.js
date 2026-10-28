/* Same Rules - what every room of the story shares: a few sounds, small helpers, people as standing figures, tiles that
   are copied into slots, and the verdict dial. Loaded after engine.js. Nothing in here knows an answer. */
window.FG = (function () {
  'use strict';
  var X = {}, D = document;
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so that the sound button switches them) ---------- */
  X.sfx = {
    slip: function () { B({ type: 'highpass', f: 2600, dur: 0.11, peak: 0.08, a: 0.02 }); },
    key: function () { B({ dur: 0.02, f: 1600, q: 2, peak: 0.22 }); T({ f: 240, f2: 150, dur: 0.05, peak: 0.12 }); },
    pen: function () { B({ type: 'bandpass', f: 2600, f2: 3400, q: 2, dur: 0.2, peak: 0.05, a: 0.03 }); },
    beep: function () { T({ type: 'sine', f: 1000, dur: 0.12, peak: 0.06 }); },
    talkback: function () { B({ type: 'bandpass', f: 1800, q: 1.5, dur: 0.08, peak: 0.07 }); T({ type: 'square', f: 880, dur: 0.05, peak: 0.02, when: 0.02 }); },
    whirr: function () { T({ type: 'sawtooth', f: 90, f2: 160, dur: 0.35, peak: 0.03, a: 0.05 }); B({ type: 'bandpass', f: 900, q: 3, dur: 0.3, peak: 0.03 }); },
    clunk: function () { T({ f: 110, f2: 60, dur: 0.18, peak: 0.35 }); B({ dur: 0.04, f: 1400, q: 1, peak: 0.18 }); },
    detent: function () { B({ dur: 0.015, f: 3200, q: 4, peak: 0.12 }); },
    printer: function () { [0, 0.09, 0.18, 0.27, 0.36].forEach(function (w) { B({ dur: 0.05, f: 2100, q: 5, peak: 0.07, when: w }); }); },
    ping: function () { T({ type: 'triangle', f: 1320, dur: 0.25, peak: 0.06 }); T({ type: 'triangle', f: 1760, dur: 0.3, peak: 0.05, when: 0.12 }); },
    lighter: function () { B({ dur: 0.03, f: 4200, q: 3, peak: 0.14 }); B({ type: 'lowpass', f: 700, dur: 0.25, peak: 0.06, when: 0.05 }); }
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
  /* a claim as it came in: who said it, when, and the words */
  X.claim = function (side, time, text) {
    return '<div class="claim ' + side + '"><span class="who">' + (side === 'lav' ? 'Lavery' : 'Gethin') + '<i>' + time + '</i></span><q>' + text + '</q></div>';
  };

  /* ---------- tiles copied into slots, like type from a case: click a tile, then a slot (or drag it there).
     A click on a filled slot with nothing held empties it. A tile and a slot with different data-g do not go together.
     o = {tile, slot, lock: fn, change: fn(slot), refuse: fn(slot, tile)} ---------- */
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
  /* what is in a row of slots, as a list of values ('' for an empty one) */
  X.vals = function (root, sel) { return ER.$$(sel, root).map(function (s) { return s.getAttribute('data-v') || ''; }); };
  X.put = function (slot, tile) {           /* fill a slot without a click (a saved game coming back) */
    if (!slot || !tile) return;
    slot.setAttribute('data-v', tile.getAttribute('data-v')); slot.innerHTML = tile.innerHTML; slot.classList.add('full');
  };

  /* ---------- the verdict dial: four settings over the top of an old dimmer knob.
     o = {value, onChange: fn(v), small: bool, lock: fn} ---------- */
  X.VERDICTS = [['true', 'TRUE'], ['tbm', 'TRUE BUT|MISLEADING'], ['false', 'FALSE'], ['cant', 'CAN’T CHECK|TONIGHT']];
  X.VCOL = { 'true': '#2e8b57', tbm: '#d99a1e', 'false': '#c8382a', cant: '#6b7280' };
  X.VNAME = { 'true': 'TRUE', tbm: 'TRUE BUT MISLEADING', 'false': 'FALSE', cant: 'CAN’T CHECK TONIGHT' };
  X.dial = function (o) {
    o = o || {};
    var cx = 120, cy = 124, ri = 44, ro = 114, val = o.value || '', wrap = D.createElement('div'), s = '', i;
    wrap.className = 'fdial' + (o.small ? ' small' : '');
    function P(r, a) { var t = a * Math.PI / 180; return (cx + r * Math.cos(t)).toFixed(1) + ' ' + (cy - r * Math.sin(t)).toFixed(1); }
    s += '<svg viewBox="0 0 240 140"><path d="M' + P(ro + 6, 180) + 'A' + (ro + 6) + ' ' + (ro + 6) + ' 0 0 1 ' + P(ro + 6, 0) + 'Z" fill="#14101e"/>';
    X.VERDICTS.forEach(function (v, k) {
      var a1 = 180 - 45 * k, a2 = a1 - 45, c = a1 - 22.5, lines = v[1].split('|'), lp = P(79, c).split(' ');
      s += '<g class="dz" data-v="' + v[0] + '"><path d="M' + P(ri, a1) + 'L' + P(ro, a1) + 'A' + ro + ' ' + ro + ' 0 0 1 ' + P(ro, a2) + 'L' + P(ri, a2) + 'A' + ri + ' ' + ri + ' 0 0 0 ' + P(ri, a1) + 'Z" fill="' + X.VCOL[v[0]] + '" stroke="#14101e" stroke-width="2.5"/>';
      lines.forEach(function (t, j) {
        s += '<text x="' + lp[0] + '" y="' + (+lp[1] + (lines.length === 1 ? 4 : j * 12 - 2)) + '" text-anchor="middle" font-family="Oswald,sans-serif" font-weight="600" font-size="' + (lines.length === 1 ? 13 : 10.5) + '" letter-spacing=".4" fill="#fff">' + t + '</text>';
      });
      s += '</g>';
    });
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="34" fill="#2a2433" stroke="#0c0912" stroke-width="3"/>';
    for (i = 0; i < 16; i++) s += '<path d="M' + P(30, i * 22.5) + 'L' + P(34, i * 22.5) + '" stroke="#4a4258" stroke-width="2"/>';
    s += '<g class="dn"><path d="M' + cx + ' ' + (cy - 6) + 'L' + cx + ' ' + (cy - 46) + '" stroke="#ffe7a8" stroke-width="5" stroke-linecap="round"/><circle cx="' + cx + '" cy="' + cy + '" r="9" fill="#ffe7a8"/></g></svg>';
    wrap.innerHTML = s;
    var needle = wrap.querySelector('.dn');
    function paint() {
      var k = -1;
      X.VERDICTS.forEach(function (v, j) { if (v[0] === val) k = j; });
      needle.setAttribute('transform', 'rotate(' + (k < 0 ? 0 : (-67.5 + 45 * k)) + ' ' + cx + ' ' + cy + ')');
      ER.$$('.dz', wrap).forEach(function (g) { g.querySelector('path').setAttribute('opacity', !val || g.getAttribute('data-v') === val ? '1' : '.38'); });
      wrap.setAttribute('data-v', val);
    }
    wrap.addEventListener('click', function (e) {
      var g = e.target.closest ? e.target.closest('.dz') : null;
      if (!g || (o.lock && o.lock())) return;
      val = g.getAttribute('data-v'); X.sfx.detent(); T({ f: 180, f2: 120, dur: 0.05, peak: 0.08, when: 0.02 }); paint();
      if (o.onChange) o.onChange(val);
    });
    paint();
    return { node: wrap, get: function () { return val; }, set: function (v) { val = v || ''; paint(); }, lock: function (on) { wrap.classList.toggle('lockd', !!on); } };
  };

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
    else if (o.style === 'curly') { for (i = 0; i < 7; i++) s += '<circle cx="' + (-21 + i * 7) + '" cy="' + (-292 - (i === 0 || i === 6 ? -6 : i === 1 || i === 5 ? 3 : 7)) + '" r="8.5" fill="' + hair + '"/>'; s += '<circle cx="-22" cy="-272" r="7" fill="' + hair + '"/><circle cx="22" cy="-272" r="7" fill="' + hair + '"/>'; }
    if (o.headset) s += '<path d="M-24 -280Q0 -318 24 -280" fill="none" stroke="#1b1b1b" stroke-width="4"/><rect x="-29" y="-284" width="9" height="16" rx="3" fill="#1b1b1b"/><path d="M-24 -270Q-22 -252 -6 -256" fill="none" stroke="#1b1b1b" stroke-width="2.4"/>';
    s += '<ellipse cx="-8" cy="-275" rx="2.3" ry="2.8" fill="#221b17"/><ellipse cx="8" cy="-275" rx="2.3" ry="2.8" fill="#221b17"/>' +
      '<path d="M1 -273q-3 7 1 9" stroke="#000" stroke-opacity=".28" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<path d="M-6 -259q6 ' + (o.smile == null ? 3 : o.smile) + ' 12 0" stroke="#7d3f34" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    if (o.beard) s += '<path d="M-22 -272Q-22 -242 0 -238Q22 -242 22 -272Q16 -256 0 -256Q-16 -256 -22 -272Z" fill="' + o.beard + '"/>';
    if (o.stubble) s += '<path d="M-20 -268Q-18 -244 0 -241Q18 -244 20 -268Q12 -252 0 -252Q-12 -252 -20 -268Z" fill="' + o.stubble + '" opacity=".35"/>';
    if (o.glasses) s += '<g fill="none" stroke="' + o.glasses + '" stroke-width="2"><rect x="-15" y="-281" width="12" height="10" rx="3"/><rect x="3" y="-281" width="12" height="10" rx="3"/><path d="M-3 -277h6"/></g>';
    if (o.extra) s += o.extra;
    return s;
  };
  X.PEOPLE = {
    iona: { skin: '#eac4a6', hair: '#5b4a46', style: 'bob', top: '#5a3d6e', bottom: '#24212a', shirt: '#ece6dc', cardi: 1, glasses: '#c0392b', lanyard: '#ff7a59' },
    colm: { skin: '#f1d2bb', hair: '#7a5a3a', style: 'short', top: '#1f2a44', bottom: '#1a2030', shirt: '#eef1f6', tie: '#7a2a5a', jacket: 1 },
    lydia: { skin: '#c48a64', hair: '#1d1512', style: 'curly', top: '#2f5a3a', bottom: '#23262a', shirt: '#f3efe6', jacket: 1, scarf: '#d4682a' },
    frank: { skin: '#efc6a8', hair: '#ecebe6', style: 'bald', top: '#1e2c48', bottom: '#1a2234', shirt: '#f2f3f6', tie: '#2f6db5', jacket: 1 },
    fergus: { skin: '#e7c3a8', hair: '#8f8a82', style: 'short', top: '#a8916a', bottom: '#33302c', shirt: '#d9d4c8', long: 1, stubble: '#5a5048' },
    hilda: { skin: '#efd2bc', hair: '#eeeae2', style: 'bun', top: '#b98a2a', bottom: '#3a3530', shirt: '#f2ece0', cardi: 1, glasses: '#3a3a3a', skirt: 1 },
    aled: { skin: '#d9a37c', hair: '#2a2420', style: 'short', top: '#1d1d22', bottom: '#2a2d33', shirt: '#1d1d22', beard: '#2a2420', headset: 1 }
  };
  X.who = function (name, more) {
    var o = {}, k, base = X.PEOPLE[name];
    for (k in base) o[k] = base[k];
    for (k in (more || {})) o[k] = more[k];
    return X.person(o);
  };
  return X;
})();
