export const projects = [
  {
    name: "Forge",
    kind: "AI operations",
    lifecycle: "focus",
    description:
      "Turns business processes, CRM, and knowledge into AI agents for real operations.",
    stack: "TypeScript / Google ADK / Neon",
    href: "https://forge.netolabs.dev",
    github: "https://github.com/luizvb/netolabs-forge",
    image: {
      src: "/images/projects/forge.webp",
      alt: "Forge operational AI agent builder preview",
      width: 1440,
      height: 900,
    },
    accent: "signal",
  },
  {
    name: "VOXA",
    kind: "Conversation intelligence",
    lifecycle: "focus",
    description:
      "Turns real conversations into clear coaching, insights, and follow-through.",
    stack: "TypeScript / Audio / AI",
    href: "https://voxa.netolabs.dev",
    github: "https://github.com/luizvb/voxa",
    image: {
      src: "/images/projects/voxa.webp",
      alt: "VOXA conversation intelligence landing page",
      width: 1440,
      height: 900,
    },
    accent: "image",
  },
  {
    name: "Aquiles",
    kind: "AI development agent",
    lifecycle: "tool",
    description:
      "An end-to-end AI development agent for Codex, from discovery through production.",
    stack: "Next.js / React / Motion",
    href: "https://agent.netolabs.dev",
    github: "https://github.com/luizvb/aquiles-agent",
    image: {
      src: "/images/projects/aquiles-agent.webp",
      alt: "Aquiles AI development agent landing page",
      width: 1440,
      height: 900,
    },
    accent: "image",
  },
  {
    name: "Benchline",
    kind: "Agent release intelligence",
    lifecycle: "experiment",
    description:
      "Turns agent evidence into repeatable evaluations and explicit release verdicts.",
    stack: "Vite / Fastify / Neon",
    href: "https://evals.netolabs.dev",
    image: {
      src: "/images/projects/benchline.webp",
      alt: "Benchline agent release evaluation preview",
      width: 1440,
      height: 900,
    },
    accent: "image",
  },
  {
    name: "MiseBuy",
    kind: "Restaurant procurement",
    lifecycle: "experiment",
    description:
      "Compares supplier lists, checks pack math, and exports a reviewed buying plan.",
    stack: "React / TypeScript / Vite",
    href: "https://misebuy.netolabs.dev",
    github: "https://github.com/luizvb/misebuy",
    image: {
      src: "/images/projects/misebuy.webp",
      alt: "MiseBuy supplier comparison preview",
      width: 1440,
      height: 900,
    },
    accent: "image",
  },
] as const;
