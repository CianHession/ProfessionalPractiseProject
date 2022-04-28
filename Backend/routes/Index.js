import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { getEvents, getLatestEvents, createEvent } from "../controllers/Events.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

 
const router = express.Router();
 
router.get('/events/latest', verifyToken, getLatestEvents);
router.get('/events', verifyToken, getEvents);
router.post('/event', verifyToken, createEvent);
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
 
export default router;