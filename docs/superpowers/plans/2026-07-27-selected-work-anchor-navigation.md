# Selected Work Anchor Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every “精选案例” entry reliably route to `/#work` and position the user at the homepage project section in the React single-page application.

**Architecture:** Add one route-aware `HashScroll` component beside `Routes` in `App`. It observes the current pathname and hash, then scrolls the `#work` element after the homepage has rendered. Existing navigation links continue to use the single `/#work` URL contract.

**Tech Stack:** React, TypeScript, React Router, Vitest, Testing Library.

## Global Constraints

- Preserve the existing `id="work"` section and all existing `Link to="/#work"` URLs.
- Do not add click handlers independently to header, footer, homepage, or case-page links.
- Smooth-scroll only when reduced motion is not requested.
- Support in-page navigation, cross-route navigation, direct `/#work` loads, and browser history navigation.
- Do not change navigation appearance, project content, homepage background, or project ordering.
- Do not commit, push, or deploy unless the user explicitly asks to synchronize the phase.

---

## File Structure

- `src/components/navigation/HashScroll.tsx` — New single owner of the `/#work` scroll side effect.
- `src/components/navigation/HashScroll.test.tsx` — New focused test for hash-driven scroll behavior and reduced motion.
- `src/app/App.tsx` — Mounts `HashScroll` once inside the router context and outside page routes.
- `src/components/layout/SiteShell.test.tsx` — Keeps the header’s `/#work` URL contract protected.

### Task 1: Add a tested route-hash scroll helper

**Files:**
- Create: `src/components/navigation/HashScroll.tsx`
- Create: `src/components/navigation/HashScroll.test.tsx`

**Interfaces:**
- Consumes: `useLocation(): Location` from React Router and the DOM element `document.getElementById("work")`.
- Produces: `HashScroll(): null`, which scrolls only when `pathname === "/"` and `hash === "#work"`.

- [ ] **Step 1: Write the failing hash-scroll test**

  Create `src/components/navigation/HashScroll.test.tsx`:

  ```tsx
  import { render } from "@testing-library/react";
  import { MemoryRouter } from "react-router-dom";
  import { beforeEach, expect, it, vi } from "vitest";
  import { HashScroll } from "./HashScroll";

  beforeEach(() => {
    document.body.innerHTML = '<section id="work" />';
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("scrolls the selected-work section when the homepage hash is #work", async () => {
    render(<MemoryRouter initialEntries={["/#work"]}><HashScroll /></MemoryRouter>);

    await new Promise(requestAnimationFrame);
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });
  ```

- [ ] **Step 2: Run the test to verify it fails**

  Run: `npm test -- --run src/components/navigation/HashScroll.test.tsx`

  Expected: FAIL because `HashScroll` does not exist.

- [ ] **Step 3: Implement the route-hash helper**

  Create `src/components/navigation/HashScroll.tsx` with this behavior:

  ```tsx
  import { useEffect } from "react";
  import { useLocation } from "react-router-dom";

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  export function HashScroll() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
      if (pathname !== "/" || hash !== "#work") return;

      const frame = requestAnimationFrame(() => {
        document.getElementById("work")?.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
      });

      return () => cancelAnimationFrame(frame);
    }, [hash, pathname]);

    return null;
  }
  ```

- [ ] **Step 4: Add reduced-motion coverage**

  Add a test that mocks `window.matchMedia` to return `{ matches: true }`, renders `/#work`, and expects `{ behavior: "auto", block: "start" }`. Restore the mock after the test.

- [ ] **Step 5: Run the focused test**

  Run: `npm test -- --run src/components/navigation/HashScroll.test.tsx`

  Expected: PASS for smooth and reduced-motion behavior.

### Task 2: Mount the helper once and protect every link contract

**Files:**
- Modify: `src/app/App.tsx`
- Modify: `src/components/layout/SiteShell.test.tsx`
- Test: `src/components/navigation/HashScroll.test.tsx`

**Interfaces:**
- Consumes: `HashScroll` from Task 1 and existing links with `to="/#work"`.
- Produces: all existing entry points trigger the same route-hash behavior without per-link event handlers.

- [ ] **Step 1: Mount the helper before page transitions**

  In `src/app/App.tsx`, add the import and mount:

  ```tsx
  import { HashScroll } from "../components/navigation/HashScroll";

  <SiteShell>
    <ReadingProgress />
    <HashScroll />
    <AnimatePresence mode="wait">
  ```

  Keep it inside the router provider that already wraps `App`; do not put it inside a route element or `AnimatePresence`.

- [ ] **Step 2: Extend the header link test**

  In `src/components/layout/SiteShell.test.tsx`, retain the existing header assertion and add the footer contract:

  ```tsx
  expect(screen.getByRole("link", { name: "返回精选案例 ↑" })).toHaveAttribute("href", "#work");
  ```

  This confirms that the header retains cross-route `/#work` navigation while the footer’s in-page link remains valid on the homepage.

- [ ] **Step 3: Run navigation-related tests**

  Run: `npm test -- --run src/components/navigation/HashScroll.test.tsx src/components/layout/SiteShell.test.tsx src/app/App.test.tsx`

  Expected: PASS.

- [ ] **Step 4: Run full verification**

  Run: `npm test -- --run`

  Expected: PASS for all test files.

  Run: `npm run build`

  Expected: PASS without TypeScript, routing, or build errors.

- [ ] **Step 5: Manual browser acceptance**

  Verify each of these flows: homepage navigation → selected work; homepage primary action → selected work; about page navigation → homepage selected work; experience page navigation → homepage selected work; project detail back link → homepage selected work; direct `/#work` load; browser back and forward. Then enable reduced motion and confirm the destination is immediate rather than smoothly animated.

## Self-Review

### Spec coverage

- One owner for hash scrolling and existing route links retained: Tasks 1 and 2.
- Smooth and reduced-motion behavior: Task 1 test coverage.
- Homepage, cross-route, direct-link, and history behavior: Task 2 manual acceptance.

### Placeholder scan

No placeholders or unscoped implementation instructions remain.

### Type consistency

`HashScroll` is declared and exported in Task 1, then imported by the exact name in Task 2.
