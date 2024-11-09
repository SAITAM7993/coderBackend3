import Pets from '../../src/dao/Pets.dao.js';
import { expect } from 'chai';

import {
  connectMongoDB,
  disconnectMongoDB,
} from '../../src/config/mongoDB.config.js'; //para conectar a mongo parametrizado

// Describir nuestro test
describe('Test unitario [PetDao]', () => {
  //   Método que se ejecuta antes de todos los tests
  // before(() => {
  //   connectMongoDB(); //conecto con mongo
  // });

  // after(() => {
  //   disconnectMongoDB();
  // });

  const petsDao = new Pets();
  let petTest;

  it('Debe retornar todas las pets', async () => {
    const pets = await petsDao.get();
    expect(pets).to.be.an('array');
    expect(pets).to.be.not.an('object');
  });

  it('Debe crear pet', async () => {
    const newPet = {
      name: 'Pet Test',
      specie: 'Gato',
      birthDate: '1/1/2023',
      image: 'testimage',
    };
    const pet = await petsDao.save(newPet);
    petTest = pet;
    //Afirmación
    expect(pet).to.be.an('object');
    expect(pet).to.have.property('_id');
    expect(pet.name).to.be.equal(newPet.name);
    expect(pet.specie).to.be.equal(newPet.specie);
    expect(pet.birthDate.toLocaleDateString('es-ES')).to.be.equal(
      newPet.birthDate
    ); //toLocaleDateString es para que compare bien, sino quedaba como timestamp vs 1/1/23 y fallaba
    expect(pet.image).to.be.equal(newPet.image);

    //negacion
    expect(pet).to.not.have.property('age');
    expect(pet).to.not.have.property('surname');
    expect(pet).to.not.be.null;
    expect(pet).to.not.be.an('array');
  });

  it('Debe retornar una pet por su id', async () => {
    const pet = await petsDao.getBy(petTest._id);
    expect(pet).to.be.an('object');
    expect(pet).to.have.property('_id');
    expect(pet.name).to.be.equal(petTest.name);
    expect(pet.specie).to.be.equal(petTest.specie);
    expect(pet.birthDate.toLocaleDateString('es-ES')).to.be.equal(
      petTest.birthDate.toLocaleDateString('es-ES')
    ); //AssertionError: expected 2023-01-01T03:00:00.000Z to equal 2023-01-01T03:00:00.000Z por alguna razon daba ese error por mas que eran iguales si no ponia tolocale..
    expect(pet.image).to.be.equal(petTest.image);
  });

  it('Debe actualizar una pet', async () => {
    const updateData = {
      name: 'Pet TestUpdate',
    };
    const pet = await petsDao.update(petTest._id, updateData);

    //Afirmación
    expect(pet).to.be.an('object');
    expect(pet).to.have.property('_id');
    expect(pet.name).to.be.equal(updateData.name);
    expect(pet.specie).to.be.equal(petTest.specie);
    expect(pet.birthDate.toLocaleDateString('es-ES')).to.be.equal(
      petTest.birthDate.toLocaleDateString('es-ES')
    );
    expect(pet.image).to.be.equal(petTest.image);
  });

  it('Debe eliminar una pet', async () => {
    await petsDao.delete(petTest._id);
    const user = await petsDao.getBy(petTest._id);
    expect(user).to.be.null;
  });
});
