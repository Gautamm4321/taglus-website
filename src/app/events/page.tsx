import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { Metadata } from "next";
import type { Event } from "@prisma/client";
import Link from "next/link";
import Header from "../components/header";
import Countdown from "../components/Countdown";
import Footer from "../components/Footer";
import { formatEventRange, getPastEvents, getUpcomingEvents } from "../lib/events";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Events & Exhibitions: Meet Taglus at AEEDC, IDS and More",
  description:
    "Meet the Taglus team at upcoming dental exhibitions such as AEEDC Dubai and IDS Cologne, and see where we have exhibited before.",
  alternates: { canonical: "/events" },
  openGraph: { url: "/events" },
};

/** If the database is briefly unreachable, show the page with empty lists instead of an error. */
async function loadEvents(): Promise<[Event[], Event[]]> {
  try {
    return await Promise.all([getUpcomingEvents(), getPastEvents()]);
  } catch (e) {
    console.error("events page: could not load events", e);
    return [[], []];
  }
}

function EventCard({ event, past }: { event: Event; past?: boolean }) {
  // Blank lines in the CMS description become separate paragraphs
  const paragraphs = event.description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <article
      id={event.slug}
      className="group scroll-mt-28 flex flex-col rounded-2xl border border-[#E8DCC8]/15 bg-[#0b1329] overflow-hidden hover:border-sky-400/40 hover:-translate-y-1.5 transition-all duration-300"
    >
      {event.imagePath && (
        // Full image, never cropped: natural height, width fills the card
        <div className="overflow-hidden bg-[#060d1f]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.imagePath}
            alt={`${event.title} poster`}
            loading="lazy"
            decoding="async"
            className={`block w-full h-auto transition-all duration-700 group-hover:scale-[1.04] ${past ? "grayscale-[60%] group-hover:grayscale-0" : ""}`}
          />
        </div>
      )}

      <div className="flex flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-sky-400">
            <CalendarDays size={14} aria-hidden="true" />
            {formatEventRange(event.startDate, event.endDate)}
          </span>
          {past && (
            <span className="rounded-full border border-[#E8DCC8]/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#E8DCC8]">
              Past event
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold leading-snug text-[#E8DCC8]">{event.title}</h3>

        <span className="flex items-start gap-1.5 text-sm text-[#E8DCC8]">
          <MapPin size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-sky-400" />
          {event.location}
        </span>

        <div className="space-y-2.5 pt-1">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-[#E8DCC8] text-left hyphens-none">
              {para}
            </p>
          ))}
        </div>

        {!past && event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300"
          >
            Register / More info <ArrowRight size={15} />
          </a>
        )}
      </div>
    </article>
  );
}

export default async function EventsPage() {
  const [upcoming, past] = await loadEvents();
  const [next, ...laterUpcoming] = upcoming;

  return (
    <div className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8] overflow-x-hidden">
      <Header />
      <main id="main-content" className="flex-1 w-full">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-12 animate-fade-up">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold">Events &amp; Exhibitions</p>
            <h1 className="mt-3 text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.02] text-[#E8DCC8]">
              Meet Taglus{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">Worldwide</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#E8DCC8]/85 max-w-2xl text-left">
              Visit our team at the leading dental and orthodontic exhibitions to see our materials and machines in person.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 space-y-20">
          {/* ================= NEXT EVENT (featured, with live countdown) ================= */}
          {next ? (
            <section aria-labelledby="next-event" className="space-y-6">
              <h2 id="next-event" className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">Next Stop</h2>
              <article
                id={next.slug}
                className="scroll-mt-28 grid overflow-hidden rounded-3xl border border-[#E8DCC8]/15 bg-[#0b1329] lg:grid-cols-2"
              >
                {next.imagePath && (
                  <div className="relative overflow-hidden bg-[#060d1f]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={next.imagePath} alt={`${next.title} poster`} decoding="async" className="block w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
                  </div>
                )}
                <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-sky-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
                    </span>
                    Coming up
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black uppercase leading-tight tracking-tight text-[#E8DCC8]">{next.title}</h3>
                  <div className="space-y-2 text-sm sm:text-base text-[#E8DCC8]">
                    <p className="flex items-center gap-2"><CalendarDays size={17} className="text-sky-400" /> {formatEventRange(next.startDate, next.endDate)}</p>
                    <p className="flex items-start gap-2"><MapPin size={17} className="mt-0.5 shrink-0 text-sky-400" /> {next.location}</p>
                  </div>
                  <Countdown to={next.startDate.toISOString()} />
                  <p className="text-sm leading-relaxed text-[#E8DCC8]/85 text-left line-clamp-4">{next.description}</p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {next.registrationUrl && (
                      <a href={next.registrationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02]">
                        Register / More info <ArrowRight size={15} />
                      </a>
                    )}
                    <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#E8DCC8]/25 px-6 py-3 text-sm font-semibold text-[#E8DCC8] transition-colors hover:border-sky-400 hover:text-sky-300">
                      Book a meeting
                    </Link>
                  </div>
                </div>
              </article>
            </section>
          ) : (
            <section className="rounded-3xl border border-dashed border-[#E8DCC8]/20 p-10 text-center">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#E8DCC8]">New events coming soon</h2>
              <p className="mt-2 text-[#E8DCC8]/80 text-center">Follow us to hear where we exhibit next.</p>
            </section>
          )}

          {laterUpcoming.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">Also Upcoming</h2>
              <div className="grid gap-6 md:grid-cols-2 items-start">
                {laterUpcoming.map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-end justify-between gap-4 border-b border-[#E8DCC8]/10 pb-4">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">Where We&apos;ve Been</h2>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#E8DCC8]/60">{past.length} past events</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
                {past.map((e) => (
                  <EventCard key={e.id} event={e} past />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
