// const queryDB = require('../services/db').queryDB;
// const winston = require("../services/logger");

const addRecipe = (recipeName, url) => ({
    sql: `INSERT INTO Recipes(recipeName${url ? ', url' : ''}) VALUES(?${url ? ', ?' : ''});`,
    values: [recipeName, url]
});

const deleteRecipe = (recipeID) => ({
    sql: 'DELETE FROM Recipes WHERE idRecipes=?;',
    values: [recipeID]
});

/**
 * Recipe graphql reducer
 * @param {*} args 
 * @param {*} context 
 * @param {*} obj 
 */
const createRecipe = (args, context, obj) => {
    console.log(args);
    return [{
        idRecipes: 1,
        recipeName: 'test',
        url: ''
    }];
};

module.exports = {
    createRecipe,
    addRecipe,
    deleteRecipe
};