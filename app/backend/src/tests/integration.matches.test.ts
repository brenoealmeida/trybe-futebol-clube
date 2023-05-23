import * as chai from 'chai';
import * as sinon from 'sinon';

import chaiHttp = require('chai-http');

import { Model } from 'sequelize';
import { app } from '../app';
import { matchesListMock, newMatchReq, newMatchReqInvalid, newMatchRes, newMatchResInvalid, updateMatchReq } from './mocks/matches.mock';
import { userInput, userOutput } from './mocks/users.mock';
import User from '../database/models/UserModel';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração para a rota /matches', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Recuperando a lista de partidas', async () => {
    sinon.stub(Model, 'findAll').resolves(matchesListMock as unknown as Model<Match>[]);
    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesListMock);
  });

  it('Cadastrando uma nova partida com sucesso', async () => {
    sinon.stub(Model, 'findOne').resolves(userOutput);
    const loginResponse = await chai.request(app).post('/login').send(userInput);

    sinon.stub(Model, 'create').resolves(newMatchRes);
    const matchesResponse = await chai.request(app).post('/matches').send(newMatchReq).set('Authorization', loginResponse.body.token);

    expect(matchesResponse.status).to.be.equal(201);
    expect(matchesResponse.body).to.be.deep.equal(newMatchRes);
  });

  it('Cadastrando uma nova partida com um id inválido', async () => {
    sinon.stub(User, 'findOne').resolves(userOutput);
    const loginResponse = await chai.request(app).post('/login').send(userInput);

    sinon.stub(Team, 'findOne').resolves();

    const matchesResponse = await chai.request(app).post('/matches').send(newMatchReqInvalid).set('Authorization', loginResponse.body.token);

    expect(matchesResponse.status).to.be.equal(404);
    expect(matchesResponse.body.message).to.be.equal('There is no team with such id!');
  });

  it('Retornando apenas as partidas em andamento', async () => {
    sinon.stub(Model, 'findAll').resolves([matchesListMock[2]] as unknown as Model<Match>[]);
    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal([matchesListMock[2]]);
  })

  it('Atualizando partidas em andamento com sucesso', async () => {
    sinon.stub(Model, 'findOne').resolves(userOutput);
    const loginResponse = await chai.request(app).post('/login').send(userInput);

    const updatedRows = [1];

    sinon.stub(Model, 'update').resolves(updatedRows as [number]);
    const response = await chai.request(app).patch('/matches/1').send(updateMatchReq).set('Authorization', loginResponse.body.token);

    expect(response.status).to.be.equal(200)
  })

});
