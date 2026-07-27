# Glass Pill Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing logo-free, top-right navigation into a refined glass pill with a restrained sliding active base that reflects hover, focus, and the current route.

**Architecture:** Keep `SiteShell` as the sole navigation owner. A small typed array defines the four navigation items; `useLocation` derives the current item and short-lived hover/focus state selects the preview item. Measured link geometry becomes CSS custom properties on the desktop navigation track, where CSS transitions render the active base without GSAP or new dependencies.

**Tech Stack:** React, TypeScript, React Router, CSS, Vitest, Testing Library.

## Global Constraints

- Preserve the right-aligned, logo-free navigation and its four existing entries.
- Do not add GSAP, a logo, avatar, music, a dark theme, or new dependencies.
- `/` maps to 首页; `/#work` and `/projects/:slug` map to 精选案例; `/experience` maps to 经验沉淀; `/about` maps to 关于我.
- On pointer leave, the active base must return to the route-derived current item.
- Keyboard focus receives the same base feedback and remains visibly focusable.
- Reduced-motion users receive instant base positioning without an animated transition.
- Mobile retains the existing menu toggle and vertically expanded links; no desktop slider is shown inside it.
- Do not commit, push, or deploy unless the user explicitly asks to synchronize the phase.

---

## File Structure

- `src/components/layout/SiteShell.tsx` — Defines nav items, derives route state, measures active link geometry, and renders the desktop active base.
- `src/components/layout/SiteShell.test.tsx` — Protects link destinations, semantic navigation, and route-to-current-item mapping.
- `src/styles/global.css` — Defines glass pill styling, the sliding active base, hover/focus typography, reduced-motion behavior, and unchanged mobile fallback.

### Task 1: Add a route-aware active navigation model

**Files:**
- Modify: `src/components/layout/SiteShell.tsx`
- Modify: `src/components/layout/SiteShell.test.tsx`

**Interfaces:**
- Consumes: `useLocation(): Location` from React Router.
- Produces: `getCurrentNavKey(pathname: string, hash: string): NavKey` and a shared `navItems: NavItem[]` data source for desktop and mobile links.

- [ ] **Step 1: Write failing current-route tests**

  Add these tests to `src/components/layout/SiteShell.test.tsx`:

  ```tsx
  import { render, screen } from "@testing-library/react";
  import { MemoryRouter } from "react-router-dom";
  import { SiteShell } from "./SiteShell";

  it("marks selected work as current for a project detail route", () => {
    render(<MemoryRouter initialEntries={["/projects/payment"]}><SiteShell><p>内容</p></SiteShell></MemoryRouter>);

    expect(screen.getByRole("link", { name: "精选案例" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "首页" })).not.toHaveAttribute("aria-current");
  });

  it("marks the homepage as current for the root route", () => {
    render(<MemoryRouter initialEntries={["/"]}><SiteShell><p>内容</p></SiteShell></MemoryRouter>);

    expect(screen.getByRole("link", { name: "首页" })).toHaveAttribute("aria-current", "page");
  });
  ```

- [ ] **Step 2: Run the focused test to verify it fails**

  Run: `npm test -- --run src/components/layout/SiteShell.test.tsx`

  Expected: FAIL because links do not yet expose route-aware `aria-current`.

- [ ] **Step 3: Introduce the typed navigation data and route function**

  In `src/components/layout/SiteShell.tsx`, define the data and function above `SiteShell`:

  ```ts
  type NavKey = "home" | "work" | "experience" | "about";
  type NavItem = { key: NavKey; label: string; href: string };

  const navItems: NavItem[] = [
    { key: "home", label: "首页", href: "/" },
    { key: "work", label: "精选案例", href: "/#work" },
    { key: "experience", label: "经验沉淀", href: "/experience" },
    { key: "about", label: "关于我", href: "/about" },
  ];

  export function getCurrentNavKey(pathname: string, hash: string): NavKey {
    if (pathname.startsWith("/projects/") || hash === "#work") return "work";
    if (pathname === "/experience") return "experience";
    if (pathname === "/about") return "about";
    return "home";
  }
  ```

  Use `useLocation()` once inside `SiteShell`, derive `currentKey`, and render both desktop and mobile links by mapping `navItems`. Set `aria-current={item.key === currentKey ? "page" : undefined}` on all link instances.

- [ ] **Step 4: Run the focused test**

  Run: `npm test -- --run src/components/layout/SiteShell.test.tsx`

  Expected: PASS for header semantics, URLs, homepage state, and project-detail state.

### Task 2: Add a measured desktop active base and interaction preview

**Files:**
- Modify: `src/components/layout/SiteShell.tsx`
- Modify: `src/styles/global.css`
- Test: `src/components/layout/SiteShell.test.tsx`

**Interfaces:**
- Consumes: `navItems`, `currentKey`, and `getCurrentNavKey` from Task 1.
- Produces: `--nav-active-x` and `--nav-active-width` inline custom properties on `.nav-links`, plus `.nav-links__active-base`.

- [ ] **Step 1: Add geometry and preview state**

  Import `useLayoutEffect`, `useRef`, and `useState` from React. Within `SiteShell`, create:

  ```tsx
  const trackRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Partial<Record<NavKey, HTMLAnchorElement>>>({});
  const [previewKey, setPreviewKey] = useState<NavKey | null>(null);
  const [activeBounds, setActiveBounds] = useState({ x: 0, width: 0, ready: false });
  const displayKey = previewKey ?? currentKey;
  ```

  In `useLayoutEffect`, find `trackRef.current` and `linkRefs.current[displayKey]`; calculate `x` as `linkRect.left - trackRect.left` and `width` as `linkRect.width`. Recalculate on `window.resize` and clean up the listener. Set `ready: true` only after a link has been measured.

- [ ] **Step 2: Render the active base and wire input events**

  Render this span as the first child of desktop `.nav-links`:

  ```tsx
  <span
    className="nav-links__active-base"
    aria-hidden="true"
    style={{
      "--nav-active-x": `${activeBounds.x}px`,
      "--nav-active-width": `${activeBounds.width}px`,
      opacity: activeBounds.ready ? 1 : 0,
    } as React.CSSProperties}
  />
  ```

  For each desktop link, attach its ref and these handlers:

  ```tsx
  ref={(element) => { if (element) linkRefs.current[item.key] = element; }}
  onMouseEnter={() => setPreviewKey(item.key)}
  onFocus={() => setPreviewKey(item.key)}
  ```

  On the containing `<nav>`, add `onMouseLeave={() => setPreviewKey(null)}` and `onBlur` that clears `previewKey` only when focus leaves the navigation: `if (!event.currentTarget.contains(event.relatedTarget)) setPreviewKey(null);`.

- [ ] **Step 3: Add glass and active-base CSS**

  Replace the desktop `.nav-links` and `.nav-links a` styling with these rules while retaining current mobile media-query selectors:

  ```css
  .nav-links { position: relative; isolation: isolate; display: flex; gap: 3px; align-items: center; padding: 5px; border: 1px solid rgba(18,89,78,.13); border-radius: 999px; background: linear-gradient(135deg,rgba(255,255,255,.66),rgba(233,245,240,.42)); box-shadow: 0 14px 36px rgba(18,89,78,.08), inset 0 1px 0 rgba(255,255,255,.62); backdrop-filter: blur(20px) saturate(1.1); font-size: .74rem; letter-spacing: .05em; }
  .nav-links__active-base { position: absolute; z-index: -1; top: 5px; left: 5px; width: var(--nav-active-width); height: calc(100% - 10px); border: 1px solid rgba(18,89,78,.12); border-radius: 999px; background: linear-gradient(135deg,rgba(171,216,204,.64),rgba(225,243,236,.76)); box-shadow: 0 5px 14px rgba(18,89,78,.09), inset 0 1px 0 rgba(255,255,255,.7); transform: translateX(var(--nav-active-x)); transition: transform .42s cubic-bezier(.22,1,.36,1), width .42s cubic-bezier(.22,1,.36,1), opacity .18s; }
  .nav-links a { position: relative; z-index: 1; padding: 8px 13px; border-radius: 999px; color: var(--muted); transition: color .22s ease, transform .22s ease; }
  .nav-links a:hover,.nav-links a:focus-visible,.nav-links a[aria-current="page"] { color: var(--ink); transform: translateY(-1px); }
  ```

  Keep the existing global `:focus-visible` outline. Ensure mobile rules override `.nav-links__active-base { display: none; }` and reset desktop link transforms for expanded vertical links.

- [ ] **Step 4: Add reduced-motion behavior**

  Add:

  ```css
  @media (prefers-reduced-motion: reduce) {
    .nav-links__active-base,.nav-links a { transition: none; }
  }
  ```

- [ ] **Step 5: Run full automated verification**

  Run: `npm test -- --run`

  Expected: PASS for all tests.

  Run: `npm run build`

  Expected: PASS without TypeScript or CSS build errors.

- [ ] **Step 6: Manual acceptance**

  On desktop, check homepage, `/experience`, `/about`, and `/projects/payment`. Confirm the base starts under the correct route item, slides to a hovered or focused item, then returns to the route item on pointer leave or focus exit. At a 390px-wide viewport, confirm the menu toggle, links, closing action, and no slider remain intact. Enable reduced motion and confirm position updates are instant.

## Self-Review

### Spec coverage

- Glass capsule styling and restrained active base: Task 2.
- Route mapping including project details and `/#work`: Task 1.
- Hover, focus, pointer leave, reduced motion, and mobile fallback: Task 2.
- No GSAP, logo, routing, or page-content changes: Global Constraints.

### Placeholder scan

No placeholders or unspecified code steps remain.

### Type consistency

`NavKey`, `NavItem`, `getCurrentNavKey`, `linkRefs`, and the CSS custom property names are defined before each later use.
