const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const usersController = require('./controllers/users');
usersController.registerUser('alexisarte', '1234');

require('./auth')(passport);

const app = express();
//plugin de express para poder los datos json correctamente
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
    // '/' para que se ejecute en la raiz del proyecto
    // req es la request, la peticion
    // res es la respuesta
    res.status(200).send('Hello World!');
});

app.post('/login', (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Mising data' });
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({ message: 'Mising data' });
    }
    //Comprobamos credenciales
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        // Si no son validas, error
        if (err || !result) {
            res.status(401).json({ message: 'Invalid credentials' });
        }
        // Si son validas, generamos un JWT y lo devolvemos
        const token = jwt.sign({ userId: result }, 'secretPassword')
        res.status(200).json(
            { token: token }
        )
    })
});

app.post('/team/pokemons', (req, res) => {
    res.status(200).send('Hello World!');
});

// authenticate => Middelware predefinido de passport
app.get('/team', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).send('Hello World!');
});

app.delete('/team/pokemons  /:pokeid', (req, res) => {
    res.status(200).send('Hello World!');
});

app.put('/team', (req, res) => {
    res.status(200).send('Hello World!');
});

app.listen(port, (req, res) => {
    console.log('Server started at port 3000')
});

exports.app = app;