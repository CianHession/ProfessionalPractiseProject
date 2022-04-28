# Introduction

This is the design specification for a simple Ticket Management application. The idea is that different Event Organisers can sign up/ register for an account and set up their own events. And then normal users can also register to set up an account, then see what Evetns are being run and but tickets for those events.

# Installation

The system is made up of two parts, a back end server and a front end web app.

## Install Backend and Run

The backend is implemented using a MySql database and a node js server.
The first step in the installation process is to run the `npm install` command within the project folder.
Then you should create your database e.g.
```sql
create  database ticket_db;
```
Then you must update the file Backend/config/settings.js to refer to the correct database name, host, userid, password and port (if default 3306 is not used).  
```js
export const db = new Sequelize('ticket_db', '<add db passord here>', '<add db password here>', {
    host: "<add hostname/ ip address here, e.g. localhost>",
    dialect: "mysql"
});
```
Then with the `Backend/config/settings.js` correct you should be able to start the back end server by running the following commands.
```shell
cd Backend
node index.js
```
By default this will start the backend server listening on port 5000. If you would like to change this to use a different port then you can edit the `Backend/config/settings.js` file and change the field `app_port` as required.

# Install Front End and Run
The front end is a React JS Web Application which you can run by simpkify typing the command `npm start` in the project root folder.