import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div className="site">
      <a className="skip-link" href="#main">跳到正文</a>
      <header className="site-header">
        <div className="container nav nav--right">
          <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((value) => !value)}>菜单</button>
          <nav id="main-nav" className="nav-links" aria-label="主导航" data-open={open}>
            <Link to="/" onClick={close}>首页</Link>
            <Link to="/#work" onClick={close}>精选案例</Link>
            <Link to="/experience" onClick={close}>经验沉淀</Link>
            <Link to="/about" onClick={close}>关于我</Link>
          </nav>
        </div>
      </header>
      <main id="main" className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <h2 className="footer-title">把复杂问题讲清楚，<br />把产品方案做扎实。</h2>
            <div className="footer-links">
              <span>联系方式暂不公开</span>
              <a href="#work">返回精选案例 ↑</a>
            </div>
          </div>
          <div className="footer-meta"><span>宋磊 · B 端产品经理</span><span>北京 · 业务 / 产品 / 技术</span></div>
        </div>
      </footer>
    </div>
  );
}
