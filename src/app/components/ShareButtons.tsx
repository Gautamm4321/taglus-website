"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

const icon = { viewBox: "0 0 24 24", className: "h-[17px] w-[17px]", fill: "currentColor", "aria-hidden": true } as const;

/** Share an article on LinkedIn, WhatsApp, X or copy its link. */
export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      svg: (
        <svg {...icon}>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-1.8 3.77-1.8 4.03 0 4.37 2.4 4.37 5.5v5.8h-4v-5.15c0-1.23-.02-2.8-1.8-2.8-1.8 0-2.2 1.3-2.2 2.7v5.25h-4v-11Z" />
        </svg>
      ),
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${t}%20${u}`,
      svg: (
        <svg {...icon}>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .78.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.24-.64.8-.78.96-.15.17-.29.19-.54.07-.25-.13-1.04-.39-1.98-1.23-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31c-.23.25-.86.85-.86 2.06 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.6.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.17-.48-.29Z" />
        </svg>
      ),
    },
    {
      label: "Share on X",
      href: `https://x.com/intent/post?url=${u}&text=${t}`,
      svg: (
        <svg {...icon} className="h-[15px] w-[15px]">
          <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z" />
        </svg>
      ),
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  }

  const btn =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E8DCC8]/20 text-[#E8DCC8] transition-colors hover:border-sky-400 hover:text-sky-300";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-widest text-[#E8DCC8]/60">Share</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} title={l.label} className={btn}>
          {l.svg}
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" title="Copy link" className={btn}>
        {copied ? <Check className="h-4 w-4 text-sky-300" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
      </button>
      <span role="status" className="text-xs text-sky-300">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
