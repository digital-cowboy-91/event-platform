import db from "../../instance";
import usersTable, { ProfileInsertRecord } from "../../schema/profile.schema";

const createSingleProfile = (uid: string, profile: ProfileInsertRecord) =>
  db.insert(usersTable).values({
    uid,
    ...profile,
  });

export default createSingleProfile;
