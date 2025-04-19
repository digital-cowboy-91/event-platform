import db from "../../db.instance";
import eventsTable from "../../schema/events.schema";

const readEventList = () => db.select().from(eventsTable);

export default readEventList;
