//testing what we can get from user using the req

import User from "../models/user.model.js"

//to receive the req we need to add something in index.js i.e app.use(express.json())
export const authSignUp = async (req, res) =>{
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password })
    try {
        await newUser.save()
        res.status(201).json({ message: "User Created!"})
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
