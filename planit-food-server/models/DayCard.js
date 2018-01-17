const moment = require('moment');
const queryDB = require('../services/db').queryDB;
const winston = require("../services/logger");

const getAllDayCards = {
    sql: 'SELECT * FROM DayCard',
    values: null
};

const getDayCardRange = (startDate, endDate) => ({
    sql: 'SELECT * FROM DayCard WHERE DATE(meal_date) BETWEEN ? AND ?',
    values: [startDate, endDate]
});

const getDayCardById = (id) => ({
    sql: 'SELECT * FROM DayCard WHERE daycard_id=?',
    values: [id]
});

const dayCards = (args, context, obj) => {
    if (args.id) {
        return queryDB(getDayCardById).then((res) => {
            return res.results.map((r) => r);
        }).catch((err) => {
            winston.error(err);
        });
    } else if (args.startDate || args.endDate) {
        return filterByDate(args.startDate, args.endDate);
    }
    return queryDB(getAllDayCards).then((res) => {
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