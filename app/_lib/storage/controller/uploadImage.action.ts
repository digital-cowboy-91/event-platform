"use server";

import createServerClient from "../../supabase/utils/createServerClient";
import getEnvVars from "../../supabase/utils/getEnvVars";
import unires from "../../unires/unires";
import ImageUploadSchema from "./uploadImage.schema";

const PUBLIC_BUCKET = getEnvVars().SUPABASE_PUBLIC_BUCKET;

const uploadImage = async (
  file: File,
  path: string
  // uploadToPrivateBucket: boolean = false
) =>
  unires(async (signalError) => {
    const _file = ImageUploadSchema.safeParse(file);

    if (_file.error) {
      return signalError(_file.error);
    }

    const supabase = await createServerClient();

    const storage = await supabase.storage
      .from(PUBLIC_BUCKET)
      .upload(`${path}/${_file.data.name}`, _file.data, { upsert: false });

    if (storage.error) {
      return signalError(storage.error);
    }

    return { storage: storage.data };
  });

export default uploadImage;
