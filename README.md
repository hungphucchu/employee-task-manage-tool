# Employee Task Management Tool

This project is a real-time employee task management tool designed to enable managers to efficiently manage tasks assigned to employees, track progress, and dynamically update task statuses. The application supports user authentication, employee management, task creation, assignment, and real-time updates for all connected users.

## Getting Started

To start the entire application, use the following command:

```sh
npm run start:app
Backend
The backend is built using Node.js, Express.js, and TypeScript.

Commands
To run the backend:

sh
Copy code
cd back-end && npm run dev
Project Structure
plaintext
Copy code
back-end
|
├── certificates/       # Contains certificates for HTTPS
├── controller/         # Contains the controllers for the project
├── dto/                # Contains data transfer objects
├── middleware/         # Contains authentication middleware
├── repository/         # Contains repository classes
├── service/            # Contains services used in controllers
├── index.ts            # Main file to start the server
└── utils.ts            # Contains password-related methods
Database
Users: Contains information about user accounts
Tasks: Contains information about tasks
Employees: Contains information about employees
Owner: Contains information about the owner or manager of employees
Frontend
The frontend is built using React.js.

Commands
To run the frontend:

sh
Copy code
cd front-end && npm run start
Project Structure
plaintext
Copy code
front-end
|
├── css/                # Contains CSS files
├── components/         # Contains common components used throughout the project
├── dto/                # Contains data transfer objects
├── helper/             # Contains API helper methods
└── index.tsx           # Main file for the frontend
```
