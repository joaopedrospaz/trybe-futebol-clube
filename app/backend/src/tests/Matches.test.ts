import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
chai.use(chaiHttp);
const {expect} = chai;

describe('Testa a rota de Matches', function() {
    let chaiHttpResponse: Response;
    afterEach(() => {
        sinon.restore();
    });

    describe('GET /matches', function() {
        
    });
});