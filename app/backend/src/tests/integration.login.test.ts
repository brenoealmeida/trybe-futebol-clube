import * as sinon from 'sinon';
import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import { invalidEmail, noEmail, noPassword, userInput, userOutput } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração para a rota /login', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Realizando um login com sucesso', async () => {
    sinon.stub(Model, 'findOne').resolves(userOutput);

    const response = await chai.request(app).post('/login').send(userInput);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('Cadastrando um novo login/usuario sem email', async () => {
    const response = await chai.request(app).post('/login').send(noEmail);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Cadastrando um novo login/usuario sem password', async () => {
    const response = await chai.request(app).post('/login').send(noPassword);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Cadastrando um novo login/usuario com um email inválido', async () => {
    const response = await chai.request(app).post('/login').send(invalidEmail);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Cadastrando um novo login/usuario com uma senha inválida', async () => {
    const response = await chai.request(app).post('/login').send(invalidEmail);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
});
