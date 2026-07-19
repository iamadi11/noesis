"use client";

import { useEffect, useState, use } from "react";

interface Prop {
  id: number;
  address_clean: string | null;
  geocode_confidence: number | null;
  geocode_source: string | null;
  lat: number | null;
  lon: number | null;
}
interface Book { id: number; name: string; status: string; row_count: number }

const LOW = 0.5;

// M1 book view — see the janitor's work: mapped address, coords, confidence, and a flag on
// low-confidence / unresolved rows (never hidden). Map + risk answers arrive in M2.
export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [book, setBook] = useState<Book | null>(null);
  const [props, setProps] = useState<Prop[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch(`/api/books/${id}`);
    const json = await res.json();
    if (res.ok) { setBook(json.book); setProps(json.properties); }
    else setMsg(json.error);
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  async function normalize() {
    setBusy(true); setMsg("");
    const res = await fetch(`/api/books/${id}/normalize`, { method: "POST" });
    const json = await res.json();
    setMsg(res.ok
      ? `Geocoded ${json.geocoded}/${json.total} · low-confidence ${json.lowConfidence} · unresolved ${json.unresolved}`
      : `Error: ${json.error}`);
    setBusy(false);
    load();
  }

  if (!book) return <main><p>{msg || "Loading…"}</p></main>;

  return (
    <main>
      <h1>{book.name}</h1>
      <p>Status: <b>{book.status}</b> · {book.row_count} rows</p>
      <button onClick={normalize} disabled={busy}>{busy ? "Normalizing…" : "Run janitor (geocode + clean)"}</button>
      {msg && <p role="status">{msg}</p>}
      <table style={{ marginTop: "1rem", borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>{["#", "Address (cleaned)", "Lat", "Lon", "Conf.", "Source"].map((h) => (
            <th key={h} style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "4px" }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {props.map((p) => {
            const flag = p.lat == null || (p.geocode_confidence != null && p.geocode_confidence < LOW);
            return (
              <tr key={p.id} style={{ background: flag ? "#fff3cd" : undefined }}>
                <td style={{ padding: "4px" }}>{p.id}</td>
                <td style={{ padding: "4px" }}>{p.address_clean ?? <i>unmapped</i>}</td>
                <td style={{ padding: "4px" }}>{p.lat?.toFixed(5) ?? "—"}</td>
                <td style={{ padding: "4px" }}>{p.lon?.toFixed(5) ?? "—"}</td>
                <td style={{ padding: "4px" }}>{p.geocode_confidence?.toFixed(2) ?? "—"}</td>
                <td style={{ padding: "4px" }}>{p.geocode_source ?? "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
