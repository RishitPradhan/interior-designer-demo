import { useState, useEffect } from "react";
import { Search, Compass } from "lucide-react";

interface NavbarProps {
  onConsultationClick: () => void;
  onOpenAISandbox: () => void;
}

export default function Navbar({ onConsultationClick, onOpenAISandbox }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="aurelian-nav"
      className={`fixed top-0 w-full z-[100] transition-all duration-500 border-b-[0.5px] border-white/10 ${
        isScrolled
          ? "bg-slate-deep/95 text-beige-warm py-3 shadow-lg backdrop-blur-xl"
          : "bg-surface/75 text-on-surface py-5 backdrop-blur-lg"
      }`}
    >
      <nav className="flex justify-between items-center px-6 md:px-20 max-w-7xl mx-auto">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif text-2xl md:text-3xl tracking-widest uppercase cursor-pointer hover:opacity-80 transition"
        >
          AURELIAN
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <button
            onClick={() => scrollToSection("portfolio-services")}
            className="text-xs uppercase tracking-widest font-semibold hover:opacity-100 opacity-70 transition cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("inspiration-gallery")}
            className="text-xs uppercase tracking-widest font-semibold hover:opacity-100 opacity-70 transition cursor-pointer"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollToSection("pricing-estimator")}
            className="text-xs uppercase tracking-widest font-semibold hover:opacity-100 opacity-70 transition cursor-pointer"
          >
            Budget Calculator
          </button>
          <button
            onClick={() => scrollToSection("featured-projects")}
            className="text-xs uppercase tracking-widest font-semibold hover:opacity-100 opacity-70 transition cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={onOpenAISandbox}
            className="text-xs uppercase tracking-widest font-bold text-accent-coral hover:scale-105 transition flex items-center gap-1 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            AI Co-Designer
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenAISandbox}
            className="p-2 hover:opacity-75 transition"
            title="Search AI Catalog"
          >
            <Search className="w-5 h-5 cursor-pointer" />
          </button>
          
          <button
            onClick={onConsultationClick}
            className="bg-wood-rich text-white border border-wood-rich hover:bg-transparent hover:text-wood-rich active:scale-95 transition-all duration-300 text-xs font-semibold px-4 md:px-6 py-2.5 rounded-lg tracking-wider"
          >
            Book Consultation
          </button>
        </div>
      </nav>
    </header>
  );
}
