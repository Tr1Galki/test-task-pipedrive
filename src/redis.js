const ioRedis = require("ioredis")

const config = require('./config')

const redis = new ioRedis(config.redisURL)

console.log("Connected to Redis")


//
renderRedis.set("animal", "mouse")

renderRedis.get("animal").then((result) => {
    console.log(`Result for key animal: ${result}`)
})

renderRedis.del("animal")

renderRedis.get("animal").then((result) => {
    console.log(`Result for key animal: ${result}`)
})

renderRedis.set("animal", {
    name: "mouse",
    size: 14
})

renderRedis.get("animal").then((result) => {
    console.log(`Result for key animal: ${result}`)
})
//


module.exports = redis