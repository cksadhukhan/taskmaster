# Taskmaster API

### Project brief

Backend system for a task tracking and management application.

### Project Description:

Backend system for a task tracking and management application. that facilitates collaboration and organization within teams or projects. The application should allow users to create, assign, and track tasks, as well as collaborate with team members through comments and attachments.

### User schema:

```
{
  "id": number
  "name": string,
  "email": string,
  "password": string,
  "createdAt": DateTime,
  "tasksOwned": Array<Task>,
  "tasksAssigned": Array<Task>,
  "teams": Array<Team>
}
```

### Team schema:

```
{
  "id": number
  "name": string,
  "members": Array<User>,
  "tasks": Array<Task>,
  "createdAt": DateTime,
}
```

### Task schema:

```
{
  "id": number
  "title": string,
  "description": string,
  "dueDate": DateTime,
  "status": string,
  "owner": User,
  "ownerId": number,
  "assignedTo": User,
  "userId": number,
  "team": Team,
  "teamId: number,
  "createdAt": DateTime
}
```

## Run Locally

Clone the project

```bash
  git clone git@github.com:cksadhukhan/taskmaster.git
```

Go to the project directory

```bash
  cd taskmaster
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Start the development server

```bash
  npm run dev
```

## Endpoints

### Auth

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| POST   | /api/auth/register | Register the user          |
| POST   | /api/auth/login    | Singin the registered user |
| GET    | /api/auth/me       | Singin the registered user |

### Task

| Method | Endpoint       | Description                              |
| ------ | -------------- | ---------------------------------------- |
| POST   | /api/tasks     | Create a task                            |
| GET    | /api/tasks     | Get all tasks                            |
| PUT    | /api/tasks/:id | Update a task as well as assign to other |
| DELETE | /api/tasks/:id | Delete a task                            |

### Team

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | /api/teams           | Create a team      |
| GET    | /api/teams           | Get all teams      |
| POST   | /api/teams/addMember | Add member to team |
