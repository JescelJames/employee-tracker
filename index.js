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
                'View All Employees', 
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments', 
                'None'
            ],
        },
    ];

// FUNCTIONS _________________________________________________

    //Initilize Function ----------------------------------

        function init() {
            inquirer.prompt(questions)
                .then((answer) => {


                    for (const [key, value] of Object.entries(answer)) {
                        // Print each key-value pair in a user-friendly format
                        console.log(`${key}: ${value}`);
                    }


                    switch (answer.action) {
                        case 'View All Employees':
                            viewAllEmployees();
                            break;
                        case 'View All Departments':
                            viewAllDepartments();
                            break;
                        default:
                            console.log('No action selected');
                    }
                })
                .catch((error) => {
                    console.error('Error occurred:', error);
                });
            
        };



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

    // View  All Department Function ------------------------------
    
        function viewAllDepartments() {
            db.query('SELECT * FROM departments', function (err, results) {
                if (err) {
                    console.error('Error occurred:', err);
                    return;
                }
                console.table(results);
            });
        }

// INITIALIZE _________________________

    init();
//______________________________________