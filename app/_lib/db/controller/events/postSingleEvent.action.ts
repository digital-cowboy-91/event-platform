"use server";

import unires from "@/app/_lib/unires/unires";
import createSingleEvent from "../../model/events/createSingleEvent";
import {
  EventFormValidationSchema,
  EventInsertRecord,
} from "../../schema/events.schema";

const postSingleEvent = async (record: EventInsertRecord) =>
  unires(async (signalError) => {
    const _record = EventFormValidationSchema.safeParse(record);

    if (_record.error) return signalError(_record.error);

    const event = await createSingleEvent(_record.data);

    return {
      event: event[0],
    };
  });

export default postSingleEvent;
