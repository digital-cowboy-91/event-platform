import { eq } from "drizzle-orm";
import db from "../../instance";
import profileTable, { UserId } from "../../schema/profile.schema";

const selectProfileById = (userId: UserId) =>
  db.select().from(profileTable).where(eq(profileTable.uid, userId));

export default selectProfileById;
