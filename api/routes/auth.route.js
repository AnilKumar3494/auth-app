import Express from "express";
import { authSignUp } from "../controllers/auth.controller.js";

const route = Express.Router();

//we use post method for /sign-up
//here for post method we cannot use the browser to test out API route
//so we can use software like postman or insomia
//when we enter json and send it -- we will get undefined intially as by dedault we cannot send any json to our file
//so, inorder to use JSON we need to add app.use(express.json) (i guess) in our inddex.js file
//for post method we cannot use the terminal
route.post('/sign-up', authSignUp)

export default route