const axios = require("axios").default;

const teamsController = require("./teams.controller");
const { getUser } = require("../auth/users.controller");

const getTeamFromUser = (req, res, next) => {
    console.log("GET");
    let user = getUser(req.user.userId);
    res.status(200).json({
        trainer: user.userName,
        team: teamsController.getTeamOfUser(req.user.userId),
    });
};

const setTeamFromUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
};

const addPokemonToTeam = (req, res) => {
    let pokemonName = req.body.name;
    console.log("calling pokeapi");
    axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(function (response) {
            // handle success
            let pokemon = {
                name: pokemonName,
                pokedexNumber: response.data.id,
            };
            res.status(201).json(pokemon);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.status(400).json({ message: error });
        })
        .then(function () {
            // always executed
        });
};

const deletePokemonToTeam = (req, res) => {
    teamsController.deletePokemonAt(req.user.userId, req.params.pokeid);
    res.status(200).send();
};

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamFromUser = setTeamFromUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonToTeam = deletePokemonToTeam;