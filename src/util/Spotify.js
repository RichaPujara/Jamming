

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
            const expiryTime = accessTokenExpiry[1];
            window.setTimeout(() => accessToken = '', expiryTime * 1000);
            window.history.pushState('Access Token', null, '/')
            return accessToken;
        } else {
            window.location = `https://api.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }).then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse) {
                    return []
                }
                jsonResponse.map(track => {
                    return {
                        ID: track.id,
                        Name: track.name,
                        Artist: track.artists[0].name,
                        Album: track.album.name,
                        URI:track.uri
                    }
                
                })
        })
        
    }
}

export default Spotify;