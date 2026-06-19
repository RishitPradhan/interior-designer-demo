import React, { useState, useEffect } from "react";
import { Sparkles, Copy, Trash2, Calendar, ClipboardCheck, Eye, RefreshCw, Layers, Compass, Loader2 } from "lucide-react";
import { SavedMoodboard, AIRecommendation } from "../types";

interface AIConsultantProps {
  onSelectedConceptForForm: (conceptDetails: string) => void;
}

export default function AIConsultant({ onSelectedConceptForForm }: AIConsultantProps) {
  // Input parameters
  const [roomType, setRoomType] = useState("Living Room");
  const [stylePreference, setStylePreference] = useState("Organic Japandi");
  const [roomSize, setRoomSize] = useState("Medium Layout (300-500 sq ft)");
  const [lighting, setLighting] = useState("Indirect Golden Hour");
  const [customRequest, setCustomRequest] = useState("");

  // Loading & state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState("");
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [savedConcepts, setSavedConcepts] = useState<SavedMoodboard[]>([]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Loading animations steps
  const LOADING_PHASES = [
    "Sculpting raw Travertine geometry...",
    "Balancing spatial negative volume...",
    "Curating authentic tactile material weave...",
    "Optimizing lighting shadows inside space design..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % LOADING_PHASES.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Load saved local concepts
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aurelian_saved_moodboards");
      if (saved) {
        setSavedConcepts(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingStep(0);
    setError("");
    setRecommendation(null);

    try {
      const res = await fetch("/api/gemini/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomType,
          stylePreference,
          roomSize,
          lighting,
          customRequest: customRequest || "Design an exquisite and functional layout with curated textures."
        })
      });

      const data = await res.json();
      if (res.ok && data.conceptName) {
        setRecommendation(data);
        
        // Auto save to history
        const newSaved: SavedMoodboard = {
          ...data,
          id: "MB-" + Math.floor(1000 + Math.random() * 9000),
          roomType,
          stylePreference,
          timestamp: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        const updated = [newSaved, ...savedConcepts].slice(0, 5); // store max 5
        setSavedConcepts(updated);
        localStorage.setItem("aurelian_saved_moodboards", JSON.stringify(updated));
      } else {
        setError(data.error || "Unable to acquire structured AI designs. Please attempt again.");
      }
    } catch (err) {
      setError("Communication latency with server. Make sure server is running and key is verified.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const deleteConcept = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = savedConcepts.filter(c => c.id !== id);
    setSavedConcepts(filtered);
    localStorage.setItem("aurelian_saved_moodboards", JSON.stringify(filtered));
  };

  const handleApplyConceptToBooking = (rec: AIRecommendation) => {
    const details = `Concept: ${rec.conceptName} | Style: ${stylePreference} | Room: ${roomType} | Highlights: ${rec.materials.join(", ")}`;
    onSelectedConceptForForm(details);
    const scrollEl = document.getElementById("consultation-checkout");
    if (scrollEl) {
      scrollEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const loadPastConcept = (past: SavedMoodboard) => {
    setRecommendation(past);
    setRoomType(past.roomType);
    setStylePreference(past.stylePreference);
  };

  return (
    <div className="space-y-12" id="ai-sandbox-section">
      {/* Parameter input panel */}
      <div className="bg-white p-8 rounded-2xl border border-stone-150 shadow-sm">
        <form onSubmit={handleGenerate} className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-wood-rich flex items-center gap-2">
                <Compass className="w-6 h-6 text-accent-coral animate-spin-slow" />
                Aurelian Creative Co-Designer
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-sans">
                Leverage generative intelligence fine-tuned on luxury architectural standards to curate your space.
              </p>
            </div>

            {/* Historic drop list */}
            {savedConcepts.length > 0 && (
              <div className="relative">
                <select
                  onChange={(e) => {
                    const found = savedConcepts.find(c => c.id === e.target.value);
                    if (found) loadPastConcept(found);
                  }}
                  className="bg-stone-50 border border-stone-200 text-[11px] font-bold uppercase rounded px-3 py-2 text-stone-700 outline-none cursor-pointer"
                  style={{ colorScheme: "light" }}
                >
                  <option value="">Recalled Saved Concepts ({savedConcepts.length})</option>
                  {savedConcepts.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.conceptName} ({item.timestamp})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Room choice */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 font-sans">
                Room Destination
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-wood-rich text-xs rounded-lg px-4 py-3.5 text-stone-800 outline-none cursor-pointer"
                style={{ colorScheme: "light" }}
              >
                <option>Living Room</option>
                <option>Primary Bedroom</option>
                <option>Gourmet Kitchen</option>
                <option>Executive Study</option>
                <option>Open Loft Living</option>
                <option>Bespoke Bathroom</option>
              </select>
            </div>

            {/* Style profile */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 font-sans">
                Aesthetic Blueprint
              </label>
              <select
                value={stylePreference}
                onChange={(e) => setStylePreference(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-wood-rich text-xs rounded-lg px-4 py-3.5 text-stone-800 outline-none cursor-pointer"
                style={{ colorScheme: "light" }}
              >
                <option>Minimalist Sanctuary</option>
                <option>Raw Brutalism</option>
                <option>Neo-Classic Luxury</option>
                <option>Organic Japandi</option>
                <option>Mid-Century Warmth</option>
              </select>
            </div>

            {/* Footprint */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 font-sans">
                Layout Footprint
              </label>
              <select
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-wood-rich text-xs rounded-lg px-4 py-3.5 text-stone-800 outline-none cursor-pointer"
                style={{ colorScheme: "light" }}
              >
                <option>Compact Cozy (under 300 sq ft)</option>
                <option>Medium Layout (300-500 sq ft)</option>
                <option>Expansive Penthouse (500-1000 sq ft)</option>
                <option>Monolithic Villa (1000+ sq ft)</option>
              </select>
            </div>

            {/* Illumination */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 font-sans">
                Illumination Exposure
              </label>
              <select
                value={lighting}
                onChange={(e) => setLighting(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-wood-rich text-xs rounded-lg px-4 py-3.5 text-stone-800 outline-none cursor-pointer"
                style={{ colorScheme: "light" }}
              >
                <option>Indirect Golden Hour</option>
                <option>Moderate Daylight</option>
                <option>Floor-to-Ceiling Solarium</option>
                <option>Mood Dim / Accent LED Focused</option>
              </select>
            </div>
          </div>

          {/* Custom Description note line */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 font-sans">
              Dynamic Styling Instruction (e.g., custom furniture, specific stone request...)
            </label>
            <input
              type="text"
              value={customRequest}
              onChange={(e) => setCustomRequest(e.target.value)}
              placeholder="e.g. Include a monolithic beige travertine double-sided central fireplace, custom floating walnut bookshelves."
              className="w-full bg-stone-50 border border-stone-200 focus:border-wood-rich focus:bg-white text-xs rounded-lg px-4 py-4 text-stone-800 outline-none transition-all outline-0"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-wood-rich text-white hover:bg-[#3d271f] disabled:opacity-50 font-bold px-8 py-4 rounded-lg text-xs uppercase tracking-widest shadow transition duration-300 flex items-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-beige-warm" />
                  Orchestrating design canvas...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-beige-warm animate-pulse" />
                  Generate custom mood board
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 text-red-900 border border-red-200 rounded-xl p-5 text-sm flex gap-3 items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
          <p className="font-medium font-sans">
            {error} (Your API key may not be registered. Check your secrets settings).
          </p>
        </div>
      )}

      {/* Loading Canvas Placeholder */}
      {isLoading && (
        <div className="bg-[#FAF8F5] py-24 rounded-2xl flex flex-col items-center justify-center text-center border border-dashed border-stone-300 space-y-6">
          <Loader2 className="w-12 h-12 text-wood-rich animate-spin" />
          <div className="space-y-2">
            <h4 className="font-serif text-lg font-bold text-stone-800 tracking-tight transition-all duration-500">
              {LOADING_PHASES[loadingStep]}
            </h4>
            <p className="text-xs text-stone-400 font-sans uppercase tracking-widest">
              Aurelian Atelier AI Draft Module
            </p>
          </div>
        </div>
      )}

      {/* Curated output mood board */}
      {recommendation && !isLoading && (
        <div className="space-y-8 animate-fade-in">
          {/* Main heading */}
          <div className="bg-slate-deep text-beige-warm p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start gap-8 shadow-xl">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-block bg-white/10 text-stone-300 border border-white/10 px-3 py-1 rounded-full text-[9px] tracking-widest font-bold uppercase">
                Aurelian Creative Output
              </span>
              <h4 className="font-serif text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                {recommendation.conceptName}
              </h4>
              <p className="text-xs md:text-sm font-sans font-light leading-relaxed text-stone-300 italic">
                "{recommendation.editorialIntro}"
              </p>
            </div>

            <button
              onClick={() => handleApplyConceptToBooking(recommendation)}
              className="bg-[#EAE0D5] text-stone-900 font-sans hover:bg-white px-6 py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow transition shrink-0 cursor-pointer"
            >
              Apply Concept to Appointment
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Swatches & Elements */}
            <div className="lg:col-span-8 space-y-8">
              {/* Color Scheme */}
              <div className="bg-white p-6 rounded-2xl border border-stone-150">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#5D4037] block mb-4">
                  Curated Paint & Material Palette (Click hex card to copy)
                </span>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {recommendation.colors.map((color, i) => (
                    <div
                      key={i}
                      onClick={() => copyToClipboard(color.hex)}
                      className="cursor-pointer group flex flex-col justify-between border border-stone-150 rounded-xl overflow-hidden hover:shadow transition-all bg-stone-50"
                    >
                      {/* Swatch color area */}
                      <div
                        className="h-20 w-full transition-transform duration-500 group-hover:scale-105 relative flex items-center justify-center text-white"
                        style={{ backgroundColor: color.hex }}
                      >
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition justify-center items-center flex">
                          <Copy className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-3.5 space-y-1 text-left select-text">
                        <span className="text-[11px] font-bold font-sans text-stone-800 line-clamp-1">
                          {color.name}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">{color.hex}</span>
                          {copiedHex === color.hex && (
                            <span className="text-[8px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded leading-none uppercase tracking-wide animate-pulse">
                              COPIED
                            </span>
                          )}
                        </div>
                        <p className="text-[9.5px] text-stone-500 font-light leading-snug pt-1">
                          {color.usage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Showcase items */}
              <div className="bg-white p-6 rounded-2xl border border-stone-150 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#5D4037] block">
                  Signature Furniture & Decor Selections
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendation.furniture.map((furn, i) => (
                    <div key={i} className="bg-stone-50 p-5 rounded-xl border border-stone-150 space-y-2 text-left relative overflow-hidden">
                      <span className="absolute right-3 top-3 font-serif text-3xl font-black text-stone-200">
                        0{i + 1}
                      </span>
                      <h5 className="font-serif text-sm font-bold text-wood-rich leading-snug">
                        {furn.item}
                      </h5>
                      <span className="inline-block bg-beige-warm/60 font-sans text-[8.5px] text-wood-rich font-bold px-2 py-0.5 rounded">
                        Finish: {furn.materialHint}
                      </span>
                      <p className="text-[10.5px] leading-relaxed text-stone-600 font-sans pt-1">
                        {furn.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Accent column details */}
            <div className="lg:col-span-4 space-y-8">
              {/* Material board */}
              <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl space-y-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#FFF5EB] block border-b border-white/10 pb-2">
                  Tactile Materials Profile
                </span>

                <div className="space-y-3">
                  {recommendation.materials.map((mat, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center font-bold text-[9px] text-[#FFF5EB] font-serif shrink-0 border border-white/10">
                        {i + 1}
                      </div>
                      <span className="font-sans font-medium text-stone-200">{mat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advice */}
              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200 space-y-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-wood-rich block border-b border-stone-200 pb-2">
                  Architectural Implementation Guidelines
                </span>

                <div className="space-y-4 text-left">
                  {recommendation.architecturalAdvice.map((adv, i) => (
                    <div key={i} className="text-xs space-y-1">
                      <span className="font-serif font-black text-stone-400 block tracking-wider">GUIDE 0{i + 1}</span>
                      <p className="text-stone-700 leading-relaxed font-sans">{adv}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
