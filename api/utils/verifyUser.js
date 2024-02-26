import jwt from "jsonwebtoken";
import { errorHandeler } from "./error.js";


export const verifyToken = (req, res, next) => {
    //to parse cookie we are going to use package - cookie parse in root of application - npm i cookie-parse
    const token = req.cookie.access_token;

    if (!token) return next(errorHandeler(401, "You can only update your account, please login"))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandeler(403, "Invalid Token"))
        req.user = user
        next()
    })
}