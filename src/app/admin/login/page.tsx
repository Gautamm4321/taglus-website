"use client";

import { useActionState } from "react";
import { login } from "../../actions/authActions";
import { buttonPrimary, ErrorBanner, inputClass } from "../components/ui";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        action={formAction}
        className="w-full max-w-sm space-y-5 rounded-xl border border-white/10 bg-[#0b1329] p-8 shadow-xl"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#E8DCC8]">Taglus CMS</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to manage the website.</p>
        </div>

        <ErrorBanner message={state?.error ?? null} />

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="username" className={inputClass} />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={inputClass}
          />
        </div>

        <button type="submit" disabled={pending} className={`${buttonPrimary} w-full`}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
