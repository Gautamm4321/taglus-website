"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ActionResult } from "../../lib/validation";

export function DeleteButton({
  id,
  itemName,
  action,
}: {
  id: number;
  itemName: string;
  action: (id: number) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`Delete "${itemName}"?\n\nThis removes it from the website permanently.`)) return;
        startTransition(async () => {
          const res = await action(id);
          if (!res.ok) window.alert(res.error);
          router.refresh();
        });
      }}
      className="text-xs text-red-400 hover:underline disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}

export function DuplicateButton({
  id,
  action,
  editBasePath,
}: {
  id: number;
  action: (id: number) => Promise<ActionResult>;
  editBasePath: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const res = await action(id);
          if (res.ok && res.id) router.push(`${editBasePath}/${res.id}/edit`);
          else if (!res.ok) window.alert(res.error);
        })
      }
      className="text-xs text-gray-300 hover:underline disabled:opacity-50"
    >
      {pending ? "Copying…" : "Duplicate"}
    </button>
  );
}
