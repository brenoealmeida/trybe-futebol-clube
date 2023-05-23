import * as sinon from 'sinon';
import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';
import teamsListMock from './mocks/team.mock';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração para a rota /teams', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Recuperando a lista de times', async () => {
    sinon.stub(Model, 'findAll').resolves(teamsListMock);

    const response = await chai.request(app).get('/teams');

    expect(response.body).to.be.deep.equal(teamsListMock);
    expect(response.body.length).to.be.equal(3);
  });

  it('Recuperando apenas um time da lista de times', async () => {
    sinon.stub(Model, 'findOne').resolves(teamsListMock[0]);

    const { body, status } = await chai.request(app).get('/teams/:1');

    expect(body).to.be.deep.equal(teamsListMock[0]);
    expect(status).to.be.equal(200);

  });
  it('Recuperando um time com o id inválido', async () => {
    sinon.stub(Model, 'findOne').resolves(undefined);

    const { body, status } = await chai.request(app).get('/teams/:155');

    expect(status).to.be.equal(404);
    expect(body).to.be.deep.equal({ message: 'Time não encontrado' });
  });
});
