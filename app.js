const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

// Routes
const authRoutes = require('./routers/auth').router;
const teamsRoutes = require('./routers/teams').router;

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

app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);

app.listen(port, (req, res) => {
    console.log('Server started at port 3000')
});

exports.app = app;