import { Link } from "react-router-dom";
import SiteIcon from "@/components/SiteIcon";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <>
      <section className="service-hero">
        <div className="container">
          <span className="badge badge-accent">Get in Touch</span>
          <h1>Contact Us</h1>
          <p>
            Ready to improve your test automation? Let&apos;s start with a
            conversation about your goals and challenges.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 className="mb-3">Send Us a Message</h2>
              <ContactForm />
            </div>

            <div>
              <div className="contact-info-card">
                <h3>Other Ways to Reach Us</h3>

                <div className="contact-info-item">
                  <div className="ci-icon">
                    <SiteIcon name="mail" />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>admin@boschtechnologies.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="ci-icon">
                    <SiteIcon name="globe" />
                  </div>
                  <div>
                    <h4>Website</h4>
                    <p>boschtechnologies.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="ci-icon">
                    <SiteIcon name="clock" />
                  </div>
                  <div>
                    <h4>Response Time</h4>
                    <p>
                      We typically respond within 24 hours on business days.
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "32px",
                  padding: "32px",
                  background: "var(--gray-100)",
                  borderRadius: "16px",
                }}
              >
                <h3 style={{ marginBottom: "16px" }}>Quick Actions</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <Link
                    to="/assessment"
                    className="btn btn-primary"
                    style={{ justifyContent: "center" }}
                  >
                    Take Free Maturity Assessment
                  </Link>
                  <Link
                    to="/maturity-model"
                    className="btn btn-outline"
                    style={{ justifyContent: "center" }}
                  >
                    Explore Our Maturity Model
                  </Link>
                  <Link
                    to="/services/automation-test-strategy"
                    className="btn btn-outline"
                    style={{ justifyContent: "center" }}
                  >
                    View Our Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
