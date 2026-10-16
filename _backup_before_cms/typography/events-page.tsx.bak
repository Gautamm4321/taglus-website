// Example public events page. If you already have a designed events page,
// keep your design and just replace its hardcoded array with these two calls.
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
  return (
    <article id={event.slug} className={`rounded-xl border border-white/10 bg-[#0b1329] overflow-hidden ${past ? "opacity-70" : ""}`}>
      {event.imagePath && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={event.imagePath} alt={event.title} className="h-48 w-full object-cover" />
      )}
      <div className="p-6 space-y-2">
        <p className="text-xs uppercase tracking-wider text-[#D4AF37]">{formatEventRange(event.startDate, event.endDate)}</p>
        <h3 className="text-xl font-semibold text-white">{event.title}</h3>
        <p className="text-sm text-gray-400">{event.location}</p>
        <p className="text-sm text-gray-300 whitespace-pre-line">{event.description}</p>
        {!past && event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm font-semibold text-[#D4AF37] hover:underline"
          >
            Register / More info →
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
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-24 space-y-16">
        <section className="space-y-6">
          <h1 className="text-4xl font-bold">Upcoming Events</h1>
          {upcoming.length === 0 ? (
            <p className="text-gray-400">New events will be announced soon.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Past Events</h2>
            <div className="grid gap-6 md:grid-cols-3">
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
