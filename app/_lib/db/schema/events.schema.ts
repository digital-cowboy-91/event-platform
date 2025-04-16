import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps, uuid } from "../column.helpers";

const eventsTable = pgTable("events", {
  ...uuid,
  ...timestamps,
  title: varchar().notNull(),
  description: text(),
  location: varchar(),
  startTime: timestamp().notNull(),
  duration: integer().notNull().default(60),
  capacity: integer().default(0),
  price: integer().default(0),
});

export default eventsTable;
