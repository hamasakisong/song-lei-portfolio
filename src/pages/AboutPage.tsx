import { Reveal } from "../components/motion/Reveal";
import { profile } from "../content/profile";

export function AboutPage() {
  return (
    <article className="about-page">
      <div className="container about-hero">
        <Reveal><p className="eyebrow">ABOUT / SONG LEI</p><h1>懂业务，也懂系统<br />如何真正落地。</h1></Reveal>
        <Reveal delay={.08}><p className="about-lead">{profile.intro}</p></Reveal>
      </div>
      <div className="container about-grid">
        <Reveal><p className="eyebrow">经历</p><h2>从研发工程师，到产品与项目负责人。</h2><p>2012 年进入软件行业，长期参与聚合支付、电子券营销、统一支付与企业后台系统建设。研发背景让我能理解技术边界，项目管理经历让我更重视范围、节奏和验收。</p></Reveal>
        <Reveal delay={.08}><p className="eyebrow">能力</p><div className="skill-cloud">{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><p className="certificate">PMP 项目管理认证 · 计算机科学与技术本科</p></Reveal>
      </div>
    </article>
  );
}
