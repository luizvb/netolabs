"use client";

import Image from "next/image";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <motion.a
      className="arrow-link"
      href={href}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{children}</span>
      <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
    </motion.a>
  );
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const y = useSpring(rawY, { stiffness: 90, damping: 24 });

  return (
    <motion.div
      ref={ref}
      className="hero-visual"
      style={reduce ? undefined : { y }}
    >
      <Image
        src="/images/netolabs-venture-lab.webp"
        alt="A sculptural venture laboratory branching into several product ecosystems"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 56vw"
        className="hero-image"
      />
      <div className="hero-visual-caption">
        <span>One studio</span>
        <span>Many companies</span>
      </div>
    </motion.div>
  );
}

type Project = {
  readonly name: string;
  readonly kind: string;
  readonly lifecycle: "focus" | "tool" | "experiment";
  readonly description: string;
  readonly stack: string;
  readonly href?: string;
  readonly github: string;
  readonly accent: string;
};

export function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <motion.article
          className={`project-card project-card-${index + 1}`}
          key={project.name}
          initial={reduce ? false : { opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{
            duration: 0.65,
            delay: (index % 3) * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={reduce ? undefined : { y: -6 }}
        >
          <div className={`project-art art-${project.accent}`} aria-hidden="true">
            {project.accent === "image" ? (
              <Image
                src="/images/voxa-og.webp"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            ) : (
              <span>{project.name.slice(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div className="project-body">
            <div className="project-topline">
              <div className="project-meta">
                <p>{project.kind}</p>
                <span className={`project-lifecycle lifecycle-${project.lifecycle}`}>
                  {project.lifecycle}
                </span>
              </div>
              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} on GitHub`}
                >
                  <GithubLogo size={19} weight="regular" />
                </a>
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.name}`}
                  >
                    <ArrowUpRight size={19} weight="bold" />
                  </a>
                ) : null}
              </div>
            </div>
            <h3>{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <p className="project-stack">{project.stack}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export function VentureSteps({
  steps,
}: {
  steps: readonly { readonly title: string; readonly body: string }[];
}) {
  const reduce = useReducedMotion();
  return (
    <div className="venture-steps">
      <Reveal>
        <h2>How it works in practice</h2>
      </Reveal>
      {steps.map((step) => (
        <motion.div
          className="venture-step"
          key={step.title}
          initial={reduce ? false : { y: 28 }}
          whileInView={{ y: 0 }}
          viewport={{ once: false, amount: 0.65 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
