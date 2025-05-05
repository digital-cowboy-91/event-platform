import { sql } from "drizzle-orm";
import db from "../../instance";
import { ticketsView, TicketViewRecord } from "../../schema/tickets.schema";

const readEventsTickets = (userId: string) => {
  //   const query = db
  //     .select()
  //     .from(ticketsView)
  //     .where(eq(ticketsView.userId, userId));

  //   console.log("SQL", query.toSQL());

  // Workaround for query above - drizzle issue https://github.com/drizzle-team/drizzle-orm/issues/3856
  const query = db.execute<TicketViewRecord>(
    sql`select "id", "event_id" as "eventId", "user_id" as "userId", "title", "location", "start_time" as "startTime", "duration", "price" from ${ticketsView} where ${ticketsView.userId} = ${userId} order by "start_time"`
  );

  return query;
};

export default readEventsTickets;
