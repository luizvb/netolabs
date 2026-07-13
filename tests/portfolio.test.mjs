import assert from "node:assert/strict";
import test from "node:test";
import { projects } from "../src/data/projects.ts";

const expectedLinks = new Map([
  ["Forge", "https://forge.netolabs.dev"],
  ["VOXA", "https://voxa.netolabs.dev"],
  ["LegacyBridge", "https://github.com/luizvb/legacybridge"],
  ["Logr", "https://github.com/luizvb/logr"],
  ["Pitch Perfect AI", "https://pitch.netolabs.dev"],
  ["MockData AI", "https://mockdata.netolabs.dev"],
  ["FeedbackFlow", "https://feedback.netolabs.dev"],
]);

test("portfolio keeps one lifecycle and canonical destination per venture", () => {
  assert.equal(projects.length, expectedLinks.size);
  assert.equal(new Set(projects.map(({ name }) => name)).size, projects.length);

  for (const project of projects) {
    assert.match(project.name, /\S/);
    assert.ok(["focus", "tool", "experiment"].includes(project.lifecycle));
    assert.equal(project.href ?? project.github, expectedLinks.get(project.name));
    assert.match(project.github, /^https:\/\/github\.com\/luizvb\//);
  }
});

test("portfolio snapshot contains the intended lifecycle mix", () => {
  const counts = Object.groupBy(projects, ({ lifecycle }) => lifecycle);

  assert.equal(counts.focus?.length, 2);
  assert.equal(counts.tool?.length, 2);
  assert.equal(counts.experiment?.length, 3);
});
