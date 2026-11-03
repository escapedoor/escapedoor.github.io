/* Show a Light, part B (the watch keeper) - what every room of this part shares.
   WR.card(...)     the card in the top left corner that says what to ask or tell the partner first
   WR.thing(...)    a thing in the scene that answers a click with a line (and a name tag)
   WR.counter(...)  a number or a letter set with arrows
   WR.on / WR.state what the partner's screen does (link.js), and WR.tube(...) the speaking tube
   The station's papers live here, so that every room shows the same ones: the code book, the light list, the tide
   table, the radio card, the Instructions to Keepers, the card of ships' lights. */
window.WR = (function () {
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
  /* vals: the values in order; o.big: also arrows that jump o.big steps; o.cls, o.id, o.change */
  function counter(vals, start, o) {
    o = o || {};
    var i = Math.max(0, vals.indexOf(start)), el = ER.el('span', 'ctr' + (o.cls ? ' ' + o.cls : ''));
    el.innerHTML = (o.big ? '<button type="button" data-d="-' + o.big + '" title="a long way down">&laquo;</button>' : '') + '<button type="button" data-d="-1" title="down">&#9660;</button><b></b>' +
      '<button type="button" data-d="1" title="up">&#9650;</button>' + (o.big ? '<button type="button" data-d="' + o.big + '" title="a long way up">&raquo;</button>' : '');
    if (o.id) el.id = o.id;
    function show() { el.querySelector('b').textContent = vals[i]; }
    el.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null; if (!b) return;
      i = (i + parseInt(b.getAttribute('data-d'), 10) + vals.length * 40) % vals.length; show(); ER.sfx.tick(0.6);
      if (o.change) o.change();
    });
    show();
    return { el: el, value: function () { return vals[i]; }, set: function (v) { var j = vals.indexOf(v); if (j >= 0) { i = j; show(); } } };
  }
  function range(a, b, step, pad) {
    var out = [], v;
    for (v = a; v <= b; v += step) { var s = String(v); if (pad) while (s.length < pad) s = '0' + s; out.push(s); }
    return out;
  }

  /* ---------- the other screen ---------- */
  function on(k, fn) {
    if (!window.Link) return;
    Link.on(function () {
      var v = Link.get(k), last = ER.flag('lk-' + k) || 0;
      if (typeof v === 'number' && v > last) { ER.flag('lk-' + k, v); fn(v); }
    });
  }
  function state(k, fn) { if (window.Link) Link.when(k, fn); }
  function tube(sel, busy) {
    var n = ER.$(sel); if (!n) return;
    n.addEventListener('click', function (e) {
      if (busy && busy()) return;
      ER.wordAt(e.clientX, e.clientY, 'speaking tube');
      sfx.whistle();
      var b = (ER.flag('blown') || 0) + 1; ER.flag('blown', b);
      if (window.Link) Link.set('whistle', b);
      ER.say('You blow up the speaking tube. A hundred and thirty-two steps above you, in the lantern, the whistle shrieks. Now talk.');
    });
    on('whistleA', function () {
      n.classList.remove('shrill'); void n.getBoundingClientRect(); n.classList.add('shrill');
      sfx.whistle();
      ER.say('The whistle in the speaking tube shrieks: your partner is blowing down the tube from the lantern. They want to talk.');
    });
  }
  /* the light of the signal lamp, up in the lantern, flickering on the low cloud: sel is a group in the window */
  function flicker(sel) {
    var n = ER.$(sel); if (!n) return;
    on('flash', function () {
      n.classList.remove('lit'); void n.getBoundingClientRect(); n.classList.add('lit');
      clearTimeout(n._t); n._t = setTimeout(function () { n.classList.remove('lit'); }, 700);
      if (!flicker.said) { flicker.said = 1; ER.say('Light flickers on the low cloud over the yard: your partner is using the signal lamp, up in the lantern.'); }
    });
  }

  /* ---------- the station's papers ---------- */
  var MT = [['A', '•—'], ['B', '—•••'], ['C', '—•—•'], ['D', '—••'], ['E', '•'], ['F', '••—•'], ['G', '——•'], ['H', '••••'], ['I', '••'], ['J', '•———'], ['K', '—•—'], ['L', '•—••'], ['M', '——'],
    ['N', '—•'], ['O', '———'], ['P', '•——•'], ['Q', '——•—'], ['R', '•—•'], ['S', '•••'], ['T', '—'], ['U', '••—'], ['V', '•••—'], ['W', '•——'], ['X', '—••—'], ['Y', '—•——'], ['Z', '——••'],
    ['1', '•————'], ['2', '••———'], ['3', '•••——'], ['4', '••••—'], ['5', '•••••'], ['6', '—••••'], ['7', '——•••'], ['8', '———••'], ['9', '————•'], ['0', '—————'], ['?', '••——••']];
  var CODE = '<h4>The International Code of Signals</h4><p>The station&rsquo;s own copy. Pencil notes in the margins by T. S., the last Principal Keeper.</p>' +
    '<h5>1 · The Morse code (&bull; a short flash, &mdash; a long flash)</h5><div class="mt">' + MT.map(function (m) { return '<span><b>' + m[0] + '</b> ' + m[1] + '</span>'; }).join('') + '</div>' +
    '<p>A long flash is three times as long as a short one. Between the flashes of one letter: a short dark. Between letters: a longer dark. Between words: longer still.</p>' +
    '<h5>2 · Signalling with a lamp</h5><table>' +
    '<tr><td>AA AA AA &hellip;</td><td>The general call: &ldquo;Is anybody there? I want to talk to any station that can see me.&rdquo; It is sent again and again until somebody answers.</td></tr>' +
    '<tr><td>TTTT &hellip;</td><td>The answer to a call: a row of long flashes, sent until the caller stops calling. &ldquo;I can see you. Go on.&rdquo;</td></tr>' +
    '<tr><td>T</td><td>After each word: &ldquo;I have that word.&rdquo;</td></tr>' +
    '<tr><td>EEEEE &hellip;</td><td>A row of short flashes: &ldquo;That was wrong. I am starting again.&rdquo;</td></tr>' +
    '<tr><td>AR</td><td>The end of a message.</td></tr><tr><td>R</td><td>&ldquo;Received.&rdquo;</td></tr></table>' +
    '<h5>3 · Signals of one letter</h5><table>' +
    '<tr><td>C</td><td>Yes.</td></tr><tr><td>D</td><td>Keep clear of me: I am manoeuvring with difficulty.</td></tr>' +
    '<tr><td>E</td><td>I am altering my course to starboard.</td></tr><tr><td>F</td><td>I am disabled. Communicate with me.</td></tr>' +
    '<tr><td>I</td><td>I am altering my course to port.</td></tr><tr><td>K</td><td>I wish to communicate with you.</td></tr>' +
    '<tr><td>N</td><td>No.</td></tr><tr><td>O</td><td>Man overboard.</td></tr><tr><td>U</td><td>You are running into danger.</td></tr>' +
    '<tr><td>V</td><td>I require assistance.</td></tr><tr><td>W</td><td>I require medical assistance.</td></tr>' +
    '<tr><td>X</td><td>Stop carrying out your intentions, and watch for my signals.</td></tr><tr><td>Y</td><td>I am dragging my anchor.</td></tr></table>' +
    '<h5>4 · Pencil, in the margin</h5><p class="pen">POB = persons on board.<br>DRAW: a ship that draws 3 m needs 3 m of water under her, or she is aground.<br>' +
    'A ship with no chart may ask for a LINE: the bearing of our light, for her to steer by.<br>Plain words are fine by lamp. Short ones are better. T. S.</p>';

  var LIST = '<h4>List of Lights · extract</h4><p>The 2026 edition, as carried by every ship. (The station&rsquo;s copy is kept up to date by the Friends.)</p>' +
    '<table><tr><th>Light</th><th>Character</th><th>Height</th><th>Range</th></tr>' +
    '<tr class="hl"><td>Siller Ness</td><td>Fl(3) W 15s</td><td>46 m</td><td>18 M</td></tr>' +
    '<tr><td>Mallack Head</td><td>Fl W 5s</td><td>38 m</td><td>16 M</td></tr>' +
    '<tr><td>Port Mallack, pier end</td><td>Oc R 4s</td><td>6 m</td><td>4 M</td></tr>' +
    '<tr><td>Calf of Siller, south end</td><td>Q G</td><td>9 m</td><td>3 M</td></tr></table>' +
    '<p><b>How to read it.</b> Fl = flashing. (3) = the flashes come in groups of three. W = white. 15s = the <b>period</b>: the whole pattern (three flashes and the dark after them) is repeated every 15 seconds. Oc = occulting: more light than dark. Q = quick: about one flash a second. R = red, G = green. Range in sea miles (M).</p>' +
    '<p>Every light on a coast has a different character, so that a ship can tell which light it is looking at by counting.</p>';

  var TIDE = '<h4>Siller Sound · tides · October 2026</h4><p><b>All times are GMT (UT). In British Summer Time, ADD ONE HOUR.</b> (British Summer Time ends on Sunday 25 October.) Heights in metres.</p>' +
    '<table><tr><th>Day</th><th>Low water</th><th>High water</th><th>Low water</th><th>High water</th></tr>' +
    '<tr><td>Fri 16</td><td>04.20 &nbsp;1.2</td><td>10.31 &nbsp;4.4</td><td>16.39 &nbsp;1.1</td><td>22.52 &nbsp;4.6</td></tr>' +
    '<tr class="hl"><td>Sat 17</td><td>05.02 &nbsp;1.1</td><td>11.14 &nbsp;4.5</td><td>17.21 &nbsp;1.0</td><td>23.35 &nbsp;4.7</td></tr>' +
    '<tr><td>Sun 18</td><td>05.45 &nbsp;1.0</td><td>11.58 &nbsp;4.6</td><td>18.04 &nbsp;0.9</td><td>&mdash;</td></tr></table>' +
    '<p class="pen">THE BAR of the Sound: anything bigger than a rowing boat crosses only within TWO HOURS of high water. Not a minute before. T. S.</p>';

  var ABC = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu'];
  var RADIO = '<h4>On the radio · Siller Ness</h4><p>1. Say who you are calling, then who you are: &ldquo;Mallack Coastguard, this is Siller Ness.&rdquo;<br>2. &ldquo;Over&rdquo; when you want an answer.<br>' +
    '3. <b>Read back</b> every message you are given, and ask for yours to be read back to you.<br>4. Numbers figure by figure: 15 is &ldquo;one five&rdquo;, 50 is &ldquo;five zero&rdquo;.<br>' +
    '5. If a read-back is wrong: &ldquo;Negative. I say again: &hellip;&rdquo;<br>6. Spell names:</p><div class="mt">' + ABC.map(function (w) { return '<span><b>' + w.charAt(0) + '</b> ' + w + '</span>'; }).join('') + '</div>' +
    '<p><b>Time.</b> Coastguards and ships keep UTC (the same as GMT). Our clocks keep British Summer Time until 25 October, one hour AHEAD: 22.00 here is 21.00 UTC.</p>';

  var LIGHTS = '<h4>Ships&rsquo; lights at night</h4>' +
    '<svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg"><rect width="420" height="260" fill="#fffdf4"/>' +
    '<path d="M210 40q34 40 34 110v70h-68v-70q0-70 34-110z" fill="#e9e2cc" stroke="#1c2430" stroke-width="3"/>' +
    '<path d="M210 40L210 10" stroke="#1c2430" stroke-width="2" stroke-dasharray="4 4"/><text x="210" y="8" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="13" text-anchor="middle" fill="#1c2430">AHEAD</text>' +
    '<circle cx="176" cy="120" r="10" fill="#c4372b"/><circle cx="244" cy="120" r="10" fill="#2e9a4a"/><circle cx="210" cy="90" r="8" fill="#fff" stroke="#1c2430" stroke-width="2"/><circle cx="210" cy="226" r="8" fill="#fff" stroke="#1c2430" stroke-width="2"/>' +
    '<text x="120" y="124" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="16" text-anchor="middle" fill="#c4372b">PORT (left): RED</text>' +
    '<text x="306" y="124" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="16" text-anchor="middle" fill="#2e9a4a">STARBOARD (right): GREEN</text>' +
    '<text x="210" y="252" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="14" text-anchor="middle" fill="#1c2430">STERN: WHITE</text></svg>' +
    '<p>&ldquo;Left&rdquo; and &ldquo;right&rdquo; are the ship&rsquo;s, as somebody on board looks forward. A white light on the mast shows ahead; a white light at the stern shows behind.</p>' +
    '<p>See her <b>red</b> light only: you are on her port side, her left. See her <b>green</b> light only: you are on her starboard side, her right. See red AND green: she is coming straight at you. See one white light, low down, and nothing else: you are behind her.</p>';

  /* the Instructions to Keepers: four pages, opened one at a time */
  var PARTS = '<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg"><rect width="560" height="300" fill="#f2ead2"/>' +
    '<g stroke="#2a241a" stroke-width="2" fill="none"><rect x="60" y="190" width="120" height="70" rx="10"/><path d="M180 205h60M240 205v-50"/><rect x="226" y="120" width="28" height="36"/>' +
    '<path d="M120 190v-30h20v-30"/><path d="M196 205l0 -50h28M196 155l-10-25"/><circle cx="246" cy="98" r="8"/><path d="M226 120q20-40 40 0"/>' +
    '<path d="M330 40v220M330 120h70M400 100v60"/><circle cx="430" cy="130" r="26"/><path d="M430 130l14-14"/><path d="M470 60h40v40h-40z"/><path d="M490 100v40M480 170h20v70h-20z"/></g>' +
    '<g font-family="Special Elite,monospace" font-size="13" fill="#2a241a"><text x="72" y="282">1 oil tank</text><text x="118" y="152">2 gauge</text><text x="256" y="208">3 pump handle</text>' +
    '<text x="190" y="176">4 oil valve (a wheel)</text><text x="258" y="94">5 mantles</text><text x="220" y="70">6 spirit cup (under them)</text>' +
    '<text x="338" y="34">7 the clock: weight in a tube</text><text x="404" y="176">8 winding handle</text><text x="452" y="52">9 governor dial</text><text x="440" y="262">10 brake lever</text></g></svg>';
  var BOOK = {
    one: '<h4>Instructions to Keepers · Siller Ness</h4><h5>Lighting up: the No. 1 burner (ONE mantle)</h5><ol>' +
      '<li>Open the curtains round the lens.</li><li>Pump air into the oil tank until the gauge shows <b>60 lb</b>.</li>' +
      '<li>Fill the spirit cup with methylated spirit and light it. It heats the vaporiser.</li><li>When the spirit has nearly burnt out, open the oil valve half a turn. The vapour lights from the spirit flame.</li>' +
      '<li>Wind the clock until the weight is at the top.</li><li>Set the governor.</li><li>Take off the brake. The lens will turn.</li></ol>' +
      '<p class="pen">No. 1 burner taken out in 1961. Kept in the store for spares. T. S.</p>',
    two: '<h4>Instructions to Keepers · Siller Ness</h4><h5>Lighting up: the No. 2 burner (THREE mantles)</h5><ol>' +
      '<li>Open the curtains round the lens.</li><li>Pump air into the oil tank until the gauge shows <b>70 lb</b>. Not more.</li>' +
      '<li>Fill the spirit cup with methylated spirit and light it. It heats the vaporiser. Never send oil into a cold vaporiser.</li>' +
      '<li>When the spirit has nearly burnt out, open the oil valve one full turn. The vapour lights from the spirit flame, and the three mantles glow white.</li>' +
      '<li>Wind the clock until the weight is at the top.</li><li>Set the governor (see the page about the speed of the lens).</li><li>Take off the brake. The lens will turn.</li></ol>' +
      '<p class="pen">The parts, for anyone who has never seen them:</p>' + PARTS,
    speed: '<h4>Instructions to Keepers · Siller Ness</h4><h5>The speed of the lens</h5>' +
      '<p>The lens is made of faces, like a lantern of glass. Each face has its group of bull&rsquo;s-eyes, and each bull&rsquo;s-eye makes one flash as it passes the eye of a ship. So one turn of the lens shows one group from EVERY face.</p>' +
      '<p>Therefore: the seconds for one turn = the period of the light (from the List of Lights) &times; the number of faces on the lens.</p>' +
      '<p>The governor dial is marked in seconds for one turn. The tell-tale in the watch room is set to the same number: if a turn takes longer, its bell rings.</p>' +
      '<p class="pen">The character of this light was changed when the electric light came in 1987. Ships go by the List of Lights. Nothing else. T. S.</p>',
    wind: '<h4>Instructions to Keepers · Siller Ness</h4><h5>Winding the clock</h5>' +
      '<p>The lens is turned by a weight that falls slowly down a tube in the middle of the tower. At one turn a minute, a full winding lasts about fifty minutes. When the weight is near the bottom the lens slows, and the tell-tale bell rings.</p><ol>' +
      '<li>Put the brake ON first. (The lens stops for a few seconds. That does no harm.)</li><li>Turn the winding handle until the pointer shows FULL.</li><li>Take the brake OFF.</li></ol>' +
      '<p><b>Never wind with the brake off:</b> the handle can kick back, and a keeper in 1932 lost two teeth that way.</p>'
  };

  var FACE = {
    sween: '<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="320" fill="#2a2e2a"/><path d="M14 320q4-106 106-116q102 10 106 116z" fill="#2f3f5a"/><path d="M92 206l28 34 28-34" fill="#d8d4c8"/>' +
      '<rect x="104" y="178" width="32" height="32" fill="#c99a7a"/><ellipse cx="120" cy="132" rx="54" ry="62" fill="#ddb090"/><path d="M68 112q-6-50 52-56q58 6 52 56q-10-30-52-32q-42 2-52 32z" fill="#e8e6e0"/>' +
      '<circle cx="98" cy="128" r="4.5" fill="#1d1a14"/><circle cx="142" cy="128" r="4.5" fill="#1d1a14"/><path d="M84 116q14-8 26 0M130 116q14-8 26 0" stroke="#e8e6e0" stroke-width="6" stroke-linecap="round" fill="none"/>' +
      '<path d="M120 132q-6 20 4 26" stroke="#a87a5a" stroke-width="4" fill="none"/><path d="M98 168q22 10 44 0" stroke="#7a3a2a" stroke-width="4" fill="none"/>' +
      '<path d="M40 300q10-60 40-70" stroke="#1b1b1b" stroke-width="10" fill="none"/><rect x="18" y="240" width="40" height="70" rx="12" fill="#1b1b1b"/>' +
      '<text x="120" y="30" font-family="Kalam,cursive" font-weight="700" font-size="18" fill="#f2d28f" text-anchor="middle">Mr Torquil Sween</text><text x="120" y="50" font-family="Space Mono,monospace" font-size="11" fill="#c9c4b4" text-anchor="middle">on the telephone, in the village</text></svg>',
    cg: '<svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="320" fill="#142018"/><rect x="40" y="70" width="160" height="130" rx="10" fill="#2a2e28" stroke="#5a6a52" stroke-width="4"/>' +
      '<rect x="56" y="88" width="90" height="34" fill="#9fe0a0" opacity=".85"/><text x="101" y="112" font-family="Space Mono,monospace" font-weight="700" font-size="17" fill="#142018" text-anchor="middle">CH 16</text>' +
      '<circle cx="174" cy="104" r="14" fill="#1b1b18"/><circle cx="174" cy="150" r="14" fill="#1b1b18"/><g stroke="#5a6a52" stroke-width="3"><path d="M60 140h86M60 154h86M60 168h86"/></g>' +
      '<path d="M200 140q34 10 20 70" stroke="#1b1b18" stroke-width="5" fill="none"/><rect x="198" y="208" width="34" height="50" rx="12" fill="#1b1b18"/>' +
      '<text x="120" y="250" font-family="Kalam,cursive" font-weight="700" font-size="18" fill="#cfe8c4" text-anchor="middle">Mallack Coastguard</text><text x="120" y="272" font-family="Space Mono,monospace" font-size="11" fill="#9fb69a" text-anchor="middle">Ulla Sorensen, on watch</text></svg>'
  };

  var sfx = {
    whistle: function () { ER.tone({ type: 'triangle', f: 1850, f2: 2050, dur: 0.5, peak: 0.06, a: 0.04 }); ER.burst({ type: 'highpass', f: 3000, dur: 0.5, peak: 0.04, a: 0.05 }); },
    radio: function () { ER.burst({ type: 'highpass', f: 2200, dur: 0.22, peak: 0.08, a: 0.01 }); ER.tone({ type: 'square', f: 1400, dur: 0.05, peak: 0.03, when: 0.2 }); },
    ring: function () { [0, 0.45].forEach(function (w) { for (var i = 0; i < 6; i++) ER.tone({ f: i % 2 ? 860 : 920, dur: 0.05, peak: 0.07, when: w + i * 0.05 }); }); },
    bell: function () { [0, 0.3, 0.6].forEach(function (w) { ER.tone({ f: 1320, dur: 0.25, peak: 0.08, when: w }); ER.tone({ f: 2640, dur: 0.12, peak: 0.03, when: w }); }); },
    page: function () { ER.burst({ type: 'highpass', f: 2500, dur: 0.18, peak: 0.1, a: 0.04 }); },
    horn: function () { ER.tone({ type: 'sawtooth', f: 98, dur: 1.6, peak: 0.12, a: 0.15 }); ER.tone({ type: 'sawtooth', f: 74, f2: 70, dur: 1.4, peak: 0.12, a: 0.15, when: 0.25 }); }
  };
  function mins() { var s = ER.state(); return Math.max(1, Math.round(((s.fin ? s.fin.secs : s.secs) || 0) / 60)); }
  function read(html, cls, id, title, kind, done) { ER.read({ html: html, cls: cls, clue: { id: id, title: title, kind: kind }, done: done }); }

  return {
    card: card, thing: thing, counter: counter, range: range, on: on, state: state, tube: tube, flicker: flicker, FACE: FACE, sfx: sfx, mins: mins,
    CODE: CODE, LIST: LIST, TIDE: TIDE, RADIO: RADIO, LIGHTS: LIGHTS, BOOK: BOOK,
    code: function (done) { read(CODE, 'code', 'code', 'The code book', 'On the desk', done); },
    list: function (done) { read(LIST, 'll', 'list', 'The List of Lights', 'On the shelf', done); },
    tide: function (done) { read(TIDE, 'll', 'tide', 'The tide table', 'On the wall', done); },
    radio: function (done) { read(RADIO, 'card2', 'radiocard', 'The radio card', 'Pinned by the radio', done); },
    lights: function (done) { read(LIGHTS, 'card2', 'lights', 'Ships&rsquo; lights at night', 'Pinned over the chart table', done); },
    book: function (page, done) {
      var titles = { one: 'Lighting up: No. 1 burner', two: 'Lighting up: No. 2 burner', speed: 'The speed of the lens', wind: 'Winding the clock' };
      read(BOOK[page], 'book2', 'book-' + page, titles[page], 'Instructions to Keepers', done);
    }
  };
})();
