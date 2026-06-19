import React, { useState } from "react";
import { Sliders, Sparkles, AlertCircle } from "lucide-react";
import { DESIGN_STYLE_TIPS } from "../data";

interface EstimatorProps {
  onQuoteSubmit: (details: { sizeName: string; styleName: string; tierName: string; calculatedRef: string }) => void;
}

export default function Estimator({ onQuoteSubmit }: EstimatorProps) {
  // Option state
  const [size, setSize] = useState<string>("2bhk");
  const [styleVal, setStyleVal] = useState<string>("Minimalist");
  const [tier, setTier] = useState<string>("diamond"); // gold, diamond, signature

  const SIZES = [
    { id: "1bhk", label: "1 BHK", range: "600-900 sq ft", baseMin: 22000, baseMax: 32000 },
    { id: "2bhk", label: "2 BHK", range: "900-1400 sq ft", baseMin: 35000, baseMax: 50000 },
    { id: "3bhk", label: "3 BHK", range: "1400-2200 sq ft", baseMin: 45000, baseMax: 65000 },
    { id: "villa", label: "Villa / Penthouse", range: "3000+ sq ft", baseMin: 110000, baseMax: 160000 },
  ];

  const STYLES = [
    { id: "Minimalist", label: "Minimalist", desc: "Pure calm, natural tones, hidden storage", mult: 1.0 },
    { id: "Modern", label: "Modern Luxury", desc: "Monolith stone, walnut millwork, high contrast", mult: 1.15 },
    { id: "Classic", label: "Classic/Neo-Classic", desc: "Refined crowns, antique metals, velvet trims", mult: 1.25 },
  ];

  const TIERS = [
    { id: "gold", label: "Gold Standard", desc: "Engineered quartz, premium vinyls, premium laminates", mult: 1.0 },
    { id: "diamond", label: "Diamond Elite", desc: "Travertine, custom oiled walnut, cashmere weaves", mult: 1.35 },
    { id: "signature", label: "Aurelian Ultra", desc: "Honed Calacatta, hidden doors, smart automated tracks", mult: 1.7 },
  ];

  // Calculate budget
  const selectedSize = SIZES.find((s) => s.id === size) || SIZES[1];
  const selectedStyle = STYLES.find((st) => st.id === styleVal) || STYLES[0];
  const selectedTier = TIERS.find((t) => t.id === tier) || TIERS[1];

  const styleMultiplier = selectedStyle.mult;
  const tierMultiplier = selectedTier.mult;

  const finalMin = Math.round(selectedSize.baseMin * styleMultiplier * tierMultiplier);
  const finalMax = Math.round(selectedSize.baseMax * styleMultiplier * tierMultiplier);

  const formattedBudget = `$${finalMin.toLocaleString()} - $${finalMax.toLocaleString()}`;

  // Find design tip for current style
  const styleTip = DESIGN_STYLE_TIPS.find((tip) => tip.style === selectedStyle.id) || DESIGN_STYLE_TIPS[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="pricing-estimator">
      {/* Input controls block */}
      <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-2xl border border-stone-100 flex flex-col justify-between space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-wood-rich font-semibold uppercase tracking-wider text-xs">
            <Sliders className="w-4 h-4" />
            Customize Design Input Configuration
          </div>

          {/* Type / Size */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-widest font-bold text-stone-500">
              Step 1: Select Home Configuration
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`py-3.5 px-4 rounded border text-left transition-all duration-300 ${
                    size === s.id
                      ? "bg-wood-rich text-white border-wood-rich shadow"
                      : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                  }`}
                >
                  <div className="text-xs font-bold leading-none">{s.label}</div>
                  <div className={`text-[10px] mt-1 ${size === s.id ? "text-stone-300" : "text-stone-500"}`}>
                    {s.range}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Style Preference */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-widest font-bold text-stone-500">
              Step 2: Select Aesthetic Theme
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {STYLES.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setStyleVal(st.id)}
                  className={`p-4 rounded border text-left transition-all duration-300 ${
                    styleVal === st.id
                      ? "bg-wood-rich text-white border-wood-rich shadow"
                      : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                  }`}
                >
                  <div className="text-xs font-bold">{st.label}</div>
                  <div className={`text-[10px] mt-1 line-clamp-2 leading-snug ${styleVal === st.id ? "text-stone-300" : "text-stone-500"}`}>
                    {st.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Material Quality Level */}
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-widest font-bold text-stone-500 font-sans">
              Step 3: Specify Material Finish Level
            </label>
            <div className="space-y-2">
              {TIERS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTier(t.id)}
                  className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all duration-300 ${
                    tier === t.id
                      ? "bg-stone-900 text-white border-stone-900 shadow-lg"
                      : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-150"
                  }`}
                >
                  <input
                    type="radio"
                    checked={tier === t.id}
                    onChange={() => {}}
                    className={`mt-1 h-3.5 w-3.5 focus:ring-0 ${tier === t.id ? "text-accent-coral" : "text-stone-400"}`}
                  />
                  <div>
                    <div className="text-xs font-bold flex items-center gap-2">
                      {t.label}
                      {t.id === "signature" && (
                        <span className="bg-accent-coral text-white text-[8px] tracking-widest font-bold uppercase px-1.5 py-0.5 rounded leading-none">
                          Ultra Recommended
                        </span>
                      )}
                    </div>
                    <div className={`text-[11px] mt-1 ${tier === t.id ? "text-stone-300" : "text-stone-400"}`}>
                      {t.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic style tip warning box */}
        <div className="p-4 bg-beige-warm/30 rounded-lg border border-beige-warm/50 flex gap-3 text-xs leading-relaxed text-stone-700 font-sans">
          <AlertCircle className="w-5 h-5 text-wood-rich shrink-0" />
          <div>
            <span className="font-bold text-wood-rich uppercase tracking-wider block mb-1">
              {styleTip.style} Recommendation ({styleTip.tagline})
            </span>
            <ul className="list-disc list-inside space-y-1">
              {styleTip.pointers.map((p, index) => (
                <li key={index}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Visual calculator output board */}
      <div className="lg:col-span-5 bg-slate-deep text-beige-warm p-10 rounded-2xl flex flex-col justify-between space-y-8 shadow-xl text-center relative overflow-hidden">
        {/* Subtle abstract luxury geometric background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-wood-rich/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#FFF5EB]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] tracking-widest font-bold uppercase text-stone-300 border border-white/5">
            <Sparkles className="w-3.5 h-3.5 text-beige-warm animate-pulse" />
            Estimated Luxury Projection
          </span>
          <div className="font-serif text-3xl md:text-5xl text-beige-warm tracking-tight py-4" id="budget-value">
            {formattedBudget}
          </div>
        </div>

        <div className="space-y-4 relative z-10 text-stone-300 text-xs text-left max-w-sm mx-auto bg-stone-900/40 p-5 rounded-xl border border-white/5">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#FFF5EB] border-b border-white/10 pb-2 mb-2">
            Selected Package Details
          </div>
          <div className="flex justify-between">
            <span>Home Size:</span>
            <span className="font-bold text-white">{selectedSize.label} ({selectedSize.range})</span>
          </div>
          <div className="flex justify-between">
            <span>Theme:</span>
            <span className="font-bold text-white">{selectedStyle.label}</span>
          </div>
          <div className="flex justify-between">
            <span>Premium Materials:</span>
            <span className="font-bold text-white">{selectedTier.label}</span>
          </div>
          <p className="text-[10.5px] text-stone-400 mt-3 pt-3 border-t border-white/5 leading-relaxed italic">
            *This comprehensive estimation covers absolute turnkey end-to-end management, layout planning, full premium materials, bespoke furniture selection, and clean Move-In handover.
          </p>
        </div>

        <button
          onClick={() =>
            onQuoteSubmit({
              sizeName: selectedSize.label,
              styleName: selectedStyle.label,
              tierName: selectedTier.label,
              calculatedRef: formattedBudget,
            })
          }
          className="w-full bg-[#EAE0D5] text-stone-900 hover:bg-white hover:shadow-lg hover:scale-[1.02] active:scale-95 py-4 rounded-xl font-bold tracking-wider text-xs uppercase shadow transition-all duration-300 relative z-10"
        >
          Proceed to exact quote locked
        </button>
      </div>
    </div>
  );
}
