import db from "../../instance";
import eventsTable from "../../schema/events.schema";

const selectEventList = () => db.select().from(eventsTable);

export default selectEventList;
