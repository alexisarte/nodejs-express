const authMiddleware = require('./tools/auth-middleware');
const bodyParser = require('body-parser');

const setupMiddlewares = (app) => {
    //plugin de express para poder procesar los datos json correctamente
    app.use(bodyParser.json());
    authMiddleware.init();
    app.use(authMiddleware.protectWithJwt);
}
exports.setupMiddlewares = setupMiddlewares;