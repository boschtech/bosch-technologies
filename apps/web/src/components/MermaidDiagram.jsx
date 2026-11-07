import { useEffect, useId, useRef, useState } from "react";

const architecture = `flowchart TD
  User["End User<br/>Browses products & places orders"] -->|HTTPS| Web["Micro Frontend<br/>React 19 SPA"]
  Web -->|JSON / HTTPS| Products["Product Service<br/>Spring Boot REST API"]
  Web -->|JSON / HTTPS| Orders["Order Service<br/>Spring Boot REST API"]
  Orders -->|validates IDs| Products
  Products --- Hosting["Render.com<br/>Static + Docker hosting"]
  Orders --- Hosting
  Hosting --- CI["GitHub Actions<br/>CI / CD pipeline"]`;

export default function MermaidDiagram() {
  const id = useId().replace(/:/g, "");
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "strict",
          themeVariables: {
            fontFamily: "Inter, sans-serif",
            primaryColor: "#111111",
            primaryTextColor: "#ffffff",
            primaryBorderColor: "#b8961c",
            lineColor: "#b8961c",
            background: "#111111",
          },
        });
        const { svg } = await mermaid.render(
          `architecture-${id}`,
          architecture,
        );
        // Mermaid sanitises its own output with strict securityLevel. No API/user input.
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch {
        if (!cancelled) setFailed(true);
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [id]);
  return (
    <details className="mb-4">
      <summary>View architecture flow diagram</summary>
      <div
        className="mermaid-wrap"
        role="img"
        aria-label="Micro frontend and microservices architecture"
      >
        <div ref={ref} className="mermaid" />
        {failed && (
          <p className="text-muted">
            The architecture is shown in detail below.
          </p>
        )}
      </div>
    </details>
  );
}
