const moment = require('moment');
const queryDB = require('../services/db').queryDB;
const dbError = require('../services/db').dbError;
// const winston = require('../services/logger');
const recipeQuery = require('./Recipe');
const to = require('../utils/to').to;

/***************************************************/
/*                       SQL                       */
/***************************************************/

const getQuery = (query) =>
    'SELECT * FROM DayCard_has_Recipes' +
    ' JOIN DayCard ON DayCard_has_Recipes.DayCard_idDayCard = idDayCard' +
    ` JOIN Recipes ON DayCard_has_Recipes.Recipes_idRecipes = idRecipes ${query ? query : ''};`;

const getAllDayCards = {
    sql: getQuery(),
    values: null
};

const getDayCardRange = (startDate, endDate) => ({
    sql: getQuery('WHERE DATE(`date`) BETWEEN ? AND ?'),
    values: [startDate, endDate]
});

const getDayCardById = (id) => ({
    sql: getQuery('WHERE idDayCard=?'),
    values: [id]
});

const mapRecipeToCard = (cardID) => ({
    sql: 'INSERT INTO DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(?, LAST_INSERT_ID());',
    values: [cardID]
});

const removeMappingFromCard = (cardID, recipeID) => ({
    sql: 'DELETE FROM DayCard_has_Recipes WHERE DayCard_idDayCard=? AND Recipes_idRecipes=?;',
    values: [cardID, recipeID]
});

/***************************************************/
/*                     Reducers                    */
/***************************************************/

const getDayCards = async(args) => {
    if (args.idDayCard) {
        const [err, results] = await to(queryDB(getDayCardById(args.idDayCard)));
        return err ? dbError(err, null) : transformResponse(results[0]);
    } else if (args.startDate || args.endDate) {
        return filterByDate(args.startDate, args.endDate);
    }
    const [err, results] = await to(queryDB(getAllDayCards));
    return err ? dbError(err, null) : transformResponse(results[0]);
};

const addRecipeToCard = async(args) => {
    if (args.newRecipe && args.idDayCard) {
        const [err, results] = await to(queryDB([
            recipeQuery.addRecipe(args.newRecipe.recipeName, args.newRecipe.url),
            mapRecipeToCard(args.idDayCard),
            getDayCardById(args.idDayCard)
        ]));
        return err ? dbError(err, null) : transformResponse(results[2])[0];
    }
};

const removeRecipeFromCard = async(args) => {
    if (args.idRecipe && args.idDayCard) {
        const [err, ] = await to(queryDB(removeMappingFromCard(args.idDayCard, args.idRecipe)));
        return err ? dbError(err, false) : true;
    }
};

/**
 * Transform the db object to the required graphql object
 */
function transformResponse(response) {
    if (!response || !response.results) {
        return null;
    }
    const dayCards = [];
    response.results.forEach((dayCard) => {
        const foundCard = dayCards.find((c) => c.idDayCard === dayCard.idDayCard);
        if (foundCard) {
            foundCard.recipes.push({
                idRecipes: dayCard.idRecipes,
                recipeName: dayCard.recipeName,
                url: dayCard.url
            });
        } else {
            dayCards.push({
                idDayCard: dayCard.idDayCard,
                date: dayCard.date,
                mealTimeCode: dayCard.mealTimeCode,
                recipes: [{
                    idRecipes: dayCard.idRecipes,
                    recipeName: dayCard.recipeName,
                    url: dayCard.url
                }]
            });
        }
    });
    return dayCards;
}

/**
 * Filter a list of meals by the start and end dates inclusive
 * @param {*} sDate 
 * @param {*} eDate 
 * @param {*} mockData 
 */
async function filterByDate(sDate, eDate) {
    const DATE_FORMAT = 'YYYY-MM-DD';
    const start = sDate ? moment(sDate).format(DATE_FORMAT) : null;
    const end = eDate ? moment(eDate).format(DATE_FORMAT) : null;
    if (start && end) {
        const [err, result] = await to(queryDB(getDayCardRange(start, end)));
        return err ? dbError(err, null) : transformResponse(result[0]);
    }
    // TODO handle just start and just end
}

module.exports = {
    getDayCards,
    addRecipeToCard,
    removeRecipeFromCard,
    transformResponse
};