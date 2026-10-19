import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
        
        {/* ================= LEFT COLUMN: GLASSMORPHIC FORM ================= */}
        <div className="relative lg:col-span-6 glass-box rounded-none p-8 sm:p-10 lg:p-12 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-3xl shadow-2xl flex flex-col justify-between">
          <div>
            <div className="mb-7">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold block mb-2">
                Contact Us
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#E8DCC8]">
                Get In Touch
              </h1>
            </div>

            <ContactForm />
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INFO & MAP ================= */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full pt-1">
          
          {/* Paragraph / Intro Text */}
          <p className="text-sm sm:text-base text-[#E8DCC8] font-light leading-relaxed mb-6">
            Have a question about our aligner sheets, resins or thermoforming machines? Our team is here to help with product enquiries, distributor partnerships and clinical support. Call, email or WhatsApp us, or send a message using the form.
          </p>

          {/* 2x2 Centered Contact Matrix (Larger Icons) */}
          <div className="grid grid-cols-2 gap-6 my-auto text-center py-4">
            
            {/* Phone */}
            <a href="tel:+919930905047" className="group flex flex-col items-center justify-center cursor-pointer">
              <div className="w-14 h-14 flex items-center justify-center text-sky-400 mb-2 transition-transform duration-300 group-hover:scale-110">
                <Phone size={38} strokeWidth={1.5} />
              </div>
              <h2 className="text-base font-bold text-[#E8DCC8] uppercase tracking-wide transition-colors group-hover:text-sky-400">
                Phone Number
              </h2>
              <span className="text-xs sm:text-sm font-mono text-[#E8DCC8] mt-1 transition-colors group-hover:text-sky-400">
                +91 99309 05047
              </span>
            </a>

            {/* Email */}
            <a href="mailto:info@taglus.com" className="group flex flex-col items-center justify-center cursor-pointer">
              <div className="w-14 h-14 flex items-center justify-center text-sky-400 mb-2 transition-transform duration-300 group-hover:scale-110">
                <Mail size={38} strokeWidth={1.5} />
              </div>
              <h2 className="text-base font-bold text-[#E8DCC8] uppercase tracking-wide transition-colors group-hover:text-sky-400">
                Email Address
              </h2>
              <span className="text-xs sm:text-sm font-mono text-[#E8DCC8] mt-1 transition-colors group-hover:text-sky-400">
                info@taglus.com
              </span>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/919930905047" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center cursor-pointer">
              <div className="w-14 h-14 flex items-center justify-center text-sky-400 mb-2 transition-transform duration-300 group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-[#E8DCC8] uppercase tracking-wide transition-colors group-hover:text-sky-400">
                Whatsapp
              </h2>
              <span className="text-xs sm:text-sm font-mono text-[#E8DCC8] mt-1 transition-colors group-hover:text-sky-400">
                +91 99309 05047
              </span>
            </a>

            {/* Office */}
            <a href="https://www.google.com/maps/search/?api=1&query=19.127491,72.832881" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center cursor-pointer">
              <div className="w-14 h-14 flex items-center justify-center text-sky-400 mb-2 transition-transform duration-300 group-hover:scale-110">
                <MapPin size={38} strokeWidth={1.5} />
              </div>
              <h2 className="text-base font-bold text-[#E8DCC8] uppercase tracking-wide transition-colors group-hover:text-sky-400">
                Our Office
              </h2>
              <span className="text-xs sm:text-sm text-[#E8DCC8] mt-1 max-w-[230px] leading-snug text-center transition-colors group-hover:text-sky-400">
                103, Akruti Arcade, J.P. Road, Andheri (West), Mumbai 400053
              </span>
            </a>

          </div>

          {/* Embedded Google Map */}
          <div className="w-full h-[220px] sm:h-[250px] lg:h-[260px] rounded-none overflow-hidden border border-[#E8DCC8]/20 bg-black/50 shadow-xl relative mt-4">
            <iframe
              title="Taglus Office Location Map"
              src="https://maps.google.com/maps?q=19.127491,72.832881&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

        </div>

      </div>

    </section>
  );
}