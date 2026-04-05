import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Edit2,
  Gem,
  Heart,
  PersonStanding,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  COLOR_GUIDANCE,
  OCCASION_CATEGORY_LABELS,
  STYLE_PREFERENCE_ICONS,
  STYLE_PREFERENCE_LABELS,
} from "../data/constants";
import { generateRecommendations } from "../data/recommendations";
import type {
  FrontendStyleMode,
  OutfitRecommendation,
  UserSelections,
} from "../types";
import { SparklesIcon } from "./icons";

interface ResultsPageProps {
  selections: UserSelections;
  onStartOver: () => void;
  onEditProfile: () => void;
}

const STYLE_BADGE_COLORS: Record<FrontendStyleMode, string> = {
  indian: "bg-orange-100 text-orange-800 border-orange-200",
  western: "bg-blue-100 text-blue-800 border-blue-200",
  indoWestern: "bg-purple-100 text-purple-800 border-purple-200",
  bohemian: "bg-amber-100 text-amber-800 border-amber-200",
  minimalist: "bg-slate-100 text-slate-700 border-slate-200",
  maximalist: "bg-pink-100 text-pink-800 border-pink-200",
  streetwear: "bg-zinc-100 text-zinc-800 border-zinc-300",
  vintage: "bg-rose-100 text-rose-800 border-rose-200",
};

const JEWELLERY_ITEMS = [
  {
    name: "Earrings",
    description: "Statement jhumkas & chandbalis",
    image: "/assets/generated/jewelry-earrings.dim_300x300.jpg",
  },
  {
    name: "Necklaces",
    description: "Kundan, polki & layered chains",
    image: "/assets/generated/jewelry-necklace.dim_300x300.jpg",
  },
  {
    name: "Bangles",
    description: "Gold kadas & glass bangles",
    image: "/assets/generated/jewelry-bangles.dim_300x300.jpg",
  },
];

const SKIN_TONES_MAP: Record<string, string> = {
  fair: "#FDDBB4",
  light: "#F5C596",
  "light-medium": "#EBB47A",
  medium: "#D4956A",
  "medium-tan": "#C07D52",
  tan: "#A8673E",
  "deep-tan": "#8C4F2A",
  brown: "#6B3420",
  "deep-brown": "#4A2010",
  deep: "#2E1008",
};

interface OutfitCardProps {
  recommendation: OutfitRecommendation;
  index: number;
  skinToneHex: string;
  bodyTypeName: string;
}

function OutfitCard({
  recommendation,
  index,
  skinToneHex,
  bodyTypeName,
}: OutfitCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-card rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-shadow group"
      data-ocid={`results.outfit.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-64">
        <img
          src={recommendation.imageSrc}
          alt={recommendation.outfitName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <Badge
            className={`text-xs font-medium border ${
              STYLE_BADGE_COLORS[recommendation.styleType]
            }`}
          >
            <span className="mr-1">
              {STYLE_PREFERENCE_ICONS[recommendation.styleType]}
            </span>
            {STYLE_PREFERENCE_LABELS[recommendation.styleType]}
          </Badge>
          <Badge className="text-xs font-medium bg-white/90 text-espresso border border-white/50 backdrop-blur-sm block w-fit">
            {recommendation.dressCode}
          </Badge>
        </div>
        <button
          type="button"
          data-ocid={`results.outfit.toggle.${index + 1}`}
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          aria-label={liked ? "Unlike outfit" : "Like outfit"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              liked ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-espresso mb-1">
          {recommendation.outfitName}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {recommendation.description}
        </p>

        {/* Color Palette */}
        <div className="mb-4">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            Color Palette
          </div>
          <div className="flex gap-2">
            {recommendation.colorPalette.map((color) => (
              <div
                key={color}
                className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Jewellery */}
        <div className="mb-4">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            Suggested Jewellery
          </div>
          <div className="flex flex-wrap gap-1.5">
            {recommendation.jewellery.map((item) => (
              <span
                key={item}
                className="text-xs bg-gold/10 text-gold border border-gold/20 rounded-full px-2.5 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Why This Works For You */}
        <div className="mb-4 space-y-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Why this works for you
          </div>

          {/* Skin Tone Row */}
          <div className="flex items-start gap-2.5 bg-amber-50 rounded-xl px-3 py-2.5 border border-amber-100">
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0 mt-0.5"
              style={{ backgroundColor: skinToneHex }}
            />
            <p className="text-xs text-amber-800 leading-relaxed">
              {recommendation.skinToneLabel}
            </p>
          </div>

          {/* Body Type Row */}
          <div className="flex items-start gap-2.5 bg-violet-50 rounded-xl px-3 py-2.5 border border-violet-100">
            <PersonStanding className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-violet-800 leading-relaxed">
              <span className="font-medium">{bodyTypeName}</span>:{" "}
              {recommendation.bodyTypeFitNote}
            </p>
          </div>
        </div>

        {/* Style Tips Expandable */}
        <button
          type="button"
          data-ocid={`results.outfit.toggle.tips.${index + 1}`}
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-sm font-medium text-gold hover:text-gold/80 transition-colors pt-2 border-t border-border"
        >
          <span>Style Tips</span>
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-muted-foreground mt-2 leading-relaxed"
          >
            {recommendation.styleTips}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default function ResultsPage({
  selections,
  onStartOver,
  onEditProfile,
}: ResultsPageProps) {
  const colorGuidance =
    COLOR_GUIDANCE[selections.skinTone] ?? COLOR_GUIDANCE.medium;
  const recommendations = generateRecommendations(
    selections.skinTone,
    selections.bodyType,
    selections.occasion.category,
    selections.occasion.subOccasion,
    selections.stylePreference,
    colorGuidance.colors,
  );

  const skinToneHex = SKIN_TONES_MAP[selections.skinTone] ?? "#D4956A";

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Results Header */}
      <div className="bg-secondary border-b border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <SparklesIcon className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium text-gold">
                  Personalized for You
                </span>
              </div>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-espresso">
                Your Perfect Looks
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Based on your{" "}
                <span className="font-medium text-foreground">
                  {selections.skinToneName}
                </span>{" "}
                skin tone,{" "}
                <span className="font-medium text-foreground">
                  {selections.bodyType}
                </span>{" "}
                body type, and{" "}
                <span className="font-medium text-foreground">
                  {OCCASION_CATEGORY_LABELS[selections.occasion.category]} —{" "}
                  {selections.occasion.subOccasion}
                </span>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">Style:</span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${
                    STYLE_BADGE_COLORS[selections.stylePreference]
                  }`}
                >
                  <span>
                    {STYLE_PREFERENCE_ICONS[selections.stylePreference]}
                  </span>
                  {STYLE_PREFERENCE_LABELS[selections.stylePreference]}
                </span>
              </div>
            </motion.div>
            <div className="flex gap-3">
              <Button
                data-ocid="results.edit.button"
                variant="outline"
                size="sm"
                className="rounded-full border-border hover:border-gold hover:text-gold"
                onClick={onEditProfile}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button
                data-ocid="results.restart.button"
                variant="outline"
                size="sm"
                className="rounded-full border-border hover:border-gold hover:text-gold"
                onClick={onStartOver}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Color Guidance Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-warm flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
              style={{
                backgroundColor: skinToneHex,
              }}
            />
            <div>
              <div className="font-medium text-sm text-espresso">
                {selections.skinToneName} Skin Tone
              </div>
              <div className="text-xs text-muted-foreground">
                Your Color Profile
              </div>
            </div>
          </div>
          <div className="flex-1 sm:border-l sm:border-border sm:pl-5">
            <div className="text-xs font-medium text-muted-foreground mb-2">
              Best Colors for You
            </div>
            <div className="flex gap-2 flex-wrap">
              {colorGuidance.colors.map((color) => (
                <div
                  key={color}
                  className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {colorGuidance.description}
            </p>
          </div>
        </motion.div>

        {/* Outfit Recommendations */}
        <section className="mb-16" data-ocid="results.outfits.section">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="font-serif text-3xl font-bold text-espresso">
              Personalized Recommendations
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((rec, idx) => (
              <OutfitCard
                key={rec.outfitName}
                recommendation={rec}
                index={idx}
                skinToneHex={skinToneHex}
                bodyTypeName={selections.bodyType}
              />
            ))}
          </div>
        </section>

        {/* Jewellery Section */}
        <section
          className="rounded-3xl overflow-hidden bg-maroon text-white"
          data-ocid="results.jewellery.section"
        >
          <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Gem className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl lg:text-3xl font-bold">
                    Jewellery Just for You
                  </h2>
                  <p className="text-white/70 text-sm mt-1">
                    Curated pieces to complete your look
                  </p>
                </div>
              </div>
              <Button
                data-ocid="results.jewellery.primary_button"
                variant="outline"
                className="rounded-full border-white/30 text-white hover:bg-white/10 hover:border-white"
              >
                View All Collections
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {JEWELLERY_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  data-ocid={`results.jewellery.item.${idx + 1}`}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/15 transition-colors group"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-bold mb-1">
                      {item.name}
                    </h3>
                    <p className="text-white/60 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
