import { z } from "zod";

const SignInWithEmailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInWithEmail = z.infer<typeof SignInWithEmailSchema>;

export { SignInWithEmailSchema };
export type { SignInWithEmail };
