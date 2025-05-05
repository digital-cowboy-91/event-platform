import unires from "../../../unires/unires";
import readSingleEvent from "../../model/events/readSingleEvent";
import { EventId } from "../../schema/events.schema";

interface Args {
  id: EventId;
}

const getSingleEvent = async ({ id }: Args) =>
  unires(async (signalError) => {
    const res = await readSingleEvent(id).then((res) => res[0]);

    if (!res) signalError({ message: "Invalid Event ID" });

    return { event: res };
  });

type EventItem = Extract<
  Awaited<ReturnType<typeof getSingleEvent>>,
  { success: true }
>["event"];

export default getSingleEvent;
export type { EventItem };
