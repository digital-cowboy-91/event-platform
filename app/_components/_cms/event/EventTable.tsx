"use client";

import { EventListItem } from "@/app/_lib/db/controller/events/readEventList";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Table from "../../table/Table";

interface Props {
  events: EventListItem[];
}

// TODO: Pagination
export default function EventTable({ events }: Props) {
  const router = useRouter();

  return (
    <Flex direction="column" gap="3">
      <Flex justify="end">
        <Button>
          <Link href={"/cms/events/new"}>New Event</Link>
        </Button>
      </Flex>
      <Table
        columns={[
          {
            key: "title",
            name: "Title",
            renderAs: "text",
          },
          {
            key: "startTime",
            name: "Date",
            renderAs: "date",
          },
          {
            key: "price",
            name: "Price",
            renderAs: "currency",
          },
        ]}
        items={events}
        onRowClick={(row) => router.push(`/cms/events/${row.id}`)}
      />
    </Flex>
  );
}
