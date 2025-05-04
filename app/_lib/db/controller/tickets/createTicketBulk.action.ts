"use server";

import unires from "@/app/_lib/unires/unires";
import insertTicketBulk from "../../model/tickets/insertTicketBulk";

const createTicketBulk = async (
  eventId: string,
  userId: string,
  quantity: number
) =>
  unires(async () => {
    const records = Array.from({ length: quantity }).map(() => ({
      eventId,
      userId,
    }));

    await insertTicketBulk(records);

    return {};
  });

export default createTicketBulk;
