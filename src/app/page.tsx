"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import MobileMenu from "@/components/MobileMenu";
import PageMotion from "@/components/PageMotion";
import ProjectLightbox from "@/components/ProjectLightbox";
import Image from "next/image";
type HomePageFields = {
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  primary_button_text: string;
  primary_button_url: string;
  secondary_button_text: string;
  secondary_button_url: string;

  about_eyebrow: string;
  about_title: string;
  about_description: string;

  services_eyebrow: string;
  services_title: string;
  service_1_title: string;
  service_1_description: string;
  service_2_title: string;
  service_2_description: string;
  service_3_title: string;
  service_3_description: string;
  projects_eyebrow: string;
  projects_title: string;
  project_1_title: string;
  project_1_location: string;
  project_1_category: string;
  project_1_year: string;
  project_2_title: string;
  project_2_location: string;
  project_2_category: string;
  project_2_year: string;
  project_3_title: string;
  project_3_location: string;
  project_3_category: string;
  project_3_year: string;

  why_eyebrow: string;
  why_title: string;
  why_description: string;
  principle_1_title: string;
  principle_1_description: string;
  principle_2_title: string;
  principle_2_description: string;
  principle_3_title: string;
  principle_3_description: string;

  contact_eyebrow: string;
  contact_title: string;
  contact_description: string;
  contact_button_text: string;
  contact_button_url: string;
  contact_email: string;
  office_location: string;
  phone_number: string;
  business_hours: string;
};

type WordPressPage = {
  acf: HomePageFields;
};

const navigation = ["About", "Services", "Projects", "Process"];

const WORDPRESS_API_URL =
  "https://keikoko.website/yoonme/wp-json/wp/v2";

export default function Home() {
  const [content, setContent] = useState<HomePageFields | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      try {
        const response = await fetch(
          `${WORDPRESS_API_URL}/pages?slug=elevora-home&acf_format=standard`,
          {
            cache: "no-store",
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to retrieve ELEVORA content from WordPress. Status: ${response.status}`,
          );
        }

        const pages = (await response.json()) as WordPressPage[];

        if (!pages[0]?.acf) {
          throw new Error("ELEVORA Home Page content was not found.");
        }

        if (!cancelled) {
          setContent(pages[0].acf);
        }
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load ELEVORA content.",
          );
        }
      }
    }

    loadContent();

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <div className="max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-copper">
            ELEVORA
          </p>
          <h1 className="mt-4 font-heading text-3xl font-medium">
            Content could not be loaded
          </h1>
          <p className="mt-4 text-sm leading-7 text-neutral-600">{error}</p>
        </div>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
          Loading ELEVORA...
        </p>
      </main>
    );
  }

  const services = [
    {
      number: "01",
      title: content.service_1_title,
      description: content.service_1_description,
    },
    {
      number: "02",
      title: content.service_2_title,
      description: content.service_2_description,
    },
    {
      number: "03",
      title: content.service_3_title,
      description: content.service_3_description,
    },
  ];

  const projects = [
  {
    number: "01",
    title: content.project_1_title,
    location: content.project_1_location,
    category: content.project_1_category,
    year: content.project_1_year,
    images: [
      {
        src: "/feature_img1.png",
        alt: `${content.project_1_title} exterior`,
        label: "Exterior",
      },
      {
        src: "/aurelia_living.png",
        alt: `${content.project_1_title} living room`,
        label: "Living Room",
      },
      {
        src: "/aurelia_dining.png",
        alt: `${content.project_1_title} dining room`,
        label: "Dining Room",
      },
      {
        src: "/aurelia_bedroom.png",
        alt: `${content.project_1_title} bedroom`,
        label: "Bedroom",
      },
    ],
  },
  {
    number: "02",
    title: content.project_2_title,
    location: content.project_2_location,
    category: content.project_2_category,
    year: content.project_2_year,
    images: [
      {
        src: "/feature_img2.png",
        alt: `${content.project_2_title} exterior`,
        label: "Exterior",
      },
      {
        src: "/vela_living.png",
        alt: `${content.project_2_title} living room`,
        label: "Living Room",
      },
      {
        src: "/vela_dining.png",
        alt: `${content.project_2_title} dining room`,
        label: "Dining Room",
      },
      {
        src: "/vela_bedroom.png",
        alt: `${content.project_2_title} bedroom`,
        label: "Bedroom",
      },
    ],
  },
  {
    number: "03",
    title: content.project_3_title,
    location: content.project_3_location,
    category: content.project_3_category,
    year: content.project_3_year,
    images: [
      {
        src: "/feature_img3.png",
        alt: `${content.project_3_title} exterior`,
        label: "Exterior",
      },
      {
        src: "/harbor_lobby.png",
        alt: `${content.project_3_title} lobby`,
        label: "Lobby",
      },
      {
        src: "/harbor_lounge.png",
        alt: `${content.project_3_title} lounge`,
        label: "Lounge",
      },
      {
        src: "/harbor_terrace.png",
        alt: `${content.project_3_title} terrace`,
        label: "Terrace",
      },
    ],
  },
];

  const principles = [
    {
      number: "01",
      title: content.principle_1_title,
      description: content.principle_1_description,
    },
    {
      number: "02",
      title: content.principle_2_title,
      description: content.principle_2_description,
    },
    {
      number: "03",
      title: content.principle_3_title,
      description: content.principle_3_description,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageMotion />
      <header className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-10">
        <a href="#" className="leading-none">
          <span className="block font-heading text-2xl font-semibold tracking-[0.25em]">
            ELEVORA
          </span>

          <span className="mt-2 block text-[8px] font-semibold tracking-[0.45em] text-copper">
            DEVELOPMENTS
          </span>
        </a>

        <nav className="hidden items-center gap-12 lg:flex">
          {navigation.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm transition-colors hover:text-copper"
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden lg:inline-flex bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-copper"
        >
          Start a Project
        </a>
        <MobileMenu items={navigation} />
      </header>

      {/* Hero */}
      <section
        data-hero-scene
        className="relative overflow-hidden border-l-[14px] border-copper bg-background"
      >
        {/* Copper rail number */}
        <span
          aria-hidden="true"
          className="absolute -left-[13px] top-10 z-30 hidden px-1 text-[10px] font-semibold tracking-[0.25em] text-white [writing-mode:vertical-rl] lg:block"
        >
          01
        </span>

        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 pb-10 pt-8 sm:px-8 sm:pb-14 lg:min-h-[780px] lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-12 lg:px-10 lg:py-14 xl:gap-16">
          {/* Hero content */}
          <div className="relative z-20 flex flex-col">
            <div className="flex flex-1 flex-col justify-center py-10 lg:py-14">
              <p
                data-hero-eyebrow
                className="text-xs font-semibold uppercase tracking-[0.24em] text-copper"
              >
                {content.hero_eyebrow}
              </p>

              <h1
                data-hero-title
                className="mt-8 max-w-[720px] font-heading text-5xl font-medium leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[clamp(4.25rem,5.5vw,6.8rem)]"
              >
                {content.hero_title}
              </h1>

              <p
                data-hero-copy
                className="mt-8 max-w-xl text-base leading-8 text-neutral-600 sm:text-lg"
              >
                {content.hero_description}
              </p>

              <div
                data-hero-actions
                className="mt-10 flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:gap-10"
              >
                <a
                  href={content.primary_button_url}
                  className="bg-copper px-8 py-5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-foreground"
                >
                  {content.primary_button_text}
                </a>

                <a
                  href={content.secondary_button_url}
                  className="border-b border-foreground pb-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-copper hover:text-copper"
                >
                  {content.secondary_button_text} ↗
                </a>
              </div>
            </div>

            <div className="flex justify-between pb-4 pt-8 text-[10px] uppercase tracking-[0.18em] text-neutral-500 lg:pb-0">
              <span>Tokyo · Japan</span>

              <a
                href="#about"
                className="transition-colors hover:text-copper"
              >
                Scroll to discover ↓
              </a>
            </div>
          </div>

          {/* Architecture image */}
          <div
            data-hero-visual
            className="relative min-h-[520px] overflow-hidden bg-stone-beige sm:min-h-[640px] lg:min-h-[760px]"
          >
            <Image
              src="/hero_img.png"
              alt="Modern ELEVORA residential development"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-[1.025]"
            />

            {/* Image contrast overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

            {/* Large project number */}
            <span
              aria-hidden="true"
              className="absolute right-5 top-4 font-heading text-7xl font-semibold leading-none text-white/25 sm:right-8 sm:top-6 sm:text-9xl"
            >
              01
            </span>

            {/* Circular project link */}
            <a
              href="#projects"
              aria-label="View featured projects"
              className="absolute right-5 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-background/90 text-xl text-foreground backdrop-blur-sm transition-all duration-300 hover:rotate-45 hover:border-copper hover:bg-copper hover:text-white sm:right-8 sm:h-16 sm:w-16"
            >
              ↘
            </a>

            {/* Project information strip */}
            <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-2 bg-foreground/95 text-white backdrop-blur-sm sm:grid-cols-4">
              <div className="border-b border-r border-white/15 px-4 py-5 sm:border-b-0 sm:px-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-copper">
                  Featured
                </p>

                <p className="mt-2 text-xs text-white/60">Project 01</p>
              </div>

              <div className="border-b border-white/15 px-4 py-5 sm:border-b-0 sm:border-r sm:px-5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/45">
                  Residence
                </p>

                <p className="mt-2 text-sm">{content.project_1_title}</p>
              </div>

              <div className="border-r border-white/15 px-4 py-5 sm:px-5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/45">
                  Location
                </p>

                <p className="mt-2 text-sm">{content.project_1_location}</p>
              </div>

              <div className="px-4 py-5 sm:px-5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/45">
                  Completion
                </p>

                <p className="mt-2 text-sm">{content.project_1_year}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-neutral-300">
        <Reveal className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-32">
          {/* About Visual */}
          <div className="group relative min-h-[340px] overflow-hidden bg-stone-beige sm:min-h-[440px] lg:min-h-[520px]">
            <Image
              src="/about_img.png"
              alt="Architectural detail representing ELEVORA craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />

            {/* Image overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />

            {/* Information label */}
            <div className="absolute bottom-5 left-5 bg-background/95 px-5 py-4 backdrop-blur-sm sm:bottom-7 sm:left-7 sm:px-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-copper">
                Material · Detail
              </p>

              <p className="mt-2 text-sm text-white">
                Crafted to endure
              </p>
            </div>

            {/* Section number */}
            <span className="absolute bottom-5 right-5 font-heading text-5xl text-white/80 sm:bottom-7 sm:right-7 sm:text-7xl">
              02
            </span>
          </div>

          {/* About Content */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
              {content.about_eyebrow}
            </p>

            <h2 className="mt-6 max-w-xl font-heading text-4xl font-medium leading-[1.08] tracking-[-0.04em] sm:mt-8 sm:text-5xl lg:text-6xl">
              {content.about_title}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600 sm:mt-8 sm:text-lg sm:leading-8 lg:mt-10">
              {content.about_description}
            </p>

            {/* Statistics */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-neutral-300 pt-6 sm:mt-14 sm:gap-8 sm:pt-8">
              <div>
                <strong className="font-heading text-2xl sm:text-3xl">
                  15+
                </strong>
                <p className="mt-2 text-[10px] uppercase tracking-wider text-neutral-500 sm:text-xs">
                  Years
                </p>
              </div>

              <div>
                <strong className="font-heading text-2xl sm:text-3xl">
                  48
                </strong>
                <p className="mt-2 text-[10px] uppercase tracking-wider text-neutral-500 sm:text-xs">
                  Projects
                </p>
              </div>

              <div>
                <strong className="font-heading text-2xl sm:text-3xl">
                  12
                </strong>
                <p className="mt-2 text-[10px] uppercase tracking-wider text-neutral-500 sm:text-xs">
                  Awards
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Services */}
      <section id="services" className="bg-foreground text-background">
        <Reveal
          className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32"
          delay={300}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
            {content.services_eyebrow}
          </p>

          <h2 className="mt-6 max-w-3xl font-heading text-4xl font-medium leading-[1.08] tracking-[-0.04em] sm:mt-8 sm:text-5xl lg:text-6xl">
            {content.services_title}
          </h2>

          <div className="mt-12 grid grid-cols-1 border-t border-white/20 sm:mt-16 lg:mt-20 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.number}
                className="min-h-0 border-b border-white/20 py-10 sm:px-4 lg:min-h-[360px] lg:border-b-0 lg:border-r lg:px-8 lg:py-10 lg:first:border-l"
              >
                <span className="text-xs tracking-[0.2em] text-copper">
                  {service.number}
                </span>

                <h3 className="mt-10 font-heading text-2xl font-medium sm:text-3xl lg:mt-20">
                  {service.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-7 text-white/60 sm:mt-6 sm:text-base">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="bg-background">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <Reveal>
            <div className="flex flex-col items-start gap-8 border-b border-neutral-300 pb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
                  {content.projects_eyebrow}
                </p>

                <h2 className="mt-6 max-w-4xl font-heading text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:mt-8 lg:text-6xl">
                  {content.projects_title}
                </h2>
              </div>

              <a
                href="#contact"
                className="border-b border-foreground pb-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-300 hover:text-copper"
              >
                Start a Project ↗
              </a>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 lg:mt-20 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal
                key={project.number}
                className={index === 0 ? "lg:col-span-2" : ""}
                delay={index * 120}
              >
                <article className="group/card">
                  <ProjectLightbox
                    images={project.images}
                    number={project.number}
                    title={project.title}
                    location={project.location}
                    category={project.category}
                    year={project.year}
                    className={
                      index === 0
                        ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7]"
                        : "aspect-[4/3]"
                    }
                    sizes={
                      index === 0
                        ? "(max-width: 1024px) 100vw, 1440px"
                        : "(max-width: 1024px) 100vw, 50vw"
                    }
                  />

                  <div className="mt-6 flex flex-col gap-5 border-t border-neutral-300 pt-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-heading text-3xl font-medium transition-colors duration-300 group-hover/card:text-copper sm:text-4xl">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-neutral-500">
                        {project.category}
                      </p>
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:text-right">
                      {project.location}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why ELEVORA / Process */}
      <section id="process" className="bg-stone-beige">
        <Reveal
          className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32"
          delay={300}
        >
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
                {content.why_eyebrow}
              </p>

              <h2 className="mt-6 max-w-lg font-heading text-4xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:mt-8 lg:text-6xl">
                {content.why_title}
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8 lg:mt-8">
                {content.why_description}
              </p>
            </div>

            <div className="border-t border-foreground/30">
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  className="group grid grid-cols-1 gap-4 border-b border-foreground/30 py-8 sm:grid-cols-[56px_1fr] sm:gap-6 lg:grid-cols-[80px_1fr_1fr] lg:gap-8 lg:py-10"
                >
                  <span className="text-xs font-semibold tracking-[0.2em] text-copper">
                    {principle.number}
                  </span>

                  <h3 className="font-heading text-xl font-medium transition-colors group-hover:text-copper sm:text-2xl">
                    {principle.title}
                  </h3>

                  <p className="leading-7 text-neutral-600 sm:col-start-2 lg:col-start-auto">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-copper text-white">
        <Reveal className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                {content.contact_eyebrow}
              </p>

              <h2 className="mt-6 max-w-4xl font-heading text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:mt-8 lg:text-7xl">
                {content.contact_title}
              </h2>

              <a
                href={content.contact_button_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex border-b border-white pb-3 font-heading text-xl transition-opacity hover:opacity-70 sm:text-2xl lg:mt-14 lg:text-3xl"
              >
                {content.contact_button_text}
              </a>
            </div>

            <div className="flex flex-col justify-end border-t border-white/30 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="max-w-md text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
                {content.contact_description}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-8 border-t border-white/30 pt-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-1">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                    Office
                  </p>
                  <p className="mt-3 text-lg">{content.office_location}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                    Phone
                  </p>
                  <a
                    href={`tel:${content.phone_number.replace(/[^\d+]/g, "")}`}
                    className="mt-3 block text-lg transition-opacity hover:opacity-60"
                  >
                    {content.phone_number}
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                    Business Hours
                  </p>
                  <p className="mt-3 text-lg">{content.business_hours}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <Reveal
          className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10"
          delay={300}
        >
          <div className="grid grid-cols-1 gap-14 border-b border-white/20 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:py-20">
            <div>
              <a href="#" className="inline-block leading-none">
                <span className="block font-heading text-2xl font-semibold tracking-[0.25em] sm:text-3xl">
                  ELEVORA
                </span>

                <span className="mt-3 block text-[8px] font-semibold tracking-[0.45em] text-copper sm:text-[9px]">
                  DEVELOPMENTS
                </span>
              </a>

              <p className="mt-8 max-w-md leading-7 text-white/60">
                Thoughtful spaces shaped through design, construction, and
                responsible development.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Navigate
                </p>

                <nav className="mt-6 flex flex-col gap-4">
                  {navigation.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="transition-colors hover:text-copper"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Contact
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  <a
                    href={content.contact_button_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all transition-colors hover:text-copper"
                  >
                    {content.contact_email}
                  </a>

                  <a
                    href={`tel:${content.phone_number.replace(/[^\d+]/g, "")}`}
                    className="transition-colors hover:text-copper"
                  >
                    {content.phone_number}
                  </a>

                  <span className="text-white/60">
                    {content.office_location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 py-8 text-xs uppercase tracking-[0.14em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 ELEVORA Developments</p>

            <a href="#" className="transition-colors hover:text-copper">
              Back to Top ↑
            </a>
          </div>
        </Reveal>
      </footer>
    </main>
  );
}