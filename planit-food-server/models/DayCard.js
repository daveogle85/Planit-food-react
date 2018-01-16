const moment = require('moment');
const queryDB = require('../services/db').queryDB;
const winston = require("../services/logger");

const getAllDayCards = {
    sql: 'SELECT * FROM DayCard'
};

const dayCards = (args, context, obj) => {
    if (args.id) {
        return mockData.filter((d) => d.id === args.id);
    } else if (args.startDate || args.endDate) {
        return filterByDate(args.startDate, args.endDate, mockData);
    }
    return queryDB(getAllDayCards, null).then((res) => {
        return res.results.map((r) => r);
    }).catch((err) => {
        winston.error(err);
    });
};


/**
 * Filter a list of meals by the start and end dates inclusive
 * @param {*} sDate 
 * @param {*} eDate 
 * @param {*} mockData 
 */
function filterByDate(sDate, eDate, mockData) {
    const start = sDate ? moment(sDate) : null;
    const end = eDate ? moment(eDate) : null;
    return mockData.map((meal) => {
        const mealDate = moment(meal.meal_date);
        if (
            ((start && end) && mealDate.isSameOrAfter(start) && mealDate.isSameOrBefore(end)) ||
            ((start && !end) && mealDate.isSameOrAfter(start)) ||
            ((end && !start) && mealDate.isSameOrBefore(end))
        ) {
            return meal;
        }
    });
}

module.exports = dayCards;