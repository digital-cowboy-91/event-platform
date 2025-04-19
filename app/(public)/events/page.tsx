import EventList from "@/app/_components/event/EventList";
import getCachedEventList from "@/app/_lib/db/controller/events/getEventList";

export default async function page() {
  const res = await getCachedEventList();

  if (!res.success) {
    return <div>{JSON.stringify(res)}</div>;
  }

  return <EventList events={res.events} />;
}
