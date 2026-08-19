import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ExperiencePage } from "./ExperiencePage";

it("shows the SaaS suite as a concrete portfolio rather than a generic experience note", () => {
  render(<MemoryRouter><ExperiencePage /></MemoryRouter>);

  expect(screen.getByRole("heading", { name: "SaaS 信息管理系统 Suite" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "核心作品集" })).toBeInTheDocument();
  expect(screen.getByText("用户、订单与财务三套平台")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "查看 Figma 原型" })).toHaveAttribute("href", "https://www.figma.com/design/AqUI9s9AZwMVgKuIHD0lgH/SaaS%E7%BB%BC%E5%90%88%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F-Suite-%E5%85%A5%E5%8F%A3?node-id=0-1&p=f&t=j6DcBBKS1q7Acnc4-0");
  expect(screen.getByRole("link", { name: "体验交互原型" })).toHaveAttribute("href", "/prototypes/saas-suite/");
});
