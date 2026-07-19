import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

// ponytail: local-disk storage for M0 (dev). Serverless FS is ephemeral, so before
// deploying M0 to Vercel, swap this one function for a Cloudflare R2 / S3 put. The
// call sites only depend on `store()` returning a key, so the swap is isolated here.
export async function store(filename: string, bytes: Buffer): Promise<string> {
  const dir = process.env.UPLOAD_DIR ?? "./uploads";
  await mkdir(dir, { recursive: true });
  const key = `${randomUUID()}-${filename}`;
  await writeFile(join(dir, key), bytes);
  return key;
}
