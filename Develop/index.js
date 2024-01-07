// DEPENDENCIES _______________________________________

    const inquirer = require('inquirer');
    // const mysql = require('mysql2');
    const db = require('./config/connection');
    require('console.table'); // to printout that looks like mysql


// MAIN PROMPT QUESTIONS __________________________________
    const questions = [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: [
                'View All Departments', 
                'View All Employees', 
                'View All Roles',
                'Add Deparment',
                'Add Employee',
                'Add Role',
                'Update Employee Role',
                'None',
            ],
        },
    ];

// FUNCTIONS _________________________________________________

    //Initilize Function ----------------------------------

        function init() {
            inquirer.prompt(questions)
                .then((answer) => {

                    switch (answer.action) {
                        case 'View All Departments':
                            viewAllDepartments();
                            break;
                        case 'View All Employees':
                            viewAllEmployees();
                            break;
                        case 'View All Roles':
                            viewAllRoles();
                            break;
                        case 'Add Deparment':
                            addDepartment();
                            break;
                        case 'Add Employee':
                            addEmployee();
                            break;
                        case 'Add Role':
                            addRole();
                            break;
                        case 'Update Employee Role':
                            updateEmployeeRole();
                            break;
                        
                        default:
                            console.log('No action selected');
                    }
                })
                .catch((error) => {
                    console.error('Error occurred:', error);
                });
            
        };


    // View  All Department Function ------------------------------
    
        function viewAllDepartments() {
            const query = `SELECT name FROM departments`;
            db.query(query, function (err, results) {
                if (err) {
                    console.error('Error occurred:', err);
                    return;
                }

                console.table(results);
                process.exit(0);

            });
            
        }

    // View All Employees Function -----------------------

        function viewAllEmployees() {
            const query = `SELECT * FROM employees`;
            db.query(query, function (err, results) {
                if (err) {
                    console.error('Error occurred:', err);
                    return;
                }
                console.table(results);
                process.exit(0);
                
            });
            
        }

    // View All Roles Function -----------------------

        function viewAllRoles() {
            db.query('SELECT * FROM roles', function (err, results) {
                if (err) {
                    console.error('Error occurred:', err);
                    return;
                }
                console.table(results);
                process.exit(0);
            });
        }

    // Add Department Function -----------------------

        function addDepartment() {

        //     db.query('UPDATE * FROM departments', function (err, results) {
        //         if (err) {
        //             console.error('Error occurred:', err);
        //             return;
        //         }
        //         console.table(results);
        //         process.exit(0);
        //     });
        // }


            // db.promise().query('SELECT * FROM departments')
            // .then( ([rows,fields]) => {
            //   console.log(rows);
            // })
            // .catch(console.log)
            // .then( () => db.end());

        }


    // Add Employee Function -----------------------


        function addEmployee() {
            // Assuming you have roles and managers in your database
            // You might need to fetch these lists from your database first
            const roleChoices = ['first_name', 'last_name']; // Replace with actual roles
            const managerChoices = ['Manager 1', 'Manager 2', 'None']; // Replace with actual managers

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "What is the employee's first name?",
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "What is the employee's last name?",
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roleChoices,
                },
                // {
                //     type: 'list',
                //     name: 'manager',
                //     message: "Who is the employee's manager?",
                //     choices: managerChoices,
                // }
            ]).then((answers) => {
                // Insert the new employee into the database
                const { firstName, lastName, role, manager } = answers;

                // Prepare your SQL query based on your database schema
                // Here's an example assuming you have a table `employees`
                // with columns `first_name`, `last_name`, `role_id`, and `manager_id`
                // Replace '1' and '2' with actual role_id and manager_id based on user selection

                // const query = `
                //     INSERT INTO employees (first_name, last_name, role_id, manager_id)
                //     VALUES (?, ?, ?, ?)
                // `;
                const query = `
                    INSERT INTO employees (first_name, last_name)
                    VALUES (?, ?)    
                `;

                // db.query(query, [firstName, lastName, 1 /* role id */, 2 /* manager id */], (err, results) => {
                    db.query(query, [firstName, lastName], (err, results) => {
                    
                    if (err) {
                        console.error('Error occurred:', err);
                        return;
                    }
                    console.log('Employee added successfully!');
                    process.exit(0);
                });
            }).catch((error) => {
                console.error('Error occurred:', error);
            });
        }


    // Add Role Function -----------------------

        function addRole() {}


    // Update Employee Role Function -----------------------

       function updateEmployeeRole() {}
       
    //______________________________________
       
       

// INITIALIZE _________________________

    init();
//______________________________________