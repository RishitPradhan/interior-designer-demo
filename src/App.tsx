import React, { useState, useEffect } from "react";
import {
  Compass,
  Award,
  Clock,
  ShieldCheck,
  Receipt,
  UserCheck,
  LayoutGrid,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Info,
  Layers,
  Check,
  Heart,
  ExternalLink,
  HelpCircle,
  FolderLock,
  MessageSquare,
  Calendar,
  Palette,
  Eye,
  Truck,
  HardHat,
  Key
} from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Estimator from "./components/Estimator";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import ConsultationForm from "./components/ConsultationForm";
import AIConsultant from "./components/AIConsultant";
import { ScrollVelocity } from "@/components/ui/scroll-velocity";
import TeamShowcase from "@/components/ui/team-showcase";
import ExpandCards from "@/components/ui/expand-cards";

import { SERVICES, GALLERY_ITEMS, PROJECTS, JOURNEY_STEPS } from "./data";

export default function App() {
  const [activeGalleryCat, setActiveGalleryCat] = useState<string>("All");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [selectedAiConcept, setSelectedAiConcept] = useState<string>("");
  const [showAiConsole, setShowAiConsole] = useState<boolean>(true);
  const [likedGalleryItems, setLikedGalleryItems] = useState<string[]>([]);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronized form variables
  const [formRequirement, setFormRequirement] = useState<string>("Full Home Interior");
  const [formNotes, setFormNotes] = useState<string>("");

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Show premium toast helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3000);
  };

  // Filter gallery items
  const filteredGallery = activeGalleryCat === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeGalleryCat);

  // Toggle favorite gallery items
  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = likedGalleryItems.includes(id);
    setLikedGalleryItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    const item = GALLERY_ITEMS.find((i) => i.id === id);
    if (item) {
      showToast(isLiked ? `Removed "${item.title}" from favorites` : `Added "${item.title}" to favorites`);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Pre-fill form from selected AI Moodboard
  const handleSelectAiConcept = (details: string) => {
    setSelectedAiConcept(details);
    setFormRequirement("Luxury Consultation");
    setFormNotes(details);
    showToast("AI Design Concept applied to Consultation Form!");
  };

  // Select Bespoke Service card click
  const handleSelectService = (serviceName: string) => {
    setFormRequirement(serviceName);
    setFormNotes(`Inquired about Bespoke "${serviceName}" architectural details.`);
    scrollToSection("consultation-checkout");
    showToast(`Service "${serviceName}" selected!`);
  };

  return (
    <div className="bg-surface text-on-surface font-sans min-h-screen selection:bg-wood-rich selection:text-white transition-all overflow-x-hidden">
      
      {/* 1. Header Navigation */}
      <Navbar
        onConsultationClick={() => scrollToSection("consultation-checkout")}
        onOpenAISandbox={() => {
          setShowAiConsole(true);
          scrollToSection("ai-co-designer");
        }}
      />

      {/* 2. Panoramic Hero Screen */}
      <Hero
        onConsultationClick={() => scrollToSection("consultation-checkout")}
        onExploreProjects={() => scrollToSection("portfolio-services")}
        onOpenAISandbox={() => {
          setShowAiConsole(true);
          scrollToSection("ai-co-designer");
        }}
      />

      {/* Integrated Press & Scroll Velocity Marquee Section */}
      <section className="bg-white py-16 overflow-hidden border-b border-stone-200/60">
        <div className="w-full flex flex-col space-y-8">
          
          {/* Row 1: Scrolling related interior design images */}
          <ScrollVelocity velocity={-2} className="py-2">
            {[...SERVICES, ...SERVICES, ...SERVICES].map((serv, index) => (
              <div
                key={index}
                className="relative h-32 w-52 md:h-40 md:w-64 xl:h-48 xl:w-80 overflow-hidden rounded-xl border border-stone-200/50 shadow-sm shrink-0"
              >
                <img
                  src={serv.image}
                  alt={serv.name}
                  className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-300" />
              </div>
            ))}
          </ScrollVelocity>

          {/* Label separator */}
          <div className="text-center">
            <span className="text-[9px] uppercase tracking-[0.3em] font-extrabold text-stone-450 font-sans">
              Featured In & Recognized By
            </span>
          </div>

          {/* Row 2: Press logos scrolling in opposite direction */}
          <ScrollVelocity 
            velocity={1.8} 
            className="py-5 border-y border-stone-150/70 bg-[#FAF9F6] flex items-center"
          >
            {Array.from({ length: 8 }).flatMap((_, loopIdx) => 
              [
                { name: "Architectural Digest", style: "italic font-serif text-lg md:text-xl font-bold tracking-tight text-wood-rich/70" },
                { name: "Vogue Living", style: "font-serif text-lg md:text-xl tracking-widest text-wood-rich/80 uppercase" },
                { name: "Elle Decor", style: "font-sans text-lg md:text-xl font-semibold tracking-wide text-wood-rich/65 uppercase" },
                { name: "Wallpaper*", style: "font-serif text-lg md:text-xl font-black text-wood-rich/75" }
              ].map((logo, idx) => (
                <span 
                  key={`${loopIdx}-${idx}`} 
                  className={`${logo.style} mx-12 transition hover:text-accent-coral duration-300 cursor-default select-none inline-block`}
                >
                  {logo.name}
                </span>
              ))
            )}
          </ScrollVelocity>
        </div>
      </section>

      {/* 3. Portfolio Services Grid */}
      <section id="portfolio-services" className="py-20 md:py-28 px-6 md:px-20 max-w-7xl mx-auto scroll-mt-20 reveal-on-scroll">
        <div className="mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-10 h-0.5 bg-wood-rich inline-block" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-stone-550">
              CRAFTED FOR Timeless Living
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-wood-rich font-bold tracking-tight">
            Bespoke Architectural Services
          </h2>
          <p className="max-w-xl text-stone-500 text-xs md:text-sm font-sans leading-relaxed">
            From monumental primary estates to state-of-the-art modular culinary islands, our tailored blueprint approach defines absolute luxury space utilization.
          </p>
        </div>

        {/* 4:5 Grid list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((serv, idx) => (
            <div
              key={serv.id}
              onClick={() => handleSelectService(serv.name)}
              className={`group relative aspect-[4/5] overflow-hidden rounded-xl bg-white shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-500 cursor-pointer reveal-on-scroll stagger-${idx + 1}`}
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                src={serv.image}
                alt={serv.name}
                referrerPolicy="no-referrer"
              />
              {/* Subtle glass dark bottom overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 w-full p-6 text-left space-y-3">
                <span className="inline-flex items-center justify-center p-2 rounded bg-white/10 backdrop-blur border border-white/10 text-white group-hover:bg-accent-coral transition-colors duration-300">
                  <Compass className="w-4 h-4" />
                </span>
                <h3 className="font-serif text-lg md:text-xl font-medium text-white tracking-wide">
                  {serv.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. The Aurelian Standard (Commitment list) */}
      <section className="py-20 md:py-28 bg-stone-900 text-beige-warm reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-[9px] uppercase tracking-[0.3em] font-extrabold text-stone-500">
              UNCOMPROMISING SOPHISTICATION
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-medium tracking-tight">
              The Aurelian Standard
            </h2>
            <p className="text-stone-400 text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
              Absolute transparency, world-renowned suppliers, premium materials, and flawless executive timeliness for every commission.
            </p>
          </div>

          <TeamShowcase />
        </div>
      </section>

      {/* Creative Leadership / Meet the Founders */}
      <section id="creative-leadership" className="py-20 md:py-28 bg-[#0E0C09] scroll-mt-20 reveal-on-scroll overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-10 h-0.5 bg-accent-coral inline-block" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-extrabold text-stone-500">
                  THE MINDS BEHIND THE ATELIER
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-beige-warm font-bold tracking-tight">
                Creative Leadership
              </h2>
            </div>
            <p className="max-w-xs text-stone-400 text-xs md:text-sm font-sans leading-relaxed md:text-right">
              Three architectural visionaries united by one obsession — spaces that transcend the ordinary.
            </p>
          </div>

          {/* Main editorial grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-auto lg:h-[580px]">

            {/* ── Lead card: Audrey — full left column ── */}
            <div className="lg:col-span-3 group relative overflow-hidden rounded-2xl min-h-[480px] lg:min-h-0">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&fit=crop"
                alt="Audrey Van der Weyden"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Layered gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

              {/* Top badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-accent-coral text-white text-[8px] font-extrabold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                  Principal Architect
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                {/* Pull quote */}
                <p className="font-serif text-base md:text-lg text-white/80 italic leading-relaxed mb-6 max-w-sm border-l-2 border-beige-warm/40 pl-4">
                  "Space is not merely architecture — it is memory, identity, and emotion made permanent."
                </p>

                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1">
                      Audrey Van der Weyden
                    </h3>
                    <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-beige-warm/60 font-sans">
                      Founder & Principal Architect · Milan & Antwerp
                    </span>
                  </div>

                  {/* Signature stat */}
                  <div className="text-right hidden sm:block">
                    <div className="font-serif text-4xl font-black text-white/20 leading-none">20+</div>
                    <div className="text-[8px] uppercase tracking-widest text-stone-500 font-sans mt-1">Yrs. Experience</div>
                  </div>
                </div>

                {/* Expertise pills */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {["Travertine Integration", "Spatial Flow", "Wabi-Sabi Stone"].map(tag => (
                    <span key={tag} className="bg-white/8 backdrop-blur border border-white/10 text-stone-300 text-[8px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right column: Marcel + Elena stacked ── */}
            <div className="lg:col-span-2 flex flex-col gap-4 lg:h-full">

              {/* Marcel */}
              <div className="group relative overflow-hidden rounded-2xl flex-1 min-h-[240px] lg:min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&fit=crop"
                  alt="Marcel Le Gall"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="bg-beige-warm/15 backdrop-blur border border-beige-warm/20 text-beige-warm text-[8px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full">
                    Co-Founder
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white">Marcel Le Gall</h4>
                      <span className="text-[8px] uppercase tracking-wider text-stone-400 font-sans">Creative Director</span>
                      <p className="text-stone-300 text-xs mt-1.5 leading-relaxed max-w-[200px] hidden sm:block">
                        Raw brutalist geometry fused with the warmth of oiled walnut.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-3xl font-black text-white/15 leading-none">85+</div>
                      <div className="text-[7px] uppercase tracking-widest text-stone-500 font-sans">Projects</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elena */}
              <div className="group relative overflow-hidden rounded-2xl flex-1 min-h-[240px] lg:min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&fit=crop"
                  alt="Elena Rostova"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="bg-beige-warm/15 backdrop-blur border border-beige-warm/20 text-beige-warm text-[8px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full">
                    Partner
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white">Elena Rostova</h4>
                      <span className="text-[8px] uppercase tracking-wider text-stone-400 font-sans">Material Specialist</span>
                      <p className="text-stone-300 text-xs mt-1.5 leading-relaxed max-w-[200px] hidden sm:block">
                        Calacatta marbles, pure linens, aged metals — sourced worldwide.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-3xl font-black text-white/15 leading-none">40+</div>
                      <div className="text-[7px] uppercase tracking-widest text-stone-500 font-sans">Suppliers</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/6">
            {[
              { value: "320+", label: "Commissions Completed" },
              { value: "14", label: "Countries Served" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "3×", label: "AD100 Recognition" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0E0C09] px-6 py-5 text-center hover:bg-white/3 transition-colors duration-300">
                <div className="font-serif text-3xl md:text-4xl font-bold text-beige-warm/90 leading-none">{stat.value}</div>
                <div className="text-[8px] uppercase tracking-[0.2em] text-stone-500 font-sans mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Artificial Intelligence design sandbox module */}
      <section id="ai-co-designer" className="py-20 md:py-28 bg-stone-50 border-y border-stone-100 scroll-mt-20 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-10 h-0.5 bg-accent-coral inline-block" />
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent-coral flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Live Experimental Sandbox
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-wood-rich font-bold tracking-tight">
                AI Interior Solarium Lounge
              </h2>
              <p className="max-w-xl text-stone-500 text-xs md:text-sm leading-relaxed">
                Describe your dream room space details or highlight material likes below. Our integrated Gemini AI architect will formulate color codes, furniture recommendations, and structural floor guidelines instantly.
              </p>
            </div>

            <button
              onClick={() => setShowAiConsole(!showAiConsole)}
              className="text-xs uppercase tracking-widest font-bold text-wood-rich border-b border-wood-rich pb-1 hover:opacity-75 transition-all"
            >
              {showAiConsole ? "Collapse Design Sandbox" : "Expand Design Sandbox"}
            </button>
          </div>

          {showAiConsole && (
            <AIConsultant onSelectedConceptForForm={handleSelectAiConcept} />
          )}

        </div>
      </section>

      {/* 6. Dynamic Filterable Inspiration Gallery */}
      <section id="inspiration-gallery" className="py-20 md:py-28 px-6 md:px-20 max-w-7xl mx-auto scroll-mt-20 reveal-on-scroll">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-10 h-0.5 bg-wood-rich inline-block" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-550">
                CURATED INSPIRATIONS
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-wood-rich font-bold tracking-tight">
              Inspiration Gallery
            </h2>
            <p className="max-w-sm text-stone-500 text-xs md:text-sm">
              Discover pristine modern sanctuaries constructed around refined spatial harmony and elegant aesthetics.
            </p>
          </div>

          {/* Filtering options */}
          <div className="flex flex-wrap gap-2 pt-2 border-b border-stone-200 pb-2 relative">
            {["All", "Living Room", "Bedroom", "Kitchen", "Office"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveGalleryCat(cat)}
                className={`text-[10px] uppercase tracking-widest font-bold px-4 py-2.5 transition-all duration-300 relative cursor-pointer ${
                  activeGalleryCat === cat
                    ? "text-wood-rich font-bold"
                    : "text-stone-400 hover:text-stone-750"
                }`}
              >
                {cat}
                {/* Custom sliding line indicator */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-wood-rich transition-transform duration-300 origin-left ${
                    activeGalleryCat === cat ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Gallery grid Masonry/Bento styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGallery.map((item, idx) => {
            const isLiked = likedGalleryItems.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className={`group relative overflow-hidden rounded-xl shadow-sm border border-stone-150 bg-white flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer reveal-on-scroll stagger-${(idx % 3) + 1}`}
              >
                {/* Image panel */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                  />
                  {/* Category box */}
                  <div className="absolute top-4 left-4 bg-white/95 text-stone-900 border border-stone-150 px-3 py-1 text-[9px] uppercase tracking-widest font-extrabold rounded shadow-sm backdrop-blur transition-all duration-300 group-hover:bg-wood-rich group-hover:text-white group-hover:border-wood-rich">
                    {item.category}
                  </div>

                  {/* Favorite indicator pin */}
                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/95 text-stone-500 hover:text-red-500 shadow hover:scale-110 active:scale-95 transition backdrop-blur z-20 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isLiked ? "fill-accent-coral text-accent-coral" : ""}`} />
                  </button>
                </div>

                {/* Caption panel */}
                <div className="p-6 text-left space-y-1.5 border-t border-stone-100 bg-[#FAF9F6] transition-colors duration-300 group-hover:bg-white">
                  <div className="flex justify-between items-center">
                    <h4 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-wood-rich transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-stone-400">No {item.id.replace('gal-', '0')}</span>
                  </div>
                  <p className="text-stone-500 text-xs leading-relaxed font-sans font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Interactive pricing/budget calculator */}
      <section id="pricing-estimator" className="py-24 md:py-32 bg-stone-900 text-beige-warm scroll-mt-20 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2">
                <span className="w-10 h-0.5 bg-white/20 inline-block" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
                  ESTIMATE COSTE-CONSCIOUS LUXURY
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-medium tracking-tight">
                Estimate Your Premium Interior Project
              </h2>
            </div>
            <p className="text-stone-300 text-xs md:text-sm font-sans font-light leading-relaxed max-w-md text-left">
              Calculate projected budget valuations depending on scope, room footprint configurations, and raw structural material levels.
            </p>
          </div>

          <Estimator
            onQuoteSubmit={({ sizeName, styleName, tierName, calculatedRef }) => {
              setFormRequirement(`${styleName} Design - ${sizeName}`);
              setFormNotes(`Projected budget estimate: ${calculatedRef}. Material Finish: ${tierName}. Formulated dynamic request.`);
              setSelectedAiConcept(
                `Locked Estimate Details: [Size: ${sizeName}] [Style: ${styleName}] [Tier: ${tierName}] [Ref Projected Budget: ${calculatedRef}]`
              );
              scrollToSection("consultation-checkout");
              showToast("Budget calculation locked and applied!");
            }}
          />

        </div>
      </section>

      {/* 8. Elegant Journey Timeline */}
      <section className="py-20 md:py-28 bg-[#0E0C09] relative overflow-hidden reveal-on-scroll">
        {/* Subtle ambient glow */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-beige-warm/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-coral/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          {/* Visual heading */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[9px] uppercase tracking-[0.3em] font-extrabold text-stone-500 font-sans">
              OUR COMPREHENSIVE ROADMAP
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-beige-warm font-bold tracking-tight">
              The Aurelian Journey
            </h2>
            <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
              Seven key architectural progressions of our white-glove design lifecycle, from raw blueprint to pristine keys handover.
            </p>
          </div>

          {/* Expand-on-hover cards */}
          <ExpandCards />
        </div>
      </section>

      {/* 9. Before / After Featured Project renovations Showcase */}
      <section id="featured-projects" className="py-24 bg-stone-50 border-t border-stone-200 scroll-mt-20 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2">
                <span className="w-10 h-0.5 bg-wood-rich inline-block" />
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#5D4037]">
                  RENOVATIONS REVEALED
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-wood-rich font-bold tracking-tight">
                Featured Renovation Projects
              </h2>
            </div>

            {/* Switch tabs */}
            <div className="flex gap-2 bg-stone-200/60 p-1.5 rounded-lg border border-stone-150">
              {PROJECTS.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectIndex(idx)}
                  className={`text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-md transition-all cursor-pointer ${
                    activeProjectIndex === idx
                      ? "bg-stone-900 text-white shadow-sm"
                      : "text-stone-550 hover:text-stone-900"
                  }`}
                >
                  Project {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <BeforeAfterSlider project={PROJECTS[activeProjectIndex]} />

        </div>
      </section>

      {/* 10. Consultation Booking action box */}
      <section id="consultation-checkout" className="py-24 bg-wood-rich text-white scroll-mt-20 relative reveal-on-scroll">
        {/* Ambient details overlays */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
          <div className="space-y-4">
            <span className="inline-block bg-white/10 text-stone-300 border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] tracking-widest font-bold uppercase">
              Schedule An Onsite Briefing
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">
              Begin Your Aurelian Journey
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light leading-relaxed max-w-xl mx-auto">
              Our spatial architects are available for a personal site inspection. Reserve your free lock slots today.
            </p>
          </div>

          <ConsultationForm
            initialRequirement={formRequirement}
            initialNotes={formNotes}
            onSuccess={() => showToast("Briefing scheduled successfully!")}
          />

          {selectedAiConcept && (
            <div className="p-4 bg-white/10 backdrop-blur rounded-xl border border-white/20 text-left text-xs max-w-lg mx-auto space-y-2 animate-fade-in flex items-start gap-3">
              <Info className="w-5 h-5 text-beige-warm shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white uppercase text-[10px] tracking-wider block">Currently Pre-selected Concept details below:</span>
                <p className="text-stone-300 leading-normal font-sans text-[11px] italic">"{selectedAiConcept}"</p>
                <button
                  onClick={() => {
                    setSelectedAiConcept("");
                    setFormRequirement("Full Home Interior");
                    setFormNotes("");
                    showToast("Selection cleared.");
                  }}
                  className="text-stone-200 hover:text-white underline font-semibold text-[10px] uppercase mt-2 font-mono block cursor-pointer"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 11. Footer details block */}
      <footer className="bg-[#1C1816] text-[#EAE0D5] pt-20 pb-10 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-left">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <span className="font-serif text-3xl tracking-widest text-[#FFF5EB] uppercase">
                AURELIAN
              </span>
              <p className="text-stone-400 text-xs md:text-sm leading-relaxed max-w-sm">
                Crafting bespoke architectural interiors that blend modern innovation with timeless luxury. Each space we touch becomes a masterpiece of personal expression.
              </p>
            </div>
            <div>
              <h6 className="font-serif text-sm font-bold text-white uppercase tracking-widest mb-6">
                Liaison
              </h6>
              <ul className="space-y-3 text-xs text-stone-400 font-sans">
                <li><a href="#" className="hover:text-white transition">Design Philosophy</a></li>
                <li><a href="#" className="hover:text-white transition">Our Core Process</a></li>
                <li><a href="#" className="hover:text-white transition">Sustainable Travertine</a></li>
                <li><a href="#" className="hover:text-white transition">Estates Portfolio</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-serif text-sm font-bold text-white uppercase tracking-widest mb-6">
                Connect Atelier
              </h6>
              <ul className="space-y-3 text-xs text-stone-400 font-sans">
                <li><a href="https://instagram.com" target="_blank" className="hover:text-white transition flex items-center gap-1.5">Instagram <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://pinterest.com" target="_blank" className="hover:text-white transition flex items-center gap-1.5">Pinterest <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://linkedin.com" target="_blank" className="hover:text-white transition flex items-center gap-1.5">LinkedIn <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#consultation-checkout" className="hover:text-white transition">Schedule Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left text-xs text-stone-500 font-sans">
            <div>
              © {new Date().getFullYear()} Aurelian Design Laboratories. Crafted with absolute premium pride.
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-stone-300 transition">Privacy Ledger</a>
              <a href="#" className="hover:text-stone-300 transition">Terms of Commission</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 12. Inspiration Gallery Item Expanded Lightbox Modal Overlay */}
      {selectedGalleryItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedGalleryItem(null)}
        >
          <div 
            className="relative bg-white text-stone-900 rounded-2xl overflow-hidden max-w-4xl w-full border border-stone-200 shadow-2xl animate-slide-up flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image display panel */}
            <div className="md:w-1/2 bg-stone-100 relative min-h-[280px] md:min-h-0">
              <img
                src={selectedGalleryItem.image}
                alt={selectedGalleryItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-stone-900 text-white border border-white/25 text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded shadow">
                {selectedGalleryItem.category}
              </span>
            </div>

            {/* Narrative detail panel */}
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block mb-1">
                      Aurelian Atelier Archive
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-wood-rich tracking-wide">
                      {selectedGalleryItem.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedGalleryItem(null)}
                    className="p-1 px-2.5 rounded-full border border-stone-200 text-stone-400 hover:text-stone-800 hover:bg-stone-55 transition cursor-pointer text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="h-px bg-stone-100" />

                <div className="space-y-4">
                  <p className="text-stone-600 font-sans text-xs md:text-sm leading-relaxed">
                    {selectedGalleryItem.description}
                  </p>
                  
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-150 space-y-2">
                    <span className="text-[9.5px] font-bold text-wood-rich uppercase tracking-wider block">Architectural Design Note</span>
                    <p className="text-stone-500 text-[11px] leading-relaxed">
                      This space centers around haptic architectural balance, prioritizing premium finishes and smooth integrated storage solutions. Settle for nothing less than absolute structural harmony. It can be fully adapted to your custom villa or penthouse configuration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setFormRequirement(`${selectedGalleryItem.title} Style`);
                    setFormNotes(`Inquired about replicating the design, vibe, and architectural styling of "${selectedGalleryItem.title}" (${selectedGalleryItem.category}) from your curated collection.`);
                    setSelectedGalleryItem(null);
                    scrollToSection("consultation-checkout");
                    showToast("Style selection prefilled!");
                  }}
                  className="flex-1 bg-wood-rich hover:bg-[#3d271f] text-white py-3 px-6 rounded-lg font-bold text-xs uppercase tracking-widest transition duration-300 shadow cursor-pointer text-center"
                >
                  Inquire about this style
                </button>
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="border border-stone-200 text-stone-550 hover:bg-stone-50 text-xs py-3 px-6 rounded-lg transition cursor-pointer"
                >
                  Keep browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-beige-warm border border-white/10 px-5 py-3.5 rounded-xl shadow-2xl animate-fade-in flex items-center gap-2 text-xs tracking-wider uppercase font-semibold">
          <Sparkles className="w-4 h-4 text-accent-coral animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
