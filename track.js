const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { formatWithOptions } = require('node:util');
// create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Walters77!',
    database: 'employees_db'



})

connection.connect((err) => {
    if (err) throw err;
    runOptions();

});

const runOptions = () => {
    inquirer
       .prompt({
           name: 'action',
           type: 'list',
           


       })
}