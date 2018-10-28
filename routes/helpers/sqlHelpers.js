const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pwd',
  database: 'twitter_graphql'
});
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
