const moment = require('moment');
const queryDB = require('../services/db').queryDB;
const winston = require("../services/logger");
const addRecipe = require('./Recipe').addRecipe;

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
    sql: `INSERT INTO DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(?, LAST_INSERT_ID());`,
    values: [cardID]
});

/**
 * Day card graphql reducer
 * @param {*} args 
 * @param {*} context 
 * @param {*} obj 
 */
const getDayCards = (args, context, obj) => {
    if (args.idDayCard) {
        return queryDB(getDayCardById(args.idDayCard)).then((res) => {
            return transformResponse(res[0]);
        }).catch((err) => {
            winston.error(err);
        });
    } else if (args.startDate || args.endDate) {
        return filterByDate(args.startDate, args.endDate);
    }
    return queryDB(getAllDayCards).then((res) => {
        return transformResponse(res[0]);
    }).catch((err) => winston.error(err));
};

const addRecipeToCard = (args, context, obj) => {
    if (args.newRecipe && args.idDayCard) {
        return queryDB([
            addRecipe(args.newRecipe.recipeName, args.newRecipe.url),
            mapRecipeToCard(args.idDayCard),
            getDayCardById(args.idDayCard)
        ]).then((res) => {
            if (res.length === 3) {
                return transformResponse(res[2])[0];
            }
        }).catch((err) => winston.error(err));
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
function filterByDate(sDate, eDate) {
    const DATE_FORMAT = 'YYYY-MM-DD';
    const start = sDate ? moment(sDate).format(DATE_FORMAT) : null;
    const end = eDate ? moment(eDate).format(DATE_FORMAT) : null;
    if (start && end) {
        return queryDB(getDayCardRange(start, end)).then((res) => {
            return transformResponse(res[0]);
        }).catch((err) => {
            winston.error(err);
        });
    }
    // TODO handle just start and just end
}

module.exports = {
    getDayCards,
    addRecipeToCard,
    transformResponse
};