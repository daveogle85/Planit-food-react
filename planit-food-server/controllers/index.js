var router = require("express").Router();
var auth = require("./auth");
var graphql = require('./graphql');

router.use("/graphql", graphql);

module.exports = router;
