import type { EventListItem } from "@/app/_lib/db/controller/events/readEventList";
import { Grid } from "@radix-ui/themes";
import EventCard from "./EventCard";

interface Props {
  events: EventListItem[];
}

export default function EventList({ events }: Props) {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"3"}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Grid>
  );
}
