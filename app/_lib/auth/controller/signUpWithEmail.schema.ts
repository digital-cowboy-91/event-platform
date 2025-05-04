import { z } from "zod";
import { ProfileFormValidationSchema } from "../../db/schema/profile.schema";
import { SignInWithEmailSchema } from "./signInWithEmail.schema";

const SignUpWithEmailSchema = SignInWithEmailSchema.merge(
  z.object({
    confirmPassword: z.string(),
  })
)
  .merge(ProfileFormValidationSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpWithEmail = z.infer<typeof SignUpWithEmailSchema>;

export { SignUpWithEmailSchema };
export type { SignUpWithEmail };
