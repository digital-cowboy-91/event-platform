import unires from "../../../unires/unires";
import selectEventList from "../../model/events/selectEventList";

const readEventList = async () =>
  unires(async (signalError) => {
    const res = await selectEventList();

    if (res.length === 0) signalError({ message: "No events found" });

    return {
      events: res,
    };
  });

type EventListItem = Extract<
  Awaited<ReturnType<typeof readEventList>>,
  { success: true }
>["events"][0];

export default readEventList;
export type { EventListItem };
