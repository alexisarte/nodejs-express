// Autenticacion => determinar quien es el usuario?
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const usersController = require('../controllers/users');

const app = require('../app').app;

before((done) => {
    usersController.registerUser('alexisarte', '1234');
    usersController.registerUser('mikelarte', '1234');
    done();
})

describe('Suite de pruebas auth', () => {
    // no autorizado 403
    it('should return 401 when no jwt token available', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get('/teams')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });

    it('should return 400 when no data is provided', (done) => {
        chai.request(app)
            .post('/auth/login')
            .end((err, res) => {
                //Expect valid login
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });

    it('should return 200 and token for succesful login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'alexisarte', password: '1234' })
            .end((err, res) => {
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should return 200 when jwt is valid', (done) => {
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
                        done();
                    });
            });
    });
    after((done) => {
        usersController.cleanUpUsers()
        done();
    });
});
