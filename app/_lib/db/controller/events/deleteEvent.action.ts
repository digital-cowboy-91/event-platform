"use server";

import unires from "@/app/_lib/unires/unires";
import dropEvent from "../../model/events/dropEvent";
import { EventId } from "../../schema/events.schema";

const deleteEvent = async (id: EventId) =>
  unires(async () => {
    const event = await dropEvent(id);

    return {
      event: event[0],
    };
  });

export default deleteEvent;
