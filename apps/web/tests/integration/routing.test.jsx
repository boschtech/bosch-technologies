import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
    expect(screen.getByRole('link', { name: /take free assessment/i })).toBeInTheDocument();
  });
});
