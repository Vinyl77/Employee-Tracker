const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

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
           message: 'Welcome to our employee database! What would you like to do?',
           choices: [
               'View all employees',
               'View all departments',
               'View all roles',
               'Add an employee',
               'Add a department',
               'Add a role',
               'Update employee role',
               'Delete an employee',
               'EXIT'

              ]
      })
      .then((answer)=>{
          switch (answer.action){
              case 'View all employees':
                  viewEmployees();
                  break;
              case 'View all departments':
                  viewDepartments();
                  break;
             case 'View all roles':
                   viewRoles();
                   break;
             case 'Add an employee':
                   addEmployee();
                   break;
             case 'Add a department':
                  addDepartment();
                  break;
            case 'Add a role':
                  addRole();
                  break;
            case 'Update employee role':
                  updateRole();
                  break;
            case 'Delete an employee':
                  deleteEmployee();
                  break;
            case 'EXIT':
                  exitApp();
                  break;
            default:
                break;
            
                   

          }

      })
 };
// view all employees in the database
 const viewEmployees = () => {
     let query = 'SELECT * FROM employee';
     connection.query(query, (err, res)=>{
         if (err) throw err;
         console.log(res.length + ' employees found!');
         console.table('All Employees:', res);
         runOptions();

     })

 };
// view all departments in the database
 const viewDepartments = () => {
     let query = 'SELECT * FROM department';
     connection.query(query, (err, res)=>{
         if (err) throw err;
         console.table('All Departments:', res);
         runOptions();
     })
 };
// view all roles in the database
 const viewRoles = () => {
     let query = 'SELECT * FROM role';
     connection.query(query, (err, res)=>{
         if (err) throw err;
         console.table('All Roles:', res);
         runOptions();
     })
 };

const addEmployee =()=>{
    connection.query('SELECT * FROM role', (err, res)=>{
        if (err) throw err;
        inquirer 
           .prompt([
               {
                   name: 'first_name',
                   type: 'input',
                   message: 'What is the employees first name?',

               },
               {
                   name: 'last_name',
                   type: 'input',
                   message: 'What is the employees first name?'

               },
               {
                   name: 'manager_id',
                   type: 'input',
                   message: "What is the employee's manager's ID"
               },
               { 
                   name: 'role',
                   type: 'list',
                   choices: function(){
                       let roleArray = [];
                       for(let i= 0; i < res.length; i++){
                           roleArray.push(res[i].title);
                       }
                       return roleArray;
                   },
               }
           ]).then((answer)=>{
               let roleID;
               for (let j=0; j < res.length; i++){
                   if (res[j].title == answer.role){
                       roleID = res[j].id;
                       console.log(roleID)
                   }
               }
               connection.query(
                   
               )
           })
    })
}