// /we need express so import it

import Express from "express";
import { test } from "../controllers/user.controller.js";


//making the route
const route = Express.Router();

// route.get('/', (req, res) => {
//     res.json({
//         message: "This router is working and being hosted in localhost:3000"
//     })
// })
// export default route
// //the above could further be modified by shfiting the req and res to onother file so that all the contollers will be at the same place and making our files componented


//use test from the controller
route.get('/', test)

export default route