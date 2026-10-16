"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact submission:", formData);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 select-none">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
        
        {/* ================= LEFT COLUMN: GLASSMORPHIC FORM ================= */}
        <div className="lg:col-span-6 glass-box rounded-none p-8 sm:p-10 lg:p-12 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-3xl shadow-2xl flex flex-col justify-between">
          <div>
            <div className="mb-7">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold block mb-2">
                Contact Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#E8DCC8]">
                Get In Touch
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-[11px] uppercase font-mono tracking-wider text-[#E8DCC8]/70 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name..."
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-[#E8DCC8]/20 text-[#E8DCC8] placeholder:text-[#E8DCC8]/30 rounded-none focus:outline-none focus:border-sky-400/80 transition-colors text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] uppercase font-mono tracking-wider text-[#E8DCC8]/70 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@yourmail.com"
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-[#E8DCC8]/20 text-[#E8DCC8] placeholder:text-[#E8DCC8]/30 rounded-none focus:outline-none focus:border-sky-400/80 transition-colors text-sm"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[11px] uppercase font-mono tracking-wider text-[#E8DCC8]/70 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Title..."
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-[#E8DCC8]/20 text-[#E8DCC8] placeholder:text-[#E8DCC8]/30 rounded-none focus:outline-none focus:border-sky-400/80 transition-colors text-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] uppercase font-mono tracking-wider text-[#E8DCC8]/70 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type Here..."
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-[#E8DCC8]/20 text-[#E8DCC8] placeholder:text-[#E8DCC8]/30 rounded-none focus:outline-none focus:border-sky-400/80 transition-colors text-sm resize-none"
                />
              </div>

              {/* Submit Button (Clean Text, No Icon) */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full border border-[#E8DCC8]/40 hover:border-sky-400 bg-white/[0.03] hover:bg-gradient-to-r hover:from-[#0052cc] hover:to-[#00d4ff] text-[#E8DCC8] hover:text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Send Now
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INFO & MAP ================= */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full pt-1">
          
          {/* Paragraph / Intro Text */}
          <p className="text-sm sm:text-base text-[#E8DCC8]/80 font-light leading-relaxed mb-6">
            In tempus nisl turpis, at ultricies dui eleifend a. Quisque et quam vel nunc consectetur pharetra euismod et elit. Morbi nibh tortor, ullamcorper id purus eu, rhoncus consequat velit.
          </p>

          {/* 2x2 Centered Contact Matrix (Larger Icons) */}
          <div className="grid grid-cols-2 gap-6 my-auto text-center py-4">
            
            {/* Phone */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 flex items-center justify-center text-sky-400 mb-2">
                <Phone size={38} strokeWidth={1.5} />
              </div>
              <h4 className="text-base font-bold text-[#E8DCC8] uppercase tracking-wide">
                Phone Number
              </h4>
              <p className="text-xs sm:text-sm font-mono text-[#E8DCC8]/75 mt-1">
                +6282 4032 567
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 flex items-center justify-center text-sky-400 mb-2">
                <Mail size={38} strokeWidth={1.5} />
              </div>
              <h4 className="text-base font-bold text-[#E8DCC8] uppercase tracking-wide">
                Email Address
              </h4>
              <p className="text-xs sm:text-sm font-mono text-[#E8DCC8]/75 mt-1">
                Example@Email.Com
              </p>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 flex items-center justify-center text-sky-400 mb-2">
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
              <h4 className="text-base font-bold text-[#E8DCC8] uppercase tracking-wide">
                Whatsapp
              </h4>
              <p className="text-xs sm:text-sm font-mono text-[#E8DCC8]/75 mt-1">
                082-245-7253
              </p>
            </div>

            {/* Office */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 flex items-center justify-center text-sky-400 mb-2">
                <MapPin size={38} strokeWidth={1.5} />
              </div>
              <h4 className="text-base font-bold text-[#E8DCC8] uppercase tracking-wide">
                Our Office
              </h4>
              <p className="text-xs sm:text-sm text-[#E8DCC8]/75 mt-1 max-w-[210px] leading-snug">
                2443 Oak Ridge Omaha, QA 45065
              </p>
            </div>

          </div>

          {/* Embedded Google Map */}
          <div className="w-full h-[220px] sm:h-[250px] lg:h-[260px] rounded-none overflow-hidden border border-[#E8DCC8]/20 bg-black/50 shadow-xl relative mt-4">
            <iframe
              title="Taglus Office Location Map"
              src="https://maps.google.com/maps?q=London%20Eye,%20London&t=&z=13&ie=UTF8&iwloc=&output=embed"
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