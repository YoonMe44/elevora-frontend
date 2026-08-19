"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PageMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        // Hero entrance animation
        gsap
          .timeline({
            defaults: {
              ease: "power3.out",
            },
          })
          .from("[data-hero-eyebrow]", {
            y: 18,
            autoAlpha: 0,
            duration: 0.6,
          })
          .from(
            "[data-hero-title]",
            {
              y: 72,
              autoAlpha: 0,
              duration: 1,
            },
            "-=0.3",
          )
          .from(
            "[data-hero-copy]",
            {
              y: 32,
              autoAlpha: 0,
              duration: 0.75,
            },
            "-=0.55",
          )
          .from(
            "[data-hero-actions]",
            {
              y: 24,
              autoAlpha: 0,
              duration: 0.7,
            },
            "-=0.45",
          )
          .from(
            "[data-hero-visual]",
            {
              scale: 0.94,
              autoAlpha: 0,
              duration: 1.15,
            },
            "-=0.9",
          );

        // Building scroll movement
        gsap.to("[data-hero-building]", {
          yPercent: -8,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero-scene]",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Background circle movement
        gsap.to("[data-hero-orb]", {
          yPercent: 28,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero-scene]",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return null;
}