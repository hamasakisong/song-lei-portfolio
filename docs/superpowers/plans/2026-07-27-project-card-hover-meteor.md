# Project Card Hover Meteor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a one-shot silver meteor that starts at the top-right corner and travels clockwise around a project card's border when the card is hovered or keyboard-focused.

**Architecture:** Keep the behavior entirely inside `ProjectCard` and page CSS. The card link receives a decorative SVG overlay with two rounded-rectangle strokes; CSS activates the one-shot animation on hover or visible focus and suppresses it for reduced-motion users.

**Tech Stack:** React, TypeScript, CSS, Vitest, Testing Library.

## Global Constraints

- Do not change project-card content, order, dimensions, backgrounds, click targets, or existing hover lift.
- Do not modify the existing one-pass meteor animation on project detail summary cards.
- Use silver-white light only; do not use green or cyan neon.
- The overlay must have `pointer-events: none` and `aria-hidden="true"`.
- One hover or focus entry plays exactly one 1.8-second clockwise circuit; it does not loop while hovered.
- Do not add dependencies, Canvas, video, or a persistent background glow.
- With `prefers-reduced-motion: reduce`, the overlay must not animate.
- Do not commit, push, or deploy unless the user explicitly asks to synchronize the phase.

---

## File Structure

- `src/components/project/ProjectCard.tsx` — Adds the decorative SVG overlay inside each clickable project card.
- `src/components/project/ProjectCard.test.tsx` — New DOM-level test that protects the overlay structure.
- `src/styles/pages.css` — Defines the silver core, trailing stroke, hover/focus trigger, clockwise path, and reduced-motion override.

### Task 1: Render a non-interactive meteor overlay in each project card

**Files:**
- Modify: `src/components/project/ProjectCard.tsx`
- Create: `src/components/project/ProjectCard.test.tsx`

**Interfaces:**
- Consumes: `ProjectRecord` and the existing `.project-card__link` link.
- Produces: a `.project-card__meteor` element containing `.project-card__meteor-trail` and `.project-card__meteor-core` SVG rectangles.

- [ ] **Step 1: Write the failing card-overlay test**

  Create `src/components/project/ProjectCard.test.tsx`:

  ```tsx
  import { render } from "@testing-library/react";
  import { MemoryRouter } from "react-router-dom";
  import { projects } from "../../content/projects";
  import { ProjectCard } from "./ProjectCard";

  it("adds a decorative meteor path to every clickable project card", () => {
    const { container } = render(
      <MemoryRouter><ProjectCard project={projects[0]} /></MemoryRouter>,
    );

    const overlay = container.querySelector(".project-card__meteor");
    expect(overlay).toHaveAttribute("aria-hidden", "true");
    expect(overlay).toHaveStyle({ pointerEvents: "none" });
    expect(overlay?.querySelector(".project-card__meteor-trail")).toBeInTheDocument();
    expect(overlay?.querySelector(".project-card__meteor-core")).toBeInTheDocument();
  });
  ```

- [ ] **Step 2: Run the targeted test to verify it fails**

  Run: `npm test -- --run src/components/project/ProjectCard.test.tsx`

  Expected: FAIL because `.project-card__meteor` is not rendered.

- [ ] **Step 3: Add the SVG structure to the existing link**

  Add this decorative sibling immediately inside `<Link className="project-card__link">`, before the existing content:

  ```tsx
  <span className="project-card__meteor" aria-hidden="true">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <rect className="project-card__meteor-trail" x="1" y="1" width="98" height="98" rx="1.8" pathLength="100" />
      <rect className="project-card__meteor-core" x="1" y="1" width="98" height="98" rx="1.8" pathLength="100" />
    </svg>
  </span>
  ```

  The `rect` begins at its top-left by SVG convention. Rotate the SVG `90deg` in CSS so animation position zero is visually the card's top-right corner; advance the dash offset in the clockwise direction after that rotation.

- [ ] **Step 4: Run the overlay test**

  Run: `npm test -- --run src/components/project/ProjectCard.test.tsx`

  Expected: PASS.

### Task 2: Animate the silver meteor once per hover or focus entry

**Files:**
- Modify: `src/styles/pages.css`
- Test: `src/components/project/ProjectCard.test.tsx`

**Interfaces:**
- Consumes: `.project-card__link`, `.project-card__meteor`, `.project-card__meteor-trail`, and `.project-card__meteor-core` from Task 1.
- Produces: `@keyframes project-card-meteor-dash` and a single-play hover/focus animation.

- [ ] **Step 1: Add the base overlay and stroke rules**

  Add these rules near existing `.project-card` styles:

  ```css
  .project-card__meteor { position: absolute; inset: -2px; z-index: 2; display: block; pointer-events: none; overflow: hidden; opacity: 0; }
  .project-card__meteor svg { display: block; width: 100%; height: 100%; overflow: visible; transform: rotate(180deg); }
  .project-card__meteor rect { fill: none; vector-effect: non-scaling-stroke; }
  .project-card__meteor-trail { stroke: rgba(216,224,227,.9); stroke-width: 2.6; stroke-linecap: round; stroke-dasharray: 14 330; stroke-dashoffset: 100; filter: drop-shadow(0 0 6px rgba(255,255,255,.86)); }
  .project-card__meteor-core { stroke: #fff; stroke-width: 4.4; stroke-linecap: round; stroke-dasharray: 2.8 376; stroke-dashoffset: 100; filter: drop-shadow(0 0 3px #fff) drop-shadow(0 0 11px rgba(213,221,226,.95)); }
  ```

- [ ] **Step 2: Add a one-shot trigger and keyframes**

  Add this CSS after the base rules:

  ```css
  .project-card__link:hover .project-card__meteor,
  .project-card__link:focus-visible .project-card__meteor { animation: project-card-meteor-visibility 1.8s linear both; }
  .project-card__link:hover .project-card__meteor-trail,
  .project-card__link:focus-visible .project-card__meteor-trail,
  .project-card__link:hover .project-card__meteor-core,
  .project-card__link:focus-visible .project-card__meteor-core { animation: project-card-meteor-dash 1.8s cubic-bezier(.22,1,.36,1) both; }
  @keyframes project-card-meteor-dash { from { stroke-dashoffset: 100; } to { stroke-dashoffset: -300; } }
  @keyframes project-card-meteor-visibility { 0%, 92% { opacity: 1; } 100% { opacity: 0; } }
  ```

  Do not add `infinite`. CSS naturally restarts the animation when the pointer leaves and re-enters because the animation selector is removed between entries.

- [ ] **Step 3: Add the reduced-motion override**

  Add this global media query in `src/styles/pages.css`:

  ```css
  @media (prefers-reduced-motion: reduce) {
    .project-card__link:hover .project-card__meteor,
    .project-card__link:focus-visible .project-card__meteor,
    .project-card__link:hover .project-card__meteor-trail,
    .project-card__link:focus-visible .project-card__meteor-trail,
    .project-card__link:hover .project-card__meteor-core,
    .project-card__link:focus-visible .project-card__meteor-core { animation: none; }
  }
  ```

- [ ] **Step 4: Run the focused test and full suite**

  Run: `npm test -- --run src/components/project/ProjectCard.test.tsx`

  Expected: PASS.

  Run: `npm test -- --run`

  Expected: PASS for all test files.

- [ ] **Step 5: Manual visual acceptance**

  On desktop, hover the first two project cards and confirm the bright point begins at the top-right, follows the border clockwise exactly once, and fades after the circuit. Keep the pointer in place for five seconds and confirm no second circuit begins. Leave and re-enter to confirm it restarts. Tab to a card and confirm focus triggers the same effect. Test a reduced-motion browser setting and a 390px-wide viewport.

## Self-Review

### Spec coverage

- Top-right start, clockwise path, one pass, silver trail, hover and focus trigger: Tasks 1 and 2.
- No click interception and no changes to existing card styling: Global Constraints and Task 1.
- Reduced motion and mobile safety: Task 2 and manual acceptance.

### Placeholder scan

No placeholders or unspecified code steps remain.

### Type consistency

The CSS class names created in Task 1 exactly match the selectors used in Task 2.
