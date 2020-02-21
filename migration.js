const mysql = require('mysql');
const migration = require('mysql-migrations');

const connection = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodejs_db'
});

function executeQuery(sql, callback) {
    connection.getConnection((err, connection) => {
        if (err) {
            return callback(err, null);
        } else {
            if (connection) {
                connection.query(sql, function (error, results, fields) {
                    connection.release();
                    if (error) {
                        return callback(error, null);
                    }
                    return callback(null, results);
                });
            }
        }
    });
}

function query(sql, callback) {
    executeQuery(sql, function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
}

migration.init(connection, __dirname + '/database/migrations');

module.exports = {
    query: query,
    connection: connection
}
