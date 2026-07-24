import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";

it("renders the portfolio positioning on the homepage", () => {
  render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
  expect(screen.getByRole("heading", {
    name: "让复杂业务，成为清晰、可靠、可执行的系统。",
  })).toBeInTheDocument();
});
