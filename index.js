const express = require("express");
require("dotenv").config();
const {connection} = require("./database/db");
const { userRoute } = require("./route/user.route");
const { auth } = require("./middleware/auth");
const { logRequest, logger } = require("./middleware/logger");
const { cityRoute } = require("./route/city.route");

const app = express();
app.use(express.json());

app.use(auth)
app.use(logRequest)
app.use("/user",userRoute)
app.use("/city",cityRoute)

app.listen(process.env.PORT,async()=>{
    console.log(`Server is connected to the port ${process.env.PORT}`)
    try {
        await connection 
        console.log(`Connected to Database`)
        logger.log("Connected to redis")
    } catch (err) {
        console.log(` Cannot Connected to Database`)
        logger.log("Cannot connect to redis")
    }
})