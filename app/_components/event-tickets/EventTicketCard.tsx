"use client";

import { EventTicket } from "@/app/_lib/db/controller/event-tickets/readEventTicketList";
import composeEventDateTime from "@/app/_lib/utils/composeEventDateTime";
import { Card, Flex, IconButton, Link, Text } from "@radix-ui/themes";
import { useState } from "react";
import Icon from "../Icon";
import TicketList from "./TicketList";

interface Props {
  eventTicket: EventTicket;
}

export default function EventTicketCard({
  eventTicket: { id, title, startTime, location, tickets },
}: Props) {
  const [toggleTickets, setToggleTickets] = useState(false);

  return (
    <Card>
      <Flex justify="between" align="center">
        <Flex direction="column" gap="3">
          <Link href={`/events/${id}`}>
            <Text size="4" weight="bold">
              {title}
            </Text>
          </Link>
          <Flex direction="column">
            <Text>{composeEventDateTime(startTime)}</Text>
            <Text color="gray">{location}</Text>
          </Flex>
        </Flex>
        <IconButton
          variant="ghost"
          mx="3"
          onClick={() => setToggleTickets(!toggleTickets)}
          aria-label="Toggle Tickets"
        >
          <Icon
            icon={
              toggleTickets ? "streamline:tickets-solid" : "streamline:tickets"
            }
            width="24px"
          />
        </IconButton>
      </Flex>
      {toggleTickets && <TicketList tickets={tickets} />}
    </Card>
  );
}
