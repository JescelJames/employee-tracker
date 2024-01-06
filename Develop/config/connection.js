const mysql = require('mysql2');
require('dotenv').config();


// CONNECT TO DATABASE ___________________________________    

    // Connect to database
    const db = mysql.createConnection(
        
        // process.env.DB_USER,
        // process.env.DB_PASSWORD,
        // process.env.DB_NAME,
        {
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            
        },
        console.log(`Connected to the employee_tracker_db database.`)
        );



        module.exports = db;