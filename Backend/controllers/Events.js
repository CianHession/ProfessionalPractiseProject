//import Users from "../models/UserModel.js";
import { Sequelize } from "sequelize";
import { EventOrganisation, Events } from "../models/Index.js";
 
export const getEvents = async(req, res) => {
    try {
        let where = {};
        if (req.org) {
            where['eventOrganisationId'] = req.org;
        }
        const events = await Events.findAll({
            where: where
        });
        res.json(events);
    } catch (error) {
        res.status(404).json({msg:error});
    }
}
 
export const getLatestEvents = async(req, res) => {
    try {
        let now = new Date().toISOString();
        let where = {
            event_date: {
                [Sequelize.Op.gt]: now.slice(0, 10),
            }        
        };
        if (req.org) {
            where['eventOrganisationId'] = req.org;
        }
        const events = await Events.findAll({
            where: where,
            include: {
                model: EventOrganisation
            }
        });
        res.json(events);
    } catch (error) {
        res.status(404).json({msg:error});
    }
}

export const createEvent = async(req, res) => {

    console.log("Create Event Called");
    try {

        const { name, event_date, open_date, closing_date, max_tickets, ticket_price } = req.body;
    
        await Events.create({
            name: name,
            event_date: event_date,
            open_date: open_date,
            closing_date: closing_date,
            max_tickets: max_tickets,
            ticket_price: ticket_price,
            eventOrganisationId: req.org
        });
    
        res.json({msg: "Registration Successful"});
    } catch (error) {
        res.status(404).json({msg:error});

    }
}
