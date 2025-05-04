import { reset } from "drizzle-seed";
import createServerClient from "../../supabase/utils/createServerClient";
import db from "../instance";
import eventsTable from "../schema/events.schema";
import profileTable from "../schema/profile.schema";
import ticketsTable from "../schema/tickets.schema";
import getEventsSeed from "./getEventsSeed";
import getUsersSeed from "./getUsersSeed";

const seed = async () => {
  const schema = {
    users: profileTable,
    events: eventsTable,
    tickets: ticketsTable,
  };

  // Reset
  console.log("Resetting database...");
  await reset(db, schema);

  // Auth & Profiles
  console.log("Seeding Users and User Profiles...");

  const supabase = await createServerClient();
  const usersData = getUsersSeed(5, 100);

  for (const user of usersData) {
    const auth = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });

    if (auth.error) throw auth.error;
    if (!auth.data.user?.id) throw new Error("User not created");

    await db.insert(profileTable).values({
      uid: auth.data.user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }

  // Events
  console.log("Seeding Events...");

  const eventsData = getEventsSeed(10, 100);
  await db.insert(eventsTable).values(eventsData);

  // Tickets
  console.log("Seeding Tickets...");

  try {
    const events = await db.select().from(eventsTable);
    const profiles = await db.select().from(profileTable);

    const shouldSkip = (pct: number) => Math.random() < pct;

    for (const event of events) {
      const values = [];

      if (shouldSkip(0.2)) {
        continue;
      }

      for (let i = 0; i < (event.capacity ?? 1000); i++) {
        if (shouldSkip(0.3)) {
          continue;
        }

        const profile = profiles[Math.floor(Math.random() * profiles.length)];

        values.push({
          eventId: event.id,
          userId: profile.uid,
        });
      }

      if (values.length > 0) {
        await db.insert(ticketsTable).values(values);
      }
    }
  } catch (e) {
    console.error(e);
  }

  console.log("Seeding done!");
};

export default seed;
