const FILE_CITATION = 'file_citation';

const parsePage = (page) => {
  if (page == null) {
    return undefined;
  }

  const parsed = typeof page === 'string' ? parseInt(page, 10) : page;
  return Number.isNaN(parsed) ? undefined : parsed;
};

/**
 * Normalize a single file citation annotation into the message.citations shape.
 * @param {Object} annotation
 * @returns {{ id: string; page?: number; url: string } | null}
 */
const normalizeAnnotationCitation = (annotation) => {
  if (!annotation || annotation.type !== FILE_CITATION) {
    return null;
  }

  const payload = annotation.file_citation ?? annotation;
  const fileId = payload.file_id ?? annotation.file_id;
  const filename = payload.filename ?? annotation.filename ?? annotation.text;
  const page = parsePage(payload.page ?? annotation.page);
  const idBase = fileId || filename;

  if (!idBase) {
    return null;
  }

  const citationId = `${idBase}-p${page != null ? page : 'na'}`;

  return {
    id: citationId,
    page: page ?? undefined,
    url: filename ?? fileId ?? '',
  };
};

/**
 * Extract citations from message content annotations and return normalized text + citations.
 * @param {Object} params
 * @param {string} [params.text]
 * @param {Array} [params.content]
 * @returns {{ text: string; citations: Array<{ id: string; page?: number; url: string }> }}
 */
function extractAnnotationCitations({ text, content }) {
  const normalizedCitations = [];
  const seen = new Set();
  let normalizedText = typeof text === 'string' ? text : '';

  if (Array.isArray(content)) {
    const textParts = [];

    for (const part of content) {
      if (!part || part.type !== 'text') {
        continue;
      }

      const rawText =
        typeof part.text === 'string'
          ? part.text
          : typeof part.text?.value === 'string'
            ? part.text.value
            : '';

      if (rawText) {
        textParts.push(rawText);
      }

      const annotations =
        (Array.isArray(part.text?.annotations) && part.text.annotations) ||
        (Array.isArray(part.annotations) && part.annotations) ||
        [];

      for (const annotation of annotations) {
        const citation = normalizeAnnotationCitation(annotation);
        if (!citation) {
          continue;
        }

        const key = `${citation.id}:${citation.page ?? 'na'}`;
        if (seen.has(key)) {
          continue;
        }
        seen.add(key);
        normalizedCitations.push(citation);
      }
    }

    if (!normalizedText && textParts.length > 0) {
      normalizedText = textParts.join('\n\n').trim();
    }
  }

  return {
    text: normalizedText,
    citations: normalizedCitations,
  };
}

module.exports = {
  extractAnnotationCitations,
  normalizeAnnotationCitation,
};
