import unires from "../../../unires/unires";
import selectEventList from "../../model/events/readEvents";

const getEvents = async () =>
  unires(async (signalError) => {
    const res = await selectEventList();

    if (res.length === 0) signalError({ message: "No events found" });

    return {
      events: res,
    };
  });

type EventListItem = Extract<
  Awaited<ReturnType<typeof getEvents>>,
  { success: true }
>["events"][0];

export default getEvents;
export type { EventListItem };
