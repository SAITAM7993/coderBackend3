import { fakerES_MX as faker } from '@faker-js/faker';
import { createHash } from '../utils/index.js';

export const generateUsersMock = async (qty) => {
  const users = [];
  for (let i = 0; i < qty; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: await createHash('pass123'),
      role: faker.datatype.boolean(0.8) ? 'user' : 'admin', //esto hace que se genere de forma aleatoria si es user o admin, devuelve true o false aleatoriamente, dentro del () le indicamos un numerico que va a ser la probabilidad de true 0.8 seria 80%
      pets: [],
    };
    users.push(user);
  }

  return users;
};
