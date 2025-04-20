import { EventItem } from "@/app/_lib/db/controller/events/getEvent";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";

interface Props {
  event: EventItem;
}

export default function EventDetail({ event }: Props) {
  return (
    <Flex direction={"column"} gap={"6"}>
      <Box
        width={"100%"}
        overflow={"hidden"}
        className="aspect-16/9"
        position={"relative"}
        style={{ borderRadius: "var(--radius-6)" }}
      >
        <Image
          src={
            event.coverImage ??
            "https://placehold.co/1200x800/png?text=NO+IMAGE"
          }
          className="object-cover"
          alt=""
          fill
        />
      </Box>
      <Heading>{event.title}</Heading>
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
