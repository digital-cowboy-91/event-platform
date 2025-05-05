import readEventTicketList from "@/app/_lib/db/controller/event-tickets/getEventsTickets";
import { Flex } from "@radix-ui/themes";
import { use } from "react";
import EventTicketCard from "./EventTicketCard";

export default function EventTicketList() {
  const res = use(readEventTicketList());

  if (!res.success) {
    return <div>{JSON.stringify(res)}</div>;
  }

  return (
    <Flex direction="column" gap="3">
      {res.eventTickets.map((eventTicket) => (
        <EventTicketCard key={eventTicket.id} eventTicket={eventTicket} />
      ))}
    </Flex>
  );
}
