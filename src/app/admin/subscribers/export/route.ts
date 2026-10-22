// CSV download of all subscribers. /admin/* is protected by src/proxy.ts; checked again here.
import { prisma } from "../../../lib/prisma";
import { isAdmin } from "../../../lib/auth";

export const dynamic = "force-dynamic";

// Quote every cell and neutralise spreadsheet formulas (=, +, -, @) typed into the form
const cell = (v: string) => `"${(/^[=+\-@]/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"`;

export async function GET() {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const rows = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
  const csv = [
    ["Name", "Email", "Phone", "Country", "Joined"].map(cell).join(","),
    ...rows.map((r) => [r.name, r.email, r.phone, r.country, r.createdAt.toISOString()].map(cell).join(",")),
  ].join("\r\n");
  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="taglus-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
