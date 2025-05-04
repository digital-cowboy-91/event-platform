import { eq } from "drizzle-orm";
import db from "../../instance";
import profileTable, { UserId } from "../../schema/profile.schema";

const readSingleProfile = (uid: UserId) =>
  db.select().from(profileTable).where(eq(profileTable.uid, uid));

export default readSingleProfile;
