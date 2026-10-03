/* ===================================================
   CONFIG.JS - HEMSAGAR ❤️ ARCHANA
   Central configuration for story content, dates, and motion profiles
   =================================================== */

export const LOVE_STORY = {
  groom: "Hemsagar",
  bride: "Archana",

  // Set to ISO string (e.g. "2027-02-14T09:30:00+05:30") when date is fixed, or null for written status
  weddingDate: null,

  hero: {
    title: "HEMSAGAR & ARCHANA",
    tagline: "Two souls. One promise. One forever.",
    devotion: "Blessed by love, family and Sri Krishna."
  },

  quietTransition: {
    quote: "Some stories begin loudly. Ours simply felt right.",
    sub: "A quiet grace guided by faith"
  },

  letter: {
    heading: "Archana,",
    paragraphs: [
      "I may not always know the perfect words, but I know exactly what I want from life — to walk through it with you.",
      "I want the ordinary days, the difficult days, the celebrations, the silence, the laughter, and everything in between.",
      "I promise to respect you, stand beside you, listen to you, protect our peace, and keep choosing you.",
      "Not only on the day we marry, but on every day that follows."
    ],
    signature: "Hemsagar"
  },

  splitBridge: "And somewhere between two lives, there became one future.",

  milestones: [
    {
      number: "01",
      title: "The Beginning",
      date: "The First Spark",
      text: "Two lives crossed paths under quiet grace, beginning an effortless journey that felt written in the stars."
    },
    {
      number: "02",
      title: "The First Smile",
      date: "Shared Laughter",
      text: "That warm, heartfelt conversation where time seemed to slow down and every word felt natural."
    },
    {
      number: "03",
      title: "Two Families",
      date: "United Blessings",
      text: "When both families met with open arms, shared values, and mutual respect, sealing our journey with warmth."
    },
    {
      number: "04",
      title: "The Moment I Knew",
      date: "Certainty",
      text: "The peaceful realization that home is no longer a physical place, but simply being beside you."
    },
    {
      number: "05",
      title: "Our Promise",
      date: "Forever Begins",
      text: "Stepping hand in hand towards a lifetime of devotion, unconditional support, and joy."
    }
  ],

  gallery: [
    {
      src: "assets/images/couple.webp",
      fallback: "assets/images/couple.png",
      alt: "Hemsagar and Archana together in Vrindavan light",
      caption: "Us. Bound by grace and devotion.",
      type: "large"
    },
    {
      src: "assets/images/archana.webp",
      fallback: "assets/images/archana.jpg",
      alt: "Archana",
      caption: "Her smile.",
      type: "small"
    },
    {
      src: "assets/images/hemsagar.webp",
      fallback: "assets/images/hemsagar.jpg",
      alt: "Hemsagar",
      caption: "The man who found home.",
      type: "wide"
    }
  ],

  constellation: {
    heading: "The stars that led me to you.",
    nodes: [
      {
        id: "c1",
        x: 18,
        y: 65,
        freq: 392.00, // G4
        title: "The First Glimpse",
        desc: "The serendipity that guided two souls into the same orbit."
      },
      {
        id: "c2",
        x: 38,
        y: 35,
        freq: 440.00, // A4
        title: "Unspoken Conversations",
        desc: "The quiet understanding where words were never needed to feel understood."
      },
      {
        id: "c3",
        x: 52,
        y: 60,
        freq: 493.88, // B4
        title: "Family Blessings",
        desc: "Both families welcoming us with unconditional warmth and prayers."
      },
      {
        id: "c4",
        x: 72,
        y: 28,
        freq: 587.33, // D5
        title: "The Moment of Certainty",
        desc: "The absolute peace of knowing you are my person for this life and beyond."
      },
      {
        id: "c5",
        x: 88,
        y: 50,
        freq: 659.25, // E5
        title: "Our Eternal Orbit",
        desc: "Walking together forever, guided by Krishna's eternal love."
      }
    ]
  },

  scratch: {
    heading: "One thing I never want you to forget.",
    hiddenTitle: "Archana,",
    hiddenText: "I don't need a perfect life. I only want a life where we face everything together."
  },

  promises: [
    {
      number: "01",
      title: "RESPECT",
      text: "I will respect your dreams, your choices, and the person you are."
    },
    {
      number: "02",
      title: "PARTNERSHIP",
      text: "I will walk beside you — not ahead, not behind."
    },
    {
      number: "03",
      title: "HOME",
      text: "Wherever life takes us, I want us to remain each other's safest place."
    }
  ],

  heartbeat: {
    heading: "Hold this for a moment.",
    reveal: "Our hearts don't have to beat the same. They only have to choose the same life."
  },

  proposal: {
    name: "Archana...",
    lead: "I have only one question left.",
    question: "Archana, shall we make forever ours?",
    yesLabel: "YES ❤️",
    hugLabel: "FIRST, GIVE ME A HUG 😄",
    hugDeal: "Deal. 🤍",
    hugSub: "Now come back when you're ready.",
    celebrationTitle: "Forever Starts Here.",
    blessing: "Radhe Radhe 🦚"
  },

  keepsake: {
    heading: "OUR PROMISE",
    couple: "Hemsagar & Archana",
    vow: "To build a life rooted in love, respect, patience, laughter, and faith.",
    signed: "With love, Hemsagar"
  }
};

export const MOTION_PROFILE = {
  mobile: {
    particles: 24,
    parallax: 0,
    blur: "low"
  },
  desktop: {
    particles: 65,
    parallax: 8,
    blur: "medium"
  }
};
