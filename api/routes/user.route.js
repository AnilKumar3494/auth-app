// /we need express so import it

import Express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


//making the route
const route = Express.Router();

// route.get('/', (req, res) => {
//     res.json({
//         message: "This router is working and being hosted in localhost:3000"
//     })
// })
// export default route
// //the above could further be modified by shfiting the req and res (logic) -- to another file so that all the contollers will be at the same place and making our files componented


//use test from the controller
route.get('/', test)

//route for updating user profile
//use are going to use id and check if user is autheticated to update or not
route.post("/update/:id", verifyToken, updateUser)

export default route