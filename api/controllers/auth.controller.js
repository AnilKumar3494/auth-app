//testing what we can get from user using the req

import User from "../models/user.model.js"
//for hashing the password -- npm i bycrypt and import
import bcryptjs from 'bcryptjs'
import { errorHandeler } from "../utils/error.js";
//importing jsonwebtoken 
import jwt from "jsonwebtoken";

// //to receive the req we need to add something in index.js i.e app.use(express.json())
// export const authSignUp = async (req, res) =>{
//     const { username, email, password } = req.body;
//     const hashPassword = bcryptjs.hashSync(password, 10)
//     const newUser = new User({ username, email, password: hashPassword })
//     try {
//         //saving to the database
//         await newUser.save()
//         res.status(201).json({ message: `User ${username} created`})
//     } catch (error) {
//         res.status(500).json("Error message:" + error.message)
//     }
// }

//receving errors for the above but now from the middlewear from index.js

export const authSignUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashPassword })
    try {
        //saving to the database
        await newUser.save()
        res.status(201).json({ message: `User ${username} created` })
    } catch (error) {
        // //creating custom error if required from error.js
        // next(errorHandeler(300, "Something went wrong"))
        next(error)
    }
}


// export const authSignUp = async (req, res) => {

//     const { username, email, password } = req.body
//     const newUser = new User({ username, email, password })
//     await newUser.save()
//     res.status(201).json({ message: "User craeted successfully" })
// }


//backedend validation for sign-up page from inputs of sign-up
export const authSignIn = async (req, res, next) => {
    //getting email and passoword from req.body
    const { email, password } = req.body
    //validating it with data in MongoDB
    try {
        const validUser = await User.findOne({ email: email })
        if (!validUser) {
            return next(errorHandeler(401, 'User not found'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandeler(401, 'Wrong Credentials'))
        }
        //After this we need to add token to cookie of the browser - which can be hash value of unique things from the username, email or ID which are encrypted and stored inside a cookike and later can be used to verify user
        //We use a famous JSON Web Token - 'npm i jsonwebtoken' and then import it
        //For better validation we need to use unique elements but we are going to use the ID generated by MongoDB for security purposes instead of username or email
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        //adding to the cookie
        //seperating password so that it will no be sent to the client side
        const { password: hashPassword, ...rest } = validUser._doc
        //adding expiry date so that the user wont be logged out after a refresh
        //calculating the current time and adding one hour
        const expiryDate = new Date(Date.now() + 360000)
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
    } catch (error) {
        next(error)
    }


}
//Backend validation end

//Google Authentication
export const authGoogle = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: hashPassword, ...rest } = user._doc
            const expiryDate = new Date(Date.now() + 360000)
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random * 10000).toString(),
                email: req.body.email,
                password: hashPassword,
                profilePicture: req.body.photo
            })
            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: hashPassword2, ...rest } = newUser._doc
            const expiryDate = new Date(Date.now() + 360000);
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate,
            })

        }
    } catch (error) {
        next(error)
    }
}