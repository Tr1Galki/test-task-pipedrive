const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieSession = require('cookie-session')


const config = require('./config')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


app.use(cookieSession({
    name: 'session',
    keys: ['key1']
}))




const pipedrive = require('pipedrive')

const apiClient = new pipedrive.ApiClient()

let oauth2 = apiClient.authentications.oauth2
oauth2.clientId = config.clientID
oauth2.clientSecret = config.clientSecret
oauth2.redirectUri = config.callbackURL

const port = config.port
const host = config.host

app.listen(port, () => {
    console.log(`Server listens https://${host}:${port}`)
}) 

app.get('/', async (req, res) => {
    if (req.session.accessToken !== null && req.session.accessToken !== undefined) {
        // token is already set in the session
        // now make API calls as required
        // client will automatically refresh the token when it expires and call the token update callback
        const api = new pipedrive.DealsApi(apiClient)
        const deals = await api.getDeals()

        res.send(deals)
    } else {
        const authUrl = apiClient.buildAuthorizationUrl()
        
        res.redirect(authUrl)
    }
})

app.get('/callback', (req, res) => {
    const authCode = req.query.code
    const promise = apiClient.authorize(authCode)

    promise.then(() => {
        req.session.accessToken = apiClient.authentications.oauth2.accessToken
        res.redirect('/')
    }, (exception) => {
        // error occurred, exception will be of type src/exceptions/OAuthProviderException
    })
})
