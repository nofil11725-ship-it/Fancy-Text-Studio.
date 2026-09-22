export interface TextStyle {
  id: string;
  name: string;
  category: "popular" | "script" | "gothic" | "aesthetic" | "glitch" | "minimal" | "symbols";
  transform: (text: string) => string;
}

// Unicode mappings for characters with code point discontinuities
const SCRIPT_EXCEPTIONS: Record<string, string> = {
  B: "\u212C", E: "\u2130", F: "\u2131", H: "\u210B", I: "\u2110",
  L: "\u2112", M: "\u2133", R: "\u211B", e: "\u212F", g: "\u210A", o: "\u2134"
};

const FRAKTUR_EXCEPTIONS: Record<string, string> = {
  C: "\u212D", H: "\u210C", I: "\u2111", R: "\u211C", Z: "\u2128"
};

const DOUBLE_STRUCK_EXCEPTIONS: Record<string, string> = {
  C: "\u2102", H: "\u210D", N: "\u2115", P: "\u2119", Q: "\u211A", R: "\u211D", Z: "\u2124"
};

const SMALL_CAPS_MAP: Record<string, string> = {
  a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ",
  j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ",
  s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ"
};

const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ",
  k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ",
  u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "ᗺ", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I", J: "ſ",
  K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Ό", R: "ᴚ", S: "S", T: "┴",
  U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6",
  "?": "¿", "!": "¡", ".": "˙", ",": "'", ";": "؛", "'": ",", """: "„", "(": ")", ")": "(", "[": "]", "]": "["
};

function mapAlphanumeric(
  text: string,
  upperBase: number,
  lowerBase: number,
  digitBase?: number,
  exceptions?: Record<string, string>
): string {
  let result = "";
  for (const char of text) {
    if (exceptions && exceptions[char]) {
      result += exceptions[char];
      continue;
    }
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      result += String.fromCodePoint(upperBase + (code - 65));
    } else if (code >= 97 && code <= 122) {
      result += String.fromCodePoint(lowerBase + (code - 97));
    } else if (digitBase !== undefined && code >= 48 && code <= 57) {
      result += String.fromCodePoint(digitBase + (code - 48));
    } else {
      result += char;
    }
  }
  return result;
}

function addCombining(text: string, mark: string): string {
  return text
    .split("")
    .map((char) => (char === " " ? char : `${char}${mark}`))
    .join("");
}

const ZALGO_MARKS = [
  "\u0300", "\u0301", "\u0302", "\u0303", "\u0304", "\u0305", "\u0306", "\u0307",
  "\u0308", "\u0309", "\u030A", "\u030B", "\u030C", "\u030D", "\u030E", "\u030F",
  "\u0310", "\u0311", "\u0312", "\u0313", "\u0314", "\u0315", "\u031B", "\u033D",
  "\u0346", "\u034A", "\u034B", "\u034C", "\u0350", "\u0351", "\u0352", "\u0357",
  "\u0358", "\u0320", "\u0321", "\u0322", "\u0323", "\u0324", "\u0325", "\u0326"
];

function zalgoText(text: string, intensity = 3): string {
  return text
    .split("")
    .map((char) => {
      if (char === " ") return char;
      let out = char;
      for (let i = 0; i < intensity; i++) {
        const rand = ZALGO_MARKS[Math.floor(Math.random() * ZALGO_MARKS.length)];
        out += rand;
      }
      return out;
    })
    .join("");
}

export const TEXT_STYLES: TextStyle[] = [
  {
    id: "bold-serif",
    name: "Bold Serif",
    category: "popular",
    transform: (t) => mapAlphanumeric(t, 0x1d400, 0x1d41a, 0x1d7ce)
  },
  {
    id: "italic-serif",
    name: "Italic Serif",
    category: "popular",
    transform: (t) => mapAlphanumeric(t, 0x1d434, 0x1d44e, undefined, { h: "\u210E" })
  },
  {
    id: "bold-italic",
    name: "Bold Italic",
    category: "popular",
    transform: (t) => mapAlphanumeric(t, 0x1d468, 0x1d482)
  },
  {
    id: "script",
    name: "Cursive Script",
    category: "script",
    transform: (t) => mapAlphanumeric(t, 0x1d49c, 0x1d4b6, undefined, SCRIPT_EXCEPTIONS)
  },
  {
    id: "bold-script",
    name: "Bold Cursive",
    category: "script",
    transform: (t) => mapAlphanumeric(t, 0x1d4d0, 0x1d4ea)
  },
  {
    id: "fraktur",
    name: "Gothic Fraktur",
    category: "gothic",
    transform: (t) => mapAlphanumeric(t, 0x1d504, 0x1d51e, undefined, FRAKTUR_EXCEPTIONS)
  },
  {
    id: "bold-fraktur",
    name: "Bold Gothic",
    category: "gothic",
    transform: (t) => mapAlphanumeric(t, 0x1d56c, 0x1d586)
  },
  {
    id: "double-struck",
    name: "Double Struck",
    category: "popular",
    transform: (t) => mapAlphanumeric(t, 0x1d538, 0x1d552, 0x1d7d8, DOUBLE_STRUCK_EXCEPTIONS)
  },
  {
    id: "sans-serif",
    name: "Sans Serif",
    category: "minimal",
    transform: (t) => mapAlphanumeric(t, 0x1d5a0, 0x1d5ba, 0x1d7e2)
  },
  {
    id: "bold-sans",
    name: "Bold Sans",
    category: "popular",
    transform: (t) => mapAlphanumeric(t, 0x1d5d4, 0x1d5ee, 0x1d7ec)
  },
  {
    id: "monospace",
    name: "Monospace / Typewriter",
    category: "minimal",
    transform: (t) => mapAlphanumeric(t, 0x1d670, 0x1d68a, 0x1d7f6)
  },
  {
    id: "small-caps",
    name: "Small Caps",
    category: "popular",
    transform: (t) =>
      t
        .split("")
        .map((c) => SMALL_CAPS_MAP[c.toLowerCase()] || c)
        .join("")
  },
  {
    id: "full-width",
    name: "Vaporwave Full-Width",
    category: "aesthetic",
    transform: (t) =>
      t
        .split("")
        .map((c) => {
          const code = c.charCodeAt(0);
          if (c === " ") return "\u3000";
          if (code >= 33 && code <= 126) return String.fromCharCode(code + 65248);
          return c;
        })
        .join("")
  },
  {
    id: "circled",
    name: "Circled Letters",
    category: "symbols",
    transform: (t) =>
      t
        .split("")
        .map((c) => {
          const code = c.charCodeAt(0);
          if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + (code - 65));
          if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + (code - 97));
          if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + (code - 49));
          if (code === 48) return "\u24EA";
          return c;
        })
        .join("")
  },
  {
    id: "inverted-circled",
    name: "Filled Circled (Dark)",
    category: "symbols",
    transform: (t) =>
      t
        .split("")
        .map((c) => {
          const code = c.charCodeAt(0);
          if (code >= 65 && code <= 90) return String.fromCodePoint(0x1f150 + (code - 65));
          if (code >= 97 && code <= 122) return String.fromCodePoint(0x1f150 + (code - 97));
          if (code >= 49 && code <= 57) return String.fromCodePoint(0x2776 + (code - 49));
          return c;
        })
        .join("")
  },
  {
    id: "squared",
    name: "Squared Letters",
    category: "symbols",
    transform: (t) =>
      t
        .split("")
        .map((c) => {
          const code = c.charCodeAt(0);
          if (code >= 65 && code <= 90) return String.fromCodePoint(0x1f130 + (code - 65));
          if (code >= 97 && code <= 122) return String.fromCodePoint(0x1f130 + (code - 97));
          return c;
        })
        .join("")
  },
  {
    id: "inverted-squared",
    name: "Filled Squared",
    category: "symbols",
    transform: (t) =>
      t
        .split("")
        .map((c) => {
          const code = c.charCodeAt(0);
          if (code >= 65 && code <= 90) return String.fromCodePoint(0x1f170 + (code - 65));
          if (code >= 97 && code <= 122) return String.fromCodePoint(0x1f170 + (code - 97));
          return c;
        })
        .join("")
  },
  {
    id: "strikethrough",
    name: "Strikethrough",
    category: "minimal",
    transform: (t) => addCombining(t, "\u0336")
  },
  {
    id: "underline",
    name: "Single Underline",
    category: "minimal",
    transform: (t) => addCombining(t, "\u0332")
  },
  {
    id: "double-underline",
    name: "Double Underline",
    category: "minimal",
    transform: (t) => addCombining(t, "\u0333")
  },
  {
    id: "slash-through",
    name: "Slash Through",
    category: "minimal",
    transform: (t) => addCombining(t, "\u0338")
  },
  {
    id: "upside-down",
    name: "Upside Down",
    category: "popular",
    transform: (t) =>
      t
        .split("")
        .reverse()
        .map((c) => UPSIDE_DOWN_MAP[c] || c)
        .join("")
  },
  {
    id: "reversed",
    name: "Reversed / Mirrored",
    category: "popular",
    transform: (t) => t.split("").reverse().join("")
  },
  {
    id: "zalgo-light",
    name: "Glitch / Zalgo (Mild)",
    category: "glitch",
    transform: (t) => zalgoText(t, 2)
  },
  {
    id: "zalgo-heavy",
    name: "Glitch / Zalgo (Heavy)",
    category: "glitch",
    transform: (t) => zalgoText(t, 5)
  },
  {
    id: "dec-royal",
    name: "Royal Wings",
    category: "aesthetic",
    transform: (t) => `꧁༺ ${t} ༻꧂`
  },
  {
    id: "dec-stars",
    name: "Star Sparks",
    category: "aesthetic",
    transform: (t) => `★彡 ${t} 彡★`
  },
  {
    id: "dec-sparkles",
    name: "Sparkle Dream",
    category: "aesthetic",
    transform: (t) => `✧･ﾟ: *✧ ${t} ✧*:･ﾟ✧`
  },
  {
    id: "dec-hearts",
    name: "Cute Hearts",
    category: "aesthetic",
    transform: (t) => `｡ﾟ•┈୨♡ ${t} ♡୧┈•ﾟ｡`
  },
  {
    id: "dec-bow",
    name: "Aesthetic Ribbon",
    category: "aesthetic",
    transform: (t) => `⑅⃝ ${t} ⑅⃝`
  },
  {
    id: "dec-brackets",
    name: "Bracket Box",
    category: "symbols",
    transform: (t) => `【 ${t} 】`
  },
  {
    id: "dec-corner",
    name: "Japanese Quotation",
    category: "symbols",
    transform: (t) => `『 ${t} 』`
  }
];

export const PRESET_PHRASES = [
  "Fancy Text",
  "Gamer Tag",
  "Aesthetic Bio",
  "Hello World",
  "Stay Creative"
];
