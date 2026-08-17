import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, vi } from "vitest";
import { HashScroll } from "./HashScroll";

const scrollIntoView = vi.fn();
const scrollTo = vi.fn();

beforeEach(() => {
  document.body.innerHTML = '<section id="work" />';
  HTMLElement.prototype.scrollIntoView = scrollIntoView;
  vi.stubGlobal("scrollTo", scrollTo);
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  window.matchMedia = vi.fn().mockReturnValue({ matches: false });
});

afterEach(() => {
  scrollIntoView.mockReset();
  vi.unstubAllGlobals();
});

it("smoothly scrolls selected work when the homepage hash is #work", () => {
  render(<MemoryRouter initialEntries={["/#work"]}><HashScroll /></MemoryRouter>);

  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
});

it("uses instant positioning when reduced motion is preferred", () => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: true });
  render(<MemoryRouter initialEntries={["/#work"]}><HashScroll /></MemoryRouter>);

  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
});

it("returns to the top when navigation clears the selected-work hash", () => {
  render(<MemoryRouter initialEntries={["/"]}><HashScroll /></MemoryRouter>);

  expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
});
