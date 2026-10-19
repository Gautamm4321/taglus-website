"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMessage, setMessageRead } from "../../actions/contactActions";

export default function MessageActions({ id, read }: { id: number; read: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="mt-4 flex gap-4 text-xs">
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(async () => { await setMessageRead(id, !read); router.refresh(); })}
        className="text-gray-300 hover:underline disabled:opacity-50"
      >
        {read ? "Mark as unread" : "Mark as read"}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (!window.confirm("Delete this message permanently?")) return;
          startTransition(async () => {
            const res = await deleteMessage(id);
            if (!res.ok) window.alert(res.error);
            router.refresh();
          });
        }}
        className="text-red-400 hover:underline disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
