import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              <img src="/images/logo.png" alt="Bosch Technologies" className="logo-img" />
            </Link>
            <p>
              Helping software teams ship faster with fewer defects through smart automation and
              expert quality engineering.
            </p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li>
                <Link to="/services/automation-test-strategy">Automation Test Strategy</Link>
              </li>
              <li>
                <Link to="/services/quality-engineering">Quality Engineering</Link>
              </li>
              <li>
                <Link to="/services/training">Training &amp; Enablement</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li>
                <Link to="/maturity-model">Maturity Model</Link>
              </li>
              <li>
                <Link to="/assessment">Free Assessment</Link>
              </li>
              <li>
                <Link to="/testimonials">Testimonials</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Bosch Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
