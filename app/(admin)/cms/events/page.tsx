import EventTable from "@/app/_components/_cms/event/EventTable";
import getEventList from "@/app/_lib/db/controller/events/readEventList";

export default async function page() {
  const res = await getEventList();

  if (!res.success) return "No Data";

  return <EventTable events={res.events} />;
}
