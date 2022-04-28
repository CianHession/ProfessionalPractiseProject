import { Sequelize } from "sequelize";
import { db } from "../config/settings.js";
import EventOrganisation from "./EventOrganisationModel.js";
 
const { DataTypes } = Sequelize;
 
const Events = db.define('events',{

    name:{
        type: DataTypes.STRING
    },
    event_date:{
        type: DataTypes.DATE
    },
    open_date:{
        type: DataTypes.DATE
    },
    closing_date:{
        type: DataTypes.DATE
    },
    max_tickets:{
        type: DataTypes.INTEGER
    },
    ticket_price:{
        type: DataTypes.FLOAT
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 

export default Events;
