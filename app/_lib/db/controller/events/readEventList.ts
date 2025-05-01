import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import unires from "../../../unires/unires";
import selectEventList from "../../model/events/selectEventList";

const getEventList = async () => {
  "use cache";
  cacheTag("events", "event:list");
  cacheLife("hours");

  return unires(async (signalError) => {
    const res = await selectEventList();

    if (res.length === 0) signalError({ message: "No events found" });

    return {
      events: res,
    };
  });
};

type EventListItem = Extract<
  Awaited<ReturnType<typeof getEventList>>,
  { success: true }
>["events"][0];

export default getEventList;
export type { EventListItem };
