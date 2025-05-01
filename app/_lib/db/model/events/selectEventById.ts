import { eq } from "drizzle-orm";
import db from "../../instance";
import eventsTable, { EventId } from "../../schema/events.schema";

const selectEventById = (id: EventId) =>
  db.select().from(eventsTable).where(eq(eventsTable.id, id));

export default selectEventById;
