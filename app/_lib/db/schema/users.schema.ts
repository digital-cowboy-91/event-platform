import { pgTable, varchar } from "drizzle-orm/pg-core";
import { id } from "./column.helpers";

const usersTable = pgTable("users", {
  ...id,
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
});

export default usersTable;
