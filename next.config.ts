import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // WebP encodes several times faster than AVIF on the first (uncached) request,
    // so photos never wait on the optimizer. Static imports are content-hashed,
    // so optimized files can be cached for a year.
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
    qualities: [75, 80],
  },
};

export default withNextIntl(nextConfig);
