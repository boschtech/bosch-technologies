export default function PlaceholderPage({ badge, title, description }) {
  return (
    <section className="service-hero">
      <div className="container">
        {badge ? <span className="badge badge-accent">{badge}</span> : null}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
