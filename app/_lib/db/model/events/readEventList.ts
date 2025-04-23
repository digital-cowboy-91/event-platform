import db from "../../instance";
import eventsTable from "../../schema/events.schema";

const readEventList = () => db.select().from(eventsTable);

export default readEventList;
