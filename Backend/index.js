import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
// import { Events, EventOrganisation, Payments, TicketsSold, Users } from './models/index.js';
import { app_port } from "./config/settings.js";

dotenv.config();
const app = express();
 
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
 
app.listen(app_port, ()=> console.log('Server running at port ' + app_port));