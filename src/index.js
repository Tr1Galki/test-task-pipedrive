const express = require('express')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const pipedrive = require('pipedrive')

const config = require('./config')
// const redis = require('./redis')
const authApi = require('./auth.js')


const app = express()

app.set('views', './views');
app.engine('html', require('ejs').renderFile)

app.use(cookieParser());

app.use(cookieSession({
    name: 'session',
    keys: ['key1']
}))


const client = authApi.initAPIClient({})
    
const port = config.port
const host = config.host

app.listen(port, () => {
    console.log(`Server listens https://${host}:${port}`)
})

app.get('/', async (req, res) => {
    if (req.session.accessToken !== null && req.session.accessToken !== undefined) {
        // const api = new pipedrive.DealsApi(apiClient)
        // const deals = await api.getDeals()

        // res.send(deals)
        res.render('form.html')
    } else {
        const authUrl = client.buildAuthorizationUrl()

        console.log("no token in session, go to " + authUrl)

        res.redirect(authUrl)
    }
})

app.get('/callback', async (req, res) => {
    const authCode = req.query.code
    
    const promise = client.authorize(authCode)

    console.log('req.query = ' + req.query)

    console.log('authCode = ' + authCode)

    promise.then(() => {
        req.session.accessToken = client.authentications.oauth2.accessToken
        res.redirect('/')
    }, (exception) => {
        console.log(exception)
    })
})


