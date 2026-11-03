/* Still Here, part B (the archivist) - the papers in box P/79/114 and the pictures drawn for them, so that every room
   shows them the same way. Every string here is read by the player: proofread it with the rooms (wordlist.py --text
   does not read this file). */
window.FL = (function () {
  'use strict';

  /* ---------- Room I: the letter and the front page ---------- */
  var LETTER = '<h4>A letter, sent to the Record Office</h4><p>Dear Archivist,</p>' +
    '<p>My father, Lewis Daintree, is sixty-six. In 1979 he was nineteen and worked at Gorringe&rsquo;s Gallery, in the square in the middle of Chalkbourne.</p>' +
    '<p>On the night of Saturday 24 November 1979 there was a party at the gallery for the painter Ivy Dancy. The lights went out for four minutes. When they came back on, her best painting, The Blue Kite, had gone. The police never charged anybody. But the whole town decided it was my father. He left Chalkbourne in 1980 and did not come back for thirty years. He still will not talk about it.</p>' +
    '<p>The police file must be somewhere in your building. An investigator from the Missing Pictures Register will be in the square on 3 November. Please help each other.</p>' +
    '<p>Yours faithfully,<br>Bethan Daintree</p><p>PS. I have sent you the only thing I have: the front page of the Chalkbourne Mercury.</p>';

  /* the gallery from the square, two days after the theft (black and white) */
  function front79(bell) {
    return '<svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="430" fill="#9a9a96"/><rect y="372" width="600" height="58" fill="#5a5a58"/>' +
      '<rect x="0" y="40" width="70" height="340" fill="#7a7874"/><rect x="530" y="40" width="70" height="340" fill="#86847e"/>' +
      '<path d="M78 380V114L300 20L522 114V380Z" fill="#c4c0b6" stroke="#4a4844" stroke-width="3"/>' +
      '<circle cx="300" cy="74" r="20" fill="#3a3a38" stroke="#e8e6e0" stroke-width="5"/><rect x="278" y="100" width="44" height="14" fill="#aaa69c" stroke="#5a5854" stroke-width="1"/><path d="M286 107h28" stroke="#6a6660" stroke-width="2" stroke-dasharray="3 3"/>' +
      '<g fill="#3a3a38" stroke="#e8e6e0" stroke-width="5"><rect x="118" y="160" width="62" height="104"/><rect x="269" y="160" width="62" height="104"/><rect x="420" y="160" width="62" height="104"/></g>' +
      '<path d="M149 160v104M300 160v104M451 160v104M118 212h62M269 212h62M420 212h62" stroke="#e8e6e0" stroke-width="2.5"/>' +
      '<ellipse cx="300" cy="138" rx="19" ry="16" fill="#d6d2c8" stroke="#6a6660" stroke-width="2"/><path d="M284 134q-10 -13 4 -18M316 134q10 -13 -4 -18M288 124q12 -11 24 0" stroke="#6a6a60" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M294 138h3M303 138h3M296 146q4 3 8 0" stroke="#4a4840" stroke-width="1.5" fill="none"/>' +
      '<rect x="78" y="276" width="444" height="30" fill="#2a2a28"/><text x="300" y="297" font-family="Cinzel,serif" font-weight="700" font-size="19" fill="#eeece6" text-anchor="middle" letter-spacing="3">GORRINGE&#8217;S GALLERY</text>' +
      '<rect x="96" y="314" width="160" height="66" fill="#4a4a46" stroke="#e8e6e0" stroke-width="4"/><rect x="344" y="314" width="160" height="66" fill="#4a4a46" stroke="#e8e6e0" stroke-width="4"/>' +
      '<g fill="#d6d2c4"><rect x="112" y="326" width="34" height="26"/><rect x="190" y="322" width="44" height="34"/><rect x="362" y="324" width="40" height="30"/><rect x="440" y="326" width="36" height="28"/></g>' +
      '<rect x="270" y="310" width="60" height="70" fill="#2a2a28" stroke="#e8e6e0" stroke-width="4"/><circle cx="318" cy="348" r="3" fill="#cfcabc"/>' +
      '<g id="bell79"' + (bell ? ' class="bell79"' : '') + '><path d="M300 312v6" stroke="#e8e6e0" stroke-width="2"/><path d="M293 326q0 -9 7 -9q7 0 7 9z" fill="#e8e6e0"/></g>' +
      '<path d="M250 380v-10h16v10" stroke="#1a1a18" stroke-width="3" fill="none"/>' +
      '<g><path d="M214 380V330" stroke="#4a4844" stroke-width="3"/><path d="M204 380V346M224 380V346M204 352h20M204 368h20" stroke="#6a6660" stroke-width="2"/><g fill="#7a7a74"><circle cx="208" cy="330" r="8"/><circle cx="220" cy="326" r="9"/><circle cx="214" cy="318" r="7"/></g></g>' +
      '<path d="M560 420V180M548 180h24l-6 -24h-12z" stroke="#2a2a28" stroke-width="5" fill="#cfcabc"/></svg>';
  }
  var CUTTING_HEAD = '<h4>The Chalkbourne Mercury &middot; Monday 26 November 1979 &middot; 6p</h4><h3>KITE FLIES FROM GALLERY</h3><p class="sub">&pound;15,000 painting vanishes in four dark minutes</p>';
  var CUTTING_TAIL = '<p class="capt">The gallery yesterday, with its door locked and the blind down.</p>' +
    '<p>A painting worth &pound;15,000 disappeared from a gallery in the middle of Chalkbourne on Saturday night, during four minutes when every light in the building went out.</p>' +
    '<p>The Blue Kite, by the Chalkbourne painter Ivy Dancy, was hanging in the front room of the gallery at a party to open her new exhibition. &ldquo;One moment it was there and the next it wasn&rsquo;t,&rdquo; said the owner, Mr Clifford Gorringe.</p>' +
    '<p class="torn">Police are speaking to everybody who was in the building, including a young member of staff, who &hellip;</p>';
  function cutting() { return CUTTING_HEAD + front79(false) + CUTTING_TAIL; }

  /* ---------- Room II: the 1955 plan, and June's photograph ---------- */
  /* 1 m = 40 units. The front wall is at y 560, the partition at y 288 (6.8 m), the back wall at y 108 (4.5 m more). West is on the left. */
  function plan(o) {
    o = o || {};
    var s = '<svg viewBox="0 0 520 660" xmlns="http://www.w3.org/2000/svg"><rect width="520" height="660" fill="#dfe6ea"/>' +
      '<g stroke="#c6d2da" stroke-width="1">' + (function () { var g = '', i; for (i = 0; i < 520; i += 20) g += '<path d="M' + i + ' 0V660"/>'; for (i = 0; i < 660; i += 20) g += '<path d="M0 ' + i + 'H520"/>'; return g; })() + '</g>' +
      '<text x="260" y="30" font-family="Space Mono,monospace" font-weight="700" font-size="14" fill="#1a3a5a" text-anchor="middle">No. 9 CORN MARKET &middot; GROUND FLOOR</text>' +
      '<text x="260" y="48" font-family="Kalam,cursive" font-size="14" fill="#3a4a6a" text-anchor="middle">alterations for Mr C. Gorringe, March 1955</text>' +
      '<g fill="none" stroke="#1a3a5a" stroke-width="7"><path d="M156 108H364V560H156Z"/></g>' +
      /* the partition, with its door at the west end */
      '<path d="M190 288H364" stroke="#1a3a5a" stroke-width="5"/><path d="M156 288h34" stroke="#1a3a5a" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M190 288a34 34 0 0 0 -34 -34" stroke="#1a3a5a" stroke-width="1.5" fill="none"/>' +
      /* the front door, in the middle; windows either side */
      '<path d="M240 560h40" stroke="#dfe6ea" stroke-width="9"/><path d="M240 560a40 40 0 0 1 40 -40" stroke="#1a3a5a" stroke-width="1.5" fill="none"/><path d="M240 560v-40" stroke="#1a3a5a" stroke-width="1.5"/>' +
      '<g stroke="#7aa0c0" stroke-width="5"><path d="M168 560h60M292 560h60M220 108h80"/></g>' +
      /* fireplaces on the east wall */
      '<rect x="340" y="364" width="24" height="60" fill="#9ab0c4" stroke="#1a3a5a" stroke-width="2"/><rect x="340" y="164" width="24" height="60" fill="#9ab0c4" stroke="#1a3a5a" stroke-width="2"/>' +
      /* main switch, cellar door */
      '<rect x="166" y="114" width="30" height="16" fill="#fff" stroke="#c4372b" stroke-width="2"/><text x="181" y="146" font-family="Space Mono,monospace" font-weight="700" font-size="9" fill="#c4372b" text-anchor="middle">MAIN SWITCH</text><text x="181" y="157" font-family="Space Mono,monospace" font-size="8" fill="#c4372b" text-anchor="middle">(cupboard)</text>' +
      '<path d="M156 210v44" stroke="#dfe6ea" stroke-width="9"/><path d="M156 210l-22 10M156 254l-22 -10" stroke="#1a3a5a" stroke-width="1.5"/><text x="128" y="236" font-family="Space Mono,monospace" font-size="9" fill="#1a3a5a" text-anchor="end">steps down</text><text x="128" y="248" font-family="Space Mono,monospace" font-size="9" fill="#1a3a5a" text-anchor="end">to cellar</text>' +
      '<g font-family="Space Mono,monospace" font-weight="700" fill="#1a3a5a" text-anchor="middle"><text x="260" y="430" font-size="15">FRONT GALLERY</text><text x="260" y="196" font-size="15">BACK OFFICE</text></g>' +
      '<g font-family="Kalam,cursive" font-size="14" fill="#3a4a6a" text-anchor="middle"><text x="315" y="356">fireplace</text><text x="315" y="156">fireplace</text><text x="260" y="604">THE CORN MARKET</text><text x="198" y="282">door</text></g>' +
      /* measurements */
      '<g stroke="#3a4a6a" stroke-width="1.2" fill="none"><path d="M400 560V288M394 560h12M394 288h12M400 288V108M394 108h12M400 560V424M400 364"/><path d="M430 560V424M424 560h12M424 424h12M424 364h12M430 424V364"/></g>' +
      '<g font-family="Kalam,cursive" font-size="15" fill="#3a4a6a"><text x="406" y="430" transform="rotate(-90 406 430)" text-anchor="middle">6.8 m</text><text x="406" y="200" transform="rotate(-90 406 200)" text-anchor="middle">4.5 m</text>' +
      '<text x="452" y="496" transform="rotate(-90 452 496)" text-anchor="middle">3.4 m to fireplace</text><text x="452" y="394" transform="rotate(-90 452 394)" text-anchor="middle">1.5 m</text></g>' +
      '<path d="M156 630H364" stroke="#3a4a6a" stroke-width="1.2"/><text x="260" y="650" font-family="Kalam,cursive" font-size="15" fill="#3a4a6a" text-anchor="middle">5.2 m</text>' +
      '<path d="M478 80l10 -26 10 26z" fill="#1a3a5a"/><text x="488" y="98" font-family="Space Mono,monospace" font-weight="700" font-size="13" fill="#1a3a5a" text-anchor="middle">N</text>';
    if (o.zones) s += '<g id="zones">' +
      '<rect class="zn" data-z="ws" x="148" y="300" width="22" height="250" fill="#c4372b" fill-opacity="0"/>' +
      '<rect class="zn" data-z="es" x="350" y="430" width="22" height="122" fill="#c4372b" fill-opacity="0"/>' +
      '<rect class="zn" data-z="en" x="350" y="296" width="22" height="64" fill="#c4372b" fill-opacity="0"/>' +
      '<rect class="zn" data-z="pt" x="196" y="280" width="160" height="16" fill="#c4372b" fill-opacity="0"/></g>';
    s += '<g class="penline"></g>';
    return s + '</svg>';
  }
  /* June Kitto's photograph, 8.30 pm: taken in the big mirror, so everything in it is the wrong way round */
  function photo() {
    return '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg"><rect width="640" height="440" fill="#4a4844"/>' +
      '<rect x="0" y="0" width="640" height="300" fill="#8a8680"/><rect x="0" y="300" width="640" height="140" fill="#5a5650"/><path d="M0 70H640" stroke="#6a6660" stroke-width="5"/>' +
      /* the front window, on the left (really on the right), with the street lamp's glow */
      '<rect x="0" y="80" width="70" height="220" fill="#2a2a28"/><circle cx="30" cy="140" r="30" fill="#e8e4d8" opacity=".35"/>' +
      /* the fireplace in the middle */
      '<rect x="300" y="180" width="130" height="120" fill="#6a6660" stroke="#3a3836" stroke-width="4"/><rect x="330" y="214" width="70" height="86" fill="#1a1a18"/><rect x="290" y="172" width="150" height="12" fill="#3a3836"/>' +
      /* The Blue Kite, to the LEFT of the fireplace in the photograph */
      '<rect x="140" y="110" width="104" height="132" fill="#c8c0a8" stroke="#2a2826" stroke-width="7"/><path d="M168 150l26 -18 14 26 -26 14z" fill="#5a5a58"/><path d="M190 172q-6 30 4 54" stroke="#3a3836" stroke-width="2" fill="none"/>' +
      /* other pictures */
      '<rect x="480" y="120" width="70" height="56" fill="#b8b2a2" stroke="#2a2826" stroke-width="5"/><rect x="568" y="110" width="56" height="74" fill="#a8a294" stroke="#2a2826" stroke-width="5"/>' +
      /* people: Ivy under the kite, Gorringe by the fireplace, Freda, Lightfoot, Lewis with a tray; June in front, with the camera */
      '<g id="ph-ivy"><path d="M168 360q-4 -60 26 -66q30 6 26 66z" fill="#2a2a30"/><circle cx="194" cy="278" r="16" fill="#d8d0c4"/><path d="M180 270q14 -18 28 0q-4 -12 -14 -12q-10 0 -14 12z" fill="#eeeae2"/><circle cx="194" cy="258" r="7" fill="#eeeae2"/></g>' +
      '<g id="ph-cg"><path d="M290 400q-6 -130 28 -140q34 10 30 140z" fill="#4a4036"/><circle cx="320" cy="236" r="18" fill="#d8d0c4"/><path d="M308 244q12 6 24 0" stroke="#e6e2da" stroke-width="5"/><path d="M308 228h8M326 228h8" stroke="#2a2826" stroke-width="2"/>' +
      '<path d="M311 223l4 9" stroke="#f4f2ec" stroke-width="2"/><path d="M332 252q16 2 18 12" stroke="#2a2826" stroke-width="4" fill="none"/><path d="M302 220q18 -16 36 0" stroke="#5a5650" stroke-width="7" fill="none"/></g>' +
      '<g id="ph-fa"><path d="M396 400q-4 -96 28 -104q32 8 28 104z" fill="#6a5a50"/><path d="M398 304q26 12 52 0" stroke="#8a7a6a" stroke-width="12"/><circle cx="424" cy="278" r="15" fill="#d8d0c4"/><circle cx="418" cy="278" r="5" fill="none" stroke="#2a2826" stroke-width="1.5"/><circle cx="430" cy="278" r="5" fill="none" stroke="#2a2826" stroke-width="1.5"/>' +
      '<path d="M404 266q20 -20 40 0z" fill="#3a3632"/><path d="M440 262q30 -40 50 -66" stroke="#2a2826" stroke-width="3" fill="none"/></g>' +
      '<g id="ph-el"><path d="M470 400q-4 -100 30 -108q34 8 30 108z" fill="#1d1d1f"/><circle cx="500" cy="270" r="17" fill="#d8d0c4"/><path d="M488 280q12 14 24 0" stroke="#3a3632" stroke-width="7" fill="none"/><path d="M494 294l6 4 6 -4 -6 -4z" fill="#eeeae2"/></g>' +
      '<g id="ph-ld"><path d="M560 400q-4 -96 26 -104q30 8 26 104z" fill="#5a6a54"/><circle cx="586" cy="276" r="15" fill="#d8d0c4"/><path d="M570 280q-2 -28 16 -30q18 2 16 30" stroke="#3a3632" stroke-width="8" fill="none"/><rect x="590" y="318" width="44" height="6" fill="#cfcabc"/><g fill="#eeeae2"><rect x="596" y="304" width="6" height="14"/><rect x="608" y="304" width="6" height="14"/><rect x="620" y="304" width="6" height="14"/></g></g>' +
      '<g id="ph-jk"><path d="M40 440q-6 -90 40 -100q46 10 40 100z" fill="#2a2a2a"/><circle cx="80" cy="318" r="20" fill="#d8d0c4"/><path d="M60 312q20 -26 40 0" stroke="#1a1a18" stroke-width="10" fill="none"/>' +
      '<rect x="62" y="318" width="40" height="26" rx="3" fill="#1a1a18"/><circle cx="82" cy="331" r="9" fill="#5a5a58" stroke="#9a9a96" stroke-width="2"/><circle cx="96" cy="320" r="3" fill="#eeeae2"/></g>' +
      '</svg>';
  }

  /* ---------- Room III: PC Inskip's notebook, and the list typed the next morning ---------- */
  var NOTES = [
    { id: 'n1', time: '8.47 pm, bus stop, Corn Market', text: 'Gent, bald, short beard, bow tie, black overcoat. Large flat parcel under his arm. Stopped him. &ldquo;A print. I bought it tonight. Here&rsquo;s the receipt.&rdquo; Parcel 40 &times; 30 cm. No gloves on, cold night: says he has lost one. Let him go.' },
    { id: 'n2', time: '8.52 pm, the gallery', text: 'Youth, red hair down to his collar, green jumper. Came up the cellar steps with a torch AND THE EMPTY FRAME. Very nervous. &ldquo;The cellar light went out too. I didn&rsquo;t touch the fuses.&rdquo;' },
    { id: 'n3', time: '8.55 pm', text: 'Lady, hat with a long feather, round specs, fur collar. Was standing by the big mirror. &ldquo;A man went past me in the dark, towards the back. Quick and heavy. He smelt of pipe smoke.&rdquo;' },
    { id: 'n4', time: '9.00 pm', text: 'Old lady, very small, white hair in a bun, velvet jacket, specs on a chain. Upset. &ldquo;It was there when the lights went out. I was looking at it.&rdquo;' },
    { id: 'n5', time: '9.05 pm', text: 'Young woman, very tall, short dark hair, camera round her neck. Press. &ldquo;I heard a big switch go clack, at the back. Twice.&rdquo;' },
    { id: 'n6', time: '9.10 pm', text: 'Gent, tall, thin, grey moustache, pipe in his top pocket. &ldquo;I was at the front window the whole time.&rdquo;' }
  ];
  var NAMES = [
    { id: 'fa', name: 'Mrs Freda Applegarth, 64, widow' },
    { id: 'id', name: 'Miss Ivy Dancy, 70, painter' },
    { id: 'ld', name: 'Mr Lewis Daintree, 19, gallery assistant' },
    { id: 'cg', name: 'Mr Clifford Gorringe, 52, owner of the gallery' },
    { id: 'jk', name: 'Miss June Kitto, 24, photographer, Chalkbourne Mercury' },
    { id: 'el', name: 'Mr Eustace Lightfoot, 45, bank manager' }
  ];
  var NAMELIST = '<h4>Persons present, 24.11.79 &middot; typed 25.11.79</h4><p>In the order of the alphabet. Addresses on the back.</p>' +
    NAMES.map(function (n) { return '<p>' + n.name + '</p>'; }).join('') + '<p class="pencil">PC Inskip: please put the names to your notes. Sgt. K.</p><p class="pencil">Will do. A.I.</p><p class="pencil">(He never did.)</p>';
  function notebook() {
    return '<h4>PC A. Inskip &middot; pocket book &middot; Sat. 24 Nov 1979</h4>' + NOTES.map(function (n, i) { return '<p><b>' + (i + 1) + '.</b> ' + n.time + '. ' + n.text + '</p>'; }).join('') +
      '<p>9.15 pm. Searched all persons and the building. No painting. Empty frame found by the youth at the foot of the cellar steps. Main fuses in cellar: all whole.</p>';
  }

  /* ---------- Room IV: the six statements, typed and signed on 25 and 26 November 1979 ---------- */
  var STATEMENTS = [
    { id: 'fa', who: 'Mrs Freda Applegarth', text: 'I have been to every private view at Gorringe&rsquo;s since 1955. When the lights went out I was standing by the big mirror. It was very dark. The only light came from the street lamp in the Corn Market. A man went past me in the dark, going towards the back room, quick and heavy. He smelt of pipe smoke, and he knocked my hat. A minute or two later somebody came back the same way. When the lights came on, my hat was crooked and the feather had gone.' },
    { id: 'id', who: 'Miss Ivy Dancy', text: 'I was standing in front of my painting, The Blue Kite, between the fireplace and the front window. When the lights went out I could still see the street lamp outside, shining in through the window, and I could see my picture by it. I closed my eyes for a moment, because I was tired. When the lights came back, the wall in front of me was empty. I painted The Blue Kite in 1952, on the downs above the town. It is 24 inches by 18.' },
    { id: 'jk', who: 'Miss June Kitto', text: 'I took a photograph of everybody at half past eight. I took it in the big mirror, so that I could be in it too. When the lights went out I was by the front door. I heard a big switch go clack at the back of the gallery: once when the lights went out, and once, four minutes later, when they came on. I know that sound. My father is an electrician.' },
    { id: 'el', who: 'Mr Eustace Lightfoot', text: 'I came straight from the bank at seven. At about eight I bought a small print of the Corn Market from Mr Gorringe, and he wrapped it for me. I have the receipt. I was by the fireplace when the lights went out. When they came back I saw that the painting had gone, but I had a bus to catch and I left at a quarter to nine. A constable stopped me at the bus stop and looked at my parcel. I lost a glove that evening, I do not know where.' },
    { id: 'ld', who: 'Mr Lewis Daintree', text: 'At about twenty-five to nine Mr Gorringe sent me down to the cellar for more wine. I had just found the bottles when the cellar light went out. I did not touch the fuses. I did not go near them. I heard somebody walk across the floor over my head, quickly, towards the back office. Then something hit the cellar steps behind me, hard, and slid down. When the lights came on, the empty frame of The Blue Kite was at the bottom of the steps. I picked it up and carried it upstairs, which I now know was stupid.' },
    { id: 'cg', who: 'Mr Clifford Gorringe', text: 'At about twenty-five to nine I sent my assistant, Lewis Daintree, down to the cellar for more wine. A few minutes later every light in the building went out. At that moment I was standing at the front window, looking out at the Corn Market. I could see the clock on St Aidan&rsquo;s church quite clearly: it was exactly twenty to nine. I stayed at the window in the dark until the lights came back, about four minutes later. The Blue Kite had gone. The fuses are in the cellar, and Lewis was the only person in the cellar.' }
  ];
  function statement(s) { return '<h4>Statement of ' + s.who + '</h4><p>' + s.text + '</p><p class="sig">' + s.who.replace(/^(Mr|Mrs|Miss) /, '') + '</p>'; }

  /* ---------- Room V: the letters, and three pictures of a kite ---------- */
  var LETTERS = [
    { id: 'bank', date: 'Monday 15 October 1979', title: 'From the bank', html: '<p>Dear Mr Gorringe,</p><p>I am sorry to tell you that the bank cannot lend you any more money. Your gallery already owes us &pound;22,000.</p><p>Yours sincerely,<br>E. Lightfoot, Manager</p>' },
    { id: 'ins', date: 'Friday 2 November 1979', title: 'From Dimsdale Insurance', html: '<p>Dear Mr Gorringe,</p><p>As you asked, from today The Blue Kite (Ivy Dancy, 1952, oil on canvas, 61 &times; 46 cm) is insured for &pound;15,000, not &pound;4,000.</p><p>Please remember: if we pay you for a stolen picture and the picture is found later, it belongs to Dimsdale Insurance.</p>' },
    { id: 'frame', date: 'Saturday 10 November 1979', title: 'A bill from the framer', html: '<p><b>J. Abernethy, picture framer</b></p><p>For Mr C. Gorringe: your own portrait (Miss Dancy, 1960). Frame made deeper, to 6 cm. New back, on hinges, with four brass turn-buttons. Collected by you today.</p><p>&pound;6.50. Paid with thanks.</p>' },
    { id: 'spain', date: 'Thursday 12 June 1980', title: 'From Mr Gorringe, in Spain', html: '<p>Dear Mr Lightfoot,</p><p>When the bank took my gallery in March, I left one thing behind that I would very much like to have: my portrait, which Miss Dancy painted of me in 1960. It hung in the back office. It is worth nothing to anybody but me. Please send it to me at the address above. I will pay for the parcel.</p><p>C. Gorringe</p>' },
    { id: 'reply', date: 'Friday 20 June 1980', title: 'The bank&rsquo;s reply', html: '<p>Dear Mr Gorringe,</p><p>I am afraid that everything in the building was sold with it, on Monday 2 June, to Mr Dudley Elmore, who is opening a shoe shop. I have asked him about your portrait. He tells me he has put all the old pictures in the cellar, and that he is too busy to look for one of them.</p><p>E. Lightfoot</p>' }
  ];
  /* the girl, the kite, the town below. o: {bows, gull, dog, spire: 'L' or 'R', small, grey} */
  function kite(o) {
    var w = o.small ? 300 : 400, h = o.small ? 220 : 300, s = '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"' + (o.small ? ' style="max-width:' + (w * 0.8) + 'px"' : '') + '>', i;
    var g = o.grey;
    s += '<rect width="400" height="300" fill="' + (g ? '#c8c6c0' : '#bcd6e6') + '"/><path d="M0 210q110 -50 220 -18t180 -6V300H0Z" fill="' + (g ? '#8a8a84' : '#8eb06a') + '"/><path d="M0 240q140 -30 260 -6t140 0V300H0Z" fill="' + (g ? '#7a7a74' : '#7a9a56') + '"/>';
    var sx = o.spire === 'L' ? 70 : 330;
    s += '<path d="M' + (sx - 10) + ' 222V176L' + sx + ' 140L' + (sx + 10) + ' 176V222Z" fill="' + (g ? '#5a5a56' : '#6a6a72') + '"/><g fill="' + (g ? '#6a6a66' : '#b07050') + '"><rect x="' + (sx - 46) + '" y="206" width="26" height="16"/><rect x="' + (sx + 18) + '" y="204" width="30" height="18"/></g>';
    s += '<path d="M150 70l40 -30 22 44 -42 24z" fill="' + (g ? '#4a4a48' : '#2f6fc0') + '" stroke="' + (g ? '#2a2a28' : '#1a3a7a') + '" stroke-width="2"/><path d="M170 108q-20 40 -10 80q6 30 -10 60" stroke="#3a3a3a" stroke-width="1.5" fill="none"/>';
    for (i = 0; i < o.bows; i++) { var t = (i + 1) / (o.bows + 1), bx = 170 - 12 * Math.sin(t * 5), by = 108 + t * 140; s += '<path d="M' + (bx - 7).toFixed(1) + ' ' + (by - 4).toFixed(1) + 'l7 4 -7 4zM' + (bx + 7).toFixed(1) + ' ' + (by - 4).toFixed(1) + 'l-7 4 7 4z" fill="#fbfbf6" stroke="#5a5a5a" stroke-width=".8"/>'; }
    s += '<path d="M178 92Q220 160 236 214" stroke="#5a5a5a" stroke-width="1" fill="none"/>';
    s += '<g><path d="M226 286l6 -50h20l6 50z" fill="' + (g ? '#d8d6cc' : '#f2cf4a') + '"/><circle cx="242" cy="226" r="11" fill="' + (g ? '#c8c4bc' : '#e8c0a0') + '"/><path d="M232 220q10 -12 20 0" stroke="' + (g ? '#3a3a38' : '#7a4a20') + '" stroke-width="5" fill="none"/>' +
      '<path d="M236 286v8M248 286v8" stroke="' + (g ? '#2a2a28' : '#c4372b') + '" stroke-width="5"/><path d="M252 240l-14 -24" stroke="' + (g ? '#c8c4bc' : '#e8c0a0') + '" stroke-width="4"/></g>';
    if (o.dog) s += '<g fill="' + (g ? '#3a3a38' : '#4a3a2a') + '"><ellipse cx="282" cy="282" rx="16" ry="8"/><circle cx="296" cy="274" r="6"/><path d="M270 282l-6 -6"/></g>';
    if (o.gull) s += '<path d="M300 60q10 -8 18 0q8 -8 18 0" stroke="' + (g ? '#2a2a28' : '#fbfbf6') + '" stroke-width="3" fill="none"/>';
    return s + '</svg>';
  }
  var KITES = [
    { id: 'k51', title: 'From a sale catalogue, Chalkbourne, 1977', cap: 'Lot 31. Ivy Dancy, The Kite (a study), 1951. Oil on board, 41 &times; 30 cm. Sold.', o: { bows: 5, gull: false, dog: false, spire: 'L', small: true, grey: true } },
    { id: 'k79', title: 'From Dimsdale Insurance, November 1979', cap: 'Insured: The Blue Kite, Ivy Dancy, 1952. Oil on canvas, 61 &times; 46 cm.', o: { bows: 7, gull: true, dog: true, spire: 'R' } },
    { id: 'k85', title: 'From a London sale catalogue, March 1985', cap: 'Lot 112. After Ivy Dancy, The Blue Kite. Oil on canvas, 61 &times; 46 cm. Sold. (The police were told, and came to look.)', o: { bows: 6, gull: true, dog: false, spire: 'R' } }
  ];

  return { LETTER: LETTER, front79: front79, cutting: cutting, plan: plan, photo: photo, NOTES: NOTES, NAMES: NAMES, NAMELIST: NAMELIST, notebook: notebook,
    STATEMENTS: STATEMENTS, statement: statement, LETTERS: LETTERS, kite: kite, KITES: KITES };
})();
