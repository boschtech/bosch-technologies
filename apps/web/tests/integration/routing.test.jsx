import { render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '@/App';

describe('App routing', () => {
  it('renders the home page by default', () => {
    window.history.pushState({}, '', '/');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /ships faster/i })).toBeInTheDocument();
  });

  it('renders a 404 page for unknown routes', () => {
    window.history.pushState({}, '', '/this-route-does-not-exist');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /404/i })).toBeInTheDocument();
  });

  it('renders the shared header navigation', () => {
    window.history.pushState({}, '', '/');
    render(<App />);
    expect(within(screen.getByRole('navigation')).getByRole('link', { name: /take free assessment/i })).toBeInTheDocument();
  });
});

describe('marketing page routes render their content', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => [] }));
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each([
    ['/services/automation-test-strategy', /automation test strategy/i],
    ['/services/quality-engineering', /quality engineering/i],
    ['/services/training', /training/i],
    ['/portfolio', /demo application/i],
    ['/maturity-model', /test automation maturity model/i],
    ['/testimonials', /what our clients say/i],
    ['/contact', /contact/i],
  ])('renders %s', (path, heading) => {
    window.history.pushState({}, '', path);
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });
});
