import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
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
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 110]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 34]);
  return (
    <article className="case-page">
      <header className="case-hero" ref={heroRef}>
        <motion.span className="case-hero__glow" style={{ y: glowY }} aria-hidden="true" />
        <motion.div className="container case-hero__content" style={{ y: contentY }}>
          <Reveal><Link className="back-link" to="/#work">← 返回精选案例</Link></Reveal>
          <Reveal delay={.06}><p className="eyebrow">0{project.order} / CASE STUDY · 脱敏重构</p></Reveal>
          <Reveal delay={.12}><h1>{project.title}</h1></Reveal>
          <Reveal delay={.18}><p className="case-lead">{project.summary}</p></Reveal>
          <Reveal className="tag-list tag-list--large" delay={.24}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</Reveal>
        </motion.div>
      </header>
      <div className="container case-body">
        <CaseSection index="01" title="项目背景与业务问题"><p>{project.problem}</p></CaseSection>
        <CaseSection index="02" title="我的角色"><p>{project.role}</p></CaseSection>
        <CaseSection index="03" title="目标、约束与范围">
          <div className="constraint-grid">{project.constraints.map((item) => <div key={item}>{item}</div>)}</div>
        </CaseSection>
        <CaseSection index="04" title="范围与取舍">
          <div className="decision-grid">{project.decisions.map((item) => <div className="decision" key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></div>)}</div>
        </CaseSection>
        <CaseSection index="05" title="界面与流程证据"><ProjectMedia media={project.media} />{!project.media.length && <p className="muted-note">首版先以产品逻辑为主，后续继续补充经过脱敏的界面、流程图和演示视频。</p>}</CaseSection>
        <CaseSection index="06" title="结果与交付"><ul className="outcome-list">{project.outcome.map((item) => <li key={item}>{item}</li>)}</ul></CaseSection>
        <CaseSection index="07" title="复盘"><blockquote>{project.reflection}</blockquote></CaseSection>
      </div>
      <nav className="case-next" aria-label="案例导航"><div className="container"><Link to="/#work">继续查看其他案例 →</Link></div></nav>
    </article>
  );
}

function CaseSection({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return <Reveal className="case-section"><div className="case-section__label"><span>{index}</span><h2>{title}</h2></div><div className="case-section__content">{children}</div></Reveal>;
}
