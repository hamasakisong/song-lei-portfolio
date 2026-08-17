import { Reveal } from "../components/motion/Reveal";
import { experienceProject } from "../content/projects";

export function ExperiencePage() {
  const project = experienceProject;
  return (
    <article className="editorial-page">
      <header className="editorial-hero"><div className="container"><Reveal><p className="eyebrow">EXPERIENCE / METHOD</p><h1>{project.title}</h1><p>{project.summary}</p></Reveal></div></header>
      <div className="container editorial-body">
        <Reveal className="editorial-intro"><span>0→1 产品与系统设计作品</span><h2>先讲清资金闭环，<br />再展开平台与页面。</h2></Reveal>
        <Reveal className="experience-portfolio">
          <div className="experience-portfolio__heading"><h2>核心作品集</h2><p>网页呈现核心结构与判断；完整材料用于支持进一步的产品、业务和技术追问。</p></div>
          <div className="portfolio-evidence__grid">{project.portfolio.map((item, index) => <article key={item.title} className="portfolio-evidence__item"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
          {project.evidence.length > 0 ? <div className="portfolio-evidence__links">{project.evidence.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noreferrer">{item.label} <span aria-hidden="true">↗</span></a>)}</div> : <p className="experience-portfolio__note">当前网页展示核心内容；完整 PPT、Figma 原型与设计文档作为面试材料留存。公开链接确认后将在此补充。</p>}
        </Reveal>
        <div className="editorial-list">
          {project.decisions.map((item, index) => <Reveal className="editorial-item" key={item.title}><span>0{index + 1}</span><div><h2>{item.title}</h2><p>{item.detail}</p></div></Reveal>)}
        </div>
        <Reveal className="experience-note"><p className="eyebrow">适用边界</p><blockquote>{project.reflection}</blockquote></Reveal>
      </div>
    </article>
  );
}
