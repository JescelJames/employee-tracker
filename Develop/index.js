// DEPENDENCIES _______________________________________

    const inquirer = require('inquirer');
    const db = require('./config/connection');
    require('console.table'); 


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
                            console.clear();
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
                    validate: (name) => {
                        if(!name) {
                            return 'Please enter a Department name';
                        }
                        return true;
                    },
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
    
        // Query to get all roles
        const queryAllRoles = `SELECT id, title FROM roles`;
        db.query(queryAllRoles, (err, roles) => {
            if (err) throw err;
    
            // Manager choices
            const managerChoices = {
                'Sales Lead': 1,
                'Lead Engineer': 3,
                'Account Manager': 5,
                'Legal Team Lead': 7,
                'None': null,
            };
    
            // Prompt for employee details
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
                    choices: roles.map(role => role.title)
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Select the manager position responsible for this employee?",
                    choices: Object.keys(managerChoices),
                }
            ]).then((answers) => {
                const { firstName, lastName, role, manager } = answers;
    
                // Find role ID
                const roleId = roles.find(r => r.title === role).id;
                const managerId = managerChoices[manager];
    
                // Insert query
                const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                db.query(query, [firstName, lastName, roleId, managerId], (err) => {
                    if (err) {
                        console.error('Error occurred:', err);
                        return;
                    }
                    console.log(``);
                    console.log("__________________________________________________");
                    console.log(`        Employee ${firstName} ${lastName} added successfully! `);
                    console.log("__________________________________________________");
                    console.log(``);
                    process.exit(0);
                });
            }).catch((error) => {
                console.error('Error occurred:', error);
            });
        });
    }
    

    // Add Role Function -----------------------
    
        
        
        function addRole() {
        //    const db = require('./config/connection'); 
            // Query to get all departments
            const queryAllDepartments = `SELECT id, name FROM departments`;
            db.query(queryAllDepartments, (err, departments) => {
                if (err) throw err;
        
                // Prompt for role details
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'newRoleTitle',
                        message: 'Enter the title of this new role: ',
                    },
                    {
                        type: 'input',
                        name: 'newRoleSalary',
                        message: 'Enter the salary of the role: ',
                        validate: (salary) => {
                            if (!salary || isNaN(salary)) {
                                console.log('Please enter a valid annual salary for this role');
                                return false;
                            }
                            return true;
                        },
                    },
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Select the Department:',
                        choices: departments.map(department => ({ name: department.name, value: department.id }))
                    }
                ]).then((answers) => {
                    const { newRoleTitle, newRoleSalary, departmentId } = answers;
        
                    // Insert query
                    const query = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                    db.query(query, [newRoleTitle, newRoleSalary, departmentId], (err) => {
                        if (err) {
                            console.error('Error occurred:', err);
                            return;
                        }
                        console.log("__________________________________________________");
                        console.log(`      New Role added successfully! `)
                        console.log("__________________________________________________");
                        console.log('');
                        process.exit(0);
                    });
                }).catch((error) => {
                    console.error('Error occurred:', error);
                });
            })
        }
        


    // Update Employee Role Function -----------------------
        
        function updateEmployeeRole() {

            const queryEmployee = `SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees`

            db.query(queryEmployee, (err, employees) => {
                if (err) throw err;
        
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Which employee do you want to update?',
                        choices: employees.map(employee => ({ name: employee.name, value: employee.id }))
                    }
                ])
                .then(({ employeeId }) => {

                    const queryNewRole = `SELECT id, title FROM roles`
                    
                    db.query(queryNewRole, (err, roles) => {
                        if (err) throw err;

                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'roleId',
                                message: 'What is the new role?',
                                choices: roles.map(role => ({ name: role.title, value: role.id }))
                            }
                        ]).then(({ roleId }) => {
                            
                            const queryUpdateRole = `UPDATE employees SET role_id = ? WHERE id = ?`

                            db.query(queryUpdateRole, [roleId, employeeId], (err) => {
                                if (err) throw err;
                                console.clear();
                                console.log("__________________________________________________");
                                console.log(`      Employee's role updated successfully!`       );
                                console.log("__________________________________________________");
                                
                                process.exit(0);
                            });
                            
                        });

                    });

                });

            });
            
        }
        
       
    //______________________________________
       
       

// INITIALIZE _________________________

    init();
//______________________________________