const mysql = require('mysql');
const dbData = require("../../db/db-conf.json");
const connection = mysql.createConnection(dbData);
connection.connect();

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, function (err, rows, fields) {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
}

module.exports = { executeQuery };
