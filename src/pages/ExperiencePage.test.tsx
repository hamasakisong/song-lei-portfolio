import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ExperiencePage } from "./ExperiencePage";

it("shows the SaaS suite as a concrete portfolio rather than a generic experience note", () => {
  render(<MemoryRouter><ExperiencePage /></MemoryRouter>);

  expect(screen.getByRole("heading", { name: "收单综合管理 SaaS平台" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "核心作品集" })).toBeInTheDocument();
  expect(screen.getByText("展示关键流程、产品方案与交互原型；完整材料可按需查看。")).toBeInTheDocument();
  expect(screen.queryByText(/这套作品聚焦 0→1 落地前/)).not.toBeInTheDocument();
  expect(screen.getByText("商户准入与渠道进件")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "查看 Figma 原型" })).toHaveAttribute("href", "https://www.figma.com/design/AqUI9s9AZwMVgKuIHD0lgH?node-id=55-142");
  expect(screen.getByRole("link", { name: "体验交互原型" })).toHaveAttribute("href", "/prototypes/saas-suite/");
});
