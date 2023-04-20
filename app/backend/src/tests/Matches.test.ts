import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import { app } from '../app';
import * as jwt from 'jsonwebtoken';
import { Response } from 'superagent';
import getALlMock, { PostResult, findAwayTeam, findHomeTeam, inProgressFalseMock, inProgressTrueMock, invalidPostHome, invalidPostoMatcherMock, updateScoreMock, validPost } from './mocks/MatchesMock';
import Teams from '../database/models/TeamsModel';
chai.use(chaiHttp);
const {expect} = chai;
describe('Testa a rota de Matches', function() {
    let chaiHttpResponse: Response;
    afterEach(() => {
        sinon.restore();
    });

    describe('GET /matches', function() {
        describe('Quando a requisição é feita com sucesso', function() {
            it('Deve retornar a lista completa de times com status 200', async function() {
                sinon.stub(Model, 'findAll').resolves(getALlMock as any);
                chaiHttpResponse = await chai.request(app).get('/matches');
                expect(chaiHttpResponse.status).to.be.equal(200);
                expect(chaiHttpResponse.body).to.deep.equal(getALlMock);

            });
        });
    });
    describe('GET /matches?inProgress', function() {
        describe('Quando a requisição é feita com sucesso', function() {
            it('Deve retornar a lista completa de times com inProgress = false com status 200', async function() {
                sinon.stub(Model, 'findAll').resolves(inProgressFalseMock as any);
                chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

                expect(chaiHttpResponse.status).to.be.equal(200);
                expect(chaiHttpResponse.body).to.deep.equal(inProgressFalseMock);

            });
            it('Deve retornar a lista completa de times com inProgress = true com status 200', async function() {
                sinon.stub(Model, 'findAll').resolves(inProgressTrueMock as any);
                chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

                expect(chaiHttpResponse.status).to.be.equal(200);
                expect(chaiHttpResponse.body).to.deep.equal(inProgressTrueMock);

            });
        });
    });
    describe('PATCH /matches/:id/finish', function() {
        describe('Quando a requisição é feita com sucesso', function() {
            it('Deve retornar a mensagem "Finished" com status 200', async function() {
                sinon.stub(jwt, 'verify').returns({} as any);
                sinon.stub(Model, 'update').resolves();

                chaiHttpResponse = await chai.request(app).patch('/matches/2/finish').set('authorization', 'issoEOToken');
                expect(chaiHttpResponse.status).to.be.equal(200);
                expect(chaiHttpResponse.body).to.deep.equal({message: 'Finished'});

            });
        });
    });
    describe('PATCH /matches/:id', function() {
        describe('Quando a requisição é feita com sucesso', function() {
            it('Deve retornar a mensagem "Finished" com status 200', async function() {
                sinon.stub(jwt, 'verify').returns({} as any);
                sinon.stub(Model, 'update').resolves();

                chaiHttpResponse = await chai.request(app).patch('/matches/2')
                .set('authorization', 'issoEOToken').send(updateScoreMock);

                expect(chaiHttpResponse.status).to.be.equal(200);
                expect(chaiHttpResponse.body).to.deep.equal('GOOOOOOOOOOL');

            });
        });
    });
    describe('POST /matches', function() {
        describe('Quando algum parâmetro for inválido', function() {
            it('Deve retornar o status 442 se o "homeTeamId" for igual ao "awayTeamId"', async function() {
                sinon.stub(jwt, 'verify').returns({} as any);
                chaiHttpResponse = await chai.request(app).post('/matches')
                .set('authorization', 'issoEOToken').send(invalidPostoMatcherMock);

                expect(chaiHttpResponse.status).to.be.equal(422);
                expect(chaiHttpResponse.body).to.deep.equal({message: 'It is not possible to create a match with two equal teams'});
            });
            it('Deve retornar o status 442 se o homeTeamId não existir no banco', async function() {
                sinon.stub(jwt, 'verify').returns({} as any);
                sinon.stub(Model, 'findByPk').onFirstCall().resolves(null).onSecondCall().resolves(findAwayTeam as Teams);
                chaiHttpResponse = await chai.request(app).post('/matches')
                .set('authorization', 'issoEOToken').send(invalidPostHome);
                expect(chaiHttpResponse.status).to.be.equal(404);
                expect(chaiHttpResponse.body).to.deep.equal({message: 'There is no team with such id!'});
            });
            it('Deve retornar o status 442 se o awayTeamId não existir no banco', async function() {
                sinon.stub(jwt, 'verify').returns({} as any);
                sinon.stub(Model, 'findByPk').onFirstCall().resolves(findHomeTeam as Teams).onSecondCall().resolves(null);

                chaiHttpResponse = await chai.request(app).post('/matches')
                .set('authorization', 'issoEOToken').send(invalidPostHome);
                expect(chaiHttpResponse.status).to.be.equal(404);
                expect(chaiHttpResponse.body).to.deep.equal({message: 'There is no team with such id!'});
            });
        });
        describe('Quando a requisição é feita com sucesso', function() {
            it('Deve retornar o status 201', async function() {
                sinon.stub(jwt, 'verify').returns({} as any);
                sinon.stub(Model, 'findByPk').onFirstCall().resolves(findHomeTeam as Teams).onSecondCall().resolves(findAwayTeam as Teams);
                sinon.stub(Model, 'create').resolves(PostResult as Matches);
                chaiHttpResponse = await chai.request(app).post('/matches')
                .set('authorization', 'issoEOToken').send(validPost);

                expect(chaiHttpResponse.status).to.be.equal(201);
                expect(chaiHttpResponse.body).to.deep.equal(PostResult);
            });
        });
    });
});