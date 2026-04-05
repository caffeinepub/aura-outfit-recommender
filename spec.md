# Aura - Outfit Recommender

## Current State
The app generates 3 outfit recommendations based on user's style preference (primary) + 2 generic alternatives. Color palettes are passed from the skin-tone color guidance table but are not deeply integrated into each outfit card. Body type tips are appended to style tips as a trailing sentence. There is no visible skin-tone compatibility or body-type fitness indicator on outfit cards.

## Requested Changes (Diff)

### Add
- Skin-tone color compatibility label on each outfit card (e.g., "Ideal for your skin tone", "Great color match")
- Body-type fit label on each outfit card (e.g., "Perfect for Apple shape", "Flattering for Pear")
- A dedicated "Why this works for you" section per card that calls out BOTH skin tone and body type suitability explicitly
- Skin-tone-specific color name descriptions per outfit (e.g., "Terracotta & mustard suit your medium-tan tone")
- `skinToneLabel` and `bodyTypeFitNote` fields to `OutfitRecommendation` type
- `SKIN_TONE_FIT_NOTES` map: per skin tone, a short label describing why the outfit colors flatter them
- `BODY_TYPE_FIT_NOTES` map: per body type + style, a short positive affirmation of fit

### Modify
- `generateRecommendations`: pass `skinToneId` (was `_skinToneId`) into the return object to generate skin-tone labels per rec
- `OutfitRecommendation` type: add `skinToneLabel: string` and `bodyTypeFitNote: string`
- `OutfitCard` in ResultsPage: show a "Why this works for you" panel with skin tone + body type compatibility highlights
- Color palette section: show the skin-tone color names alongside the swatches
- Style tips section: restructure so body-type tip appears first ("For your body type: ...") and then outfit styling tip

### Remove
- Nothing removed

## Implementation Plan
1. Add `skinToneLabel` and `bodyTypeFitNote` to `OutfitRecommendation` in `types.ts`
2. Add `SKIN_TONE_COLOR_NAMES` map in `constants.ts`: per skinTone id, human-readable color descriptions (e.g. "Warm terracotta & earthy mustard")
3. Add `BODY_TYPE_FIT_LABELS` map in `recommendations.ts`: per body type, a short flattering note ("A-line silhouettes elongate your frame beautifully")
4. Update `generateRecommendations` in `recommendations.ts`:
   - Use `skinToneId` (remove underscore) to build `skinToneLabel` per outfit card
   - Build `bodyTypeFitNote` from `BODY_TYPE_TIPS[bodyType][style]` (first sentence only as a short teaser)
5. Update `OutfitCard` in `ResultsPage.tsx`:
   - Add a "Why this works for you" collapsible panel showing skin-tone and body-type match
   - Make body-type tip more prominent as a dedicated callout (icon + text) above style tips
   - Add a small skin-tone swatch + color name label inside the card
