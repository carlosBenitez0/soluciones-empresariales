// Scroll helpers that respect the user's reduced-motion preference.

const behavior = (): ScrollBehavior =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';

/** Scrolls the window to the top of the page. */
export const scrollToTop = () => window.scrollTo({ top: 0, behavior: behavior() });

/** Scrolls so that the element's top is visible (use `scroll-mt-*` on it to clear the sticky navbar). */
export const scrollIntoViewTop = (element: Element | null) =>
  element?.scrollIntoView?.({ block: 'start', behavior: behavior() });
