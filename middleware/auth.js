const jwt = require("jsonwebtoken");
const {redisClient} = require("../redis/redis");

const auth = async (req,res,next) =>{
    try {
        const token = req.headers?.authorization?.split(" ")[1];

        if(!token){
            return res.status(400).send("Please login again");
        }
        const isTokenValild =await jwt.verify(token,process.env.secretKey);
        if(!isTokenValild){
            return res.status(400).send("Authentication failed , please login again")
        }
        const isTokenBlacklisted = await redisClient.get(token);
         if(isTokenBlacklisted){
            return res.send("Unauthorise");
         }

         next()
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
}

module.exports = {
    auth
}