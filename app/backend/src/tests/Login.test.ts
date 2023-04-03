import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Users from '../database/models/UsersModel';
import  { userModelResult, userResponseResult } from './mocks/LoginMock';
import { Response } from 'superagent';
import { Model } from 'sequelize';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a rota de Login', function() {
    let chaiHttpResponse: Response;
    afterEach(() => {
        sinon.restore();
    });
    describe('POST /login', function() {
        describe('Quando algum parâmetro obrigatório não é informado', function() {
            it('Deve retornar o status 400 caso o email não seja informado', async function() {
                chaiHttpResponse = await chai.request(app).post('/login').send({})
                expect(chaiHttpResponse.status).to.be.equal(400)
                expect(chaiHttpResponse.body).to.deep.equal({message: 'All fields must be filled'})
            });
            it('Deve retornar o status 400 caso a senha não seja informada', async function() {
                chaiHttpResponse = await chai.request(app).post('/login').send({email: 'email@email.com'})
                expect(chaiHttpResponse.status).to.be.equal(400)
                expect(chaiHttpResponse.body).to.deep.equal({message: 'All fields must be filled'})
            });
        });
        
        describe('Quando algum parâmetro for inválido', function() {
            it('Deve retornar o status 401 caso o email esteja no formato inválido', async function() {
                chaiHttpResponse = await chai.request(app).post('/login').send({email: 'email@.com', password: '1234567'});
                expect(chaiHttpResponse.status).to.be.equal(401);
                expect(chaiHttpResponse.body).to.deep.equal({message: 'Invalid email or password'})
            });
            
            it('Deve retornar o status 401 caso a senha tenha menos de 6 caracteres', async function() {
                chaiHttpResponse = await chai.request(app).post('/login').send({email: 'email@email.com', password: '12345'});
                expect(chaiHttpResponse.status).to.be.equal(401);
                expect(chaiHttpResponse.body).to.deep.equal({message: 'Invalid email or password'});
            });

            it('Deve retornar 401 quando o usuário não é encontrado no banco de dados', async function() {
                sinon.stub(Model, 'findOne').resolves(null);

                chaiHttpResponse = await chai.request(app).post('/login').send({email: 'email@email.com', password: '1234567'});
                expect(chaiHttpResponse.status).to.be.equal(401);
                expect(chaiHttpResponse.body).to.deep.equal({message: 'Invalid email or password'});
            });
            it('Deve retornar 401 quando a senha do usuário não for igual', async function() {
                sinon.stub(Model, 'findOne').resolves(userModelResult as Users);

                chaiHttpResponse = await chai.request(app).post('/login').send({email: 'email@email.com', password: '1234567'});
                expect(chaiHttpResponse.status).to.be.equal(401);
                expect(chaiHttpResponse.body).to.deep.equal({message: 'Invalid email or password'});
            });
        });
        describe('Quando a requisição é feita com sucesso', function() {
            it('Deve retornar o status 200', async function() {
                sinon.stub(Model, 'findOne').resolves(userModelResult as Users);

                chaiHttpResponse = await chai.request(app).post('/login').send({email: 'email@email.com', password: 'secret_user'});

                expect(chaiHttpResponse.status).to.be.equal(200);
                // expect(chaiHttpResponse.body).to.be.equal({token});
            });
        });
    });
});