import { eq } from "drizzle-orm";
import db from "../../instance";
import eventsTable, { EventId } from "../../schema/events.schema";

const dropSingleEvent = (id: EventId) =>
  db.delete(eventsTable).where(eq(eventsTable.id, id)).returning();

export default dropSingleEvent;
