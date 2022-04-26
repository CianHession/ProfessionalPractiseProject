import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Events = db.define('events',{

// ID 
// Name 
// EventDate 
// OpenSalesDate
// ClosingSalesDate 
// MaxTicketsAllowed 
// EventOrganisationID 
// TicketPrice

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
 
Events.hasOne(EventOrganisation);

(async () => {
    await db.sync();
})();
 

export default Events;
