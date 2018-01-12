var router = require("express").Router();
var auth = require("./auth");
var ws = require("./websocket");

var graphqlTest = require('./graphql_test');
// var admin = require("./admin");
//
// router.use("/api/tracked", trackedItems);
//
// router.use("/api/split", tweetSplit);
//
// router.use("/api/wallView", wallView);
//
// router.use("/api/tweet", users);
//
// router.use("/oauth", auth.router);
//
// router.use("/admin", admin);
//
// ws.init();
//

router.use("/test", graphqlTest);
module.exports = router;
