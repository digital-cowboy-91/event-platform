import EventForm from "@/app/_components/_cms/event/EventForm";
import { Flex, Heading } from "@radix-ui/themes";

export default function page() {
  return (
    <Flex direction="column" gap="3">
      <Heading>New Event</Heading>
      <EventForm />
    </Flex>
  );
}
