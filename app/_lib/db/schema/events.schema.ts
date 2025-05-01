import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
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
type EventId = EventRecord["id"];

const EventFormDefaultSchema = z.object({
  title: z.string().default(""),
  description: z.string().default(""),
  location: z.string().default(""),
  startTime: z.date().default(new Date()),
  duration: z.number().default(60),
  capacity: z.number().default(0),
  price: z.number().default(0),
  coverImage: z
    .string()
    .or(z.null())
    .transform((val) => val ?? "")
    .default(""),
});

const EventFormValidationSchema = EventFormDefaultSchema.extend({
  title: z.string().min(3),
  description: z.string().nonempty(),
  location: z.string().nonempty(),
  startTime: z.date(),
  duration: z.number().positive(),
  capacity: z.number().nonnegative(),
  price: z.number().nonnegative(),
  coverImage: z.string().nonempty({ message: "Image is required" }),
});

type EventInsertRecord = z.infer<typeof EventFormDefaultSchema>;

export default eventsTable;
export { EventFormDefaultSchema, EventFormValidationSchema };
export type { EventId, EventInsertRecord, EventRecord };
