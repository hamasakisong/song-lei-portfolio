import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./HomePage";

it("renders the recruiter-facing homepage hierarchy", () => {
  render(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(screen.getAllByText("B 端产品经理 · 金融支付 · 企业服务")[0]).toHaveClass("eyebrow");
  expect(screen.getByText("具备金融支付领域经验和技术背景的 B 端产品经理，拥有 14 年行业信息化与复杂 B 端系统经验、9 年以上支付领域积累；擅长复杂业务流程梳理、平台型产品设计和系统建设，同时具备数据分析与 AI 产品实践能力。")).toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(5);
  expect(screen.getByRole("heading", { name: /梳理业务流程，\s*明确需求边界，\s*设计可落地的产品。/ })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "电子券营销平台" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "沃支付聚合支付平台" })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "SaaS 信息管理系统 Suite" })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "查看代表项目 →" })).toHaveAttribute("href", "/#work");
  expect(screen.getByText("理解现场")).toBeInTheDocument();
  expect(screen.getByText("推动落地")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "研发工程师" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "信息管理产品 / 系统建设" })).toBeInTheDocument();
  expect(screen.getByText("2021.08 — 2026.08")).toBeInTheDocument();
  expect(screen.getByText("围绕房产信息管理，以房号档案关联购房人、协议、资料及流程节点，并处理与银行、税务等外部平台的协同。")).toBeInTheDocument();
});
