import { describe, it, expect, vi, beforeEach } from "vitest";

/*
  Tests for POST /api/contact

  The Resend SDK is mocked so these tests never make real network calls.
  We test the three branches that matter:
    1. Valid input  → 200
    2. Missing field → 400
    3. Resend throws → 503

  mockSend is defined at module scope so individual tests can override it
  with mockRejectedValueOnce without re-declaring the whole mock.
*/

const mockSend = vi.fn();

vi.mock("resend", () => ({
  // Must be a class (not an arrow function) because the route calls `new Resend(...)`.
  Resend: class {
    emails = { send: mockSend };
  },
}));

const { POST } = await import("@/app/api/contact/route");

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "test@example.com");
    mockSend.mockResolvedValue({ id: "test-email-id" });
  });

  it("returns 200 when all fields are present and Resend succeeds", async () => {
    const req = makeRequest({
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Hello!",
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
  });

  it("returns 400 when a required field is missing", async () => {
    const req = makeRequest({
      name: "Jane Smith",
      email: "jane@example.com",
      // message intentionally omitted
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.error).toBeTruthy();
  });

  it("returns 503 when Resend throws a network error", async () => {
    mockSend.mockRejectedValueOnce(new Error("Network failure"));

    const req = makeRequest({
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Hello!",
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(503);
    expect(body.error).toBeTruthy();
  });
});
