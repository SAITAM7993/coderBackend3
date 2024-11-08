import Pets from '../../src/dao/Pets.dao.js';
import { expect } from 'chai';

import {
  connectMongoDB,
  disconnectMongoDB,
} from '../../src/config/mongoDB.config.js'; //para conectar a mongo parametrizado

// Describir nuestro test
describe('Test unitario [PetDao]', () => {
  //   Método que se ejecuta antes de todos los tests
  before(() => {
    connectMongoDB(); //conecto con mongo
  });

  // after(() => {
  //   disconnectMongoDB();
  // });

  const petsDao = new Pets();
  let petsTest;

  it('Debe retornar todas las pets', async () => {
    const pets = await petsDao.get();
    expect(pets).to.be.an('array');
    expect(pets).to.be.not.an('object');
  });
});
