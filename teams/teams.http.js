const axios = require("axios").default;

const teamsController = require("./teams.controller");
const { getUser } = require("../auth/users.controller");

const getTeamFromUser = async (req, res) => {
    let user = getUser(req.user.userId);
    let team = await teamsController.getTeamOfUser(user.userId);
    res.status(200).json({
        trainer: user.userName,
        team: team
    });
};

const setTeamFromUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
};

const addPokemonToTeam = async (req, res) => {
    let pokemonName = req.body.name;
    let pokeApiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    let pokemon = {
        name: pokemonName,
        pokedexNumber: pokeApiResponse.data.id,
    };
    try {
        await teamsController.addPokemonToTeam(req.user.userId, pokemon);
        return res.status(201).send();
    } catch (error) {
        return res.status(400).send({message: "You have already 6 pokemon"});
    }
};

const deletePokemonToTeam = (req, res) => {
    teamsController.deletePokemonAt(req.user.userId, req.params.pokeid);
    res.status(200).send();
};

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamFromUser = setTeamFromUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonToTeam = deletePokemonToTeam;