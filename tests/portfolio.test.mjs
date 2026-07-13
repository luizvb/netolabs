import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/projects.ts";

const expectedOrder = [
  "Forge",
  "VOXA",
  "Aquiles",
  "MiseBuy Prep",
  "LegacyBridge",
  "Logr",
  "Benchline",
  "MiseBuy",
  "Pitch Perfect AI",
  "MockData AI",
  "FeedbackFlow",
];

const expectedPublicLinks = new Map([
  ["Forge", "https://forge.netolabs.dev"],
  ["VOXA", "https://voxa.netolabs.dev"],
  ["Aquiles", "https://agent.netolabs.dev"],
  ["MiseBuy Prep", "https://misebuy-prep.netolabs.dev"],
  ["Benchline", "https://evals.netolabs.dev"],
  ["MiseBuy", "https://misebuy.netolabs.dev"],
  ["Pitch Perfect AI", "https://pitch.netolabs.dev"],
  ["MockData AI", "https://mockdata.netolabs.dev"],
  ["FeedbackFlow", "https://feedback.netolabs.dev"],
]);

const expectedNewProjects = {
  Aquiles: {
    kind: "AI development agent",
    lifecycle: "tool",
    description:
      "An end-to-end AI development agent for Codex, from discovery through production.",
    stack: "Next.js / React / Motion",
    href: "https://agent.netolabs.dev",
    github: "https://github.com/luizvb/aquiles-agent",
    image: "/images/projects/aquiles-agent.webp",
  },
  "MiseBuy Prep": {
    kind: "Procurement tool",
    lifecycle: "tool",
    description:
      "Cleans one supplier price list locally into MiseBuy's standard CSV format.",
    stack: "TypeScript / Vite / Browser-local",
    href: "https://misebuy-prep.netolabs.dev",
    github: "https://github.com/luizvb/misebuy-prep",
    image: "/images/projects/misebuy-prep.webp",
  },
  Benchline: {
    kind: "Agent release intelligence",
    lifecycle: "experiment",
    description:
      "Turns agent evidence into repeatable evaluations and explicit release verdicts.",
    stack: "Vite / Fastify / Neon",
    href: "https://evals.netolabs.dev",
    github: undefined,
    image: "/images/projects/benchline.webp",
  },
  MiseBuy: {
    kind: "Restaurant procurement",
    lifecycle: "experiment",
    description:
      "Compares supplier lists, checks pack math, and exports a reviewed buying plan.",
    stack: "React / TypeScript / Vite",
    href: "https://misebuy.netolabs.dev",
    github: "https://github.com/luizvb/misebuy",
    image: "/images/projects/misebuy.webp",
  },
};

const existingProjectContract = {
  VOXA: {
    kind: "Conversation intelligence",
    lifecycle: "focus",
    description:
      "Turns real conversations into clear coaching, insights, and follow-through.",
    stack: "TypeScript / Audio / AI",
    href: "https://voxa.netolabs.dev",
    github: "https://github.com/luizvb/voxa",
  },
  LegacyBridge: {
    kind: "Enterprise infrastructure",
    lifecycle: "tool",
    description:
      "A secure bridge between modern AI agents and legacy REST and SOAP systems.",
    stack: "Go / Redis / LangChain",
    href: undefined,
    github: "https://github.com/luizvb/legacybridge",
  },
  Logr: {
    kind: "Developer tools",
    lifecycle: "tool",
    description:
      "A fast, readable log tailer that makes structured output useful at a glance.",
    stack: "Go / CLI / DevTools",
    href: undefined,
    github: "https://github.com/luizvb/logr",
  },
  "Pitch Perfect AI": {
    kind: "Sales intelligence",
    lifecycle: "experiment",
    description:
      "Creates deeply personalized cold outreach from real prospect context.",
    stack: "Next.js / PGlite / AI",
    href: "https://pitch.netolabs.dev",
    github: "https://github.com/luizvb/pitch-perfect-ai",
  },
  "MockData AI": {
    kind: "Developer platform",
    lifecycle: "experiment",
    description:
      "Generates statistically useful, compliant test data for product teams.",
    stack: "Next.js / PGlite / Playwright",
    href: "https://mockdata.netolabs.dev",
    github: "https://github.com/luizvb/mockdata-ai",
  },
  FeedbackFlow: {
    kind: "Revenue intelligence",
    lifecycle: "experiment",
    description:
      "Finds sentiment, risk, and next actions inside raw customer feedback.",
    stack: "Google ADK / Next.js / AI",
    href: "https://feedback.netolabs.dev",
    github: "https://github.com/luizvb/feedbackflow-ai-mvp",
  },
};

const byName = new Map(projects.map((project) => [project.name, project]));

function projectSubset(project) {
  return {
    kind: project.kind,
    lifecycle: project.lifecycle,
    description: project.description,
    stack: project.stack,
    href: project.href,
    github: project.github,
  };
}

function readSource(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

function readWebpDimensions(relativePath) {
  const buffer = readFileSync(new URL(`../public${relativePath}`, import.meta.url));
  assert.equal(buffer.toString("ascii", 0, 4), "RIFF");
  assert.equal(buffer.toString("ascii", 8, 12), "WEBP");

  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8 ") {
    assert.equal(buffer.toString("hex", 23, 26), "9d012a");
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }

  if (chunk === "VP8X") {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
    };
  }

  throw new Error(`Unsupported WebP chunk ${chunk} in ${relativePath}`);
}

test("portfolio has the approved order, unique inventory, and lifecycle mix", () => {
  assert.deepEqual(
    projects.map(({ name }) => name),
    expectedOrder,
  );
  assert.equal(new Set(projects.map(({ name }) => name)).size, 11);

  const counts = Object.groupBy(projects, ({ lifecycle }) => lifecycle);
  assert.equal(counts.focus?.length, 2);
  assert.equal(counts.tool?.length, 4);
  assert.equal(counts.experiment?.length, 5);
});

test("deployed projects use the exact approved public destinations", () => {
  assert.equal(projects.filter(({ href }) => href).length, 9);

  for (const [name, href] of expectedPublicLinks) {
    const project = byName.get(name);
    assert.ok(project, `${name} must exist`);
    assert.equal(project.href, href);
    assert.match(project.href, /^https:\/\/[a-z0-9-]+\.netolabs\.dev$/);
  }

  for (const name of ["LegacyBridge", "Logr"]) {
    assert.equal(byName.get(name)?.href, undefined);
  }
});

test("new projects match the approved content and visibility contract", () => {
  for (const [name, expected] of Object.entries(expectedNewProjects)) {
    const project = byName.get(name);
    assert.ok(project, `${name} must exist`);
    assert.deepEqual(
      { ...projectSubset(project), image: project.image?.src },
      expected,
    );
  }

  assert.equal(byName.get("Benchline")?.github, undefined);
});

test("Forge copy is refreshed and existing project contracts are preserved", () => {
  const forge = byName.get("Forge");
  assert.ok(forge);
  assert.deepEqual(projectSubset(forge), {
    kind: "AI operations",
    lifecycle: "focus",
    description:
      "Turns business processes, CRM, and knowledge into AI agents for real operations.",
    stack: "TypeScript / Google ADK / Neon",
    href: "https://forge.netolabs.dev",
    github: "https://github.com/luizvb/netolabs-forge",
  });
  assert.equal(forge.image?.src, "/images/projects/forge.webp");

  for (const [name, expected] of Object.entries(existingProjectContract)) {
    const project = byName.get(name);
    assert.ok(project, `${name} must exist`);
    assert.deepEqual(projectSubset(project), expected);
  }
});

test("every public project has one optimized local 16:10 screenshot", () => {
  const publicProjects = projects.filter(({ href }) => href);
  assert.equal(publicProjects.length, 9);
  assert.equal(
    new Set(publicProjects.map(({ image }) => image?.src)).size,
    publicProjects.length,
  );

  for (const project of publicProjects) {
    assert.ok(project.image, `${project.name} must have an image`);
    assert.match(project.image.src, /^\/images\/projects\/[a-z0-9-]+\.webp$/);
    assert.match(project.image.alt, /\S/);
    assert.equal(project.image.width, 1440);
    assert.equal(project.image.height, 900);

    const assetUrl = new URL(`../public${project.image.src}`, import.meta.url);
    const size = statSync(fileURLToPath(assetUrl)).size;
    assert.ok(size <= 350 * 1024, `${project.image.src} exceeds 350 KiB`);
    assert.deepEqual(readWebpDimensions(project.image.src), {
      width: 1440,
      height: 900,
    });
  }

  for (const name of ["LegacyBridge", "Logr"]) {
    assert.equal(byName.get(name)?.image, undefined);
  }
});

test("rendering supports optional actions, accessible links, and reduced motion", () => {
  const component = readSource("src/components/motion-elements.tsx");
  const css = readSource("src/app/globals.css");
  const reducedMotionStart = css.indexOf(
    "@media (prefers-reduced-motion: reduce)",
  );
  const normalMotionCss = css.slice(0, reducedMotionStart);
  const reducedMotionCss = css.slice(reducedMotionStart);

  assert.match(component, /project\.github \? \(/);
  assert.match(component, /aria-label={`\$\{project\.name\} on GitHub`}/);
  assert.match(component, /aria-label={`Open \$\{project\.name\}`}/);
  assert.ok(component.match(/target="_blank"/g)?.length >= 2);
  assert.ok(component.match(/rel="noreferrer"/g)?.length >= 2);
  assert.match(component, /useReducedMotion/);
  assert.match(css, /:focus-visible/);
  assert.ok(reducedMotionStart >= 0);
  assert.match(
    reducedMotionCss,
    /\.project-card\s*\{\s*opacity: 1 !important;\s*transform: none !important;\s*\}/,
  );
  assert.doesNotMatch(normalMotionCss, /opacity: 1 !important/);
  assert.doesNotMatch(normalMotionCss, /transform: none !important/);
});

test("portfolio layout is index-independent and reserves screenshot space", () => {
  const component = readSource("src/components/motion-elements.tsx");
  const css = readSource("src/app/globals.css");

  assert.doesNotMatch(component, /project-card-\$\{/);
  assert.doesNotMatch(css, /\.project-card-\d/);
  assert.match(css, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /grid-template-columns: 1fr/);
  assert.match(css, /aspect-ratio: 16 \/ 10/);
});

test("site metadata, language, navigation anchors, and portfolio snapshot stay stable", () => {
  const layout = readSource("src/app/layout.tsx");
  const page = readSource("src/app/page.tsx");

  assert.match(layout, /metadataBase: new URL\("https:\/\/netolabs\.dev"\)/);
  assert.match(layout, /title: "NetoLabs \| We Build Companies"/);
  assert.match(layout, /alternates: \{ canonical: "\/" \}/);
  assert.match(layout, /openGraph:/);
  assert.match(layout, /twitter:/);
  assert.match(layout, /<html lang="en"/);

  for (const id of ["top", "portfolio", "model", "contact"]) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
  assert.match(page, /Portfolio snapshot · July 2026/);
});
