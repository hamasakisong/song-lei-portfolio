# B2B Portfolio Credibility Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio communicate Song Lei's B2B product-management value within the first screen and make every project case easy for an interviewer to assess as a product decision, not a technology demo.

**Architecture:** Keep the existing React + Vite single-page application and its data-first structure. Recruiter-facing copy remains in `src/content/profile.ts` and `src/content/projects.ts`; page components render that data without introducing a CMS or new dependencies. Visual work is restricted to hierarchy, alignment, and readable case evidence; the approved homepage illustration and its placement are not changed in this plan.

**Tech Stack:** React, TypeScript, React Router, Motion, Vitest, Testing Library, CSS.

## Global Constraints

- Do not replace, crop, recolor, or reposition `src/assets/workspace-portrait.png` in this phase.
- Preserve the approved project order: payment, lifecaregarden, jpnms, HomeInformationManagementSystem, then the SaaS experience topic.
- Keep phone number, email address, and resume-download entry points hidden.
- Do not add analytics, a CMS, third-party UI libraries, or a contact form.
- Do not claim production metrics that cannot be supported by the reconstructed project materials; use deliverables, scope, and validation language instead.
- All case copy must foreground business context, responsibility, decisions, delivery, and reflection; technology appears only as supporting evidence.
- Do not commit, push, or deploy during implementation unless the user explicitly asks to synchronize the phase.

---

## File Structure

- `src/content/profile.ts` — Single source of truth for homepage positioning, proof points, and career narrative.
- `src/content/projects.ts` — Single source of truth for project case narratives and structured evidence.
- `src/pages/HomePage.tsx` — Renders the recruiter-facing first-screen hierarchy, career narrative, selected cases, and method section.
- `src/pages/ProjectPage.tsx` — Renders each case as the same interview-friendly decision narrative.
- `src/pages/AboutPage.tsx` — Renders a concise, role-aligned professional profile and skills.
- `src/components/project/ProjectCard.tsx` — Renders each project preview and its call to action.
- `src/styles/pages.css` — Contains page-level spacing, hierarchy, responsive layout, and visual restraint.
- `src/pages/HomePage.test.tsx` — Protects the homepage's recruiter-facing content hierarchy.
- `src/pages/ProjectPage.test.tsx` — Protects the standard project-case decision structure.
- `src/content/projects.test.ts` — Protects the approved project order and the required evidence fields.
- `src/pages/AboutPage.test.tsx` — New focused test for the professional profile page.
- `docs/verification/portfolio-v1-checklist.md` — Existing manual visual and responsive acceptance checklist; update it with this phase's checks.

## Task 1: Establish the recruiter-facing content contract

**Files:**
- Modify: `src/content/profile.ts`
- Modify: `src/content/projects.ts`
- Modify: `src/content/projects.test.ts`

**Interfaces:**
- Consumes: the current `profile` object and `ProjectRecord` type.
- Produces: a `profile.positioning` sentence that names the target role, plus structured project fields that distinguish business context, responsibility, decisions, deliverables, and reflection.

- [ ] **Step 1: Write failing content-contract tests**

  Add the following assertions to `src/content/projects.test.ts`:

  ```ts
  import { projects } from "./projects";

  it("gives every interview case a complete decision narrative", () => {
    for (const project of projects.filter((item) => item.variant === "case")) {
      expect(project.problem.length).toBeGreaterThan(35);
      expect(project.role).toMatch(/负责|完成|主导/);
      expect(project.decisions).toHaveLength(3);
      expect(project.outcome).toHaveLength(3);
      expect(project.reflection.length).toBeGreaterThan(25);
    }
  });
  ```

  The test deliberately requires all four interview questions to be answerable from data: why the project mattered, what Song Lei owned, what choices were made, and what was delivered.

- [ ] **Step 2: Run the targeted test to verify the current data does not yet meet the contract**

  Run: `npm test -- --run src/content/projects.test.ts`

  Expected: FAIL if any case lacks exactly three decisions or three outcomes, or if a role statement does not make ownership explicit.

- [ ] **Step 3: Make the smallest data-model and copy changes**

  Keep the existing `ProjectRecord` type unless the current fields cannot express a fact. Rewrite only the displayed Chinese copy so that each of the four cases follows this pattern:

  ```ts
  problem: "业务角色、现状和失控风险。",
  role: "负责一期范围、业务流程、PRD、验收标准与研发协同。",
  decisions: [
    { title: "先收敛核心闭环", detail: "说明为何不做的范围，以及保留的最小闭环。" },
    { title: "用统一模型控制复杂度", detail: "说明状态、对象或规则如何被统一。" },
    { title: "把高风险异常前置", detail: "说明如何保证可追踪、可验证或可回溯。" },
  ],
  outcome: [
    "形成可演示的端到端业务闭环。",
    "沉淀 PRD、原型、接口或验收口径等可交付物。",
    "完成脱敏重构项目中的对应实现与验证。",
  ],
  reflection: "说明下一阶段的真实生产能力，以及为什么不在一期提前扩张。",
  ```

  Do not invent conversion rate, transaction volume, user count, cost savings, or production launch status. Correct the displayed project ordering so the `order` values and the array order both match the user's approved order: payment (1), lifecaregarden (2), jpnms (3), HomeInformationManagementSystem (4), SaaS topic (5).

- [ ] **Step 4: Update the homepage positioning source**

  In `src/content/profile.ts`, make `positioning` an explicit target-role descriptor rather than a capability-only phrase:

  ```ts
  positioning: "B 端产品经理 · 业务理解 × 产品规划 × 技术落地",
  ```

  Keep `headline` outcome-oriented. Keep proof values limited to the existing supportable facts: `9+`, `5`, and `PMP`.

- [ ] **Step 5: Run the content tests**

  Run: `npm test -- --run src/content/projects.test.ts`

  Expected: PASS, including the approved-order test and the new decision-narrative test.

- [ ] **Step 6: Review checkpoint**

  Read all revised Chinese content aloud in this order: positioning, payment, lifecaregarden, jpnms, HomeInformationManagementSystem, SaaS topic. Confirm every statement can be defended in an interview. Do not create a commit or deployment in this phase without an explicit user instruction.

## Task 2: Make the homepage scan in a recruiter-friendly order

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/styles/pages.css`
- Modify: `src/pages/HomePage.test.tsx`

**Interfaces:**
- Consumes: `profile.positioning`, `profile.headline`, `profile.intro`, `profile.proof`, `profile.career`, and `projects`.
- Produces: a first screen that reads role → value proposition → evidence → selected work, while preserving the currently approved background scene.

- [ ] **Step 1: Write failing hierarchy tests**

  Replace the homepage test assertions with these role-based checks:

  ```tsx
  it("renders the recruiter-facing homepage hierarchy", () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);

    expect(screen.getByText("B 端产品经理 · 业务理解 × 产品规划 × 技术落地")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /让复杂业务/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "查看代表项目 →" })).toHaveAttribute("href", "#work");
    expect(screen.getByText("支付行业经验")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "从理解系统，到规划可交付的产品。" })).toBeInTheDocument();
  });
  ```

- [ ] **Step 2: Run the test to verify it fails before the updated copy and accessible link are in place**

  Run: `npm test -- --run src/pages/HomePage.test.tsx`

  Expected: FAIL because the positioning text has changed and the visible call-to-action is currently an anchor rather than a link role assertion.

- [ ] **Step 3: Implement the scan order without changing the background scene**

  In `src/pages/HomePage.tsx`:

  1. Render `profile.positioning` above the `h1`.
  2. Keep the title as one outcome statement with three animated visual lines, but ensure `aria-label={profile.headline}` equals the full unbroken sentence.
  3. Keep the proof card and primary action in the right column; preserve their visual alignment with the left-side intro block.
  4. Change the call-to-action from `<a>` to `<Link>` only if routing to `/#work` is required; otherwise retain `<a href="#work">` and update the test to query `getByRole("link")` correctly.
  5. Keep the career and selected-work sections in their existing order.

  In `src/styles/pages.css`, tune only hierarchy and rhythm:

  ```css
  .hero__copy { padding-top: clamp(36px, 5vh, 64px); }
  .hero__intro { max-width: 42rem; }
  .hero__actions, .proof-grid { right: 0; }
  ```

  Do not change `.workspace-scene` image sizing, `object-position`, transform, overlay opacity, or the illustration asset in this task.

- [ ] **Step 4: Run the homepage test and production build**

  Run: `npm test -- --run src/pages/HomePage.test.tsx`

  Expected: PASS.

  Run: `npm run build`

  Expected: PASS and recreate `dist/` without TypeScript or Vite errors.

- [ ] **Step 5: Perform manual first-screen acceptance**

  At 1440×900 and 1920×1080, confirm without scrolling that the following are visible: target role, full headline, one-paragraph intro, all three proof values, and “查看代表项目 →”. Confirm the title, intro, proof card, and action do not overlap navigation or extend below the viewport. Confirm the background scene is unchanged from the approved version.

## Task 3: Standardize the case-study reading and evidence path

**Files:**
- Modify: `src/pages/ProjectPage.tsx`
- Modify: `src/components/project/ProjectCard.tsx`
- Modify: `src/styles/pages.css`
- Modify: `src/pages/ProjectPage.test.tsx`

**Interfaces:**
- Consumes: `ProjectRecord` fields `problem`, `role`, `constraints`, `decisions`, `media`, `outcome`, and `reflection`.
- Produces: one consistent seven-part case narrative for all four project routes, with project cards that state the business domain before technical tags.

- [ ] **Step 1: Write failing case-structure tests**

  Add this test to `src/pages/ProjectPage.test.tsx`:

  ```tsx
  it("presents the project as a product decision narrative", () => {
    render(<MemoryRouter initialEntries={["/projects/payment"]}><App /></MemoryRouter>);

    expect(screen.getByRole("heading", { name: "项目背景与业务问题" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "我的角色" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "目标、约束与范围" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "关键决策与取舍" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "结果与交付" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "复盘" })).toBeInTheDocument();
  });
  ```

- [ ] **Step 2: Run the test to verify the existing section labels do not yet satisfy the agreed Chinese contract**

  Run: `npm test -- --run src/pages/ProjectPage.test.tsx`

  Expected: FAIL if the heading strings do not exactly match the standardized labels.

- [ ] **Step 3: Implement the standardized case template**

  In `src/pages/ProjectPage.tsx`, keep the left sticky summary card, its one-pass meteor border, and the two-column layout. Render these exact `CaseSection` heading strings in this order:

  1. `项目背景与业务问题`
  2. `我的角色`
  3. `目标、约束与范围`
  4. `关键决策与取舍`
  5. `界面与流程证据`
  6. `结果与交付`
  7. `复盘`

  For projects without visual media, retain the explicit muted note rather than adding fabricated screenshots.

  In `src/components/project/ProjectCard.tsx`, make the eyebrow/business domain, title, and one-sentence summary appear before tags. Keep tags secondary and do not make Java, React, JSP, or Spring the card title.

  In `src/styles/pages.css`, preserve the existing readable left-card/right-narrative composition. Limit animation to the existing card-border beam and reveal transitions; do not add parallax, autoplay video, infinite glowing effects, or additional moving decorations.

- [ ] **Step 4: Run case tests and the full test suite**

  Run: `npm test -- --run src/pages/ProjectPage.test.tsx`

  Expected: PASS for the payment case and the unknown-project fallback.

  Run: `npm test -- --run`

  Expected: PASS for all test files.

- [ ] **Step 5: Perform manual case acceptance**

  Visit `/projects/payment`, `/projects/lifecaregarden`, `/projects/jpnms`, and `/projects/home-information-management-system`. Confirm each page can be skimmed in this order: context, responsibility, boundaries, decisions, evidence, delivery, reflection. Confirm the meteor border makes one obvious full circuit on entry, then stops; with reduced-motion enabled, confirm it does not render.

## Task 4: Align the About page and final conversion readiness

**Files:**
- Modify: `src/pages/AboutPage.tsx`
- Create: `src/pages/AboutPage.test.tsx`
- Modify: `src/styles/pages.css`
- Modify: `docs/verification/portfolio-v1-checklist.md`

**Interfaces:**
- Consumes: `profile.role`, `profile.intro`, `profile.skills`, and `profile.location`.
- Produces: a concise “about” page that reinforces B2B product-manager fit without exposing private contact details, plus an updated verification checklist for the eventual public-release phase.

- [ ] **Step 1: Write the failing About-page test**

  Create `src/pages/AboutPage.test.tsx`:

  ```tsx
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
  ```

- [ ] **Step 2: Run the test to verify the page needs the final role-aligned content**

  Run: `npm test -- --run src/pages/AboutPage.test.tsx`

  Expected: FAIL if the current About heading does not expose `B 端产品经理` as its accessible heading name.

- [ ] **Step 3: Implement the concise professional profile**

  In `src/pages/AboutPage.tsx`, use `profile.role` as the `h1` accessible name and keep the page limited to:

  - one role-aligned introduction from `profile.intro`;
  - a skill cloud headed `能力`; and
  - the existing `PMP 项目管理认证 · 计算机科学与技术本科` evidence line.

  Do not add a phone number, email address, downloadable resume, social account, or contact form. In `src/styles/pages.css`, ensure the heading, intro, and skill cloud have sufficient spacing at desktop and mobile breakpoints without introducing a new visual system.

- [ ] **Step 4: Extend the manual release checklist**

  Add a `B2B 求职可读性` section to `docs/verification/portfolio-v1-checklist.md` with these checkboxes:

  ```markdown
  - [ ] 首页首屏无需滚动即可看到目标职位、价值主张、三项证明信息和案例入口。
  - [ ] 每个项目都能回答：问题、职责、取舍、交付与复盘。
  - [ ] 所有数字均可由个人材料支持，未暗示虚构上线结果。
  - [ ] 联系方式、邮箱和简历下载仍处于隐藏状态。
  - [ ] 桌面端 1440×900、1920×1080 与移动端 390×844 均无重叠或横向滚动。
  ```

- [ ] **Step 5: Run final verification**

  Run: `npm test -- --run`

  Expected: PASS for all test files, including `AboutPage.test.tsx`.

  Run: `npm run build`

  Expected: PASS.

- [ ] **Step 6: Approval checkpoint**

  Present the local result for review. Do not stage, commit, push, or deploy until the user explicitly says the phase is approved for synchronization.

## Self-Review

### Spec coverage

- Homepage target-role clarity and readable first-screen hierarchy: Task 1 and Task 2.
- Project case storytelling as business decisions rather than technology demonstrations: Task 1 and Task 3.
- Controlled motion and visual restraint: Task 3 manual acceptance.
- A clear future conversion path without exposing private information now: Task 4.
- Background illustration deliberately excluded from modification: Global Constraints and Task 2.

### Placeholder scan

The plan contains no `TBD`, `TODO`, or unspecified test instructions. Every task lists file paths, test commands, expected results, and concrete implementation wording.

### Type consistency

All content tasks consume the existing `profile` object and `ProjectRecord` fields. No new production TypeScript types are required. The new About-page test uses the existing `AboutPage` component.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-27-b2b-portfolio-credibility-optimization.md`.

Two execution options:

1. **Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — execute the tasks in this session with checkpoints for your review.

Which approach?
