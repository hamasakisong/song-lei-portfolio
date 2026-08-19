import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { profile } from "../content/profile";
import { caseProjects } from "../content/projects";
import { MistField } from "../components/motion/MistField";
import { Reveal } from "../components/motion/Reveal";
import { WorkspaceScene } from "../components/motion/WorkspaceScene";
import { ProjectCard } from "../components/project/ProjectCard";

const method = [
  ["理解现场", "角色、问题、目标与约束"],
  ["建立模型", "流程、规则、状态与数据"],
  ["规划取舍", "范围、优先级、风险与节奏"],
  ["推动落地", "协作、验收、复盘与迭代"],
];

export function HomePage() {
  return (
    <>
      <section className="hero" id="home">
        <MistField />
        <WorkspaceScene />
        <div className="container hero__inner">
          <div className="hero__copy">
            <Reveal><p className="eyebrow">{profile.positioning}</p></Reveal>
            <Reveal delay={.06}><p className="hero__tagline">{profile.tagline}</p></Reveal>
            <HeroTitle />
            <Reveal delay={.16}><p className="hero__intro">{profile.intro}</p></Reveal>
          </div>
          <Reveal className="hero__actions" delay={.24}>
            <Link className="button button--primary" to="/#work">查看代表项目 →</Link>
          </Reveal>
          <Reveal className="proof-grid" delay={.3}>
            {profile.proof.map((item, index) => (
              <motion.div
                className="proof"
                key={item.label}
                initial={{ opacity: 0, scale: .9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: .4 + index * .12, duration: .5, ease: [0.22, 1, 0.36, 1] }}
              >
                <strong>{item.value}</strong><span>{item.label}</span>
              </motion.div>
            ))}
          </Reveal>
        </div>
        <span className="scroll-cue">向下浏览 / SCROLL</span>
      </section>

      <section className="career-section" id="career">
        <div className="container">
          <Reveal className="career-heading"><p className="eyebrow">01 / CAREER NARRATIVE</p><h2>从理解系统，<br />到规划可交付的产品。</h2></Reveal>
          <div className="career-list">
            {profile.career.map((item, index) => (
              <Reveal className="career-item" key={item.role} delay={index * .05}>
                <span>{item.period}</span><h3>{item.role}</h3><p>{item.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="container">
          <Reveal className="section-heading">
            <p className="eyebrow">02 / SELECTED WORK</p>
            <h2 className="work-heading__title">梳理业务流程，明确需求边界，<br />设计可落地的产品。</h2>
          </Reveal>
          <div className="project-grid">
            {caseProjects.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index === 0} />)}
          </div>
        </div>
      </section>

      <section className="section method-section" id="method">
        <div className="container method-layout">
          <Reveal><p className="eyebrow">03 / HOW I WORK</p><h2>从业务现场，<br />到可靠交付。</h2></Reveal>
          <div className="method-grid">
            {method.map(([title, detail], index) => (
              <Reveal className="method-step" key={title} delay={index * .06}>
                <span>0{index + 1}</span><h3>{title}</h3><p>{detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section experience-invite">
        <div className="container experience-layout">
          <Reveal><p className="eyebrow">04 / NOTES & REFLECTIONS</p><h2>记录判断形成的过程。</h2></Reveal>
          <Reveal delay={.08}>
            <p>把多年支付、SaaS 与项目推进经验，沉淀为可复用的方法、边界与复盘，而不只是堆叠文档。</p>
            <Link className="text-link" to="/experience">查看经验专题 →</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function HeroTitle() {
  const reduced = useReducedMotion();
  const lines = ["让复杂业务，", "成为清晰、可靠、", "可执行的系统。"];
  return (
    <h1 aria-label={profile.headline}>
      {lines.map((line, index) => (
        <motion.span
          className="hero-title-line"
          key={line}
          initial={reduced ? false : { opacity: 0, y: 42, rotateX: -12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: reduced ? 0 : .82, delay: reduced ? 0 : .08 + index * .11, ease: [0.22, 1, 0.36, 1] }}
        >
          {line}
        </motion.span>
      ))}
    </h1>
  );
}
