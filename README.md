# client-management

## Setup

1. Installing packages
    npm install <package>
2. Installing mysql workbench and getting my database
    https://dev.mysql.com/downloads/windows/installer/8.0.html
    Create new schema and name it client
3. Adding environmental vars
    Create file ./.env (github ignores this file, keep sensitive information here)
    Change the dirname as needed in the dotenv config

    Fill up the .env file with the following format below:

        MYSQL_PASSWORD=your_password
        RESET_DB=false //change to true if needed
        MYSQL_HOST=localhost
        MYSQL_USER=root
        MYSQL_DB=client //depends on the schema name above
        MYSQL_DB_PORT=3306

    Please change as needed

## Run the server 
    Use 'npm start' to run

## Design decision
1. All the use of APIs are gathered in the routes folder. 
    I will write in a separate txt about how to use the API
2. Architecture
    I used the Service-Controller architecture for this project. 
    Hence, From the API endpoint, the router will call a controller to unpack or pack all the necessary information, and then call and pass in the information to the service, which will be in direct contact with the database.
    This way, we could call the same service method for different use cases (getCompletedCases, getCases, getOustandingCases using one service method) and save up more space and increase the efficiency as well. 
3. Entity
    I didn't include age in the client file, as it could be derived from client's birthdate. In addition, it changes every year. 

## Technologies Used
    Backend: Node.js with Express.js and TypeScript
    Database: MySQL with Sequelize

## Challenges Faced
    I had a hard time setting up the environment, as this is my first time setting up node.js with mysql. I am referring to tutorials online on how to connect the database with the project. 
    Other challenge include vague terms like Request and Case. I assumed that request is the same as case, and there is no need to change from Request to Case. 
