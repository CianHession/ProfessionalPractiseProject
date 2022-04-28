import EventOrganisation from "./EventOrganisationModel.js";
import Events from "./EventModel.js";
import Payments from "./PaymentModel.js";
import TicketsSold from "./TicketsSoldModel.js";
import Users from "./UserModel.js";


Events.belongsTo(EventOrganisation);
EventOrganisation.hasMany(Events);

Events.hasMany(TicketsSold);
TicketsSold.belongsTo(Events);


Payments.hasMany(TicketsSold);
TicketsSold.belongsTo(Payments);

TicketsSold.hasOne(Users);
Users.belongsTo(TicketsSold);


export {EventOrganisation, Events, Payments, TicketsSold, Users};