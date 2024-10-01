import { fakerES_MX as faker } from '@faker-js/faker';
const specie = faker.animal.type();

export const generatePetsMock = (qty) => {
  const pets = [];
  for (let i = 0; i < qty; i++) {
    const pet = {
      name: faker.person.firstName(),
      specie: specie,
      image: faker.image.urlLoremFlickr({ category: specie }), //para que traiga alguna img relacionada a la especie que le agregamos
      birthDate: faker.date.between({ from: '2000-01-01', to: Date.now() }),
      adopted: false,
    };
    pets.push(pet);
  }

  return pets;
};
