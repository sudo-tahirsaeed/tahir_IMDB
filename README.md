# tahir_IMDB_COWLAR
# Description 
An interview task for Cowlar Design Studio, this project is a movie database web app. Users can search, rate, comment, and add movies. Developed using React, Node.js, Express, and MySQL.
# HOW TO RUN
# Backend:

1. Clone the backend repository.
2. Navigate to the backend directory in the terminal.
3. Run npm install to install the required node modules.
4. Finally run using npm start / node index.js
# Database Configuration:
1. Database is deployed on cloud by default, but could be configured locally (SQL file attached)
2. Set up your chosen database server (e.g., XAMPP).
3. Import the 'databaseFile.sql' file into your database server.
4. Configure the database credentials in the '/backend/backendconfig/db.js' file in the backend directory.

# Frontend:

Clone the repository containing the frontend code.
1. Navigate to the frontend directory in the terminal.
2. Run npm install to install the required dependencies.
3. Run npm start to launch the frontend application.
4. This setup assumes the backend and frontend are separate projects. Adjust any configuration or port settings as needed based on the project's specific setup.
# TESTS
1. JEST test cases are inside backend npm test to start testing
2. Cypress testcases e2e also added in the repo
# DOCKER IMAGES 
sudotahirsaeed/tahirsapp-backend:latest
sudotahirsaeed/tahirsapp-frontend:latest
docker push sudotahirsaeed/tahirsapp-backend:latest
docker push sudotahirsaeed/tahirsapp-frontend:latest
# Please ensure that ports, API endpoints, and database connections align between the frontend and backend for proper communication.
