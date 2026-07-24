import { projects } from "./projects";

it("keeps the approved project order", () => {
  expect(projects.map((project) => project.slug)).toEqual([
    "payment",
    "lifecaregarden",
    "home-information-management-system",
    "jpnms",
    "saas-experience",
  ]);
});

it("provides a recruiter summary and evidence section for every case", () => {
  for (const project of projects) {
    expect(project.summary.length).toBeGreaterThan(30);
    expect(project.decisions.length).toBeGreaterThan(0);
  }
});
