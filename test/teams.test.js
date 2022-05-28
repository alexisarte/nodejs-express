const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de pruebas teams', () => {
    it('should return the team of the given user', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'alexisarte', password: '1234' })
            .end((err, res) => {
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/teams')
                    // enviar header
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        chai.assert.equal(res.body.trainer, 'alexisarte');
                        chai.assert.equal(res.body.team.length, 2);
                        chai.assert.equal(res.body.team[0], 'Charizard');
                        chai.assert.equal(res.body.team[1], 'Blastoise');
                        done();
                    });
            });
    });
});