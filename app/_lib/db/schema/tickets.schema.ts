import { pgTable, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./column.helper";
import eventsTable from "./events.schema";
import usersTable from "./users.schema";

const ticketsTable = pgTable("tickets", {
  ...id,
  eventId: uuid("event_id").references(() => eventsTable.id, {
    onDelete: "cascade",
  }),
  userId: uuid("user_id").references(() => usersTable.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamps.createdAt,
});

type TicketRecord = typeof ticketsTable.$inferSelect;
type TicketInsertRecord = typeof ticketsTable.$inferInsert;

export default ticketsTable;
export type { TicketInsertRecord, TicketRecord };
