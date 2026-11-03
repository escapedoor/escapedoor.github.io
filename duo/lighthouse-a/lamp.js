/* Show a Light, part A (the lamp keeper) - what every room of this part shares.
   KP.card(...)    the card in the top left corner that says what to tell or ask the partner first
   KP.thing(...)   a thing in the scene that answers a click with a line (and a name tag)
   KP.look(...)    a close look at one thing, with buttons
   KP.ship(...)    a lamp in the scene that flashes a signal over and over (the ship's lamp)
   KP.seen(...)    the keeper's notes of what the ship's lamp did: dots and dashes in groups, never letters
   KP.key(...)     the station's signal lamp: press for a short flash, hold for a long one
   KP.on / KP.state   what the partner's screen does (link.js), and KP.tube(...) the speaking tube
   The lamp keeper has no code book: the table below only drives the lamps, and is never shown. */
window.KP = (function () {
  'use strict';
  var D = document, cardEl = null;

  function card(parts) {
    if (!cardEl) {
      cardEl = ER.el('div', 'pcard');
      D.body.appendChild(cardEl);
      cardEl.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('.w')) return;
        cardEl.classList.toggle('min');
        cardEl.querySelector('.fold').textContent = cardEl.classList.contains('min') ? 'open' : 'fold';
      });
    }
    var s = '<span class="fold">fold</span>';
    parts.forEach(function (p) { s += '<h6>' + p[0] + '</h6>' + p[1].map(function (l) { return '<p>' + l + '</p>'; }).join(''); });
    var was = cardEl.innerHTML;
    cardEl.innerHTML = ER.gloss(s);
    cardEl.classList.remove('min');
    if (was && was !== cardEl.innerHTML) { cardEl.classList.remove('ping'); void cardEl.offsetWidth; cardEl.classList.add('ping'); }
  }

  function thing(sel, word, text, busy) {
    var n = ER.$(sel); if (!n) return;
    n.addEventListener('click', function (e) {
      if (busy && busy()) return;
      var t = typeof text === 'function' ? text() : text;
      if (word) ER.wordAt(e.clientX, e.clientY, word);
      if (t) ER.say(t);
    });
  }

  /* o = {kicker, title, pic, text, acts: [{id, label, fn(api)}], msg, lock (false = a plain look), onClose} */
  function look(o) {
    var box = ER.el('div', 'kp'), api;
    box.innerHTML = '<div class="kp-pic"></div><div class="kp-body"><h5><small></small></h5><div class="kp-text"></div><p class="kp-msg"></p><div class="kp-acts"></div></div>';
    box.querySelector('.kp-pic').innerHTML = o.pic || '';
    box.querySelector('h5 small').textContent = o.kicker || '';
    box.querySelector('h5').appendChild(D.createTextNode(o.title));
    box.querySelector('.kp-text').innerHTML = ER.gloss(o.text || '');
    api = {
      box: box,
      msg: function (t) { box.querySelector('.kp-msg').innerHTML = ER.gloss(t || ''); },
      text: function (t) { box.querySelector('.kp-text').innerHTML = ER.gloss(t || ''); },
      pic: function (s) { box.querySelector('.kp-pic').innerHTML = s; },
      acts: function (list) {
        var a = box.querySelector('.kp-acts'); a.innerHTML = '';
        (list || []).forEach(function (x) {
          var b = ER.el('button', 'btn', x.label); b.type = 'button';
          if (x.id) b.id = x.id;
          b.addEventListener('click', function () { x.fn(api); });
          a.appendChild(b);
        });
      }
    };
    api.acts(o.acts);
    if (o.msg) api.msg(o.msg);
    ER.open(o.lock === false ? 'ov-look' : 'ov-lock', box, o.onClose);
    return api;
  }

  /* ---------- the code that drives the lamps (never shown to this player) ---------- */
  var M = { A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--',
    N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', '?': '..--..' };
  var BACK = {}; Object.keys(M).forEach(function (k) { BACK[M[k]] = k; });
  function groups(text) {              /* 'AA AA' -> [['.-','.-'], ['.-','.-']] : words of letter patterns */
    return String(text).split(' ').filter(Boolean).map(function (w) { return w.split('').map(function (c) { return M[c] || ''; }); });
  }
  function draw(p) { return p.replace(/\./g, '•').replace(/-/g, '—'); }

  /* The ship's lamp: node gets the class 'lit' while a flash is showing. o = {node, text, unit, pause, glow} */
  function ship(o) {
    var unit = o.unit || 240, alive = true, timer = 0, text = o.text, plan = [];
    function build() {
      plan = [];
      groups(text).forEach(function (w, wi) {
        if (wi) plan.push([0, unit * 6]);
        w.forEach(function (p, li) {
          if (li) plan.push([0, unit * 3]);
          p.split('').forEach(function (e, ei) { if (ei) plan.push([0, unit]); plan.push([1, e === '-' ? unit * 3 : unit]); });
        });
      });
      plan.push([0, o.pause || unit * 14]);
    }
    function run(i) {
      if (!alive) return;
      if (i >= plan.length) i = 0;
      var st = plan[i];
      if (o.node) o.node.classList.toggle('lit', !!st[0]);
      if (o.glow) o.glow.classList.toggle('lit', !!st[0]);
      timer = setTimeout(function () { run(i + 1); }, st[1]);
    }
    build(); timer = setTimeout(function () { run(0); }, 600);
    return {
      stop: function () { alive = false; clearTimeout(timer); if (o.node) o.node.classList.remove('lit'); if (o.glow) o.glow.classList.remove('lit'); },
      set: function (t) { text = t; build(); clearTimeout(timer); alive = true; timer = setTimeout(function () { run(0); }, 900); },
      text: function () { return text; }
    };
  }

  /* notes of what was seen, as the keeper writes them: one box for each group of flashes, a red mark for a long dark */
  function seen(text) {
    return groups(text).map(function (w) { return w.map(function (p) { return '<span class="grp">' + draw(p) + '</span>'; }).join(''); })
      .join('<span class="gap">gap</span>');
  }

  /* ---------- the signal lamp's key ----------
     o = {title, how, pic (svg with an element .trig and a .beam), onSend(letters, raw), sendLabel}
     Press for a short flash, hold for a long one. A pause of a second starts the next group. */
  function key(o) {
    var box = ER.el('div', 'bx key-box'), gs = [], cur = '', t0 = 0, lastUp = 0, down = false, n = 0;
    box.innerHTML = '<div class="key"><div class="key-lamp">' + (o.pic || '') + '</div><div class="key-side"><h5></h5><p class="how"></p>' +
      '<div class="strip"></div><button type="button" class="key-btn" id="trigger">Flash</button>' +
      '<div class="row"><button type="button" class="btn" id="k-clear">Start again</button><button type="button" class="btn" id="k-send"></button></div></div></div>' +
      '<div class="bx-foot"><p class="pmsg"></p></div>';
    box.querySelector('h5').textContent = o.title || 'The signal lamp';
    box.querySelector('.how').innerHTML = ER.gloss(o.how || '');
    box.querySelector('#k-send').textContent = o.sendLabel || 'That is the signal';
    var strip = box.querySelector('.strip'), trig = box.querySelector('#trigger'), lamp = box.querySelector('.key-lamp');
    function paint() {
      var s = gs.map(function (g) { return '<span class="gp">' + draw(g) + '</span>'; }).join('');
      if (cur) s += '<span class="gp now">' + draw(cur) + '</span>';
      strip.innerHTML = s || '<i>nothing sent yet</i>';
    }
    function shine(on) { var b = lamp.querySelector('.beam'); if (b) b.classList.toggle('lit', on); trig.classList.toggle('down', on); }
    function press(e) {
      if (e) e.preventDefault();
      if (down) return;
      down = true; t0 = Date.now();
      if (cur && t0 - lastUp > 1000) { gs.push(cur); cur = ''; }
      shine(true); tone(true);
      paint();
    }
    function release() {
      if (!down) return;
      down = false; lastUp = Date.now();
      cur += (lastUp - t0 >= 300) ? '-' : '.';
      shine(false); tone(false);
      if (window.Link) Link.set('flash', ++n + (ER.flag('flashes') || 0));
      paint();
    }
    [trig, lamp.querySelector('.trig')].forEach(function (t) {
      if (!t) return;
      t.addEventListener('pointerdown', press);
      t.addEventListener('pointerup', release);
      t.addEventListener('pointerleave', release);
      t.addEventListener('pointercancel', release);
    });
    box.querySelector('#k-clear').addEventListener('click', function () { gs = []; cur = ''; paint(); api.msg(''); });
    box.querySelector('#k-send').addEventListener('click', function () {
      if (cur) { gs.push(cur); cur = ''; }
      if (!gs.length) { api.msg('Nothing has been sent yet. Press the lamp for a short flash; hold it down for a long one.'); return; }
      var raw = gs.slice(), letters = raw.map(function (g) { return BACK[g] || '#'; }).join('');
      ER.flag('flashes', (ER.flag('flashes') || 0) + n); n = 0;
      gs = []; paint();
      o.onSend(letters, raw.map(draw));
    });
    var hum = null;
    function tone(on) {
      if (on) { ER.sfx.click(); hum = true; }
      else if (hum) { ER.tone({ f: 120, dur: 0.06, peak: 0.05 }); hum = null; }
    }
    var api = {
      box: box,
      msg: function (t) { box.querySelector('.pmsg').innerHTML = ER.gloss(t || ''); },
      clear: function () { gs = []; cur = ''; paint(); },
      open: function () { ER.open('ov-lock', box); },
      sent: function (raw) { return raw.join('  '); }
    };
    paint();
    return api;
  }

  /* ---------- the other screen ---------- */
  /* an event the partner can make again and again (a whistle, a flash): fn(value) each time the count goes up */
  function on(k, fn) {
    if (!window.Link) return;
    Link.on(function () {
      var v = Link.get(k), last = ER.flag('lk-' + k) || 0;
      if (typeof v === 'number' && v > last) { ER.flag('lk-' + k, v); fn(v); }
    });
  }
  /* something the partner's screen has done once and for all (the lamp is lit) */
  function state(k, fn) { if (window.Link) Link.when(k, fn); }

  /* the speaking tube: a brass mouth with a whistle in it. Blowing it whistles at the other end. */
  var blown = 0;
  function tube(sel, busy) {
    var n = ER.$(sel); if (!n) return;
    n.addEventListener('click', function (e) {
      if (busy && busy()) return;
      ER.wordAt(e.clientX, e.clientY, 'speaking tube');
      sfx.whistle();
      blown = (ER.flag('blown') || 0) + 1; ER.flag('blown', blown);
      if (window.Link) Link.set('whistleA', blown);
      ER.say('You blow down the speaking tube. At the bottom of the tower, 132 steps below, the whistle in the other end shrieks. Now talk.');
    });
    on('whistle', function () {
      n.classList.remove('shrill'); void n.getBoundingClientRect(); n.classList.add('shrill');
      sfx.whistle();
      ER.say('The whistle in the speaking tube shrieks: your partner is blowing up the tube from the watch room. They want to talk.');
    });
  }

  /* ---------- sounds ---------- */
  var sfx = {
    whistle: function () { ER.tone({ type: 'triangle', f: 1850, f2: 2050, dur: 0.5, peak: 0.06, a: 0.04 }); ER.burst({ type: 'highpass', f: 3000, dur: 0.5, peak: 0.04, a: 0.05 }); },
    gust: function () { ER.burst({ type: 'bandpass', f: 400, f2: 900, q: 0.6, dur: 1.6, peak: 0.16, a: 0.4 }); },
    horn: function () { ER.tone({ type: 'sawtooth', f: 98, dur: 1.6, peak: 0.12, a: 0.15 }); ER.tone({ type: 'sawtooth', f: 74, f2: 70, dur: 1.4, peak: 0.12, a: 0.15, when: 0.25 }); },
    crank: function () { ER.burst({ dur: 0.05, f: 2400, q: 3, peak: 0.12 }); ER.tone({ f: 180, f2: 140, dur: 0.12, peak: 0.08, when: 0.04 }); },
    hiss: function () { ER.burst({ type: 'highpass', f: 2600, dur: 0.7, peak: 0.08, a: 0.1 }); },
    whump: function () { ER.burst({ type: 'lowpass', f: 300, f2: 120, dur: 0.6, peak: 0.3, a: 0.02 }); }
  };
  function mins() { var s = ER.state(); return Math.max(1, Math.round(((s.fin ? s.fin.secs : s.secs) || 0) / 60)); }

  return { card: card, thing: thing, look: look, ship: ship, seen: seen, key: key, on: on, state: state, tube: tube, sfx: sfx, mins: mins, draw: draw };
})();
