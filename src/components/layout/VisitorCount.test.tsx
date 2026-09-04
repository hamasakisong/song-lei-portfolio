import { render, screen, waitFor } from "@testing-library/react";
import { VisitorCount } from "./VisitorCount";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn()
    .mockResolvedValueOnce({ json: async () => ({ value: 3 }) })
    .mockResolvedValueOnce({ json: async () => ({ value: 27 }) }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

it("renders a compact today and total visit count", async () => {
  render(<VisitorCount />);

  await waitFor(() => expect(screen.getByText("今日 3 · 累计 27")).toBeInTheDocument());
  expect(fetch).toHaveBeenCalledTimes(2);
});

it("stays hidden when the counter service is unavailable", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
  render(<VisitorCount />);

  await waitFor(() => expect(screen.queryByText(/今日/)).not.toBeInTheDocument());
});
