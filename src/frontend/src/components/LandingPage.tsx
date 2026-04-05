import { Button } from "@/components/ui/button";
import {
  Calendar,
  Camera,
  ChevronRight,
  Sliders,
  Sparkles,
  Star,
  UserCheck,
} from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onStart: () => void;
}

const HOW_IT_WORKS = [
  {
    icon: Camera,
    title: "Skin Tone Analysis",
    description:
      "Upload a photo or select your skin tone from our curated palette for personalized color guidance.",
    step: "01",
  },
  {
    icon: UserCheck,
    title: "Select Body Type",
    description:
      "Choose your body shape so we can recommend silhouettes that flatter and celebrate your curves.",
    step: "02",
  },
  {
    icon: Calendar,
    title: "Choose Occasion",
    description:
      "From Diwali to board meetings to black-tie galas — pick from 50+ occasions across 5 categories.",
    step: "03",
  },
  {
    icon: Sliders,
    title: "Set Preferences",
    description:
      "Indian, Western, or Indo-Western — tell us your style DNA for perfectly matched recommendations.",
    step: "04",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Fashion Blogger",
    text: "Aura completely transformed how I dress for events. The color guidance based on my skin tone is spot on — I've never felt more confident.",
    initials: "PS",
    rating: 5,
  },
  {
    name: "Meera Kapoor",
    role: "Marketing Director",
    text: "Finally an app that understands both Indian and Western aesthetics. The jewellery pairing suggestions are chef's kiss!",
    initials: "MK",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    role: "Bride-to-Be",
    text: "Used Aura for every wedding event outfit and looked stunning throughout. The Indo-Western suggestions were perfect.",
    initials: "AR",
    rating: 5,
  },
];

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/20 rounded-full px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Fashion Intelligence
              </div>

              <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-espresso leading-tight">
                Discover Your
                <span className="block text-gold">Perfect Look.</span>
                <span className="block italic text-4xl lg:text-5xl xl:text-6xl font-normal text-muted-foreground">
                  Every Time.
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Personalized outfit recommendations crafted for your unique skin
                tone, body type, and occasion — blending the best of Indian,
                Western, and Indo-Western fashion.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  data-ocid="hero.primary_button"
                  onClick={onStart}
                  size="lg"
                  className="rounded-full bg-gold text-white hover:bg-gold/90 shadow-warm-lg px-8 py-6 text-base font-medium"
                >
                  Discover Your Look
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  data-ocid="hero.secondary_button"
                  variant="outline"
                  size="lg"
                  className="rounded-full border-border hover:border-gold hover:text-gold px-8 py-6 text-base"
                  onClick={onStart}
                >
                  See How It Works
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold text-espresso">
                    50+
                  </div>
                  <div className="text-xs text-muted-foreground">Occasions</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold text-espresso">
                    10
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Skin Tones
                  </div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold text-espresso">
                    3
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Style Modes
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-warm-lg">
                <img
                  src="/assets/generated/hero-woman-saree.dim_600x750.jpg"
                  alt="Elegant woman in traditional attire"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay with color palette */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-warm">
                    <div className="text-xs font-medium text-muted-foreground mb-2">
                      Recommended Palette
                    </div>
                    <div className="flex gap-2">
                      {[
                        "#C9A45A",
                        "#8B3E52",
                        "#6B3420",
                        "#D4956A",
                        "#F3E9D8",
                      ].map((color) => (
                        <div
                          key={color}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 bg-gold text-white rounded-2xl px-4 py-2 shadow-warm-lg text-sm font-medium"
              >
                ✨ Your Style Match
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-espresso mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Four simple steps to your perfect look
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-warm text-center group hover:shadow-warm-lg transition-shadow"
              >
                <div className="relative mb-4">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-gold/20 transition-colors">
                    <step.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xs text-white font-bold">
                      {idx + 1}
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-espresso mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button
              data-ocid="how_it_works.primary_button"
              onClick={onStart}
              size="lg"
              className="rounded-full bg-gold text-white hover:bg-gold/90 shadow-warm px-8"
            >
              Start Your Style Journey
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-espresso mb-4">
              Loved by Fashion-Forward Women
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-card rounded-2xl p-6 shadow-warm hover:shadow-warm-lg transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from(
                    { length: testimonial.rating },
                    (_, i) => `star-${i}`,
                  ).map((starKey) => (
                    <Star
                      key={starKey}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-gold">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-espresso text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-espresso text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-serif text-2xl font-bold">Aura</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Your personal fashion intelligence platform. Discover outfits
                that celebrate your unique beauty and confidence.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white/80 text-sm uppercase tracking-wider">
                Explore
              </h4>
              <ul className="space-y-2">
                {["Home", "Get Styled", "My Looks", "Features"].map((link) => (
                  <li key={link}>
                    <span className="text-white/50 text-sm hover:text-white cursor-pointer transition-colors">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white/80 text-sm uppercase tracking-wider">
                Style
              </h4>
              <ul className="space-y-2">
                {[
                  "Indian Wear",
                  "Western Wear",
                  "Indo-Western",
                  "Jewellery",
                ].map((link) => (
                  <li key={link}>
                    <span className="text-white/50 text-sm hover:text-white cursor-pointer transition-colors">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
