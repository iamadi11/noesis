"use client";

import { useState } from "react";

// ponytail: M0 UI is one upload form — enough to prove the pipe (upload -> store ->
// normalized rows). The map, question box, and ranked table arrive in M1/M2.
export default function Home() {
  const [result, setResult] = useState<string>("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setResult("");
    try {
      const form = new FormData(e.currentTarget);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      setResult(res.ok ? `Stored book #${json.bookId} with ${json.rowCount} rows.` : `Error: ${json.error}`);
    } catch (err) {
      setResult(`Error: ${(err as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <h1>Geo Risk Triage</h1>
      <p>M0 — upload a schedule (CSV). Normalization + risk answers land in M1/M2.</p>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" placeholder="Book name" required style={{ display: "block", margin: "0.5rem 0" }} />
        <input type="file" name="file" accept=".csv" required style={{ display: "block", margin: "0.5rem 0" }} />
        <button type="submit" disabled={busy}>{busy ? "Uploading…" : "Upload"}</button>
      </form>
      {result && <p role="status">{result}</p>}
    </main>
  );
}
