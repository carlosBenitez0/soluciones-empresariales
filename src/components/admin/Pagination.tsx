'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { scrollToTop } from '../../lib/scroll';

export const DEFAULT_PAGE_SIZE = 20;

/**
 * Current page that goes back to 1 whenever `resetKey` changes (e.g. the active filters),
 * without a setState-in-effect.
 */
export const usePageState = (resetKey: string) => {
  const [state, setState] = useState({ page: 1, key: resetKey });
  const page = state.key === resetKey ? state.page : 1;
  const setPage = (next: number) => setState({ page: next, key: resetKey });
  return { page, setPage };
};

export interface PageSlice<T> {
  pageItems: T[];
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
}

export const paginate = <T,>(items: T[], page: number, pageSize = DEFAULT_PAGE_SIZE): PageSlice<T> => {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    pageItems: items.slice((current - 1) * pageSize, current * pageSize),
    page: current,
    totalPages,
    total: items.length,
    pageSize,
  };
};

/** Page numbers to show, with null as an ellipsis: 1 … 4 5 6 … 13 */
const visiblePages = (page: number, totalPages: number): (number | null)[] => {
  const pages = new Set([1, totalPages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= totalPages));
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((p, idx) => (idx > 0 && p - sorted[idx - 1] > 1 ? [null, p] : [p]));
};

interface PaginationProps {
  slice: PageSlice<unknown>;
  onPageChange: (page: number) => void;
  /** Noun for the counter, e.g. "candidatos" */
  label: string;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ slice, onPageChange, label, className = '' }) => {
  const { page, totalPages, total, pageSize } = slice;
  if (total === 0) return null;

  // A new page is a new view: start reading it from the top, not from the pagination bar
  const goTo = (next: number) => {
    onPageChange(next);
    scrollToTop();
  };

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const buttonBase =
    'min-w-8 h-8 px-2 rounded-lg text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <nav
      aria-label={`Paginación de ${label}`}
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 bg-white ${className}`}
    >
      <p className="text-xs text-slate-600 font-medium">
        Mostrando <strong className="text-slate-900">{from}–{to}</strong> de <strong className="text-slate-900">{total}</strong> {label}
      </p>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label="Página anterior"
            className={`${buttonBase} text-slate-700 hover:bg-slate-100`}
          >
            <ChevronLeft className="w-4 h-4 mx-auto" />
          </button>
          {visiblePages(page, totalPages).map((p, idx) =>
            p === null ? (
              <span key={`gap-${idx}`} className="px-1 text-xs text-slate-400">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => goTo(p)}
                aria-current={p === page ? 'page' : undefined}
                className={`${buttonBase} ${p === page ? 'bg-blue-700 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                {p}
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            aria-label="Página siguiente"
            className={`${buttonBase} text-slate-700 hover:bg-slate-100`}
          >
            <ChevronRight className="w-4 h-4 mx-auto" />
          </button>
        </div>
      )}
    </nav>
  );
};
