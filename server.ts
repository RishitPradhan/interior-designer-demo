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

// AI Design Consultation route
app.post("/api/gemini/design", async (req, res) => {
  try {
    const { roomType, stylePreference, roomSize, budgetRange, lighting, customRequest } = req.body;

    // Validate inputs
    const selectedRoom = roomType || "Living Room";
    const selectedStyle = stylePreference || "Minimalist";
    const selectedSize = roomSize || "Medium (300-500 sq ft)";
    const selectedBudget = budgetRange || "Premium";
    const selectedLighting = lighting || "Moderate Natural Light";
    const selectedCustom = customRequest || "Design an elegant and functional layout with organic accents.";

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
    console.error("Gemini API Error in /api/gemini/design:", error);
    res.status(500).json({
      error: "Failed to generate design concept due to API constraints. Please ensure your GEMINI_API_KEY is configured."
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
