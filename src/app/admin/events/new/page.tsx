import { requireAdminPage } from "../../../lib/auth";
import { PageHeader } from "../../components/ui";
import EventForm from "../EventForm";

export const dynamic = "force-dynamic";

export default async function NewEventPage() {
  await requireAdminPage();
  return (
    <div className="space-y-8">
      <PageHeader title="Add New Event" />
      <EventForm />
    </div>
  );
}
