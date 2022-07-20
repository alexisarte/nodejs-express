const mongoose = require('mongoose');
const { to } = require('../tools/to');
const TeamsModel = mongoose.model('TeamsModel',
    { userId: String, team: [] });

const cleanUpTeam = () => {
    return new Promise(async (resolve, reject) => {
        await TeamsModel.deleteMany({}).exec();
        resolve();
    });
}

const bootstrapTeam = (userId) => {
    return new Promise(async (resolve, reject) => {
        let newTeam = new TeamsModel({ userId: userId, team: [] });
        await newTeam.save();
        resolve();
    });
}

const getTeamOfUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let [err, team] = await to(TeamsModel.findOne({ userId: userId }).exec());
        if (err) {
            return reject(err);
        }
        resolve(team || []);
    });
}

const addPokemon = (userId, pokemon) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbteam] = await to(TeamsModel.findOne({ userId: userId }).exec());
        if (err) {
            return reject(err);
        }
        if (dbteam.team.length == 6) {
            reject('Already have 6 pokemon');
        } else {
            dbteam.team.push(pokemon);
            await team.save();
            resolve();
        }
    });
}

const deletePokemonAt = (userId, index) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbteam] = await to(TeamsModel.findOne({ userId: userId }).exec());
        if (err) {
            return reject(err);
        }
        if (dbteam.team[index]) {
            dbteam.team.splice(index, 1);
        }
        await dbteam.save()
        resolve();
    });
}

const setTeam = (userId, team) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbteam] = await to(TeamsModel.findOne({ userId: userId }).exec());
        if (err) {
            return reject(err);
        }
        dbteam.team = team;
        await dbteam.save()
        resolve();
    });
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemonAt = deletePokemonAt;
