const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de pruebas teams', () => {
    it('should return the team of the given user', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let team = [{ name: 'Charizard' }, { name: 'Blastoise' }]
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'alexisarte', password: '1234' })
            .end((err, res) => {
                let token = res.body.token;
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/teams')
                    // enviar header
                    .send({
                        team: team
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            // enviar header
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // tiene equipo con Charizard y Blastoise
                                // {trainer: 'alexisarte', team: [pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'alexisarte');
                                chai.assert.equal(res.body.team.length, team.length);
                                chai.assert.equal(res.body.team[0], team[0].name);
                                chai.assert.equal(res.body.team[1], team[1].name);
                                done();
                            });
                    });
            });
    });
    it('should return the pokedex number', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let pokemonName = 'Bulbasaur'
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'mikelarte', password: '1234' })
            .end((err, res) => {
                let token = res.body.token;
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .post('/teams/pokemons')
                    // enviar header
                    .send({ name: pokemonName })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            // enviar header
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // tiene equipo con Charizard y Blastoise
                                // {trainer: 'alexisarte', team: [pokemon]}
                                // console.log(res);
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'mikelarte');
                                chai.assert.equal(res.body.team.length, 1);
                                chai.assert.equal(res.body.team[0].name, pokemonName);
                                chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                                done();
                            });
                    });
            });
    });
});