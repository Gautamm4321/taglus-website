'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    document.documentElement.classList.add('has-custom-cursor');
    return () => document.documentElement.classList.remove('has-custom-cursor');
  }, []);

  useEffect(() => {
    // Initial center alignment
    gsap.set(dotRef.current, { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const render = () => {
      // GPU accelerated direct update
      gsap.set(dotRef.current, { x: mousePos.current.x, y: mousePos.current.y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    gsap.ticker.add(render);

    const handleMouseDown = () => {
      gsap.to(dotRef.current, { scale: 0.85, duration: 0.15, ease: 'power2.out' });
    };
    const handleMouseUp = () => {
      gsap.to(dotRef.current, { scale: 1, duration: 0.15, ease: 'power2.out' });
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(render);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Hover detection for buttons, links, cards, tabs, and interactive items
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], .glass-box, .group, table tr'
      );

      if (isInteractive) {
        // Expanded luxury glowing sun state (image 2)
        gsap.to(dotRef.current, {
          scale: 2.8,
          duration: 0.25,
          ease: 'power2.out',
          boxShadow: '0 0 24px 8px rgba(232, 220, 200, 0.85), 0 0 45px 14px rgba(232, 220, 200, 0.45)',
        });
      } else {
        // Normal refined small dot (image 1)
        gsap.to(dotRef.current, {
          scale: 1,
          duration: 0.25,
          ease: 'power2.out',
          boxShadow: '0 0 10px 2px rgba(232, 220, 200, 0.7), 0 0 20px 4px rgba(232, 220, 200, 0.3)',
        });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <div
      ref={dotRef}
      className="hidden md:block fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[99999] bg-[#E8DCC8] shadow-[0_0_10px_2px_rgba(232,220,200,0.7),0_0_20px_4px_rgba(232,220,200,0.3)]"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      aria-hidden="true"
    />
  );
}