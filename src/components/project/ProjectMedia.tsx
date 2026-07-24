import { useState } from "react";
import type { ProjectRecord } from "../../content/projects";

export function ProjectMedia({ media }: { media: ProjectRecord["media"] }) {
  if (!media.length) return null;
  return (
    <div className="media-grid">
      {media.map((item) => <MediaItem key={item.src} {...item} />)}
    </div>
  );
}

function MediaItem({ src, alt, caption }: ProjectRecord["media"][number]) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="media-item">
      {failed ? <div className="media-fallback">图片暂不可用</div> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
