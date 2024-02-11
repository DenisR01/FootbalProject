This application was created using JavaScript for both the backend and frontend, with Express and Node.js for the backend, and Vue.js for the frontend. The database is Firebase , an NoSQL database. Chance.js was used to create a script that populates the database with random information. The application is a Single Page Application with CRUD operations for related objects.

Other technologies used:

JWT (JSON Web Tokens): Used to create an authentication token that determines which users have access rights to database modification methods (POST, PUT, DELETE).
Vuex: Utilized to store the authentication token in local storage.
Axios: Axios is a promise-based HTTP client for making HTTP requests from the browser or Node.js. It is used here for making HTTP requests to the backend server.
CORS (Cross-Origin Resource Sharing): CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served. It is used to enable cross-origin requests to the backend server.


To run the application, you need to have Node.js installed. Afterwards, you need to start the backend and frontend servers. For the backend, use the command npm start, and for the frontend, use npm run serve.
