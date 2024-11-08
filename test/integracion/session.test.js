import { expect } from 'chai';
import supertest from 'supertest';

const request = supertest('http://localhost:8080/api/sessions');
const userRequest = supertest('http://localhost:8080/api/users');

describe('Test integracion de [SESSIONS]', () => {
  let userTest;
  it('[POST] /api/sessions/register - Debe registrar un usuario', async () => {
    const newUser = {
      first_name: 'UserTest',
      last_name: 'UserTest',
      email: 'usertestmail2@gmail.com',
      password: '123',
    };

    const { status, body } = await request.post('/register').send(newUser);
    userTest = body.payload;

    expect(status).to.be.equal(201);
    expect(body.status).to.be.equal('success');
    expect(body.payload).to.be.an('object');
    expect(body.payload.email).to.be.equal(newUser.email);
    expect(body.payload.first_name).to.be.equal(newUser.first_name);
    expect(body.payload.last_name).to.be.equal(newUser.last_name);
    expect(body.payload.password).to.not.be.equal(newUser.password);
  });

  it('[POST] /api/sessions/login - Debe loguear un usuario', async () => {
    const data = {
      email: 'usertestmail2@gmail.com',
      password: '123',
    };

    const { status, body } = await request.post('/login').send(data);

    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal('success');
    expect(body.message).to.be.an('string');
  });
  after(async () => {
    await userRequest.delete(`/${userTest._id}`);
  });
  // it('[DELETE] /api/users/:uid - Debe eliminar un usuario', async () => {
  //   const { status, body } = await userRequest.delete(`/${userTest._id}`);
  //   expect(status).to.be.equal(200);
  //   expect(body.message).to.be.equal('User deleted');
  // });
});
