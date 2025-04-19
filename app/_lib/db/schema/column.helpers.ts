import { timestamp, uuid } from "drizzle-orm/pg-core";

const id = {
  id: uuid().defaultRandom().primaryKey(),
};

const timestamps = {
  updatedAt: timestamp("updated_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
};

export { id, timestamps };
