import { Reveal } from "../components/motion/Reveal";
import { experienceProject } from "../content/projects";

export function ExperiencePage() {
  const project = experienceProject;
  return (
    <article className="editorial-page">
      <header className="editorial-hero"><div className="container"><Reveal><p className="eyebrow">EXPERIENCE / METHOD</p><h1>{project.title}</h1><p>{project.summary}</p></Reveal></div></header>
      <div className="container editorial-body">
        <Reveal className="editorial-intro"><span>多年经验不是一套万能模板</span><h2>我更关注判断如何形成，<br />以及它在什么边界内有效。</h2></Reveal>
        <div className="editorial-list">
          {project.decisions.map((item, index) => <Reveal className="editorial-item" key={item.title}><span>0{index + 1}</span><div><h2>{item.title}</h2><p>{item.detail}</p></div></Reveal>)}
        </div>
        <Reveal className="experience-note"><p className="eyebrow">长期沉淀</p><blockquote>{project.reflection}</blockquote></Reveal>
      </div>
    </article>
  );
}
