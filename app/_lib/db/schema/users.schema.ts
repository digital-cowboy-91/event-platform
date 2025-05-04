import { pgTable, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";
import { id } from "./column.helper";

const usersTable = pgTable("users", {
  ...id,
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
});

const UserFormDefaultSchema = z.object({
  firstName: z.string().default(""),
  lastName: z.string().default(""),
});

const UserFormValidationSchema = UserFormDefaultSchema.extend({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

type UserRecord = typeof usersTable.$inferSelect;
type UserInsertRecord = z.infer<typeof UserFormDefaultSchema>;

export default usersTable;
export { UserFormDefaultSchema, UserFormValidationSchema };
export type { UserInsertRecord, UserRecord };
