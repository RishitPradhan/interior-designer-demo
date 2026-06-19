"use client";

import { useState } from "react";

export interface JourneyStep {
  step: string;
  name: string;
  desc: string;
  image: string;
}

// Curated luxury interior images matching each lifecycle phase
const DEFAULT_STEPS: JourneyStep[] = [
  {
    step: "01",
    name: "Consultation",
    desc: "First meet-up, concept walkthroughs, and personal lifestyle deep dive.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&fit=crop"
  },
  {
    step: "02",
    name: "Planning",
    desc: "Precise dimensions, layout drafting, zoning configurations, and scope locks.",
    image: "https://images.unsplash.com/photo-1503387762-592dec58ef4e?q=80&w=800&fit=crop"
  },
  {
    step: "03",
    name: "Concept",
    desc: "Mood-boarding, raw structural textures, material pairing mockups.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&fit=crop"
  },
  {
    step: "04",
    name: "3D Visual",
    desc: "Bespoke high-fidelity architectural previews showcasing precise shadow studies.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&fit=crop"
  },
  {
    step: "05",
    name: "Sourcing",
    desc: "Joint supplier visits to procure Travertine blocks, rare woods, and linens.",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=800&fit=crop"
  },
  {
    step: "06",
    name: "Execution",
    desc: "Onsite white-glove engineering managed by our dedicated architect-in-charge.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&fit=crop"
  },
  {
    step: "07",
    name: "Handover",
    desc: "The grand reveal, meticulously styled dressing, and structural handover.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&fit=crop"
  }
];

interface ExpandCardsProps {
  steps?: JourneyStep[];
}

export default function ExpandCards({ steps = DEFAULT_STEPS }: ExpandCardsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  return (
    <div className="w-full">
      {/* Desktop: horizontal expanding cards */}
      <div className="hidden md:flex w-full items-stretch gap-2 h-[420px] xl:h-[480px]">
        {steps.map((step, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={step.step}
              className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-in-out group"
              style={{
                flex: isExpanded ? "4 0 0%" : "1 0 0%",
              }}
              onMouseEnter={() => setExpandedIndex(idx)}
            >
              {/* Background image */}
              <img
                src={step.image}
                alt={step.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out"
                style={{
                  transform: isExpanded ? "scale(1.05)" : "scale(1.12)",
                  filter: isExpanded ? "brightness(0.7)" : "brightness(0.45) grayscale(0.3)",
                }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: isExpanded
                    ? "linear-gradient(to top, rgba(15,10,5,0.92) 0%, rgba(15,10,5,0.3) 50%, transparent 100%)"
                    : "linear-gradient(to top, rgba(15,10,5,0.85) 0%, rgba(15,10,5,0.5) 100%)"
                }}
              />

              {/* Collapsed state: vertical step number + name */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-400"
                style={{ opacity: isExpanded ? 0 : 1, pointerEvents: isExpanded ? "none" : "auto" }}
              >
                <span className="font-serif text-xs font-bold text-beige-warm/50 tracking-[0.2em] mb-2">
                  {step.step}
                </span>
                <span
                  className="font-serif text-sm font-semibold text-beige-warm/90 tracking-wide"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                >
                  {step.name}
                </span>
              </div>

              {/* Expanded state: full content */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-500"
                style={{ opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateY(0)" : "translateY(12px)" }}
              >
                {/* Step number watermark */}
                <div className="absolute top-4 right-5 font-serif text-5xl font-black text-white/10 select-none pointer-events-none leading-none">
                  {step.step}
                </div>

                <div className="space-y-3 relative z-10">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-extrabold text-beige-warm/60 font-sans block">
                    Step {step.step}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                    {step.name}
                  </h3>
                  <p className="text-stone-300 text-xs md:text-sm font-sans leading-relaxed max-w-xs">
                    {step.desc}
                  </p>

                  {/* Animated bottom bar */}
                  <div className="w-8 h-0.5 bg-beige-warm/60 mt-2" />
                </div>
              </div>

              {/* Thin left accent line on expanded */}
              <div
                className="absolute top-6 bottom-6 left-0 w-0.5 bg-beige-warm/50 rounded-full transition-all duration-500"
                style={{ opacity: isExpanded ? 1 : 0 }}
              />
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical stacked list */}
      <div className="flex flex-col gap-3 md:hidden">
        {steps.map((step, idx) => (
          <div
            key={step.step}
            className="relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500"
            style={{ height: expandedIndex === idx ? "220px" : "60px" }}
            onClick={() => setExpandedIndex(expandedIndex === idx ? -1 : idx)}
          >
            {/* Background image */}
            <img
              src={step.image}
              alt={step.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: expandedIndex === idx ? "brightness(0.65)" : "brightness(0.4) grayscale(0.4)"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Always visible header */}
            <div className="absolute top-0 left-0 right-0 h-[60px] flex items-center px-5 gap-4">
              <span className="font-serif text-sm font-bold text-beige-warm/70 shrink-0">{step.step}</span>
              <h3 className="font-serif text-base font-semibold text-white">{step.name}</h3>
            </div>

            {/* Expanded content */}
            <div
              className="absolute bottom-4 left-5 right-5 transition-all duration-400"
              style={{ opacity: expandedIndex === idx ? 1 : 0 }}
            >
              <p className="text-stone-300 text-xs font-sans leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
