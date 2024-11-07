// import Pets from '../../src/dao/Pets.dao.js';
// import { expect } from 'chai';

// import {
//   connectMongoDB,
//   disconnectMongoDB,
// } from '../../src/config/mongoDB.config.js'; //para conectar a mongo parametrizado

// // Describir nuestro test
// describe('Test PetDao', () => {
//   const petsDao = new Pets();
//   let petsTest;

//   // Método que se ejecuta antes de todos los tests
//   before(() => {
//     connectMongoDB(); //conecto con mongo
//     console.log('INICIO de tests [PetDao]');
//   });

//   after(() => {
//     disconnectMongoDB(); //conecto con mongo
//     console.log('FIN de tests [PetDao]');
//   });

//   it('Debe retornar todoa las pets', async () => {
//     const pets = await petsDao.get();
//     // console.log(pets);
//     expect(pets).to.be.an('array');
//     expect(pets).to.be.not.an('object');
//   });
// });
