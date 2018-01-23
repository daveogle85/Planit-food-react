const queryDB = require('../services/db').queryDB;
const to = require('../utils/to').to;
const dbError = require('../services/db').dbError;
// const winston = require("../services/logger");

const addRecipe = (recipeName, url) => ({
    sql: `INSERT INTO Recipes(recipeName${url ? ', url' : ''}) VALUES(?${url ? ', ?' : ''});`,
    values: [recipeName, url]
});

const deleteRecipe = (recipeID) => ({
    sql: 'DELETE FROM Recipes WHERE idRecipes=?;',
    values: [recipeID]
});

const getAllRecipes = {
    sql: 'SELECT * FROM Recipes;',
    values: null
};

/**
 * Recipe graphql reducer
 * @param {*} args 
 * @param {*} context 
 * @param {*} obj 
 */
const createRecipe = (args) => {
    console.log(args);
    return [{
        idRecipes: 1,
        recipeName: 'test',
        url: ''
    }];
};

const getRecipes = async(args) => {
    if (args.name) {
        return console.log(args.name);
    }
    if (args.nameContains) {
        return console.log(args.nameContains);
    }
    const [err, results] = await to(queryDB(getAllRecipes));
    return err ? dbError(err, null) : transformRespones(results[0]);
};

function transformRespones(response) {
    if (!response || !response.results) {
        return null;
    }
    return response.results.map((recipe) => ({
        idRecipes: recipe.idRecipes,
        recipeName: recipe.recipeName,
        url: recipe.url
    }));
}

module.exports = {
    createRecipe,
    addRecipe,
    deleteRecipe,
    getRecipes
};