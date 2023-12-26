import mongoose from "mongoose";

//creating a user schema model
//Craete using method from mongoose Schema
// these schema only accept strings
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

//timestamps can be later used to collect and store user data creation time and edit time

//This is where model is created, stored and exported so that it can be used later
//"User" is name of the model it should be Uppercase 1st letter as per mongoDB
const User = mongoose.model('User', userSchema)

export default User

