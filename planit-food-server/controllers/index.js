var router = require("express").Router();
var auth = require("./auth");

var dayCard = require('./dayCard');
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

router.use("/dayCard", dayCard);
module.exports = router;
