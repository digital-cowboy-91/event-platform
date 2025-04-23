import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import readEvent from "../../model/events/readEvent";
import { EventId } from "../../schema/events.schema";
import response from "../../utils/responseHelper";

interface Args {
  id: EventId;
}

const getEvent = async ({ id }: Args) => {
  "use cache";
  cacheTag("events", `event:${id}`);
  cacheLife("hours");

  return response(async (signalError) => {
    const res = await readEvent(id).then((res) => res[0]);

    if (!res) signalError();

    return { event: res };
  });
};

type EventItem = Extract<
  Awaited<ReturnType<typeof getEvent>>,
  { success: true }
>["event"];

export default getEvent;
export type { EventItem };
