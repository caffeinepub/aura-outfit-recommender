import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Camera, Check, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { OccasionCategory } from "../backend";
import {
  ALL_STYLE_MODES,
  BODY_TYPES,
  OCCASIONS,
  OCCASION_CATEGORY_ICONS,
  OCCASION_CATEGORY_LABELS,
  SKIN_TONES,
  STYLE_PREFERENCE_DESCRIPTIONS,
  STYLE_PREFERENCE_ICONS,
  STYLE_PREFERENCE_LABELS,
} from "../data/constants";
import type { FrontendStyleMode, UserSelections } from "../types";
import { SparklesIcon } from "./icons";

interface ProfileWizardProps {
  initialSelections: UserSelections | null;
  onComplete: (data: UserSelections) => void;
  onBack: () => void;
}

const WIZARD_STEPS = [
  { id: 1, title: "Your Profile", subtitle: "Skin Tone & Body Type" },
  { id: 2, title: "Style Setup", subtitle: "Occasion & Preferences" },
];

export default function ProfileWizard({
  initialSelections,
  onComplete,
  onBack,
}: ProfileWizardProps) {
  const [step, setStep] = useState(1);
  const [skinTone, setSkinTone] = useState(initialSelections?.skinTone ?? "");
  const [skinToneName, setSkinToneName] = useState(
    initialSelections?.skinToneName ?? "",
  );
  const [bodyType, setBodyType] = useState(initialSelections?.bodyType ?? "");
  const [occasionCategory, setOccasionCategory] =
    useState<OccasionCategory | null>(
      initialSelections?.occasion.category ?? null,
    );
  const [subOccasion, setSubOccasion] = useState(
    initialSelections?.occasion.subOccasion ?? "",
  );
  const [stylePreference, setStylePreference] = useState<FrontendStyleMode>(
    initialSelections?.stylePreference ?? "indian",
  );
  const [photoUrl, setPhotoUrl] = useState(initialSelections?.photoUrl ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const objectUrl = URL.createObjectURL(file);
      setPhotoUrl(objectUrl);
      toast.success("Photo uploaded successfully!");
    } catch {
      toast.error("Failed to upload photo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleStep1Next = () => {
    if (!skinTone) {
      toast.error("Please select your skin tone");
      return;
    }
    if (!bodyType) {
      toast.error("Please select your body type");
      return;
    }
    setStep(2);
  };

  const handleSubmit = () => {
    if (!occasionCategory) {
      toast.error("Please select an occasion category");
      return;
    }
    if (!subOccasion) {
      toast.error("Please select a specific occasion");
      return;
    }

    onComplete({
      skinTone,
      skinToneName,
      bodyType,
      occasion: { category: occasionCategory, subOccasion },
      stylePreference,
      photoUrl,
    });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              data-ocid="wizard.back.button"
              onClick={step === 1 ? onBack : () => setStep(1)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <div className="text-sm text-muted-foreground">
              Step {step} of {WIZARD_STEPS.length}
            </div>
          </div>
          <Progress
            data-ocid="wizard.progress"
            value={step === 1 ? 0 : 100}
            className="h-2 mb-6"
          />
          <div className="flex gap-4">
            {WIZARD_STEPS.map((s) => (
              <div
                key={s.id}
                className={`flex-1 p-4 rounded-xl border transition-all ${
                  step === s.id
                    ? "border-gold bg-gold/5"
                    : step > s.id
                      ? "border-green-200 bg-green-50"
                      : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step > s.id
                        ? "bg-green-500 text-white"
                        : step === s.id
                          ? "bg-gold text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.id ? <Check className="w-3 h-3" /> : s.id}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">
                      {s.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {s.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Photo Upload */}
              <div className="bg-card rounded-2xl p-6 shadow-warm">
                <h2 className="font-serif text-2xl font-bold text-espresso mb-1">
                  Your Profile
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Upload a photo (optional) to help us analyze your features
                </p>

                <button
                  type="button"
                  data-ocid="wizard.dropzone"
                  className="w-full border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {photoUrl ? (
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={photoUrl}
                        alt="Profile preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gold/20"
                      />
                      <span className="text-sm text-muted-foreground">
                        Click to change photo
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                        <Camera className="w-7 h-7 text-gold" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          Upload Your Photo
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          PNG, JPG up to 10MB — helps us personalize your
                          results
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 text-gold text-sm hover:bg-gold/10 transition-colors">
                        <Upload className="w-4 h-4" />
                        {isUploading ? "Uploading..." : "Choose Photo"}
                      </span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </button>
              </div>

              {/* Skin Tone Selection */}
              <div className="bg-card rounded-2xl p-6 shadow-warm">
                <h3 className="font-serif text-xl font-bold text-espresso mb-1">
                  Select Your Skin Tone
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Choose the shade that best matches your complexion
                </p>
                <div className="grid grid-cols-5 gap-3">
                  {SKIN_TONES.map((tone) => (
                    <button
                      type="button"
                      key={tone.id}
                      data-ocid="wizard.skin_tone.toggle"
                      onClick={() => {
                        setSkinTone(tone.id);
                        setSkinToneName(tone.name);
                      }}
                      className={`group flex flex-col items-center gap-2 p-2 rounded-xl transition-all ${
                        skinTone === tone.id
                          ? "ring-2 ring-gold bg-gold/5"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          skinTone === tone.id
                            ? "border-gold scale-110"
                            : "border-border"
                        }`}
                        style={{ backgroundColor: tone.hex }}
                      />
                      <span className="text-xs text-center text-muted-foreground leading-tight">
                        {tone.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Body Type Selection */}
              <div className="bg-card rounded-2xl p-6 shadow-warm">
                <h3 className="font-serif text-xl font-bold text-espresso mb-1">
                  Select Your Body Type
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  We'll suggest silhouettes that flatter your shape
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BODY_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type.id}
                      data-ocid="wizard.body_type.toggle"
                      onClick={() => setBodyType(type.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        bodyType === type.id
                          ? "border-gold bg-gold/5 ring-1 ring-gold"
                          : "border-border hover:border-gold/40 hover:bg-muted"
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-medium text-sm text-espresso">
                        {type.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {type.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  data-ocid="wizard.step1.next.button"
                  onClick={handleStep1Next}
                  size="lg"
                  className="rounded-full bg-gold text-white hover:bg-gold/90 px-8"
                >
                  Continue
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Occasion Selection */}
              <div className="bg-card rounded-2xl p-6 shadow-warm">
                <h2 className="font-serif text-2xl font-bold text-espresso mb-1">
                  Define Your Occasion
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Select the event you're dressing for — 50+ occasions across 5
                  categories
                </p>

                <Accordion
                  type="single"
                  collapsible
                  className="space-y-2"
                  defaultValue={occasionCategory ?? undefined}
                >
                  {(Object.values(OccasionCategory) as OccasionCategory[]).map(
                    (cat) => (
                      <AccordionItem
                        key={cat}
                        value={cat}
                        className="border border-border rounded-xl overflow-hidden"
                      >
                        <AccordionTrigger
                          data-ocid="wizard.occasion.tab"
                          className="px-4 py-3 hover:no-underline hover:bg-muted/50"
                          onClick={() => setOccasionCategory(cat)}
                        >
                          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <span>{OCCASION_CATEGORY_ICONS[cat]}</span>
                            <span>{OCCASION_CATEGORY_LABELS[cat]}</span>
                            {occasionCategory === cat && subOccasion && (
                              <span className="ml-2 text-xs text-gold bg-gold/10 rounded-full px-2 py-0.5">
                                {subOccasion}
                              </span>
                            )}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            {OCCASIONS[cat].map((occ) => (
                              <button
                                type="button"
                                key={occ}
                                data-ocid="wizard.occasion.item"
                                onClick={() => {
                                  setOccasionCategory(cat);
                                  setSubOccasion(occ);
                                }}
                                className={`text-left text-sm px-3 py-2 rounded-lg transition-all ${
                                  subOccasion === occ &&
                                  occasionCategory === cat
                                    ? "bg-gold/15 text-gold font-medium"
                                    : "hover:bg-muted text-muted-foreground"
                                }`}
                              >
                                {subOccasion === occ &&
                                  occasionCategory === cat && (
                                    <Check className="inline w-3 h-3 mr-1" />
                                  )}
                                {occ}
                              </button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ),
                  )}
                </Accordion>
              </div>

              {/* Style Preference — enhanced card grid */}
              <div className="bg-card rounded-2xl p-6 shadow-warm">
                <h3 className="font-serif text-xl font-bold text-espresso mb-1">
                  Style Preference
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Choose your style DNA — 8 distinct aesthetics to match your
                  personality
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {ALL_STYLE_MODES.map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      data-ocid="wizard.style.tab"
                      onClick={() => setStylePreference(mode)}
                      className={`relative p-4 rounded-xl border text-left transition-all ${
                        stylePreference === mode
                          ? "border-gold bg-gold/5 ring-1 ring-gold"
                          : "border-border hover:border-gold/40 hover:bg-muted"
                      }`}
                    >
                      {stylePreference === mode && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-gold rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </span>
                      )}
                      <div className="text-2xl mb-2">
                        {STYLE_PREFERENCE_ICONS[mode]}
                      </div>
                      <div className="font-medium text-sm text-espresso leading-tight mb-1">
                        {STYLE_PREFERENCE_LABELS[mode]}
                      </div>
                      <div className="text-xs text-muted-foreground leading-tight">
                        {STYLE_PREFERENCE_DESCRIPTIONS[mode]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  data-ocid="wizard.step2.back.button"
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="mr-2 w-5 h-5" />
                  Back
                </Button>
                <Button
                  data-ocid="wizard.step2.submit.button"
                  onClick={handleSubmit}
                  size="lg"
                  className="rounded-full bg-gold text-white hover:bg-gold/90 px-8"
                >
                  Get My Recommendations
                  <SparklesIcon className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
