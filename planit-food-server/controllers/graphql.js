const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const graphqlHTTP = require('express-graphql');
const {
    buildSchema
} = require('graphql');
const dayCardModel = require('../models/DayCard');
const recipesModel = require('../models/Recipe');
const recipeSchema = require('../schemas/Recipe');
const dayCardSchema = require('../schemas/DayCard');
const scalarTypesSchema = require('../schemas/Types');


function getInputs() {
    let inputs = '';
    return inputs.concat(recipeSchema.recipeInput);
}

function getTypes() {
    let types = '';
    return types.concat(
        dayCardSchema.dayCardSchema,
        recipeSchema.recipeSchema);
}

function getQueries() {
    let queries = 'type Query {';
    return queries.concat(
        dayCardSchema.dayCardQuery,
        recipeSchema.recipeQuery,
        '}');
}

function getMutators() {
    let mutators = 'type Mutation {';
    return mutators.concat(
        dayCardSchema.dayCardMutators,
        recipeSchema.recipeMutators,
        '}');
}

/**
 * Concat all the schemas into a single schema.
 */
function generateSchema() {
    let schema = '';
    return buildSchema(schema.concat(
        scalarTypesSchema,
        getInputs(),
        getTypes(),
        getQueries(),
        getMutators()
    ));
}

// The root provides a resolver function for each API endpoint
const root = {
    getDayCards: dayCardModel.getDayCards,
    addRecipeToCard: dayCardModel.addRecipeToCard,
    removeRecipeFromCard: dayCardModel.removeRecipeFromCard,
    addDayCard: dayCardModel.addDayCard,
    createRecipe: recipesModel.createRecipe
};

router.use('/', graphqlHTTP({
    schema: generateSchema(),
    rootValue: root,
    graphiql: true
}));

module.exports = router;