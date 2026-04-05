import { OccasionCategory } from "../backend";
import type { FrontendStyleMode } from "../types";

export const SKIN_TONES = [
  { name: "Fair", hex: "#FDDBB4", id: "fair" },
  { name: "Light", hex: "#F5C596", id: "light" },
  { name: "Light Medium", hex: "#EBB47A", id: "light-medium" },
  { name: "Medium", hex: "#D4956A", id: "medium" },
  { name: "Medium Tan", hex: "#C07D52", id: "medium-tan" },
  { name: "Tan", hex: "#A8673E", id: "tan" },
  { name: "Deep Tan", hex: "#8C4F2A", id: "deep-tan" },
  { name: "Brown", hex: "#6B3420", id: "brown" },
  { name: "Deep Brown", hex: "#4A2010", id: "deep-brown" },
  { name: "Deep", hex: "#2E1008", id: "deep" },
];

export const BODY_TYPES = [
  { id: "apple", name: "Apple", description: "Fuller midsection", icon: "🍎" },
  { id: "pear", name: "Pear", description: "Wider hips", icon: "🍐" },
  {
    id: "hourglass",
    name: "Hourglass",
    description: "Balanced curves",
    icon: "⏳",
  },
  {
    id: "rectangle",
    name: "Rectangle",
    description: "Straight silhouette",
    icon: "▭",
  },
  {
    id: "inverted-triangle",
    name: "Inverted Triangle",
    description: "Broader shoulders",
    icon: "🔻",
  },
  { id: "oval", name: "Oval", description: "Rounded center", icon: "⭕" },
];

export const OCCASIONS: Record<OccasionCategory, string[]> = {
  [OccasionCategory.festive]: [
    "Diwali",
    "Holi",
    "Eid",
    "Christmas",
    "Navratri",
    "Durga Puja",
    "Onam",
    "Baisakhi",
    "Ganesh Chaturthi",
    "Pongal",
    "Makar Sankranti",
    "Ugadi",
    "Karva Chauth",
    "Teej",
    "Lohri",
  ],
  [OccasionCategory.work]: [
    "Office Casual",
    "Board Meeting",
    "Conference",
    "Job Interview",
    "Business Lunch",
    "Client Meeting",
    "WFH",
    "Office Party",
    "Workshop",
    "Seminar",
    "Team Outing",
    "Annual Day",
    "Product Launch",
    "Networking Event",
    "Farewell",
  ],
  [OccasionCategory.casual]: [
    "Brunch",
    "Shopping",
    "Movie",
    "Park Outing",
    "Grocery Run",
    "Coffee Date",
    "Picnic",
    "Day Trip",
    "Weekend Getaway",
    "Beach",
    "Gym / Fitness",
    "Farmer's Market",
    "Road Trip",
    "Camping",
    "Home Party",
  ],
  [OccasionCategory.formal]: [
    "Black Tie",
    "White Tie",
    "Cocktail Party",
    "Award Ceremony",
    "Opera/Theatre",
    "Gallery Opening",
    "Charity Gala",
    "State Dinner",
    "Formal Wedding Guest",
    "Embassy Event",
    "Diplomatic Reception",
    "Award Banquet",
    "Formal Gala",
    "Classical Concert",
    "Formal Inauguration",
  ],
  [OccasionCategory.special]: [
    "Wedding Guest",
    "Engagement Ceremony",
    "Baby Shower",
    "Birthday Party",
    "Anniversary Dinner",
    "Graduation",
    "Sports Event",
    "Music Concert",
    "Art Exhibition",
    "Farewell Party",
    "Bachelorette Party",
    "Mehndi Night",
    "Sangeet Night",
    "Haldi Ceremony",
    "Festival Parade",
  ],
};

export const OCCASION_CATEGORY_LABELS: Record<OccasionCategory, string> = {
  [OccasionCategory.festive]: "Festive",
  [OccasionCategory.work]: "Work / Professional",
  [OccasionCategory.casual]: "Casual",
  [OccasionCategory.formal]: "Formal",
  [OccasionCategory.special]: "Special Events",
};

export const OCCASION_CATEGORY_ICONS: Record<OccasionCategory, string> = {
  [OccasionCategory.festive]: "🪔",
  [OccasionCategory.work]: "💼",
  [OccasionCategory.casual]: "☀️",
  [OccasionCategory.formal]: "🎭",
  [OccasionCategory.special]: "✨",
};

export const DRESS_CODE_MAP: Record<string, string> = {
  // Festive
  Diwali: "Festive Ethnic",
  Holi: "Festive Casual",
  Eid: "Festive Formal",
  Christmas: "Festive Smart",
  Navratri: "Festive Ethnic",
  "Durga Puja": "Festive Formal",
  Onam: "Traditional Ethnic",
  Baisakhi: "Traditional Festive",
  "Ganesh Chaturthi": "Festive Ethnic",
  Pongal: "Traditional Ethnic",
  "Makar Sankranti": "Traditional Ethnic",
  Ugadi: "Traditional Festive",
  "Karva Chauth": "Festive Ethnic",
  Teej: "Traditional Festive",
  Lohri: "Festive Casual",
  // Work
  "Office Casual": "Smart Casual",
  "Board Meeting": "Business Formal",
  Conference: "Business Professional",
  "Job Interview": "Business Formal",
  "Business Lunch": "Business Smart",
  "Client Meeting": "Business Formal",
  WFH: "Casual Comfort",
  "Office Party": "Smart Festive",
  Workshop: "Smart Casual",
  Seminar: "Business Casual",
  "Team Outing": "Smart Casual",
  "Annual Day": "Business Smart",
  "Product Launch": "Business Professional",
  "Networking Event": "Business Casual",
  Farewell: "Smart Casual",
  // Casual
  Brunch: "Casual Chic",
  Shopping: "Casual Comfort",
  Movie: "Smart Casual",
  "Park Outing": "Casual Outdoors",
  "Grocery Run": "Everyday Casual",
  "Coffee Date": "Smart Casual",
  Picnic: "Casual Outdoors",
  "Day Trip": "Travel Casual",
  "Weekend Getaway": "Resort Casual",
  Beach: "Beachwear",
  "Gym / Fitness": "Activewear",
  "Farmer's Market": "Casual Outdoor",
  "Road Trip": "Travel Casual",
  Camping: "Casual Outdoor",
  "Home Party": "Casual Festive",
  // Formal
  "Black Tie": "Black Tie",
  "White Tie": "White Tie",
  "Cocktail Party": "Cocktail Attire",
  "Award Ceremony": "Semi-Formal",
  "Opera/Theatre": "Smart Formal",
  "Gallery Opening": "Smart Chic",
  "Charity Gala": "Black Tie Optional",
  "State Dinner": "Formal Wear",
  "Formal Wedding Guest": "Formal Ethnic / Formal",
  "Embassy Event": "Formal Diplomatic",
  "Diplomatic Reception": "Formal Diplomatic",
  "Award Banquet": "Black Tie",
  "Formal Gala": "Black Tie Optional",
  "Classical Concert": "Smart Formal",
  "Formal Inauguration": "Formal Wear",
  // Special
  "Wedding Guest": "Semi-Formal Ethnic",
  "Engagement Ceremony": "Festive Semi-Formal",
  "Baby Shower": "Smart Casual",
  "Birthday Party": "Smart Festive",
  "Anniversary Dinner": "Cocktail Attire",
  Graduation: "Smart Formal",
  "Sports Event": "Athletic / Casual",
  "Music Concert": "Smart Casual",
  "Art Exhibition": "Artsy Chic",
  "Farewell Party": "Smart Casual",
  "Bachelorette Party": "Party Glam",
  "Mehndi Night": "Festive Ethnic",
  "Sangeet Night": "Festive Ethnic",
  "Haldi Ceremony": "Traditional Bright",
  "Festival Parade": "Festive Ethnic",
};

export const COLOR_GUIDANCE: Record<
  string,
  { colors: string[]; description: string }
> = {
  fair: {
    colors: ["#FFB7C5", "#C8A2C8", "#B5EAD7", "#FFDAC1", "#D4A5A5"],
    description: "Pastels, dusty rose, lavender, mint, soft coral",
  },
  light: {
    colors: ["#FFB7C5", "#C8A2C8", "#B5EAD7", "#FFDAC1", "#D4A5A5"],
    description: "Pastels, dusty rose, lavender, mint, soft coral",
  },
  "light-medium": {
    colors: ["#E07B54", "#D4A054", "#8B7355", "#C8813F", "#6B7C47"],
    description: "Warm earth tones, terracotta, mustard, burnt orange, olive",
  },
  medium: {
    colors: ["#E07B54", "#D4A054", "#8B7355", "#C8813F", "#6B7C47"],
    description: "Warm earth tones, terracotta, mustard, burnt orange, olive",
  },
  "medium-tan": {
    colors: ["#008080", "#003087", "#50C878", "#C21E56", "#7B2D8B"],
    description: "Jewel tones, deep teal, royal blue, emerald, magenta",
  },
  tan: {
    colors: ["#008080", "#003087", "#50C878", "#C21E56", "#7B2D8B"],
    description: "Jewel tones, deep teal, royal blue, emerald, magenta",
  },
  "deep-tan": {
    colors: ["#C5A028", "#722F37", "#B87333", "#228B22", "#C5A028"],
    description: "Rich jewel tones, gold, deep burgundy, copper, forest green",
  },
  brown: {
    colors: ["#C5A028", "#722F37", "#B87333", "#228B22", "#C5A028"],
    description: "Rich jewel tones, gold, deep burgundy, copper, forest green",
  },
  "deep-brown": {
    colors: ["#FF69B4", "#4169E1", "#FFDE00", "#FFFFFF", "#FF4500"],
    description:
      "Bold bright colors, fuchsia, electric blue, bright yellow, white",
  },
  deep: {
    colors: ["#FF69B4", "#4169E1", "#FFDE00", "#FFFFFF", "#FF4500"],
    description:
      "Bold bright colors, fuchsia, electric blue, bright yellow, white",
  },
};

export const SKIN_TONE_COLOR_NOTES: Record<string, string> = {
  fair: "Pastels & dusty rose enhance your fair complexion",
  light: "Lavender & mint bring out your light skin's warmth",
  "light-medium": "Earthy terracotta & mustard suit your warm undertones",
  medium: "Warm amber & olive green complement your medium tone",
  "medium-tan": "Jewel tones like deep teal & royal blue electrify your tan",
  tan: "Rich emerald & magenta glow against your tan skin",
  "deep-tan": "Gold & burgundy make your deep tan skin luminous",
  brown: "Copper & forest green bring out the richness of your brown skin",
  "deep-brown": "Fuchsia & electric blue pop beautifully on deep brown skin",
  deep: "Bold bright fuchsia & white create stunning contrast on your deep tone",
};

export const STYLE_PREFERENCE_LABELS: Record<FrontendStyleMode, string> = {
  indian: "Indian",
  western: "Western",
  indoWestern: "Indo-Western",
  bohemian: "Bohemian",
  minimalist: "Minimalist",
  maximalist: "Maximalist",
  streetwear: "Streetwear",
  vintage: "Vintage / Retro",
};

export const STYLE_PREFERENCE_DESCRIPTIONS: Record<FrontendStyleMode, string> =
  {
    indian: "Sarees, kurtas & ethnic classics",
    western: "Dresses, gowns & tailored looks",
    indoWestern: "Fusion of East & West aesthetics",
    bohemian: "Free-spirited, earthy & layered",
    minimalist: "Clean lines, monochrome & understated",
    maximalist: "Bold prints, textures & drama",
    streetwear: "Urban, edgy & trend-driven",
    vintage: "Classic silhouettes from past decades",
  };

export const STYLE_PREFERENCE_ICONS: Record<FrontendStyleMode, string> = {
  indian: "🪷",
  western: "👗",
  indoWestern: "✨",
  bohemian: "🌿",
  minimalist: "◻️",
  maximalist: "🎨",
  streetwear: "🧢",
  vintage: "🎞️",
};

export const ALL_STYLE_MODES: FrontendStyleMode[] = [
  "indian",
  "western",
  "indoWestern",
  "bohemian",
  "minimalist",
  "maximalist",
  "streetwear",
  "vintage",
];
