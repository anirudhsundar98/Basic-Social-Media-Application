const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'YOUR_HOST',
  user: 'YOUR_USER',
  password: 'PASSWORD',
  database: 'YOUR_DATABASE'
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
