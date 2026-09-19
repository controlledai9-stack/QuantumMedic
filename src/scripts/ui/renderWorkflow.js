export const renderWorkflow = (steps) => `
  <section class="workflow card">
    <div class="section-head">
      <h2>Dataset Upload & Model Run Workflow</h2>
      <span class="badge">Architecture Upgrade</span>
    </div>
    <div class="workflow-grid">
      ${steps
        .map(
          ({ step, details }) => `
            <article class="workflow-step">
              <h3>${step}</h3>
              <p>${details}</p>
            </article>
          `
        )
        .join("")}
    </div>
  </section>
`;
