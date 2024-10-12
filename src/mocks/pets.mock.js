import { fakerES_MX as faker } from '@faker-js/faker';

export const generatePetsMock = (qty) => {
  const pets = [];
  for (let i = 0; i < qty; i++) {
    let specie = faker.animal.type(); //genero la variable aca para poder usarla en la img para coincida la img con la especie
    const pet = {
      name: faker.person.firstName(),
      specie: specie, //trae un tipo de animal
      birthDate: faker.date.between({ from: '2000-01-01', to: Date.now() }), //para que traiga una fecha desde una determinada hasta ahora
      adopted: false,
      image: faker.image.urlLoremFlickr({ category: specie }), //para que traiga alguna img relacionada a la especie que le agregamos
    };

    pets.push(pet);
  }

  return pets;
};

//birthDate: faker.date.past(), //trae cualquier fecha del pasado
//image: faker.image.avatar(),
