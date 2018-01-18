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
    } else {
      state.db = null;
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

/**
 * Queries the database using transactions.
 * @param {*} args a list of, or single query object containing an sql: statement and an 
 * optional values list for use with prepated statements
 */
exports.queryDB = (args) => {
  if (state.db) {
    var done = new Promise((res, rej) => {
      state.db.getConnection(function (err, connection) {
        // Use the connection
        winston.info('Query Database: ' + args);
        if (!Array.isArray(args)) {
          args = [args];
        }
        // Begin transaction
        connection.beginTransaction((err) => {
          if (err) {
            return err;
          }
          const resultsSet = [];
          args.forEach(queryObject => {

            const query = connection.query(queryObject.sql, queryObject.values, function (error, results, fields) {
              winston.info(query.sql);
              console.log(query.sql);
              if (error) {
                winston.warn(error);
                return connection.rollback(() => {
                  rej(error);
                });
              } else resultsSet.push({
                results,
                fields
              });
            }); // end query

          }); // end loop

          connection.commit(function (err) {
            if (err) {
              return connection.rollback(function () {
                rej(error);
              });
            }
            res(resultsSet);
            connection.release();
          });

        }); // end transaction
      }); // end connection
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