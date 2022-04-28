//import Users from "../models/UserModel.js";
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EventOrganisation } from "../models/Index.js";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','name','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
 
export const Register = async(req, res) => {
    const { name, email, password, confPassword, isAdmin } = req.body;

    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        if(isAdmin) {
            await EventOrganisation.create({
                name: name,
                administrator_email: email,
                administrator_password: hashPassword
            });
    
        } else {
            await Users.create({
                name: name,
                email: email,
                password: hashPassword
            });
    
        }
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
 
export const Login = async(req, res) => {
    try {
        console.log("Login Called", req.body);
        if(req.body.isAdmin) {
            console.log("Logging in event administrator");
            const eventAdmin = await EventOrganisation.findAll(
                {
                    where: {
                        administrator_email: req.body.email                        
                    }
                }
            );
            console.log(eventAdmin);
            const match = await bcrypt.compare(req.body.password, eventAdmin[0].administrator_password);
            if(!match) return res.status(400).json({msg: "Wrong Password"});
            const userId = eventAdmin[0].id;
            const name = eventAdmin[0].name;
            const email = eventAdmin[0].email;
            const org = eventAdmin[0].id;
            const accessToken = jwt.sign({userId, name, email, isAdmin: true, org: org}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '24h'
            });
            const refreshToken = jwt.sign({userId, name, email, isAdmin: true, org: org}, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: '7d'
            });
            await EventOrganisation.update({refresh_token: refreshToken},{
                where:{
                    id: userId
                }
            });
            res.cookie('isAdmin', true,{
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.cookie('refreshToken', refreshToken,{
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json({ accessToken });


        } else {
            console.log("Logging in normal user");
            const user = await Users.findAll({
                where:{
                    email: req.body.email
                }
            });
            console.log(req.body.password, user[0].password);
            const match = await bcrypt.compare(req.body.password, user[0].password);
            if(!match) return res.status(400).json({msg: "Wrong Password"});
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({userId, name, email, isAdmin: false}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '1d'
            });
            const refreshToken = jwt.sign({userId, name, email, isAdmin: false}, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: '7d'
            });
            await Users.update({refresh_token: refreshToken},{
                where:{
                    id: userId
                }
            });
            res.cookie('isAdmin', false,{
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.cookie('refreshToken', refreshToken,{
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json({ accessToken });
        }
        
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"Email not found"});
    }
}
 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}