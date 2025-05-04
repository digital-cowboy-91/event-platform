import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";
import { z } from "zod";

const profileTable = pgTable("profile", {
  uid: uuid()
    .primaryKey()
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
});

const ProfileFormDefaultSchema = z.object({
  firstName: z.string().default(""),
  lastName: z.string().default(""),
});

const ProfileFormValidationSchema = ProfileFormDefaultSchema.extend({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

type ProfileRecord = typeof profileTable.$inferSelect;
type ProfileInsertRecord = z.infer<typeof ProfileFormDefaultSchema>;
type UserId = ProfileRecord["uid"];

export default profileTable;
export { ProfileFormDefaultSchema, ProfileFormValidationSchema };
export type { ProfileInsertRecord, ProfileRecord, UserId };
