const ioRedis = require("ioredis")

const config = require('./config')

const redis = new ioRedis(config.redisURL)

console.log("Connected to Redis")

module.exports = redis