"use server";

import unires from "@/app/_lib/unires/unires";
import replaceEvent from "../../model/events/replaceEvent";
import {
  EventFormValidationSchema,
  EventId,
  EventInsertRecord,
} from "../../schema/events.schema";

const updateEvent = async (id: EventId, record: EventInsertRecord) =>
  unires(async (signalError) => {
    const _record = EventFormValidationSchema.safeParse(record);

    if (_record.error) return signalError(_record.error);

    const event = await replaceEvent(id, _record.data);

    return {
      event: event[0],
    };
  });

export default updateEvent;
