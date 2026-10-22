import { prisma } from "../../lib/prisma";
import { requireAdminPage } from "../../lib/auth";
import { PageHeader } from "../components/ui";
import SubscriberActions from "./SubscriberActions";

export const dynamic = "force-dynamic";

const fmt = (d: Date) =>
  d.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default async function SubscribersAdminPage() {
  await requireAdminPage();
  const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" }, take: 1000 });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageHeader
          title="Subscribers"
          description={`People who joined the Taglus Network from the website pop-up · ${subscribers.length} total.`}
        />
        {subscribers.length > 0 && (
          <a
            href="/admin/subscribers/export"
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors"
          >
            Download CSV
          </a>
        )}
      </div>

      {subscribers.length === 0 ? (
        <p className="text-gray-400">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0b1329] shadow-xl">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Country</th>
                <th className="px-5 py-3">Joined</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-3 text-white">{s.name}</td>
                  <td className="px-5 py-3">
                    <a href={`mailto:${s.email}`} className="text-blue-400 hover:underline">{s.email}</a>
                  </td>
                  <td className="px-5 py-3 text-gray-300">{s.phone}</td>
                  <td className="px-5 py-3 text-gray-300">{s.country}</td>
                  <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{fmt(s.createdAt)}</td>
                  <td className="px-5 py-3 text-right">
                    <SubscriberActions id={s.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
