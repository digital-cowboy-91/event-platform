import EventTicketList from "@/app/_components/event-tickets/EventTicketList";
import { Spinner } from "@radix-ui/themes";
import { Suspense } from "react";

export default async function page() {
  return (
    <Suspense fallback={<Spinner />}>
      <EventTicketList />
    </Suspense>
  );
}
