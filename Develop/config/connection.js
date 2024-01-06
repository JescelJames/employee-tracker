// CONNECT TO DATABASE ___________________________________    

    // Connect to database
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'rootroot',
            database: 'employee_tracker_db',
            
        },
        console.log(`Connected to the employee_tracker_db database.`)
        );

        
        // db.query('SELECT * FROM departments', function (err, results) {
        //     console.log(results);
        //     });
