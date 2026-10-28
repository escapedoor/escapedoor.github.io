/* Read It Back, part A (the astronaut) - what every room of this part shares.
   SU.card(...)   the card in the top left corner that says what to tell or ask the partner first
   SU.thing(...)  a thing in the scene that answers a click with a line (and a name tag)
   SU.look(...)   a close look at one thing, through the visor, with buttons
   SU.cuff()      the cuff checklist on the left wrist: the radio rules and the spelling alphabet
   SU.stars(...)  a sky of stars, the same every time
   The face of Commander Overgaard and the small sounds of the suit live here too. */
window.SU = (function () {
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

  /* o = {kicker, title, pic, text, acts: [{id, label, fn(api), cls}], msg, lock (false = a plain look), onClose} */
  function look(o) {
    var box = ER.el('div', 'lk'), api;
    box.innerHTML = '<div class="lk-pic"></div><div class="lk-body"><h5><small></small></h5><div class="lk-text"></div><p class="lk-msg"></p><div class="lk-acts"></div></div>';
    box.querySelector('.lk-pic').innerHTML = o.pic || '';
    box.querySelector('h5 small').textContent = o.kicker || '';
    box.querySelector('h5').appendChild(D.createTextNode(o.title));
    box.querySelector('.lk-text').innerHTML = ER.gloss(o.text || '');
    api = {
      box: box,
      msg: function (t) { box.querySelector('.lk-msg').innerHTML = ER.gloss(t || ''); },
      pic: function (s) { box.querySelector('.lk-pic').innerHTML = s; },
      text: function (t) { box.querySelector('.lk-text').innerHTML = ER.gloss(t || ''); },
      acts: function (list) {
        var a = box.querySelector('.lk-acts'); a.innerHTML = '';
        (list || []).forEach(function (x) {
          var b = ER.el('button', 'btn' + (x.cls ? ' ' + x.cls : ''), x.label); b.type = 'button';
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

  /* ---------- the cuff checklist ---------- */
  var ABC = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu'];
  var CUFF = '<h4>Your cuff checklist</h4>' +
    '<p>A little book of stiff pages on your left wrist, the size of a playing card. You turn the pages with a fat glove finger. This page is the radio page.</p>' +
    '<p><b>RADIO · VESPER STATION</b></p>' +
    '<p>1. Say who you are calling, then who you are: &ldquo;Control, EV One.&rdquo;<br>' +
    '2. Say numbers digit by digit: &ldquo;one five&rdquo;, not &ldquo;fifteen&rdquo;. Fifteen and fifty sound alike in a helmet.<br>' +
    '3. Read back every number and every instruction. If it is wrong, Control will say so.<br>' +
    '4. &ldquo;Say again&rdquo; means please repeat. &ldquo;Copy&rdquo; means I heard you and I understand.<br>' +
    '5. Never say &ldquo;there&rdquo; or &ldquo;that one&rdquo;. Say which: its colour, its shape, where it is.<br>' +
    '6. Spell every name and every label:</p>' +
    '<div class="abc">' + ABC.map(function (w) { return '<span><b>' + w.charAt(0) + '</b> ' + w + '</span>'; }).join('') + '</div>' +
    '<p class="hand">On the back page, in Commander Overgaard&rsquo;s handwriting: Never let go of anything that is not clipped to something. That means tools. That means you.</p>';
  function cuff() { ER.read({ html: CUFF, cls: 'cuff', clue: { id: 'cuff', title: 'Your cuff checklist', kind: 'On your wrist' } }); }

  /* ---------- a sky of stars: the same every time (a small seeded random) ---------- */
  function stars(n, seed, x0, y0, w, h, fill) {
    var s = '', i, r = seed || 7;
    function rnd() { r = (r * 9301 + 49297) % 233280; return r / 233280; }
    for (i = 0; i < n; i++) {
      var x = x0 + rnd() * w, y = y0 + rnd() * h, big = rnd() > 0.86;
      s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (big ? 2.2 : 1.1) + '" fill="' + (fill || '#fff') + '" opacity="' + (0.35 + rnd() * 0.6).toFixed(2) + '"/>';
    }
    return s;
  }

  /* ---------- Commander Nils Overgaard, inside the station ---------- */
  var FACE = {
    nils: '<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="320" fill="#1d2a36"/><circle cx="196" cy="60" r="34" fill="#0b1118"/><circle cx="196" cy="60" r="26" fill="#2f6fae"/><path d="M176 52q20 -14 40 4" stroke="#e9f2fb" stroke-width="5" fill="none"/>' +
      '<path d="M18 320q4 -112 102 -118q98 6 102 118z" fill="#2b4b6a"/><path d="M70 230h100v14H70z" fill="#e8562a"/><path d="M96 206l24 26 24 -26" fill="#dfe8ee"/>' +
      '<rect x="104" y="176" width="32" height="34" fill="#e6bfa0"/><ellipse cx="120" cy="128" rx="54" ry="62" fill="#efcaac"/>' +
      '<path d="M66 118q-6 -66 54 -70q60 4 54 70q-8 -34 -54 -36q-46 2 -54 36z" fill="#d9c08a"/><path d="M78 168q42 34 84 0q-6 34 -42 38q-36 -4 -42 -38z" fill="#d9c08a"/>' +
      '<circle cx="98" cy="124" r="5" fill="#26303a"/><circle cx="142" cy="124" r="5" fill="#26303a"/><path d="M84 108q14 -8 28 0M128 108q14 -8 28 0" stroke="#b49a62" stroke-width="5" stroke-linecap="round" fill="none"/>' +
      '<path d="M104 160q16 8 32 0" stroke="#8a5a44" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M118 130l-6 18h12" stroke="#c9967a" stroke-width="3" fill="none"/>' +
      '<path d="M60 118q-14 0 -14 16q0 16 14 16" fill="#efcaac"/><path d="M180 118q14 0 14 16q0 16 -14 16" fill="#efcaac"/><path d="M58 100q62 -40 124 0" stroke="#30363c" stroke-width="7" fill="none"/><rect x="40" y="114" width="16" height="30" rx="5" fill="#30363c"/></svg>'
  };

  /* ---------- small sounds of the suit ---------- */
  var sfx = {
    hiss: function (dur) { ER.burst({ type: 'highpass', f: 3200, f2: 1800, dur: dur || 1.6, peak: 0.08, a: 0.2 }); },
    clip: function () { ER.burst({ dur: 0.03, f: 4200, q: 3, peak: 0.16 }); ER.burst({ dur: 0.04, f: 2600, q: 3, peak: 0.12, when: 0.06 }); },
    clunk: function () { ER.tone({ f: 110, f2: 70, dur: 0.3, peak: 0.3 }); ER.burst({ dur: 0.06, f: 1400, q: 1, peak: 0.12 }); },
    whirr: function () { ER.tone({ type: 'sawtooth', f: 160, f2: 240, dur: 0.9, peak: 0.035, a: 0.1 }); ER.tone({ type: 'sawtooth', f: 240, f2: 160, dur: 0.6, peak: 0.03, a: 0.1, when: 0.9 }); },
    radio: function () { ER.burst({ type: 'bandpass', f: 1800, q: 0.6, dur: 0.12, peak: 0.06 }); }
  };

  function mins() { var s = ER.state(); return Math.max(1, Math.round(((s.fin ? s.fin.secs : s.secs) || 0) / 60)); }

  /* the last task, the same frame in both endings of this part */
  function task(title, intro, pre) {
    var saved = ER.flag('task') || {}, box = ER.el('div', 'rp');
    box.innerHTML = '<h4>For the records of Vesper Flight Control</h4><h3>' + title + '</h3>' + intro +
      '<textarea id="r1"></textarea><div class="count"></div><label for="r2">Written by</label><input type="text" id="r2" maxlength="60">' +
      '<div class="foot"><span>Nobody marks this. It is saved in this browser as you write.</span><button type="button" class="btn" id="r-print">Print</button><button type="button" class="btn" id="r-done">Done</button></div>';
    ER.glossIn(box, '.rp > p');
    box.querySelector('#r1').value = saved.r1 || pre || ''; box.querySelector('#r2').value = saved.r2 || '';
    function keep() {
      var o = { r1: box.querySelector('#r1').value, r2: box.querySelector('#r2').value }, n = (o.r1.match(/[A-Za-z’']+/g) || []).length;
      box.querySelector('.count').textContent = n + (n === 1 ? ' word' : ' words');
      ER.flag('task', o);
    }
    box.addEventListener('input', keep);
    box.addEventListener('keydown', function (e) { e.stopPropagation(); });
    box.querySelector('#r-print').addEventListener('click', function () { keep(); window.print(); });
    box.querySelector('#r-done').addEventListener('click', ER.close);
    ER.open('ov-report', box); keep();
  }

  return { card: card, thing: thing, look: look, cuff: cuff, CUFF: CUFF, stars: stars, FACE: FACE, sfx: sfx, mins: mins, task: task };
})();
