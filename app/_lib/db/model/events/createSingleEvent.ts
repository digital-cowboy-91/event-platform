import db from "../../instance";
import eventsTable, { EventInsertRecord } from "../../schema/events.schema";

const createSingleEvent = (event: EventInsertRecord) =>
  db.insert(eventsTable).values(event).returning();

export default createSingleEvent;
