import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import readEventList from "../../model/events/readEventList";
import response from "../../utils/responseHelper";

const getEventList = async () => {
  "use cache";
  cacheTag("events", "event:list");
  cacheLife("hours");

  return response(async (signalError) => {
    const res = await readEventList();

    if (res.length === 0) signalError();

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
