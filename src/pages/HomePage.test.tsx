import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./HomePage";

it("renders the recruiter-facing homepage hierarchy", () => {
  render(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(screen.getAllByText("B 端产品经理 · 支付资金链路 · 企业级 SaaS")[0]).toHaveClass("eyebrow");
  expect(screen.getByText("14 年行业信息化与复杂 B 端系统经验，9 年以上支付领域积累。聚焦支付资金链路与企业级 SaaS，把多角色、多状态和跨系统协同转化为可交付的产品方案。")).toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(5);
  expect(screen.getByRole("heading", { name: "SaaS 信息管理系统 Suite" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "查看 SaaS 核心作品 →" })).toHaveAttribute("href", "/experience");
  expect(screen.getByText("理解现场")).toBeInTheDocument();
  expect(screen.getByText("推动落地")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "研发工程师" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "信息管理产品 / 系统建设" })).toBeInTheDocument();
  expect(screen.getByText("2021.08 — 2026.08")).toBeInTheDocument();
  expect(screen.getByText("围绕房产信息管理，以房号档案关联购房人、协议、资料及流程节点，并处理与银行、税务等外部平台的协同。")).toBeInTheDocument();
});
