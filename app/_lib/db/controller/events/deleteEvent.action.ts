"use server";

import unires from "@/app/_lib/unires/unires";
import { revalidateTag } from "next/cache";
import dropEvent from "../../model/events/dropEvent";
import { EventId } from "../../schema/events.schema";

const deleteEvent = async (id: EventId) =>
  unires(async () => {
    const event = await dropEvent(id);

    revalidateTag(`event:${id}`);
    revalidateTag("event:list");

    return {
      event: event[0],
    };
  });

export default deleteEvent;
