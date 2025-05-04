import { EventItem } from "@/app/_lib/db/controller/events/readEventById";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import GetTicketDialog from "../tickets/get-ticket/GetTicketDialog";
import IcsDownloadButton from "./IcsDownloadButton";

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
          src={event.coverImage ?? "#"}
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
          <Text>
            Attendance {event.attendance}/{event.capacity}
          </Text>
        </Flex>
      </Card>
      <Flex justify={"end"} gap={"3"}>
        <IcsDownloadButton eventId={event.id} />
        {event.attendance < (event.capacity ?? Infinity) && (
          <GetTicketDialog eventId={event.id} price={event.price} />
        )}
      </Flex>
    </Flex>
  );
}
