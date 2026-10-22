"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteSubscriber } from "../../actions/subscribeActions";

export default function SubscriberActions({ id }: { id: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm("Remove this subscriber permanently?")) return;
        startTransition(async () => {
          const res = await deleteSubscriber(id);
          if (!res.ok) window.alert(res.error);
          router.refresh();
        });
      }}
      className="text-xs text-red-400 hover:underline disabled:opacity-50"
    >
      Delete
    </button>
  );
}
