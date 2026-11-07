import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ClientDocument, { useClientDownload } from "@/components/ClientDocument";

function Download({ generate }) {
  const download = useClientDownload();
  return <button onClick={() => download(generate)}>Download</button>;
}

describe("client document lifecycle", () => {
  it("reports failed downloads and allows retry", async () => {
    const generate = vi
      .fn()
      .mockRejectedValueOnce(new Error("failed"))
      .mockResolvedValueOnce();
    render(
      <ClientDocument title="Private title">
        <Download generate={generate} />
      </ClientDocument>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "could not be generated",
    );
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument(),
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(generate).toHaveBeenCalledTimes(2);
  });

  it("prevents duplicate concurrent downloads", async () => {
    let finish;
    const generate = vi.fn(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    render(
      <ClientDocument title="Private title">
        <Download generate={generate} />
      </ClientDocument>,
    );
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button"));
    expect(generate).toHaveBeenCalledOnce();
    finish();
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument(),
    );
  });

  it("restores previous title, robots tag and chart on unmount", () => {
    document.title = "Previous title";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "index";
    document.head.appendChild(robots);
    const cleanup = vi.fn();
    const initialize = vi.fn(() => cleanup);
    const { unmount } = render(
      <ClientDocument title="Private title" initialize={initialize}>
        <p>Content</p>
      </ClientDocument>,
    );
    expect(document.title).toBe("Private title");
    expect(robots.content).toBe("noindex, nofollow");
    unmount();
    expect(document.title).toBe("Previous title");
    expect(robots.content).toBe("index");
    expect(cleanup).toHaveBeenCalledOnce();
    robots.remove();
  });
});
