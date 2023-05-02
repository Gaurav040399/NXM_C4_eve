const express = require("express");
const { signup,login,logout } = require("../controller/user.controller");
const userRoute = express.Router();

userRoute.post("/signup",signup)
userRoute.post("/login",login)
userRoute.get("/logout",logout)

module.exports = {
    userRoute
}