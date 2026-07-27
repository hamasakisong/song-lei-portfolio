import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "../app/App";

it("renders a project case from its slug", () => {
  render(<MemoryRouter initialEntries={["/projects/payment"]}><App /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "电子券营销平台" })).toBeInTheDocument();
  expect(screen.getByText("脱敏重构 · 产品规划视角")).toBeInTheDocument();
  expect(screen.getByText("从业务规则到可交付方案")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "关键决策与取舍" })).toBeInTheDocument();
  expect(screen.getByText("复盘")).toBeInTheDocument();
});

it("renders the friendly 404 for an unknown project", () => {
  render(<MemoryRouter initialEntries={["/projects/not-found"]}><App /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "这个案例还不存在" })).toBeInTheDocument();
});
