import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;

// ID
// TotalPrice 
// HandlingFee 
// NumberOfTickets 
// PaymentDate 


const Payments = db.define('tickets_sold',{
    total_price:{
        type: DataTypes.FLOAT
    },
    handling_fee:{
        type: DataTypes.FLOAT
    },
    ticket_amount:{
        type: DataTypes.INTEGER
    },
    payment_date:{
        type: DataTypes.DATE
    },
},{
    freezeTableName:true
});


 
(async () => {
    await db.sync();
})();
 
export default Payments;
