import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { requireAdminPage } from "../../lib/auth";
import { deleteEvent } from "../../actions/eventActions";
import { formatEventRange } from "../../lib/events";
import { DeleteButton } from "../components/RowActions";
import { buttonPrimary, PageHeader, StatusBadge } from "../components/ui";

export const dynamic = "force-dynamic";

export default async function EventsAdminPage() {
  await requireAdminPage();
  const events = await prisma.event.findMany({ orderBy: { startDate: "desc" } });
  const today = new Date(`${new Date().toISOString().slice(0, 10)}T00:00:00.000Z`);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Events"
        description="Exhibitions, webinars and conferences. Past events move to the “Past” section automatically."
        action={
          <Link href="/admin/events/new" className={buttonPrimary}>
            + Add New Event
          </Link>
        }
      />

      <div className="bg-[#0b1329] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#101b38] text-xs uppercase tracking-wider text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-5 py-3">Event</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {events.map((ev) => {
                const isPast = (ev.endDate ?? ev.startDate) < today;
                return (
                  <tr key={ev.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3">
                      <Link href={`/admin/events/${ev.id}/edit`} className="font-medium text-white hover:text-[#D4AF37]">
                        {ev.title}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-xs whitespace-nowrap">
                      {formatEventRange(ev.startDate, ev.endDate)}
                      {isPast && <span className="ml-2 text-gray-500">(past)</span>}
                    </td>
                    <td className="px-5 py-3 text-xs">{ev.location}</td>
                    <td className="px-5 py-3">
                      <StatusBadge published={ev.published} />
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap space-x-3">
                      <Link href={`/admin/events/${ev.id}/edit`} className="text-xs text-[#D4AF37] hover:underline">
                        Edit
                      </Link>
                      <DeleteButton id={ev.id} itemName={ev.title} action={deleteEvent} />
                    </td>
                  </tr>
                );
              })}
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">
                    No events yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
