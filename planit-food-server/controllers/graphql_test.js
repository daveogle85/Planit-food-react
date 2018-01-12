const express = require("express");
const router = express.Router();
const wallViewModel = require("../models/wallViewModel");
const auth = require("../middleware/auth");
const winston = require("../services/logger");
const wsModel = require("../models/websocketModel");

const graphqlHTTP = require('express-graphql');
const { schema } = require("../schemas/Graphql_test");
const { root } = require("../models/graphql_testModel");

router.use("/", graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

module.exports = router;