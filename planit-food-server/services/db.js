const winston = require("./logger");
const mysql = require('mysql');
require('dotenv').load();

// Build the connection string
const localDbURI = 'mongodb://localhost:27017';
const url = process.env.DB_URI || localDbURI;

var state = {
  db: null,
};

exports.connect = function (done) {
  if (state.db) {
    return done();
  }
  winston.info("connecting to " + url + '...');
  console.log("connecting to " + url + '...');
  state.db = mysql.createPool({
    connectionLimit: 10,
    host: url,
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'plainitfood-db'
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