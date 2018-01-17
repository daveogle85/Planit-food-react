const winston = require("./logger");
const mysql = require('mysql');
require('dotenv').load();

// Build the connection string
const localDbURI = '';
const host = process.env.DB_URI || localDbURI;
const port = process.env.DB_PORT || 3306;
const user = process.env.DB_USER || 'root';
const database = process.env.DB_DATABASE_NAME || 'plainitfood-db';
const connectionLimit = process.env.DB_CONN_LIMIT || 10;

var state = {
  db: null,
};

exports.connect = function (done) {
  if (state.db) {
    return done();
  }
  winston.info("connecting to " + host + '...');
  console.log("connecting to " + host + '...');
  state.db = mysql.createPool({
    connectionLimit,
    host,
    port,
    user,
    password: process.env.MYSQL_PASSWORD,
    database
  });

  //test connection
  state.db.getConnection(function (err, connection) {
    if (connection) {
      connection.release();
    }
    return done(err, 'connection');
  });
};

exports.get = function () {
  return state.db;
};

exports.set = function (db) {
  winston.info("setting database instance");
  state.db = db;
  return;
};

// done = (error, results fields)
exports.queryDB = (args) => {
  if (state.db) {
    var done = new Promise((res, rej) => {
      state.db.getConnection(function (err, connection) {
        // Use the connection
        winston.info('Query Database: ' + args);
        connection.query(args.sql, args.values, function (error, results, fields) {
          // And done with the connection.
          connection.release();
          return error ? rej(error) : res({
            results,
            fields
          });
        });
      });
    });
    return done;
  }
};

exports.close = function (done) {
  if (state.db) {
    winston.info("closing database instance");
    state.db.close(function (err, result) {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};