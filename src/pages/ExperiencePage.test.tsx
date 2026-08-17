import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ExperiencePage } from "./ExperiencePage";

it("shows the SaaS suite as a concrete portfolio rather than a generic experience note", () => {
  render(<MemoryRouter><ExperiencePage /></MemoryRouter>);

  expect(screen.getByRole("heading", { name: "SaaS 信息管理系统 Suite" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "核心作品集" })).toBeInTheDocument();
  expect(screen.getByText("用户、订单与财务三套平台")).toBeInTheDocument();
  expect(screen.getByText("当前网页展示核心内容；完整 PPT、Figma 原型与设计文档作为面试材料留存。公开链接确认后将在此补充。")).toBeInTheDocument();
});
