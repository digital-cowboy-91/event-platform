import getAuthedPermission from "@/app/_lib/auth/controller/getAuthedPermission.action";
import unires from "@/app/_lib/unires/unires";
import selectEventTicketList from "../../model/event-tickets/readEventTickets";

type EventTicket = {
  id: string;
  title: string;
  location: string;
  startTime: Date;
  duration: number;
  tickets: {
    id: string;
  }[];
};

const getEventsTickets = async () =>
  unires(async (signalError) => {
    const auth = await getAuthedPermission();

    if (!auth.user?.id) return signalError({ message: "Unauthorized user" });

    const res = await selectEventTicketList(auth.user.id);

    const map = res.reduce((acc, item) => {
      const event = acc.get(item.eventId!) ?? {
        id: item.eventId!,
        title: item.title!,
        location: item.location!,
        startTime: item.startTime!,
        duration: item.duration!,
        tickets: [] as { id: string }[],
      };

      event.tickets.push({
        id: item.id!,
      });

      acc.set(item.eventId!, event);

      return acc;
    }, new Map<string, EventTicket>());

    const eventTickets = map.values().toArray();

    return { eventTickets };
  });

export default getEventsTickets;
export type { EventTicket };
