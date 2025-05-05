"use server";

import unires from "@/app/_lib/unires/unires";
import dropSingleEvent from "../../model/events/dropSingleEvent";
import { EventId } from "../../schema/events.schema";

const deleteSingleEvent = async (id: EventId) =>
  unires(async () => {
    const event = await dropSingleEvent(id);

    return {
      event: event[0],
    };
  });

export default deleteSingleEvent;
