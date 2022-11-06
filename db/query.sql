-- for practice joins to later put into curd requests

-- shows all roles with department names
SELECT department.name AS department, role.title, role.salary
FROM role
INNER JOIN department ON department.id=role.department_id;

-- shows all employees with role info, department info, and manager info
SELECT employee.id, concat(employee.first_name, ' ', employee.last_name) AS name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;

-- adds a department
INSERT INTO department (name)
VALUES (?);

-- adds a role
INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?);

-- adds an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);

-- update and employees role
UPDATE employee SET role_id = ? WHERE id = ?;