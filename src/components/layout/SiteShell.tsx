import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

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

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [previewKey, setPreviewKey] = useState<NavKey | null>(null);
  const [activeBounds, setActiveBounds] = useState({ x: 0, width: 0, ready: false });
  const trackRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Partial<Record<NavKey, HTMLAnchorElement>>>({});
  const { pathname, hash } = useLocation();
  const currentKey = getCurrentNavKey(pathname, hash);
  const displayKey = previewKey ?? currentKey;
  const close = () => setOpen(false);

  useLayoutEffect(() => {
    const updateActiveBounds = () => {
      const track = trackRef.current;
      const link = linkRefs.current[displayKey];
      if (!track || !link) return;

      const trackRect = track.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setActiveBounds({ x: linkRect.left - trackRect.left, width: linkRect.width, ready: true });
    };

    updateActiveBounds();
    window.addEventListener("resize", updateActiveBounds);
    return () => window.removeEventListener("resize", updateActiveBounds);
  }, [displayKey]);

  const navStyle = {
    "--nav-active-x": `${activeBounds.x}px`,
    "--nav-active-width": `${activeBounds.width}px`,
    "--nav-active-opacity": activeBounds.ready ? 1 : 0,
  } as CSSProperties;

  return (
    <div className="site">
      <a className="skip-link" href="#main">跳到正文</a>
      <header className="site-header">
        <div className="container nav nav--right">
          <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((value) => !value)}>菜单</button>
          <nav
            id="main-nav"
            ref={trackRef}
            className="nav-links"
            aria-label="主导航"
            data-open={open}
            style={navStyle}
            onMouseLeave={() => setPreviewKey(null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setPreviewKey(null);
            }}
          >
            <span className="nav-links__active-base" aria-hidden="true" />
            {navItems.map((item) => (
              <Link
                key={item.key}
                ref={(element) => {
                  if (element) linkRefs.current[item.key] = element;
                }}
                to={item.href}
                aria-current={item.key === currentKey ? "page" : undefined}
                onClick={close}
                onMouseEnter={() => setPreviewKey(item.key)}
                onFocus={() => setPreviewKey(item.key)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main id="main" className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <h2 className="footer-title">把复杂问题讲清楚，<br />把产品方案做扎实。</h2>
            <div className="footer-links">
              <a href="mailto:songlei818@sina.com">songlei818@sina.com</a>
              <Link to="/#work">返回精选案例 ↑</Link>
            </div>
          </div>
          <div className="footer-meta"><span>宋磊 · B 端产品经理</span><span>北京 · 业务 / 产品 / 技术</span></div>
        </div>
      </footer>
    </div>
  );
}
