import db from "../../instance";
import ticketsTable, { TicketInsertRecord } from "../../schema/tickets.schema";

const createTickets = (tickets: TicketInsertRecord[]) =>
  db.insert(ticketsTable).values(tickets);

export default createTickets;
