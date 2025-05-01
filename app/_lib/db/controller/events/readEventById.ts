import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import unires from "../../../unires/unires";
import selectEventById from "../../model/events/selectEventById";
import { EventId } from "../../schema/events.schema";

interface Args {
  id: EventId;
}

const readEventById = async ({ id }: Args) => {
  "use cache";
  cacheTag("events", `event:${id}`);
  cacheLife("hours");

  return unires(async (signalError) => {
    const res = await selectEventById(id).then((res) => res[0]);

    if (!res) signalError({ message: "Invalid Event ID" });

    return { event: res };
  });
};

type EventItem = Extract<
  Awaited<ReturnType<typeof readEventById>>,
  { success: true }
>["event"];

export default readEventById;
export type { EventItem };
