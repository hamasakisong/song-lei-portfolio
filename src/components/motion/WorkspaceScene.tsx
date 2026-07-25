import workspacePortrait from "../../assets/workspace-portrait.png";

export function WorkspaceScene() {
  return (
    <div className="workspace-scene" aria-hidden="true">
      <img className="workspace-scene__image" src={workspacePortrait} alt="" />
      <span className="workspace-scene__wash" />
      <span className="workspace-scene__screen-glow" />
    </div>
  );
}
