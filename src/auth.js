const pipedrive = require('pipedrive')

const config = require('./config')

const initAPIClient = ({ accessToken = '', refreshToken = '' }) => {
    const client = new pipedrive.ApiClient()
    const oAuth2 = client.authentications.oauth2

    oAuth2.clientId = config.clientID
    oAuth2.clientSecret = config.clientSecret
    oAuth2.redirectUri = config.clientSecret
    if (accessToken) oAuth2.accessToken = accessToken;
    if (refreshToken) oAuth2.refreshToken = refreshToken;

    return client;
}

const getLoggedInUser = async (client) => {
    const api = new pipedrive.UsersApi(client)
    const data = await api.getCurrentUser()
    log.info('Currently logged-in user details obtained')
    return data
}

const updateTokens = (client, token) => {
    const oAuth2 = client.authentications.oauth2;
    oAuth2.accessToken = token.access_token;
    oAuth2.refreshToken = token.refresh_token;
}

const authApi = {
    initAPIClient: initAPIClient,
    getLoggedInUser: getLoggedInUser,
    updateTokens: updateTokens
}

module.exports = authApi