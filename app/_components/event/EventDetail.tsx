import { EventItem } from "@/app/_lib/db/controller/events/getEvent";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";

interface Props {
  event: EventItem;
}

export default function EventDetail({ event }: Props) {
  return (
    <Flex direction={"column"} gap={"3"}>
      <Heading>{event.title}</Heading>
      <Box>Image placeholder</Box>
      <Text as="p">{event.description}</Text>
      <Card>
        <Flex direction={"column"}>
          <Text>{new Date(event.startTime).toLocaleString("en-GB")}</Text>
          <Text>{event.location}</Text>
          <Text>Attendance 0/{event.capacity}, 0 considering</Text>
        </Flex>
      </Card>
    </Flex>
  );
}
