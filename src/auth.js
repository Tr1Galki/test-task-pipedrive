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

const updateTokens = (client, token) => {
    const oAuth2 = client.authentications.oauth2;
    oAuth2.accessToken = token.access_token;
    oAuth2.refreshToken = token.refresh_token;
  }

const authApi = {
    initAPIClient: initAPIClient,
    updateTokens: updateTokens
}

module.exports = authApi