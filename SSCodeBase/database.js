const mysql  = require('mysql2');

const connection = mysql.createConnection({
    socketPath: 'mysql/mysql.sock',
    user: 'root',
    password: 'root',
    database: 'user_db'
});

connection.connect((err) => {

    if(err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');

});

module.exports = connection;




