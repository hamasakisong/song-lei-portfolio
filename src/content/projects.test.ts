import { projects } from "./projects";

it("keeps the approved project order", () => {
  expect(projects.map((project) => project.slug)).toEqual([
    "saas-experience",
    "payment",
    "lifecaregarden",
    "jpnms",
    "home-information-management-system",
  ]);
});

it("gives every interview case a complete decision narrative", () => {
  for (const project of projects.filter((item) => item.variant === "case")) {
    expect(project.problem.length).toBeGreaterThan(35);
    expect(project.role).toMatch(/负责|完成|主导/);
    expect(project.decisions).toHaveLength(3);
    expect(project.outcome).toHaveLength(3);
    expect(project.reflection.length).toBeGreaterThan(25);
  }
});

it("provides a recruiter summary and evidence section for every case", () => {
  for (const project of projects) {
    expect(project.summary.length).toBeGreaterThan(30);
    expect(project.decisions.length).toBeGreaterThan(0);
  }
});
