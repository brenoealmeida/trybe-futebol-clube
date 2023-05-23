import * as chai from 'chai';
import * as sinon from 'sinon';

import chaiHttp = require('chai-http');

import { Model } from 'sequelize';
import { app } from '../app';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { leaderboardAwayMock, leaderboardHomeMock, leaderboardMatchesMock, leaderboardTeamsMock } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração para a rota /leaderboard', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Recuperando as informações dos times da casa', async () => {
    sinon.stub(Team, 'findAll').resolves(leaderboardTeamsMock);
    sinon.stub(Match, 'findAll').resolves(leaderboardMatchesMock as unknown as Model<Match>[]);

    const response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(leaderboardHomeMock);
  });

  it('Recuperando as informações dos times de fora', async () => {
    sinon.stub(Team, 'findAll').resolves(leaderboardTeamsMock);
    sinon.stub(Match, 'findAll').resolves(leaderboardMatchesMock as unknown as Model<Match>[]);

    const response = await chai.request(app).get('/leaderboard/away');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(leaderboardAwayMock);
  });
});
