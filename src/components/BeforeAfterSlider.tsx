import React, { useState } from "react";
import { BeforeAfterProject } from "../types";
import { Split, ArrowRightLeft, Quote } from "lucide-react";

interface BeforeAfterSliderProps {
  project: BeforeAfterProject;
}

export default function BeforeAfterSlider({ project }: BeforeAfterSliderProps) {
  // Slider position (percentage from 0 to 100)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, container);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    if (e.buttons === 1 || isDragging) {
      handleMove(e.clientX, container);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
      {/* 1. Drag comparison slider section */}
      <div className="lg:col-span-7 space-y-4">
        {/* Helper info banner */}
        <div className="flex justify-between items-center text-xs uppercase tracking-wider font-semibold text-stone-400">
          <span className="flex items-center gap-1">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Drag or slide to compare
          </span>
          <div className="flex gap-2">
            <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded">Before {Math.round(100 - sliderPos)}%</span>
            <span className="bg-wood-rich text-white px-2 py-0.5 rounded">After {Math.round(sliderPos)}%</span>
          </div>
        </div>

        {/* Standard split slider container */}
        <div
          className="relative h-[340px] md:h-[430px] rounded-xl overflow-hidden select-none cursor-ew-resize border border-stone-200 shadow-md group"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* Base image (The AFTER) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={project.image}
              alt="After luxury interior"
              className="w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* After Tag */}
            <div className="absolute right-4 bottom-4 bg-wood-rich/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded backdrop-blur z-20">
              Aurelian Elegant Handover
            </div>
          </div>

          {/* Overlay image (The BEFORE - filtered to resemble a dated dark look) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${100 - sliderPos}%` }}
          >
            {/* We use the same image but styled as dated to mimic before/after, or offset it visually. 
                Using CSS grayscale + sepia + low brightness creates a perfect 'before' representation of a old room! */}
            <img
              src={project.image}
              alt="Before dated layout"
              className="absolute inset-0 w-full h-full object-cover grayscale saturate-50 sepia-20 brightness-65 contrast-110 blur-[1px]"
              style={{
                width: "100%",
                maxWidth: "none",
              }}
              referrerPolicy="no-referrer"
            />
            {/* Before Tag */}
            <div className="absolute left-4 bottom-4 bg-stone-900/95 text-stone-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded backdrop-blur z-20">
              Original Dated Configuration
            </div>
          </div>

          {/* Drag slider handle bar */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white/90 cursor-ew-resize pointer-events-none z-30"
            style={{ right: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-wood-rich text-white border-2 border-white shadow-xl flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
              <Split className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Text layout section */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-2">
          <div className="inline-block bg-wood-rich/10 text-wood-rich px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
            {project.category} • Budget {project.budget}
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-wood-rich font-semibold tracking-tight">
            {project.title}
          </h3>
        </div>

        {/* Client Quote */}
        <div className="p-5 bg-beige-warm/30 rounded-xl border border-beige-warm/60 relative">
          <Quote className="absolute -top-3 right-4 w-10 h-10 text-wood-rich/15" />
          <p className="text-sm font-sans italic text-stone-750 leading-relaxed">
            "{project.quote}"
          </p>

          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-beige-warm/80">
            <div className="w-8 h-8 rounded-full bg-wood-rich/20 flex items-center justify-center font-bold text-xs text-wood-rich font-mono">
              {project.clientName.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">{project.clientName}</div>
              <div className="text-[10px] text-stone-500">{project.clientRole}</div>
            </div>
          </div>
        </div>

        {/* Change Notes */}
        <div className="grid grid-cols-2 gap-4 text-xs font-sans">
          <div className="space-y-1 border-stone-200 border-r pr-3">
            <span className="font-bold text-stone-500 uppercase tracking-widest text-[10px]">What was changed:</span>
            <p className="text-stone-600 leading-normal">{project.beforeNotes}</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-wood-rich uppercase tracking-widest text-[10px]">Aurelian Upgrade:</span>
            <p className="text-stone-700 font-medium leading-normal">{project.afterNotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
