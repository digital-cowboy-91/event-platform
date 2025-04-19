import { unstable_cache } from "next/cache";
import readEventList from "../../model/events/readEventList";
import response from "../response.helper";

const getEventList = () =>
  response(async (signalError) => {
    const res = await readEventList();

    if (res.length === 0) signalError();

    return {
      events: res,
    };
  });

const getCachedEventList = unstable_cache(
  () => getEventList(),
  ["events", "list"],
  {
    revalidate: 60,
    tags: ["events", "list"],
  }
);

type EventListItem = Extract<
  Awaited<ReturnType<typeof getCachedEventList>>,
  { success: true }
>["events"][0];

export default getCachedEventList;
export type { EventListItem };
