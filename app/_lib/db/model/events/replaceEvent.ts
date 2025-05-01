import { eq } from "drizzle-orm";
import db from "../../instance";
import eventsTable, {
  EventId,
  EventInsertRecord,
} from "../../schema/events.schema";

const replaceEvent = (id: EventId, event: EventInsertRecord) =>
  db.update(eventsTable).set(event).where(eq(eventsTable.id, id)).returning();

export default replaceEvent;
