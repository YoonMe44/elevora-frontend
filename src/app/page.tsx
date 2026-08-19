import Reveal from "@/components/Reveal";
import MobileMenu from "@/components/MobileMenu";
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

async function getHomePageContent(): Promise<HomePageFields> {
  const apiUrl = process.env.WORDPRESS_API_URL;

  if (!apiUrl) {
    throw new Error("WORDPRESS_API_URL is not defined.");
  }

  const response = await fetch(
    `${apiUrl}/pages?slug=elevora-home&acf_format=standard`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to retrieve ELEVORA content from WordPress.");
  }

  const pages = (await response.json()) as WordPressPage[];

  if (!pages[0]?.acf) {
    throw new Error("ELEVORA Home Page content was not found.");
  }

  return pages[0].acf;
}

export default async function Home() {
  const content = await getHomePageContent();

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
      background: "#cbbba7",
    },
    {
      number: "02",
      title: content.project_2_title,
      location: content.project_2_location,
      category: content.project_2_category,
      year: content.project_2_year,
      background: "#d8d3ca",
    },
    {
      number: "03",
      title: content.project_3_title,
      location: content.project_3_location,
      category: content.project_3_category,
      year: content.project_3_year,
      background: "#b99070",
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
      <section className="border-l-[14px] border-copper">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-10 sm:px-8 lg:min-h-[760px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-10 lg:py-14">
          <div className="flex flex-col justify-center">
            <p className="mb-8 animate-fade-up text-xs font-semibold uppercase tracking-[0.22em] text-copper">
              {content.hero_eyebrow}
            </p>

            <h1 className="max-w-2xl font-heading text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
              {content.hero_title}
            </h1>

            <p className="mt-8 max-w-xl animate-fade-up animation-delay-300 text-lg leading-8 text-neutral-600">
              {content.hero_description}
            </p>

            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10 lg:mt-12">
              <a
                href={content.primary_button_url}
                className="bg-copper px-8 py-5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-foreground"
              >
                {content.primary_button_text}
              </a>

              <a
                href={content.secondary_button_url}
                className="border-b border-foreground pb-2 text-xs font-semibold uppercase tracking-[0.14em]"
              >
                {content.secondary_button_text} ↗
              </a>
            </div>

            <div className="mt-auto flex justify-between pt-16 text-xs uppercase tracking-[0.14em] text-neutral-500">
              <span>Tokyo · Japan</span>
              <span>Scroll to discover ↓</span>
            </div>
          </div>

          <div className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-[650px] animate-fade-up animation-delay-200 overflow-hidden bg-[#d8d3ca]">
            <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-[#ebe7df]" />

            <div className="absolute bottom-0 left-[20%] h-[80%] w-[62%] bg-[#2c2c2a] [clip-path:polygon(18%_10%,50%_0,82%_10%,100%_100%,0_100%)]">
              <div className="absolute inset-x-[18%] bottom-[8%] top-[25%] bg-[#686967]">
                <div className="grid h-full grid-cols-2 gap-3 p-5">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div
                      key={index}
                      className="border border-[#9e978b] bg-[#c89c6e]"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 bg-foreground px-7 py-5 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-beige">
                Featured
              </p>
              <p className="mt-2 text-sm">Aurelia Residences</p>
            </div>

            <span className="absolute bottom-4 right-5 font-heading text-4xl text-copper">
              01
            </span>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-neutral-300">
        <Reveal className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-32">
          {/* About Visual */}
          <div className="relative min-h-[340px] overflow-hidden bg-stone-beige sm:min-h-[440px] lg:min-h-[520px]">
            <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-[45px] border-copper/70 sm:-bottom-28 sm:-left-20 sm:h-80 sm:w-80 sm:border-[60px] lg:-bottom-[120px] lg:h-96 lg:w-96 lg:border-[70px]" />

            <div className="absolute right-8 top-8 h-40 w-28 border border-foreground/40 sm:right-12 sm:top-12 sm:h-52 sm:w-36 lg:right-16 lg:top-16 lg:h-60 lg:w-44" />

            <span className="absolute bottom-6 right-6 font-heading text-6xl text-background/70 sm:bottom-8 sm:right-8 sm:text-7xl lg:bottom-10 lg:right-10 lg:text-8xl">
              01
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
        <Reveal className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
                {content.projects_eyebrow}
              </p>

              <h2 className="mt-6 max-w-3xl font-heading text-4xl font-medium leading-[1.08] tracking-[-0.04em] sm:mt-8 sm:text-5xl lg:text-6xl">
                {content.projects_title}
              </h2>
            </div>

            <a
              href="#contact"
              className="shrink-0 border-b border-foreground pb-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-copper"
            >
              Start a Project ↗
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-y-14 sm:mt-16 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 lg:mt-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            {projects.map((project, index) => (
              <article
                key={project.number}
                className={`group ${
                  index === 0
                    ? "sm:col-span-2 lg:col-span-7"
                    : index === 1
                      ? "sm:col-span-1 lg:col-span-5 lg:mt-24"
                      : "sm:col-span-1 lg:col-span-5 lg:col-start-8"
                }`}
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ backgroundColor: project.background }}
                >
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-background/50 sm:-right-16 sm:-top-16 sm:h-64 sm:w-64" />

                  <div className="absolute inset-x-[18%] bottom-0 h-[72%] bg-foreground transition-transform duration-500 group-hover:-translate-y-2 lg:group-hover:-translate-y-3">
                    <div className="grid h-full grid-cols-3 gap-2 p-3 sm:gap-3 sm:p-5">
                      {Array.from({ length: 12 }).map((_, windowIndex) => (
                        <div
                          key={windowIndex}
                          className="border border-white/20 bg-copper/70"
                        />
                      ))}
                    </div>
                  </div>

                  <span className="absolute left-4 top-4 text-[10px] font-semibold tracking-[0.2em] sm:left-6 sm:top-6 sm:text-xs">
                    {project.number}
                  </span>

                  <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.14em] sm:bottom-6 sm:right-6 sm:text-xs">
                    {project.year}
                  </span>
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-neutral-300 pt-4 sm:mt-6 sm:flex-row sm:items-start sm:justify-between sm:pt-5">
                  <div>
                    <h3 className="font-heading text-2xl font-medium sm:text-3xl">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm text-neutral-500">
                      {project.category}
                    </p>
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 sm:text-right sm:text-xs">
                    {project.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
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