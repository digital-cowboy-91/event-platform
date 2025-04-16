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
  endTime: timestamp().notNull(),
  capacity: integer(),
  price: integer(),
});

export default eventsTable;
