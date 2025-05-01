import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const UploadImageSchema = z
  .instanceof(File)
  .refine(
    (file) => !file || file.size <= MAX_UPLOAD_SIZE,
    "File size must be less than 5MB"
  )
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    "This file type is not allowed"
  );

export default UploadImageSchema;
