-- SELECT *
-- FROM employees JOIN roles
-- -- ON employees.role_id = roles.id

SELECT * 
FROM roles JOIN employees
ON departments.departments_id = employees.




Introduction to MySQL join clauses
A relational database consists of multiple related tables linking together using common columns, which are known as foreign key columns. Because of this, the data in each table is incomplete from the business perspective.

For example, in the sample database, we have the orders and orderdetails tables that are linked using the orderNumber column:

To get complete order information, you need to query data from both orders and  orderdetails tables.

That’s why joins come into the play.

A join is a method of linking data between one (self-join) or more tables based on the values of the common column between the tables.

MySQL supports the following types of joins:

Inner join
Left join
Right join
Cross join

To join tables, you use the cross join, inner join, left join, or right join clause. The join clause is used in the SELECT statement appeared after the FROM clause.

MySQL INNER JOIN clause
The following shows the basic syntax of the inner join clause that joins two tables table_1 and table_2:

SELECT column_list
FROM table_1
INNER JOIN table_2 ON join_condition;

 