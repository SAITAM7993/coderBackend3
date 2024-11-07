// import Users from '../../src/dao/Users.dao.js';
// import { expect } from 'chai';

// import {
//   connectMongoDB,
//   disconnectMongoDB,
// } from '../../src/config/mongoDB.config.js'; //para conectar a mongo parametrizado

// connectMongoDB(); //conecto con mongo

// // Describir nuestro test
// describe('Test UserDao', () => {
//   const userDao = new Users();
//   let userTest;

//   // Método que se ejecuta antes de todos los tests
//   before(() => {
//     console.log('Inicio de todos los tests');
//   });

//   // Método que se ejecuta antes de cada test
//   // beforeEach(() => {
//   //   console.log('Se ejecuta un test individual');
//   // });

//   // Test individual
//   it('Debe retornar todos los usuarios', async () => {
//     const users = await userDao.get();
//     expect(users).to.be.an('array');
//     expect(users).to.be.not.an('object');
//   });

//   it('Debe crear y retornar un usuario', async () => {
//     const newUser = {
//       first_name: 'testNombre',
//       last_name: 'testApe',
//       email: 'test@gamil.com',
//       password: '123',
//       age: 30,
//       birthDate: new Date(),
//     };

//     const user = await userDao.save(newUser);
//     userTest = user;
//     // Afirmación
//     expect(user).to.be.an('object');
//     expect(user).to.have.property('_id');
//     expect(user.first_name).to.be.equal(newUser.first_name);
//     expect(user.last_name).to.be.equal(newUser.last_name);
//     expect(user.email).to.be.equal(newUser.email);
//     expect(user.password).to.be.equal(newUser.password);
//     expect(user.role).to.be.equal('user');

//     // Negación
//     expect(user).to.not.have.property('age');
//     expect(user).to.not.have.property('birthDate');
//     expect(user).to.not.be.null;
//     expect(user).to.not.be.an('array');
//   });

//   it('Debe retornar un usuario por su id', async () => {
//     const user = await userDao.getBy(userTest._id);
//     expect(user).to.be.an('object');
//     expect(user).to.have.property('_id');
//     expect(user.first_name).to.be.equal(userTest.first_name);
//     expect(user.last_name).to.be.equal(userTest.last_name);
//     expect(user.email).to.be.equal(userTest.email);
//     expect(user.password).to.be.equal(userTest.password);
//   });

//   it('Debe actualizar un usuario', async () => {
//     const updateData = {
//       first_name: 'testActualizar',
//     };

//     const user = await userDao.update(userTest._id, updateData);
//     expect(user).to.be.an('object');
//     expect(user).to.have.property('_id');
//     expect(user.first_name).to.be.equal(updateData.first_name);
//     expect(user.last_name).to.be.equal(userTest.last_name);
//     expect(user.email).to.be.equal(userTest.email);
//     expect(user.password).to.be.equal(userTest.password);
//   });

//   it('Debe eliminar el usuario', async () => {
//     await userDao.delete(userTest._id);
//     const user = await userDao.getBy(userTest._id);
//     expect(user).to.be.null;
//   });

//   // Método que se ejecuta al finaliza cada test
//   // afterEach(() => {
//   //   console.log('Test individual finalizado');
//   // });

//   // Método que se ejecuta al finalizar todos los test
//   after(async () => {
//     console.log('Tests finalizados');
//     disconnectMongoDB();
//   });
// });
