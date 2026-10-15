import { notFound } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { requireAdminPage } from "../../../../lib/auth";
import { toEventInput } from "../../../../lib/events";
import { PageHeader } from "../../../components/ui";
import EventForm from "../../EventForm";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();
  const { id } = await params;
  const eventId = Number(id);
  if (!Number.isInteger(eventId)) notFound();

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) notFound();

  return (
    <div className="space-y-8">
      <PageHeader title={`Edit: ${event.title}`} />
      <EventForm eventId={event.id} initialData={toEventInput(event)} />
    </div>
  );
}
