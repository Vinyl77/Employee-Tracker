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
                  updateEmployee();
                  break;
            case 'Delete an employee':
                  deleteEmployee();
                  break;
            case 'exit':
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

// // allows user to add a new employee to database
// const addEmployee=() =>{
//     inquirer
//         .prompt([
//             {
//                 name: "firstName",
//                 type: "input",
//                 message: "What is the employee's first name?",
//             },
//             {
//                 name: "lastName",
//                 type: "input",
//                 message: "What is the employee's last name?",
//             },
//             {
//                 name: "roleId",
//                 type: "input",
//                 message: "What is this employee's role ID?",
//             },
//             {
//                 name: "managerId",
//                 type: "input",
//                 message: "What is this employee's manager ID?",
//             },
//         ])
//         .then((answer) => {
//             console.log("Adding a new employee...\n");
//             connection.query(
//                 `INSERT INTO employee SET ?`,
//                 {
//                     first_name: answer.firstName,
//                     last_name: answer.lastName,
//                     role_id: answer.roleId,
//                     manager_id: answer.managerId,
//                 },
//                 function (err, res) {
//                     if (err) throw err;
//                     console.log("New role added!\n");
//                     // Call updateProduct AFTER the INSERT completes
//                     runOptions();
//                 }
//             );
//         });
// }

let roleArr =[];
   const selectRole = ()=>{
       connection.query('SELECT * FROM role', (err, res)=>{
           if (err) throw err;
           for (let i =0; i< res.length; i++){
               roleArr.push(res[i].title);
           }
       })
       return roleArr;
   }

   let managerArray = [];
     const selectManager = ()=>{
         connection.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NULL', (err, res)=> {
             if (err) throw err;
             for(let i =0; i<res.length; i++){
                 managerArray.push(res[i].first_name);


             }

         })
         return managerArray;
     }

     const addEmployee = ()=>{
         inquirer
              .prompt ([
             {
                 name: 'firstname',
                 type: 'input',
                 message: 'Enter their first name'

             },
             {
                name: 'lastname',
                type: 'input',
                message: 'Enter their last name'
             },
             {
                name: 'role',
                type: 'list',
                message: 'What is their role?',
                choices: selectRole()
             },
             {
                 name: 'choice',
                 type: 'rawlist',
                 message: 'What is their managers name?',
                 choices: selectManager()
             }
        ])
        .then((val)=>{
            let roleId = selectRole().indexOf(val.role) + 1
            let managerId = selectManager().indexOf(val.choice) + 1

            connection.query('INSERT INTO employee SET?',
            {
                first_name: val.firstName,
                last_name: val.lastName,
                manager_id: managerId,
                role_id: roleId
            }, (err)=>{
                if (err) throw err;
                console.table(val)
                runOptions()
            })

            })

       }
    

    const addDepartment = ()=>{
        inquirer
            .prompt([
                {
                  name: 'name',
                  type: 'input',
                  message: 'What Department would you like to add?'


                }

            ])
            .then((res)=>{
                let query = connection.query(
                    'INSERT INTO department SET?',
                    {
                        name: res.name
                    },
                    (err)=>{
                        if (err) throw err
                        console.table(res);
                        runOptions();
                    }
                )

            })

    }

  const addRole= () =>{
      connection.query('SELECT role.title AS Title, role.salary AS Salary FROM role', (err, res)=>{
          inquirer.prompt ([
              {
                  name: 'Title',
                  type: 'input',
                  message: 'What is the roles Title?'

              },
              {
                  name: 'Salary',
                  type: 'input',
                  message: 'What is the Salary'

              }
          ]).then((res)=>{
              connection.query(
                  'INSERT INTO role SET?',
                  {
                      title: res.Title,
                      salary: res.Salary,
                  },
                  (err)=>{
                      if (err) throw err
                      console.table(res);
                      runOptions();
                  }
              )
          });
      });

      
  }
const updateEmployee = ()=>{
    inquirer.prompt([
        {
            type: 'input',
            message: 'Which employee would you like to update',
            name: 'roleUpdate'
        },
        {
            type: 'input',
            message: 'What would you like to update?',
            name: 'updateEmployee'
        }
    ]).then((answer)=>{
        connection.query('UPDATE employee SET role_id=? WHERE first_name=?',[answer.updateEmployee, answer.roleUpdate],(err, res)=>{
            if (err) throw err;
            console.table(res);
            runOptions();

        });
    });
}

const deleteEmployee=()=>{

}
    