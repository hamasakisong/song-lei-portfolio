import { Link } from "react-router-dom";

export function NotFoundPage({ project = false }: { project?: boolean }) {
  return <section className="not-found"><div className="container"><p className="eyebrow">404 / NOT FOUND</p><h1>{project ? "这个案例还不存在" : "这个页面暂时不存在"}</h1><p>你可以回到首页继续查看精选项目与经验沉淀。</p><Link className="button button--primary" to="/">返回首页</Link></div></section>;
}
