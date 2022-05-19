const express = require('express');
const passport = require('passport');
require('./auth')(passport);

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // '/' para que se ejecute en la raiz del proyecto
    // req es la request, la peticion
    // res es la respuesta
    res.status(200).send('Hello World!');
});

app.post('/login', (req, res) => {
    //Comprobamos credenciales
    // Si son validas, generamos un JWT y lo devolvemos
    // Sino, error
    res.status(200).json(
        { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o'}
    )
});

app.post('/team/pokemons', (req, res) => {
    res.status(200).send('Hello World!');
});

// authenticate => Middelware predefinido de passport
app.get('/team', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).send('Hello World!');
});

app.delete('/team/pokemons/:pokeid', (req, res) => {
    res.status(200).send('Hello World!');
});

app.put('/team', (req, res) => {
    res.status(200).send('Hello World!');
});

app.listen(port, (req, res) => {
    console.log('Server started at port 3000')
});

exports.app = app;