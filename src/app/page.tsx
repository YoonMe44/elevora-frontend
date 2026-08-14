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

        <nav className="flex items-center gap-12">
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
          className="bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-copper"
        >
          Start a Project
        </a>
      </header>

      {/* Hero */}
      <section className="border-l-[14px] border-copper">
        <div className="mx-auto grid min-h-[760px] max-w-[1440px] grid-cols-[0.95fr_1.05fr] gap-16 px-10 py-14">
          <div className="flex flex-col justify-center">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.22em] text-copper">
              {content.hero_eyebrow}
            </p>

            <h1 className="max-w-2xl font-heading text-7xl font-medium leading-[1.05] tracking-[-0.04em]">
              {content.hero_title}
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">
              {content.hero_description}
            </p>

            <div className="mt-12 flex items-center gap-10">
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

          <div className="relative min-h-[650px] overflow-hidden bg-[#d8d3ca]">
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
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-20 px-10 py-32">
          <div className="relative min-h-[520px] overflow-hidden bg-stone-beige">
            <div className="absolute -left-20 bottom-[-120px] h-96 w-96 rounded-full border-[70px] border-copper/70" />
            <div className="absolute right-16 top-16 h-60 w-44 border border-foreground/40" />
            <span className="absolute bottom-10 right-10 font-heading text-8xl text-background/70">
              01
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
              {content.about_eyebrow}
            </p>

            <h2 className="mt-8 max-w-xl font-heading text-6xl font-medium leading-[1.08] tracking-[-0.04em]">
              {content.about_title}
            </h2>

            <p className="mt-10 max-w-xl text-lg leading-8 text-neutral-600">
              {content.about_description}
            </p>

            <div className="mt-14 grid grid-cols-3 border-t border-neutral-300 pt-8">
              <div>
                <strong className="font-heading text-3xl">15+</strong>
                <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                  Years
                </p>
              </div>

              <div>
                <strong className="font-heading text-3xl">48</strong>
                <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                  Projects
                </p>
              </div>

              <div>
                <strong className="font-heading text-3xl">12</strong>
                <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                  Awards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-foreground text-background">
        <div className="mx-auto max-w-[1440px] px-10 py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
            {content.services_eyebrow}
          </p>

          <h2 className="mt-8 max-w-3xl font-heading text-6xl font-medium leading-[1.08] tracking-[-0.04em]">
            {content.services_title}
          </h2>

          <div className="mt-20 grid grid-cols-3 border-t border-white/20">
            {services.map((service) => (
              <article
                key={service.number}
                className="min-h-[360px] border-r border-white/20 px-8 py-10 first:border-l"
              >
                <span className="text-xs tracking-[0.2em] text-copper">
                  {service.number}
                </span>

                <h3 className="mt-20 font-heading text-3xl font-medium">
                  {service.title}
                </h3>

                <p className="mt-6 max-w-sm leading-7 text-white/60">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}