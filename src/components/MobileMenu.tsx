"use client";

import { useState } from "react";

type MobileMenuProps = {
  items: string[];
};

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
        <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="flex h-12 w-12 items-center justify-center border border-foreground text-xl focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-copper"
            >
            {isOpen ? "×" : "☰"}
        </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-24 z-50 border-t border-neutral-300 bg-background px-6 py-8 shadow-lg">
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="flex flex-col"
            >
            {items.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="border-b border-neutral-300 py-5 font-heading text-2xl"
              >
                {item}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-8 bg-foreground px-6 py-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-background"
            >
              Start a Project
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}