// src/data/products.js

// --- 1. IMPORT ALL IMAGES FROM ASSETS ---
// (Assuming all files are .jpeg as listed, adjust extension if needed)

// Makeup Imports
import makeupPaletteImage from '../assets/Makeup palette.jpeg';
import eyeshadowPaletteImage from '../assets/Eyeshadow palette.jpeg';
import mascaraImage from '../assets/Mascara.jpeg';
import glamorousImage from '../assets/Glamorous.jpeg';
import glamorousBrushesImage from '../assets/Glamorous bruches.jpeg';
import extremeImage from '../assets/Extreme.jpeg';
import highlighterImage from '../assets/Highlighter make-up.jpeg';
import lipGlossImage from '../assets/Lip Gloss.jpeg';
import blusher4Image from '../assets/4 Blusher.jpeg';
import waterproofMascaraImage from '../assets/Water proof mascara.jpeg';
import emilieImage from '../assets/emilie.jpeg';
import glamorous8ColorKitImage from '../assets/Glamorous 8 color kit.jpeg';
import glamorous4ColorsImage from '../assets/glamorous 4 colors.jpeg';
import magicTintImage from '../assets/magic tint.jpeg';
import moisturizingBalmLipImage from '../assets/moisturizing balm lip.jpeg';
import forEyesAndFaceImage from '../assets/for eyes and face.jpeg';
import liquidConcealerImage from '../assets/liquied concailer.jpeg';
import matteMakerImage from '../assets/matte maker.jpeg';
import allColorMakeUpKitImage from '../assets/all color make up kit.jpeg';
import skyKajalImage from '../assets/sky kajal.jpeg';
import chirsisMagicLipImage from '../assets/chirsis magic lip.jpeg';

//sar trends products imports
import sarTrendsFoundation from '../assets/foundation.jpg';
import sarTrendsSerum from '../assets/serum.jpg';
import sarTrendsLipstick from '../assets/lipstick.jpg';
import sarTrendsBrushSet from '../assets/brush-set.jpg';

// Skincare/Body/Hair Imports
import riceRawPulpImage from '../assets/Rice Raw Pulp.jpeg';
import bioaquaRicePulpImage from '../assets/Bioaqua Rice Pulp.jpeg';
import bbFaceWashImage from '../assets/BB face wash.jpeg';
import charasBodyLotionImage from '../assets/charas body lotion.jpeg';
import charasBodyLotion2Image from '../assets/charas body lotion 2.jpeg';
import pieces4CharasBodyLotionImage from '../assets/4 pieces charas body lotion.jpeg';
import whiteningCreamImage from '../assets/whitning cream.jpeg';
import goldCreamImage from '../assets/Gold cream.jpeg';
import oliveBlackMaskImage from '../assets/olive black mask.jpeg';
import days7WhiteningImage from '../assets/7 days whitining.jpeg';
import aquaProtectBaseImage from '../assets/Aqua protect base.jpeg';
import aquaProtectSyrumImage from '../assets/Aqua protect syrum.jpeg';
import riceCreamImage from '../assets/rice cream.jpeg';
import antiHairLossOilImage from '../assets/anti hair loss oil.jpeg';
import v7HydrationCreamImage from '../assets/V7 hydration cream.jpeg';

// Nail Imports
import extentionNailsImage from '../assets/extention nails.jpeg';
import fancyNailsImage from '../assets/fancy nails.jpeg';

// --- FRAGRANCE IMPORTS ---
import blackOudhImage from '../assets/Black Oudh 6ml.jpeg'; 
import gucciRushImage from '../assets/Gucci Rush 12ml.jpeg';
import dunhillDesireImage from '../assets/DunhillDesire.jpeg';
import kahaafaImage from '../assets/Kahaafa Impression Creed Aventus.jpeg';
import oudhWoodImage from '../assets/Oudh Wood.jpeg';
import professorImage from '../assets/Professor-Impression (Blue De Channel).jpeg';
import haiderImage from '../assets/HAIDER.jpeg';
import breeezImage from '../assets/Breeez.jpeg';
import shamsImage from '../assets/Shams.jpeg';
import whitePearlImage from '../assets/White Pearl.jpeg';
import abeerImage from '../assets/Abeer.jpeg';
import zunishaImage from '../assets/Zunisha.jpeg';
import turaabImage from '../assets/Turaab.jpeg';
import jananImage from '../assets/Janan.jpeg';

// --- NEW IMPORTED PRODUCTS IMPORTS ---
import importedBodySprayImage from '../assets/imported body spray.jpg';
import importedHairOilImage from '../assets/imported hair oil.jpg';
import importedShampoImage from '../assets/imported shampo.jpg';
import importedSuremImage from '../assets/imported surem.jpg';
import importedCreamImage from '../assets/imported cream.jpg';
import importedEyelinerImage from '../assets/imported eyeliner.jpg';
import importedSoapImage from '../assets/imported soap.jpg';
import importedCleanserImage from '../assets/imported cleanser.jpg';
import importedLisptickImage from '../assets/imported lisptick.jpg';
import importedFaceGelImage from '../assets/imported face gel.jpg';

// --- 2. PRODUCT DATA MAPPING (Prices in PKR) ---

export const products = [
    { 
        id: 1,
        name: "Velvet Lip Gloss",
        category: "makeup",
        rate: 7000, // 25 USD × 280
        description: "A silky, pigmented gloss providing all-day shine without stickiness.",
        imageUrl: lipGlossImage,
        activeComponents: ["Shea Butter", "Vitamin E", "High-Shine Polymers"],
        ingredients: [
            "Polybutene", "Diisostearyl Malate", "Tridecyl Trimellitate", "Caprylic/Capric Triglyceride", 
            "Butyrospermum Parkii (Shea Butter)", "Tocopheryl Acetate (Vitamin E)", "Silica Dimethyl Silylate",
            "Phenoxyethanol", "Parfum", "CI 77491", "CI 15850"
        ]
    },
    {
        id: 2,
        name: "8-Color Eyeshadow Kit",
        category: "makeup",
        rate: 15400, // 55 USD × 280
        description: "A comprehensive palette featuring mattes and high-shimmer metallics.",
        imageUrl: glamorous8ColorKitImage,
        activeComponents: ["Micronized Pigments", "Dimethicone", "Talc-Free Formula"],
        ingredients: [
            "Mica", "Talc", "Magnesium Stearate", "Dimethicone", "Ethylhexyl Palmitate", 
            "Polyethylene", "Bis-Diglyceryl Polyacyladipate-2", "Phenoxyethanol", 
            "Caprylyl Glycol", "May Contain: Titanium Dioxide (CI 77891), Iron Oxides (CI 77491, CI 77492, CI 77499), Ultramarines (CI 77007)"
        ]
    },
    {
        id: 3,
        name: "Aqua Protect Serum",
        category: "skincare",
        rate: 8400, // 30 USD × 280
        description: "Intensive hydration serum designed to lock in moisture and protect the skin barrier.",
        imageUrl: aquaProtectSyrumImage,
        activeComponents: ["Hyaluronic Acid", "Ceramides", "Niacinamide (Vitamin B3)"],
        ingredients: [
            "Water (Aqua)", "Glycerin", "Sodium Hyaluronate", "Niacinamide", 
            "Ceramide NP", "Panthenol", "Lecithin", "Xanthan Gum", "Caprylyl Glycol", 
            "Phenoxyethanol", "Citric Acid"
        ]
    },
    {
        id: 4,
        name: "Aqua Protect Base SPF",
        category: "skincare",
        rate: 5040, // 18 USD × 280
        description: "Lightweight makeup base offering broad-spectrum UV protection and a smooth canvas.",
        imageUrl: aquaProtectBaseImage,
        activeComponents: ["SPF 30 Broad Spectrum", "Zinc Oxide", "Titanium Dioxide"],
        ingredients: [
            "Active Ingredients: Zinc Oxide 5.0%, Titanium Dioxide 3.0%", 
            "Inactive Ingredients: Water (Aqua), Cyclopentasiloxane, Dimethicone, Butylene Glycol, Capryryly Methicone, Sodium Chloride, Tocopheryl Acetate, Ethylhexylglycerin, Phenoxyethanol"
        ]
    },
    {
        id: 5,
        name: "Matte Maker Foundation",
        category: "makeup",
        rate: 12600, // 45 USD × 280
        description: "Achieve a flawless, velvety matte finish that lasts all day.",
        imageUrl: matteMakerImage,
        activeComponents: ["Oil-Absorbing Clay", "Silica Microspheres", "Non-Comedogenic"],
        ingredients: [
            "Water (Aqua)", "Cyclopentasiloxane", "Isododecane", "Titanium Dioxide", 
            "Dimethicone", "Butylene Glycol", "Silica", "Disteardimonium Hectorite", 
            "Propylene Carbonate", "Kaolin (Clay)", "Phenoxyethanol", "Iron Oxides"
        ]
    },
    {
        id: 6,
        name: "Extreme Volume Mascara",
        category: "makeup",
        rate: 6160, // 22 USD × 280
        description: "Dramatically increases lash volume and length for a bold look.",
        imageUrl: mascaraImage,
        activeComponents: ["Conditioning Keratin", "Volumizing Fibers", "Carbon Black Pigments"],
        ingredients: [
            "Water (Aqua)", "Acrylates Copolymer", "Cera Alba (Beeswax)", "Stearic Acid", 
            "Synthetic Beeswax", "Paraffin", "Hydrolyzed Keratin", "Nylon-6", 
            "Polyglyceryl-3 Diisostearate", "Phenoxyethanol", "Carbon Black (CI 77266)"
        ]
    },
    {
        id: 7,
        name: "V7 Hydration Cream",
        category: "skincare",
        rate: 18200, // 65 USD × 280
        description: "An intensive overnight cream enriched with 7 essential vitamins for renewal.",
        imageUrl: v7HydrationCreamImage,
        activeComponents: ["Vitamin Complex (A, C, E, B5, B7, Folic Acid, Niacinamide)", "Jojoba Oil"],
        ingredients: [
            "Water (Aqua)", "Glycerin", "Caprylic/Capric Triglyceride", "Simmondsia Chinensis (Jojoba) Seed Oil", 
            "Cetearyl Alcohol", "Glyceryl Stearate", "Vitamins A, C, E", "Panthenol", "Tocopheryl Acetate", 
            "Phenoxyethanol", "Carbomer", "Parfum"
        ]
    },
    {
        id: 8,
        name: "Bioaqua Rice Pulp Face Wash",
        category: "skincare",
        rate: 7840, // 28 USD × 280
        description: "Gentle foaming cleanser using rice extract to brighten and clarify the skin.",
        imageUrl: bbFaceWashImage,
        activeComponents: ["Rice Ferment Filtrate (Pitera equivalent)", "Squalane", "Glycerin"],
        ingredients: [
            "Water (Aqua)", "Oryza Sativa (Rice) Bran Extract", "Sodium Laureth Sulfate", 
            "Cocamidopropyl Betaine", "Glycerin", "PEG-7 Glyceryl Cocoate", "Squalane", 
            "Citric Acid", "Disodium EDTA", "Phenoxyethanol", "Fragrance"
        ]
    },
    {
        id: 9,
        name: "Glamorous Pro Brush Set",
        category: "tools",
        rate: 23800, // 85 USD × 280
        description: "A comprehensive set of professional brushes for flawless makeup application.",
        activeComponents: ["Premium Synthetic Bristles", "Solid Wood Handles"],
        imageUrl: glamorousBrushesImage,
        ingredients: ["High-grade synthetic fibers (Nylon/PBT blend)", "Birch Wood", "Aluminum Ferrule"]
    },
    {
        id: 10,
        name: "4-Color Blusher Palette",
        category: "makeup",
        rate: 9800, // 35 USD × 280
        description: "A perfect blend of contour and blush shades for a sculpted, natural flush.",
        imageUrl: blusher4Image,
        activeComponents: ["Fine Talc", "Silky Powders", "Blendable Pigments"],
        ingredients: [
            "Talc", "Mica", "Zinc Stearate", "Octyldodecyl Stearoyl Stearate", "Boron Nitride", 
            "Caprylyl Glycol", "Phenoxyethanol", "Tocopheryl Acetate", "May Contain: CI 77891, CI 15850, CI 77491, CI 77492"
        ]
    },
    {
        id: 11,
        name: "Charas Body Lotion",
        category: "body",
        rate: 4200, // 15 USD × 280
        description: "Deeply moisturizing body lotion with a calming, luxurious scent.",
        imageUrl: charasBodyLotionImage,
        activeComponents: ["Shea Butter", "Coconut Oil", "Aloe Vera"],
        ingredients: [
            "Water (Aqua)", "Glycerin", "Cetyl Alcohol", "Butyrospermum Parkii (Shea Butter)", 
            "Cocos Nucifera (Coconut) Oil", "Aloe Barbadensis Leaf Juice", "Dimethicone", 
            "Stearic Acid", "Phenoxyethanol", "Carbomer", "Triethanolamine", "Fragrance"
        ]
    },
    {
        id: 12,
        name: "Olive Black Mask",
        category: "skincare",
        rate: 3360, // 12 USD × 280
        description: "Detoxifying black mask infused with olive extracts to draw out impurities.",
        imageUrl: oliveBlackMaskImage,
        activeComponents: ["Activated Charcoal", "Olea Europaea (Olive) Leaf Extract", "Kaolin Clay"],
        ingredients: [
            "Water (Aqua)", "Polyvinyl Alcohol", "Activated Charcoal", "Glycerin", 
            "Olea Europaea (Olive) Leaf Extract", "Kaolin", "Propylene Glycol", 
            "Phenoxyethanol", "Methylparaben", "Fragrance"
        ]
    },
    {
        id: 13,
        name: "Anti Hair Loss Oil",
        category: "hair",
        rate: 5040, // 18 USD × 280
        description: "Potent oil blend formulated to stimulate the scalp and reduce hair fall.",
        imageUrl: antiHairLossOilImage,
        activeComponents: ["Argan Oil", "Castor Oil", "Rosemary Leaf Oil"],
        ingredients: [
            "Argania Spinosa (Argan) Kernel Oil", "Ricinus Communis (Castor) Seed Oil", 
            "Cocos Nucifera (Coconut) Oil", "Olea Europaea (Olive) Fruit Oil", 
            "Rosmarinus Officinalis (Rosemary) Leaf Oil", "Tocopherol (Vitamin E)", "Parfum"
        ]
    },
    {
        id: 14,
        name: "Professional Makeup Palette",
        category: "makeup",
        rate: 25200, // 90 USD × 280
        description: "All-in-one professional kit with foundations, contours, and eye shades.",
        imageUrl: makeupPaletteImage,
        activeComponents: ["Highly Pigmented Formula", "Smooth Application"],
        ingredients: ["Mica", "Talc", "Dimethicone", "Various Pigments"]
    },
    {
        id: 15,
        name: "Smoky Eyeshadow Palette",
        category: "makeup",
        rate: 13440, // 48 USD × 280
        description: "Perfect shades for creating deep, dramatic smoky eye looks.",
        imageUrl: eyeshadowPaletteImage,
        activeComponents: ["Deep Matte Blacks", "Shimmering Greys"],
        ingredients: ["Talc", "Synthetic Fluorphlogopite", "Silica", "Iron Oxides"]
    },
    {
        id: 16,
        name: "Glamorous All-Day Lipstick",
        category: "makeup",
        rate: 8120, // 29 USD × 280
        description: "Long-lasting matte lipstick with a comfortable, non-drying formula.",
        imageUrl: glamorousImage,
        activeComponents: ["Hydrating Waxes", "Intense Pigments"],
        ingredients: ["Octyldodecanol", "Candelilla Wax", "Microcrystalline Wax", "Titanium Dioxide"]
    },
    {
        id: 17,
        name: "Extreme Eyeliner Pen",
        category: "makeup",
        rate: 5320, // 19 USD × 280
        description: "Precision liquid eyeliner for sharp, intense black lines.",
        imageUrl: extremeImage,
        activeComponents: ["Felt-Tip Applicator", "Quick-Drying"],
        ingredients: ["Water", "Acrylates Copolymer", "Carbon Black", "Propylene Glycol"]
    },
    {
        id: 18,
        name: "Highlighter Make-up Powder",
        category: "makeup",
        rate: 8960, // 32 USD × 280
        description: "Finely milled powder for a blinding, luminous glow.",
        imageUrl: highlighterImage,
        activeComponents: ["Pearlescent Pigments", "Light-Reflecting Particles"],
        ingredients: ["Mica", "Talc", "Magnesium Aluminum Silicate", "Dimethicone"]
    },
    {
        id: 19,
        name: "Waterproof Volume Mascara",
        category: "makeup",
        rate: 6720, // 24 USD × 280
        description: "Volume-boosting mascara that resists water, sweat, and tears.",
        imageUrl: waterproofMascaraImage,
        activeComponents: ["Water-Resistant Polymers", "Carnauba Wax"],
        ingredients: ["Isododecane", "Polyethylene", "Cera Carnauba", "Carbon Black (CI 77266)"]
    },
    {
        id: 20,
        name: "Emilie Lip Crayon",
        category: "makeup",
        rate: 5600, // 20 USD × 280
        description: "Easy-to-apply lip color in a convenient crayon format.",
        imageUrl: emilieImage,
        activeComponents: ["Creamy Formula", "Precision Tip"],
        ingredients: ["Caprylic/Capric Triglyceride", "Ozokerite", "Paraffin", "Pigments"]
    },
    {
        id: 21,
        name: "Glamorous 4 Color Kit",
        category: "makeup",
        rate: 11760, // 42 USD × 280
        description: "Compact quad kit for eyes or face with coordinated shades.",
        imageUrl: glamorous4ColorsImage,
        activeComponents: ["Blendable Powders", "Vibrant Colors"],
        ingredients: ["Talc", "Mica", "Ethylhexyl Palmitate", "Magnesium Stearate"]
    },
    {
        id: 22,
        name: "Magic Tint Lip & Cheek Stain",
        category: "makeup",
        rate: 4480, // 16 USD × 280
        description: "A liquid tint for a natural flush of color on lips and cheeks.",
        imageUrl: magicTintImage,
        activeComponents: ["Glycerin", "Natural Colorants"],
        ingredients: ["Water", "Glycerin", "Propylene Glycol", "Phenoxyethanol", "CI 45410"]
    },
    {
        id: 23,
        name: "Moisturizing Lip Balm",
        category: "makeup",
        rate: 2800, // 10 USD × 280
        description: "Daily lip care for soft, hydrated, and protected lips.",
        imageUrl: moisturizingBalmLipImage,
        activeComponents: ["Beeswax", "Mineral Oil", "SPF 15"],
        ingredients: ["Petrolatum", "Mineral Oil", "Cera Alba", "Lanolin", "Parfum"]
    },
    {
        id: 24,
        name: "All-in-One Eye & Face Palette",
        category: "makeup",
        rate: 19600, // 70 USD × 280
        description: "Versatile kit for full face looks including contour, blush, and eyeshadow.",
        imageUrl: forEyesAndFaceImage,
        activeComponents: ["Highly Versatile", "Travel-Friendly"],
        ingredients: ["Talc", "Mica", "Dimethicone", "Zinc Stearate"]
    },
    {
        id: 25,
        name: "Liquid Concealer",
        category: "makeup",
        rate: 7280, // 26 USD × 280
        description: "Lightweight, high-coverage liquid concealer that hides imperfections.",
        imageUrl: liquidConcealerImage,
        activeComponents: ["Full Coverage Formula", "Hydrating Agents"],
        ingredients: ["Water", "Cyclopentasiloxane", "Titanium Dioxide", "Glycerin", "Iron Oxides"]
    },
    {
        id: 26,
        name: "All Color Make Up Kit (Large)",
        category: "makeup",
        rate: 33600, // 120 USD × 280
        description: "The ultimate makeup kit featuring a wide range of colors for all parts of the face.",
        imageUrl: allColorMakeUpKitImage,
        activeComponents: ["Complete Range", "Professional Quality"],
        ingredients: ["Varies widely across components"]
    },
    {
        id: 27,
        name: "Sky Kajal Eyeliner",
        category: "makeup",
        rate: 4200, // 15 USD × 280
        description: "Intense black kohl pencil for defined and smoky eye looks.",
        imageUrl: skyKajalImage,
        activeComponents: ["Smudge-Proof", "Deep Black Pigment"],
        ingredients: ["Hydrogenated Palm Kernel Glycerides", "Cera Microcristallina", "Iron Oxides (CI 77499)"]
    },
    {
        id: 28,
        name: "Chirsis Magic Lip",
        category: "makeup",
        rate: 5040, // 18 USD × 280
        description: "Color-changing lipstick that adapts to your body's pH for a unique shade.",
        imageUrl: chirsisMagicLipImage,
        activeComponents: ["pH Reacting Formula", "Moisturizing Base"],
        ingredients: ["Octyldodecanol", "Ceresin", "Castor Oil", "CI 45410"]
    },
    {
        id: 29,
        name: "Rice Raw Pulp Toner",
        category: "skincare",
        rate: 9800, // 35 USD × 280
        description: "Restorative toner that hydrates and preps the skin using raw rice pulp extracts.",
        imageUrl: riceRawPulpImage,
        activeComponents: ["Rice Ferment Filtrate", "Glycerin"],
        ingredients: ["Water", "Oryza Sativa (Rice) Extract", "Glycerin", "Butylene Glycol"]
    },
    {
        id: 30,
        name: "Bioaqua Rice Pulp Cream",
        category: "skincare",
        rate: 11200, // 40 USD × 280
        description: "Nourishing facial cream for improved texture and luminosity.",
        imageUrl: bioaquaRicePulpImage,
        activeComponents: ["Rice Extract", "Niacinamide"],
        ingredients: ["Water", "Glycerin", "Oryza Sativa (Rice) Bran Water", "Caprylic/Capric Triglyceride"]
    },
    {
        id: 31,
        name: "Charas Body Lotion (Large)",
        category: "body",
        rate: 7000, // 25 USD × 280
        description: "Large size of the deeply moisturizing Charas Body Lotion with a calming scent.",
        imageUrl: charasBodyLotion2Image,
        activeComponents: ["Shea Butter", "Coconut Oil", "Aloe Vera"],
        ingredients: [
            "Water (Aqua)", "Glycerin", "Cetyl Alcohol", "Butyrospermum Parkii (Shea Butter)", 
            "Cocos Nucifera (Coconut) Oil", "Aloe Barbadensis Leaf Juice", "Dimethicone", 
            "Stearic Acid", "Phenoxyethanol", "Carbomer", "Triethanolamine", "Fragrance"
        ]
    },
    {
        id: 32,
        name: "4-Piece Charas Body Lotion Set",
        category: "body",
        rate: 22400, // 80 USD × 280
        description: "Convenient pack of four Charas Body Lotions for long-term use.",
        imageUrl: pieces4CharasBodyLotionImage,
        activeComponents: ["Value Pack", "Moisturizing Formula"],
        ingredients: ["Same as ID 11 & 31"]
    },
    {
        id: 33,
        name: "Intensive Whitening Cream",
        category: "skincare",
        rate: 15400, // 55 USD × 280
        description: "Targeted cream designed to reduce dark spots and even out skin tone.",
        imageUrl: whiteningCreamImage,
        activeComponents: ["Arbutin", "Vitamin C", "Kojic Acid"],
        ingredients: ["Water", "Glycerin", "Niacinamide", "Arbutin", "Cetearyl Alcohol"]
    },
    {
        id: 34,
        name: "Gold Cream Anti-Aging",
        category: "skincare",
        rate: 21000, // 75 USD × 280
        description: "Luxurious cream infused with gold flakes to firm and revitalize aging skin.",
        imageUrl: goldCreamImage,
        activeComponents: ["Colloidal Gold", "Peptides", "Hyaluronic Acid"],
        ingredients: ["Water", "Glycerin", "Butylene Glycol", "Colloidal Gold", "Palmitoyl Tripeptide-1"]
    },
    {
        id: 35,
        name: "7-Days Whitening Serum",
        category: "skincare",
        rate: 16800, // 60 USD × 280
        description: "Highly concentrated serum for quick results in brightening and spot reduction.",
        imageUrl: days7WhiteningImage,
        activeComponents: ["High Concentration Vitamin C", "Ferulic Acid"],
        ingredients: ["Water", "Ascorbic Acid (Vitamin C)", "Glycerin", "Propylene Glycol", "Ferulic Acid"]
    },
    {
        id: 36,
        name: "Rice Extract Moisturizer",
        category: "skincare",
        rate: 10640, // 38 USD × 280
        description: "A gentle, daily moisturizer based on nutrient-rich rice extract.",
        imageUrl: riceCreamImage,
        activeComponents: ["Rice Extract", "Vitamin E"],
        ingredients: ["Water", "Oryza Sativa (Rice) Extract", "Glycerin", "Caprylic/Capric Triglyceride", "Tocopherol"]
    },
    {
        id: 37,
        name: "Extension Nail Kit",
        category: "nails",
        rate: 12600, // 45 USD × 280
        description: "Professional kit for creating durable and beautiful nail extensions.",
        imageUrl: extentionNailsImage,
        activeComponents: ["Acrylic/Gel Powder", "Primer", "Top Coat"],
        ingredients: ["Polymer Powder", "Monomer Liquid", "UV Gel"]
    },
    {
        id: 38,
        name: "Fancy Press-On Nails",
        category: "nails",
        rate: 5600, // 20 USD × 280
        description: "A set of decorative, ready-to-wear press-on nails for an instant manicure.",
        imageUrl: fancyNailsImage,
        activeComponents: ["Durable Plastic", "Adhesive Tabs"],
        ingredients: ["ABS Plastic", "Acrylic Adhesive"]
    },
    {
        id: 90, 
        name: "SarTrends Silk Foundation",
        category: "sartrends",
        rate: 2499, // Already in PKR
        imageUrl: sarTrendsFoundation,
        description: "A luxurious, lightweight, long-wear foundation for a flawless, airbrushed finish, developed in-house.",
        brand: "SarTrends Signature",
        activeComponents: ["Silk Peptides", "Vitamin E"],
        ingredients: ["Aqua", "Dimethicone", "Silk Peptides", "Titanium Dioxide"],
    },
    {
        id: 91, 
        name: "SarTrends Hydrating Serum",
        category: "sartrends",
        rate: 1850, // Already in PKR
        imageUrl: sarTrendsSerum,
        description: "Infused with Hyaluronic Acid and Niacinamide for deep, lasting hydration and skin barrier support.",
        brand: "SarTrends Signature",
        activeComponents: ["Hyaluronic Acid", "Niacinamide"],
        ingredients: ["Water", "Glycerin", "Sodium Hyaluronate", "Niacinamide"],
    },
    {
        id: 92, 
        name: "SarTrends Matte Lipstick",
        category: "sartrends",
        rate: 999, // Already in PKR
        imageUrl: sarTrendsLipstick,
        description: "Intensely pigmented matte lipstick that stays comfortable and vibrant all day without cracking.",
        brand: "SarTrends Signature",
        activeComponents: ["Shea Butter", "Color Pigments"],
        ingredients: ["Isododecane", "Ozokerite", "Shea Butter", "CI 15850"],
    },
    {
        id: 93, 
        name: "SarTrends Essential Brush Set",
        category: "sartrends",
        rate: 3200, // Already in PKR
        imageUrl: sarTrendsBrushSet,
        description: "Four essential, cruelty-free brushes crafted with soft, synthetic fibers for complete makeup application.",
        brand: "SarTrends Signature",
        activeComponents: ["Synthetic Fibers", "Wooden Handles"],
        ingredients: ["Synthetic Hair", "Aluminum Ferrule", "Birch Wood Handle"],
    },
    {
        id: 101, 
        name: "Black Oudh 6ml",
        category: "fragrance", 
        rate: 12600, // 45 USD × 280
        description: "Deep and smoky concentrated Black Oudh oil. Notes of resin, leather, and smoke.",
        imageUrl: blackOudhImage,
        activeComponents: ["Agarwood Resin (Oudh)", "Musk Base", "Essential Oils"],
        ingredients: [
            "Dipropylene Glycol", "Parfum (Fragrance)", "Synthetic Oudh Accord", 
            "Santalum Album Oil", "Linalool", "Limonene", "Cinnamal"
        ]
    },
    {
        id: 102,
        name: "Gucci Rush 12ml",
        category: "fragrance",
        rate: 15400, // 55 USD × 280
        description: "A bold, captivating impression of the popular Gucci Rush fragrance with dominant notes of Gardenia and Patchouli.",
        imageUrl: gucciRushImage,
        activeComponents: ["High-Grade Impression Oil", "Gardenia Note", "Patchouli Note"],
        ingredients: [
            "Propylene Glycol", "Parfum (Fragrance)", "Benzyl Salicylate", "Hydroxycitronellal", 
            "Coumarin", "Linalool", "CI 15985"
        ]
    },
    {
        id: 103,
        name: "Dunhill Desire",
        category: "fragrance",
        rate: 11200, // 40 USD × 280
        description: "A refreshing and warm impression of Dunhill Desire, featuring Apple, Rose, and Vanilla notes.",
        imageUrl: dunhillDesireImage,
        activeComponents: ["Fruity Accord", "Rose Essence", "Vanilla Base"],
        ingredients: [
            "Propylene Glycol", "Parfum (Fragrance)", "Alpha-Isomethyl Ionone", 
            "Citral", "Geraniol", "Eugenol", "Farnesol"
        ]
    },
    {
        id: 104,
        name: "Kahaafa Impression Creed Aventus",
        category: "fragrance",
        rate: 21000, // 75 USD × 280
        description: "A premium, sharp, and fruity impression of Creed Aventus, noted for Pineapple and Birch tar.",
        imageUrl: kahaafaImage,
        activeComponents: ["Pineapple Extract", "Smoky Birch", "Musk"],
        ingredients: [
            "Dipropylene Glycol", "Parfum (Fragrance)", "Limonene", "Linalool", 
            "Citronellol", "Oakmoss Extract", "Hexyl Cinnamal"
        ]
    },
    {
        id: 105,
        name: "Oudh Wood",
        category: "fragrance",
        rate: 16800, // 60 USD × 280
        description: "A rich, woody blend with oriental notes of Oudh, Vetiver, and Sandalwood.",
        imageUrl: oudhWoodImage,
        activeComponents: ["Natural Oudh Oil", "Sandalwood", "Vetiver"],
        ingredients: [
            "Propylene Glycol", "Parfum (Fragrance)", "Eugenol", "Geraniol", 
            "Benzyl Benzoate", "Citral", "Farnesol"
        ]
    },
    {
        id: 106,
        name: "Professor Impression (Blue De Channel)",
        category: "fragrance",
        rate: 18200, // 65 USD × 280
        description: "A fresh, aromatic, and distinctly masculine impression of Blue De Channel with Citrus and Amber notes.",
        imageUrl: professorImage,
        activeComponents: ["Grapefruit Zest", "Incense Accord", "Dry Cedar"],
        ingredients: [
            "Propylene Glycol", "Parfum (Fragrance)", "Limonene", "Citronellol", 
            "Hydroxycitronellal", "Hexyl Cinnamal", "Geraniol"
        ]
    },
    {
        id: 107,
        name: "HAIDER",
        category: "fragrance",
        rate: 8400, // 30 USD × 280
        description: "A popular, classic oriental scent that is suitable for all occasions.",
        imageUrl: haiderImage,
        activeComponents: ["Spicy Accord", "Amber", "Light Musk"],
        ingredients: [
            "Propylene Glycol", "Parfum (Fragrance)", "Cinnamyl Alcohol", "Coumarin", 
            "Anise Alcohol", "Benzyl Benzoate", "Isoeugenol"
        ]
    },
    {
        id: 108,
        name: "Breeez",
        category: "fragrance",
        rate: 7000, // 25 USD × 280
        description: "A light and airy aquatic fragrance, perfect for a subtle, fresh scent.",
        imageUrl: breeezImage,
        activeComponents: ["Aquatic Notes", "Mint Leaf", "White Flowers"],
        ingredients: [
            "Dipropylene Glycol", "Parfum (Fragrance)", "Limonene", "Citral", 
            "Geraniol", "Hexyl Cinnamal", "CI 42090"
        ]
    },
    {
        id: 109,
        name: "Shams",
        category: "fragrance",
        rate: 14000, // 50 USD × 280
        description: "Named after the sun, a bright and warm oriental fragrance with notes of Saffron and Spice.",
        imageUrl: shamsImage,
        activeComponents: ["Saffron", "Spiced Rose", "Warm Amber"],
        ingredients: [
            "Propylene Glycol", "Parfum (Fragrance)", "Cinnamyl Alcohol", 
            "Benzyl Benzoate", "Coumarin", "Alpha-Isomethyl Ionone", "Isoeugenol"
        ]
    },
    {
        id: 110,
        name: "White Pearl",
        category: "fragrance",
        rate: 11200, // 40 USD × 280
        description: "A delicate and clean fragrance, evoking elegance and purity with soft floral and powdery notes.",
        imageUrl: whitePearlImage,
        activeComponents: ["Soft Musk", "Jasmine", "Powder Notes"],
        ingredients: [
            "Dipropylene Glycol", "Parfum (Fragrance)", "Linalool", 
            "Hydroxycitronellal", "Geraniol", "Citronellol", "Benzyl Alcohol"
        ]
    },
    {
        id: 111,
        name: "Abeer",
        category: "fragrance",
        rate: 9800, // 35 USD × 280
        description: "A sweet and comforting scent, reminiscent of a soft floral breeze with hints of Honey.",
        imageUrl: abeerImage,
        activeComponents: ["Sweet Honey Accord", "Rose Water", "Vanilla"],
        ingredients: [
            "Propylene Glycol", "Parfum (Fragrance)", "Benzyl Benzoate", 
            "Cinnamyl Alcohol", "Eugenol", "Farnesol", "Limonene"
        ]
    },
    {
        id: 112,
        name: "Zunisha",
        category: "fragrance",
        rate: 12600, // 45 USD × 280
        description: "A deep, mysterious, and long-lasting fragrance oil with strong Woody and Oriental notes.",
        imageUrl: zunishaImage,
        activeComponents: ["Cedarwood", "Patchouli", "Oriental Spices"],
        ingredients: [
            "Dipropylene Glycol", "Parfum (Fragrance)", "Coumarin", "Linalool", 
            "Geraniol", "Citronellol", "Cinnamal"
        ]
    },
    {
        id: 113,
        name: "Turaab",
        category: "fragrance",
        rate: 14000, // 50 USD × 280
        description: "An earthy, grounded scent with hints of musk and spice, inspired by dry earth and rich soil.",
        imageUrl: turaabImage,
        activeComponents: ["Vetiver", "Earthy Musk", "Sandalwood"],
        ingredients: [
            "Propylene Glycol", "Parfum (Fragrance)", "Limonene", "Farnesol", 
            "Benzyl Alcohol", "Citral", "Eugenol"
        ]
    },
    {
        id: 114,
        name: "Janan",
        category: "fragrance",
        rate: 13440, // 48 USD × 280
        description: "A captivating, floral oriental fragrance, often featuring notes of jasmine and warm woods.",
        imageUrl: jananImage,
        activeComponents: ["Jasmine Absolute", "Sandalwood", "Amber"],
        ingredients: [
            "Propylene Glycol", "Parfum (Fragrance)", "Benzyl Benzoate",
            "Linalool", "Eugenol", "Farnesol"
        ]
    },
    {
        id: 201, 
        name: "Imported Body Spray",
        category: "imported", 
        rate: 8400, // 30 USD × 280
        description: "Premium imported body spray for a long-lasting, unique scent.",
        imageUrl: importedBodySprayImage,
        activeComponents: ["Alcohol Denat.", "Fragrance Oil"],
        ingredients: ["Varies by scent"]
    },
    {
        id: 202, 
        name: "Imported Hair Oil",
        category: "imported", 
        rate: 12600, // 45 USD × 280
        description: "Nourishing imported hair oil for shine and strength.",
        imageUrl: importedHairOilImage,
        activeComponents: ["Argan Oil", "Jojoba Oil"],
        ingredients: ["Mineral Oil", "Fragrance", "Tocopherol"]
    },]