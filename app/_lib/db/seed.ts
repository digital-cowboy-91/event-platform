import { reset, seed } from "drizzle-seed";
import db from "./db.instance";
import eventsTable from "./schema/events.schema";
import ticketsTable from "./schema/tickets.schema";
import usersTable from "./schema/users.schema";

const seedDatabase = async () => {
  const schema = {
    users: usersTable,
    events: eventsTable,
    tickets: ticketsTable,
  };

  // Reset
  console.log("Resetting database...");
  await reset(db, schema);

  // Users, Events
  console.log("Seeding Users, Events...");

  const duration = [60, 90, 120];
  const capacity = [10, 30, 60, 250];
  const price = [5, 10, 15];

  await seed(db, schema)
    .refine((mock) => ({
      users: {
        count: 50,
        columns: {
          firstName: mock.firstName(),
          lastName: mock.lastName(),
        },
      },
      events: {
        count: 15,
        columns: {
          title: mock.companyName(),
          description: mock.loremIpsum(),
          location: mock.city(),
          startTime: mock.datetime(),
          updatedAt: mock.default({ defaultValue: null }),
          createdAt: mock.default({ defaultValue: new Date() }),
          duration: mock.valuesFromArray({ values: duration }),
          capacity: mock.valuesFromArray({ values: capacity }),
          price: mock.weightedRandom([
            { weight: 0.6, value: mock.valuesFromArray({ values: price }) },
            { weight: 0.4, value: mock.default({ defaultValue: 0 }) },
          ]),
        },
      },
    }))
    .catch((error) => console.error(error));

  // Tickets
  console.log("Seeding Tickets...");

  const events = await db.select().from(eventsTable);
  const users = await db.select().from(usersTable);
  const shouldSkip = (pct: number) => Math.random() < pct;

  for (const event of events) {
    if (shouldSkip(0.2)) {
      continue;
    }

    for (let i = 0; i < (event.capacity ?? 1000); i++) {
      if (shouldSkip(0.3)) {
        continue;
      }

      const user = users[Math.floor(Math.random() * users.length)];
      await db.insert(ticketsTable).values({
        eventId: event.id,
        userId: user.id,
      });
    }
  }

  console.log("Database seeded!");
};

export default seedDatabase;
