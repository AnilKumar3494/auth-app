//testing what we can get from user using the req

import User from "../models/user.model.js"
//for hashing the password -- npm i bycrypt and import
import bcryptjs from 'bcryptjs'

//to receive the req we need to add something in index.js i.e app.use(express.json())
export const authSignUp = async (req, res) =>{
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashPassword })
    try {
        //saving to the database
        await newUser.save()
        res.status(201).json({ message: `User ${username} created`})
    } catch (error) {
        res.status(500).json("Error message:" + error.message)
    }

}

// export const authSignUp = async (req, res) => {
    
//     const { username, email, password } = req.body
//     const newUser = new User({ username, email, password })
//     await newUser.save()
//     res.status(201).json({ message: "User craeted successfully" })
// }
