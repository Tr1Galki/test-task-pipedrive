require('dotenv').config()

module.exports = {
	clientID: process.env.CLIENT_ID || "<YOUR_CLIENT_ID>",
	clientSecret: process.env.CLIENT_SECRET || "<YOUR_CLIENT_SECRET>",
	callbackURL: process.env.CALLBACK_URL || "<YOUR_CALLBACK_URL>",
	port: process.env.PORT || 3000,
	host: process.env.HOST || "localhost",
	redisURL: process.env.REDIS_URL || '127.0.0.1:6379'
}
