import React from 'react';
import type { TCitation } from 'librechat-data-provider';
import { cn } from '~/utils';

type CitationsBlockProps = {
  citations?: TCitation[];
  className?: string;
};

const CitationsBlock: React.FC<CitationsBlockProps> = ({ citations, className }) => {
  if (!citations || citations.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'mt-4 rounded-md border border-border-light bg-surface-primary-alt p-3 text-sm text-text-secondary dark:border-border-medium',
        className,
      )}
      role="note"
      aria-label="Ontario Building Code citations"
    >
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-text-primary">
        Citations
      </h3>
      <ul className="space-y-3">
        {citations.map(({ id, label, section, snippet, url, page }) => (
          <li key={id} className="space-y-1">
            <div className="text-text-primary">
              {label ?? id}
              {section ? <span className="ml-1 text-xs text-text-secondary">({section})</span> : null}
              {page != null ? (
                <span className="ml-1 text-xs font-medium text-text-secondary">(p. {page})</span>
              ) : null}
            </div>
            {snippet ? <p className="text-xs leading-snug text-text-secondary">{snippet}</p> : null}
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="block text-xs font-medium text-accent underline"
              >
                View Source
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitationsBlock;
