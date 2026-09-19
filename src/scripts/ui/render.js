const createModuleCard = ({ title, description }) => `
  <article class="card">
    <h2>${title}</h2>
    <p>${description}</p>
  </article>
`;

const createArchitectureCard = (items) => `
  <article class="card">
    <h2>Architecture Improvements</h2>
    <ul class="highlights">
      ${items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  </article>
`;

export const renderDashboard = ({ modules, architecture }) => `
  <section class="grid">
    ${modules.map(createModuleCard).join("")}
    ${createArchitectureCard(architecture)}
  </section>
`;
