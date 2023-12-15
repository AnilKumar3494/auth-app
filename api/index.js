// Backend Configuration - first 'npm init -y' to get the package.json file 
// After that install express using 'npm i express'
// Next Created this index.js file as package.json has a "main": "index.js", 

//Since we are using import here we need to set up and to that add 'type: module' in package.json to prevent errors
import express from 'express'

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
