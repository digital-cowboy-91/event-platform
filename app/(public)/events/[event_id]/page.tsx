import EventDetail from "@/app/_components/event/EventDetail";
import getEvent from "@/app/_lib/db/controller/events/readEventById";

interface Props {
  params: Promise<{ event_id: string }>;
}

export default async function page({ params }: Props) {
  const { event_id } = await params;
  const res = await getEvent({ id: event_id });
  console.log(res);
  if (!res.success) {
    return <div>{JSON.stringify(res)}</div>;
  }
  return <EventDetail event={res.event} />;
}
