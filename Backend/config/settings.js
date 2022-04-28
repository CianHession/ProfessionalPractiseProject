import { Sequelize } from "sequelize";
 
export const db = new Sequelize('ticket_db', 'root', '', {
    host: "localhost",
    dialect: "mysql",
});
 
export const app_port = 5000;
// export const api_root = "";
// export default db;


