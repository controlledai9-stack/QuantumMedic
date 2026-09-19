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

export const renderAnalysisResult = (report) => `
  <article class="result-card">
    <h3>Analysis Summary</h3>
    <ul class="result-list">
      <li><strong>File:</strong> ${report.fileName}</li>
      <li><strong>Format:</strong> ${report.format}</li>
      <li><strong>Size:</strong> ${report.sizeLabel}</li>
      <li><strong>Records:</strong> ${report.recordEstimate}</li>
      <li><strong>AI Mode:</strong> ${report.aiModeLabel}</li>
    </ul>
    <h4>Free AI Insights</h4>
    <ul class="result-list">
      ${report.insights.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  </article>
`;
