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

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['View All Employees', 'View All Departments', 'None'],
    },
];

// Initialize the application
function init() {
    inquirer.prompt(questions)
        .then((answer) => {
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

// Function to view all employees
function viewAllEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        if (err) {
            console.error('Error occurred:', err);
            return;
        }
        console.log(results);
    });
}

// Function to view all departments
function viewAllDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        if (err) {
            console.error('Error occurred:', err);
            return;
        }
        console.log(results);
    });
}

init();