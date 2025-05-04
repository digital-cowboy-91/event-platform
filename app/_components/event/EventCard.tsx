"use client";

import { EventListItem } from "@/app/_lib/db/controller/events/readEventList";
import composeEventDateTime from "@/app/_lib/utils/composeEventDateTime";
import { Box, Card, Flex, Inset, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

interface Props {
  event: EventListItem;
}

export default function EventCard({ event }: Props) {
  return (
    <Box minWidth={"350px"}>
      <Card asChild>
        <Link href={`/events/${event.id}`}>
          <Inset clip="padding-box" side="top" pb="current">
            <Box
              width={"100%"}
              overflow={"hidden"}
              className="aspect-16/9"
              position={"relative"}
            >
              <Image
                src={event.coverImage ?? "#"}
                className="object-cover"
                alt=""
                fill
              />
            </Box>
          </Inset>

          <Flex direction="column" justify="between" gap="3">
            <Text weight="bold" size="4">
              {event.title}
            </Text>
            <Flex direction="column">
              <Text>{composeEventDateTime(event.startTime)}</Text>
              <Text>{event.location}</Text>
            </Flex>
            <Text weight="regular">
              {event.price === 0 ? "Free" : "£" + event.price}
            </Text>
          </Flex>
        </Link>
      </Card>
    </Box>
  );
}
