"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
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

const subscribe = () => () => {};

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
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

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
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft" && images.length > 1) {
        previousImage();
      }

      if (event.key === "ArrowRight" && images.length > 1) {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    closeLightbox,
    images.length,
    isOpen,
    nextImage,
    previousImage,
  ]);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];

  const openLightbox = () => {
    setActiveIndex(0);
    setIsOpen(true);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || images.length < 2) return;

    const distance =
      event.changedTouches[0].clientX - touchStartX.current;

    if (distance > 50) {
      previousImage();
    }

    if (distance < -50) {
      nextImage();
    }

    touchStartX.current = null;
  };

  const modal =
    mounted && isOpen
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} project gallery`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171717]/95 p-4 text-white md:p-8"
            onClick={closeLightbox}
          >
            <div
              className="grid h-full max-h-[900px] w-full max-w-[1500px] overflow-hidden border border-white/10 bg-[#171717] lg:grid-cols-[1fr_380px]"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="relative min-h-[55vh] overflow-hidden bg-black"
                onTouchStart={(event) => {
                  touchStartX.current = event.touches[0].clientX;
                }}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-copper">
                      {activeImage.label}
                    </p>

                    <p className="mt-2 font-heading text-lg">
                      {title}
                    </p>
                  </div>

                  <p className="text-xs tracking-[0.18em] text-white/70">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </p>
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousImage}
                      aria-label="Previous image"
                      className="absolute left-5 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center border border-white/40 bg-black/20 text-xl transition-colors hover:bg-white hover:text-black"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-5 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center border border-white/40 bg-black/20 text-xl transition-colors hover:bg-white hover:text-black"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              <aside className="flex flex-col overflow-y-auto p-6 md:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
                      Project {number}
                    </p>

                    <h2 className="mt-6 font-heading text-4xl font-medium">
                      {title}
                    </h2>

                    <p className="mt-5 text-lg text-white/55">
                      {category}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeLightbox}
                    aria-label="Close gallery"
                    className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/30 text-xl transition-colors hover:bg-white hover:text-black"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-10 space-y-5 border-t border-white/15 pt-8">
                  <div className="flex items-center justify-between gap-6">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                      Location
                    </span>

                    <span className="text-sm">{location}</span>
                  </div>

                  <div className="flex items-center justify-between gap-6">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                      Completion
                    </span>

                    <span className="text-sm">{year}</span>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-3">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={`${image.src}-${index}`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`View image ${index + 1}`}
                      className={`group/thumb relative aspect-square overflow-hidden border ${
                        activeIndex === index
                          ? "border-copper"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="120px"
                        className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                      />
                    </button>
                  ))}
                </div>

                <p className="mt-auto pt-10 text-[10px] uppercase leading-6 tracking-[0.2em] text-white/30">
                  Use arrows, thumbnails, keyboard, or swipe to explore.
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
        className={`group relative block w-full cursor-zoom-in overflow-hidden bg-[#d8d3ca] text-left ${className}`}
      >
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

        <span className="absolute left-5 top-5 text-xs font-semibold tracking-[0.2em] text-white">
          {number}
        </span>

        <span className="absolute right-5 top-5 bg-copper px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors group-hover:bg-foreground">
          View Gallery ↗
        </span>

        <div className="absolute bottom-0 left-0 bg-foreground px-6 py-5 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-copper">
            Featured Project
          </p>

          <p className="mt-2 font-heading text-lg">{title}</p>
        </div>

        <span className="absolute bottom-5 right-5 text-xs font-semibold tracking-[0.2em] text-white">
          {year}
        </span>
      </button>

      {modal}
    </>
  );
}