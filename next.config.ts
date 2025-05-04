import type { NextConfig } from "next";
import getEnvVars from "./app/_lib/supabase/utils/getEnvVars";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    dangerouslyAllowSVG: true,

    loader: "custom",
    loaderFile: "./app/_lib/supabase/utils/publicImageLoader.ts",
    remotePatterns: [
      new URL("https://placehold.co/**"),
      new URL(getEnvVars().SUPABASE_URL + "/storage/v1/object/public/media/**"),
      new URL("https://picsum.photos/**"),
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
