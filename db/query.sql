-- for practice joins to later put into curd requests

SELECT department.name AS department, role.title, role.salary
FROM role
INNER JOIN department ON department.id=role.department_id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id
FROM ((employee
INNER JOIN role ON role.id=employee.role_id)
INNER JOIN department ON department.id=role.department_id);

