SELECT 
    roles.id AS 'Role ID', 
    roles.title AS 'Job Title', 
    departments.name AS 'Department', 
    roles.salary AS 'Salary'
FROM roles
JOIN departments ON roles.department_id = departments.id;


 