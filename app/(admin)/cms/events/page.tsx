import EventTable from "@/app/_components/table/EventTable";
import getEventList from "@/app/_lib/db/controller/events/getEventList";

export default async function page() {
  const res = await getEventList();

  if (!res.success) return "No Data";

  return <EventTable events={res.events} />;
}
