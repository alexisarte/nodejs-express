// Autenticacion => determinar quien es el usuario?
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de pruebas auth', () => {
    // no autorizado 403
    it('should return 401 when no jwt token available', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get('/team')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });
    it('should return 200 when jwt is valid', (done) => {
        chai.request(app)
            .post('/login')
            .end((err, res) => {
                // Cuando la llamada no tiene correctamente la llave
                chai.request(app)
                    .get('/team')
                    // enviar header
                    .set('Autorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });
    });
});
