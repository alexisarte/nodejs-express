const uuid = require('uuid');
const crypto = require('./crypto.js');

const userDatabase = {
    '0001': {
        'password': '',
        'salt': '',
        'userName': ''
    }
};
// userId -> password

const registerUser = (userName, password) => {
    crypto.hashPassword(password, (err, result) => {
        // Guardar en la base de datos nuestro usuario
        userDatabase[uuid.v4()] = {
            userName: userName,
            password: result
        }
    });
}
const checkUserCredentials = (userId, password) => {
    // Comprobar que las credenciales son correctas
    let user = userDatabase[userId];
    crypto.comparePassword(password, user.password, done);
}
