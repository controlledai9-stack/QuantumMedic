import { moduleCards, architectureItems } from "./config/content.js";
import { renderDashboard } from "./ui/render.js";

const app = document.getElementById("app");

if (app) {
  app.innerHTML = renderDashboard({
    modules: moduleCards,
    architecture: architectureItems
  });
}
