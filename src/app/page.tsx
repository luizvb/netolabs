import Image from "next/image";
import { BrandMark } from "@/components/brand-mark";
import {
  ArrowLink,
  HeroVisual,
  ProjectGrid,
  Reveal,
  VentureSteps,
} from "@/components/motion-elements";

const projects = [
  {
    name: "Forge",
    kind: "AI infrastructure",
    description:
      "Build, ground, and evaluate dependable AI agents with Google ADK.",
    stack: "TypeScript / Google ADK / Neon",
    href: "https://forge.netolabs.dev",
    github: "https://github.com/luizvb/netolabs-forge",
    accent: "signal",
  },
  {
    name: "VOXA",
    kind: "Conversation intelligence",
    description:
      "Turns real conversations into clear coaching, insights, and follow-through.",
    stack: "TypeScript / Audio / AI",
    href: "https://voxa.netolabs.dev",
    github: "https://github.com/luizvb/voxa",
    accent: "image",
  },
  {
    name: "LegacyBridge",
    kind: "Enterprise infrastructure",
    description:
      "A secure bridge between modern AI agents and legacy REST and SOAP systems.",
    stack: "Go / Redis / LangChain",
    github: "https://github.com/luizvb/legacybridge",
    accent: "lines",
  },
  {
    name: "Logr",
    kind: "Developer tools",
    description:
      "A fast, readable log tailer that makes structured output useful at a glance.",
    stack: "Go / CLI / DevTools",
    github: "https://github.com/luizvb/logr",
    accent: "mono",
  },
  {
    name: "Pitch Perfect AI",
    kind: "Sales intelligence",
    description:
      "Creates deeply personalized cold outreach from real prospect context.",
    stack: "Next.js / PGlite / AI",
    href: "https://pitch.netolabs.dev",
    github: "https://github.com/luizvb/pitch-perfect-ai",
    accent: "wave",
  },
  {
    name: "MockData AI",
    kind: "Developer platform",
    description:
      "Generates statistically useful, compliant test data for product teams.",
    stack: "Next.js / PGlite / Playwright",
    href: "https://mockdata.netolabs.dev",
    github: "https://github.com/luizvb/mockdata-ai",
    accent: "grid",
  },
  {
    name: "FeedbackFlow",
    kind: "Revenue intelligence",
    description:
      "Finds sentiment, risk, and next actions inside raw customer feedback.",
    stack: "Google ADK / Next.js / AI",
    href: "https://feedback.netolabs.dev",
    github: "https://github.com/luizvb/feedbackflow-ai-mvp",
    accent: "orbit",
  },
] as const;

const steps = [
  {
    title: "Ideas start inside",
    body: "We originate opportunities from observed problems, technical shifts, and underserved markets.",
  },
  {
    title: "Specialists stay shared",
    body: "Design, engineering, operations, finance, and growth work across the portfolio as one compound team.",
  },
  {
    title: "Operators become co-founders",
    body: "We recruit the right executives to lead each company and build ownership from day one.",
  },
  {
    title: "Evidence decides quickly",
    body: "We prototype, test, and stop weak ideas early so the strongest companies receive more energy.",
  },
] as const;

export default function Home() {
  return (
    <main>
      <header className="nav-shell">
        <a className="brand-link" href="#top" aria-label="NetoLabs home">
          <BrandMark />
          <span>NetoLabs</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#portfolio">Portfolio</a>
          <a href="#model">Model</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <Reveal>
            <p className="eyebrow">Venture builder by Luiz Neto</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1>We build companies.</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="hero-subtitle">
              From first insight to an independent company, we build the whole
              operating system.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="hero-actions">
              <ArrowLink href="#portfolio">Explore ventures</ArrowLink>
              <a className="text-link" href="#model">
                How we build
              </a>
            </div>
          </Reveal>
        </div>
        <HeroVisual />
      </section>

      <section className="thesis-strip" aria-label="NetoLabs operating thesis">
        <p>CONCEIVE</p>
        <span aria-hidden="true" />
        <p>ASSEMBLE</p>
        <span aria-hidden="true" />
        <p>BUILD</p>
        <span aria-hidden="true" />
        <p>OPERATE</p>
        <span aria-hidden="true" />
        <p>SPIN OUT</p>
      </section>

      <section className="portfolio-section" id="portfolio">
        <Reveal>
          <div className="section-heading stacked-heading">
            <h2>Built in the lab.<br />Tested in the world.</h2>
            <p>
              A working portfolio across AI infrastructure, developer tools,
              conversation intelligence, and revenue operations.
            </p>
          </div>
        </Reveal>
        <ProjectGrid projects={projects} />
      </section>

      <section className="manifesto" id="model">
        <Reveal>
          <p>
            NetoLabs conceives the idea, assembles the founding team, develops
            the product, and runs the operation until the new company can move
            forward on its own.
          </p>
        </Reveal>
      </section>

      <section className="process-section">
        <div className="process-image-wrap">
          <Image
            src="/images/netolabs-team-workshop.webp"
            alt="A multidisciplinary product team working around a prototype table"
            fill
            sizes="(max-width: 768px) 100vw, 54vw"
            className="process-image"
          />
        </div>
        <VentureSteps steps={steps} />
      </section>

      <section className="independence-section">
        <Reveal>
          <div className="independence-mark" aria-hidden="true">
            <BrandMark />
          </div>
          <h2>The goal is independence.</h2>
          <p>
            We stay close through formation, product-market learning, and early
            operations. Then the company earns the space to become fully its own.
          </p>
        </Reveal>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Build with NetoLabs</p>
          <h2>Founders, operators, and sharp problems welcome.</h2>
        </div>
        <ArrowLink href="mailto:hello@netolabs.dev">Start a conversation</ArrowLink>
      </section>

      <footer>
        <div className="footer-brand">
          <BrandMark />
          <span>NetoLabs</span>
        </div>
        <p>A venture builder founded by Luiz Neto.</p>
        <a href="https://github.com/luizvb" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </main>
  );
}
