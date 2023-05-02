const redis = require("redis");
const ioredis = require("ioredis");

const redisClient = redis.createClient();

redisClient.on("connect", async ()=>{
    console.log(`Connected to Redis`);
})

redisClient.on("error",(err)=>{
    console.log(err);
})

redisClient.connect();

module.exports = {
    redisClient
}