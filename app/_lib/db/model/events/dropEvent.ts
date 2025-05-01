import { eq } from "drizzle-orm";
import db from "../../instance";
import eventsTable, { EventId } from "../../schema/events.schema";

const dropEvent = (id: EventId) =>
  db.delete(eventsTable).where(eq(eventsTable.id, id)).returning();

export default dropEvent;
