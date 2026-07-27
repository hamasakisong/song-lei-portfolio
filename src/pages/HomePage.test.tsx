import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./HomePage";

it("renders the recruiter-facing homepage hierarchy", () => {
  render(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(screen.getAllByText("B 端产品经理")[0]).toHaveClass("eyebrow");
  expect(screen.getByText("具备开发背景与项目管理经验，擅长复杂业务建模与全链路系统落地。")).toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(5);
  expect(screen.getByRole("heading", { name: "电子券营销平台" })).toBeInTheDocument();
  expect(screen.getByText("理解现场")).toBeInTheDocument();
  expect(screen.getByText("推动落地")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Java 后端开发" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "B 端产品经理" })).toBeInTheDocument();
});
