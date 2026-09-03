import { render, screen, waitFor } from "@testing-library/react";
import { VisitorCount } from "./VisitorCount";

const { signIn, callFunction } = vi.hoisted(() => ({
  signIn: vi.fn(),
  callFunction: vi.fn(),
}));

vi.mock("@cloudbase/js-sdk", () => ({
  default: {
    init: () => ({
      auth: () => ({ anonymousAuthProvider: () => ({ signIn }) }),
      callFunction,
    }),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  signIn.mockResolvedValue(undefined);
  callFunction.mockResolvedValue({ result: { today: 3, total: 27 } });
});

it("renders a compact today and total visit count", async () => {
  render(<VisitorCount />);

  await waitFor(() => expect(screen.getByText("今日 3 · 累计 27")).toBeInTheDocument());
  expect(callFunction).toHaveBeenCalledWith({ name: "site-visits", parse: true });
});

it("stays hidden when anonymous sign-in is unavailable", async () => {
  signIn.mockRejectedValue(new Error("not available"));
  render(<VisitorCount />);

  await waitFor(() => expect(callFunction).not.toHaveBeenCalled());
});
