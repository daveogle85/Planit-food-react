const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const winston = require("../services/logger");
const graphqlHTTP = require('express-graphql');
const dayCards = require("../models/DayCard");
var { buildSchema } = require('graphql');

/**
 * Concat all the schemas into a single schema.
 */
function generateSchema() {
    let schema = "";
    let query = "type Query {";
    const scalarTypesSchema = require('../schemas/types');
    const recipe = require('../schemas/Recipe');
    const dayCard = require("../schemas/DayCard");
    query = query.concat(recipe.recipeQuery, dayCard.dayCardQuery, '}');
    return buildSchema(schema.concat(
        scalarTypesSchema,
        query,
        recipe.recipeSchema,
        dayCard.dayCardSchema
    ));
}

// The root provides a resolver function for each API endpoint
const root = {
    DayCards: dayCards
};

router.use("/", graphqlHTTP({
    schema: generateSchema(),
    rootValue: root,
    graphiql: true
}));

module.exports = router;