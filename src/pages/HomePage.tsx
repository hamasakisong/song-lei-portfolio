import { Link } from "react-router-dom";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { MistField } from "../components/motion/MistField";
import { Reveal } from "../components/motion/Reveal";
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
      <section className="hero">
        <MistField />
        <div className="container hero__inner">
          <Reveal><p className="eyebrow">{profile.positioning}</p></Reveal>
          <Reveal delay={.08}><h1>{profile.headline}</h1></Reveal>
          <Reveal delay={.16}><p className="hero__intro">{profile.intro}</p></Reveal>
          <Reveal className="hero__actions" delay={.24}>
            <a className="button button--primary" href="#work">查看代表项目 →</a>
            <a className="button button--ghost" href="/resume/song-lei-b2b-product-manager.pdf" target="_blank" rel="noreferrer">下载简历</a>
          </Reveal>
          <Reveal className="proof-grid" delay={.3}>
            {profile.proof.map((item) => <div className="proof" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
          </Reveal>
        </div>
        <span className="scroll-cue">向下浏览 / SCROLL</span>
      </section>

      <section className="section" id="work">
        <div className="container">
          <Reveal className="section-heading">
            <p className="eyebrow">01 / SELECTED WORK</p>
            <h2>不是展示做了多少页面，<br />而是说明为什么这样规划。</h2>
          </Reveal>
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index === 0} />)}
          </div>
        </div>
      </section>

      <section className="section method-section" id="method">
        <div className="container method-layout">
          <Reveal><p className="eyebrow">02 / HOW I WORK</p><h2>从业务现场，<br />到可靠交付。</h2></Reveal>
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
          <Reveal><p className="eyebrow">03 / NOTES & REFLECTIONS</p><h2>记录判断形成的过程。</h2></Reveal>
          <Reveal delay={.08}>
            <p>把多年支付、SaaS 与项目推进经验，沉淀为可复用的方法、边界与复盘，而不只是堆叠文档。</p>
            <Link className="text-link" to="/experience">查看经验专题 →</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
