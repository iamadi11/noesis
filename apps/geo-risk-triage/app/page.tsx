"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Upload form — after a successful upload, go to the book view to run the janitor (M1).
export default function Home() {
  const router = useRouter();
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
      if (res.ok) router.push(`/books/${json.bookId}`);
      else setResult(`Error: ${json.error}`);
    } catch (err) {
      setResult(`Error: ${(err as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <h1>Geo Risk Triage</h1>
      <p>Upload a schedule (CSV) → clean + geocode it → (M2) ask a risk question.</p>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" placeholder="Book name" required style={{ display: "block", margin: "0.5rem 0" }} />
        <input type="file" name="file" accept=".csv" required style={{ display: "block", margin: "0.5rem 0" }} />
        <button type="submit" disabled={busy}>{busy ? "Uploading…" : "Upload"}</button>
      </form>
      {result && <p role="status">{result}</p>}
    </main>
  );
}
