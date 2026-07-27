import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AboutPage } from "./AboutPage";

it("presents a concise B2B product-manager profile without private contact details", () => {
  render(<MemoryRouter><AboutPage /></MemoryRouter>);

  expect(screen.getByRole("heading", { name: "B 端产品经理" })).toBeInTheDocument();
  expect(screen.getByText("业务分析")).toBeInTheDocument();
  expect(screen.queryByText(/186-1176-0790/)).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /下载简历/ })).not.toBeInTheDocument();
});
