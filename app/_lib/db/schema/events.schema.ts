import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { id, timestamps } from "./column.helper";

const eventsTable = pgTable("events", {
  ...id,
  ...timestamps,
  title: varchar().notNull(),
  description: text(),
  location: varchar(),
  startTime: timestamp("start_time").notNull(),
  duration: integer().default(60),
  capacity: integer().default(0),
  price: integer().default(0),
  coverImage: varchar("cover_image"),
});

type EventRecord = typeof eventsTable.$inferSelect;
type EventInsertRecord = typeof eventsTable.$inferInsert;
type EventId = EventRecord["id"];

const EventInsertSchema = createInsertSchema(eventsTable, {
  title: (s) => s.min(3),
  description: (s) => s.nonempty(),
  location: (s) => s.nonempty(),
  startTime: z.coerce.date().min(new Date()),
  duration: (s) => s.positive(),
  capacity: (s) => s.nonnegative(),
  price: (s) => s.nonnegative(),
  coverImage: (s) => s.nonempty(),
}).omit({ id: true, createdAt: true, updatedAt: true });

type EventInsert = z.infer<typeof EventInsertSchema>;

export default eventsTable;
export { EventInsertSchema };
export type { EventId, EventInsert, EventInsertRecord, EventRecord };
