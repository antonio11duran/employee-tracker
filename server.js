const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

const choiceArray = ['Show all departments', 'Show all roles', 'Show all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employees role'];
const functionArray = [getDepartments, getRoles, getEmployees, newDepartment, newRole, newEmployee, updateRole];

function initQuestion() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: ['Show all departments', 'Show all roles', 'Show all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employees role'],
                name: 'initChoice',
            }
        ])
        .then((response) => {
            const choice = response.initChoice;
            for (let i = 0; i < choiceArray.length; i++) {
                if (choice === choiceArray[i]) {
                    return functionArray[i]();
                }
            }
        })
};

// get all departments
function getDepartments() {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        initQuestion();
    });
};

// get all roles
function getRoles() {
    const sql = `SELECT department.name AS department, role.title, role.salary FROM role INNER JOIN department ON department.id=role.department_id;`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        initQuestion();
    });
};

// get all employees
function getEmployees() {
    const sql = `SELECT employee.id, concat(employee.first_name, ' ', employee.last_name) AS name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        initQuestion();
    });
};

// add a new department
function newDepartment() {
    app.post('/api/new-department', ({ body }, res) => {
        const sql = `INSERT INTO department (name)
    VALUES (?);`;
        const params = [];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: body
            });
        });
    })
};

// add a new role
function newRole() {
    app.post('/api/new-role', ({ body }, res) => {
        const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?, ?, ?);`;
        const params = [];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: body
            });
        });
    })
};

// add a new employee
function newEmployee() {
    app.post('/api/new-employee', ({ body }, res) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?);`;
        const params = [];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: body
            });
        });
    })
};

// update an employees role
function updateRole() {
    app.put('/api/employee/:id', (req, res) => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?;`;
        const params = [];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } else if (!result.affectedRows) {
                res.json({
                    message: 'Employee not found'
                });
            } else {
                res.json({
                    message: 'success',
                    data: req.body,
                    changes: result.affectedRows
                });
            }
        });
    })
};

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT);

initQuestion();
