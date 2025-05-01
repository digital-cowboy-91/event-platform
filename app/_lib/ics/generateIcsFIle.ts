import { createEvent } from "ics";
import { EventRecord } from "../db/schema/events.schema";

const generateIcsFile = async (event: EventRecord) => {
  const filename =
    event.title.toLowerCase().replace(/\s/g, "-").replaceAll(/\./g, "") +
    ".ics";

  const file = await new Promise((resolve, reject) => {
    createEvent(
      {
        title: event.title,
        start: event.startTime.getTime(),
        duration: { minutes: event.duration ?? 60 },
        location: event.location ?? "",
      },
      (error, value) => {
        if (error) {
          reject(error);
        }

        resolve(new File([value], filename, { type: "text/calendar" }));
      }
    );
  });

  return file;
};

export default generateIcsFile;
