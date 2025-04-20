import EventList from "@/app/_components/event/EventList";
import getEventList from "@/app/_lib/db/controller/events/getEventList";

export default async function page() {
  // TODO: pagination
  // TODO: handle empty array
  // TODO: handle exceptions

  const res = await getEventList();

  if (!res.success) {
    return <div>{JSON.stringify(res)}</div>;
  }

  return <EventList events={res.events} />;
}
