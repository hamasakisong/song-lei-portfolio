import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./HomePage";

it("renders the recruiter-facing homepage hierarchy", () => {
  render(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(screen.getAllByText("B 端产品经理")[0]).toHaveClass("eyebrow");
  expect(screen.getByText("14 年行业信息化与复杂 B 端系统经验，9 年以上支付领域积累。擅长将多角色、多状态与跨系统协同的业务规则，转化为可交付的产品方案。")).toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(5);
  expect(screen.getByRole("heading", { name: "电子券营销平台" })).toBeInTheDocument();
  expect(screen.getByText("理解现场")).toBeInTheDocument();
  expect(screen.getByText("推动落地")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "研发工程师" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "信息管理产品 / 系统建设" })).toBeInTheDocument();
});
