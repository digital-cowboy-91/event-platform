import EventForm from "@/app/_components/_cms/event/EventForm";
import getEvent from "@/app/_lib/db/controller/events/getSingleEvent";

interface Props {
  params: Promise<{ event_id: string }>;
}

export default async function page({ params }: Props) {
  const { event_id } = await params;
  const res = await getEvent({ id: event_id });

  if (!res.success) {
    return <div>{JSON.stringify(res)}</div>;
  }
  return <EventForm modify={res.event} />;
}
