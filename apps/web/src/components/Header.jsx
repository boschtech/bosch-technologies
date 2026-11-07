import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/services/automation-test-strategy', label: 'Services' },
  { to: '/maturity-model', label: 'Maturity Model' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-logo">
          <img src="/images/logo.png" alt="Bosch Technologies" className="logo-img" />
        </Link>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/assessment" className="nav-cta" onClick={() => setOpen(false)}>
              Take Free Assessment
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className={`nav-toggle${open ? ' active' : ''}`}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
