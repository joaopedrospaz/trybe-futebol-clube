import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Allteams from './mocks/teamsMock';
import { app } from '../app';
import Teams from '../database/models/teamsModel';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota de Teams', function() {
    let chaiHttpResponse: Response;
      afterEach(()=>{
          sinon.restore();
      });
        it('GET /teams: Retornar a lista completa de times', async function() {
            sinon.stub(Teams, 'findAll').resolves(Allteams as Teams[]);

             chaiHttpResponse = await chai.request(app).get('/teams');
            
             expect(chaiHttpResponse.status).to.be.equal(200);
            
             expect(chaiHttpResponse.body).to.deep.equal(Allteams);

            });
        it('GET /teams/id: Retorna um time', async function() {
            sinon.stub(Teams, 'findByPk').resolves(Allteams[1] as Teams);
            
            chaiHttpResponse = await chai.request(app).get('/teams/2');
            
            expect(chaiHttpResponse.status).to.be.equal(200);

            expect(chaiHttpResponse.body).to.deep.equal(Allteams[1]);
    });
});

