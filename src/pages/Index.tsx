import { useState, type KeyboardEvent } from "react";

const WEBHOOK_URL =
  "https://sicare9060.app.n8n.cloud/webhook-test/kami";

const Index = () => {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!role.trim() || !location.trim()) {
      setError("Please fill in both fields before submitting.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: role.trim(), location: location.trim() }),
        mode: "no-cors",
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.9)]">
        {submitted ? (
          <div className="space-y-6 text-center">
            <h1 className="text-3xl font-semibold">Submission sent</h1>
            <p className="text-slate-400">Your role and location were sent to the webhook.</p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setRole("");
                setLocation("");
                setError("");
              }}
              className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Send another
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-semibold">Lead Submission</h1>
              <p className="text-sm text-slate-400">
                Enter role and location, then press ENTER or click submit.
              </p>
            </div>

            <div className="space-y-6">
              <label className="block text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Role
                <input
                  type="text"
                  value={role}
                  onChange={event => setRole(event.target.value)}
                  onKeyDown={handleKeyDown}
                  className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-slate-500"
                  placeholder="e.g. CEO, Marketing Manager"
                />
              </label>

              <label className="block text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Location
                <input
                  type="text"
                  value={location}
                  onChange={event => setLocation(event.target.value)}
                  onKeyDown={handleKeyDown}
                  className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-slate-500"
                  placeholder="e.g. New York, Dubai, London"
                />
              </label>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
