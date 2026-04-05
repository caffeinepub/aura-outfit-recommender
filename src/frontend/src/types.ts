import type { OccasionCategory } from "./backend.d";

// Extended frontend style modes (superset of backend StylePreference)
export type FrontendStyleMode =
  | "indian"
  | "western"
  | "indoWestern"
  | "bohemian"
  | "minimalist"
  | "maximalist"
  | "streetwear"
  | "vintage";

export interface UserSelections {
  skinTone: string;
  skinToneName: string;
  bodyType: string;
  occasion: {
    category: OccasionCategory;
    subOccasion: string;
  };
  stylePreference: FrontendStyleMode;
  photoUrl?: string;
}

export interface OutfitRecommendation {
  outfitName: string;
  description: string;
  colorPalette: string[];
  jewellery: string[];
  styleTips: string;
  styleType: FrontendStyleMode;
  imageSrc: string;
  dressCode: string;
  skinToneLabel: string;
  bodyTypeFitNote: string;
}
