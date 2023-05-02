const {UserModel} = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {redisClient} = require("../redis/redis");

const signup = async (req,res) =>{
    try {
        const {email,password, name} = req.body

        const isUserPresent = await UserModel.findOne({email});

        if(isUserPresent){
            return res.status(400).send({msg: "User already present , Please Login"})
        }

        const hash = await bcrypt.hash(password,4);

        const newUser = new UserModel({email,name,password:hash});
        await newUser.save();

        res.status(200).send({msg:`Signup Seccessfull`, newUser: newUser})

    } catch (err) {
        res.status({msg:"Something Went Wrong", err: err.message})
    }
}

const login = async(req,res) =>{
    try {
        const {email,password} = req.body;

        const isUserPresent = await UserModel.findOne({email});
        if(!isUserPresent){
            return res.status(400).send({msg:"User not Present , Please SingUp"});
        }

        const isPasswordCorrect = bcrypt.compareSync(password, isUserPresent.password)

        if(!isPasswordCorrect){
            return res.status(400).send({msg:"Wrong Credential"});
        }

        const token = jwt.sign({userID: isUserPresent._id},process.env.secretKey,{expiresIn:"1m"})
        res.status(200).send({msg: "Login Seccessfull",token: token})
    } catch (err) {
        res.status({msg:"Something Went Wrong", err: err.message})
    }
}

const logout = async (req,res)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if(!token){
          return  res.status(400).send("Token expire");
        }
        await redisClient.set(token,token)
        res.status(200).send(`Logout Seccessfull`)
    } catch (err) {
        res.status({msg:"Something Went Wrong", err: err.message})
    }
}

module.exports = {signup,login,logout}


