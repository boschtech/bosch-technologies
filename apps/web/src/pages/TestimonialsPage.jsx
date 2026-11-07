import { Link } from "react-router-dom";
import SiteIcon from "@/components/SiteIcon";
import {
  TestimonialForm,
  TestimonialList,
} from "@/components/forms/Testimonials";

export default function TestimonialsPage() {
  return (
    <>
      <section className="service-hero">
        <div className="container">
          <span className="badge badge-accent">Client Feedback</span>
          <h1>What Our Clients Say</h1>
          <p>
            Real stories from engineering teams who transformed their testing
            processes, strategies, and overall quality with Bosch Technologies.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "8px" }}>
        <div className="container">
          <TestimonialList />
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="testimonial-form-wrapper">
            <div className="text-center mb-4">
              <span className="badge badge-primary">Share Your Experience</span>
              <h2 className="mt-2">Submit a Testimonial</h2>
              <p className="text-muted">
                Worked with us? We&apos;d love to hear about your experience.
              </p>
            </div>
            <TestimonialForm />
          </div>
        </div>
      </section>

      <section className="section section-primary text-center">
        <div className="container">
          <h2>Ready to Transform Your Testing?</h2>
          <p
            style={{
              maxWidth: "500px",
              margin: "1rem auto 2rem",
              opacity: "0.9",
            }}
          >
            Let&apos;s start with a conversation about where you are and where
            you want to be.
          </p>
          <div className="btn-group" style={{ justifyContent: "center" }}>
            <Link to="/assessment" className="btn btn-white btn-lg">
              Take Free Assessment
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline"
              style={{ borderColor: "white", color: "white" }}
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
