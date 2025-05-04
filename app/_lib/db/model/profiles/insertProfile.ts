import db from "../../instance";
import usersTable, { ProfileInsertRecord } from "../../schema/profile.schema";

const insertProfile = (userId: string, profile: ProfileInsertRecord) =>
  db.insert(usersTable).values({
    uid: userId,
    ...profile,
  });

export default insertProfile;
