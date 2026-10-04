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
      "I may not always know the perfect words, but I know one thing with complete certainty — I want to walk through life with you.",
      "I want the ordinary days, the difficult days, the quiet moments, the laughter, the celebrations, and everything in between.",
      "I promise to respect you, stand beside you, listen to you, protect our peace, and keep choosing you.",
      "Not only on the day we marry, but on every day that follows.",
      "I may not be perfect, and life may not always be perfect, but I promise that you will never have to face it alone."
    ],
    signature: "With love,\nHemsagar"
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
      text: "I will respect your thoughts, your choices, your dreams, and the person you are."
    },
    {
      number: "02",
      title: "PARTNERSHIP",
      text: "I will stand beside you in the easy days and even closer in the difficult ones."
    },
    {
      number: "03",
      title: "PEACE",
      text: "I will protect the peace we create together and never stop choosing us."
    }
  ],

  heartbeat: {
    heading: "Hold this for a moment.",
    reveal: "Our hearts don't have to beat the same. They only have to choose the same life."
  },

  proposal: {
    name: "Archana...",
    lead: "All of these promises lead to one question.",
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
    vow: "To respect each other. To stand beside each other. To protect our peace. And to keep choosing each other, every day that follows.",
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
