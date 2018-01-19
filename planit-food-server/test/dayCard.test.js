const assert = require('assert');
const transformResponse = require('../models/DayCard').transformResponse;

describe('DayCard', function () {

    beforeEach(function () {

    });

    describe('TransformResponse', function () {
        it('should handle a null result set', function () {
            const response = {
                results: null
            };
            var result = transformResponse(response);
            assert.strictEqual(result, null);
        });

        it('should handle an empty result set', function () {
            const response = {
                results: []
            };
            var result = transformResponse(response);
            assert.deepEqual(result, []);
        });

        it('should handle an result set with one dayCard', function () {
            const response = {
                results: [{
                    DayCard_idDayCard: 3,
                    Recipes_idRecipes: 1,
                    idDayCard: 3,
                    date: '2018-01-12 T00: 00: 00.000 Z',
                    mealTimeCode: null,
                    idRecipes: 1,
                    recipeName: 'meal4',
                    CookBooks_idCookBooks: null,
                    pageNumber: null,
                    url: null
                }]
            };
            var expectedResult = [{
                idDayCard: 3,
                date: '2018-01-12 T00: 00: 00.000 Z',
                mealTimeCode: null,
                recipes: [{
                    idRecipes: 1,
                    recipeName: 'meal4',
                    url: null
                }]
            }];
            var result = transformResponse(response);
            assert.deepEqual(result, expectedResult);
        });

        it('should handle an result set with multiple dayCards', function () {
            const response = {
                results: [{
                    DayCard_idDayCard: 3,
                    Recipes_idRecipes: 1,
                    idDayCard: 3,
                    date: '2018-01-12 T00: 00: 00.000 Z',
                    mealTimeCode: null,
                    idRecipes: 1,
                    recipeName: 'meal1',
                    CookBooks_idCookBooks: null,
                    pageNumber: null,
                    url: null
                }, {
                    DayCard_idDayCard: 3,
                    Recipes_idRecipes: 2,
                    idDayCard: 3,
                    date: '2018-01-12 T00: 00: 00.000 Z',
                    mealTimeCode: null,
                    idRecipes: 2,
                    recipeName: 'meal2',
                    CookBooks_idCookBooks: null,
                    pageNumber: null,
                    url: null
                }, {
                    DayCard_idDayCard: 1,
                    Recipes_idRecipes: 1,
                    idDayCard: 1,
                    date: '2018-01-12 T00: 00: 00.000 Z',
                    mealTimeCode: null,
                    idRecipes: 1,
                    recipeName: 'meal1',
                    CookBooks_idCookBooks: null,
                    pageNumber: null,
                    url: null
                }]
            };
            var expectedResult = [{
                idDayCard: 3,
                date: '2018-01-12 T00: 00: 00.000 Z',
                mealTimeCode: null,
                recipes: [{
                    idRecipes: 1,
                    recipeName: 'meal1',
                    url: null
                }, {
                    idRecipes: 2,
                    recipeName: 'meal2',
                    url: null
                }]
            }, {
                idDayCard: 1,
                date: '2018-01-12 T00: 00: 00.000 Z',
                mealTimeCode: null,
                recipes: [{
                    idRecipes: 1,
                    recipeName: 'meal1',
                    url: null
                }]
            }];
            var result = transformResponse(response);
            assert.deepEqual(result, expectedResult);
        });
    });
});