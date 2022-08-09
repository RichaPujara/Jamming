const clientId = process.env.CLIENT_ID
const redirectURI = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenFromUrl = window.location.href.match(/access_token=([^&]*)/)

        const accessTokenExpiry = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenExpiry && accessTokenFromUrl) {
            accessToken = accessTokenFromUrl[1];
            expiryTime = accessTokenExpiry[1];
            window.setTimeout(() => accessToken = '', expiryTime * 1000);
            window.history.pushState('Access Token', null, '/')
            return accessToken;
        } else {
            window.location = `https://api.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    }
}

export default Spotify;