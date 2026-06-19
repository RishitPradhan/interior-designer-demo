import { ArrowRight, Compass, ShieldCheck } from "lucide-react";

interface HeroProps {
  onConsultationClick: () => void;
  onExploreProjects: () => void;
  onOpenAISandbox: () => void;
}

export default function Hero({ onConsultationClick, onExploreProjects, onOpenAISandbox }: HeroProps) {
  return (
    <section id="hero-home" className="relative h-screen w-full flex items-center overflow-hidden bg-black text-white">
      {/* Immersive background image with warm cinematic styling */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-85 transition-transform duration-10000 scale-105"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBpdznHb_Lo1x8PNZa_IehWl2qMqiniv6Ohuw4Ye2709UiDeoUNYtA4ag-glfCl_elZE23oUndVzwU32sgYwjhvVPxfN5fXdrGlHSGDU_rluaAcHrKJZqmYWNowEcEqUC18RZKoog9Q0m500F0znL8rqwt8l8XkQOkG8B2lklgDRfslH4mz38wtFNbqbq4xJUEhC9Ch7nEfeJvko1IMV8vzPHZ4QybR_gZyQdmphGIx2vLrwcftghreaOufTV4XF-aZdoB72b4duQI')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />
      </div>

      <div className="relative z-10 px-6 md:px-20 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl space-y-6 md:space-y-8 animate-fade-in">
          {/* Subtle label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-coral animate-ping" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFF5EB]">
              Exquisite Living • Crafted For You
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight drop-shadow-xl text-white">
            Designing Spaces That Reflect Your <span className="italic font-normal text-beige-warm">Lifestyle</span>
          </h1>

          <p className="text-sm md:text-lg font-light text-white/90 max-w-lg leading-relaxed font-sans">
            End-to-end interior architectural solutions for those who value elegance and quality. Our bespoke designs transform houses into homes of timeless sophistication.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onConsultationClick}
              className="bg-wood-rich text-white hover:bg-[#4E3629] px-6 md:px-8 py-3.5 md:py-4 rounded font-semibold text-xs tracking-widest uppercase shadow-lg transition-all duration-300"
            >
              Book Free Consultation
            </button>
            <button
              onClick={onOpenAISandbox}
              className="border border-white/30 text-white bg-white/10 hover:bg-white hover:text-primary backdrop-blur-md px-6 md:px-8 py-3.5 md:py-4 rounded font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 animate-spin-slow text-accent-coral" />
              AI Design Assistant
            </button>
          </div>
        </div>
      </div>

      {/* Floating Trust Stats Panel */}
      <div className="absolute bottom-6 md:bottom-12 left-6 right-6 md:left-20 md:right-20 max-w-7xl mx-auto z-10 hidden sm:block">
        <div
          className="py-5 px-8 md:px-12 inline-flex flex-wrap gap-10 md:gap-16 rounded-xl border border-white/20"
          style={{
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
          }}
        >
          <div className="text-left">
            <div className="font-serif text-2xl md:text-3xl text-white font-medium">1,500+</div>
            <div className="text-[10px] text-white/70 uppercase tracking-widest font-semibold mt-1">
              Bespoke Spaces
            </div>
          </div>
          <div className="w-px bg-white/20 self-stretch my-1" />
          <div className="text-left">
            <div className="font-serif text-2xl md:text-3xl text-white font-medium">12 Years</div>
            <div className="text-[10px] text-white/70 uppercase tracking-widest font-semibold mt-1">
              Excellence
            </div>
          </div>
          <div className="w-px bg-white/20 self-stretch my-1" />
          <div className="text-left">
            <div className="font-serif text-2xl md:text-3xl text-white font-medium">98%</div>
            <div className="text-[10px] text-white/70 uppercase tracking-widest font-semibold mt-1">
              Happy Clients
            </div>
          </div>
          <div className="w-px bg-white/20 self-stretch my-1" />
          <div className="text-left flex items-center gap-2">
            <div className="p-2 rounded-full bg-wood-rich/40">
              <ShieldCheck className="w-5 h-5 text-beige-warm" />
            </div>
            <div>
              <div className="text-[11px] text-white font-semibold">Move-In Guarantee</div>
              <div className="text-[9px] text-white/60">Strict 45-day SLA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
