import { expect } from 'chai';
import supertest from 'supertest';

const adoptionRequest = supertest('http://localhost:8080/api/adoptions');
const userRequest = supertest('http://localhost:8080/api/users');
const petRequest = supertest('http://localhost:8080/api/pets');

const { status: statusUser, body: bodyUser } = await userRequest.get('/');
const firstUser = bodyUser.payload[0];

const { status: statusPets, body: bodyPets } = await petRequest.get('/');

const firstUnadoptedPet = bodyPets.payload.find((pet) => pet.adopted === false);

const { status, body } = await adoptionRequest.post(
  `/${firstUser._id}/${firstUnadoptedPet._id}`
);

describe('Test integracion [ADOPTIONS]', () => {
  let adoptionTest;
  it('[GET] /api/adoptions - Debe obtener todas las odopciones', async () => {
    const { status, body } = await adoptionRequest.get('/');
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('array');
    expect(body.payload).not.to.be.an('object');
    expect(body.payload).not.to.be.null;
  });

  it('[POST] /api/adoptions - Debe crear una las adopcion', async () => {
    adoptionTest = body.payload;
    expect(status).to.be.equal(200);
  });

  it('[GET] /api/adoptions - Debe obtener una odopcion', async () => {
    const { status, body } = await adoptionRequest.get(`/${adoptionTest._id}`);
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('object');
    expect(body.payload).not.to.be.an('array');
  });

  it('[DELETE] /api/adoptions - Debe eliminar una adopcion', async () => {
    const { status, body } = await adoptionRequest.delete(
      `/${adoptionTest._id}`
    );
    expect(status).to.be.equal(200);
    expect(body.message).to.be.equal('Adoption removed successfully');
  });
});
