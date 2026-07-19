// M1 janitor — deterministic column mapping. Turn a raw CSV row (arbitrary headers) into a
// single geocodable address string. ponytail: heuristic by header name, no LLM. An LLM-assisted
// mapper for weird schemas is an M1.1 enhancement behind this same function's signature.

// Header synonyms → canonical address part. Matched case-insensitively as substrings.
const FIELD_SYNONYMS: Record<string, string[]> = {
  full: ["full_address", "fulladdress", "address_full", "location"],
  street: ["address", "street", "addr", "line1", "address1", "street_address"],
  city: ["city", "town", "municipality"],
  state: ["state", "province", "region", "st"],
  postal: ["zip", "zipcode", "postal", "postcode", "postal_code"],
  country: ["country", "nation"],
};

function findKey(row: Record<string, unknown>, synonyms: string[]): string | undefined {
  const keys = Object.keys(row);
  for (const syn of synonyms) {
    // exact (normalized) match wins over substring, so "st" doesn't grab "street".
    const exact = keys.find((k) => k.toLowerCase().replace(/[\s_-]/g, "") === syn.replace(/[\s_-]/g, ""));
    if (exact) return exact;
  }
  for (const syn of synonyms) {
    const sub = keys.find((k) => k.toLowerCase().includes(syn));
    if (sub) return sub;
  }
  return undefined;
}

function val(row: Record<string, unknown>, key: string | undefined): string {
  if (!key) return "";
  const v = row[key];
  return v == null ? "" : String(v).trim();
}

export interface MappedAddress {
  address: string; // the string to geocode ("" if nothing usable was found)
  parts: Record<string, string>; // which source fields contributed (for the trust panel)
}

export function assembleAddress(row: Record<string, unknown>): MappedAddress {
  // If a single full-address column exists, prefer it verbatim.
  const fullKey = findKey(row, FIELD_SYNONYMS.full);
  const full = val(row, fullKey);
  if (full) return { address: full, parts: { full } };

  const parts: Record<string, string> = {
    street: val(row, findKey(row, FIELD_SYNONYMS.street)),
    city: val(row, findKey(row, FIELD_SYNONYMS.city)),
    state: val(row, findKey(row, FIELD_SYNONYMS.state)),
    postal: val(row, findKey(row, FIELD_SYNONYMS.postal)),
    country: val(row, findKey(row, FIELD_SYNONYMS.country)),
  };
  const address = Object.values(parts).filter(Boolean).join(", ");
  const used = Object.fromEntries(Object.entries(parts).filter(([, v]) => v));
  return { address, parts: used };
}

// Stable cache key: lowercase, collapse whitespace.
export function normalizeQuery(address: string): string {
  return address.toLowerCase().replace(/\s+/g, " ").trim();
}
