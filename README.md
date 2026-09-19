# QuantumMedic

QuantumMedic defines **quantum machine learning (QML)** capabilities for an existing medical-research web app.

## Focus Areas

- **Virus cure research support:** explore candidate molecules and treatment pathways with QML-driven ranking.
- **DNA testing for disease detection:** analyze DNA signal patterns to assist early disease-risk detection workflows.

## App Feature Scope

Integrate these QML modules into your existing web application:

1. **Virus cure research support module**
   - Rank molecule/treatment candidates using QML scoring.
   - Surface high-priority candidates for researcher review.
2. **DNA testing disease-detection module**
   - Analyze DNA signal patterns for disease-risk indicators.
   - Provide interpretable risk outputs to support further testing.

## Note

This project scope supports research workflows and is not a clinical decision system.

## UI + Frontend Architecture

- `index.html` contains the base layout shell.
- `src/styles/main.css` provides responsive visual styling.
- `src/scripts/config/content.js` stores UI content/config data.
- `src/scripts/ui/render.js` handles UI rendering logic.
- `src/scripts/ui/renderWorkflow.js` renders the dataset-upload and model-run workflow section.
- `src/scripts/ui/renderAnalyzer.js` renders dataset analysis UI and report output.
- `src/scripts/services/analyzeDataset.js` provides format-agnostic dataset analysis with a free local AI-style insight engine.
- `src/scripts/main.js` wires data and rendering into the app entry point.

## Dataset Analysis Support

- Upload supports any file format through a universal file input.
- Structured text formats (`csv`, `tsv`, `json`, `xml`, `txt`, etc.) get parsed metrics.
- Unknown/binary formats fall back to byte-sample analysis.
- Free AI mode is local and requires no API key.