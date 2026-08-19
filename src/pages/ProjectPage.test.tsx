import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "../app/App";

it("renders a project case from its slug", () => {
  render(<MemoryRouter initialEntries={["/projects/payment"]}><App /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "电子券营销平台" })).toBeInTheDocument();
  expect(screen.getByText("脱敏重构 · 产品规划视角")).toBeInTheDocument();
  expect(screen.getByText("从业务规则到可交付方案")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "关键决策与取舍" })).toBeInTheDocument();
  expect(screen.getAllByRole("heading", { name: "活动配置体系设计" })).toHaveLength(2);
  expect(screen.getByText("商户组批量配置")).toBeInTheDocument();
  expect(screen.getByText("通过商户组批量配置减少重复维护，运营效率提升约 50%")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "核心作品集" })).toBeInTheDocument();
  expect(screen.getByText("从活动创建到资金结算的闭环")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "查看 Figma 原型" })).toHaveAttribute(
    "href",
    "https://www.figma.com/design/tKmJNmf4myINOLQ4BKAoKy/%E7%94%B5%E5%AD%90%E5%88%B8%E7%B3%BB%E7%BB%9F%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E8%A7%86%E8%A7%89%E4%BC%98%E5%8C%96%E5%8E%9F%E5%9E%8B?t=j6DcBBKS1q7Acnc4-0",
  );
  expect(screen.getByRole("link", { name: "体验交互原型" })).toHaveAttribute("href", "/prototypes/coupon-admin/");
  expect(screen.getByText("复盘")).toBeInTheDocument();
});

it("renders the friendly 404 for an unknown project", () => {
  render(<MemoryRouter initialEntries={["/projects/not-found"]}><App /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "这个案例还不存在" })).toBeInTheDocument();
});
