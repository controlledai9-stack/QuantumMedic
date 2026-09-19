import { moduleCards, architectureItems, workflowSteps, aiModes } from "./config/content.js";
import { renderDashboard } from "./ui/render.js";
import { renderWorkflow } from "./ui/renderWorkflow.js";
import { renderAnalyzer, renderAnalysisResult } from "./ui/renderAnalyzer.js";
import { analyzeDataset } from "./services/analyzeDataset.js";

const app = document.getElementById("app");

if (app) {
  const dashboardHtml = renderDashboard({
    modules: moduleCards,
    architecture: architectureItems
  });
  const workflowHtml = renderWorkflow(workflowSteps);
  const analyzerHtml = renderAnalyzer(aiModes);

  app.innerHTML = `${dashboardHtml}${workflowHtml}${analyzerHtml}`;

  const form = document.getElementById("dataset-form");
  const fileInput = document.getElementById("dataset-file");
  const modeInput = document.getElementById("ai-mode");
  const result = document.getElementById("analysis-result");

  if (form && fileInput && modeInput && result) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const file = fileInput.files && fileInput.files[0];

      if (!file) {
        result.textContent = "Please choose a dataset file before analysis.";
        return;
      }

      const selectedMode = aiModes.find((mode) => mode.value === modeInput.value) || aiModes[0];
      result.textContent = "Running analysis...";

      try {
        const report = await analyzeDataset(file, selectedMode.label);
        result.innerHTML = renderAnalysisResult(report);
      } catch {
        result.textContent = "Analysis failed for this file. Try another dataset.";
      }
    });
  }
}
