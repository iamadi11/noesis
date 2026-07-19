/** @type {import('next').NextConfig} */
const nextConfig = {
  // pg is a server-only native-ish dep; keep it out of any client bundle.
  serverExternalPackages: ["pg"],
};

export default nextConfig;
