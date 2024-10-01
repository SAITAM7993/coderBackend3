import { fakerES_MX as faker } from '@faker-js/faker';

export const generateUsersMock = (qty) => {
  const users = [];
  for (let i = 0; i < qty; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: '123',
      role: 'user',
      pets: [],
    };
    users.push(user);
  }

  return users;
};
