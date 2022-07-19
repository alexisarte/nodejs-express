const express = require('express');
const router = express.Router();
const authHttpHandler = require('./auth.http');

// Controllers
const usersController = require('./users.controller');
usersController.registerUser('alexisarte', '1234');
usersController.registerUser('mikelarte', '1234');

// Ruta como una entidad y despues las operaciones
router.route('/')
    .get((req, res) => {
        res.send('GET Auth router');
    })
    .post((req, res) => {
        res.send('POST Auth router');
    })

router.route('/login')
    .post(authHttpHandler.loginUser);

exports.router = router;
