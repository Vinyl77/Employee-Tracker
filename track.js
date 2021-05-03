// creating dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { fetchAsyncQuestionPropertyQuestionProperty } = require('inquirer/lib/utils/utils');

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
    console.log(`
    ╔═══╗─────╔╗──────────────╔═╗╔═╗
    ║╔══╝─────║║──────────────║║╚╝║║
    ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
    ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
    ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
    ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
    ───────║║──────╔═╝║─────────────────────╔═╝║
    ───────╚╝──────╚══╝─────────────────────╚══╝`)
    // runs the app
    runOptions();

});
// the app propmts user choices.
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
               'exit'

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
                  updateEmployee();
                  break;
           
            case 'exit':
                  connection.end();
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


// function to select role
// let roleArr =[];
//    const selectRole = ()=>{
//        connection.query('SELECT * FROM role', (err, res)=>{
//            if (err) throw err;
//            for (let i =0; i< res.length; i++){
//                roleArr.push(res[i].title);
//            }
//        })
//        return roleArr;
//    }
// //  function to select manager
//    let managerArray = [];
//      const selectManager = ()=>{
//          connection.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NULL', (err, res)=> {
//              if (err) throw err;
//              for(let i =0; i<res.length; i++){
//                  managerArray.push(res[i].first_name);


//              }

//          })
//          return managerArray;
//      }
// // adding an employee
   
// Add Employee Function
const addEmployee = () =>
inquirer
  .prompt([
    {
      message: 'Enter first name of new employee:',
      type: 'input',
      name: 'employeeFirstName',
    },
    {
      message: 'Enter last name of new employee:',
      type: 'input',
      name: 'employeeLastName',
    },
    {
      message: 'Enter Role ID of new employee:',
      type: 'input',
      name: 'employeeRole',
    },
    {
      message: 'Enter Manager ID of new employee:',
      type: 'input',
      name: 'employeeManagerId',
    },
  ])
  .then(answer => {
    connection.query(
      'INSERT INTO employee SET ?',
      {
        first_name: answer.employeeFirstName,
        last_name: answer.employeeLastName,
        role_id: answer.employeeRole,
        manager_id: answer.employeeManagerId,
      },
      function(err, res) {
        if (err) throw err;
        console.log(
          `You have entered ${answer.employeeFirstName} ${answer.employeeLastName} in the employee database.`
        );
        runOptions();
      }
    );
  });

// Add department Function
const addDepartment = () =>
inquirer
  .prompt([
    {
      type: 'input',
      name: 'deptName',
      message: 'What department would you like to add?',
    },
  ])
  .then(answer => {
    connection.query(
      'INSERT INTO department (name) VALUES (?)',
      answer.deptName,
      function(err, res) {
        if (err) throw err;
        console.log(
          `You have entered ${answer.deptName} into your department database.`
        );
        runOptions()
        
      }
    );
  });

// Add role Function
const addRole = () =>
inquirer
  .prompt([
    {
      type: 'input',
      name: 'addRole',
      message: 'What role would you like to add?',
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'What is the salary for this role?',
    },
    {
      type: 'input',
      name: 'departmentID',
      message: "What is this role's department id?",
    },
  ])
  .then(answer => {
    connection.query(
      'INSERT INTO role SET ?',
      {
        title: answer.addRole,
        salary: answer.roleSalary,
        department_id: answer.departmentID,
      },
      function(err, res) {
        if (err) throw err;
        console.log(
          `You have entered ${answer.addRole} into your role database.`
        );
        runOptions();
      }
    );
  });

// Update Employee Role Function
const updateEmployee = () => {
const employeeArray = [];
const roleArray = [];
connection.query(
  `SELECT CONCAT (employee.first_name, ' ', employee.last_name) as employee FROM employees_db.employee`,
  (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      employeeArray.push(res[i].employee);
    }
    connection.query(
      `SELECT title FROM employees_db.role`,
      (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          roleArray.push(res[i].title);
        }

        inquirer
          .prompt([
            {
              name: 'name',
              type: 'list',
              message: `Who's role would you like to change?`,
              choices: employeeArray,
            },
            {
              name: 'role',
              type: 'list',
              message: 'What would you like to change their role to?',
              choices: roleArray,
            },
          ])
          .then(answers => {
            let currentRole;
            const name = answers.name.split(' ');
            connection.query(
              `SELECT id FROM employees_db.role WHERE title = '${answers.role}'`,
              (err, res) => {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                  currentRole = res[i].id;
                }
                connection.query(
                  `UPDATE employees_db.employee SET role_id = ${currentRole} WHERE first_name= '${name[0]}' AND last_name= '${name[1]}';`,
                  (err, res) => {
                    if (err) throw err;
                    console.log(`You have successfully upated the role.`);
                    runOptions();
                 }
              );
            }
          );
        });
      }
    ); 
   }
  );
};