import type { OccasionCategory } from "../backend";
import type { FrontendStyleMode, OutfitRecommendation } from "../types";
import {
  DRESS_CODE_MAP,
  OCCASION_CATEGORY_LABELS,
  SKIN_TONE_COLOR_NOTES,
} from "./constants";

type OutfitEntry = {
  name: string;
  desc: string;
  tips: string;
  jewellery: string[];
};

// Body-type-specific tips appended to outfit tips
const BODY_TYPE_TIPS: Record<string, Record<FrontendStyleMode, string>> = {
  apple: {
    indian:
      "Choose sarees with vertical stripes or lightweight fabric. A V-neck blouse elongates the torso. Avoid heavy embroidery at the waist.",
    western:
      "Empire waist dresses and A-line skirts balance proportions beautifully. Wrap dresses skim the midsection. Avoid cropped tops.",
    indoWestern:
      "Flared Anarkalis or peplum kurtas over slim pants draw attention away from the waist — a perfect fusion fit.",
    bohemian:
      "Flowy maxi dresses and tiered skirts with empire waists are your go-to. Loose layering draws the eye up and down gracefully.",
    minimalist:
      "Structured shift dresses and straight-cut trousers with a simple tuck create a clean elongated silhouette.",
    maximalist:
      "Use bold patterns on top halves and rich textures to create visual interest — just keep the waist area in a single deep tone.",
    streetwear:
      "Oversized hoodies and bomber jackets worn open over fitted bottoms balance your proportions with effortless cool.",
    vintage:
      "Fit-and-flare 1950s silhouettes with nipped-in waists and full skirts are incredibly flattering for apple shapes.",
  },
  pear: {
    indian:
      "Opt for heavier blouse embellishments and lighter skirt/lehenga. Boat or square necklines and structured sleeves balance wider hips.",
    western:
      "A-line and fit-and-flare silhouettes flatter. Dark bottoms with lighter or printed tops balance proportions. Wide-leg trousers work well.",
    indoWestern:
      "Dhoti pants and high-waist palazzo in solid colors balance hip width. Pair with structured or embellished tops.",
    bohemian:
      "Flowy tops with wide-sleeve details balanced by slim-fit ankle pants create lovely boho proportion. Add layered necklaces to draw eyes up.",
    minimalist:
      "A straight-line tunic or longline blazer over slim trousers creates a clean elongated line through the hips.",
    maximalist:
      "Bold printed tops with solid-colored wide-leg pants let you make a statement on top while balancing the hips below.",
    streetwear:
      "Crop tops with high-waisted cargo pants or wide-leg joggers balance proportions while keeping the urban aesthetic intact.",
    vintage:
      "High-waisted full skirts and peplum blouses from 1950s-60s styles naturally complement pear shapes beautifully.",
  },
  hourglass: {
    indian:
      "Almost any silhouette works — embrace fitted blouses, wrap sarees, and belted kurtas that celebrate your balanced curves.",
    western:
      "Wrap dresses, bodycon midi dresses, and belted blazers all flatter your figure. Emphasize the waist for best effect.",
    indoWestern:
      "Fitted kurtas with flared pants, belted Anarkalis, and cape lehengas all highlight your beautiful silhouette.",
    bohemian:
      "Wrap maxi dresses and belted boho tunics highlight your waist naturally. Layer freely — your silhouette holds through any volume.",
    minimalist:
      "A simple wrap dress or well-tailored trousers with a fitted tee let your natural shape speak without decoration.",
    maximalist:
      "Rich brocades, bold florals, and heavily textured fabrics celebrate every curve — you can carry any volume beautifully.",
    streetwear:
      "Fitted crop tops with high-waisted baggy bottoms or a cinched-waist oversized jacket show off your shape with urban edge.",
    vintage:
      "Every vintage era suits you — from 1950s nipped waists to 70s wrap dresses, your proportions are the ideal vintage canvas.",
  },
  rectangle: {
    indian:
      "Create curves with heavily embroidered blouses, ruffled dupattas, and layered lehengas. Ruched saree draping adds volume.",
    western:
      "Peplum tops, ruffled skirts, and wrap dresses create the illusion of curves. Avoid boxy or straight cuts.",
    indoWestern:
      "Choose voluminous Anarkalis, dhoti skirts, or fusion lehengas to add movement and feminine shape.",
    bohemian:
      "Layered looks are made for you — tiered skirts, open kimonos, and draped tops all add the curves and volume you want.",
    minimalist:
      "A-line cuts and belted pieces with subtle structure can create soft definition. Monochrome outfits elongate nicely.",
    maximalist:
      "Go wild with layering, ruffles, and mixed patterns — the more volume and texture, the more shape you create.",
    streetwear:
      "Layered streetwear is perfect — an open flannel over a graphic tee with cargo pants adds interesting dimension.",
    vintage:
      "1940s square-shoulder suits and 1960s shift dresses with a-line minis work beautifully on a straight frame.",
  },
  "inverted-triangle": {
    indian:
      "Keep blouse embellishments minimal. Opt for heavily embroidered lehengas and sarees with wide borders at the hem to balance shoulders.",
    western:
      "A-line skirts, wide-leg pants, and full midi skirts balance broader shoulders. V-necklines elongate. Avoid cap sleeves.",
    indoWestern:
      "Palazzo suits, dhoti pants, and flared skirt-kurta sets balance shoulder width beautifully.",
    bohemian:
      "Wide-leg palazzo pants and maxi flared skirts balance your silhouette. Open-neck flowy tops avoid adding shoulder bulk.",
    minimalist:
      "V-neck fitted tops with wide-leg trousers in the same tone create a streamlined silhouette that balances proportions.",
    maximalist:
      "Rich textured bottoms with bold patterns and full volume at the hem draw the eye down and create beautiful balance.",
    streetwear:
      "Baggy pants or wide-leg cargo trousers with a sleek fitted top or tank balance your strong shoulders with urban ease.",
    vintage:
      "1950s full skirts and 1970s wide-leg trousers perfectly balance broader shoulders — classic silhouettes work in your favor.",
  },
  oval: {
    indian:
      "Lightweight sarees with vertical borders and Anarkali kurtas with V-necks elongate the silhouette. Single-tone outfits work best.",
    western:
      "Shift dresses, monochromatic looks, and wrap dresses are most flattering. High-waisted bottoms and long cardigans elongate.",
    indoWestern:
      "Long straight kurtas over wide-leg pants create a tall, elongated silhouette. Avoid cropped lengths.",
    bohemian:
      "Longline flowy cardigans, maxi dresses, and vertical stripe patterns all create beautiful elongation.",
    minimalist:
      "Monochromatic head-to-toe dressing in clean vertical lines is your most elegant and elongating choice.",
    maximalist:
      "Use vertical stripes and tall, sweeping patterns. Keep the most dramatic textures at the neckline and hemline.",
    streetwear:
      "Longline hoodies, straight-leg trousers, and sleek monochrome streetwear looks with minimal layering elongate the frame.",
    vintage:
      "Column gowns and 1960s A-line shifts in solid colors create a sleek elongated vintage silhouette.",
  },
};

// Sub-occasion specific outfit entries per style
const SUB_OCCASION_OUTFITS: Record<
  FrontendStyleMode,
  Record<string, OutfitEntry>
> = {
  indian: {
    Diwali: {
      name: "Banarasi Silk Saree",
      desc: "A resplendent Banarasi silk saree with rich zari border and diyas-motif brocade. Draped elegantly to catch the festival lights.",
      tips: "Drape in the Gujarati style for a festive look. Contrast-colored blouse with mirror work adds sparkle.",
      jewellery: [
        "Kundan choker",
        "Jhumka earrings",
        "Bangles set",
        "Maang tikka",
      ],
    },
    Holi: {
      name: "White Cotton Kurta Set",
      desc: "Crisp white cotton kurta with palazzo — a blank canvas ready for the colors of Holi. Comfortable and festive.",
      tips: "Choose easy-wash cotton. Keep jewelry minimal since colors will stain. Flat sandals or juttis work best.",
      jewellery: ["Simple silver studs", "Glass bangles"],
    },
    Eid: {
      name: "Embroidered Georgette Sharara",
      desc: "A pastel georgette sharara set with intricate aari embroidery and a sheer dupatta. Ethereal and celebratory for Eid.",
      tips: "Opt for mint, soft pink, or ivory. Fold the dupatta in front and secure with a brooch for a regal look.",
      jewellery: [
        "Polki necklace set",
        "Chandbali earrings",
        "Haath phool",
        "Glass bangles",
      ],
    },
    Navratri: {
      name: "Chaniya Choli",
      desc: "Vibrant mirror-work chaniya choli with a bandhej dupatta in traditional nine Navratri colors for garba dancing.",
      tips: "Choose the color of the day. Comfort is key — opt for a well-fitted blouse and a lightweight choli for dancing.",
      jewellery: [
        "Oxidised silver set",
        "Ghungroo earrings",
        "Kadas",
        "Kamarband",
      ],
    },
    "Durga Puja": {
      name: "Tant Saree or Katan Silk",
      desc: "Traditional Bengali Tant saree or Katan silk in earthy reds, whites, and golds — the hallmark of Durga Puja celebrations.",
      tips: "Red and white combination is traditional. Drape with a wide border showing. Gold accessories complete the look.",
      jewellery: ["Gold jhumkas", "Shakha pola bangles", "Gold chain", "Bindi"],
    },
    Onam: {
      name: "Kerala Kasavu Saree",
      desc: "Classic Kerala Kasavu (Mundu) saree in white cotton with gold zari border — the quintessential Onam attire.",
      tips: "Wear with a matching Kasavu blouse. Jasmine flowers in hair and a bright golden belt elevate the look.",
      jewellery: ["Gold necklace", "Palakka mala", "Gold bangles", "Kasumala"],
    },
    Baisakhi: {
      name: "Phulkari Suit",
      desc: "Bright Punjabi salwar suit with vibrant Phulkari embroidery — the traditional and joyful harvest festival look.",
      tips: "Bright pinks, oranges, and yellows are traditional. Pair with juttis and a colorful dupatta.",
      jewellery: ["Jadau earrings", "Colorful glass bangles", "Kundan tikka"],
    },
    "Wedding Guest": {
      name: "Kanjivaram Silk Saree",
      desc: "Rich Kanjivaram saree with lustrous gold zari and vibrant contrast border — the gold standard for South Indian wedding guests.",
      tips: "Heavy Kanjivaram requires a well-fitted blouse. Petticoat color should match the saree body. Silk needs careful draping.",
      jewellery: [
        "Temple gold set",
        "Vanki (armlet)",
        "Vaddanam (waist belt)",
        "Gold bangles",
      ],
    },
    "Engagement Ceremony": {
      name: "Heavy Embroidered Lehenga Choli",
      desc: "Bridal-adjacent lehenga with full zardozi and sequence embroidery in rich jewel tones — a showstopper for engagement ceremonies.",
      tips: "Choose a fitted blouse with back detailing. Pair with a contrast dupatta. Minimal makeup lets the outfit shine.",
      jewellery: ["Polki jadau set", "Passa (side tikka)", "Bajubandh", "Nath"],
    },
    "Mehndi Night": {
      name: "Yellow-Green Anarkali",
      desc: "Bright Anarkali in traditional mehndi colors (yellow, green, orange) with gota patti work and sheer dupatta.",
      tips: "Yellow and green are the mehndi staples. Keep henna-friendly — avoid tight sleeves so mehndi dries well.",
      jewellery: [
        "Glass bangles",
        "Oxidised nath",
        "Payal (anklets)",
        "Floral hair accessories",
      ],
    },
    "Sangeet Night": {
      name: "Embellished Dance Lehenga",
      desc: "Lighter lehenga with sequence and mirror work — perfect for dancing at Sangeet. Flared skirt gives movement on the dance floor.",
      tips: "Choose comfortable footwear for dancing. Pin the dupatta or remove it for performance routines.",
      jewellery: ["Kundan earrings", "Kadas", "Matha patti", "Statement rings"],
    },
    "Haldi Ceremony": {
      name: "Yellow Cotton Saree",
      desc: "Bright yellow cotton saree or kurta for the traditional Haldi — cheerful, meaningful, and easy to wash.",
      tips: "Yellow is the traditional Haldi color. Use old or inexpensive outfits as turmeric stains may not wash out completely.",
      jewellery: [
        "Floral jewelry (marigold)",
        "Simple gold studs",
        "Fresh flower bangles",
      ],
    },
    "Board Meeting": {
      name: "Silk Kurta with Straight Pants",
      desc: "Understated silk kurta in muted tones with tailored straight pants. Professional Indian wear for the boardroom.",
      tips: "Choose subtle embroidery or tone-on-tone pattern. Pin the dupatta to avoid distraction. Oxford flats elevate the look.",
      jewellery: [
        "Pearl stud earrings",
        "Delicate gold chain",
        "Simple bangle",
      ],
    },
    "Job Interview": {
      name: "Cotton Kurta with Trouser",
      desc: "Crisp, well-ironed kurta in neutral tones with tailored trousers. Neat, professional, and culturally appropriate.",
      tips: "Stick to muted colors — beige, grey, navy, or white. Minimal embellishment. Ensure everything is wrinkle-free.",
      jewellery: ["Minimal stud earrings only"],
    },
    "Cocktail Party": {
      name: "Tissue Silk Lehenga",
      desc: "Shimmering tissue silk lehenga with embroidered blouse. The metallic sheen is perfect for cocktail party glamour.",
      tips: "Pair with pointed heels to elongate. Keep accessories dramatic — the fabric already does the talking.",
      jewellery: ["Polki drop earrings", "Cocktail ring", "Slim bangles"],
    },
    "Black Tie": {
      name: "Heritage Zardozi Saree",
      desc: "Luxe saree with intricate zardozi embroidery in gold and silver. Timeless and magnificent for black-tie events.",
      tips: "Pair with a structured blouse. Hair in an elaborate bun. Walk slowly — zardozi sarees are heavy and regal.",
      jewellery: [
        "Antique gold jewelry set",
        "Long chandelier earrings",
        "Diamond necklace",
      ],
    },
    Beach: {
      name: "Printed Cotton Saree",
      desc: "Lightweight printed cotton saree with casual draping and a simple blouse. Breezy and beautiful at the beach.",
      tips: "Use a simple pin drape for beach settings. Avoid heavy embroidery. Flat sandals or bare feet work best.",
      jewellery: ["Shell bangles", "Beaded anklets", "Simple stud earrings"],
    },
    Casual: {
      name: "Cotton Anarkali Kurta",
      desc: "Breezy cotton Anarkali kurta with block prints, paired with leggings or churidar. Comfortable and stylishly ethnic.",
      tips: "Add a potli bag and kolhapuri sandals to complete the look. Roll up sleeves for a casual vibe.",
      jewellery: [
        "Oxidized silver jhumkas",
        "Thread bangles",
        "Nath (nose ring)",
      ],
    },
    "Office Casual": {
      name: "Silk Kurta with Palazzo",
      desc: "Elegant silk kurta with embroidered borders paired with wide-leg palazzo pants. Professional yet culturally rich.",
      tips: "Choose subtle embroidery for formal settings. Pin the dupatta neatly or skip it for corporate environments.",
      jewellery: ["Pearl studs", "Delicate gold chain", "Bangles"],
    },
    Brunch: {
      name: "Floral Print Kurta",
      desc: "Light and airy floral-print kurta with wide-leg pants. Fresh and stylish for daytime gatherings.",
      tips: "Add juttis and a wicker clutch for a bohemian brunch look. Layer with a light jacket if needed.",
      jewellery: ["Oxidised hoops", "Beaded necklace", "Stackable rings"],
    },
    "Birthday Party": {
      name: "Embroidered Patiala Set",
      desc: "Festive Patiala salwar set with embroidered kameez in vibrant or pastel hues. Celebratory and comfortable.",
      tips: "Choose bright or pastel. Add a contrast dupatta. Block heels or wedges dress it up for parties.",
      jewellery: ["Jhumka earrings", "Colorful bangles", "Polki pendant"],
    },
    "Anniversary Dinner": {
      name: "Crepe Silk Saree",
      desc: "Soft draping crepe silk saree in romantic hues of wine, rose, or navy with minimal embellishment.",
      tips: "A well-fitted blouse with back detailing adds glamour. Winged eyeliner and a bold lip complete the look.",
      jewellery: ["Diamond studs", "Tennis bracelet", "Subtle pendant chain"],
    },
    Formal: {
      name: "Embroidered Saree",
      desc: "A luxurious embroidered saree in rich silk with intricate threadwork. Exudes timeless elegance for formal events.",
      tips: "Wear with a well-fitted blouse. Use a sweetheart neckline for a modern touch.",
      jewellery: [
        "Temple jewellery set",
        "Gold bangles",
        "Maang tikka",
        "Waist belt",
      ],
    },
    Special: {
      name: "Sharara Set with Embroidery",
      desc: "A festive sharara set with heavy embroidery on the kameez and flared sharara pants.",
      tips: "Opt for contrast dupatta. Gold or antique jewelry works beautifully with this silhouette.",
      jewellery: ["Kundan jewelry set", "Passa", "Haath phool", "Anklets"],
    },
    Festive: {
      name: "Banarasi Silk Lehenga",
      desc: "A resplendent Banarasi silk lehenga with intricate zari work, paired with a matching blouse and sheer dupatta.",
      tips: "Drape the dupatta in the Gujarati style. Opt for contrast piping on the blouse hem.",
      jewellery: [
        "Polki necklace set",
        "Jhumka earrings",
        "Maang tikka",
        "Bangles",
      ],
    },
    Work: {
      name: "Silk Kurta with Palazzo",
      desc: "Elegant silk kurta with embroidered borders paired with wide-leg palazzo pants.",
      tips: "Choose subtle embroidery for formal settings. Pin the dupatta neatly or skip it for corporate environments.",
      jewellery: ["Pearl studs", "Delicate gold chain", "Bangles"],
    },
  },
  western: {
    Diwali: {
      name: "Embellished Maxi Dress",
      desc: "Gold-tone embellished maxi dress with sequin detailing — catching the light and celebrating the festival of lights in Western style.",
      tips: "Add strappy gold heels and a minimalist clutch. Dewy makeup with a bronzed glow ties the look together.",
      jewellery: ["Gold drop earrings", "Cuff bracelet", "Statement ring"],
    },
    Holi: {
      name: "White Co-ord Set",
      desc: "Crisp white linen or cotton co-ord set — the perfect canvas for the festival of colors. Comfortable and celebratory.",
      tips: "Old or cheap whites work best as colors may not fully wash out. Flat sandals are practical.",
      jewellery: ["Simple silver hoops", "Minimal bracelet"],
    },
    Eid: {
      name: "Elegant Pastel Midi Dress",
      desc: "Sophisticated pastel midi dress with floral or lace detail. Modest yet stylish for Eid celebrations.",
      tips: "Pastels like mint, blush, and ivory are perfect. Pair with pointed ballet flats or wedges.",
      jewellery: [
        "Pearl drop earrings",
        "Delicate gold bracelet",
        "Simple pendant",
      ],
    },
    Navratri: {
      name: "Colorful Wrap Dress",
      desc: "Vibrant color-block wrap dress in traditional Navratri colors. Fun, flirty, and perfect for dancing.",
      tips: "Choose a dance-friendly length. Wrap dresses move beautifully on the dance floor. Add block heels.",
      jewellery: ["Bold hoop earrings", "Stackable bangles", "Anklet"],
    },
    "Wedding Guest": {
      name: "Floral Midi A-Line Dress",
      desc: "Elegant floral or solid midi dress in a celebration-appropriate jewel tone. Feminine and graceful for weddings.",
      tips: "Choose a dress that's not white or ivory. Heeled sandals elongate the look. Add a small clutch.",
      jewellery: ["Drop earrings", "Dainty bracelet", "Cocktail ring"],
    },
    "Engagement Ceremony": {
      name: "Off-Shoulder Cocktail Dress",
      desc: "Romantic off-shoulder midi dress in blush, sage, or lilac. Festive and feminine for engagement events.",
      tips: "Updo hairstyle showcases the neckline. Strappy heels and minimal jewelry let the dress shine.",
      jewellery: ["Delicate drop earrings", "Tennis bracelet", "Simple ring"],
    },
    "Mehndi Night": {
      name: "Yellow Sundress or Ruffle Dress",
      desc: "Bright cheerful yellow sundress or ruffled dress — festive western alternative to traditional mehndi wear.",
      tips: "Yellow is the mehndi color. Keep it flowy and fun. Flat sandals are practical for mehndi application.",
      jewellery: ["Boho gold hoop earrings", "Layered bracelets", "Anklet"],
    },
    "Sangeet Night": {
      name: "Embellished Cocktail Dress",
      desc: "Sequin or embellished cocktail dress in rose gold, silver, or champagne. Dance-ready glamour for Sangeet.",
      tips: "Choose a comfortable length for dancing. Kitten heels are dance-friendly without sacrificing height.",
      jewellery: ["Statement earrings", "Bangle bracelets", "Cocktail ring"],
    },
    "Haldi Ceremony": {
      name: "Yellow Ruffle Blouse + White Pants",
      desc: "Sunny yellow ruffled blouse paired with crisp white tailored trousers. Cheerful western take on Haldi tradition.",
      tips: "Use inexpensive pieces as turmeric stains set permanently. Flat sandals or wedges are practical.",
      jewellery: [
        "Gold hoop earrings",
        "Floral hair accessory",
        "Simple bracelet",
      ],
    },
    "Board Meeting": {
      name: "Structured Power Blazer Set",
      desc: "Double-breasted blazer with cigarette trousers in neutral tones. Commands authority in the boardroom.",
      tips: "Tuck in a silk blouse for a polished look. Oxford shoes or block heels complete the ensemble.",
      jewellery: ["Pearl stud earrings", "Gold watch", "Simple pendant"],
    },
    "Job Interview": {
      name: "Classic Shift Dress or Pencil Skirt",
      desc: "Neutral-toned shift dress or tailored pencil skirt with a crisp blouse. Conservative and professional.",
      tips: "Stick to navy, grey, or beige. Everything must be well-pressed. Conservative hemline is essential.",
      jewellery: ["Small stud earrings only", "Minimal watch"],
    },
    "Office Casual": {
      name: "Tailored Blazer & Trousers",
      desc: "Sharply tailored blazer set in neutral tones with matching wide-leg trousers. Commands attention professionally.",
      tips: "Tuck in a silk blouse for a polished look. Oxford shoes or block heels complete the ensemble.",
      jewellery: ["Pearl earrings", "Gold watch", "Simple pendant"],
    },
    "Cocktail Party": {
      name: "Satin Slip Dress",
      desc: "Elegant bias-cut satin slip dress in champagne, emerald, or ruby. Effortless glamour for cocktail events.",
      tips: "Add a sheer wrap for modesty if needed. Stiletto heels or mules elevate the look.",
      jewellery: [
        "Diamond stud earrings",
        "Tennis bracelet",
        "Delicate pendant",
      ],
    },
    "Black Tie": {
      name: "Structured Floor-Length Gown",
      desc: "Architectural floor-length gown with structured bodice and flowing skirt. Grand and elegant for black-tie.",
      tips: "Wear your hair up to showcase the neckline. Invest in posture-supporting heels.",
      jewellery: [
        "Chandelier earrings",
        "Tennis bracelet",
        "Delicate necklace",
      ],
    },
    Beach: {
      name: "Breezy Sundress or Linen Set",
      desc: "Lightweight linen or cotton sundress in tropical prints or solids. Easy, breezy, and effortlessly stylish.",
      tips: "Layer with a kimono wrap. Add a wide-brim hat and sunglasses for a resort look.",
      jewellery: ["Shell necklace", "Simple anklet", "Stud earrings"],
    },
    "Birthday Party": {
      name: "Mini Dress with Embellishments",
      desc: "Fun embellished or sequin mini dress in a festive hue. Celebratory and youthful for birthday parties.",
      tips: "Match bag and shoes for a coordinated party look. Bold lip and dewy skin complete the vibe.",
      jewellery: ["Hoop earrings", "Bangle set", "Cocktail ring"],
    },
    "Anniversary Dinner": {
      name: "Velvet Wrap Midi Dress",
      desc: "Luxurious velvet wrap dress in jewel tones — universally flattering with a timeless silhouette for romantic dinners.",
      tips: "Add a belt to define the waist. Block heels or stilettos both work beautifully.",
      jewellery: ["Gold hoop earrings", "Cocktail ring", "Bangle bracelets"],
    },
    Brunch: {
      name: "Linen Co-ord Set",
      desc: "Relaxed linen co-ord set in earthy tones. Effortlessly chic for brunch, day trips, or casual gatherings.",
      tips: "Roll the sleeves and tuck the top loosely for a laid-back silhouette. Add white sneakers.",
      jewellery: ["Hoop earrings", "Layered necklaces", "Stackable rings"],
    },
    Festive: {
      name: "Sequin Midi Dress",
      desc: "A dazzling sequin midi dress in warm champagne or gold. Catches light beautifully for festive celebrations.",
      tips: "Pair with strappy heels and a minimalist clutch. Keep makeup dewy and glowing.",
      jewellery: [
        "Diamond stud earrings",
        "Delicate tennis bracelet",
        "Statement ring",
      ],
    },
    Work: {
      name: "Tailored Blazer & Trousers",
      desc: "A sharply tailored blazer set in neutral tones with matching wide-leg trousers.",
      tips: "Tuck in a silk blouse for a polished look. Oxford shoes or block heels complete the ensemble.",
      jewellery: ["Pearl earrings", "Gold watch", "Simple pendant"],
    },
    Casual: {
      name: "Linen Co-ord Set",
      desc: "A relaxed linen co-ord set in earthy tones for casual occasions.",
      tips: "Roll the sleeves and tuck the top loosely for a laid-back silhouette.",
      jewellery: ["Hoop earrings", "Layered necklaces", "Stackable rings"],
    },
    Formal: {
      name: "Floor-Length Gown",
      desc: "An elegant floor-length gown with structured bodice and flowing skirt.",
      tips: "Wear your hair up to showcase the neckline. Invest in good posture-supporting heels.",
      jewellery: [
        "Diamond drop earrings",
        "Tennis bracelet",
        "Delicate necklace",
      ],
    },
    Special: {
      name: "Velvet Wrap Dress",
      desc: "A luxurious velvet wrap dress in jewel tones. Universally flattering with a timeless silhouette.",
      tips: "Add a belt to define the waist. Block heels or stilettos both work beautifully.",
      jewellery: ["Gold hoop earrings", "Cocktail ring", "Bangle bracelets"],
    },
  },
  indoWestern: {
    Diwali: {
      name: "Lehenga with Statement Blouse",
      desc: "Lehenga skirt paired with an embroidered off-shoulder or cape blouse — tradition meets contemporary for Diwali.",
      tips: "Contrast blouse and skirt colors for drama. Ear cuffs instead of full earrings give a modern edge.",
      jewellery: ["Ear cuffs", "Layered maala", "Kamarband"],
    },
    Holi: {
      name: "Dhoti Pants + Crop Tie Top",
      desc: "Playful dhoti pants with a crop tie-front top in white or bright colors. Festival-ready fusion wear.",
      tips: "Lightweight and easy to move in — perfect for celebrating. Go barefoot or wear juttis.",
      jewellery: [
        "Shell anklets",
        "Minimal silver",
        "Colorful hair accessories",
      ],
    },
    Eid: {
      name: "Palazzo Suit with Cape",
      desc: "Flowing palazzo pants with a fitted top and dramatic sheer cape overlay. Festive fusion with modest elegance.",
      tips: "Pastel palettes with silver or gold accents are ideal for Eid. Pointed wedges elevate the look.",
      jewellery: ["Layered chains", "Ear cuffs", "Polki ring"],
    },
    Navratri: {
      name: "Fusion Chaniya Crop Top",
      desc: "Traditional chaniya skirt paired with a trendy embellished crop top in vibrant Navratri colors.",
      tips: "Mix a traditional skirt with a modern crop. Use the traditional nine colors across accessories and outfit.",
      jewellery: ["Oxidised ear cuffs", "Kadas", "Tassel earrings"],
    },
    "Wedding Guest": {
      name: "Peplum Cape Lehenga",
      desc: "Fusion peplum top as lehenga blouse with layered dupatta draped as a cape. Effortlessly glamorous.",
      tips: "Opt for silk or brocade fabric. Balance the volume of the peplum with a slim lehenga skirt.",
      jewellery: [
        "Chandbali earrings",
        "Delicate layered chains",
        "Cocktail ring",
      ],
    },
    "Engagement Ceremony": {
      name: "Skirt Suit with Embroidered Jacket",
      desc: "Embroidered structured jacket over a fitted slip skirt in silk. Wedding festivity meets modern sophistication.",
      tips: "Let the jacket embroidery be the focal point — keep the skirt minimal. Stiletto sandals are a must.",
      jewellery: ["Statement drop earrings", "Single chain", "Ring stack"],
    },
    "Mehndi Night": {
      name: "Bustier Lehenga",
      desc: "Strapless or bustier-style embellished blouse with a heavily embroidered lehenga. Contemporary mehndi glamour.",
      tips: "Add a dupatta draped loosely. Comfortable shoes as you may sit for long mehndi application.",
      jewellery: [
        "Layered gold chains",
        "Jhumka earrings",
        "Statement bangles",
      ],
    },
    "Sangeet Night": {
      name: "Sequence Saree with Crop Blouse",
      desc: "Shimmering sequence saree worn with a trendy crop blouse and pre-stitched drape. Dance-floor ready.",
      tips: "Pre-stitched saree ensures hassle-free dancing. Belt the saree at the waist for a modern silhouette.",
      jewellery: ["Ear cuffs", "Layered chains", "Statement ring"],
    },
    "Haldi Ceremony": {
      name: "Yellow Off-Shoulder Kurta + Sharara",
      desc: "Bright yellow off-shoulder kurta paired with heavily embellished sharara pants. Festive and on-trend.",
      tips: "Yellow is the haldi color. Keep the outfit cheerful. Flats are practical for outdoor ceremonies.",
      jewellery: ["Floral accessories", "Gold hoop earrings", "Simple bangles"],
    },
    "Board Meeting": {
      name: "Embroidered Blazer over Kurta",
      desc: "Structured blazer with subtle embroidery over a Nehru-collar kurta with tailored pants. Executive fusion wear.",
      tips: "Keep embroidery understated. Oxford loafers or pointed pumps complete the professional-ethnic look.",
      jewellery: ["Silver stud earrings", "Simple watch", "Minimal ring"],
    },
    "Job Interview": {
      name: "Kurta with Trouser + Structured Jacket",
      desc: "Neat kurta worn under a structured jacket with straight trousers. Professional and culturally resonant.",
      tips: "Choose muted colors. The jacket must be well-tailored. Avoid any embellishment at interviews.",
      jewellery: ["Simple stud earrings only"],
    },
    "Cocktail Party": {
      name: "Dhoti Pants with Cape Top",
      desc: "Embroidered dhoti pants with a dramatic cape blouse in metallic or silk fabric. Cocktail-hour showstopper.",
      tips: "The cape creates drama — keep hair sleek. Add heeled ankle strap sandals for elongation.",
      jewellery: ["Statement ear cuff", "Bangle cuff", "Simple ring"],
    },
    "Black Tie": {
      name: "Saree Gown",
      desc: "Attached saree-gown hybrid in luxe fabric — all the elegance of a saree with the convenience of a gown.",
      tips: "Keep accessories minimal to let the silhouette command attention. Hair in a sleek updo.",
      jewellery: [
        "Long chandelier earrings",
        "Single statement ring",
        "Slim bangle",
      ],
    },
    Beach: {
      name: "Dhoti Skirt with Bralette or Crop",
      desc: "Breezy dhoti-style skirt in printed light fabric with a simple crop or bralette. Beachy and Indo-Western chic.",
      tips: "Lightweight flowing fabrics work best. Add a kimono wrap for modesty. Flat sandals or bare feet.",
      jewellery: ["Shell anklet", "Simple silver hoops", "Beaded bracelet"],
    },
    "Birthday Party": {
      name: "Embellished Jumpsuit or Fusion Skirt",
      desc: "Fusion embellished jumpsuit or printed A-line skirt with an embroidered top. Trendy and party-ready.",
      tips: "Add a statement belt for a defined waist. Platform heels dress up the look further.",
      jewellery: ["Statement earrings", "Bangle set", "Cocktail ring"],
    },
    "Anniversary Dinner": {
      name: "Draped Skirt with Structured Top",
      desc: "Silk draped skirt with a structured embroidered top. Romantic and elegant for a special dinner.",
      tips: "Choose complementary colors. A low back on the top adds romantic drama.",
      jewellery: ["Drop earrings", "Simple bracelet", "Cocktail ring"],
    },
    Brunch: {
      name: "Dhoti Skirt with Crop Top",
      desc: "A stylish dhoti-style skirt in printed fabric paired with a fitted crop top. Chic Indo-Western fusion.",
      tips: "Add a potli or sling bag. Kolhapuri flats or ankle strap sandals work perfectly.",
      jewellery: ["Oxidized earrings", "Chunky bracelet", "Layered necklace"],
    },
    "Office Casual": {
      name: "Pant Suit with Embroidered Kurta",
      desc: "Slim-fit trousers with a short Nehru-collar embroidered kurta. Contemporary professional with Indian sensibility.",
      tips: "Choose a subtle embroidery pattern. Oxford loafers or pointed pumps complete the look.",
      jewellery: ["Small jhumkas", "Silver watch", "Simple ring"],
    },
    Festive: {
      name: "Lehenga with Crop Jacket",
      desc: "A fusion lehenga paired with an embroidered crop jacket over a fitted blouse. Blends festive aesthetics with modern silhouette.",
      tips: "Choose contrasting jacket and lehenga colors. Silver or gold accessories both work.",
      jewellery: ["Chandbali earrings", "Layered gold chain", "Kadas"],
    },
    Work: {
      name: "Pant Suit with Embroidered Kurta",
      desc: "Slim-fit trousers with a short Nehru-collar embroidered kurta.",
      tips: "Choose a subtle embroidery pattern. Oxford loafers or pointed pumps complete the look.",
      jewellery: ["Small jhumkas", "Silver watch", "Simple ring"],
    },
    Casual: {
      name: "Dhoti Skirt with Crop Top",
      desc: "A stylish dhoti-style skirt in printed fabric paired with a fitted crop top.",
      tips: "Add a potli or sling bag. Kolhapuri flats or ankle strap sandals work perfectly.",
      jewellery: ["Oxidized earrings", "Chunky bracelet", "Layered necklace"],
    },
    Formal: {
      name: "Cape Saree Gown",
      desc: "A flowing saree-inspired gown with an attached cape. Elegant fusion wear that makes a grand statement.",
      tips: "Keep accessories minimal and let the silhouette speak. Hair in a low bun works best.",
      jewellery: ["Long drop earrings", "Slim bangle", "Simple ring"],
    },
    Special: {
      name: "Anarkali Jacket Dress",
      desc: "A structured Anarkali-cut jacket dress in brocade or embroidered fabric over fitted trousers.",
      tips: "Add a contrast dupatta for more traditional settings. Belt it for a more contemporary look.",
      jewellery: ["Polki studs", "Layered chains", "Bangles"],
    },
  },
  bohemian: {
    Diwali: {
      name: "Embroidered Boho Kurta with Patchwork Skirt",
      desc: "A colorful patchwork midi skirt with a mirror-embroidered free-flowing kurta top. Earthy, festive, and free-spirited.",
      tips: "Layer with a sheer dupatta worn loosely as a wrap. Kolhapuri sandals and a stack of silver bangles complete the look.",
      jewellery: [
        "Silver jhumkas",
        "Layered silver necklaces",
        "Stone-studded bangles",
        "Anklets",
      ],
    },
    Holi: {
      name: "White Tiered Maxi Dress",
      desc: "A flowy tiered white cotton maxi dress with lace trim. Perfect for Holi — ready to soak in every color.",
      tips: "Loose tiered silhouettes move beautifully and are easy to wash. Flat strappy sandals keep you grounded.",
      jewellery: ["Beaded necklace", "Rope bracelets", "Shell earrings"],
    },
    Eid: {
      name: "Boho Maxi Kaftan in Pastel Prints",
      desc: "A flowing kaftan-style dress with delicate block prints in soft pastels. Modest, bohemian, and effortlessly elegant.",
      tips: "Add a thin waist belt to add definition. Pointy-toe flats or sandals work beautifully.",
      jewellery: ["Beaded drop earrings", "Layered chains", "Stone ring"],
    },
    "Wedding Guest": {
      name: "Floral Boho Midi Dress with Bell Sleeves",
      desc: "A romantically printed midi dress with bell sleeves and crochet lace detailing. Whimsical and wedding-appropriate.",
      tips: "Pair with strappy wedge sandals. A flower crown or floral hair clip elevates the boho bridal guest aesthetic.",
      jewellery: ["Floral ear cuffs", "Beaded necklace", "Stacked rings"],
    },
    "Birthday Party": {
      name: "Embellished Boho Co-ord Set",
      desc: "A breezy co-ord set with mirror-work crop top and wide palazzo pants in vibrant earthy tones.",
      tips: "Stack bracelets and go bold with accessories for a boho-glam party look. Platform sandals add height.",
      jewellery: [
        "Tassel earrings",
        "Stacked bracelets",
        "Stone pendant necklace",
      ],
    },
    "Cocktail Party": {
      name: "Fringed Satin Slip Dress",
      desc: "A satin slip dress with fringe hem detail in gold or amber — bohemian glamour for cocktail gatherings.",
      tips: "Add a wide-brim fedora for a bold statement or keep it sleek with a top knot. Block heels tie it together.",
      jewellery: [
        "Long feather earrings",
        "Stack of gold rings",
        "Beaded cuff",
      ],
    },
    "Board Meeting": {
      name: "Printed Linen Blazer with Wide-Leg Trousers",
      desc: "An earthy-toned printed linen blazer over a plain tee with wide-leg trousers. Grounded and professional.",
      tips: "Keep prints subtle for boardroom settings. Natural fiber fabrics convey grounded confidence.",
      jewellery: ["Hammered gold earrings", "Stone-set ring", "Simple cuff"],
    },
    Beach: {
      name: "Crochet Cover-Up Maxi",
      desc: "A hand-crochet or lace-trim maxi cover-up over a simple swimsuit. Effortless boho beach style.",
      tips: "Wear over a swimsuit or bikini. A wide-brim straw hat and tote bag complete the beach boho look.",
      jewellery: ["Shell necklace", "Beaded anklet", "Simple stud earrings"],
    },
    Brunch: {
      name: "Printed Wrap Skirt with Linen Top",
      desc: "A colorful block-print wrap skirt paired with a loose linen top in a complementary neutral.",
      tips: "Tuck the front of the linen top loosely for shape. Woven sandals and a basket bag complete the brunch look.",
      jewellery: ["Hoop earrings", "Beaded bracelet", "Turquoise pendant"],
    },
    "Anniversary Dinner": {
      name: "Velvet Maxi Skirt with Peasant Blouse",
      desc: "A rich velvet maxi skirt in deep burgundy or forest green paired with a ruffled peasant blouse. Romantic boho dinner dressing.",
      tips: "Add a thin leather belt at the waist. Block heeled boots or strappy heels both work.",
      jewellery: ["Amber drop earrings", "Stacked rings", "Layered necklaces"],
    },
    "Black Tie": {
      name: "Embroidered Boho Gown",
      desc: "A floor-length gown with intricate folk embroidery on a flowing chiffon base. Boho elegance for formal events.",
      tips: "Let the embroidery speak — keep accessories minimal. Strappy heeled sandals are ideal.",
      jewellery: [
        "Statement turquoise necklace",
        "Long drop earrings",
        "Simple ring",
      ],
    },
    Casual: {
      name: "Printed Kaftan with Denim Shorts",
      desc: "A loose printed kaftan top worn over denim cutoffs. Laid-back boho at its most effortless.",
      tips: "Add a fringe bag and leather sandals for full boho effect. Roll the kaftan sleeves for a casual vibe.",
      jewellery: ["Layered necklaces", "Bangles", "Ear cuffs"],
    },
    Festive: {
      name: "Mirror-Work Flared Dress",
      desc: "A festive flared dress with mirror and thread embroidery in vibrant festival tones.",
      tips: "Keep hair loose and wavy. Stack silver jewelry and add a kamarband for a festive boho touch.",
      jewellery: ["Silver layered necklace", "Stacked bangles", "Jhumkas"],
    },
    Work: {
      name: "Printed Shift Dress with Linen Blazer",
      desc: "A relaxed printed shift dress under a structured linen blazer. Artistic and professional.",
      tips: "Choose muted prints for the office. Natural fabrics lend a grounded, confident aesthetic.",
      jewellery: ["Hammered earrings", "Stone ring", "Minimal cuff"],
    },
    Formal: {
      name: "Folk-Embroidered Evening Gown",
      desc: "A flowing evening gown with folk-inspired embroidery on the hem and neckline. Artistically formal.",
      tips: "Let the embroidery be the statement. A sleek chignon and minimal accessories complete the look.",
      jewellery: [
        "Turquoise drop earrings",
        "Thin gold bracelet",
        "Stack rings",
      ],
    },
    Special: {
      name: "Patchwork Maxi Skirt + Embroidered Top",
      desc: "A colorful patchwork maxi skirt with a folk-embroidered off-shoulder top for special celebrations.",
      tips: "Go bold with layered accessories. Platform sandals add height without losing the boho spirit.",
      jewellery: ["Beaded choker", "Tassel earrings", "Stacked rings"],
    },
  },
  minimalist: {
    Diwali: {
      name: "Monochrome Silk Kurta Set",
      desc: "A single-tone silk kurta and palazzos in ivory, champagne, or blush. Quiet luxury for a festive evening.",
      tips: "Let the fabric sheen do the work. A single statement necklace is all you need. Pointed flats or block heels.",
      jewellery: ["Single gold chain", "Diamond studs", "One delicate ring"],
    },
    Holi: {
      name: "White Clean-Line Kurta & Pants",
      desc: "Crisp white cotton kurta and straight pants with no embellishment — a blank canvas for the colors of Holi.",
      tips: "Keep every detail minimal. Zero jewelry is fine — let the colors of Holi be your accessories.",
      jewellery: ["Optional: single thin bangle"],
    },
    Eid: {
      name: "Straight-Cut Ivory Linen Set",
      desc: "A clean-cut ivory or pale grey linen trouser set with a structured shirt-style top. Understated Eid elegance.",
      tips: "Minimal is powerful. A perfectly tailored cut in quality fabric says everything. A white sneaker or loafer works.",
      jewellery: ["Gold stud earrings", "Single thin chain"],
    },
    "Wedding Guest": {
      name: "Silk Column Dress in Jewel Tone",
      desc: "A clean-cut column midi dress in deep emerald, navy, or wine silk. Effortlessly elegant at weddings.",
      tips: "One color, one silhouette — that's all you need. Pointed heels and a simple clutch. Perfect hair.",
      jewellery: ["Diamond studs", "Thin gold bracelet"],
    },
    "Cocktail Party": {
      name: "Single-Color Structured Mini Dress",
      desc: "A structured mini dress in one bold or neutral color with clean lines. Maximum impact through minimum effort.",
      tips: "The cut and fit are everything in minimalist dressing. Invest in alteration for a perfect fit.",
      jewellery: ["Diamond drop earrings", "No other accessories"],
    },
    "Board Meeting": {
      name: "Monochrome Trouser Suit",
      desc: "A perfectly tailored monochrome trouser suit in charcoal, ivory, or camel. Boardroom power in its purest form.",
      tips: "Single color head to toe elongates and commands. A silk blouse underneath adds subtle luxury.",
      jewellery: ["Small gold studs", "Slim watch"],
    },
    "Black Tie": {
      name: "Clean-Line Satin Column Gown",
      desc: "A sleek satin column gown in ivory, black, or champagne. Architectural simplicity that makes a powerful statement.",
      tips: "Everything depends on perfect fit. Have it altered to your exact proportions. Hair up, minimal makeup.",
      jewellery: ["Single diamond pendant", "No other accessories"],
    },
    Beach: {
      name: "White Linen Wide-Leg Set",
      desc: "Crisp white linen wide-leg pants and a simple tank top. The most elegant beach look imaginable.",
      tips: "Natural linen gets beautiful texture. Keep it loose and easy. Bare feet or simple flat sandals.",
      jewellery: ["Single thin anklet"],
    },
    Brunch: {
      name: "Neutral Shift Dress",
      desc: "A perfectly cut shift dress in oatmeal, white, or soft grey. Timeless and effortlessly put-together for brunch.",
      tips: "Add a single long necklace or leave the neck bare. White sneakers or loafers work perfectly.",
      jewellery: ["Stud earrings", "Simple ring"],
    },
    "Anniversary Dinner": {
      name: "Draped Silk Midi Dress",
      desc: "An elegantly draped silk midi in blush or champagne. Soft, romantic, and entirely uncluttered.",
      tips: "A single statement earring and bare neck. Hair swept back. Let the fabric movement speak.",
      jewellery: ["Drop earrings only"],
    },
    "Birthday Party": {
      name: "Clean Satin Slip Dress",
      desc: "A sleek satin slip in black, navy, or deep rose. Effortless party dressing through pure simplicity.",
      tips: "Style with barely-there heels or chunky white sneakers for contrast. One bold lip, bare neck.",
      jewellery: ["Thin hoop earrings"],
    },
    Casual: {
      name: "Straight-Leg Trousers + Crisp White Shirt",
      desc: "The most classic combination — straight-leg trousers and a perfectly fitted white shirt. Timeless casual minimalism.",
      tips: "Tuck only the front of the shirt. Roll sleeves twice. Leather loafers or clean white sneakers.",
      jewellery: ["Stud earrings", "One ring"],
    },
    Festive: {
      name: "Monochrome Silk Kurta & Pants",
      desc: "A single-tone silk kurta and slim pants. Quiet luxury for festive occasions.",
      tips: "Let the silk sheen be your statement. One accessory maximum.",
      jewellery: ["Diamond studs", "One delicate chain"],
    },
    Work: {
      name: "Tailored Pencil Skirt + Silk Blouse",
      desc: "A perfectly cut pencil skirt with a tucked silk blouse. Minimalist office chic.",
      tips: "Fit is paramount. Invest in alterations. Pointed heels or loafers complete the look.",
      jewellery: ["Stud earrings", "Slim watch"],
    },
    Formal: {
      name: "Column Gown in Monochrome",
      desc: "A sleek column gown in black or ivory. Architectural simplicity at its most elegant.",
      tips: "Perfect fit is everything. Bare neck, one earring, clean updo.",
      jewellery: ["Single statement earring"],
    },
    Special: {
      name: "Sculptural Midi Dress",
      desc: "A structured sculptural midi dress in a single deep tone. Art meeting simplicity.",
      tips: "No accessories needed. Let the silhouette be the statement.",
      jewellery: ["Stud earrings only"],
    },
  },
  maximalist: {
    Diwali: {
      name: "Embellished Lehenga with Bold Blouse & Statement Dupatta",
      desc: "A heavily embellished lehenga in magenta or emerald with zardozi blouse, mirror-work, and a printed contrast dupatta. Maximum festive glamour.",
      tips: "More is more. Layer jewelry, add kamarband and maang tikka. Dramatic hair and bold lips match the outfit's energy.",
      jewellery: [
        "Kundan choker",
        "Jhumka earrings",
        "Kamarband",
        "Maang tikka",
        "Stack of bangles",
        "Haath phool",
      ],
    },
    Holi: {
      name: "Bold Print Tie-Dye Maxi",
      desc: "A swirling tie-dye maxi in multiple vibrant colors. Maximalist and ready to absorb every hue of Holi.",
      tips: "Go for the most chaotic prints. Holi itself adds to the maximalism — don't hold back.",
      jewellery: [
        "Colorful tassel earrings",
        "Stack of glass bangles",
        "Beaded anklet",
      ],
    },
    Eid: {
      name: "Heavy Embroidered Anarkali Gown",
      desc: "A floor-length Anarkali gown with heavy resham and zardozi embroidery from neckline to hem. Grand, dramatic, and occasion-worthy.",
      tips: "Pair with elaborate hair styling. Dramatic eye makeup. Gold everything.",
      jewellery: [
        "Polki necklace set",
        "Chandbali earrings",
        "Bangles",
        "Matha patti",
        "Kamarband",
      ],
    },
    "Wedding Guest": {
      name: "Printed Brocade Sharara with Embellished Blouse",
      desc: "A bold printed brocade sharara with a heavily embellished blouse and multiple dupattas — one for draped, one for carried. Extra is everything.",
      tips: "Layer dupattas, stack jewelry, and choose the most dramatic color combination. This is the time to be seen.",
      jewellery: [
        "Statement necklace",
        "Chandbali earrings",
        "Armlet",
        "Multiple bangles",
        "Passa",
        "Anklets",
      ],
    },
    "Cocktail Party": {
      name: "Mixed-Print Sequin Dress",
      desc: "A mixed-print sequin dress in clashing bold tones — floral meets geometric meets animal print. Cocktail party royalty.",
      tips: "Clashing is the point. Wear the loudest version of this look with maximum confidence.",
      jewellery: [
        "Bold statement earrings",
        "Cocktail rings on multiple fingers",
        "Stacked bracelets",
      ],
    },
    "Black Tie": {
      name: "Dramatic Ball Gown with Embellishment",
      desc: "An over-the-top ball gown with feather trim, sequins, embroidery, and a dramatic train. Black tie has never been bolder.",
      tips: "Full glam makeup. Elaborate updo. Multiple accessories. This is your moment — own every inch of it.",
      jewellery: [
        "Chandelier earrings",
        "Diamond necklace",
        "Stack of rings",
        "Statement cuff",
      ],
    },
    "Board Meeting": {
      name: "Bold Pattern-Mixed Blazer Set",
      desc: "A clashing pattern-mixed blazer with contrasting printed trousers. Maximalist power dressing for the bold professional.",
      tips: "Own the room. Bold does not mean loud — carry it with absolute confidence and precision in fit.",
      jewellery: ["Statement earrings", "Bold ring", "Printed scarf"],
    },
    Beach: {
      name: "Printed Kaftan + Bold Accessories",
      desc: "A wildly printed kaftan in clashing colors with multiple accessories. Beach maximalism at its finest.",
      tips: "Layered necklaces, stacked rings, multiple anklets — the beach is your runway. Wide-brim printed hat.",
      jewellery: [
        "Layered necklaces",
        "Stack of rings",
        "Multiple anklets",
        "Statement sunglasses",
      ],
    },
    Brunch: {
      name: "Mixed-Print Co-ord Set with Statement Accessories",
      desc: "A clashing mixed-print co-ord set in bold colors. Brunch just became a fashion show.",
      tips: "Clash the prints intentionally. It's the art of deliberate maximalism. Platform sandals and a bold bag.",
      jewellery: ["Statement earrings", "Stacked rings", "Chunky bangles"],
    },
    "Anniversary Dinner": {
      name: "Rich Velvet Maxi with Embellished Details",
      desc: "A rich velvet maxi in deep jewel tones with crystal embellishments, velvet accessories, and dramatic hair.",
      tips: "Full luxury for your anniversary. Rich textures head to toe. Heavy makeup is encouraged.",
      jewellery: [
        "Crystal necklace",
        "Diamond drop earrings",
        "Gemstone ring",
        "Cuff bracelet",
      ],
    },
    "Birthday Party": {
      name: "Sequin Jumpsuit with Feather Hem",
      desc: "A full-sequin jumpsuit with a feather-hem detail. You ARE the party. Guaranteed to be the most memorable look in the room.",
      tips: "Everything bold. Bold lips, bold eyes, bold shoes, bold bag. Maximalism is your birthday gift to yourself.",
      jewellery: [
        "Chandelier earrings",
        "Stack of rings",
        "Embellished clutch",
      ],
    },
    Casual: {
      name: "Printed Wide-Leg Pants + Graphic Tee + Layered Jacket",
      desc: "Bold printed wide-leg pants with a graphic tee and an open printed jacket. Maximalist casual done right.",
      tips: "The more patterns in play, the better. Chunky sneakers and a printed bag complete the look.",
      jewellery: ["Layered necklaces", "Stacked rings", "Hoop earrings"],
    },
    Festive: {
      name: "Multi-Embroidered Heavy Lehenga",
      desc: "A multi-embroidered lehenga with silk blouse, heavy dupatta, and maximum jewellery. Full festive drama.",
      tips: "More is more. Layer every accessory available. Bold makeup.",
      jewellery: [
        "Full bridal-style jewelry set",
        "Maang tikka",
        "Kamarband",
        "Anklets",
      ],
    },
    Work: {
      name: "Bold Print Blazer + Contrasting Trousers",
      desc: "Clashing prints meet the boardroom. A maximalist power suit for those who lead with bold identity.",
      tips: "Keep accessories bold but intentional. Confidence is the key ingredient.",
      jewellery: ["Statement earrings", "Bold ring"],
    },
    Formal: {
      name: "Ball Gown with Dramatic Details",
      desc: "Full ball gown silhouette with beading, embroidery, and train. Make every head turn.",
      tips: "Full glam hair and makeup. Layer jewelry. This is the look for grandest formal events.",
      jewellery: [
        "Chandelier earrings",
        "Statement necklace",
        "Stack of rings",
      ],
    },
    Special: {
      name: "Layered Printed Maxi with Accessories",
      desc: "A layered printed maxi dress with bold accessories and dramatic hair. Special events deserve maximum expression.",
      tips: "Go big or go home. This look is about full maximalist expression.",
      jewellery: [
        "Bold necklace",
        "Statement earrings",
        "Stack of rings",
        "Multiple bangles",
      ],
    },
  },
  streetwear: {
    Diwali: {
      name: "Embellished Bomber + Sequin Trousers",
      desc: "A gold embellished bomber jacket over a cropped tee with sequin wide-leg trousers. Festive streetwear that hits different.",
      tips: "Keep it monochrome for drama — all-gold or all-black. Chunky sneakers or heeled boots complete the look.",
      jewellery: ["Chunky gold chain", "Hoop earrings", "Stack rings"],
    },
    Holi: {
      name: "Oversized Tee with Track Pants",
      desc: "White oversized graphic tee with track pants or cargo pants. Street-ready for the festival of colors.",
      tips: "Go old. Use clothes you're okay ruining. Comfortable and easy to move.",
      jewellery: ["Optional: small hoop earrings"],
    },
    Eid: {
      name: "Tailored Wide-Leg Suit Set with Sneakers",
      desc: "A tailored wide-leg suit in ivory or soft blush with white platform sneakers. Street-meets-celebration.",
      tips: "The sneaker choice elevates the streetwear feel. A clean white sneaker or retro trainer is perfect.",
      jewellery: ["Chunky gold earrings", "Layered chains"],
    },
    "Wedding Guest": {
      name: "Satin Slip Skirt + Graphic Tee + Blazer",
      desc: "A satin slip skirt with a tucked graphic tee and oversized blazer. Street-style wedding guest that turns heads.",
      tips: "The key is in the layering. Heeled mules or chunky boots depending on the vibe. Confidence is mandatory.",
      jewellery: ["Chunky chain necklace", "Hoop earrings", "Stack rings"],
    },
    "Cocktail Party": {
      name: "Structured Set with Sneakers",
      desc: "A structured blazer co-ord set in bold color with clean sneakers. Streetwear at a cocktail party — a statement.",
      tips: "The subversion is the point. A retro trainer under a sharp co-ord is maximum cool.",
      jewellery: ["Chunky chain", "Hoop earrings"],
    },
    "Black Tie": {
      name: "Sequin Blazer Dress + Statement Sneaker",
      desc: "A sequin blazer-dress — longline and structural — with a bold white sneaker. Urban glamour at its most daring.",
      tips: "This is a bold choice. Own every inch of it. Make sure the sneaker is pristine white and structured.",
      jewellery: ["Thick chain necklace", "Statement earrings"],
    },
    "Board Meeting": {
      name: "Clean Monochrome Tracksuit Elevated",
      desc: "A premium monochrome tracksuit in structured fabric — navy, black, or grey — with a tailored blazer over top.",
      tips: "The blazer makes it work-appropriate. Leather sneakers or loafers keep it polished.",
      jewellery: ["Thin chain", "Small hoop earrings"],
    },
    Beach: {
      name: "Oversized Shirt + Bike Shorts",
      desc: "An oversized printed shirt open over a sports bralette and bike shorts. Beach streetwear casual at its coolest.",
      tips: "Tie the shirt at the waist or leave it open. Chunky flip flops or slides.",
      jewellery: ["Chain necklace", "Simple anklet"],
    },
    Brunch: {
      name: "Cargo Pants + Cropped Hoodie + Sneakers",
      desc: "Low-rise cargo pants with a cropped hoodie and clean white sneakers. Effortlessly cool brunch dressing.",
      tips: "Play with tones — neutral cargos and a pop of color in the hoodie. Add a mini bag.",
      jewellery: ["Hoop earrings", "Layered thin chains"],
    },
    "Anniversary Dinner": {
      name: "Satin Wide-Leg Trousers + Embellished Top",
      desc: "Sleek satin wide-leg trousers with a rhinestone or embellished crop top. Street-luxe anniversary dressing.",
      tips: "The satin elevates the look. Pointed heeled mules keep it sleek and anniversary-appropriate.",
      jewellery: ["Chunky chain necklace", "Drop earrings"],
    },
    "Birthday Party": {
      name: "Holographic Mini Skirt + Matching Top",
      desc: "A head-turning holographic mini skirt with matching top. You're the main character of your own birthday party.",
      tips: "Go bold — silver or rainbow holographic. Chunky platform boots amplify the look.",
      jewellery: ["Statement chain necklace", "Hoop earrings", "Stack rings"],
    },
    Casual: {
      name: "Oversized Graphic Tee + Wide-Leg Jeans",
      desc: "An oversized graphic tee tucked loosely into wide-leg jeans. The definitive streetwear casual.",
      tips: "Leave the tee half-tucked. Clean sneakers or vintage chunky runners. A crossbody bag finishes the look.",
      jewellery: ["Hoop earrings", "Layered chains"],
    },
    Festive: {
      name: "Sequin Bomber + Fitted Pants",
      desc: "A sequin bomber jacket with fitted black trousers. Festive streetwear that celebrates with attitude.",
      tips: "Match the sneaker to the pants for a monochrome base. Let the bomber do all the talking.",
      jewellery: ["Gold chain", "Hoop earrings"],
    },
    Work: {
      name: "Tailored Joggers + Structured Blazer",
      desc: "Smart tailored joggers with a structured single-button blazer. The contemporary workwear streetwear crossover.",
      tips: "Choose tailored joggers, not athletic ones. A loafer or leather sneaker bridges the gap.",
      jewellery: ["Thin chain", "Small hoop earrings"],
    },
    Formal: {
      name: "Tuxedo Blazer Dress + White Sneakers",
      desc: "A longline tuxedo blazer worn as a dress with white sneakers. Subversive formal wear with maximum attitude.",
      tips: "The subversion is deliberate. Make sure the blazer is impeccably tailored.",
      jewellery: ["Chunky chain necklace", "Stud earrings"],
    },
    Special: {
      name: "Co-ord Set with Bold Accessories",
      desc: "A matching printed co-ord set with statement sneakers and bold layered accessories. Street-style special occasions.",
      tips: "Let the accessories tell the story. Bold bag, bold sneaker, bold chains.",
      jewellery: ["Layered chains", "Statement earrings", "Stack rings"],
    },
  },
  vintage: {
    Diwali: {
      name: "1970s Embroidered Peasant Dress",
      desc: "A folk-embroidered 70s-style peasant dress in warm amber, rust, or gold. Vintage ethno-chic for Diwali.",
      tips: "Add platform sandals and a fringed bag. A headband or floral hair accessory fits the era perfectly.",
      jewellery: ["Layered vintage chains", "Hoop earrings", "Beaded bangles"],
    },
    Holi: {
      name: "1960s Shift Dress in White",
      desc: "A simple 60s-style shift dress in clean white — mod minimalism meets the festival of colors.",
      tips: "White is the perfect Holi canvas. Short hemline and block heels channel the swinging 60s.",
      jewellery: ["Simple stud earrings", "Thin white bangles"],
    },
    Eid: {
      name: "1950s Pastel Tea Dress",
      desc: "A full-skirted, waist-cinched pastel tea dress from the 1950s era. Demure, festive, and timelessly elegant.",
      tips: "Add white gloves for authentic 50s flair. A pill-box hat or structured fascinator takes it to the next level.",
      jewellery: ["Pearl necklace", "Pearl stud earrings", "Bracelet"],
    },
    "Wedding Guest": {
      name: "1940s Sweetheart Neckline Dress",
      desc: "A structured 1940s sweetheart-neckline dress in a rich jewel tone. Classic, elegant, and unforgettably romantic.",
      tips: "Victory rolls hair and red lips are the finishing touches. T-strap heels complete the era.",
      jewellery: ["Brooch", "Pearl drop earrings", "Bracelet"],
    },
    "Cocktail Party": {
      name: "1950s Full-Skirted Cocktail Dress",
      desc: "A strapless or sweetheart-neck full-skirted cocktail dress in silk or taffeta. The definitive 1950s party look.",
      tips: "Elbow-length gloves add authentic glamour. Kitten heels and a structured clutch.",
      jewellery: ["Pearl necklace", "Drop earrings", "Bracelet"],
    },
    "Black Tie": {
      name: "Old Hollywood Column Gown",
      desc: "A bias-cut satin column gown inspired by 1930s Hollywood glamour. A backless design and floor-length train.",
      tips: "Fur stole or satin opera gloves for authentic Hollywood glamour. Champagne and diamonds.",
      jewellery: [
        "Art deco necklace",
        "Long drop earrings",
        "Opera gloves",
        "Rhinestone cuff",
      ],
    },
    "Board Meeting": {
      name: "1960s A-Line Suit Dress",
      desc: "A structured A-line suit dress in neutral tones from the Mad Men era. Professional power through vintage aesthetics.",
      tips: "Add a structured bag and kitten heels. A chignon hair and minimal makeup keep it professional and period-perfect.",
      jewellery: ["Pearl studs", "Single chain", "Slim watch"],
    },
    Beach: {
      name: "1960s Halter Neck Cover-Up",
      desc: "A halter-neck one-piece or cover-up in vintage nautical or polka-dot print. Retro beach glamour.",
      tips: "Cat-eye sunglasses and a straw hat bring the 1960s beach resort look to life. Espadrilles.",
      jewellery: ["Stud earrings", "Simple anklet"],
    },
    Brunch: {
      name: "1970s Wide-Leg Pantsuit",
      desc: "A flared wide-leg pantsuit in earth tones from the 1970s era. Brunch but make it Studio 54.",
      tips: "Platform shoes are non-negotiable. A scarf tied in the hair or around the neck is quintessentially 70s.",
      jewellery: ["Hoop earrings", "Layered chains", "Wide cuff bracelet"],
    },
    "Anniversary Dinner": {
      name: "1940s Wrap Dress in Deep Jewel Tones",
      desc: "A romantic 1940s-style wrap dress in deep burgundy, navy, or forest green. Timeless romance for special evenings.",
      tips: "Red lips and pin-curl hair are the perfect vintage evening finishing touches. T-strap heels.",
      jewellery: ["Brooch", "Pearl earrings", "Delicate bracelet"],
    },
    "Birthday Party": {
      name: "1980s Dramatic Party Dress",
      desc: "A puff-sleeve, sequin-shoulder 80s-style party dress in bold color. Your birthday, your decade.",
      tips: "Big hair and bold makeup. Stilettos and a clutch. The 80s were loud — be loud.",
      jewellery: [
        "Statement earrings",
        "Layered bold necklaces",
        "Stack bracelets",
      ],
    },
    Casual: {
      name: "1970s Boho Maxi Skirt + Peasant Top",
      desc: "A printed 70s maxi skirt with a peasant blouse. Casual vintage dressing at its most wearable and wistful.",
      tips: "Platform sandals or clogs. A macrame bag and round sunglasses complete the 70s look.",
      jewellery: ["Layered chains", "Hoop earrings", "Beaded bracelet"],
    },
    Festive: {
      name: "1960s Shift Dress with Mod Embellishments",
      desc: "A mod-inspired shift dress with geometric embellishments and bold primary colors. Festive with a 60s twist.",
      tips: "White go-go boots or block heels. Bold eyeliner and pale lips are very 1965.",
      jewellery: ["Geometric earrings", "Single chain", "White bangles"],
    },
    Work: {
      name: "1960s A-Line Skirt Suit",
      desc: "A tailored A-line skirt with a matching structured blazer. Power dressing with vintage sophistication.",
      tips: "Keep everything crisp. A small structured handbag and kitten heels are era-appropriate.",
      jewellery: ["Pearl studs", "Simple watch", "Single chain"],
    },
    Formal: {
      name: "1950s Ball Gown",
      desc: "A full-skirt, nipped-waist ball gown in silk taffeta. Classic 1950s formal wear in its most iconic form.",
      tips: "Long white gloves, pearl necklace, and swept-up hair. The definition of vintage formal elegance.",
      jewellery: ["Pearl necklace", "Drop earrings", "Long white gloves"],
    },
    Special: {
      name: "1970s Wrap Dress with Vibrant Print",
      desc: "A Diane von Furstenberg-inspired 1970s wrap dress in a bold, swirling print. Effortless special occasion dressing.",
      tips: "Platform heels or wedges. Oversized sunglasses and a scarf in the hair for full 70s effect.",
      jewellery: ["Hoop earrings", "Layered gold chains", "Wide cuff"],
    },
  },
};

// Category-level fallbacks
const CATEGORY_FALLBACKS: Record<
  FrontendStyleMode,
  Record<string, OutfitEntry>
> = {
  indian: {
    festive: SUB_OCCASION_OUTFITS.indian.Festive,
    work: SUB_OCCASION_OUTFITS.indian.Work,
    casual: SUB_OCCASION_OUTFITS.indian.Casual,
    formal: SUB_OCCASION_OUTFITS.indian.Formal,
    special: SUB_OCCASION_OUTFITS.indian.Special,
  },
  western: {
    festive: SUB_OCCASION_OUTFITS.western.Festive,
    work: SUB_OCCASION_OUTFITS.western.Work,
    casual: SUB_OCCASION_OUTFITS.western.Casual,
    formal: SUB_OCCASION_OUTFITS.western.Formal,
    special: SUB_OCCASION_OUTFITS.western.Special,
  },
  indoWestern: {
    festive: SUB_OCCASION_OUTFITS.indoWestern.Festive,
    work: SUB_OCCASION_OUTFITS.indoWestern.Work,
    casual: SUB_OCCASION_OUTFITS.indoWestern.Casual,
    formal: SUB_OCCASION_OUTFITS.indoWestern.Formal,
    special: SUB_OCCASION_OUTFITS.indoWestern.Special,
  },
  bohemian: {
    festive: SUB_OCCASION_OUTFITS.bohemian.Festive,
    work: SUB_OCCASION_OUTFITS.bohemian.Work,
    casual: SUB_OCCASION_OUTFITS.bohemian.Casual,
    formal: SUB_OCCASION_OUTFITS.bohemian.Formal,
    special: SUB_OCCASION_OUTFITS.bohemian.Special,
  },
  minimalist: {
    festive: SUB_OCCASION_OUTFITS.minimalist.Festive,
    work: SUB_OCCASION_OUTFITS.minimalist.Work,
    casual: SUB_OCCASION_OUTFITS.minimalist.Casual,
    formal: SUB_OCCASION_OUTFITS.minimalist.Formal,
    special: SUB_OCCASION_OUTFITS.minimalist.Special,
  },
  maximalist: {
    festive: SUB_OCCASION_OUTFITS.maximalist.Festive,
    work: SUB_OCCASION_OUTFITS.maximalist.Work,
    casual: SUB_OCCASION_OUTFITS.maximalist.Casual,
    formal: SUB_OCCASION_OUTFITS.maximalist.Formal,
    special: SUB_OCCASION_OUTFITS.maximalist.Special,
  },
  streetwear: {
    festive: SUB_OCCASION_OUTFITS.streetwear.Festive,
    work: SUB_OCCASION_OUTFITS.streetwear.Work,
    casual: SUB_OCCASION_OUTFITS.streetwear.Casual,
    formal: SUB_OCCASION_OUTFITS.streetwear.Formal,
    special: SUB_OCCASION_OUTFITS.streetwear.Special,
  },
  vintage: {
    festive: SUB_OCCASION_OUTFITS.vintage.Festive,
    work: SUB_OCCASION_OUTFITS.vintage.Work,
    casual: SUB_OCCASION_OUTFITS.vintage.Casual,
    formal: SUB_OCCASION_OUTFITS.vintage.Formal,
    special: SUB_OCCASION_OUTFITS.vintage.Special,
  },
};

function getOutfitEntry(
  style: FrontendStyleMode,
  subOccasion: string,
  category: OccasionCategory,
): OutfitEntry {
  const bySubOccasion = SUB_OCCASION_OUTFITS[style][subOccasion];
  if (bySubOccasion) return bySubOccasion;
  const categoryKey = category.toString();
  return (
    CATEGORY_FALLBACKS[style][categoryKey] ||
    SUB_OCCASION_OUTFITS[style].Casual ||
    SUB_OCCASION_OUTFITS[style].Festive
  );
}

const STYLE_IMAGE_MAP: Record<FrontendStyleMode, string> = {
  indian: "/assets/generated/outfit-indian.dim_400x500.jpg",
  western: "/assets/generated/outfit-western.dim_400x500.jpg",
  indoWestern: "/assets/generated/outfit-indo-western.dim_400x500.jpg",
  bohemian: "/assets/generated/outfit-bohemian.dim_400x500.jpg",
  minimalist: "/assets/generated/outfit-minimalist.dim_400x500.jpg",
  maximalist: "/assets/generated/outfit-maximalist.dim_400x500.jpg",
  streetwear: "/assets/generated/outfit-streetwear.dim_400x500.jpg",
  vintage: "/assets/generated/outfit-vintage.dim_400x500.jpg",
};

export function generateRecommendations(
  skinToneId: string,
  bodyType: string,
  category: OccasionCategory,
  subOccasion: string,
  style: FrontendStyleMode,
  colorPalette: string[],
): OutfitRecommendation[] {
  const dressCode =
    DRESS_CODE_MAP[subOccasion] ||
    OCCASION_CATEGORY_LABELS[category] ||
    "Smart Casual";

  // Always show 3 recommendations: selected style + 2 alternatives
  // For new style modes, show only the selected + adjacent styles
  const allStyles: FrontendStyleMode[] = [
    "indian",
    "western",
    "indoWestern",
    "bohemian",
    "minimalist",
    "maximalist",
    "streetwear",
    "vintage",
  ];

  // Pick 3 styles: primary + 2 alternatives
  const styleOrder: FrontendStyleMode[] = [
    style,
    ...allStyles.filter((s) => s !== style).slice(0, 2),
  ];

  function buildTips(entry: OutfitEntry, pref: FrontendStyleMode): string {
    const bodyTip =
      BODY_TYPE_TIPS[bodyType]?.[pref] ||
      "Choose silhouettes that make you feel confident and comfortable.";
    return `${entry.tips} — ${bodyTip}`;
  }

  function getBodyTypeFitNote(bt: string, s: FrontendStyleMode): string {
    const fullTip =
      BODY_TYPE_TIPS[bt]?.[s] ||
      "Choose silhouettes that make you feel confident and comfortable.";
    const firstSentence = fullTip.split(".")[0];
    if (firstSentence && firstSentence.trim().length > 0) {
      return `${firstSentence.trim()}.`;
    }
    return fullTip.length > 100 ? `${fullTip.slice(0, 100)}…` : fullTip;
  }

  return styleOrder.map((s) => {
    const entry = getOutfitEntry(s, subOccasion, category);
    return {
      outfitName: entry.name,
      description: entry.desc,
      colorPalette,
      jewellery: entry.jewellery,
      styleTips: buildTips(entry, s),
      styleType: s,
      imageSrc: STYLE_IMAGE_MAP[s],
      dressCode,
      skinToneLabel:
        SKIN_TONE_COLOR_NOTES[skinToneId] ??
        "Colors chosen to complement your skin tone",
      bodyTypeFitNote: getBodyTypeFitNote(bodyType, s),
    };
  });
}
