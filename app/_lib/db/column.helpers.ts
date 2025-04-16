import { timestamp, varchar } from "drizzle-orm/pg-core";

const uuid = {
  id: varchar()
    .primaryKey()
    .unique()
    .$defaultFn(() => crypto.randomUUID()),
};

const timestamps = {
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
};

export { timestamps, uuid };
