import EventTicketList from "@/app/_components/event-tickets/EventTicketList";
import FullPageSpinner from "@/app/_components/FullPageSpinner";
import { Suspense } from "react";

export default async function page() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <EventTicketList />
    </Suspense>
  );
}
