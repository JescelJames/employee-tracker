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
        name: 'license',
        choices: ['View All Employees', 'None'],
        },
    ];

function init() {
    inquirer.prompt (questions)

    .then(() => {
       db.query('SELECT * FROM departments', function (err, results) {
                 console.log(results);
               });
        
        
        
      
      
      
        // console.log(answer);

    })
    
};

init();
