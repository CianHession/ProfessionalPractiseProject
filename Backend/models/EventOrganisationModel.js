import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
// ID 
// Name
// AdministratorEmail 
// AdministratorPassword 


const EventOrganisation = db.define('tickets_sold',{
    name:{
        type: DataTypes.STRING
    },
    administrator_email:{
        type: DataTypes.STRING
    },
    administrator_password:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default EventOrganisation;
