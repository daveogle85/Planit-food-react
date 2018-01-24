const queryDB = require('../services/db').queryDB;
const to = require('../utils/to').to;
const dbError = require('../services/db').dbError;
// const winston = require("../services/logger");

const getQuery = (query) =>
    'SELECT * FROM Tags_has_Recipes' +
    ' JOIN Tags ON Tags_has_Recipes.Tags_idTags = idTags' +
    ` JOIN Recipes ON Tags_has_Recipes.Recipes_idRecipes = idRecipes ${query ? query : ''};`;

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

const getRecipesContains = (contains) => ({
    sql: 'SELECT * FROM Recipes WHERE recipeName LIKE ?',
    values: [`%${contains}%`]
});

const getTagsForRecipesQuery = (ids) => {
    let sqlValues = '';
    ids.forEach((id, i) => {
        sqlValues = sqlValues.concat(i === ids.length - 1 ?
            id : `${id}, `);
    });
    return ({
        sql: getQuery(`WHERE idRecipes IN (${sqlValues})`),
        values: ids
    });
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

const getRecipes = async (args) => {
    let [err, recipes] = [null, null];
    if (args.name) {
        return console.log(args.name);
    }
    if (args.nameContains) {
        [err, recipes] = await to(queryDB(getRecipesContains(args.nameContains)));
    } else {
        [err, recipes] = await to(queryDB(getAllRecipes));
    }    
    if (err) {
        return dbError(err, null);
    }
    const [errTags, results] = await to(getTagsForRecipes(transformRespones(recipes[0])));
    return errTags ? dbError(errTags, null) : results;
};

const getTagsForRecipes = async(recipes) => {
    const ids = recipes.map((r) => r.idRecipes);
    const tags = await queryDB(getTagsForRecipesQuery(ids));
    return appendTagsToRecipes(recipes, tags[0].results);
};

function appendTagsToRecipes(recipes, tags) {
    tags.forEach((tag) => {
        const recipe = recipes.find((r) => r.idRecipes === tag.idRecipes);
        if (recipe && recipe.tags) {
            recipe.tags.push(tag);
        } else if (recipe) {
            recipe.tags = [tag];
        }
    });
    return recipes;
}

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