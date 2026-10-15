import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "./session";

export async function isAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Call at the start of EVERY server action that changes data. */
export async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}

/** Call at the top of every admin page (second line of defence after middleware). */
export async function requireAdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
}
