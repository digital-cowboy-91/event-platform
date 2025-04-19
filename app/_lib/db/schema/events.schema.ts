import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { id, timestamps } from "./column.helpers";

const eventsTable = pgTable("events", {
  ...id,
  ...timestamps,
  title: varchar().notNull(),
  description: text(),
  location: varchar(),
  startTime: timestamp("start_time").notNull(),
  duration: integer().notNull().default(60),
  capacity: integer().default(0),
  price: integer().default(0),
});

export default eventsTable;
