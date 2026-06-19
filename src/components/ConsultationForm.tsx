import React, { useState, useEffect } from "react";
import { Calendar, Phone, User, MessageCircle, AlertCircle, FileText } from "lucide-react";
import { ConsultationRequest } from "../types";

interface ConsultationFormProps {
  initialRequirement?: string;
  initialNotes?: string;
  onSuccess?: () => void;
}

export default function ConsultationForm({ initialRequirement = "Full Home Interior", initialNotes = "", onSuccess }: ConsultationFormProps) {
  // Input fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState(initialRequirement);
  const [notes, setNotes] = useState(initialNotes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sync state with props
  useEffect(() => {
    if (initialRequirement) {
      setRequirement(initialRequirement);
    }
  }, [initialRequirement]);

  useEffect(() => {
    if (initialNotes) {
      setNotes(initialNotes);
    }
  }, [initialNotes]);

  // Captured receipt on successful booking
  const [receipt, setReceipt] = useState<ConsultationRequest | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage("Please supply your full name and primary phone number to secure an slot.");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, requirement, notes }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setReceipt(data.requestDetails);
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage(data.error || "Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network discrepancy encountered. Please try reserving again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareOnWhatsApp = () => {
    if (!receipt) return;
    const message = `Hello Aurelian Team, I just scheduled a free luxury consultation!\n\nID: ${receipt.id}\nName: ${receipt.clientName}\nPhone: ${receipt.phone}\nRequirement: ${receipt.requirement}\nNotes: ${receipt.notes}\n\nPlease confirm my premium appointment.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/15550000000?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-xl p-6 md:p-12 rounded-3xl border border-white/20 relative overflow-hidden text-white" id="consultation-box">
      {/* Abstract dark decor layout */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

      {receipt ? (
        <div className="space-y-8 animate-fade-in text-center py-4">
          <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mx-auto border border-[#FFF5EB]/30 animate-bounce">
            <FileText className="w-8 h-8 text-beige-warm" />
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-2xl md:text-3xl text-bevel-warm text-white font-medium">
              Consultation Appointed
            </h3>
            <p className="text-xs text-stone-300 max-w-md mx-auto">
              Your appointment credentials have been locked into Aurelian's premium ledger. Our principal architect will contact you within 2 business hours.
            </p>
          </div>

          {/* Certificate of registration board */}
          <div className="max-w-md mx-auto text-left bg-stone-900/90 text-[#FFF5EB] p-6 rounded-xl border border-white/10 font-mono text-xs space-y-4 shadow-2xl relative">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
              <span className="text-6xl font-serif font-black tracking-widest text-[#FFF5EB]">AUR</span>
            </div>

            <div className="border-b border-white/10 pb-3 flex justify-between items-center text-[10px] tracking-widest text-[#FFF5EB]/65 uppercase">
              <span>Aurelian Ledger Registry</span>
              <span className="text-[#F05B5B] font-bold">LOCKED</span>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              <div>
                <span className="text-[9px] text-stone-400 uppercase tracking-wider block">TICKET ID / REF:</span>
                <span className="font-bold text-white text-sm">{receipt.id}</span>
              </div>
              <div>
                <span className="text-[9px] text-stone-400 uppercase tracking-wider block">DATE APPOINTED:</span>
                <span className="text-white text-[10.5px] leading-tight">{receipt.submissionTime}</span>
              </div>

              <div className="col-span-2 border-t border-white/5 pt-3">
                <span className="text-[9px] text-stone-400 uppercase tracking-wider block">CLIENT PRINCIPAL:</span>
                <span className="font-sans font-bold text-white text-xs">{receipt.clientName}</span>
              </div>

              <div>
                <span className="text-[9px] text-stone-400 uppercase tracking-wider block">REACH CALL OUT:</span>
                <span className="font-sans text-stone-250 text-xs">{receipt.phone}</span>
              </div>
              <div>
                <span className="text-[9px] text-stone-400 uppercase tracking-wider block">REQUIREMENT:</span>
                <span className="font-sans font-semibold text-beige-warm text-xs">{receipt.requirement}</span>
              </div>

              {receipt.notes && (
                <div className="col-span-2 border-t border-white/5 pt-3">
                  <span className="text-[9px] text-stone-400 uppercase tracking-wider block">NOTES SPECIFIED:</span>
                  <span className="font-sans text-stone-300 text-xs leading-relaxed italic">"{receipt.notes}"</span>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 pt-3 text-[9px] text-stone-400 text-center uppercase tracking-wide">
              Principal: Arch. Aurelio Van der Weyden
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={shareOnWhatsApp}
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-transform cursor-pointer"
            >
              <img
                alt="WhatsApp"
                className="w-5 h-5 invert brightness-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_92aaLOmyzvHoiPXqcHMbmP9Icj17yB8OKASgSc1zyaqaShFJfzM1zc1ciUgovR2hK_6u8JC_QoMe1wRIddd9Qt185DXtlh-dbEEENO4mVVc4EMxD_kRwFhdjion0bqZFbE7aoDUphbEAevmo5s7oIxF_Jp79cjP95nIUWfmrIwsKb5EbJOyE1qDNgPoAOYJDChfe5bZ3x6AaMhYJTyzeKbfERVKTcnMWOBw8YNYyioOX9OQLxL0y3U6xDj4NSqk1HGyw85rxhz8"
                referrerPolicy="no-referrer"
              />
              WhatsApp team directly
            </button>
            <button
              onClick={() => setReceipt(null)}
              className="border border-white/30 text-white hover:bg-white/10 text-xs uppercase tracking-wider px-8 py-4 rounded-lg transition"
            >
              Book another request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative z-10">
          {errorMessage && (
            <div className="md:col-span-2 bg-[#ba1a1a]/25 text-red-100 border border-[#ba1a1a]/60 rounded-xl p-4 flex gap-3 items-center text-xs">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-300" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-2 group">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#FFF5EB]/65 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-stone-400" /> Your Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Eleanor Vance"
              className="w-full bg-transparent border-b border-white/30 focus:border-beige-warm focus:ring-0 py-3 transition-colors text-white text-sm outline-none outline-0"
            />
          </div>

          {/* Contact Number */}
          <div className="space-y-2 group">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#FFF5EB]/65 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-stone-400" /> Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-transparent border-b border-white/30 focus:border-beige-warm focus:ring-0 py-3 transition-colors text-white text-sm outline-none outline-0"
            />
          </div>

          {/* Service Preference */}
          <div className="md:col-span-2 space-y-2 group">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#FFF5EB]/65 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" /> Your Project Requirement
            </label>
            <select
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="w-full bg-transparent border-b border-white/30 focus:border-beige-warm focus:ring-0 py-3 transition-colors text-white text-sm outline-none appearance-none cursor-pointer"
              style={{ colorScheme: "dark" }}
            >
              <option value="Full Home Interior" className="bg-wood-rich text-white hover:bg-[#4E3629]">Full Home Interior Design</option>
              <option value="Kitchen Remodel" className="bg-wood-rich text-white hover:bg-[#4E3629]">Gourmet Kitchen Remodeling</option>
              <option value="Office Design" className="bg-wood-rich text-white hover:bg-[#4E3629]">Sophisticated Studio Workspace</option>
              <option value="Luxury Consultation" className="bg-wood-rich text-white hover:bg-[#4E3629]">Bespoke Architectural Walkthrough</option>
              {requirement !== "Full Home Interior" &&
                requirement !== "Kitchen Remodel" &&
                requirement !== "Office Design" &&
                requirement !== "Luxury Consultation" && (
                  <option value={requirement} className="bg-wood-rich text-white hover:bg-[#4E3629]">
                    {requirement}
                  </option>
                )}
            </select>
          </div>

          {/* Optional Notes */}
          <div className="md:col-span-2 space-y-2 group">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#FFF5EB]/65">
              Message or Specific Requirements (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Include details about square footage, layout quirks, or material ideas..."
              className="w-full bg-transparent border-b border-white/30 focus:border-beige-warm focus:ring-0 py-2 transition-colors text-white text-sm outline-none outline-0 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-2 bg-[#EAE0D5] text-stone-900 py-4.5 rounded-lg hover:bg-white active:scale-95 transition-all duration-300 font-bold uppercase tracking-widest text-xs mt-4 disabled:opacity-50"
          >
            {isSubmitting ? "Locking slot credentials..." : "Schedule Design Lock Appointment"}
          </button>
        </form>
      )}
    </div>
  );
}
