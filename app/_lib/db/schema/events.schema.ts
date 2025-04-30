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

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const EventInsertSchema = createInsertSchema(eventsTable, {
  title: (s) => s.min(3),
  description: z.string(),
  location: z.string(),
  startTime: z.coerce.date().min(new Date()),
  duration: (s) => s.positive(),
  capacity: (s) => s.nonnegative(),
  price: (s) => s.nonnegative(),
  coverImage: z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "This file type is not allowed"
    ),
}).omit({ id: true, createdAt: true, updatedAt: true });

type EventInsert = z.infer<typeof EventInsertSchema>;

export default eventsTable;
export { EventInsertSchema };
export type { EventId, EventInsert, EventInsertRecord, EventRecord };
