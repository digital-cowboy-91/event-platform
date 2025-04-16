import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Missing ENV variable DATABASE_URL");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./app/_lib/db/schema",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
