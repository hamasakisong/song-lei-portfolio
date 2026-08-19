import { Reveal } from "../components/motion/Reveal";
import { profile } from "../content/profile";

export function AboutPage() {
  return (
    <article className="about-page">
      <div className="container about-hero">
        <Reveal><p className="eyebrow">ABOUT / PRODUCT PROFILE</p><h1>{profile.role}</h1></Reveal>
        <Reveal delay={.08}><p className="about-lead">{profile.intro}</p></Reveal>
      </div>
      <div className="container about-grid">
        <Reveal><p className="eyebrow">经历</p><h2>从研发工程师，到产品与项目负责人。</h2><p>经历主要集中在金融支付和企业级业务系统方向。早期具备研发背景，后续逐渐转向产品岗位，长期负责复杂业务流程梳理、平台型产品设计和项目落地；同时运用数据分析与 AI 产品实践，推动产品持续优化。</p></Reveal>
        <Reveal delay={.08}><p className="eyebrow">能力</p><div className="skill-cloud">{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><p className="certificate">PMP 项目管理认证 · 计算机科学与技术本科</p></Reveal>
      </div>
    </article>
  );
}
