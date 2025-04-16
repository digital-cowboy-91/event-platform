import { pgTable } from "drizzle-orm/pg-core";
import { uuid } from "../column.helpers";

const usersTable = pgTable("users", {
  ...uuid,
});

export default usersTable;
