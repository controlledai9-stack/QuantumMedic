const TEXT_EXTENSIONS = new Set([
  "csv",
  "tsv",
  "txt",
  "json",
  "xml",
  "html",
  "md",
  "yml",
  "yaml",
  "log"
]);

const formatBytes = (size) => {
  if (size < 1024) {
    return `${size} B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const getExtension = (fileName) => {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "unknown";
};

const parseTextMetrics = (text, format) => {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const words = text.trim().length ? text.trim().split(/\s+/).length : 0;
  const base = {
    format,
    lineCount: lines.length,
    wordCount: words
  };

  if (format === "json") {
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        return { ...base, recordEstimate: parsed.length, schemaHint: "JSON array" };
      }
      return {
        ...base,
        recordEstimate: Object.keys(parsed || {}).length,
        schemaHint: "JSON object"
      };
    } catch {
      return { ...base, recordEstimate: lines.length, schemaHint: "JSON-like text" };
    }
  }

  if (format === "csv" || format === "tsv") {
    const delimiter = format === "tsv" ? "\t" : ",";
    const columns = lines[0] ? lines[0].split(delimiter).length : 0;
    return {
      ...base,
      recordEstimate: Math.max(lines.length - 1, 0),
      schemaHint: `${columns} columns`
    };
  }

  if (format === "xml" || format === "html") {
    const tagCount = (text.match(/<[^>]+>/g) || []).length;
    return { ...base, recordEstimate: tagCount, schemaHint: "Tagged markup" };
  }

  return { ...base, recordEstimate: lines.length, schemaHint: "Unstructured text" };
};

const parseBinaryMetrics = async (file) => {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const sampleSize = Math.min(bytes.length, 8192);
  const uniqueValues = new Set(bytes.slice(0, sampleSize)).size;
  return {
    format: "binary/unknown",
    lineCount: 0,
    wordCount: 0,
    recordEstimate: sampleSize,
    schemaHint: `${uniqueValues} unique byte values in sample`
  };
};

const buildInsights = (metrics, fileName) => {
  const insights = [];
  insights.push(`Dataset "${fileName}" parsed as ${metrics.format}.`);

  if (metrics.recordEstimate > 1000) {
    insights.push("Large dataset detected; run chunked modeling for stable experiment cycles.");
  } else if (metrics.recordEstimate > 0) {
    insights.push("Dataset size is suitable for rapid prototype experiments.");
  } else {
    insights.push("Low detectable structure; consider adding metadata or headers before modeling.");
  }

  insights.push(`Schema signal: ${metrics.schemaHint}.`);

  if (metrics.wordCount > 0) {
    insights.push("Text-rich content found; NLP-style feature extraction can complement QML ranking.");
  } else {
    insights.push("Non-text or encoded content found; use feature extraction pipelines before model runs.");
  }

  return insights;
};

export const analyzeDataset = async (file, aiModeLabel) => {
  const extension = getExtension(file.name);
  const isTextType = file.type.startsWith("text/") || TEXT_EXTENSIONS.has(extension);

  let metrics;
  if (isTextType) {
    const text = await file.text();
    const normalizedFormat = TEXT_EXTENSIONS.has(extension) ? extension : "text";
    metrics = parseTextMetrics(text, normalizedFormat);
  } else {
    metrics = await parseBinaryMetrics(file);
  }

  return {
    fileName: file.name,
    format: metrics.format,
    sizeLabel: formatBytes(file.size),
    recordEstimate: metrics.recordEstimate,
    aiModeLabel,
    insights: buildInsights(metrics, file.name)
  };
};
