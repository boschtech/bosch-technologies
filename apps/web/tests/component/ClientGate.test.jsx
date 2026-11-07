import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ClientGate from "@/components/ClientGate";

const reply = (data, status = 200) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
  });

afterEach(() => vi.unstubAllGlobals());

describe("ClientGate cookie-session API contract", () => {
  it("does not mount private content while checking access", async () => {
    const fetch = vi.fn(() => reply({ authenticated: true }));
    vi.stubGlobal("fetch", fetch);
    render(
      <ClientGate slug="weconnectu">
        <h1>Private content</h1>
      </ClientGate>,
    );
    expect(screen.queryByText("Private content")).not.toBeInTheDocument();
    expect(await screen.findByText("Private content")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(
      "/api/clients/weconnectu/session",
      expect.objectContaining({
        credentials: "same-origin",
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("submits { code } and reveals content only after successful unlock", async () => {
    const fetch = vi
      .fn()
      .mockImplementationOnce(() => reply({ authenticated: false }))
      .mockImplementationOnce(() => reply({ success: true }));
    vi.stubGlobal("fetch", fetch);
    render(
      <ClientGate slug="comotion">
        <h1>Private content</h1>
      </ClientGate>,
    );
    fireEvent.change(await screen.findByLabelText("Access Code"), {
      target: { value: "test-code" },
    });
    fireEvent.click(screen.getByRole("button", { name: /View Proposal/ }));
    expect(await screen.findByText("Private content")).toBeInTheDocument();
    expect(fetch).toHaveBeenLastCalledWith("/api/clients/comotion/unlock", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "test-code" }),
    });
  });

  it.each([401, 500])(
    "keeps private content hidden after unlock status %s",
    async (status) => {
      vi.stubGlobal(
        "fetch",
        vi
          .fn()
          .mockImplementationOnce(() => reply({ authenticated: false }))
          .mockImplementationOnce(() => reply({ error: "Denied" }, status)),
      );
      render(
        <ClientGate slug="toomuchiwifi" document>
          <h1>Private content</h1>
        </ClientGate>,
      );
      fireEvent.change(await screen.findByLabelText("Access Code"), {
        target: { value: "wrong" },
      });
      fireEvent.click(screen.getByRole("button", { name: /View Document/ }));
      expect(await screen.findByRole("alert")).toHaveTextContent(
        status === 401 ? "Invalid access code" : "Unable to unlock",
      );
      expect(screen.queryByText("Private content")).not.toBeInTheDocument();
    },
  );

  it("handles a failed session request without revealing content", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => reply({}, 500)),
    );
    render(
      <ClientGate slug="weconnectu">
        <h1>Private content</h1>
      </ClientGate>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to check access",
    );
    expect(screen.queryByText("Private content")).not.toBeInTheDocument();
  });

  it("fails closed for network errors and malformed unlock responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockRejectedValueOnce(new Error("Network unavailable"))
        .mockImplementationOnce(() => reply({ success: false })),
    );
    render(
      <ClientGate slug="weconnectu">
        <h1>Private content</h1>
      </ClientGate>,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Network unavailable",
    );
    fireEvent.change(screen.getByLabelText("Access Code"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByRole("button", { name: /View Proposal/ }));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Unable to unlock"),
    );
    expect(screen.queryByText("Private content")).not.toBeInTheDocument();
  });

  it("rechecks access independently when changing clients", async () => {
    const fetch = vi
      .fn()
      .mockImplementationOnce(() => reply({ authenticated: true }))
      .mockImplementationOnce(() => reply({ authenticated: false }));
    vi.stubGlobal("fetch", fetch);
    const { rerender } = render(
      <ClientGate slug="weconnectu">
        <h1>Private content</h1>
      </ClientGate>,
    );
    await screen.findByText("Private content");
    rerender(
      <ClientGate slug="comotion">
        <h1>Other private content</h1>
      </ClientGate>,
    );
    expect(screen.queryByText("Other private content")).not.toBeInTheDocument();
    await screen.findByLabelText("Access Code");
    expect(fetch).toHaveBeenLastCalledWith(
      "/api/clients/comotion/session",
      expect.any(Object),
    );
  });
});
