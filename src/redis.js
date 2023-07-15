const ioRedis = require("ioredis")

const config = require('./config')

const redis = new ioRedis(config.redisURL)

console.log("Connected to Redis")


//
redis.set("animal", "mouse")

redis.get("animal").then((result) => {
    console.log(`Result for key animal: ${result}`)
})

redis.del("animal")

redis.get("animal").then((result) => {
    console.log(`Result for key animal: ${result}`)
})

redis.set("animal", {
    name: "mouse",
    size: 14
})

redis.get("animal").then((result) => {
    console.log(`Result for key animal: ${result}`)
})
//


module.exports = redis