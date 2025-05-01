import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import unires from "../../../unires/unires";
import selectEventList from "../../model/events/selectEventList";

const readEventList = async () => {
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
  Awaited<ReturnType<typeof readEventList>>,
  { success: true }
>["events"][0];

export default readEventList;
export type { EventListItem };
