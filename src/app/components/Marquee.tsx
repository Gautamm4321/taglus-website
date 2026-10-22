import { Fragment } from "react";

/** Endless scrolling ribbon of words (pure CSS, pauses on hover). */
export default function Marquee({
  items,
  speed = 40,
  reverse = false,
  className = "",
}: {
  items: string[];
  /** seconds for one full loop */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <Fragment key={i}>
          <span className="px-6 sm:px-10 whitespace-nowrap">{t}</span>
          <span className="text-sky-400/70">✦</span>
        </Fragment>
      ))}
    </div>
  );
  return (
    <div
      className={`marquee relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] ${className}`}
      data-no-reveal
    >
      <div className="marquee-track" data-reverse={reverse} style={{ ["--marquee-speed" as string]: `${speed}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
