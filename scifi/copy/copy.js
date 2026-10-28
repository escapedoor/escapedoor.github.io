/* Whilst You Were Out - what every room of the story shares. Loaded after engine.js.
   The messages are kept here once, because the crew read the same pile of messages in several rooms. Nothing in this
   file says who wrote which: every room asks case.json. (Proofread this file with the rooms: wordlist.py reads only
   the .html files.) */
window.CP = (function () {
  'use strict';
  var X = {}, D = document;
  var T = function (o) { try { ER.tone(o); } catch (e) {} }, B = function (o) { try { ER.burst(o); } catch (e) {} };

  /* ---------- sounds (through the engine, so the speaker button switches them) ---------- */
  X.sfx = {
    mail: function () { T({ f: 988, dur: 0.12, peak: 0.07 }); T({ f: 1319, dur: 0.22, peak: 0.06, when: 0.11 }); },
    print: function () { for (var i = 0; i < 9; i++) B({ dur: 0.03, f: 2900, q: 2, peak: 0.07, when: i * 0.06 }); },
    stamp: function () { T({ f: 140, f2: 80, dur: 0.12, peak: 0.3 }); B({ dur: 0.05, f: 1400, q: 1, peak: 0.2 }); },
    pen: function () { B({ type: 'highpass', f: 3600, dur: 0.12, peak: 0.06, a: 0.03 }); },
    peg: function () { B({ dur: 0.03, f: 2200, q: 4, peak: 0.16 }); T({ f: 640, dur: 0.05, peak: 0.05 }); },
    dial: function () { B({ dur: 0.02, f: 4300, q: 5, peak: 0.11 }); },
    hm: function () { T({ type: 'triangle', f: 170, f2: 128, dur: 0.26, peak: 0.12, a: 0.05 }); },
    radio: function (d) { B({ type: 'bandpass', f: 1800, q: 0.7, dur: d || 0.6, peak: 0.07, a: 0.05 }); },
    hiss: function (d) { B({ type: 'highpass', f: 2400, dur: d || 1.4, peak: 0.06, a: 0.25 }); },
    door: function () { T({ type: 'sawtooth', f: 58, f2: 64, dur: 2.2, peak: 0.05, a: 0.3 }); B({ type: 'lowpass', f: 260, dur: 2.2, peak: 0.07, a: 0.3 }); },
    clunk: function () { T({ f: 130, f2: 70, dur: 0.18, peak: 0.3 }); B({ dur: 0.05, f: 1700, q: 1, peak: 0.16 }); },
    gurgle: function () { for (var i = 0; i < 5; i++) T({ type: 'triangle', f: 180 + i * 37, f2: 120, dur: 0.12, peak: 0.06, when: i * 0.13 }); }
  };

  X.solved = function (quiet) {
    var sung = false;
    try { sung = !!(ER.music && ER.music() && ER.track && ER.track.sting('solved', null, !!quiet)); } catch (e) {}
    if (!sung && !quiet) ER.sfx.ok();
  };
  X.done = function (id) { var st = ER.state(); st.done = st.done || {}; st.done[id] = 1; ER.persist(true); };
  X.thing = function (sel, word, line, busy) {
    ER.$$(sel).forEach(function (n) {
      n.addEventListener('click', function (e) {
        if (busy && busy()) return;
        if (word) ER.wordAt(e.clientX, e.clientY, word);
        var t = typeof line === 'function' ? line() : line;
        if (t) ER.say(t);
      });
    });
  };
  /* your own notes, in the comms officer's pocket book */
  X.mine = function (id, title, html, quiet) { return ER.addClue(id, title, '<h4>' + title + '</h4>' + html, 'mine', 'Your notes', quiet); };
  X.learn = function (list) {
    var G = window.GLOSS || [];
    list.forEach(function (w) {
      for (var i = 0; i < G.length; i++) if (G[i][0].toLowerCase() === w.toLowerCase()) { ER.addWord(G[i][0], G[i][1]); return; }
    });
  };
  X.bump = function (flag) { var n = (ER.flag(flag) || 0) + 1; ER.flag(flag, n); return n; };
  X.minutes = function () {
    var st = ER.state(), secs = st.fin && st.fin.secs ? st.fin.secs : (st.secs || 0);
    return Math.max(1, Math.round(secs / 60));
  };
  X.esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };

  /* ---------- the messages ---------- */
  /* Six messages from the mail archive, all sent before Sol 211 (the helper was off then). On the galley fridge. */
  X.KNOWN = [
    { id: 'm1', head: 'TO: KAJA GUNDERSEN (EARTH) · SOL 198 · 20:15', greet: 'Hei Kaja,', sign: 'Mum x (301 sols to go)',
      body: 'Today I drove to the edge of the dunes whilst Keiko stayed with her tomatoes. Close up, the sand here is not red at all; it is dark grey, almost black. I have kept a little in a jar for you. Perhaps you can take it to school when I am home.' },
    { id: 'm2', head: 'TO: COMMANDER J. KIRWAN · SOL 201 · 08:40', greet: 'Commander,', sign: 'Liv Gundersen',
      body: 'The left front wheel of Ibex is grinding again. I think it is the same bearing as on Sol 160. Could Hugh look at it before the drive on Sol 203? I can organise the samples whilst he works on it, and we can leave at 07.30.' },
    { id: 'm3', head: 'TO: DR K. ISHIDA · SOL 203 · 19:05', greet: 'Keiko,', sign: 'L.',
      body: 'Back safely. Ibex behaved; the bearing is quiet. I have brought you a rock the colour of your terrible tea. It is on the galley table (please do not put it in the soup). Perhaps tomorrow you can show me the new lettuces.' },
    { id: 'm4', head: 'TO: ALL CREW · SOL 205 · 12:10', greet: 'Everyone,', sign: 'Liv',
      body: 'Whilst the wind is low, I would like to brush the dust off the panels at the centre of the array. It takes about an hour. Who can come out with me at 17.00? Two people are enough; three would be splendid.' },
    { id: 'm5', head: 'SCIENCE LOG · L. GUNDERSEN · SOL 206 · 14:35', greet: '', sign: '',
      body: 'Dust devil crossed the base at 14.20, moving from south-west to north-east. Width about 40 metres. Array output rose from 61% to 70% in four minutes. No damage. The panels are cleaner than after our brushing on Sol 205.' },
    { id: 'm6', head: 'TO: KAJA GUNDERSEN (EARTH) · SOL 207 · 21:30', greet: 'Hei Kaja,', sign: 'Mum x (292 sols to go)',
      body: 'A dust devil came through the base yesterday. It was taller than Grandpa\'s church, and it cleaned our solar panels for free, which was splendid. Perhaps it will come back on Sol 300. I will book it.' }
  ];

  /* Eight messages that Keiko printed in the greenhouse; the printer kept their headers (to, sol, time) and let the
     bodies go. In the order they hang on the line. */
  X.STRIPS = [
    { id: 'a', to: 'TO: DR K. ISHIDA · ARRIVED SOL 212, 10:31', text: 'Hei Keiko! Toasty warm, thanks &mdash; the heater&rsquo;s purring away. I had a lovely long video call with Kaja this morning, and she sounds so grown up! Maybe I&rsquo;ll stay out here a little longer; it&rsquo;s so peaceful. Splendid! Liv x' },
    { id: 'b', to: 'TO: ALL CREW · ARRIVED SOL 212, 03:14', text: 'main radio dead since 21.10. power unit failed, dust inside it. charging gone too. using the suit link, so only in passes. battery 71%. heater on low.' },
    { id: 'c', to: 'TO: COMMANDER J. KIRWAN · ARRIVED SOL 210, 18:05', text: 'Commander, Cores 9 and 10 are done, and the drill is behaving. The dust is low, but the forecast worries me a little. Perhaps we should bring the pick-up forward to Sol 214. I can be packed by 10.00. Liv Gundersen' },
    { id: 'd', to: 'TO: COMMANDER J. KIRWAN · ARRIVED SOL 211, 22:33', text: 'Hei Joss! Don&rsquo;t worry about me &mdash; I&rsquo;m absolutely fine. The link&rsquo;s probably just a loose cable; I&rsquo;ll have a look in the morning. The wind was howling so hard last night that it nearly blew the Igloo over! Splendid evening otherwise. Liv x' },
    { id: 'e', to: 'TO: KAJA GUNDERSEN (EARTH) · SENT SOL 211, 12:00', text: 'Hei Kaja, Core 12 is out: forty centimetres of grey stone, very old and very beautiful. A dust devil is crossing the plain as I write. Mum x (288 sols to go)' },
    { id: 'f', to: 'TO: ALL CREW · ARRIVED SOL 213, 21:41', text: 'battery 28% at 21.30. still falling about 1% an hour. please fetch me whilst the track is open. I am not worried, but I am cold.' },
    { id: 'g', to: 'TO: DR K. ISHIDA · ARRIVED SOL 211, 07:20', text: 'Keiko, Four dust devils on the plain before breakfast; I counted. The coffee here tastes of drill. Do not let Hugh water my cactus. L.' },
    { id: 'h', to: 'TO: COMMANDER J. KIRWAN · ARRIVED SOL 213, 16:58', text: 'Hei Joss! No need to fetch me &mdash; honestly, I&rsquo;m completely fine. I&rsquo;ve got plenty of power, and I&rsquo;d much rather finish my cores while I&rsquo;m here. Maybe see you after the storm! Liv x' }
  ];

  /* Kaja's chat with "Mum", as she printed it: her own times, on her phone in Edinburgh. */
  X.CHAT = [
    { day: 'Three days ago' },
    { k: '17:05', t: 'Mum, did you find any good rocks today?' },
    { m: 'a', at: '18:21', t: 'Hei Kaja, I found a rock with stripes like a zebra. The stripes are mud from a lake that was here more than three billion years ago. I will bring you a photograph. Mum x (288 sols to go)' },
    { k: '19:30', t: 'Goodnight Mum. Krill says goodnight too.' },
    { m: 'd', at: '19:33', t: 'Hei Kaja, Core 12 is out: forty centimetres of grey stone, very old and very beautiful. A dust devil is crossing the plain as I write. Mum x (288 sols to go)' },
    { day: 'The day before yesterday' },
    { k: '17:40', t: 'Krill was sick on my maths homework. Gross.' },
    { m: 'b', at: '17:41', t: 'Oh no! Poor Krill &mdash; and poor maths homework! Maybe give him a little less breakfast? Mum x (288 sols to go)' },
    { k: '17:52', t: 'Has the dust storm reached you yet?' },
    { m: 'c', at: '18:10', t: 'Not yet &mdash; it&rsquo;s still miles away! The sky&rsquo;s a lovely pink color and it&rsquo;s warm and sunny here. Mum x (288 sols to go)' },
    { day: 'Yesterday' },
    { k: '16:15', t: 'Mum, you wrote COLOR. Without a u!!! Are you OK?' },
    { m: 'e', at: '16:41', t: 'Ha! Caught me &mdash; I&rsquo;m typing with my gloves on. Colour, colour, colour! Mum x (288 sols to go)' },
    { k: '16:50', t: 'Prove it&rsquo;s you. What did we call the ferry?' },
    { m: 'f', at: '16:52', t: 'Silly question &mdash; you know it&rsquo;s me! It&rsquo;s splendid to hear from you, sweetheart. Mum x (288 sols to go)' }
  ];

  /* ---------- drawing a message ---------- */
  /* a mail slip: the system's header line, then what the writer wrote */
  X.slip = function (head, html, cls) {
    return '<div class="msg' + (cls ? ' ' + cls : '') + '"><div class="msg-h">' + head + '</div><div class="msg-b">' + html + '</div></div>';
  };
  /* words and marks as separate spans, for the habit pens in the galley */
  X.tokens = function (text, start) {
    var i = start || 0, out = '';
    text.replace(/(\d+\.\d+|\d+%|[A-Za-z]+(?:['’-][A-Za-z]+)*|\d+|[^\sA-Za-z\d])|(\s+)/g, function (m, tok, sp) {
      if (sp) { out += ' '; return m; }
      out += '<span class="tw" data-i="' + (i++) + '">' + X.esc(tok) + '</span>';
      return m;
    });
    return { html: out, next: i };
  };
  return X;
})();
