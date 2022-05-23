const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');

const hashPassword = (clanText, done) => {
    bcrypt.hash(plainTextPwd, 10, done);
}

const comparePassword = (plainPassword, hashPassword, done) => {
    bcrypt.hash(plainTextPwd, hash, done);
}