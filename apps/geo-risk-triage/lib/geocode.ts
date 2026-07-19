// M1 janitor — geocoding behind one interface so the provider is swappable (Nominatim now,
// Mapbox/Google later) without touching call sites. Default = Nominatim (OSM): free, no API key,
// so M1 runs without founder provisioning. Note its usage policy: max 1 req/s, real User-Agent.

export interface GeocodeHit {
  lat: number;
  lon: number;
  confidence: number; // 0..1
  source: string;
}

export interface Geocoder {
  geocode(query: string): Promise<GeocodeHit | null>;
}

class NominatimGeocoder implements Geocoder {
  async geocode(query: string): Promise<GeocodeHit | null> {
    const url =
      "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" +
      encodeURIComponent(query);
    const res = await fetch(url, {
      headers: { "User-Agent": "geo-risk-triage/0.1 (Noesis MVP)" },
    });
    if (!res.ok) throw new Error(`nominatim ${res.status}`);
    const hits = (await res.json()) as Array<{ lat: string; lon: string; place_rank?: number }>;
    if (hits.length === 0) return null;
    const h = hits[0];
    // Confidence = match GRANULARITY, not relevance. Nominatim place_rank is 0..30 (30 =
    // house/building, ~26 = street, ~16 = city). importance is a tiny popularity score and is
    // useless as confidence (it flags everything). place_rank/30 is a meaningful precision proxy.
    const confidence = typeof h.place_rank === "number" ? Math.min(1, Math.max(0, h.place_rank / 30)) : 0.5;
    return { lat: Number(h.lat), lon: Number(h.lon), confidence, source: "nominatim" };
  }
}

export function getGeocoder(): Geocoder {
  // ponytail: one provider today. Add a switch on process.env.GEOCODER when a second lands.
  return new NominatimGeocoder();
}

// Nominatim demands <= 1 req/s. Cheap global spacer between live calls.
export function rateLimitDelayMs(): number {
  return 1100;
}
