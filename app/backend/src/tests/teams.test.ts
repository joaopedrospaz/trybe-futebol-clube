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
    //   afterEach(()=>{
    //       sinon.restore();
    //   });
    describe('GET /teams', () => {
        it('Retornar a lista completa de times', async function() {
            sinon.stub(Teams, 'findAll').resolves(Allteams as Teams[]);

             chaiHttpResponse = await chai.request(app).get('/teams');
            
             expect(chaiHttpResponse.status).to.be.equal(200);
            
             expect(chaiHttpResponse.body).to.deep.equal(Allteams);
        });
    });
});

