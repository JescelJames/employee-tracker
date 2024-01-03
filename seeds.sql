INSERT INTO departments (name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');


INSERT INTO roles (title, salary, department_id)
    VALUES  ('Sales Lead', 100000, 4),
            ('Salesperson', 80000, 4),
            ('Lead Engineer', 150000, 1),
            ('Software Engineer', 120000, 1),
            ('Account Manager', 160000, 2),
            ('Accountant', 125000, 2),
            ('Legal Team Lead', 250000, 3),
            ('Lawyer', 190000, 3);

INSERT INTO employees (first_name, last_name, role_id)
    VALUES ('John', 'Doe', 1),
            ('Mike', 'Chan', 2),
            ('Ashley', 'Rodriguez', 3),
            ('Kevin', 'Tupic', 4),
            ('Kunal', 'Singh', 5),
            ('Malia', 'Brown', 6),
            ('Sarah', 'Lourd', 7),
            ('Tome', 'Allen', 8);



-- INSERT INTO department (name)
-- VALUES ("Web Development"),
--        ("Data Science"),
--        ("Math"),
--        ("Electives");

-- INSERT INTO course_names (name, department)
-- VALUES ("Intro to JavaScript", 1),
--        ("Data Science", 2),
--        ("Linear Algebra", 3),
--        ("History of the Internet", 4),
--        ("Machine Learning", 4),
--        ("Game Design", 1 ),
--        ("Cloud Development", 1);
       
