import { asc } from "drizzle-orm";
import db from "../../instance";
import eventsTable from "../../schema/events.schema";

const readEvents = () =>
  db.select().from(eventsTable).orderBy(asc(eventsTable.startTime));

export default readEvents;
