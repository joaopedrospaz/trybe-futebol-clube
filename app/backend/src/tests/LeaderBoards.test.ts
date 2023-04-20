import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';
import { app } from '../app';
import { Response } from 'superagent';
import { MatcherMock, getAllResultMock, getAwayResultMock, getHomeResultMock } from './mocks/LeaderBoards.mock';
import { IDataLeaderBoard } from '../services/interfaces/LeaderboardsInterfaces';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
chai.use(chaiHttp);
const {expect} = chai;

describe('Testa a rota de LeaderBoards', function() {
    let chaiHttpResponse: Response;
    afterEach(() => {
        sinon.restore();
    });

    describe('GET /leaderboards', function() {
        describe('Quando a requisição é feita com sucesso', function() {
            it('deve retornar o status 200', async function() {
                sinon.stub(Model, 'findAll').resolves(MatcherMock as any);

                chaiHttpResponse = await chai.request(app).get('/leaderboard');

                expect(chaiHttpResponse.status).to.be.equal(200);
                expect(chaiHttpResponse.body).to.deep.equal(getAllResultMock);
            });
        });
    })

    describe('GET /leaderboards/home', function() {
        describe('Quando a requisição é feita com sucesso', function() {
            it('deve retornar o status 200', async function() {
                sinon.stub(Model, 'findAll').resolves(MatcherMock as any);

                chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

                expect(chaiHttpResponse.status).to.be.equal(200);
                expect(chaiHttpResponse.body).to.deep.equal(getHomeResultMock);
            });
        });
    })
    describe('GET /leaderboards/away', function() {
        describe('Quando a requisição é feita com sucesso', function() {
            it('deve retornar o status 200', async function() {
                sinon.stub(Model, 'findAll').resolves(MatcherMock as any);

                chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

                expect(chaiHttpResponse.status).to.be.equal(200);
                expect(chaiHttpResponse.body).to.deep.equal(getAwayResultMock);
            });
        });
    })
});