# employee-tracker

to do:

1. finish query.sql join commands to put into api requests in server
    1a. start will all roles and all employess
    1b. next is adding a department, role, and employee
    1c. end with updating the role for the employee
2. look into doing inquirer prompts that go hand in hand with curd requests
    2a. look into if you can put a let/const on each api request to just call into the .then portion of the inquirer prompt
        2b. if not, might be better to do one main inquirer prompt and mini inquirer prompts in
            the update/add requests
            2c. we can then send the user back to the main inquirer prompt when each request is completed
3. dont forget to use console.table to make tables in terminal