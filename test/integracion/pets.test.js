import { expect } from 'chai';
import supertest from 'supertest';
import express from 'express';

/*INICIO CODIGO PARA QUE FUNCIONE, NO SE POR QUE NO ANDA SIN ESTO y en los tests de dao si*/
import petsRouter from '../../src/routes/pets.router.js';

const PORT = process.env.PORT || 8080;
let server;
const app = express();
app.use(express.json());
app.use('/api/pets', petsRouter);

/*FIN */
import {
  connectMongoDB,
  disconnectMongoDB,
} from '../../src/config/mongoDB.config.js'; //para conectar a mongo parametrizado

const request = supertest('http://localhost:8080/api/pets'); //url a donde vamos a hacer la peticion - como si lo hicieramos desde postman

describe('Test de integración Pets', () => {
  let testPet;
  // Método que se ejecuta antes de todos los tests
  before(async () => {
    await connectMongoDB(); //conecto con mongo
    console.log('--- INICIO de tests integracion [PETS]');
    server = app.listen(PORT); //tengo que inicializar con esto para que funcione
  });

  after(async () => {
    await disconnectMongoDB(); //conecto con mongo
    server.close(); // Cierra el servidor
    console.log('--- FIN de tests integracion [PETS]');
  });

  //let testPet;
  it('[GET] /api/pets - Debe devolver un array de mascotas', async () => {
    const { status, body } = await request.get('/');
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('array');
  });
  it('[POST] /api/pets - Debe crear una nueva mascota', async () => {
    const newPet = {
      name: 'Pet Test',
      specie: 'Gato',
      birthDate: '10/10/2023',
      image: 'testimage',
    };
    const { status, body } = await request.post('/').send(newPet);
    testPet = body.payload;
    expect(status).to.be.equal(201);
    expect(body.payload).to.be.an('object');
    expect(body.payload.name).to.be.equal('Pet Test');
    expect(body.payload.specie).to.be.equal('Gato');
    expect(body.payload.adopted).to.be.equal(false);
  });

  it('[PUT] /api/pets/:pid - Debe actualizar una mascota', async () => {
    const newPet = {
      specie: 'Perro',
    };
    console.log(testPet._id);
    const { status, body } = await request.put(`/${testPet._id}`).send(newPet);

    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('object');
    expect(body.payload.name).to.be.equal('Pet Test');
    expect(body.payload.specie).to.be.equal('Perro');
    expect(body.payload.adopted).to.be.equal(false);
  });

  it('[DELETE] /api/pets/:pid - Debe eliminar una mascota', async () => {
    const { status, body } = await request.delete(`/${testPet._id}`);

    expect(status).to.be.equal(200);
    expect(body.message).to.be.equal('pet deleted');
  });
});
