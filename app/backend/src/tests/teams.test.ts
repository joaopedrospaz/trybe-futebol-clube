import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Allteams from './mocks/teamsMock';
import { app } from '../app';
import Teams from '../database/models/TeamsModel';
import { Response } from 'superagent';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota de Teams', function() {
    let chaiHttpResponse: Response;
    afterEach(()=>{
        sinon.restore();
    });
    describe('GET /teams', function() {
        it('Retornar a lista completa de times', async function() {
            sinon.stub(Model, 'findAll').resolves(Allteams as Teams[]);
            
            chaiHttpResponse = await chai.request(app).get('/teams');
                  
            expect(chaiHttpResponse.status).to.be.equal(200);
                  
            expect(chaiHttpResponse.body).to.deep.equal(Allteams);
        });
            
    });
    
    describe('GET /teams/id', function() {
        sinon.stub(Model, 'findByPk').resolves(Allteams[1] as Teams);
        it(' Retorna um time', async function() {
            
            chaiHttpResponse = await chai.request(app).get('/teams/2');
            
            expect(chaiHttpResponse.status).to.be.equal(200);
            
            expect(chaiHttpResponse.body).to.deep.equal(Allteams[1]);
        });
    });
});

