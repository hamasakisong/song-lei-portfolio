import { Link } from "react-router-dom";
import type { ProjectRecord } from "../../content/projects";
import { Reveal } from "../motion/Reveal";

export function ProjectCard({ project, featured = false }: { project: ProjectRecord; featured?: boolean }) {
  const href = project.variant === "experience" ? "/experience" : `/projects/${project.slug}`;
  return (
    <Reveal className={`project-card${featured ? " project-card--featured" : ""}`} delay={(project.order - 1) * .05}>
      <article>
        <Link className="project-card__link" to={href} aria-label={`查看${project.title}案例`}>
          <div className="project-card__top"><span>0{project.order}</span><span>{project.eyebrow}</span></div>
          <div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="tag-list">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
          <span className="project-card__arrow">↗</span>
        </Link>
      </article>
    </Reveal>
  );
}
