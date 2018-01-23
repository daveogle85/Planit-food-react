const moment = require('moment');
const queryDB = require('../services/db').queryDB;
const dbError = require('../services/db').dbError;
const winston = require('../services/logger');
const recipeQuery = require('./Recipe');
const to = require('../utils/to').to;
const startTransaction = require('../services/db').startTransaction;
const query = require('../services/db').query;
const endTransaction = require('../services/db').endTransaction;

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

const addNewDayCard = (idDayCard, date) => {
    return ({
        sql: 'INSERT INTO DayCard(idDayCard, date) Values(?, ?);',
        values: [idDayCard, date]
    });
};

const getDayCardRange = (startDate, endDate) => ({
    sql: getQuery('WHERE DATE(`date`) BETWEEN ? AND ?'),
    values: [startDate, endDate]
});

const getDayCardById = (id) => ({
    sql: getQuery('WHERE idDayCard=?;'),
    values: [id]
});

const getRecipeCountForCard = (cardID) => ({
    sql: 'SELECT COUNT(*) as `Count` FROM DayCard_has_Recipes WHERE DayCard_idDayCard=?;',
    values: [cardID]
});

const mapRecipeToCardWithCardID = (cardID) => ({
    sql: 'INSERT INTO DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(?, LAST_INSERT_ID());',
    values: [cardID]
});

// const getLastUpdatedCard = {
//     sql: 'SELECT idDayCard FROM DayCard WHERE idDayCard=LAST_INSERT_ID();',
//     values: null
// };

const removeMappingFromCard = (cardID, recipeID) => ({
    sql: 'DELETE FROM DayCard_has_Recipes WHERE DayCard_idDayCard=? AND Recipes_idRecipes=?;',
    values: [cardID, recipeID]
});

const deleteDayCard = (cardID) => ({
    sql: 'DELETE FROM DayCard WHERE idDayCard=?;',
    values: [cardID]    
});

/***************************************************/
/*                     Reducers                    */
/***************************************************/

const DATE_ID_FORMAT = 'YYYYMMDD';

const getDayCards = async(args) => {
    if (args.date) {
        const id = getDayCardID(args.date);
        const [err, results] = await to(queryDB(getDayCardById(id)));
        return err ? dbError(err, null) : transformResponse(results[0]);
    } else if (args.startDate || args.endDate) {
        return filterByDate(args.startDate, args.endDate);
    }
    const [err, results] = await to(queryDB(getAllDayCards));
    return err ? dbError(err, null) : transformResponse(results[0]);
};

const addDayCard = async(newRecipe, date, id) => {
    try {
        const connection = await startTransaction();
        const existingdayCard = await query(connection, getDayCardById(id));
        let dayCardID;
        if (existingdayCard.results[0] && existingdayCard.results[0].idDayCard) {
            dayCardID = existingdayCard.results[0].idDayCard;
        } else {
            await query(connection, addNewDayCard(id, date));
            dayCardID = id;
        }
        await query(connection, recipeQuery.addRecipe(newRecipe.recipeName, newRecipe.url));
        await query(connection, mapRecipeToCardWithCardID(dayCardID));
        const dayCardResults = await query(connection, getDayCardById(dayCardID));
        endTransaction(connection);
        return [null, transformResponse(dayCardResults)[0]];
    } catch (e) {
        winston.warn(e);
        return [e, null];
    }
};

const addRecipeToCard = async(args) => {
    if (args.newRecipe && args.date) {
        if (args.idDayCard) {
            const [err, results] = await to(queryDB([
                recipeQuery.addRecipe(args.newRecipe.recipeName, args.newRecipe.url),
                mapRecipeToCardWithCardID(args.idDayCard),
                getDayCardById(args.idDayCard)
            ]));
            return err ? dbError(err, null) : transformResponse(results[2])[0];
        } else {
            const id = getDayCardID(args.date);
            const [err, results] = await addDayCard(args.newRecipe, args.date, id);
            return err ? dbError(err, null) : results;
        }
    }
};

const removeRecipeFromCard = async(args) => {
    if (args.idRecipe && args.date) {
        const cardID = getDayCardID(args.date);
        try {
            const connection = await startTransaction();
            await query(connection, removeMappingFromCard(cardID, args.idRecipe));
            const recipesInCardCount = await query(connection, getRecipeCountForCard(cardID));
            if (recipesInCardCount.results[0].Count === 0) {
                await query(connection, deleteDayCard(cardID));
            }
            endTransaction(connection);
        } catch (e) {
            winston.warn(e);
            return dbError(e, false);
        }
        return true;
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

function getDayCardID(date) {
    return parseInt(moment(date).format(DATE_ID_FORMAT));
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