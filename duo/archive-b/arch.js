/* Still Here - what every room of both parts shares (the same file is in archive-a and archive-b).
   AR.card(parts)          the card in the top left corner: what to ask or tell the partner first
   AR.thing(sel, word, text, busy)   a thing in the scene that answers a click with a line (and a name tag)
   AR.look(o)              a close look at one thing, with buttons (o = {kicker, title, pic, text, acts, msg, lock, onClose})
   AR.live(key, fn, label) when the partner's screen says key (linked screens), run fn; unlinked, a button in the
                           tray at the bottom right does the same thing when the partner says so out loud
   AR.tell(key, value)     tell the partner's screen what this player has just done (never what they can read)
   AR.sfx                  small sounds of paper, stamps, switches and doors
   AR.mins()               minutes really played */
window.AR = (function () {
  'use strict';
  var D = document, cardEl = null, tray = null, trayList = null;

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

  function look(o) {
    var box = ER.el('div', 'cl' + (o.cls ? ' ' + o.cls : '')), api;
    box.innerHTML = '<div class="cl-pic"></div><div class="cl-body"><h5><small></small></h5><div class="cl-text"></div><p class="cl-msg"></p><div class="cl-acts"></div></div>';
    box.querySelector('.cl-pic').innerHTML = o.pic || '';
    box.querySelector('h5 small').textContent = o.kicker || '';
    box.querySelector('h5').appendChild(D.createTextNode(o.title));
    box.querySelector('.cl-text').innerHTML = ER.gloss(o.text || '');
    api = {
      box: box,
      msg: function (t) { box.querySelector('.cl-msg').innerHTML = ER.gloss(t || ''); },
      text: function (t) { box.querySelector('.cl-text').innerHTML = ER.gloss(t || ''); },
      pic: function (s) { box.querySelector('.cl-pic').innerHTML = s; },
      acts: function (list) {
        var a = box.querySelector('.cl-acts'); a.innerHTML = '';
        (list || []).forEach(function (x) {
          var b = ER.el('button', 'btn' + (x.cls ? ' ' + x.cls : ''), x.label); b.type = 'button';
          if (x.id) b.id = x.id;
          b.addEventListener('click', function () { x.fn(api, b); });
          a.appendChild(b);
        });
      }
    };
    api.acts(o.acts);
    if (o.msg) api.msg(o.msg);
    ER.open(o.lock === false ? 'ov-look' : 'ov-lock', box, o.onClose);
    return api;
  }

  /* ---------- the partner's screen ---------- */
  function linked() { return !!(window.Link && Link.linked()); }
  function paintTray() { if (tray) tray.style.display = linked() || !trayList.children.length ? 'none' : ''; }
  function live(key, fn, label) {
    var done = false;
    function run(v) { if (done) return; done = true; var b = D.getElementById('pt-' + key); if (b) b.parentNode.removeChild(b); paintTray(); fn(v); }
    if (window.Link) Link.when(key, run);
    if (label) {
      if (!tray) {
        tray = ER.el('div', 'ptray', '<h6>Not linked? When your partner says so:</h6><div></div>');
        trayList = tray.querySelector('div');
        D.body.appendChild(tray);
        setInterval(paintTray, 1500);
      }
      var b = ER.el('button', '', label); b.type = 'button'; b.id = 'pt-' + key;
      b.addEventListener('click', function () { run(true); });
      trayList.appendChild(b);
      paintTray();
    }
    return { run: run, isDone: function () { return done; } };
  }
  function tell(key, value) { if (window.Link) Link.set(key, value === undefined ? true : value); }

  var sfx = {
    stamp: function () { ER.tone({ f: 110, f2: 55, dur: 0.18, peak: 0.45 }); ER.burst({ type: 'lowpass', f: 700, dur: 0.12, peak: 0.35 }); },
    drawer: function () { ER.burst({ type: 'bandpass', f: 420, f2: 180, q: 1.2, dur: 0.45, peak: 0.22, a: 0.03 }); ER.tone({ f: 160, dur: 0.08, peak: 0.12, when: 0.42 }); },
    lever: function () { ER.tone({ type: 'square', f: 90, f2: 60, dur: 0.12, peak: 0.12 }); ER.burst({ dur: 0.06, f: 2400, q: 3, peak: 0.3 }); },
    bell: function () { [1, 2.4, 3.9].forEach(function (m, i) { ER.tone({ f: 1320 * m, dur: 0.9 / (i + 1), peak: 0.06 / (i + 1) }); ER.tone({ f: 1320 * m, dur: 0.7 / (i + 1), peak: 0.04 / (i + 1), when: 0.18 }); }); },
    ring: function () { for (var i = 0; i < 2; i++) { ER.tone({ type: 'square', f: 420, dur: 0.35, peak: 0.03, when: i * 0.5 }); ER.tone({ type: 'square', f: 490, dur: 0.35, peak: 0.025, when: i * 0.5 + 0.05 }); } },
    scratch: function () { ER.burst({ type: 'highpass', f: 3200, dur: 0.22, peak: 0.07, a: 0.02 }); ER.burst({ type: 'highpass', f: 3600, dur: 0.18, peak: 0.06, a: 0.02, when: 0.26 }); },
    thump: function () { ER.tone({ f: 140, f2: 70, dur: 0.25, peak: 0.3 }); ER.burst({ type: 'lowpass', f: 500, dur: 0.15, peak: 0.2 }); },
    buzz: function () { for (var i = 0; i < 3; i++) ER.tone({ type: 'sawtooth', f: 180, dur: 0.12, peak: 0.03, when: i * 0.18 }); }
  };

  function mins() { var s = ER.state(); return Math.max(1, Math.round(((s.fin ? s.fin.secs : s.secs) || 0) / 60)); }

  return { card: card, thing: thing, look: look, live: live, tell: tell, linked: linked, sfx: sfx, mins: mins };
})();
