import { eq, getTableColumns } from "drizzle-orm";
import db from "../../instance";
import eventsTable, { EventId } from "../../schema/events.schema";
import ticketsTable from "../../schema/tickets.schema";

const readSingleEvent = (id: EventId) =>
  db
    .select({
      ...getTableColumns(eventsTable),
      attendance: db.$count(ticketsTable, eq(ticketsTable.eventId, id)),
    })
    .from(eventsTable)
    .where(eq(eventsTable.id, id));

export default readSingleEvent;
