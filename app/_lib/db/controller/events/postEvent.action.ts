"use server";

import createServerClient from "@/app/_lib/supabase/utils/createServerClient";
import getEnvVars from "@/app/_lib/supabase/utils/getEnvVars";
import unires from "@/app/_lib/unires/unires";
import createEvent from "../../model/events/createEvent";
import { EventInsert, EventInsertSchema } from "../../schema/events.schema";

const PUBLIC_BUCKET = getEnvVars().SUPABASE_PUBLIC_BUCKET;

const postEvent = async (body: EventInsert) =>
  unires(async (signalError) => {
    const supabase = await createServerClient();
    const _body = EventInsertSchema.parse(body);

    const { data, error } = await supabase.storage
      .from(PUBLIC_BUCKET)
      .upload(`events/covers/${_body.coverImage.name}`, _body.coverImage);

    if (error) return signalError();

    const event = await createEvent({
      ..._body,
      coverImage: data.path,
    });

    return {
      event: event[0],
    };
  });

export default postEvent;
