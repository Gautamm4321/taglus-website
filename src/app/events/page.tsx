// Example public events page. If you already have a designed events page,
// keep your design and just replace its hardcoded array with these two calls.
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { Metadata } from "next";
import type { Event } from "@prisma/client";
import Header from "../components/header";
import Footer from "../components/Footer";
import { formatEventRange, getPastEvents, getUpcomingEvents } from "../lib/events";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Events | Taglus",
  description: "Meet Taglus at upcoming exhibitions, conferences and webinars.",
};

function EventCard({ event, past }: { event: Event; past?: boolean }) {
  // Blank lines in the CMS description become separate paragraphs
  const paragraphs = event.description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <article
      id={event.slug}
      className="flex flex-col rounded-2xl border border-[#E8DCC8]/15 bg-[#0b1329] overflow-hidden hover:border-sky-400/40 transition-colors"
    >
      {event.imagePath && (
        // Full image, never cropped: natural height, width fills the card
        // eslint-disable-next-line @next/next/no-img-element
        <img src={event.imagePath} alt={event.title} className="block w-full h-auto" />
      )}

      <div className="flex flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-sky-400">
            <CalendarDays size={14} />
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
          <MapPin size={15} className="mt-0.5 shrink-0 text-sky-400" />
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
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()]);

  return (
    <main className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8]">
      <Header />
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-28 pb-20 sm:pt-32 space-y-14">
        <section className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#E8DCC8]">Upcoming Events</h1>
          {upcoming.length === 0 ? (
            <p className="text-[#E8DCC8] text-left">New events will be announced soon.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 items-start">
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">Past Events</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
              {past.map((e) => (
                <EventCard key={e.id} event={e} past />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
