import { eq } from "drizzle-orm";
import db from "../../instance";
import profileTable, {
  ProfileInsertRecord,
  UserId,
} from "../../schema/profile.schema";

const updateSingleProfile = (uid: UserId, record: ProfileInsertRecord) =>
  db.update(profileTable).set(record).where(eq(profileTable.uid, uid));

export default updateSingleProfile;
