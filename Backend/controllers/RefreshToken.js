import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { EventOrganisation } from "../models/index.js";
 
export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        let isAdmin = true;
        if(!refreshToken) return res.sendStatus(401);
        let user = await EventOrganisation.findAll({
            where:{
                refresh_token: refreshToken
            }
        }); 

        if(user.length == 0) {
            user = await Users.findAll({
                where:{
                    refresh_token: refreshToken
                }
            });
            isAdmin = false;
        }
            
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = isAdmin ? user[0].administrator_email : user[0].email;
            const org = isAdmin ? user[0].id : "";
            const accessToken = jwt.sign({userId, name, email, isAdmin, org}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '24h'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}