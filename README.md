# CP476 To-Do List Web Application

## Project Overview
This project is a full-stack To-Do List web application developed for CP476 – Internet Computing.
The goal of the application is to help users manage tasks and deadlines in an organized and simple way.

## Team Members
- Suvethan Yogathasan
- Maathusan Raveendran
- Marc Niven Kumar

## Core Features
- Create, edit, and delete tasks
- Organize tasks into multiple lists (e.g., one per course)
- View tasks by due date
- Highlight task priority

## Technologies (Planned)
- HTML, CSS, JavaScript
- Node.js or PHP
- Relational Database (MySQL)

## Project Structure
This repository will contain:
- Front-end code
- Back-end server code
- Database scripts
- Documentation and reports

## Status
Project currently in **Milestone 03 – Full-Stack Integration, Testing Report, Final Demo & Presentation**

## Setup

1. Clone the repository
  ```{bash}
  git clone https://github.com/Suvethan19/CP476-todo-list-app.git
  cd CP476-todo-list-app
  ```

2. Install dependencies
  ```{bash}
  npm install
  ```

3. Open MySQL Workbench

4. In MySQL Workbench, import and run the `create_db.sql` script located in the `database` folder to create the database and tables:
- todo_list_db
- users
- lists
- tasks

5. Create a `.env` file in the root directory and paste the following:
  ```{bash}
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=YOUR_PASSWORD_HERE
  ```
  Replace `YOUR_PASSWORD_HERE` with your MySQL password.

  If you have a different MySQL Host and Username, replace `localhost` and `root`.

6. Run the server
  ```{bash}
  npm start
  ```

  Open your browser and go to:  http://localhost:3000
  
## Team Member Contributions Summary
Deliverables:
- Marc, Maathusan: Front-end development and UI workflow
- Marc: Database design, Fullstack Integration
- Suvethan: Back-end setup, server configuration, GitHub management, Kanban board updates, and documentation
