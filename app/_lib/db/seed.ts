import { getGeneratorsFunctions, reset, seed } from "drizzle-seed";
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
  await reset(db, schema);

  // Users, Events
  const duration = [60, 90, 120];
  const capacity = [10, 30, 60, 250];
  const price = [5, 10, 15];
  const startTime = (mock: ReturnType<typeof getGeneratorsFunctions>) => {
    const date = mock
      .date({ minDate: "2025-05-01", maxDate: "2025-05-31" })
      .generate();
    const hour = mock.valuesFromArray({ values: [12, 15, 17, 20, 21] });
    const minute = mock.valuesFromArray({ values: [0, 30] });

    return new Date(`${date} ${hour}:${minute}`);
  };

  await seed(db, schema).refine((mock) => ({
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
        // startTime: mock.datetime(),
        startTime: mock.default({
          defaultValue: startTime(mock),
        }),
        duration: mock.valuesFromArray({ values: duration }),
        capacity: mock.valuesFromArray({ values: capacity }),
        price: mock.weightedRandom([
          { weight: 0.6, value: mock.valuesFromArray({ values: price }) },
        ]),
      },
    },
  }));

  // Tickets
  const events = await db.select().from(eventsTable);
  const users = await db.select().from(usersTable);
  const shouldSkip = (pct: number) => Math.floor(Math.random()) < pct;

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
};

export default seedDatabase;
