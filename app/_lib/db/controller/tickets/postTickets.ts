"use server";

import unires from "@/app/_lib/unires/unires";
import createTickets from "../../model/tickets/createTickets";

const postTickets = async (eventId: string, userId: string, quantity: number) =>
  unires(async () => {
    const records = Array.from({ length: quantity }).map(() => ({
      eventId,
      userId,
    }));

    await createTickets(records);

    return {};
  });

export default postTickets;
