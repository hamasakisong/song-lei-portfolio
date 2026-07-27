# Project Card StarBorder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the project-card single-point meteor with a stable StarBorder-style silver sweep that loops only while a card is hovered or keyboard-focused.

**Architecture:** Keep `ProjectCard` responsible only for its decorative overlay markup. Two span elements become the top and bottom sweep layers; CSS clips them inside the card, moves them in opposite directions, and disables them under reduced-motion settings. No React Bits source file, GSAP, or external dependency is added.

**Tech Stack:** React, TypeScript, CSS, Vitest, Testing Library.

## Global Constraints

- Preserve card content, order, dimensions, click behavior, hover lift, arrow, and backgrounds.
- Replace the existing `.project-card__meteor` SVG path and all single-circuit keyframes.
- Default state has only the current low-contrast border; sweeps appear only on hover or visible focus.
- Use bright silver-white and cool gray only; no green, cyan, neon, or full-frame glow.
- Top and bottom sweeps use `linear infinite alternate` with a 4.8-second duration while active.
- Every decorative layer is `aria-hidden="true"` and `pointer-events: none`.
- Reduced-motion users receive no animated sweep.
- Do not commit, push, or deploy unless the user explicitly asks to synchronize the phase.

---

## File Structure

- `src/components/project/ProjectCard.tsx` — Replaces SVG path markup with top and bottom StarBorder sweep layers.
- `src/components/project/ProjectCard.test.tsx` — Protects the decorative layer structure.
- `src/styles/pages.css` — Defines the clipped radial sweeps, active trigger, reduced-motion override, and removes old meteor rules.

### Task 1: Replace the SVG meteor structure with sweep layers

**Files:**
- Modify: `src/components/project/ProjectCard.tsx`
- Modify: `src/components/project/ProjectCard.test.tsx`

**Interfaces:**
- Consumes: the existing `.project-card__link` clickable container.
- Produces: `.project-card__star-border` containing `.project-card__star-border-top` and `.project-card__star-border-bottom`.

- [ ] **Step 1: Write the failing overlay test**

  Replace the current overlay assertions in `src/components/project/ProjectCard.test.tsx` with:

  ```tsx
  const overlay = container.querySelector(".project-card__star-border");
  expect(overlay).toHaveAttribute("aria-hidden", "true");
  expect(overlay?.querySelector(".project-card__star-border-top")).toBeInTheDocument();
  expect(overlay?.querySelector(".project-card__star-border-bottom")).toBeInTheDocument();
  expect(container.querySelector(".project-card__meteor")).not.toBeInTheDocument();
  ```

- [ ] **Step 2: Run the test to verify it fails**

  Run: `npm test -- --run src/components/project/ProjectCard.test.tsx`

  Expected: FAIL because the current component still renders `.project-card__meteor`.

- [ ] **Step 3: Render the two decorative layers**

  In `ProjectCard.tsx`, replace the current meteor span with:

  ```tsx
  <span className="project-card__star-border" aria-hidden="true">
    <span className="project-card__star-border-top" />
    <span className="project-card__star-border-bottom" />
  </span>
  ```

- [ ] **Step 4: Run the focused test**

  Run: `npm test -- --run src/components/project/ProjectCard.test.tsx`

  Expected: PASS.

### Task 2: Implement the clipped silver sweep and reduced-motion behavior

**Files:**
- Modify: `src/styles/pages.css`
- Test: `src/components/project/ProjectCard.test.tsx`

**Interfaces:**
- Consumes: the three StarBorder classes created in Task 1.
- Produces: `project-card-star-top` and `project-card-star-bottom` keyframes, active only through hover and focus-visible selectors.

- [ ] **Step 1: Remove the old meteor rules**

  Delete `.project-card__meteor`, `.project-card__meteor svg`, `.project-card__meteor path`, `.project-card__meteor-trail`, `.project-card__meteor-core`, their hover selectors, and all `project-card-meteor-*` keyframes. Remove their reduced-motion selectors as well.

- [ ] **Step 2: Add the StarBorder base layers**

  Add these rules in the project-card style block:

  ```css
  .project-card__star-border { position: absolute; inset: 0; z-index: 2; overflow: hidden; pointer-events: none; opacity: 0; transition: opacity .22s ease; }
  .project-card__star-border-top,.project-card__star-border-bottom { position: absolute; width: 300%; height: 52%; border-radius: 50%; opacity: .62; background: radial-gradient(circle,rgba(255,255,255,.96),rgba(213,222,227,.46) 4%,transparent 11%); filter: drop-shadow(0 0 6px rgba(255,255,255,.7)); }
  .project-card__star-border-top { top: -13px; left: -250%; }
  .project-card__star-border-bottom { right: -250%; bottom: -13px; }
  ```

- [ ] **Step 3: Add active triggers and keyframes**

  Add:

  ```css
  .project-card__link:hover .project-card__star-border,.project-card__link:focus-visible .project-card__star-border { opacity: 1; }
  .project-card__link:hover .project-card__star-border-top,.project-card__link:focus-visible .project-card__star-border-top { animation: project-card-star-top 4.8s linear infinite alternate; }
  .project-card__link:hover .project-card__star-border-bottom,.project-card__link:focus-visible .project-card__star-border-bottom { animation: project-card-star-bottom 4.8s linear infinite alternate; }
  @keyframes project-card-star-top { from { transform: translateX(0); opacity: .62; } to { transform: translateX(100%); opacity: 0; } }
  @keyframes project-card-star-bottom { from { transform: translateX(0); opacity: .62; } to { transform: translateX(-100%); opacity: 0; } }
  ```

  Keep the active overlay below card text only if the text remains fully legible; otherwise place the card content at `z-index: 3` and leave the sweep at `z-index: 2`.

- [ ] **Step 4: Add the reduced-motion override**

  In the existing reduced-motion media query, add:

  ```css
  .project-card__link:hover .project-card__star-border-top,.project-card__link:focus-visible .project-card__star-border-top,.project-card__link:hover .project-card__star-border-bottom,.project-card__link:focus-visible .project-card__star-border-bottom { animation: none; }
  ```

- [ ] **Step 5: Run automated verification**

  Run: `npm test -- --run src/components/project/ProjectCard.test.tsx`

  Expected: PASS.

  Run: `npm test -- --run`

  Expected: PASS for all test files.

  Run: `npm run build`

  Expected: PASS without TypeScript or Vite errors.

- [ ] **Step 6: Manual visual acceptance**

  Hover the first, second, and fifth project cards at desktop width. Confirm that silver sweep light is visible only near the top and bottom edges, moves continuously in opposite directions, and stops on pointer leave. Confirm no vertical stroke enters card content. Tab to a card and repeat. At 390px width, confirm no horizontal overflow or occlusion. Enable reduced motion and confirm no sweep plays.

## Self-Review

### Spec coverage

- Hover/focus-only, continuous opposite-direction sweeps: Task 2.
- Silver-white palette and no content interference: Global Constraints and Task 2.
- SVG removal and stable span structure: Task 1.
- Reduced motion, click preservation, desktop/mobile acceptance: Task 2.

### Placeholder scan

No placeholders or unspecified implementation steps remain.

### Type consistency

The classes rendered in Task 1 exactly match the selectors and tests in Task 2.
