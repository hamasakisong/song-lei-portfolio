import { motion, useReducedMotion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { findProject, type ProjectRecord } from "../content/projects";
import { ProjectMedia } from "../components/project/ProjectMedia";
import { Reveal } from "../components/motion/Reveal";
import { NotFoundPage } from "./NotFoundPage";

export function ProjectPage() {
  const { slug = "" } = useParams();
  const project = findProject(slug);
  if (!project) return <NotFoundPage project />;
  return <ProjectCasePage project={project} />;
}

function ProjectCasePage({ project }: { project: ProjectRecord }) {
  const reduced = useReducedMotion();
  return (
    <article className="case-page">
      <div className="container case-layout">
        <aside className="case-layout__aside">
          <Reveal>
            <motion.section
              className="case-summary-card"
              initial={reduced ? false : { opacity: 0, y: 26, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduced ? 0 : .68, ease: [0.22, 1, 0.36, 1] }}
            >
              {!reduced && (
                <span className="case-summary-card__beam" aria-hidden="true">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <rect className="case-summary-card__beam-trail" x="1.5" y="1.5" width="97" height="97" rx="2" pathLength="100" />
                    <rect className="case-summary-card__beam-core" x="1.5" y="1.5" width="97" height="97" rx="2" pathLength="100" />
                  </svg>
                </span>
              )}
              <span className="case-summary-card__index">0{project.order} / CASE STUDY</span>
              <h1>{project.title}</h1>
              <p>{project.summary}</p>
              <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <span className="case-summary-card__note">脱敏重构 · 产品规划视角</span>
            </motion.section>
          </Reveal>
        </aside>
        <main className="case-narrative">
          <Reveal><Link className="back-link" to="/#work">← 返回精选案例</Link></Reveal>
          <Reveal delay={.05} className="case-narrative__intro">
            <p className="eyebrow">从业务规则到可交付方案</p>
            <p>不只展示页面，而是把这套系统为什么这样规划、如何控制边界和推动落地，逐步讲清楚。</p>
          </Reveal>
          <CaseSection index="01" title="项目背景与业务问题"><p>{project.problem}</p></CaseSection>
          <CaseSection index="02" title="我的角色"><p>{project.role}</p></CaseSection>
          <CaseSection index="03" title="目标、约束与范围">
          <div className="constraint-grid">{project.constraints.map((item) => <div key={item}>{item}</div>)}</div>
          </CaseSection>
          <CaseSection index="04" title="关键决策与取舍">
          <div className="decision-grid">{project.decisions.map((item) => <div className="decision" key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></div>)}</div>
          </CaseSection>
          <CaseSection index="05" title="核心作品集"><PortfolioEvidence project={project} /></CaseSection>
          <CaseSection index="06" title="界面与流程证据"><ProjectMedia media={project.media} />{!project.media.length && <p className="muted-note">核心交付物已在上方概览；完整原型与工程材料可通过外部链接查看。</p>}</CaseSection>
          <CaseSection index="07" title="结果与交付"><ul className="outcome-list">{project.outcome.map((item) => <li key={item}>{item}</li>)}</ul></CaseSection>
          <CaseSection index="08" title="复盘"><blockquote>{project.reflection}</blockquote></CaseSection>
        </main>
      </div>
      <nav className="case-next" aria-label="案例导航"><div className="container"><Link to="/#work">继续查看其他案例 →</Link></div></nav>
    </article>
  );
}

function PortfolioEvidence({ project }: { project: ProjectRecord }) {
  return <div className="portfolio-evidence">
    <div className="portfolio-evidence__grid">{project.portfolio.map((item, index) => <article key={item.title} className="portfolio-evidence__item"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
    {project.evidence.length > 0 && <div className="portfolio-evidence__links">{project.evidence.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noreferrer">{item.label} <span aria-hidden="true">↗</span></a>)}</div>}
  </div>;
}

function CaseSection({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return <Reveal className="case-section"><div className="case-section__label"><span>{index}</span><h2>{title}</h2></div><div className="case-section__content">{children}</div></Reveal>;
}
