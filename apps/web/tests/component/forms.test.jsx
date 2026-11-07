import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ContactForm from '@/components/forms/ContactForm';
import { TestimonialForm, TestimonialList } from '@/components/forms/Testimonials';

const reply = (data = { success: true }, ok = true) => ({ ok, json: async () => data });
const change = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });

beforeEach(() => { vi.stubGlobal('fetch', vi.fn().mockResolvedValue(reply())); });
afterEach(() => { vi.unstubAllGlobals(); });

function fillContact() {
  change('Full Name *', 'Jane Smith');
  change('Work Email *', 'jane@example.com');
  change('Company *', 'Acme');
  change('Interested In *', 'training');
  change('Message *', 'Please help our team.');
}
function fillTestimonial() {
  change('Your Name *', 'Jane Smith');
  change('Work Email *', 'jane@example.com');
  change('Job Title *', 'QA Lead');
  change('Company *', 'Acme');
  change('Service Used *', 'training');
  change('Your Testimonial *', 'Excellent training and practical guidance.');
}

describe('contact form', () => {
  it('validates required fields and malformed email without sending', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getAllByRole('alert')).toHaveLength(5);
    fillContact();
    change('Work Email *', 'invalid');
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });
  it('posts the JSON contract and displays success', async () => {
    render(<ContactForm />);
    fillContact();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText('Message Sent!')).toBeInTheDocument();
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe('/api/contact');
    expect(options.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(JSON.parse(options.body)).toEqual({ name: 'Jane Smith', email: 'jane@example.com', company: 'Acme', service: 'training', message: 'Please help our team.' });
  });
  it('displays backend errors and allows retry after network failure', async () => {
    fetch.mockResolvedValueOnce(reply({ error: 'Email delivery unavailable' }, false)).mockRejectedValueOnce(new Error('Network unavailable'));
    render(<ContactForm />);
    fillContact();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Email delivery unavailable');
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Network unavailable'));
    expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
  });
});

describe('testimonial form', () => {
  it('validates all source-required fields', () => {
    render(<TestimonialForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit testimonial/i }));
    expect(screen.getAllByRole('alert')).toHaveLength(6);
    expect(fetch).not.toHaveBeenCalled();
  });
  it('submits multipart uploads under camelCase contract fields and can reset', async () => {
    const user = userEvent.setup();
    render(<TestimonialForm />);
    fillTestimonial();
    const logo = new File(['png'], 'logo.png', { type: 'image/png' });
    const letter = new File(['pdf'], 'letter.pdf', { type: 'application/pdf' });
    await user.upload(screen.getByLabelText('Company Logo (optional)'), logo);
    await user.upload(screen.getByLabelText('Reference Letter (optional)'), letter);
    fireEvent.click(screen.getByRole('button', { name: /submit testimonial/i }));
    expect(await screen.findByText('Thank You!')).toBeInTheDocument();
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe('/api/testimonials');
    expect(options.headers).toBeUndefined();
    expect(options.body.get('logo')).toBe(logo);
    expect(options.body.get('referenceLetter')).toBe(letter);
    expect(options.body.get('reference_letter')).toBeNull();
    expect(options.body.get('name')).toBe('Jane Smith');
    fireEvent.click(screen.getByRole('button', { name: 'Submit Another' }));
    expect(screen.getByLabelText('Your Name *')).toHaveValue('');
  });
  it('supports clearing an uploaded file and omits empty uploads', async () => {
    const user = userEvent.setup();
    render(<TestimonialForm />);
    fillTestimonial();
    await user.upload(screen.getByLabelText('Company Logo (optional)'), new File(['x'], 'logo.png', { type: 'image/png' }));
    fireEvent.click(screen.getByRole('button', { name: /remove company logo/i }));
    expect(screen.getByLabelText('Company Logo (optional)').files).toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: /submit testimonial/i }));
    await screen.findByText('Thank You!');
    expect(fetch.mock.calls[0][1].body.has('logo')).toBe(false);
    expect(fetch.mock.calls[0][1].body.has('referenceLetter')).toBe(false);
  });
  it('checks upload size and type before submitting', () => {
    render(<TestimonialForm />);
    fillTestimonial();
    const big = new File([new Uint8Array(6 * 1024 * 1024)], 'big.pdf', { type: 'application/pdf' });
    fireEvent.change(screen.getByLabelText('Company Logo (optional)'), { target: { files: [big] } });
    fireEvent.change(screen.getByLabelText('Reference Letter (optional)'), { target: { files: [big] } });
    fireEvent.click(screen.getByRole('button', { name: /submit testimonial/i }));
    expect(screen.getByText('Choose a PNG, JPG, or SVG logo.')).toBeInTheDocument();
    expect(screen.getByText('Reference letter must be 5 MB or smaller.')).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });
  it('shows server rejection and permits retry', async () => {
    fetch.mockResolvedValueOnce(reply({ error: 'Please shorten your testimonial' }, false));
    render(<TestimonialForm />);
    fillTestimonial();
    fireEvent.click(screen.getByRole('button', { name: /submit testimonial/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Please shorten your testimonial');
    fireEvent.click(screen.getByRole('button', { name: /submit testimonial/i }));
    expect(await screen.findByText('Thank You!')).toBeInTheDocument();
  });
});

describe('approved testimonials API list', () => {
  it('renders only returned records, text safely, logo, and referencePdf links', async () => {
    fetch.mockResolvedValue(reply([
      { id: '1', name: 'Jane', company: 'Acme', role: 'Lead', testimonial: '<script>bad</script>\nHelpful team.', service: 'Training', logo: '/uploads/logo.png', referencePdf: '/uploads/ref.pdf' },
      { id: '2', name: 'John', company: 'Beta', role: '', testimonial: 'Great', service: 'Strategy', logo: '', referencePdf: '' },
    ]));
    render(<TestimonialList />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading testimonials');
    expect(await screen.findByText('<script>bad</script>')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Acme logo' })).toHaveAttribute('src', '/uploads/logo.png');
    expect(screen.getByRole('link', { name: /view full reference letter/i })).toHaveAttribute('href', '/uploads/ref.pdf');
    expect(screen.getByText('BE')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('/api/testimonials');
  });
  it('shows an empty state', async () => {
    fetch.mockResolvedValue(reply([]));
    render(<TestimonialList />);
    expect(await screen.findByText(/Testimonials coming soon/)).toBeInTheDocument();
  });
  it('shows a retrieval error', async () => {
    fetch.mockResolvedValue(reply({}, false));
    render(<TestimonialList />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load testimonials');
  });
});
