import { prisma } from "../../lib/prisma";
import { requireAdminPage } from "../../lib/auth";
import { PageHeader } from "../components/ui";
import MessageActions from "./MessageActions";

export const dynamic = "force-dynamic";

const fmt = (d: Date) =>
  d.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default async function MessagesAdminPage() {
  await requireAdminPage();
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Messages"
        description={`Enquiries sent from the website contact form${unread ? ` · ${unread} unread` : ""}. Reply by email.`}
      />

      {messages.length === 0 ? (
        <p className="text-gray-400">No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`bg-[#0b1329] border rounded-xl p-5 shadow-xl ${m.read ? "border-white/10" : "border-[#D4AF37]/40"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">
                    {m.subject}
                    {!m.read && <span className="ml-2 text-[10px] uppercase tracking-wider text-[#D4AF37]">New</span>}
                  </p>
                  <p className="text-sm text-gray-300 mt-0.5">
                    {m.name} ·{" "}
                    <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`} className="text-blue-400 hover:underline">
                      {m.email}
                    </a>
                  </p>
                </div>
                <p className="text-xs text-gray-500">{fmt(m.createdAt)}</p>
              </div>
              <p className="mt-3 text-sm text-gray-200 whitespace-pre-wrap">{m.message}</p>
              <MessageActions id={m.id} read={m.read} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
