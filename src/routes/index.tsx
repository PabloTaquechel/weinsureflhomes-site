import { createFileRoute } from "@tanstack/react-router";
import weInsureLogo from "@/assets/we-insure-logo.svg";
import { QuoteDialog } from "@/components/QuoteDialog";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pablo Taquechel — Miami Insurance Agent | We Insure Miami" },
      {
        name: "description",
        content:
          "Home, auto, flood and business insurance in Miami. 15+ years of personal, trusted service from Pablo Taquechel and the We Insure Miami team.",
      },
    ],
  }),
  component: Index,
});

const PHONE = "(305) 259-1910";
const PHONE_HREF = "tel:+13052591910";
const EMAIL = "pablo.taquechel@weinsuregroup.com";
const HERO_IMAGE =
  "https://images-listings.century21.com/FL_FKBOR/61/82/78/_P/618278_P00.jpg?format=webp&quality=85&width=1800";
const PABLO_IMAGE = "/pablo-headshot.jpg";

const coverages = [
  { name: "Home", desc: "Protect what matters most, from roof to foundation." },
  { name: "Flood", desc: "Specialized South Florida flood coverage and NFIP options." },
  { name: "Auto", desc: "Competitive rates across top-rated carriers." },
  { name: "Condo", desc: "HO-6 policies tailored to Miami high-rises." },
  { name: "Renters", desc: "Affordable protection for your belongings." },
  { name: "Business", desc: "General liability, property, commercial auto and more." },
  { name: "Boat & RV", desc: "On-the-water and on-the-road coverage." },
];

const reviews = [
  {
    name: "Jiovanny Gonzalez",
    quote:
      "Pablo and his team are both professional and caring. I was able to secure flood insurance through their office at a very competitive rate. I look forward to doing business with them for years.",
  },
  {
    name: "Kenneth Ross Jr.",
    quote:
      "We Insure is the go-to place for a fair evaluation across many providers. Pablo and his team helped us re-evaluate our auto insurance and got us better coverage on our cars.",
  },
  {
    name: "Stephen Roberson",
    quote:
      "We received 11 no's on our application for renters insurance. We Insure was recommended and they wrote our policy right away. No hassles. Done in 15 minutes. Highly recommended.",
  },
  {
    name: "Kathy D.",
    quote:
      "Awesome experience. Got me a great condo policy within hours of contacting the office. Calls and emails are returned almost immediately.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Team />
      <Coverages />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="container-page flex items-center justify-between py-6">
        <a href="#top" className="flex items-center gap-3 text-primary-foreground">
          <img src={weInsureLogo} alt="We Insure" className="h-8 w-auto" />
          <span className="font-display text-2xl leading-none">Pablo Taquechel</span>
        </a>
        <nav className="hidden gap-8 text-sm text-primary-foreground/85 md:flex">
          <a href="#about" className="hover:text-primary-foreground">
            About
          </a>
          <a href="#coverage" className="hover:text-primary-foreground">
            Coverage
          </a>
          <a href="#team" className="hover:text-primary-foreground">
            Team
          </a>
          <a href="#reviews" className="hover:text-primary-foreground">
            Reviews
          </a>
          <a href="#contact" className="hover:text-primary-foreground">
            Contact
          </a>
        </nav>
        <QuoteDialog
          trigger={
            <button
              type="button"
              className="hidden rounded-full border border-primary-foreground/30 px-4 py-2 text-sm text-primary-foreground transition hover:bg-primary-foreground hover:text-primary md:inline-block"
            >
              Get a quote
            </button>
          }
        />
      </div>
    </header>
  );
}

type TeamMember = {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
};

function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    void fetch("/api/public/team", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: { members: TeamMember[] }) => setMembers(data.members))
      .catch(() => undefined);
  }, []);

  if (members.length === 0) return null;
  return (
    <section id="team" className="border-y border-border bg-card">
      <div className="container-page py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Meet the team</p>
          <h2 className="mt-4 text-4xl leading-tight text-primary md:text-5xl">
            Real people, ready to help.
          </h2>
          <p className="mt-5 text-muted-foreground">
            A local Miami team who will explain your options clearly and stay with you after the
            policy is written.
          </p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <article key={member.id}>
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={`${member.name}, We Insure Miami team member`}
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-secondary font-display text-5xl text-primary">
                  {member.name.charAt(0)}
                </div>
              )}
              <h3 className="mt-5 text-2xl text-primary">{member.name}</h3>
              <a
                href={`mailto:${member.email}`}
                className="mt-1 inline-block break-all text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                {member.email}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <img
        src={HERO_IMAGE}
        alt="Mid-century Miami home at golden hour framed by palm trees"
        width={1600}
        height={1100}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/80 via-primary/55 to-primary/85" />
      <div className="container-page flex min-h-[88vh] flex-col justify-end pb-20 pt-40">
        <p className="text-sm uppercase tracking-[0.25em] text-primary-foreground/75">
          We Insure Florida · Since 2010
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] text-primary-foreground md:text-7xl">
          Florida insurance,
          <br />
          <em className="font-display italic text-accent">tailored to your life.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
          For 15+ years, Pablo Taquechel has helped Miami families and businesses choose coverage
          from the country's top-rated carriers — with the calm, personal service of a neighbor.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <QuoteDialog
            trigger={
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground transition hover:opacity-90"
              >
                Get a free quote
              </button>
            }
          />
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm text-primary-foreground transition hover:bg-primary-foreground/10"
          >
            Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { k: "15+", v: "Years serving Miami" },
    { k: "63+", v: "Five-star Google reviews" },
    { k: "12", v: "Lines of coverage" },
    { k: "Top", v: "Rated carriers, one office" },
  ];
  return (
    <section className="border-y border-border bg-secondary">
      <div className="container-page grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.v}>
            <div className="font-display text-4xl text-primary">{i.k}</div>
            <div className="mt-1 text-sm text-muted-foreground">{i.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="container-page py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-accent/15" />
            <img
              src={PABLO_IMAGE}
              alt="Portrait of Pablo Taquechel, Miami insurance agent"
              width={1760}
              height={2200}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-xl object-cover shadow-[0_30px_60px_-30px_oklch(0.20_0.045_245_/_0.45)]"
            />
            <figcaption className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Pablo Taquechel · Miami, FL
            </figcaption>
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">About</p>
          <h2 className="mt-4 text-4xl leading-tight text-primary md:text-5xl">
            A Miami native who treats clients like family.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Pablo was born in Jacksonville, Florida, and raised in Miami. After earning his BA at
              the University of Florida and an MA from Barry University, he has spent over two
              decades guiding Floridians through one of the most complex insurance markets in the
              country.
            </p>
            <p>
              As a licensed property and casualty agent operating under{" "}
              <span className="text-foreground">We Insure</span>, Pablo and his team give you real
              choice — quotes from dozens of top-rated carriers — paired with the kind of patient,
              plain-English advice that only comes from a local agent who's been doing this since
              2000.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Florida native, raised in Miami",
              "Insurance agent since 2000",
              "Licensed P&C agent",
              "Married, father of two",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-base text-foreground">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Coverages() {
  return (
    <section id="coverage" className="bg-secondary">
      <div className="container-page py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Coverage</p>
            <h2 className="mt-4 max-w-xl text-4xl leading-tight text-primary md:text-5xl">
              Every kind of coverage, under one roof.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Compare options across top-rated carriers. Buy online, over the phone, by email, or in
            person at our Miami office.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {coverages.map((c) => (
            <article
              key={c.name}
              className="group relative bg-background p-8 transition hover:bg-card"
            >
              <div className="font-display text-2xl text-primary">{c.name}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <span className="mt-6 inline-block text-xs uppercase tracking-widest text-accent opacity-0 transition group-hover:opacity-100">
                Request quote →
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="container-page py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Reviews</p>
        <h2 className="mt-4 text-4xl leading-tight text-primary md:text-5xl">
          63+ five-star reviews on Google.
        </h2>
        <p className="mt-5 text-muted-foreground">
          Clients across South Florida share what it's like working with Pablo and the We Insure
          Miami team.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-8"
          >
            <blockquote className="font-display text-2xl leading-snug text-foreground">
              <span className="text-accent">“</span>
              {r.quote}
              <span className="text-accent">”</span>
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-between text-sm">
              <span className="font-medium text-primary">{r.name}</span>
              <span className="flex gap-0.5 text-accent" aria-label="5 stars">
                {"★★★★★"}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://share.google/ZstTllhBg0EJpPJcl"
          target="_blank"
          rel="noreferrer"
          className="text-sm uppercase tracking-widest text-primary underline-offset-4 hover:underline"
        >
          Read all reviews on Google →
        </a>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-primary text-primary-foreground">
      <div className="container-page grid gap-16 py-24 md:grid-cols-2 md:py-32">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Get in touch</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
            Let's build the right
            <br />
            <em className="italic text-accent">coverage together.</em>
          </h2>
          <p className="mt-6 max-w-md text-primary-foreground/75">
            Reach out for a no-pressure quote or a quick policy review. Most clients hear back the
            same day.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <QuoteDialog
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground transition hover:opacity-90"
                >
                  Request a quote
                </button>
              }
            />
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm transition hover:bg-primary-foreground/10"
            >
              Email Pablo
            </a>
          </div>
        </div>

        <dl className="grid gap-10 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">
              Office
            </dt>
            <dd className="mt-3 font-display text-2xl">
              10749 SW 104 Street
              <br />
              Miami, FL 33176
            </dd>
            <a
              href="https://maps.google.com/?q=10749+SW+104+Street+Miami+FL+33176"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-accent underline-offset-4 hover:underline"
            >
              Get directions →
            </a>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">
              Hours
            </dt>
            <dd className="mt-3 font-display text-2xl">
              Mon – Fri
              <br />
              9:00 AM – 5:00 PM
            </dd>
            <p className="mt-2 text-sm text-primary-foreground/65">Weekends by appointment</p>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">
              Phone
            </dt>
            <dd className="mt-3 font-display text-2xl">
              <a href={PHONE_HREF} className="hover:text-accent">
                {PHONE}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">
              Email
            </dt>
            <dd className="mt-3 break-words font-display text-xl">
              <a href={`mailto:${EMAIL}`} className="hover:text-accent">
                {EMAIL}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground/70">
      <div className="container-page flex flex-col gap-4 border-t border-primary-foreground/15 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Pablo Taquechel · We Insure Miami</p>
        <p>
          An independent agency of{" "}
          <a
            href="https://weinsuregroup.com"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            We Insure
          </a>
          .
        </p>
        <a
          href="/admin"
          aria-label="Open insurance site admin"
          className="inline-flex w-fit items-center justify-center rounded-full border border-primary-foreground/30 px-4 py-2 text-xs font-medium uppercase tracking-widest text-primary-foreground transition hover:bg-primary-foreground hover:text-primary"
        >
          Admin
        </a>
      </div>
    </footer>
  );
}
