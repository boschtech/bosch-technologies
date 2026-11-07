import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// jsdom does not implement layout/scrolling APIs; stub them so components
// that call window.scrollTo (e.g. ScrollToTop) don't log noisy warnings.
window.scrollTo = vi.fn();

afterEach(() => {
  cleanup();
});
