import { pgTable, varchar } from "drizzle-orm/pg-core";
import { uuid } from "../column.helpers";

const usersTable = pgTable("users", {
  ...uuid,
  firstName: varchar().notNull(),
  lastName: varchar().notNull(),
});

export default usersTable;
