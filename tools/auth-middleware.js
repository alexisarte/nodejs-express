//Definir una estrategia de autenticacion utilizando la libreria passport
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const init = () => {
    // config del passport, objeto json
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: 'secretPassword' //TODO deberia estar en una variable de entorno
    }
    //utiliza la estrategia de auteticacion utilizando JWT
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        return done(null, decoded);
    }));
}

const protectWithJwt = (req, res, next) => {
    if (req.path == '/' || req.path == '/auth/login') {
        return next();
    }
    return passport.authenticate('jwt', { session: false })(req, res, next);
}

exports.init = init;
exports.protectWithJwt = protectWithJwt;