const winston = require('./logger');
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
  winston.info('connecting to ' + host + '...');
  console.log('connecting to ' + host + '...');
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
  winston.info('setting database instance');
  state.db = db;
  return;
};

function query(connection, queryObject) {
  const done = new Promise((res, err) => {
    const query = connection.query(queryObject.sql, queryObject.values, function (error, results, fields) {
      winston.info(query.sql);
      console.log(query.sql);
      if (error) {
        winston.warn(error);
        return connection.rollback(() => {
          err (error);
        });
      }
      res({
        results,
        fields
      });
    }); // end query
  });
  return done;
}

const getConnection = () => {
  return new Promise((res) => {
    state.db.getConnection(function async(err, connection) {
      connection.beginTransaction((err) => res({ connection, err }));
    });
  });
};

/**
 * Queries the database using transactions.
 * @param {*} args a list of, or single query object containing an sql: statement and an 
 * optional values list for use with prepated statements
 */
exports.queryDB = async (args) => {
  // console.log('args: ', args);
  if (state.db) {
    // Begin transaction
    const { connection, err } = await getConnection();
      // Use the connection
    winston.info('Query Database: ' + args);
    if (!Array.isArray(args)) {
      args = [args];
    }
    if (err) {
      return err;
    }
    const queries = args.map(queryObject => query(connection, queryObject));
    const resultsSet = await Promise.all(queries);

    connection.commit(function (err) {
      if (err) {
        return connection.rollback(function () {
          throw (err);
        });
      }
      connection.release();
    });
    return resultsSet;
  }
  winston.error('No database connection!');
  return null;
};

exports.dbError = function (err, returnValue) {
  winston.error(err);
  return returnValue;
};

exports.close = function (done) {
  if (state.db) {
    winston.info('closing database instance');
    state.db.close(function (err) {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};