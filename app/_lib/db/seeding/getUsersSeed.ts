import { fakerEN_GB as faker, SexType } from "@faker-js/faker";

const getUsersSeed = (count: number, seed?: number) => {
  if (seed) {
    faker.seed(seed);
  }

  const data = [
    {
      firstName: "Ad",
      lastName: "Min",
      email: "admin@syt.com",
      password: "Admin123*",
    },
  ];

  for (let i = 0; i < count; i++) {
    const sex = faker.person.sex() as SexType;
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const password = "User123*";

    data.push({
      firstName,
      lastName,
      email,
      password,
    });
  }

  return data;
};

export default getUsersSeed;
