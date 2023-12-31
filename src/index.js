const express = require('express')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const pipedrive = require('pipedrive')
const AppExtensionsSDK = require('@pipedrive/app-extensions-sdk').default


const config = require('./config')
// const redis = require('./redis')


const app = express()

app.use(cookieParser());

app.use(cookieSession({
    name: 'session',
    keys: ['key1']
}))

const port = config.port
const host = config.host

app.listen(port, () => {
    console.log(`Server listens https://${host}:${port}`)
})

const apiClient = new pipedrive.ApiClient()

let oauth2 = apiClient.authentications.oauth2
oauth2.clientId = config.clientID
oauth2.clientSecret = config.clientSecret
oauth2.redirectUri = config.callbackURL


app.get('/', async (req, res) => {
    if (req.session.accessToken !== null && req.session.accessToken !== undefined) {
        // const api = new pipedrive.DealsApi(apiClient)
        // const deals = await api.getDeals()

        // res.send(deals)

        res.render('form.html')
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
        console.log(exception)
    })
})


