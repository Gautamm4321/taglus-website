import type { Event } from "@prisma/client";
import { prisma } from "./prisma";
import type { EventInput } from "./validation";

/** Dates are stored as midnight UTC, so always format them in UTC. */
export function formatEventDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function formatEventRange(start: Date, end: Date | null) {
  if (!end || end.getTime() === start.getTime()) return formatEventDate(start);
  return `${formatEventDate(start)} – ${formatEventDate(end)}`;
}

const toDateInput = (d: Date | null) => (d ? d.toISOString().slice(0, 10) : "");

export function toEventInput(e: Event): EventInput {
  return {
    title: e.title,
    slug: e.slug,
    startDate: toDateInput(e.startDate),
    endDate: toDateInput(e.endDate),
    location: e.location,
    description: e.description,
    imagePath: e.imagePath ?? "",
    registrationUrl: e.registrationUrl ?? "",
    published: e.published,
  };
}

function todayUtc() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

/** An event stays "upcoming" until its last day has passed. */
export async function getUpcomingEvents() {
  const today = todayUtc();
  return prisma.event.findMany({
    where: {
      published: true,
      OR: [{ endDate: { gte: today } }, { endDate: null, startDate: { gte: today } }],
    },
    orderBy: { startDate: "asc" },
  });
}

export async function getPastEvents(limit = 12) {
  const today = todayUtc();
  return prisma.event.findMany({
    where: {
      published: true,
      OR: [{ endDate: { lt: today } }, { endDate: null, startDate: { lt: today } }],
    },
    orderBy: { startDate: "desc" },
    take: limit,
  });
}
