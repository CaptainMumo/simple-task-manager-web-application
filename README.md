# Task Manager Web Application

This is a simple task manager web application with a Django REST backend and a ReactJS frontend. The application can be run using Docker or by setting up the backend and frontend environments manually.

## Project Structure

The root folder `task-manager` contains the two project folders `backend` and `frontend` as well as `.gitignore` `docker-compose.yml` and this `README.md`.

The `backend` folder is the main Django REST API project and contains a single application `tasks`. This folder also contains the project packages in `reuirements.txt` and Docker configuration file.

The `frontend` folder is the React App created using `npx create-react-app frontend`. It contains all the frontend code including Docker configuration file.

task-manager/
│
├── backend/
│ ├── backend/
│ ├── tasks/
│ ├── manage.py
│ ├── requirements.txt
│ ├── Dockerfile
│ └── ...
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── Dockerfile
│ ├── package.json
│ └── ...
│
├── .gitignore
├── docker-compose.yml
└── README.md

## Project Setup Instructions

There are two options for running this project:
1. Using Docker
2. Manual Setup

### Using Docker

1. Clone the repo

```bash
git clone git@github.com:CaptainMumo/task-manager.git

2. Ensure you have [Docker](https://www.docker.com/get-started) and [docker-compose](https://docs.docker.com/compose/install/) installed and running on your machine.

3. Navigate to the root folder of the project:

   ```bash
   cd path/to/task-manager

4. Build and start the application using Docker Compose:

```bash
docker-compose up --build

5. Above step takes a while to setup the images and run the servers. Be patient until you see the following!

![alt text](image.png)

6. The application should now be running and accessible at (http://localhost:3000)

7. In case of any issues, you can follow the manual setup instead.

### Manual Setup
