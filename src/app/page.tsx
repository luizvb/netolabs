import Image from "next/image";
import { BrandMark } from "@/components/brand-mark";
import {
  ArrowLink,
  HeroVisual,
  ProjectGrid,
  Reveal,
  VentureSteps,
} from "@/components/motion-elements";
import { projects } from "@/data/projects";

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
              A portfolio of focused ventures, useful tools, and bounded
              experiments across applied AI and developer infrastructure.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="lifecycle-legend" aria-label="Portfolio lifecycle legend">
            <p>Portfolio snapshot · July 2026</p>
            <ul>
              <li><span className="lifecycle-dot lifecycle-focus" />Focus · active company building</li>
              <li><span className="lifecycle-dot lifecycle-tool" />Tool · reusable capability</li>
              <li><span className="lifecycle-dot lifecycle-experiment" />Experiment · testing demand</li>
            </ul>
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
