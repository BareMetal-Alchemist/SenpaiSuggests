const mysql  = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_database'
});

connection.connect((err) => {

    if(err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');

});

connection.query('SELECT * FROM user_table', (error, results, fields) => {
    if (error) throw error;
    console.log(results); // Results from the database
  });
  





