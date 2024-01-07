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
        
        //    console.clear();

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
            

            const query = `SELECT 
                                d.id AS 'ID',
                                d.name AS 'Name'
                            FROM departments d`;
                            
            db.query(query, function (err, results) {
                if (err) {
                    console.error('Error occurred:', err);
                    return;
                }
                console.clear();
                console.log(`                         `);
                console.log("=========================");
                console.log(`       DEPARTMENTS       `);
                console.log("=========================");
                console.table(results);
                process.exit(0);
            
            });

        }

    // View All Employees Function -----------------------

        function viewAllEmployees() {
            
            const query = `SELECT 
                                e.id AS 'Employee ID', 
                                e.first_name AS 'First Name', 
                                e.last_name AS 'Last Name', 
                                r.title AS 'Job Title', 
                                d.name AS 'Department', 
                                r.salary AS 'Salary',
                                CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
                           FROM employees e
                           LEFT JOIN roles r ON e.role_id = r.id
                           LEFT JOIN departments d ON r.department_id = d.id
                           LEFT JOIN employees m ON e.manager_id = m.id
                           ORDER BY  e.id`;

            db.query(query, function (err, results) {
                if (err) {
                    console.error('Error occurred:', err);
                    return;
                }
                console.clear();
                console.log(`                                                                                              `);
                console.log("==============================================================================================");
                console.log(`                                            EMPLOYEES                                         `);
                console.log("==============================================================================================");
                console.table(results);
                process.exit(0);
                
            });
            
        }

    // View All Roles Function -----------------------

        function viewAllRoles() {

            const query = `SELECT 
                                roles.id AS 'Role ID', 
                                roles.title AS 'Job Title', 
                                departments.name AS 'Department', 
                                roles.salary AS 'Salary'
                           FROM roles JOIN departments 
                           ON roles.department_id = departments.id`
            db.query(query, function (err, results) {
                if (err) {
                    console.error('Error occurred:', err);
                    return;
                }
                console.clear();
                console.log("=================================================");
                console.log(`                    ROLES                        `)
                console.log("=================================================");
                console.table(results);
                process.exit(0);
            });
        }

    // Add Department Function -----------------------

        function addDepartment() {

            inquirer.prompt([
                
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the name of the department: ',
                },
            ])

            .then((answers) => {
                const {departmentName} = answers;
                const query = `INSERT INTO departments (name)
                                VALUES (?)`;

                db.query(query, [departmentName], function (err, results) {
                    if (err) {
                        console.error('Error occurred:', err);
                        return;
                    }
                    // console.clear();
                    console.log("__________________________________________________");
                    console.log(`      ${departmentName} Department added successfully! `)
                    console.log("__________________________________________________");
                    console.log('');
                    process.exit(0);
                });
            })

            .catch((error) => {
                console.error('Error occurred:', error);
            });
        }                
    
        
    // Add Employee Function -----------------------


        function addEmployee() {
            const db = require('./config/connection');

            const roleChoices = {
                'Sales Lead': 1,
                'Sales Person': 2,
                'Lead Engineer': 3,
                'Software Engineer': 4,
                'Account Manager': 5,
                'Accountant': 6,
                'Legal Team Lead': 7,
                'Lawyer': 8,
            }; 
            const managerChoices = {
                'Sales Lead': 1,
                'Lead Engineer': 3,
                'Account Manager': 5,
                'Legal Team Lead': 7,
                'None': null,
            }
            // const managerChoices = {
            //     ''
            // }
 

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
                    choices: Object.keys(roleChoices),
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the manager for this employee?",
                    choices: Object.keys(managerChoices),
                },

            ])
            .then((answers) => {

                const { firstName, lastName, role, manager } = answers;

                const roleId = roleChoices[role];
                const managerId = managerChoices[manager]
                
                const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                                VALUES (?, ?, ?, ?)`;


                    db.query(query, [firstName, lastName, roleId, managerId], (err, results) => {
                        
                        if (err) {
                            console.error('Error occurred:', err);
                            return;
                        }

                    console.log('Employee added successfully!');
                    process.exit(0);
                });
            })
            
            .catch((error) => {
                console.error('Error occurred:', error);
            });




        }










    // Add Role Function -----------------------

        function addRole() {

            const departmentChoices = []

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newRoleTitle',
                    message: 'Enter the title of this new role: ',
                    validate: (title) => {
                        if (!title) {
                            console.log('Please enter a title for this role')
                        }
                        return true;
                    },
                },
                {
                    type: 'input',
                    name: 'newRoleSalary',
                    message: 'Enter the salary of the role: ',
                    validate: (salary) => {
                        if (!salary) {
                            console.log('Please enter the annual salary for this role')
                        }
                        return true;
                    },
                },
                {
                    type: 'list',
                    name: 'departmentName',
                    message: 'Enter the Department Name: ',
                    choices: departmentChoices,
                },
            ])

            .then((answers) => {
                


                const query = `INSERT INTO roles (title, salary, department_id)
                                VALUES (?, ?, ?)`;

                const { newRoleTitle, newRoleSalary, departmentName } = answers;                
                // const { newRoleTitle, newRoleSalary, departmentName } = answers;
                // const query = `INSERT INTO roles (title, salary, department_id)
                //                 VALUES (?, ?, ?)`;
                getDepartmentId(departmentName, (departmentId) => {
                    db.query(query, [newRoleTitle, newRoleSalary, departmentName], function (err, results) {
                    // db.query(query, [newRoleTitle, newRoleSalary,], function (err, results) {
                        if (err) {
                            console.error('Error occurred:', err);
                            return;
                        }
                        console.log('Role added successfully!');
                        process.exit(0);
                    });
                })
            })

            .catch((error) => {
                console.error('Error occurred:', error);
            });

        };
                function getDepartmentId(departmentName, callback) {
                    const query = `SELECT id FROM departments WHERE name = ?`;
                    db.query(query, [departmentName], function (err, results) {
                        if (err) {
                            console.error('Error occurred:', err);
                            return callback(null);
                        }
                        if (results.length > 0) {
                            const departmentId = results[0].id;
                            return callback(departmentId);
                        } else {
                            console.log('Department not found');
                            return callback(null);
                        }
                    });
                }


    // Update Employee Role Function -----------------------

       function updateEmployeeRole() {}
       
    //______________________________________
       
       

// INITIALIZE _________________________

    init();
//______________________________________