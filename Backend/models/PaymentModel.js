import { Sequelize } from "sequelize";
import { db } from "../config/settings.js";
 
const { DataTypes } = Sequelize;

// ID
// TotalPrice 
// HandlingFee 
// NumberOfTickets 
// PaymentDate 


// const Payments = db.define('payments',{
//     total_price:{
//         type: DataTypes.FLOAT
//     },
//     handling_fee:{
//         type: DataTypes.FLOAT
//     },
//     ticket_amount:{
//         type: DataTypes.INTEGER
//     },
//     payment_date:{
//         type: DataTypes.DATE
//     }
// },{
//     freezeTableName:true
// });

const Payments = db.define('payment',{
            amount:{
                type: DataTypes.INTEGER
            },
            name:{
                type: DataTypes.STRING
            },
            totalPrice:{
                type: DataTypes.FLOAT
            }
    },{
        freezeTableName:true
    });

(async () => {
    await db.sync();
})();
 
export default Payments;
