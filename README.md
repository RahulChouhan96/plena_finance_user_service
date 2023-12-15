# Plena Finance App

## Introduction
I've used NodeJS, MongoDB, Mongoose, Git, Mocha and Chai in this entire project. This readme file combines details for both the services.


## Setup
1. Clone both repos.
2. Run `npm install`.
3. To run the server, run `nodemon server.js`. This will run both server and start the DB.
4. Now, feel free to call APIs.
5. You can also download robo3T software to view data in MongoDB. It is a GUI.


## Implementation
I've implemented all APIs and models as mentioned for both services. I'm listing them below for better reference.

### User Service
1. Create an admin user in `users` DB.
2. Add User (Admin API) `POST /user/admin/user`: It will create a user document in mongoDB. You have to be an admin in order to perform this. Otherwise, it will throw 404 error.
3. Delete user (Admin API) `DELETE /user/admin/user`: Deletes a user. An admin can only run.
4. Get user data (All) `GET /user`: Gets all data of a user. Everyone can run.
5. Validates if user is admin or not (All) `GET /user/validate/admin`: This API is user by task-management-service. It validates whether a user is an admin or not.

### Task Management Service
1. Create task (Admin API) `POST /task_management/admin/task`: Create a task. Only admin can access.
2. Update task (Admin API) `PUT /task_management/admin/task`
3. Search tasks (Admin API) `GET /task_management/admin/search/task`: Admin can search tasks. These tasks will be returned sorted using completion status, due date & priority.
4. Get a specific task (All) `GET /task_management/task`: Anyone can get a specific task using its ID.
5. Mark task as Done (All) `PUT /task_management/task/done`: Users can mark their task as DONE.

### Test Cases
I've written test cases in user-service. I've implemented both unit and integration test cases. Unit test case tests the admin validation method. Whereas integration test case tests the add user API.
To run test case, use following 2 commands:
For unit test: `npm run test:unit`
For integration test: `npm run test:integration`


## Simulation
1. Microservice Communication - In order to implement microservices such that they can communicate with each other, we have to deploy them. For eg. we can deploy them on AWS lambda and then the 2 lambdas can trigger each other. As I'm not doing any deployments, I've simply simulated the communication between them by hardcoding some values. So, when task-management service wants to know whether a user is admin or not, I'm simply returning there `true`. But, once we deploy, we can change it to properly calling user-service.

2. Calling event after task is DONE - To release an event we can use AWS SQS. In order to do this, we need to create a queue in it.