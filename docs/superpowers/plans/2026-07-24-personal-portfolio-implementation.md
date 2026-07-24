# Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished Chinese personal portfolio for a B2B product manager, with five evidence-based cases, restrained mist-style motion, responsive layouts, and resume/source links.

**Architecture:** Use a static React + TypeScript application. Keep case content in typed data files, render all normal projects through one reusable case template, and isolate global motion behavior in a small animation layer that respects `prefers-reduced-motion`.

**Tech Stack:** React, TypeScript, Vite, React Router, Motion, Vitest, Testing Library, CSS.

---

## File structure

```text
src/
  app/
    App.tsx                 Route composition
    App.test.tsx            Route smoke tests
  components/
    layout/SiteShell.tsx    Header, mobile navigation, footer
    motion/Reveal.tsx       Viewport reveal with reduced-motion handling
    motion/MistField.tsx    Decorative mist and dot background
    project/ProjectCard.tsx Homepage project summary
    project/ProjectMedia.tsx Safe screenshot and external-link rendering
  content/
    profile.ts              Positioning, proof points, contact metadata
    projects.ts             Five typed project records in fixed order
  pages/
    HomePage.tsx            Homepage composition
    ProjectPage.tsx         Reusable project case template
    ExperiencePage.tsx      SaaS experience专题
    AboutPage.tsx           Career, skills and PMP
    NotFoundPage.tsx        Friendly 404
  styles/
    tokens.css              Colors, typography, spacing, motion tokens
    global.css              Resets, shared layout, accessibility
    pages.css               Homepage and case presentation
  test/
    setup.ts                Testing Library setup
  main.tsx
public/
  resume/song-lei-b2b-product-manager.pdf
  projects/...              Curated screenshots copied from source projects
```

## Task 1: Scaffold and test harness

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/App.test.tsx`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Create a route smoke test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";

it("renders the portfolio positioning on the homepage", () => {
  render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
  expect(screen.getByRole("heading", {
    name: "让复杂业务，成为清晰、可靠、可执行的系统。",
  })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test -- --run`

Expected: FAIL because the project and `App` do not exist yet.

- [ ] **Step 3: Add the minimal Vite application**

`src/app/App.tsx` initially exports:

```tsx
export function App() {
  return <h1>让复杂业务，成为清晰、可靠、可执行的系统。</h1>;
}
```

Configure Vitest with `environment: "jsdom"` and `setupFiles: "./src/test/setup.ts"`.

- [ ] **Step 4: Install dependencies and run verification**

Run: `npm install`

Run: `npm test -- --run`

Expected: one passing test.

- [ ] **Step 5: Commit**

```text
git add package.json package-lock.json vite.config.ts tsconfig*.json index.html src
git commit -m "chore: scaffold portfolio application"
```

## Task 2: Typed profile and project content

**Files:**
- Create: `src/content/profile.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/projects.test.ts`

- [ ] **Step 1: Write content-order tests**

```ts
import { projects } from "./projects";

it("keeps the approved project order", () => {
  expect(projects.map((project) => project.slug)).toEqual([
    "payment",
    "lifecaregarden",
    "home-information-management-system",
    "jpnms",
    "saas-experience",
  ]);
});

it("provides a recruiter summary and evidence for every case", () => {
  for (const project of projects) {
    expect(project.summary.length).toBeGreaterThan(30);
    expect(project.evidence.length).toBeGreaterThan(0);
  }
});
```

- [ ] **Step 2: Run the content test and verify it fails**

Run: `npm test -- --run src/content/projects.test.ts`

Expected: FAIL because `projects.ts` does not exist.

- [ ] **Step 3: Define stable content types and initial copy**

```ts
export type ProjectRecord = {
  slug: string;
  order: number;
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  role: string;
  constraints: string[];
  decisions: Array<{ title: string; detail: string }>;
  outcome: string[];
  reflection: string;
  tags: string[];
  evidence: Array<{ label: string; href: string; kind: "source" | "figma" | "document" }>;
  media: Array<{ src: string; alt: string; caption: string }>;
  variant: "case" | "experience";
};
```

Populate five records from the inspected project documentation. Do not invent production metrics; label reconstructed work as “脱敏重构”.

- [ ] **Step 4: Run tests**

Run: `npm test -- --run src/content/projects.test.ts`

Expected: two passing tests.

- [ ] **Step 5: Commit**

```text
git add src/content
git commit -m "feat: add typed portfolio content"
```

## Task 3: Global visual system and site shell

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/components/layout/SiteShell.tsx`
- Create: `src/components/layout/SiteShell.test.tsx`
- Modify: `src/main.tsx`
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Test semantic navigation**

```tsx
render(<MemoryRouter><SiteShell><p>内容</p></SiteShell></MemoryRouter>);
expect(screen.getByRole("navigation", { name: "主导航" })).toBeInTheDocument();
expect(screen.getByRole("link", { name: "精选案例" })).toHaveAttribute("href", "/#work");
expect(screen.getByRole("link", { name: "简历" })).toHaveAttribute(
  "href",
  "/resume/song-lei-b2b-product-manager.pdf",
);
```

- [ ] **Step 2: Run the shell test and verify it fails**

Run: `npm test -- --run src/components/layout/SiteShell.test.tsx`

Expected: FAIL because `SiteShell` does not exist.

- [ ] **Step 3: Implement the shell**

Create a sticky translucent header, accessible mobile menu, skip link, semantic `<main>`, and dark green footer. Use CSS variables:

```css
:root {
  --color-canvas: #f2f4f0;
  --color-surface: rgba(255, 255, 255, 0.58);
  --color-ink: #153f38;
  --color-muted: #65756f;
  --color-accent: #176f61;
  --color-accent-soft: #b9ddd6;
  --border-soft: rgba(18, 89, 78, 0.15);
  --content-max: 1240px;
}
```

- [ ] **Step 4: Verify tests and production build**

Run: `npm test -- --run`

Run: `npm run build`

Expected: all tests pass and Vite creates `dist/`.

- [ ] **Step 5: Commit**

```text
git add src
git commit -m "feat: establish portfolio visual system"
```

## Task 4: Homepage and project cards

**Files:**
- Create: `src/components/project/ProjectCard.tsx`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/HomePage.test.tsx`
- Create: `src/styles/pages.css`
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Test recruiter-facing homepage hierarchy**

```tsx
render(<MemoryRouter><HomePage /></MemoryRouter>);
expect(screen.getByText("业务理解 × 产品规划 × 技术落地")).toBeInTheDocument();
expect(screen.getAllByRole("article")).toHaveLength(5);
expect(screen.getByRole("heading", { name: "电子券营销平台" })).toBeInTheDocument();
expect(screen.getByText("理解现场")).toBeInTheDocument();
expect(screen.getByText("推动落地")).toBeInTheDocument();
```

- [ ] **Step 2: Run the homepage test and verify it fails**

Run: `npm test -- --run src/pages/HomePage.test.tsx`

Expected: FAIL because `HomePage` does not exist.

- [ ] **Step 3: Implement the approved homepage**

Build these sections in order:

1. Mist hero with positioning and two calls to action.
2. Proof strip for 9+ years, five cases, and PMP.
3. Five project cards in approved order, with `payment` spanning the grid.
4. Four-step working method.
5. Experience/notes invitation.
6. Contact footer.

Every card must link to `/projects/:slug` except `saas-experience`, which links to `/experience`.

- [ ] **Step 4: Run tests and build**

Run: `npm test -- --run`

Run: `npm run build`

Expected: all tests pass and build succeeds.

- [ ] **Step 5: Commit**

```text
git add src
git commit -m "feat: build portfolio homepage"
```

## Task 5: Case template, experience page, about page and 404

**Files:**
- Create: `src/components/project/ProjectMedia.tsx`
- Create: `src/pages/ProjectPage.tsx`
- Create: `src/pages/ExperiencePage.tsx`
- Create: `src/pages/AboutPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`
- Create: `src/pages/ProjectPage.test.tsx`
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Test valid and invalid routes**

```tsx
it("renders a project case from its slug", () => {
  render(<MemoryRouter initialEntries={["/projects/payment"]}><App /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "电子券营销平台" })).toBeInTheDocument();
  expect(screen.getByText("范围与取舍")).toBeInTheDocument();
  expect(screen.getByText("复盘")).toBeInTheDocument();
});

it("renders the friendly 404 for an unknown project", () => {
  render(<MemoryRouter initialEntries={["/projects/not-found"]}><App /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "这个案例还不存在" })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run route tests and verify they fail**

Run: `npm test -- --run src/pages/ProjectPage.test.tsx`

Expected: FAIL because the pages and routes do not exist.

- [ ] **Step 3: Implement reusable case rendering**

Render the same stable section order for four normal projects:

```text
概述 → 问题 → 角色 → 目标与约束 → 范围与取舍 → 核心方案
→ 界面与流程 → 技术协作证据 → 结果 → 复盘 → 外部材料
```

Render `saas-experience` as a dedicated long-form page organized around methods, payment-chain reasoning, planning decisions, and reusable lessons.

- [ ] **Step 4: Verify**

Run: `npm test -- --run`

Run: `npm run build`

Expected: all routes render and build succeeds.

- [ ] **Step 5: Commit**

```text
git add src
git commit -m "feat: add portfolio case pages"
```

## Task 6: Motion system

**Files:**
- Create: `src/components/motion/Reveal.tsx`
- Create: `src/components/motion/MistField.tsx`
- Create: `src/components/motion/Reveal.test.tsx`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/ProjectPage.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/styles/pages.css`

- [ ] **Step 1: Test reduced-motion behavior**

```tsx
vi.mock("motion/react", () => ({
  useReducedMotion: () => true,
  motion: { div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) =>
    <div {...props}>{children}</div> },
}));

render(<Reveal><p>核心内容</p></Reveal>);
expect(screen.getByText("核心内容")).toBeVisible();
```

- [ ] **Step 2: Run the motion test and verify it fails**

Run: `npm test -- --run src/components/motion/Reveal.test.tsx`

Expected: FAIL because `Reveal` does not exist.

- [ ] **Step 3: Implement restrained motion**

Use shared parameters:

```ts
export const revealTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1],
};
```

Apply:

- Hero layers: opacity + 18px rise with 80ms stagger.
- Project cards: opacity + 22px rise once on viewport entry.
- Mist layers: CSS transform drift over 18–26 seconds.
- Hover: maximum 4px rise and subtle border/color change.
- Reduced motion: no drift, no translation, immediate content visibility.

- [ ] **Step 4: Verify tests and build**

Run: `npm test -- --run`

Run: `npm run build`

Expected: all tests pass and no motion dependency build error.

- [ ] **Step 5: Commit**

```text
git add src
git commit -m "feat: add accessible portfolio motion"
```

## Task 7: Resume and curated project media

**Files:**
- Create: `public/resume/song-lei-b2b-product-manager.pdf`
- Create: `public/projects/payment/*`
- Create: `public/projects/lifecaregarden/*`
- Create: `public/projects/home-information-management-system/*`
- Create: `public/projects/jpnms/*`
- Modify: `src/content/projects.ts`

- [ ] **Step 1: Inventory usable media**

Use read-only searches in the five source directories and select only:

- Existing interface screenshots.
- Figma exports or prototype screenshots.
- Diagrams that remain legible on the web.
- No production customer data, credentials, internal URLs, or sensitive identifiers.

Expected: a written media mapping in the commit diff through explicit `media` entries.

- [ ] **Step 2: Copy the approved resume and media**

Copy the current PDF to the stable public filename. Copy curated images into per-project folders without altering source projects.

- [ ] **Step 3: Add media alt text and captions**

Every media entry must describe what decision or flow the image proves, not merely say “screenshot”.

- [ ] **Step 4: Verify assets**

Run: `npm run build`

Run: `Get-ChildItem -Recurse dist/resume,dist/projects | Select-Object FullName,Length`

Expected: resume and selected project images exist in the build output.

- [ ] **Step 5: Commit**

```text
git add public src/content/projects.ts
git commit -m "feat: add resume and project evidence"
```

## Task 8: Responsive, accessibility and browser verification

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/styles/pages.css`
- Modify: affected components based on findings
- Create: `docs/verification/portfolio-v1-checklist.md`

- [ ] **Step 1: Add a verification checklist**

The checklist must cover:

- Homepage at desktop and mobile widths.
- Five case entries and four project routes.
- SaaS experience page.
- Resume link.
- Keyboard focus and mobile navigation.
- Broken image fallback.
- Unknown project 404.
- Normal and reduced-motion modes.

- [ ] **Step 2: Run automated checks**

Run: `npm test -- --run`

Run: `npm run build`

Expected: all tests pass and production build succeeds.

- [ ] **Step 3: Run the production preview**

Run: `npm run preview -- --host 127.0.0.1`

Expected: local production preview URL is available.

- [ ] **Step 4: Inspect desktop and mobile pages**

Use the browser to inspect screenshots at representative desktop and phone sizes. Fix:

- Text clipping or overlap.
- Unreadably small Chinese text.
- Excessive blur or animation.
- Inaccessible focus states.
- Project card order or link errors.

- [ ] **Step 5: Re-run verification**

Run: `npm test -- --run`

Run: `npm run build`

Expected: clean final run after visual fixes.

- [ ] **Step 6: Commit**

```text
git add src docs/verification
git commit -m "test: verify responsive portfolio experience"
```
