import { eq } from "drizzle-orm";
import { pgTable, pgView, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./column.helper";
import eventsTable from "./events.schema";
import profileTable from "./profile.schema";

const ticketsTable = pgTable("tickets", {
  ...id,
  eventId: uuid("event_id").references(() => eventsTable.id, {
    onDelete: "cascade",
  }),
  userId: uuid("user_id").references(() => profileTable.uid, {
    onDelete: "cascade",
  }),
  createdAt: timestamps.createdAt,
});

const ticketsView = pgView("tickets_view").as((qb) =>
  qb
    .select({
      id: ticketsTable.id,
      eventId: ticketsTable.eventId,
      userId: ticketsTable.userId,
      title: eventsTable.title,
      location: eventsTable.location,
      startTime: eventsTable.startTime,
      duration: eventsTable.duration,
      price: eventsTable.price,
    })
    .from(ticketsTable)
    .leftJoin(eventsTable, eq(ticketsTable.eventId, eventsTable.id))
);

type TicketRecord = typeof ticketsTable.$inferSelect;
type TicketInsertRecord = typeof ticketsTable.$inferInsert;
type TicketViewRecord = typeof ticketsView.$inferSelect;

export default ticketsTable;
export { ticketsView };
export type { TicketInsertRecord, TicketRecord, TicketViewRecord };
