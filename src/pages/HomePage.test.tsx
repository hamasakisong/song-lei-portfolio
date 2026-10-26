import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./HomePage";

it("renders the recruiter-facing homepage hierarchy", () => {
  render(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(screen.getAllByText("B 端产品经理 · 金融支付 · 企业服务")[0]).toHaveClass("eyebrow");
  expect(screen.getByText("具备金融支付领域经验和技术背景的 B 端产品经理，拥有 14 年行业信息化与复杂 B 端系统经验、9 年以上支付领域积累；擅长复杂业务流程梳理、平台型产品设计和系统建设。")).toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(7);
  expect(screen.getByRole("heading", { name: "从业务梳理到产品落地。" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "电子券营销平台" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "聚合支付平台" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "物业综合缴费系统" })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "收单综合管理 SaaS平台" })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "查看代表项目 →" })).toHaveAttribute("href", "/#work");
  expect(screen.getByText("理解现场")).toBeInTheDocument();
  expect(screen.getByText("推动落地")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "研发工程师" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "客户档案与交易履约 CRM 系统建设" })).toBeInTheDocument();
  expect(screen.getByText("2021.08 — 2026.08")).toBeInTheDocument();
  expect(screen.getByText("围绕房产客户档案与交易履约，以房号档案关联客户、协议、资料及履约节点，并处理与银行、税务等外部平台的协同。")).toBeInTheDocument();
});
