//Definir una estrategia de autenticacion utilizando la libreria passport
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    

//funcion que recibe un parametro passport
module.exports = passport => {
    // config del passport, objeto json
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: 'secret' //TODO deberia estar en una variable de entorno
    }
    //utiliza la estrategia de auteticacion utilizando JWT
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log('decoded jwt', decoded);
        return done(null, decoded);
    }));
}