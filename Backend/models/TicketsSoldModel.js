import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
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

TicketsSold.belongsTo(Events);
TicketsSold.hasMany(Payment);
 
(async () => {
    await db.sync();
})();
 
export default TicketsSold;
