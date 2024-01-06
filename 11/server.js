// DEPENDENCIES __________________________________________
    
    const express = require('express');
    const inquirer = require('inquirer');
    // Import and require mysql2
    const mysql = require('mysql2');

    // const path =  require('path');
    // const db = require('./db/db.json');
    // const fs = require('fs');
    // // Helper method for generating unique ids
    // const uuid = require('./helpers/uuid');

// APP/PORT ______________________________________________

    const PORT = process.env.PORT || 3001;
    const app = express();


// MIDDLEWARES __________________________________________
    // Express middleware
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    // // static assets
    // app.use(express.static('public'));

    
// CONNECT TO DATABASE ___________________________________    

    // Connect to database
    const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'rootroot',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
    );


// QUERIES ______________________________________________________

    // Hardcoded query: DELETE FROM course_names WHERE id = 3;

    // db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
    // if (err) {
    //     console.log(err);
    // }
    // console.log(result);
    // });

    // Query database
   
    db.query('SELECT * FROM departments', function (err, results) {
    console.log(results);
    });

    db.query('SELECT * FROM roles', function (err, results) {
        console.log(results);
        });

    db.query('SELECT * FROM employees', function (err, results) {
        console.log(results);
        });
    

// ROUTES___________________________________________________________

    app.get('/api/movies', (req, res) => {
        console.info(`${req.method} request received for all movies`);
        res.json('This gets api movies');
            
        db.query('SELECT * FROM movies', function (err, results) {
        console.log(results);
        });
        
    });



    // Default response for any other request (Not Found)
    app.use((req, res) => {
    res.status(404).end();
    });


// START SERVER ______________________________________________

    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });

//_____________________________________________________________    


