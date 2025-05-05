import readEventTicketList from "@/app/_lib/db/controller/event-tickets/getEventsTickets";
import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { use } from "react";
import EventTicketCard from "./EventTicketCard";

export default function EventTicketList() {
  const res = use(readEventTicketList());

  if (!res.success) {
    return <div>{JSON.stringify(res)}</div>;
  }

  return (
    <Flex direction="column" gap="3">
      {res.eventTickets.length === 0 ? (
        <Flex direction="column" gap="3" mx="auto">
          <Text>You have no Tickets, yet!</Text>
          <Button variant="outline">
            <Link href="/events">See our events</Link>
          </Button>
        </Flex>
      ) : (
        res.eventTickets.map((eventTicket) => (
          <EventTicketCard key={eventTicket.id} eventTicket={eventTicket} />
        ))
      )}
    </Flex>
  );
}
