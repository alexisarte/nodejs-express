const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth')(passport);

// authenticate => Middelware predefinido de passport
router.route('/')
    .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
        res.status(200).send('Hello World!');
    })
    .put((req, res) => {
        res.status(200).send('Hello World!');
    });

router.route('/pokemons')
    .post((req, res) => {
        res.status(200).send('Hello World!');
    });

router.route('/pokemons/:pokeid')
    .delete(() => {
        res.status(200).send('Hello World!');
    });

exports.router = router;
