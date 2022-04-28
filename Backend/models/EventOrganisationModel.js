import { Sequelize } from "sequelize";
import { db } from "../config/settings.js";

const { DataTypes } = Sequelize;
 
// ID 
// Name
// AdministratorEmail 
// AdministratorPassword 


const EventOrganisation = db.define('event_organisation',{
    name:{
        type: DataTypes.STRING
    },
    administrator_email:{
        type: DataTypes.STRING
    },
    administrator_password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }

},{
    freezeTableName:true
});


 
(async () => {
    await db.sync();
})();
 
export default EventOrganisation;
