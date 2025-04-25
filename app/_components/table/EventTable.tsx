"use client";

import { EventListItem } from "@/app/_lib/db/controller/events/getEventList";
import { useRouter } from "next/navigation";
import Table from "./Table";

interface Props {
  events: EventListItem[];
}

// TODO: Pagination
export default function EventTable({ events }: Props) {
  const router = useRouter();

  return (
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
  );
}
