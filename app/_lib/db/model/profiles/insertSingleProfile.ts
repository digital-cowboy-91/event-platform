import db from "../../instance";
import usersTable, { ProfileInsertRecord } from "../../schema/profile.schema";

const insertSingleProfile = (uid: string, profile: ProfileInsertRecord) =>
  db.insert(usersTable).values({
    uid,
    ...profile,
  });

export default insertSingleProfile;
