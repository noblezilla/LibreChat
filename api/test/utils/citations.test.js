const { extractAnnotationCitations } = require('~/server/utils/citations');

describe('extractAnnotationCitations', () => {
  it('normalizes annotations into citations with page numbers and filename urls', () => {
    const content = [
      {
        type: 'text',
        text: {
          value: 'Building separation details.',
          annotations: [
            {
              type: 'file_citation',
              file_citation: {
                file_id: 'file-123',
                filename: 'nbc2020_page_33.json',
                page: '33',
                start_index: 0,
                end_index: 10,
              },
            },
          ],
        },
      },
    ];

    const { text, citations } = extractAnnotationCitations({ text: '', content });

    expect(text).toBe('Building separation details.');
    expect(citations).toHaveLength(1);
    expect(citations[0]).toMatchObject({
      id: 'file-123-p33',
      page: 33,
      url: 'nbc2020_page_33.json',
    });
  });

  it('ignores annotations without file information', () => {
    const content = [
      {
        type: 'text',
        text: {
          value: 'No file id here.',
          annotations: [{ type: 'file_citation', page: 2 }],
        },
      },
    ];

    const { citations } = extractAnnotationCitations({ content });
    expect(citations).toHaveLength(0);
  });

  it('deduplicates identical citations', () => {
    const content = [
      {
        type: 'text',
        text: {
          value: 'Duplicate citations.',
          annotations: [
            {
              type: 'file_citation',
              file_citation: { file_id: 'file-1', filename: 'doc.pdf', page: 5 },
            },
            {
              type: 'file_citation',
              file_citation: { file_id: 'file-1', filename: 'doc.pdf', page: 5 },
            },
          ],
        },
      },
    ];

    const { citations } = extractAnnotationCitations({ content });
    expect(citations).toHaveLength(1);
    expect(citations[0]).toMatchObject({
      id: 'file-1-p5',
      url: 'doc.pdf',
    });
  });
});
