var express = require("express");
var cookieParser = require("cookie-parser");
// var bodyParser = require("body-parser");
var db = require("./services/db");
var session = require("express-session");
var winston = require("./services/logger");
var ws = require("./services/ws");
var cors = require('cors');

module.exports = function(port, callback, rootUrl) {

    winston.info("Setting up server");

    if (!rootUrl) {
        rootUrl = "http://localhost:3001";
        //rootUrl = "http://planitfood.net";
    }

    var app = express();
    // Set up paths
    // app.use("/", express.static(__dirname + "/../client/public"));
    // app.use("/lib", express.static(__dirname + "/../node_modules"));
    // app.use("/img", express.static(__dirname + "/../images"));
    // app.use("/login", express.static(__dirname + "/../client/index.html"));

    var server = ws.init(app);
    app.use(cookieParser());
    // app.use(bodyParser.json());
    app.use(session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    }));
    app.use(cors());
    app.use(require("./controllers"));

    // Connect to db
    db.connect(function(err, cb) {
        if (err) {
            //exitServer("Unable to connect to Database.");
            winston.warn("Unable to connect to Database.");
        }
    });

    function exitServer(message) {
        winston.warn("Closing server");
        process.exit(1);
    }

    server = server.listen(port, callback);

    // We manually manage the connections to ensure that they're closed when calling close().
    var connections = [];
    server.on("connection", function(connection) {
        connections.push(connection);
    });

    return {
        close: function(callback) {
            connections.forEach(function(connection) {
                connection.destroy();
            });
            server.close(callback);
        }
    };
};
