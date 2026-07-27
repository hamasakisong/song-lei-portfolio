import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SiteShell } from "./SiteShell";

it("provides semantic navigation without public contact details", () => {
  render(<MemoryRouter><SiteShell><p>内容</p></SiteShell></MemoryRouter>);
  expect(screen.getByRole("navigation", { name: "主导航" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "首页" })).toHaveAttribute("href", "/");
  expect(screen.getByRole("link", { name: "精选案例" })).toHaveAttribute("href", "/#work");
  expect(screen.getByRole("link", { name: "返回精选案例 ↑" })).toHaveAttribute("href", "/#work");
  expect(screen.queryByRole("link", { name: "简历" })).not.toBeInTheDocument();
  expect(screen.queryByText(/@/)).not.toBeInTheDocument();
});

it("marks selected work as current for a project detail route", () => {
  render(<MemoryRouter initialEntries={["/projects/payment"]}><SiteShell><p>内容</p></SiteShell></MemoryRouter>);

  expect(screen.getByRole("link", { name: "精选案例" })).toHaveAttribute("aria-current", "page");
  expect(screen.getByRole("link", { name: "首页" })).not.toHaveAttribute("aria-current");
});

it("marks the homepage as current for the root route", () => {
  render(<MemoryRouter initialEntries={["/"]}><SiteShell><p>内容</p></SiteShell></MemoryRouter>);

  expect(screen.getByRole("link", { name: "首页" })).toHaveAttribute("aria-current", "page");
});
