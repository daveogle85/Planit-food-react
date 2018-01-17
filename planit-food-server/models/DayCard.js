const moment = require('moment');
const queryDB = require('../services/db').queryDB;
const winston = require("../services/logger");

const getQuery = (query) => query +
    ' JOIN DayCard ON DayCard_has_Recipes.DayCard_idDayCard = idDayCard' +
    ' JOIN Recipes ON DayCard_has_Recipes.Recipes_idRecipes = idRecipes;';

const getAllDayCards = {
    sql: getQuery('SELECT * FROM DayCard_has_Recipes'),
    values: null
};

const getDayCardRange = (startDate, endDate) => ({
    sql: getQuery('SELECT * FROM DayCard_has_Recipes WHERE DATE(`date`) BETWEEN ? AND ?'),
    values: [startDate, endDate]
});

const getDayCardById = (id) => ({
    sql: getQuery('SELECT * FROM DayCard_has_Recipes WHERE idDayCard=?'),
    values: [id]
});

/**
 * Day card graphql reducer
 * @param {*} args 
 * @param {*} context 
 * @param {*} obj 
 */
const dayCards = (args, context, obj) => {
    if (args.idDayCard) {
        return queryDB(getDayCardById(args.idDayCard)).then((res) => {
            return transformResponse(res);
        }).catch((err) => {
            winston.error(err);
        });
    } else if (args.startDate || args.endDate) {
        return filterByDate(args.startDate, args.endDate);
    }
    return queryDB(getAllDayCards).then((res) => {
        return transformResponse(res);
    }).catch((err) => {
        winston.error(err);
    });
};

/**
 * Transform the db object to the required graphql object
 */
function transformResponse(response) {
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
            return res.results.map((r) => r);
        }).catch((err) => {
            winston.error(err);
        });
    }
    // TODO handle just start and just end
}

module.exports = dayCards;