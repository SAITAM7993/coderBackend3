import Adoption from '../../src/dao/Adoption.js';
import { expect } from 'chai';
import supertest from 'supertest';
import {
  connectMongoDB,
  disconnectMongoDB,
} from '../../src/config/mongoDB.config.js'; //para conectar a mongo parametrizado

const userRequest = supertest('http://localhost:8080/api/users');
const petRequest = supertest('http://localhost:8080/api/pets');

// Describir nuestro test
describe('Test unitario [AdoptionDao]', () => {
  //   Método que se ejecuta antes de todos los tests
  let adoptionTest;
  before(() => {
    connectMongoDB(); //conecto con mongo
  });
  const adoptionDao = new Adoption();

  it('Debe retornar todas las adopciones', async () => {
    const users = await adoptionDao.get();
    expect(users).to.be.an('array');
    expect(users).to.be.not.an('object');
  });

  it('Debe crear y retornar una adopcion', async () => {
    const { status: statusUser, body: bodyUser } = await userRequest.get('/');
    const firstUser = bodyUser.payload[0];

    const { status: statusPets, body: bodyPets } = await petRequest.get('/');

    const firstUnadoptedPet = bodyPets.payload.find(
      (pet) => pet.adopted === false
    );

    const newAdoption = {
      owner: `${firstUser._id}`,
      pet: `${firstUnadoptedPet._id}`,
    };

    const adotpion = await adoptionDao.save(newAdoption);

    adoptionTest = adotpion;
    // Afirmación
    expect(adotpion).to.be.an('object');
    expect(adotpion).to.have.property('_id');
    expect(adotpion.owner._id.toString()).to.be.equal(newAdoption.owner); //.toString() para que funcione la comparacion, sino queda como object id
    expect(adotpion.pet._id.toString()).to.be.equal(newAdoption.pet);
  });

  it('Debe retornar una adopcion por su id', async () => {
    const adoption = await adoptionDao.getBy(adoptionTest._id.toString());
    expect(adoption).to.be.an('object');
    expect(adoption).to.have.property('_id');
    expect(adoption.owner._id.toString()).to.be.equal(
      adoptionTest.owner._id.toString()
    ); //.toString() para que funcione la comparacion, sino queda como object id
    expect(adoption.pet._id.toString()).to.be.equal(
      adoptionTest.pet._id.toString()
    );
  });
  it('Debe eliminar una adopcion', async () => {
    await adoptionDao.delete(adoptionTest._id);
    const adoption = await adoptionDao.getBy(adoptionTest._id);
    expect(adoption).to.be.null;
  });
});
