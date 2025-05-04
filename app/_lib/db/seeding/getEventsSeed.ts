import { fakerEN_GB as faker } from "@faker-js/faker";

const getEventsSeed = (count: number, seed?: number) => {
  if (seed) {
    faker.seed(seed);
  }

  const data = Array.from({ length: count }).map(() => {
    const createdAt = faker.date.past();
    const updatedAt = faker.date.between({
      from: createdAt,
      to: new Date(),
    });

    const address = faker.location.streetAddress();
    const postcode = faker.location.zipCode();
    const city = faker.location.city();

    const location = [address, postcode, city].join(", ");

    return {
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraph({ min: 5, max: 30 }),
      location,
      startTime: faker.date.future(),
      duration: faker.number.int({ min: 30, max: 120, multipleOf: 30 }),
      capacity: faker.number.int({ min: 0, max: 500, multipleOf: 50 }),
      price: 0,
      coverImage: faker.image.urlPicsumPhotos({
        width: 800,
        height: 600,
        blur: 0,
      }),
      createdAt,
      updatedAt,
    };
  });

  return data;
};

export default getEventsSeed;
