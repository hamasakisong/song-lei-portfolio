import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SiteShell } from "./SiteShell";

it("provides semantic navigation and resume access", () => {
  render(<MemoryRouter><SiteShell><p>内容</p></SiteShell></MemoryRouter>);
  expect(screen.getByRole("navigation", { name: "主导航" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "精选案例" })).toHaveAttribute("href", "/#work");
  expect(screen.getByRole("link", { name: "简历" })).toHaveAttribute("href", "/resume/song-lei-b2b-product-manager.pdf");
});
