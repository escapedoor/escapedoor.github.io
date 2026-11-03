/* KEYHOLE - two screens, one story (the Together door).
   account.js loads this file in every room of the duo theme when the site has a record book. One player makes a code
   of four letters and reads it out; the other types it in. From then on each screen tells the record book, about once
   a second, what has happened on it, and hears what has happened on the other one: so a valve shut by the diver can
   put out a lamp in front of the operator.
   What goes across is what the players DO, never what they can read. The clues stay on their own screens, and the
   players still have to say them in English: that is the lesson. A story must also work with no link at all (a
   partner on the same sofa, a record book that cannot be reached): whatever the link does by itself, a button or a
   line typed by the player can do too.

   For a room:
     Link.linked()          true when the two screens are linked
     Link.set(key, value)   tell the partner's screen (value true when left out). It is kept: a room that opens later
                            on the partner's screen still sees it.
     Link.get(key)          what the partner's screen has said (undefined until it has)
     Link.when(key, fn)     fn(value) once, as soon as the partner's screen has said key (at once if it already has)
     Link.on(fn)            fn(partner) every time anything changes on the other screen
     Link.partner()         {role, room, no, title, done: [room ids solved], online} or null
     Link.press(button, key, line)   when the partner says key: show line, then press the button (an exit that the
                            player would otherwise press when the partner says so on the radio)
   Every screen also says by itself which room it is in and which rooms it has finished. */
/* A room loads it with its own script tag, after engine.js and before the room's script; it starts when ER.init has run.
   With no record book (a copy of the site without one) the tag never shows and Link.linked() is always false. */
(function () {
'use strict';
if (window.Link) return;
var D = document, L = window.Link = {}, cfg = null, TEAM = '', ROLE = 'A', booted = false;
var ABC = 'ABCDEFGHJKMNPQRSTUVWXYZ';           /* no I, L or O: they look like 1 and 0 */
var NATO = { A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf', H: 'Hotel', J: 'Juliet', K: 'Kilo', M: 'Mike', N: 'November',
  P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee', Z: 'Zulu' };
var KEEP = 6 * 3600000, AWAY = 12000;          /* a link lasts six hours (the record book forgets it then); a partner silent for 12 s is away */

function get(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
function put(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function el(t, c, h) { var e = D.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
/* what the other screen sends is shown as HTML (room titles have &rsquo; in them), so no tags can come with it */
function esc(s) { return String(s == null ? '' : s).replace(/[<>"]/g, '').slice(0, 80); }
function doneOf(p) { return p && p.s && Array.isArray(p.s['@done']) ? p.s['@done'].length : 0; }
function spell(code) { return code.split('').map(function (c) { return NATO[c] || c; }).join(' &middot; '); }

/* ---------- the link itself ---------- */
var cid = '', lk = null, mine = {};
var peer = null, peerJson = '', clash = false, waits = [], hears = [], fails = 0, again = false, timer = null, made = false, said = '';
function meKey() { return 'keyhole.link.me@' + (lk ? lk.code + ROLE : ''); }

/* the room has called ER.init: who we are, and the link this browser was in (if it is the same story and not too old) */
function boot() {
  if (booted) return true;
  if (!window.ER || !ER.cfg || !ER.cfg.story) return false;
  booted = true; cfg = ER.cfg;
  var m = /^(.+)-([abc])$/.exec(cfg.story);
  TEAM = m ? m[1] : cfg.story; ROLE = m ? m[2].toUpperCase() : 'A';
  L.team = TEAM; L.role = ROLE;
  cid = get('keyhole.link.cid', '');
  if (!/^[a-z0-9]{6,24}$/.test(cid)) { cid = Math.random().toString(36).slice(2, 12) + Date.now().toString(36).slice(-4); put('keyhole.link.cid', cid); }
  lk = get('keyhole.link', null);
  if (!lk || lk.team !== TEAM || !(Date.now() - (lk.at || 0) < KEEP)) lk = null;
  mine = lk ? get(meKey(), {}) : {};
  if (D.body) addTag(); else D.addEventListener('DOMContentLoaded', addTag);
  D.addEventListener('visibilitychange', function () { if (!D.hidden && lk) tick(); });
  paint();
  if (lk) tick();
  return true;
}

function own() {
  var st = ER.state(), out = {}, k;
  for (k in mine) out[k] = mine[k];
  out['@room'] = cfg.id; out['@no'] = cfg.no || ''; out['@title'] = cfg.title || '';
  out['@done'] = Object.keys(st.done || {});
  return out;
}
/* account.js is fetched by engine.js after the page has started, so the first call may have to wait for it */
function call(q) {
  return new Promise(function (res, rej) {
    var n = 0;
    (function go() {
      if (window.Account && Account.post) { Account.post(q, 9000).then(res, rej); return; }
      if (++n > 100) { rej(new Error('offline')); return; }
      setTimeout(go, 50);
    })();
  });
}
function online() { return !window.Account || Account.online(); }       /* not known yet: assume so */

/* The record book takes about 1.4 s to answer (measured 3 November 2026), so two questions are kept going at once,
   0.7 s apart: what the partner does is then seen about a second and a half later. Each question also carries this
   screen's state, numbered, so that an answer overtaken by a newer one changes nothing. */
var GAP = 700, inflight = 0, lastStart = 0, newest = 0, seq = 0, peerSeq = {};
function tick() {
  clearTimeout(timer); timer = null;
  if (!lk || pretend) return;
  var max = fails || D.hidden ? 1 : 2, gap = fails ? Math.min(15000, 1000 * Math.pow(2, Math.min(fails, 4))) : D.hidden ? 5000 : GAP;
  if (inflight >= max) return;                    /* the next answer asks again */
  if (!again && Date.now() - lastStart < gap) { timer = setTimeout(tick, gap - (Date.now() - lastStart)); return; }
  again = false; inflight++;
  var t0 = lastStart = Date.now(), code = lk.code, s = own();
  s['@seq'] = ++seq;
  call({ a: 'duo', code: code, team: TEAM, role: ROLE, cid: cid, s: s }).then(function (r) {
    inflight--;
    if (!lk || lk.code !== code) return;
    if (r && r.ok) { fails = 0; if (t0 >= newest) { newest = t0; heard(r); } }
    else if (r && (r.err === 'nocode' || r.err === 'team')) { drop(); paint(); return; }
    else fails++;
    tick();
  }, function () { inflight--; fails++; paint(); tick(); });
  timer = setTimeout(tick, gap);                  /* the second question, before the first is answered */
}
function bare(s) { var o = {}, k; for (k in (s || {})) if (k !== '@seq') o[k] = s[k]; return o; }
function heard(r) {
  var ps = r.peers || {}, k, p = null, now = r.now || Date.now();
  clash = false;
  for (k in ps) {                                   /* every role has a list: one line for each screen that has taken it */
    (Array.isArray(ps[k]) ? ps[k] : []).forEach(function (e) {
      if (k === ROLE) { if (e.c !== cid && now - e.t < AWAY) clash = true; return; }
      var n = (e.s && e.s['@seq']) || 0;
      if (n < (peerSeq[e.c] || 0)) e = { c: e.c, t: e.t, s: peerSeq['s:' + e.c] || e.s };   /* an older state that arrived late */
      else { peerSeq[e.c] = n; peerSeq['s:' + e.c] = e.s; }
      if (!p || e.t > p.t) p = { role: k, s: bare(e.s), t: e.t };
    });
  }
  var was = peer, first = !peerJson;
  peer = p ? { role: p.role, s: p.s, online: now - p.t < AWAY } : null;
  var j = JSON.stringify(peer);
  if (j !== peerJson) {
    peerJson = j;
    if (peer && (!was || !was.online) && peer.online && made) ER.toast('Your partner is linked.');
    if (peer && was && !first && doneOf(peer) > doneOf(was)) {                     /* the other screen has just opened a lock */
      ER.toast('Your partner is through: ' + (peer.s['@title'] ? esc(peer.s['@title']) : 'a lock is open') + '.');
      ER.tone({ f: 660, dur: 0.16, peak: 0.06 }); ER.tone({ f: 990, dur: 0.22, peak: 0.05, when: 0.12 });
    }
    if (held && peer && peer.online && doneOf(peer) >= held.n) release();
    waits = waits.filter(function (w) { var v = peer && peer.s[w.k]; if (v === undefined || v === null || v === false) return true; try { w.fn(v); } catch (e) { setTimeout(function () { throw e; }); } return false; });
    hears.forEach(function (fn) { try { fn(L.partner()); } catch (e) { setTimeout(function () { throw e; }); } });
  }
  paint();
}
function drop(tell) {
  if (lk && tell) call({ a: 'duo', code: lk.code, team: TEAM, role: ROLE, cid: cid }).then(null, function () {});    /* sent with no state: the record book forgets this screen */
  if (lk) put(meKey(), null);
  lk = null; peer = null; peerJson = ''; mine = {}; clash = false;
  put('keyhole.link', null);
  clearTimeout(timer);
}
function start(code, make) {
  lk = { code: code, team: TEAM, at: Date.now() };
  mine = get(meKey(), {});
  return call({ a: 'duo', code: code, team: TEAM, role: ROLE, cid: cid, make: !!make, s: own() }).then(function (r) {
    if (r && r.ok) { put('keyhole.link', lk); made = true; lastStart = Date.now(); heard(r); tick(); return r; }
    lk = null; mine = {};
    return r || { ok: false, err: 'net' };
  }, function () { lk = null; mine = {}; return { ok: false, err: 'net' }; });
}

/* ---------- for the rooms ---------- */
L.linked = function () { boot(); return !!lk; };
L.set = function (k, v) {
  boot();
  if (v === undefined) v = true;
  mine[k] = v;
  if (lk) { put(meKey(), mine); again = true; tick(); }
  return v;
};
L.get = function (k) { return peer ? peer.s[k] : undefined; };
L.when = function (k, fn) {
  boot();
  var v = L.get(k);
  if (v !== undefined && v !== null && v !== false) { fn(v); return; }
  waits.push({ k: k, fn: fn });
};
L.on = function (fn) { hears.push(fn); if (peer) fn(L.partner()); };
L.partner = function () {
  if (!peer) return null;
  return { role: peer.role, room: peer.s['@room'], no: peer.s['@no'], title: peer.s['@title'], done: peer.s['@done'] || [], online: peer.online };
};
/* engine.js asks before a room is left. With a partner on the other screen who has not yet got through the lock that
   goes with this one, the player waits on a card that says so (and can go on anyway); the card lets them through
   by itself as soon as the partner is through too. Returns true when it is waiting. */
var held = null;
L.before = function (href, go) {
  if (!boot() || !lk || clash || !peer || !peer.online) return false;
  var n = Object.keys(ER.state().done || {}).length;
  if (doneOf(peer) >= n) return false;
  held = { n: n, go: go, card: el('div', 'lk-card') };
  held.card.innerHTML = '<h3>You are through</h3><p>Your partner is still in room ' + esc(peer.s['@no']) + ': <b>' + esc(peer.s['@title']) + '</b>.</p>' +
    '<p>Wait for them here, and help: ask them what they can see, and what they still need from you.</p>' +
    '<p class="lk-small">You will both go on as soon as their lock is open too.</p>' +
    '<div class="lk-row"><button type="button" class="plain" id="lk-anyway">Go on without waiting</button></div>';
  held.card.querySelector('#lk-anyway').onclick = function () { var h = held; held = null; ER.closeAll(); if (h) h.go(); };
  ER.closeAll();
  ER.open('ov-link', held.card, function () { if (held) { var h = held; held = null; ER.toast('You can go on when you are ready.'); h.go = null; } }, { top: true });
  return true;
};
function release() {
  var h = held; held = null;
  if (!h.go) return;
  h.card.innerHTML = '<h3>Your partner is through too</h3><p>Both locks are open. On you go, together.</p>';
  ER.tone({ f: 523, dur: 0.3, peak: 0.07 }); ER.tone({ f: 659, dur: 0.3, peak: 0.06, when: 0.15 }); ER.tone({ f: 784, dur: 0.45, peak: 0.06, when: 0.3 });
  setTimeout(function () { ER.closeAll(); h.go(); }, 1700);
}
/* for a story's test.py, which plays one part alone: pretend that the other screen is linked and has said this.
   Nothing is sent anywhere. Link._pretend({valve: 'shut', '@done': ['steps']}) */
var pretend = false;
L._pretend = function (state, role) {
  boot(); pretend = true;
  if (!lk) lk = { code: 'TEST', team: TEAM, at: Date.now() };
  var ps = {}; ps[role || (ROLE === 'A' ? 'B' : 'A')] = [{ c: 'pretend', t: Date.now(), s: state || {} }];
  heard({ ok: true, now: Date.now(), peers: ps });
};
/* a "Your partner has done it" exit button: when the partner's screen is through the room roomId, and this button is
   showing and nothing is open in front of it, it is pressed for the player */
L.follow = function (button, roomId) {
  if (!button) return;
  var gone = false;
  function look() {
    if (gone || !peer || (peer.s['@done'] || []).indexOf(roomId) < 0) return;
    if (ER.isOpen() || D.querySelector('.capshade.on') || getComputedStyle(button).display === 'none' || button.disabled) return;
    gone = true;
    setTimeout(function () { button.click(); }, 900);
  }
  hears.push(look);
  setInterval(look, 1000);
};
L.press = function (button, k, line) {
  L.when(k, function () {
    if (line) ER.say(line);
    setTimeout(function () { if (button && !button.disabled) button.click(); }, line ? 1800 : 300);
  });
};

/* ---------- what the player sees: a small tag, and the card behind it ---------- */
D.head.appendChild(el('style', null,
  '.lk-tag{position:fixed;left:14px;bottom:14px;z-index:32;display:flex;align-items:center;gap:8px;max-width:min(430px,calc(100vw - 28px));height:34px;padding:0 13px;border:1px solid rgba(255,255,255,.28);border-radius:17px;background:rgba(8,8,9,.74);color:#efe9dc;font:500 13px/1 "Oswald",Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
  '.lk-tag:hover{border-color:#f4e04d}' +
  '.lk-tag i{flex:none;width:10px;height:10px;border-radius:50%;background:#77736b}' +
  '.lk-tag.on i{background:#5fe08a;box-shadow:0 0 8px #5fe08a}.lk-tag.away i{background:#e0a84a}.lk-tag.bad i{background:#e0574a}' +
  '.lk-tag span{overflow:hidden;text-overflow:ellipsis}' +
  '.lk-tag.ask{border-color:#f4e04d;animation:lkp 1.6s ease-in-out infinite}' +
  '@keyframes lkp{50%{box-shadow:0 0 0 6px rgba(244,224,77,.18)}}' +
  '.lk-card{width:min(560px,94vw);padding:24px 26px 22px;background:#f3ecd9;color:#27231d;font-family:"Special Elite","Courier New",monospace}' +
  '.lk-card h3{margin:0 0 10px;font:600 22px/1.2 "Oswald",Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}' +
  '.lk-card p{margin:0 0 12px;font-size:16px;line-height:1.42}' +
  '.lk-card .lk-code{margin:6px 0 4px;font:600 52px/1 "Oswald",Arial,sans-serif;letter-spacing:.32em;text-align:center}' +
  '.lk-card .lk-spell{margin:0 0 14px;font-size:15px;text-align:center;color:#5a5244}' +
  '.lk-card .lk-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}' +
  '.lk-card button{padding:10px 16px 9px;border:1px solid #27231d;border-radius:2px;background:#27231d;color:#f3ecd9;font:500 15px/1 "Oswald",Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}' +
  '.lk-card button.plain{background:transparent;color:#27231d}' +
  '.lk-card button:disabled{opacity:.45;cursor:default}' +
  '.lk-card input{width:7.2em;padding:8px 10px 6px;border:1px solid #27231d;border-radius:2px;background:#fffaf0;color:#27231d;font:600 26px/1 "Oswald",Arial,sans-serif;letter-spacing:.3em;text-transform:uppercase}' +
  '.lk-card .lk-msg{min-height:1.3em;color:#a3321f}' +
  '.lk-card .lk-small{font-size:13px;color:#5a5244}'));

var tag = el('button', 'lk-tag', '<i></i><span></span>'), card = null, msgEl = null;
tag.type = 'button';
tag.addEventListener('click', function (e) { e.stopPropagation(); open(); });
function addTag() { if (!tag.parentNode) D.body.appendChild(tag); }

function firstRoom() { var st = ER.state(); return !(st.seen && st.seen.length > 1) && !Object.keys(st.done || {}).length; }
function paint() {
  var p = L.partner(), t;
  if (!booted) return;
  tag.className = 'lk-tag';
  tag.style.display = online() ? '' : 'none';
  if (window.Account) { if (!Account.online()) return; } else setTimeout(paint, 300);     /* shown or hidden once account.js is here */
  if (!lk) {
    t = 'Link with your partner';
    if (firstRoom() && !get('keyhole.link.no@' + TEAM, 0)) tag.classList.add('ask');
  } else if (clash) {
    t = 'Two screens have taken this part!'; tag.classList.add('bad');
  } else if (fails > 2) {
    t = 'Link: trying again &hellip;'; tag.classList.add('away');
  } else if (!p) {
    t = 'Linked ' + lk.code + ' &middot; waiting for your partner';
  } else if (!p.online) {
    t = 'Partner away'; tag.classList.add('away');
  } else {
    t = 'Partner: ' + (p.no ? 'room ' + esc(p.no) + ' &middot; ' : '') + esc(p.title || ''); tag.classList.add('on');
  }
  if (t !== said) { said = t; tag.querySelector('span').innerHTML = t; }
  if (card && card.parentNode) fill();
}

function open() {
  card = el('div', 'lk-card');
  ER.open('ov-link', card, function () { card = null; }, { top: true });
  fill();
}
function fill() {
  var p = L.partner(), s;
  if (lk) {
    s = '<h3>Your screens are linked</h3><p class="lk-code">' + lk.code + '</p><p class="lk-spell">' + spell(lk.code) + '</p>';
    if (clash) s += '<p class="lk-msg">Your partner has chosen the same part as you. One of you must go back to the stories and choose the other part.</p>';
    else if (!p) s += '<p>Waiting for your partner. Read them the code, letter by letter. They choose <b>Link with your partner</b> on their screen, then <b>I have a code</b>.</p>';
    else s += '<p>Your partner is ' + (p.online ? '<b>here</b>' : '<b>away</b> (no word from their screen for a little while)') + (p.title ? ', in room ' + esc(p.no || '') + ': <b>' + esc(p.title) + '</b>' : '') + '.</p>';
    s += '<p class="lk-small">What one of you does can now change the other screen. The clues are still only on your own screen: say them.</p>' +
      '<div class="lk-row"><button type="button" class="plain" id="lk-off">Unlink</button><button type="button" id="lk-ok">Back to the story</button></div>';
    card.innerHTML = s;
    card.querySelector('#lk-ok').onclick = function () { ER.close(); };
    card.querySelector('#lk-off').onclick = function () { drop(true); paint(); };
    return;
  }
  card.innerHTML = '<h3>Link your two screens</h3>' +
    '<p>Your partner plays the other part, on another screen. Link the two screens and you will see what your partner does, as it happens: a door that opens, a light that goes out.</p>' +
    '<p>You still have to talk. Nothing that you can read goes across.</p>' +
    '<p><b>One</b> of you makes a code. The other one types it in.</p>' +
    '<div class="lk-row"><button type="button" id="lk-make">Make a code</button></div>' +
    '<p style="margin-top:16px">Or, if your partner has read you a code:</p>' +
    '<div class="lk-row"><input id="lk-in" maxlength="4" autocomplete="off" spellcheck="false" placeholder="ABCD"><button type="button" id="lk-join">Link</button></div>' +
    '<p class="lk-msg"></p><div class="lk-row"><button type="button" class="plain" id="lk-no">Play without linking</button></div>';
  msgEl = card.querySelector('.lk-msg');
  var make = card.querySelector('#lk-make'), join = card.querySelector('#lk-join'), inp = card.querySelector('#lk-in');
  function say(t) { msgEl.innerHTML = t; }
  function failed(r) {
    make.disabled = join.disabled = false;
    say({ nocode: 'There is no link with that code. Check the letters with your partner: ask them to spell it.',
      team: 'That code is for a different story. Are you both playing the same one?',
      taken: 'That code is in use. Try again.', busy: 'The record book is busy. Try again in a moment.',
      net: 'The record book cannot be reached just now. You can still play: talk, and press the buttons yourselves.' }[r.err] || 'That did not work. Try again.');
  }
  make.onclick = function () {
    var code = '', i, tries = 0;
    make.disabled = join.disabled = true; say('');
    (function go() {
      for (code = '', i = 0; i < 4; i++) code += ABC.charAt(Math.floor(Math.random() * ABC.length));
      start(code, true).then(function (r) { if (r.ok) paint(); else if (r.err === 'taken' && ++tries < 4) go(); else failed(r); });
    })();
  };
  join.onclick = function () {
    var code = inp.value.toUpperCase().replace(/[^A-Z]/g, '').replace(/[IL]/g, '').replace(/O/g, '');
    if (code.length !== 4) { say('The code has four letters.'); return; }
    make.disabled = join.disabled = true; say('');
    start(code, false).then(function (r) { if (r.ok) paint(); else failed(r); });
  };
  inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') join.click(); e.stopPropagation(); });
  card.querySelector('#lk-no').onclick = function () { put('keyhole.link.no@' + TEAM, 1); ER.close(); paint(); };
}

(function wait() { if (!boot()) setTimeout(wait, 40); })();
})();
