"use server";

import unires from "@/app/_lib/unires/unires";
import { revalidateTag } from "next/cache";
import insertEvent from "../../model/events/insertEvent";
import {
  EventFormValidationSchema,
  EventInsertRecord,
} from "../../schema/events.schema";

const createEvent = async (record: EventInsertRecord) =>
  unires(async (signalError) => {
    const _record = EventFormValidationSchema.safeParse(record);

    if (_record.error) return signalError(_record.error);

    const event = await insertEvent(_record.data);

    revalidateTag("event:list");

    return {
      event: event[0],
    };
  });

export default createEvent;
