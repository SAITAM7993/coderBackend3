import { expect } from 'chai';
import supertest from 'supertest';

const userRequest = supertest('http://localhost:8080/api/users');

describe('Test integracion de [USERS]', () => {
  let userTest;
  it('[GET] /api/users - Debe obtener todos los usuarios', async () => {
    const { status, body } = await userRequest.get('/');
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('array');
  });

  it('[POST] /api/users - Debe registrar un usuario', async () => {
    const newUser = {
      first_name: 'UserTest',
      last_name: 'UserTest',
      email: 'usertestmail@gmail.com',
      password: '123',
      role: 'user',
      pets: [],
    };

    const { status, body } = await userRequest.post('/').send(newUser);
    userTest = body.payload;
    expect(status).to.be.equal(201);
    expect(body.payload).to.be.an('object');
    expect(body.payload.first_name).to.be.equal('UserTest');
    expect(body.payload.last_name).to.be.equal('UserTest');
    expect(body.payload.email).to.be.equal('usertestmail@gmail.com');
  });

  it('[GET] /api/users/:uid - Debe obtener un usuario', async () => {
    const { status, body } = await userRequest.get(`/${userTest._id}`);
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('object');
  });

  it('[PUT] /api/users/:uid - Debe actualizar una usuario', async () => {
    const newUser = {
      first_name: 'testUpdate',
    };
    const { status, body } = await userRequest
      .put(`/${userTest._id}`)
      .send(newUser);

    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an('object');
    expect(body.payload.first_name).to.be.equal('testUpdate');
    expect(body.payload.email).to.be.equal('usertestmail@gmail.com');
  });

  it('[DELETE] /api/users/:uid - Debe eliminar un usuario', async () => {
    const { status, body } = await userRequest.delete(`/${userTest._id}`);
    expect(status).to.be.equal(200);
    expect(body.message).to.be.equal('User deleted');
  });
});
