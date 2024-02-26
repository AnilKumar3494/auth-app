// this is a test controller for API working or not

import User from "../models/user.model.js"
import { errorHandeler } from "../utils/error.js"
import bcryptjs from "bcryptjs"


export const test = (req, res) => {
    res.json({
        message: "This is router test from user.controller"
    })
}


//fun to update user in user.route.js  - this will be used in user.route
export const updateUser = async (req, res, next) => {
    //FOr extra securiry we are going to check if user is autheticated or not
    //req.user.id from jwt
    if (req.user.id !== req.params.id) {
        return next(errorHandeler(401, "You can only update your account, plese login"))
    }

    //in the above if user is authenticaed then we proceed with below try and catch
    try {
        //hashing the new password -- encryption
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        //update user button working - User from our user.model
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                //Set method to get data from inputs -- just get what is needed
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            },
            { new: true }  //this option to update -- necessary to see updated detail
        );
        //After updating sending updated user details to client side
        //but before that we seperate the password from the rest
        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }

}


