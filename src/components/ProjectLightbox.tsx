"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { createPortal } from "react-dom";

export type ProjectGalleryImage = {
  src: string;
  alt: string;
  label: string;
};

type ProjectLightboxProps = {
  images: ProjectGalleryImage[];
  number: string;
  title: string;
  location: string;
  category: string;
  year: string;
  className?: string;
  sizes?: string;
};

export default function ProjectLightbox({
  images,
  number,
  title,
  location,
  category,
  year,
  className = "aspect-[4/3]",
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: ProjectLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const previousImage = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }, [images.length]);

  const nextImage = useCallback(() => {
    setActiveIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft" && images.length > 1) previousImage();
      if (event.key === "ArrowRight" && images.length > 1) nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, images.length, isOpen, nextImage, previousImage]);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];

  const openLightbox = () => {
    setActiveIndex(0);
    setIsOpen(true);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || images.length < 2) return;

    const distance = event.changedTouches[0].clientX - touchStartX.current;

    if (distance > 50) previousImage();
    if (distance < -50) nextImage();

    touchStartX.current = null;
  };

  const modal =
    mounted && isOpen
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} project gallery`}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6 lg:p-10"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeLightbox();
            }}
          >
            <div className="grid max-h-[94vh] w-full max-w-[1600px] overflow-hidden bg-[#171717] text-white shadow-2xl lg:grid-cols-[minmax(0,1fr)_380px]">
              <div
                className="relative min-h-[52vh] overflow-hidden bg-black sm:min-h-[68vh] lg:min-h-[84vh]"
                onTouchStart={(event) => {
                  touchStartX.current = event.changedTouches[0].clientX;
                }}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover object-center"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousImage}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/50 bg-black/35 text-2xl transition hover:bg-copper sm:left-6 sm:h-14 sm:w-14"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/50 bg-black/35 text-2xl transition hover:bg-copper sm:right-6 sm:h-14 sm:w-14"
                    >
                      →
                    </button>
                  </>
                )}

                <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-5 sm:p-7">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-copper">
                      {activeImage.label}
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      {title}
                    </p>
                  </div>

                  <p className="text-xs tracking-[0.2em] text-white/70">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </p>
                </div>
              </div>

              <aside className="relative max-h-[42vh] overflow-y-auto border-t border-white/15 p-6 lg:max-h-[94vh] lg:border-l lg:border-t-0 lg:p-8">
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close gallery"
                  className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-white/30 text-xl transition hover:border-copper hover:bg-copper lg:right-7 lg:top-7"
                >
                  ×
                </button>

                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-copper">
                  Project {number}
                </p>

                <h3 className="mt-8 max-w-[260px] font-heading text-4xl font-medium leading-tight">
                  {title}
                </h3>

                <p className="mt-5 text-white/55">{category}</p>

                <dl className="mt-10 space-y-5 border-t border-white/15 pt-7 text-sm">
                  <div className="flex justify-between gap-5">
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      Location
                    </dt>
                    <dd className="text-right">{location}</dd>
                  </div>

                  <div className="flex justify-between gap-5">
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      Completion
                    </dt>
                    <dd>{year}</dd>
                  </div>
                </dl>

                <div className="mt-10 grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`View ${image.label}`}
                      className={`group/thumb relative aspect-square overflow-hidden border transition ${
                        activeIndex === index
                          ? "border-copper"
                          : "border-transparent opacity-55 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="120px"
                        className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                      />
                    </button>
                  ))}
                </div>

                <p className="mt-7 text-[9px] uppercase leading-5 tracking-[0.18em] text-white/35">
                  Use arrows, thumbnails, keyboard keys, or swipe to explore.
                </p>
              </aside>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={openLightbox}
        aria-label={`Open ${title} project gallery`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden bg-stone-beige text-left ${className}`}
      >
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          sizes={sizes}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />

        <span className="absolute left-5 top-5 text-xs font-semibold tracking-[0.22em] text-white sm:left-7 sm:top-7">
          {number}
        </span>

        <span className="absolute bottom-5 right-5 text-xs font-semibold tracking-[0.22em] text-white sm:bottom-7 sm:right-7">
          {year}
        </span>

        <span className="absolute right-5 top-5 border border-white/70 bg-background/90 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground opacity-100 backdrop-blur-sm transition-all duration-300 group-hover:bg-copper group-hover:text-white sm:right-7 sm:top-7 lg:opacity-0 lg:group-hover:opacity-100">
          View Gallery ↗
        </span>

        <div className="absolute bottom-0 left-0 hidden bg-foreground/95 px-7 py-5 text-white backdrop-blur-sm sm:block">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-copper">
            Featured Project
          </p>
          <p className="mt-2 text-sm">{title}</p>
        </div>
      </button>

      {modal}
    </>
  );
}