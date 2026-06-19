import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API
const genAIKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    if (!genAIKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    aiClient = new GoogleGenAI({
      apiKey: genAIKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Simulated/Mock Concept Generator for Demo Mode
function generateMockConcept(room: string, style: string, size: string, lighting: string, custom: string) {
  const cleanRoom = room.replace("Destination", "").trim();
  const cleanStyle = style.replace("Blueprint", "").trim();

  let conceptName = "Travertine & Smoked Oak Atelier";
  let editorialIntro = "A beautiful curated layout that accentuates spatial volume and organic luxury.";
  let colors = [
    { name: "Travertine Warmth", hex: "#EAE0D5", usage: "Primary wall finishes and structural floor tiles" },
    { name: "Smoked Oak", hex: "#3D271F", usage: "Bespoke walnut millwork and central joinery" },
    { name: "Pampas Plaster", hex: "#F5F2EB", usage: "Accents, soft draperies, and ceilings" },
    { name: "Obsidian Hue", hex: "#1C1816", usage: "Architectural borders, lights, and details" }
  ];
  let furniture = [
    { item: "Low-profile Bouclé Sofa", description: "Anchors the central conversation circle with generous negative space.", materialHint: "Oatmeal Bouclé" },
    { item: "Honed Quartzite Coffee Block", description: "A monolithic coffee table block showcasing deep organic veining.", materialHint: "Honed Calacatta Marble" },
    { item: "Seamless Floating Walnut Shelving", description: "Provides minimal integrated storage along the focal wall zone.", materialHint: "Bespoke Walnut" }
  ];
  let materials = ["Italian Travertine", "Smoked Walnut", "Textured Plaster", "Brushed Brass"];
  let architecturalAdvice = [
    "Prioritize a singular monolithic focal point (e.g. fireplace or main stone block) and maintain generous negative space.",
    "Implement concealed low-temperature (2700K) LED channel lights to graze along textured plaster surfaces.",
    "Utilize sheer floor-to-ceiling linen drapes mounted inside recess pockets to diffuse incoming daylight."
  ];

  if (cleanStyle.includes("Minimalist")) {
    conceptName = `Satori ${cleanRoom} Sanctuary`;
    editorialIntro = `An elegant space of profound restraint. This layout centers around generous negative volume, pristine surfaces, and curated lighting to foster calm and clarity.`;
    colors = [
      { name: "Chalk White Plaster", hex: "#F7F5F0", usage: "Main walls and ceiling plaster finishes" },
      { name: "Raw Walnut", hex: "#4A3525", usage: "Bespoke floating storage cabinets and console" },
      { name: "Oatmeal Linen", hex: "#DFDCD4", usage: "Sheer window drapes and soft rug weaves" },
      { name: "Slate Grey", hex: "#3A3C3E", usage: "Subtle structural trims and lighting tracks" }
    ];
    furniture = [
      { item: "Low-Profile Block Sofa", description: "A modular, legless lounge system that keeps the room line clean and low.", materialHint: "Off-White Bouclé" },
      { item: "Monolithic Walnut Plinth", description: "A simple low coffee table block highlighting natural grain splits.", materialHint: "Matte Walnut Wood" },
      { item: "Seamless Floating Cabinetry", description: "Storage doors with touch-latches that sit flush within the plaster walls.", materialHint: "Natural Walnut Millwork" }
    ];
    materials = ["Seamless Micro-cement", "Textured Linen", "American Black Walnut", "Honed Basalt Stone"];
    architecturalAdvice = [
      "Conceal all cabling and media equipment inside flush drywall panels with hidden access points.",
      "Anchor the seating configuration on a large, high-texture loop wool rug to define the lounge boundary.",
      "Incorporate custom drywall shadowline details at the ceiling junction instead of traditional trim mold."
    ];
  } else if (cleanStyle.includes("Brutalism")) {
    conceptName = `Obsidian & Cast ${cleanRoom}`;
    editorialIntro = `A striking architectural design celebrating raw texture and monumental forms. Honed concrete slabs are balanced with warm timber and patinated brass elements.`;
    colors = [
      { name: "Cast Concrete", hex: "#B8B8B8", usage: "Structural accent walls and micro-cement floors" },
      { name: "Charred Cedar", hex: "#2B2B2B", usage: "Feature panels and dramatic furniture frameworks" },
      { name: "Raw Brass", hex: "#C5A059", usage: "Bespoke hardware handles and light armatures" },
      { name: "Sandstone Beige", hex: "#D6CFC4", usage: "Linen cushions and textured area carpets" }
    ];
    furniture = [
      { item: "Monolithic Concrete Table", description: "Cast-in-place central block with chamfered edge profiling.", materialHint: "Honed Grey Concrete" },
      { item: "Charred Shou Sugi Ban Lounger", description: "Architectural chair crafted in heavily burnt and brushed cedar wood.", materialHint: "Charred Oak" },
      { item: "Patinated Brass Linear Pendant", description: "A heavy, minimalist light bar suspended by slim steel cables.", materialHint: "Brushed Aged Brass" }
    ];
    materials = ["Exposed Cast Concrete", "Shou Sugi Ban Wood", "Brushed Brass", "Raw Textured Linen"];
    architecturalAdvice = [
      "Contrast cold grey concrete surfaces with large warm textiles and light sand upholstery.",
      "Use spotlights with narrow beam angles to create dramatic pools of light and emphasize slab texture.",
      "Integrate sliding pocket doors in charred wood to partition spaces without losing clean corridors."
    ];
  } else if (cleanStyle.includes("Japandi")) {
    conceptName = `Travertine & Hinoki ${cleanRoom}`;
    editorialIntro = `A peaceful blend of Scandinavian warmth and Japanese Wabi-Sabi. Subtle wood textures, light stone blocks, and natural light exposures establish a timeless atmosphere.`;
    colors = [
      { name: "Hinoki Cream", hex: "#EBE3D5", usage: "Main walls and ceiling finishes" },
      { name: "Honed Travertine", hex: "#D4C5B9", usage: "Floors and monolithic bathroom/kitchen surfaces" },
      { name: "Natural Oak", hex: "#C7B198", usage: "Vertical slats, furniture frames, and shelves" },
      { name: "Sumi Black", hex: "#2C2C2C", usage: "Framing accents and linear light elements" }
    ];
    furniture = [
      { item: "Hinoki Slat Credenza", description: "A low console featuring vertical wood slats that softly diffuse interior views.", materialHint: "Natural Hinoki Cypress" },
      { item: "Travertine Block Coffee Table", description: "A raw-edge block coffee table showing natural travertine cavities.", materialHint: "Unfilled Travertine Stone" },
      { item: "Linen Paper Floor Lamp", description: "An oversized organic paper lantern providing diffuse ambient glow.", materialHint: "Washi Paper & Bamboo" }
    ];
    materials = ["Honed Travertine", "Hinoki Wood", "Washi Paper", "Raw Woven Jute"];
    architecturalAdvice = [
      "Use low-height furniture configurations to heighten the perception of ceiling clearance.",
      "Introduce vertical wood slat partitions to separate space while maintaining visual transparency.",
      "Incorporate a single hand-crafted ceramic vase with a single branch as the room's main highlight."
    ];
  } else if (cleanStyle.includes("Classic")) {
    conceptName = `Maison ${cleanRoom} Conservatory`;
    editorialIntro = `A highly sophisticated space balancing historical neoclassical symmetry with modern luxury. Rich marble overlays, classic mouldings, and velvet highlights define the layout.`;
    colors = [
      { name: "Ivory Silk", hex: "#F3EFE9", usage: "Wainscot walls and decorative plaster mouldings" },
      { name: "Calacatta Gold", hex: "#E3DED8", usage: "Fireplace surround and vanity stone details" },
      { name: "Aged Bronze", hex: "#3A342E", usage: "Sconce fixtures and iron window muntins" },
      { name: "Satin Walnut", hex: "#5C463C", usage: "Chevron parquet floors and dining furniture" }
    ];
    furniture = [
      { item: "Calacatta Monolithic Fireplace", description: "A neoclassical fireplace mantel styled with clean geometric mouldings.", materialHint: "Calacatta Gold Marble" },
      { item: "Walnut Chevron Parquet", description: "Premium wooden floors laid in a classic French herringbone pattern.", materialHint: "French Walnut Wood" },
      { item: "Plush Mohair Lounge Chair", description: "An inviting curved chair upholstered in premium silk-blend mohair.", materialHint: "Oatmeal Mohair Velvet" }
    ];
    materials = ["Calacatta Marble", "Mohair Velvet", "French Walnut", "Aged Bronze Hardware"];
    architecturalAdvice = [
      "Ensure symmetry by balancing artwork and light sconces on either side of the primary room axis.",
      "Apply classic picture frame wainscoting on walls, keeping the profile clean and under 1.5 inches deep.",
      "Install a central plaster ceiling medallion to host a high-end minimalist glass chandelier."
    ];
  } else if (cleanStyle.includes("Mid-Century")) {
    conceptName = `Warm Amber ${cleanRoom} Lounge`;
    editorialIntro = `A warm, welcoming layout inspired by mid-century modern design. Rich walnut cabinetry, colored accent chairs, and brass fixtures provide retro-luxury character.`;
    colors = [
      { name: "Warm Amber", hex: "#D69F7E", usage: "Accent cushions, rugs, and leather wraps" },
      { name: "Oiled Walnut", hex: "#4E3629", usage: "Mid-century credenza and desk millwork" },
      { name: "Parchment Plaster", hex: "#F5EFDF", usage: "Primary walls and warm plaster texture" },
      { name: "Forest Moss", hex: "#5C6B5E", usage: "Upholstery highlights and organic plants" }
    ];
    furniture = [
      { item: "Oiled Walnut Credenza", description: "A signature cabinet with sliding doors and tapered solid wood legs.", materialHint: "Oiled Walnut Wood" },
      { item: "Saddle Leather Lounge", description: "An iconic chair angled for relaxing, wrapped in warm cognac leather.", materialHint: "Full-Grain Saddle Leather" },
      { item: "Brushed Brass Spun Pendant", description: "A double-cone ceiling fixture throwing light both up and down.", materialHint: "Spun Brass Fixture" }
    ];
    materials = ["Oiled Walnut", "Saddle Leather", "Spun Brass", "Woven Wool Loop"];
    architecturalAdvice = [
      "Contrast straight wooden lines with curved, rounded furniture silhouettes (e.g. circular rugs or spherical lighting).",
      "Include a dedicated bar cabinet or cart in walnut and brass as a secondary social anchor.",
      "Use warm 2400K-2700K lighting in table lamps to highlight the rich amber wood grain."
    ];
  }

  // Customize based on room type
  if (cleanRoom.includes("Bedroom")) {
    furniture[0] = { item: "Floating Upholstered Bedstead", description: "A low-profile bed block with a wide headboard panel extending behind bedside tables.", materialHint: "Textured Linen Bouclé" };
  } else if (cleanRoom.includes("Kitchen")) {
    furniture[0] = { item: "Monolithic Stone Kitchen Island", description: "A mammoth block of honed stone acting as the kitchen's primary preparation and gathering hub.", materialHint: "Italian Travertine" };
  } else if (cleanRoom.includes("Bathroom")) {
    furniture[0] = { item: "Freestanding Travertine Soaking Tub", description: "A custom carved stone tub designed for deep relaxation.", materialHint: "Honed Travertine" };
  }

  return {
    conceptName,
    editorialIntro,
    colors,
    furniture,
    materials,
    architecturalAdvice
  };
}

// AI Design Consultation route
app.post("/api/gemini/design", async (req, res) => {
  const { roomType, stylePreference, roomSize, budgetRange, lighting, customRequest } = req.body;

  // Validate inputs
  const selectedRoom = roomType || "Living Room";
  const selectedStyle = stylePreference || "Minimalist";
  const selectedSize = roomSize || "Medium (300-500 sq ft)";
  const selectedBudget = budgetRange || "Premium";
  const selectedLighting = lighting || "Moderate Natural Light";
  const selectedCustom = customRequest || "Design an elegant and functional layout with organic accents.";

  const isKeyConfigured = genAIKey && genAIKey !== "MY_GEMINI_API_KEY" && genAIKey !== "";

  if (!isKeyConfigured) {
    console.log(`[Aurelian AI] Key is missing or default. Loading simulated design scheme for: ${selectedStyle} ${selectedRoom}`);
    const simulatedData = generateMockConcept(selectedRoom, selectedStyle, selectedSize, selectedLighting, selectedCustom);
    return res.json({
      ...simulatedData,
      isDemo: true,
      conceptName: `${simulatedData.conceptName} (Simulated)`
    });
  }

  try {
    const prompt = `Design custom recommendations for:
- Room Type: ${selectedRoom}
- Style Preference: ${selectedStyle}
- Room Size: ${selectedSize}
- Budget Category: ${selectedBudget}
- Lighting Assessment: ${selectedLighting}
- Specific requests/preferences: ${selectedCustom}

Generate a luxurious curate scheme following Aurelian's high standards.`;

    const client = getAIClient();
    const result = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the Lead Creative Director & Interior Architect at AURELIAN, a world-class luxury interior design studio. Your style is a sophisticated blend of Modern Minimalism, warmth, and organic luxury, prioritizing generous negative space, exquisite natural stone, premium linens, custom walnut millwork, high-end architectural fixtures, and curated textures. Provide premium, realistic, highly specific design suggestions. Avoid overly generic tips. Respond ONLY in the requested JSON structure.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["conceptName", "editorialIntro", "colors", "furniture", "materials", "architecturalAdvice"],
          properties: {
            conceptName: {
              type: Type.STRING,
              description: "A gorgeous, high-end editorial title for this layout concept (e.g., 'Travertine & Walnut Sanctuary', 'Warm Nocturne Lounge')."
            },
            editorialIntro: {
              type: Type.STRING,
              description: "A beautiful, evocative, 2-3 sentence overview describing the atmosphere, tone, and feel of the envisioned space."
            },
            colors: {
              type: Type.ARRAY,
              description: "A set of exactly 4 carefully matched luxury color codes with name, hex, and precise usage.",
              items: {
                type: Type.OBJECT,
                required: ["name", "hex", "usage"],
                properties: {
                  name: { type: Type.STRING, description: "Name of the paint/material tone (e.g. 'Travertine Warmth', 'Smoked Oak')." },
                  hex: { type: Type.STRING, description: "Color hex code (e.g. '#EAE0D5')." },
                  usage: { type: Type.STRING, description: "How to use this color in the space (e.g. 'Primary wall finish', 'Accent pillow textiles')." }
                }
              }
            },
            furniture: {
              type: Type.ARRAY,
              description: "A list of exactly 3 curated high-end key furniture or decor pieces.",
              items: {
                type: Type.OBJECT,
                required: ["item", "description", "materialHint"],
                properties: {
                  item: { type: Type.STRING, description: "Specific furniture piece name (e.g. 'Low-profile bouclé block sofa')." },
                  description: { type: Type.STRING, description: "Styling explanation and why this choice anchors the space." },
                  materialHint: { type: Type.STRING, description: "The tactile material/finish suggested (e.g. 'Oatmeal Bouclé', 'Honed Calacatta Marble')." }
                }
              }
            },
            materials: {
              type: Type.ARRAY,
              description: "A list of exactly 4 luxury materials that define the texture of the room.",
              items: { type: Type.STRING }
            },
            architecturalAdvice: {
              type: Type.ARRAY,
              description: "Exactly 3 highly actionable architectural tips regarding lighting, spatial layout, and focal points.",
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const data = JSON.parse(result.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Gemini API Error in /api/gemini/design, falling back to simulated scheme:", error);
    const simulatedData = generateMockConcept(selectedRoom, selectedStyle, selectedSize, selectedLighting, selectedCustom);
    res.json({
      ...simulatedData,
      isDemo: true,
      conceptName: `${simulatedData.conceptName} (Simulated)`
    });
  }
});

// Endpoint to fetch simulated data or confirm consultation requests
app.post("/api/consultation", (req, res) => {
  const { name, phone, requirement, notes } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "Name and Phone Number are required." });
  }
  // Custom response simulating a premium database save
  res.json({
    success: true,
    message: "Your consultation request has been successfully captured in Aurelian's registry.",
    requestDetails: {
      id: "AUR-" + Math.floor(1000 + Math.random() * 9000),
      clientName: name,
      phone,
      requirement,
      notes: notes || "No additional notes",
      submissionTime: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  });
});

// Configure Vite or Static Serve
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

start();
