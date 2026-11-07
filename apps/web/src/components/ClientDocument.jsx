import { createContext, useContext, useEffect, useRef, useState } from "react";

const DownloadContext = createContext(null);

export function useClientDownload() {
  return useContext(DownloadContext);
}

export default function ClientDocument({ title, initialize, children }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const pending = useRef(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    let robots = document.querySelector('meta[name="robots"]');
    const previousRobots = robots?.getAttribute("content");
    const created = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex, nofollow";
    const cleanup = initialize?.();
    return () => {
      cleanup?.();
      document.title = previousTitle;
      if (created) robots.remove();
      else if (previousRobots === null) robots.removeAttribute("content");
      else robots.setAttribute("content", previousRobots);
    };
  }, [title, initialize]);

  async function download(generate) {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      await generate();
    } catch {
      setError("The document could not be generated. Please try again.");
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  return (
    <DownloadContext.Provider value={download}>
      {busy && (
        <p className="container" role="status">
          Preparing your document…
        </p>
      )}
      {error && (
        <p className="container" role="alert">
          {error}
        </p>
      )}
      {children}
    </DownloadContext.Provider>
  );
}
