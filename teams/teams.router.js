const express = require("express");
const router = express.Router();

const teamsHttpHandler = require("./teams.http");

// authenticate => Middelware predefinido de passport
router
    .route("/")
    .get(teamsHttpHandler.getTeamFromUser)
    .put(teamsHttpHandler.setTeamFromUser);

router.route("/pokemons").post(teamsHttpHandler.addPokemonToTeam);

router.route("/pokemons/:pokeid").delete(teamsHttpHandler.deletePokemonToTeam);

exports.router = router;
