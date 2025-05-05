import { EventItem } from "@/app/_lib/db/controller/events/getSingleEvent";
import composeEventDateTime from "@/app/_lib/utils/composeEventDateTime";
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
          <Text>{composeEventDateTime(event.startTime)}</Text>
          <Text color="gray">{event.location}</Text>
          <Text mt="3">
            Attendance {event.attendance}/{event.capacity}
          </Text>
        </Flex>
      </Card>
      <Flex justify={"end"} gap={"3"}>
        <IcsDownloadButton eventId={event.id} />
        {(event.attendance <= (event.capacity ?? 0) ||
          event.capacity === 0) && (
          <GetTicketDialog eventId={event.id} price={event.price} />
        )}
      </Flex>
    </Flex>
  );
}
