const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const usersController = require('../../auth/users.controller')
const teamsController = require('../teams.controller');

const app = require('../../app').app;

before((done) => {
    usersController.registerUser('alexisarte', '1234');
    usersController.registerUser('mikelarte', '1234');
    done();
})

afterEach(async () => {
    await teamsController.cleanUpTeam();
})

describe('Suite de pruebas teams', () => {
    it('should return the team of the given user', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let team = [{ name: 'Charizard' }, { name: 'Blastoise' }, { name: 'Pikachu' }]
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
                    .send({
                        team: team
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
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
        let team = [{ name: 'Charizard' }, { name: 'Blastoise' }, { name: 'Pikachu' }]
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
                    .send({ team: team })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .delete('/teams/pokemons/1')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.request(app)
                                    .get('/teams')
                                    .set('Authorization', `JWT ${token}`)
                                    .end((err, res) => {
                                        // tiene equipo con Charizard y Blastoise
                                        // {trainer: 'alexisarte', team: [pokemon]}
                                        chai.assert.equal(res.statusCode, 200);
                                        chai.assert.equal(res.body.trainer, 'alexisarte');
                                        chai.assert.equal(res.body.team.length, 1);
                                        chai.assert.equal(res.body.team[0].name, pokemonName);
                                        chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                                        done();
                                    });
                            });
                    });
            });
    });

    it('should remove the at index pokemon', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let pokemonName = 'Bulbasaur'
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'alexisarte', password: '1234' })
            .end((err, res) => {
                let token = res.body.token;
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .post('/teams/pokemons')
                    .send({ name: pokemonName })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // tiene equipo con Charizard y Blastoise
                                // {trainer: 'alexisarte', team: [pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'alexisarte');
                                chai.assert.equal(res.body.team.length, team.length - 1);
                                done();
                            });
                    });
            });
    });

    it('should not be able to add pokemon if you already 6', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let team = [
            { name: 'Charizard' },
            { name: 'Blastoise' },
            { name: 'Venusaur' },
            { name: 'Charmeleon' },
            { name: 'Wartortle' },
            { name: 'Squirtle' }
        ]
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
                    .send({ team: team })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .post('/teams/pokemons')
                            .send({ name: "Vibraba" })
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                            
                            });
                    });
            });
    });

    after((done) => {
        usersController.cleanUpUsers()
        done();
    });
});
