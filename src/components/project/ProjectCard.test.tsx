import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { projects } from "../../content/projects";
import { ProjectCard } from "./ProjectCard";

it("adds a decorative meteor path to every clickable project card", () => {
  const { container } = render(
    <MemoryRouter><ProjectCard project={projects[0]} /></MemoryRouter>,
  );

  const overlay = container.querySelector(".project-card__star-border");
  expect(overlay).toHaveAttribute("aria-hidden", "true");
  expect(overlay?.querySelectorAll(".project-card__star-rail")).toHaveLength(2);
  expect(overlay?.querySelector(".project-card__star-rail--bottom span")).toBeInTheDocument();
  expect(overlay?.querySelector(".project-card__star-rail--top span")).toBeInTheDocument();
  expect(container.querySelector(".project-card__meteor")).not.toBeInTheDocument();

  const card = container.querySelector(".project-card__link");
  fireEvent.pointerEnter(card!);
  expect(card).toHaveClass("project-card__link--hovered");
  fireEvent.pointerLeave(card!);
  expect(card).not.toHaveClass("project-card__link--hovered");
});
