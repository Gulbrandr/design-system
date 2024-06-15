import { faker } from '@faker-js/faker';
import { randomBytes } from 'crypto';

export const getPerson = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    middleName: faker.name.firstName(),

    age: faker.random.numeric(),
    visits: faker.random.numeric(),
    progress: faker.random.numeric(),
    bankBalance: faker.datatype.float().toFixed(2),

    status: faker.random.word(),
    birthday: faker.date.past(),
    birthCountry: faker.address.country(),
    birthCity: faker.address.city(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    street: faker.address.street(),
  };
};
export type Person = ReturnType<typeof getPerson>;
export function getPeople() {
  return Array.from(
    {
      length: 100,
    },
    (_, index) => {
      return {
        ...getPerson(),
        id: index,
      };
    }
  );
}

export const people = getPeople;

export async function getPeopleAsync({
  timeOut = 1500,
  error = false,
  empty = false,
}: {
  timeOut?: number;
  error?: boolean;
  empty?: boolean;
}) {
  const promise = new Promise<Person[]>((resolve, reject) => {
    setTimeout(() => {
      try {
        if (error) throw new Error('Error in getPeopleAsync');
        if (empty) resolve([]);
        resolve(getPeople());
      } catch (error) {
        reject(error);
      }
    }, timeOut);
  });
  return promise;
}

const PeopleService = {
  getPeople, // sync
  getPeopleAsync, // async
};

export default PeopleService;
