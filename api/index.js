// Backend Configuration - first 'npm init -y' to get the package.json file 
// After that install express using 'npm i express'
// Next Created this index.js file as package.json has a "main": "index.js", 

//Since we are using import here we need to set up and to that add 'type: module' in package.json to prevent errors
import express from 'express'

//Connecting with DATABASE
//We are going to use Mangoose - to install it - "npm i mongoose" in the root folder i.e AUTHAPP
//after installing import it
import mongoose from 'mongoose'

//the dotenv to use env folder import and then configure it to work
import dotenv from 'dotenv'
dotenv.config();

//importing route from user.route.js -- we have exporeted it as default so we can import it with any name
import userRoute from './routes/user.route.js'


//DATABASE
//--Connecting out Database created in the MongoDB website
//after importing connect the mongoose
//for that use mongoose.connect(get uri from mongoose website)
//in the uri keep password and app name after .net/
//however this is not the best practice to add uri like this as ppl can see passwords and all
//we create a env file and then use process.env and the variable that has our URI from env
//but for this to work (dev env to work)we need to install package - 'npm i dotenv' and import it
mongoose.connect(process.env.MONGO).then(() => {
    console.log("MongoBD is Connected and Running")
}).catch((err) => {
    console.log(err)
})
//to check if we are connected or not -- using then and catch we check and if there is error we catch it using catch

// -----Setting up auto run when changes are made in backend----------
//here if any changes are made for it to reflext we need to re run the entire server - so we install a package called nodemon - using 'npm i nodemon
// npm i nodemon - automatically detects the changes in the backend and restarts the server
// // run it using - nodemonapi/index.js -- but the best practice is to use a script in package.json
// "scripts": {
//     "dev": "nodemon api/index.js",
//     "start": "node api/index.js"
//   },
const app = express()
app.listen(3000, () => {
    console.log("Server is listening to port 3000!")
})


// //Making API ROUTE and checking its work
// //Later this will be created in seperate folder
// //to make this more cleaner we create routes folder and shift this to user.route.js
//'/' is the home page
// app.get('/', (req, res) => {
//     res.json({
//         message: "API is running in localhost:3000",
//     })
// })

//the move function is moved to route.user.js and is imported and used here as userRoute
app.use("/api/user", userRoute)
//but this can futher be modified 