// DEPENDENCIES _______________________________________

    const inquirer = require('inquirer');
    const mysql = require('mysql2');


// CONNECT TO DATABASE ___________________________________    

    // Connect to database
    const db = mysql.createConnection(
        {
            host: 'localhost',
            // MySQL username,
            user: 'root',
            // MySQL password
            password: 'Jimmy777$!',
            database: 'employee_tracker_db'
        },
        console.log(`Connected to the employee_tracker_db database.`)
        );

        
        // db.query('SELECT * FROM departments', function (err, results) {
        //     console.log(results);
        //     });

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
            db.query('SELECT * FROM departments', function (err, results) {
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
            db.query('SELECT * FROM employees', function (err, results) {
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

        function addDepartment() {}


    // Add Employee Function -----------------------

        function addEmployee() {}


    // Add Role Function -----------------------

        function addRole() {}


    // Update Employee Role Function -----------------------

       function updateEmployeeRole() {}
       
    //______________________________________
       
       

// INITIALIZE _________________________

    init();
//______________________________________