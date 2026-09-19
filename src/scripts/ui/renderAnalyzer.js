export const renderAnalyzer = (modes) => `
  <section class="analyzer card" aria-labelledby="analyzer-title">
    <div class="section-head">
      <h2 id="analyzer-title">Universal Dataset Analysis</h2>
      <span class="badge">Any File Format</span>
    </div>
    <p class="analyzer-intro">
      Upload any dataset file and run a free local AI-assisted summary for rapid research triage.
    </p>

    <form id="dataset-form" class="analyzer-form">
      <label class="field">
        <span>Dataset file</span>
        <input id="dataset-file" type="file" required />
      </label>
      <label class="field">
        <span>AI mode</span>
        <select id="ai-mode">
          ${modes.map((mode) => `<option value="${mode.value}">${mode.label}</option>`).join("")}
        </select>
      </label>
      <button type="submit" class="primary-btn">Analyze Dataset</button>
    </form>

    <div id="analysis-result" class="analysis-result" aria-live="polite"></div>
  </section>
`;

const createSummaryListItem = (label, value) => {
  const listItem = document.createElement("li");
  const strong = document.createElement("strong");
  strong.textContent = `${label}:`;
  listItem.append(strong, ` ${value}`);
  return listItem;
};

export const renderAnalysisResult = (container, report) => {
  container.textContent = "";

  const card = document.createElement("article");
  card.className = "result-card";

  const title = document.createElement("h3");
  title.textContent = "Analysis Summary";
  card.appendChild(title);

  const summaryList = document.createElement("ul");
  summaryList.className = "result-list";
  summaryList.append(
    createSummaryListItem("File", report.fileName),
    createSummaryListItem("Format", report.format),
    createSummaryListItem("Size", report.sizeLabel),
    createSummaryListItem("Records", String(report.recordEstimate)),
    createSummaryListItem("AI Mode", report.aiModeLabel)
  );
  card.appendChild(summaryList);

  const insightsTitle = document.createElement("h4");
  insightsTitle.textContent = "Free AI Insights";
  card.appendChild(insightsTitle);

  const insightsList = document.createElement("ul");
  insightsList.className = "result-list";
  report.insights.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    insightsList.appendChild(li);
  });
  card.appendChild(insightsList);

  container.appendChild(card);
};
