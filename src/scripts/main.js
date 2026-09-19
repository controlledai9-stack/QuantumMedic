import { moduleCards, architectureItems, workflowSteps } from "./config/content.js";
import { renderDashboard } from "./ui/render.js";
import { renderWorkflow } from "./ui/renderWorkflow.js";

const app = document.getElementById("app");

if (app) {
  const dashboardHtml = renderDashboard({
    modules: moduleCards,
    architecture: architectureItems
  });
  const workflowHtml = renderWorkflow(workflowSteps);

  app.innerHTML = `${dashboardHtml}${workflowHtml}`;
}
