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
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-11 w-11 items-center justify-center border border-foreground"
      >
        <span className="text-xl">{isOpen ? "×" : "☰"}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-24 z-50 border-t border-neutral-300 bg-background px-6 py-8 shadow-lg">
          <nav className="flex flex-col">
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