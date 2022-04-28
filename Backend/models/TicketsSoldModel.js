import { Sequelize } from "sequelize";
import { db } from "../config/settings.js";
 
const { DataTypes } = Sequelize;
 
// UserID 
// EventID 
// DateSold 
// PaymentID 

const TicketsSold = db.define('tickets_sold',{
    date_sold:{
        type: DataTypes.DATE
    }
},{
    freezeTableName:true
});


 
(async () => {
    await db.sync();
})();
 
export default TicketsSold;
