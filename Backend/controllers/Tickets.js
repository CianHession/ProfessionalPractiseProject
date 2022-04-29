//import Users from "../models/UserModel.js";
import { Sequelize } from "sequelize";
import { db } from "../config/settings.js";

import { Payments } from "../models/Index.js";
 
export const buyTicket = async(req, res) => {

    console.log("Buy Ticket Called");
    try {

        const { amount, name, totalPrice } = req.body;
    
        await Payments.buy({
            amount: amount,
            name: name,
            totalPrice: totalPrice
        });
    
        res.json({msg: "Registration Successful"});
    } catch (error) {
        res.status(404).json({msg:error});

    }
}

