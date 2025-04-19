import type { EventListItem } from "@/app/_lib/db/controller/events/getEventList";
import { Flex } from "@radix-ui/themes";
import EventCard from "./EventCard";

interface Props {
  events: EventListItem[];
}

export default function EventList({ events }: Props) {
  return (
    <Flex
      direction={{ initial: "column", md: "row" }}
      wrap={"wrap"}
      gap="3"
      p="3"
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Flex>
  );
}
