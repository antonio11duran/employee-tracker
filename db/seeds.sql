INSERT INTO department (name)
VALUES ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Junior Salesperson", 60000, 1),
        ("Senior Engineer", 150000, 2),
        ("Engineer", 120000, 2),
        ("Junior Engineer", 80000, 2),
        ("Head Accountant", 120000, 3),
        ("Accountant", 100000, 3),
        ("Junior Accountant", 80000, 3),
        ("Head of Legal", 200000, 4),
        ("Lawyer", 150000, 4),
        ("Paralegal", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Meredith", "Grey", 1, null),
        ("Maggie", "Pierce", 2, 1),
        ("Mika", "Yasuda", 3, 1),
        ("Nova", "Duran", 4, null),
        ("Levi", "Schmitt", 5, 4),
        ("Simone", "Griffith", 6, 4),
        ("Luna", "Duran", 7, null),
        ("Sara", "Ellis", 8, 7),
        ("Alex", "Karev", 9, 7),
        ("Emily", "Gamel", 10, null),
        ("Amelia", "Shepard", 11, 10),
        ("John", "Smith", 12, 10);