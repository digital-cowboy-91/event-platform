import { pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps, uuid } from "../column.helpers";
import eventsTable from "./events.schema";
import usersTable from "./users.schema";

const ticketsTable = pgTable("attendees", {
  ...uuid,
  eventId: varchar().references(() => eventsTable.id),
  userId: varchar().references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamps.createdAt,
});

export default ticketsTable;
