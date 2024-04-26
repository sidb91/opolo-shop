import jwt from "jsonwebtoken";

import asyncHandler from "./asyncHandler.js";
import User from "../model/userModel.js";


//Protect routes
const protect = asyncHandler(async (req, res, next) => {

    // Read the JWT from the 'jwt' cookie
    let token = req.cookies.jwt;

    //console.log("request coookie : ", req.cookies.jwt)

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //set the logged in user info in the request
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch(error){
            console.log(error);
            res.status(401);
            throw new Error("User is not authorized, token failed")
        }
    } else {
        res.status(401);
        throw new Error("User is not authorized")
    }
})

//Admin middleware
const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    } else {
        console.log("in the admin check")
        res.status(401);
        throw new Error("User is not authorized as admin")
    }
}

export { admin, protect}