const clientId = "2f9f8d57b208469293b61038da6490f8";
const redirectURI = "https://richa-spotify-jamming.surge.sh/";
const scope = "playlist-modify-public";
const state = "loggedIn";
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenFromUrl =
      window.location.href.match(/access_token=([^&]*)/);

    const accessTokenExpiry = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenExpiry && accessTokenFromUrl) {
      accessToken = accessTokenFromUrl[1];
      const expiryTime = accessTokenExpiry[1];
      window.setTimeout(() => (accessToken = ""), expiryTime * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      window.location =
        "https://accounts.spotify.com/authorize" +
        "?response_type=token" +
        "&client_id=" +
        encodeURIComponent(clientId) +
        "&scope=" +
        encodeURIComponent(scope) +
        "&redirect_uri=" +
        encodeURIComponent(redirectURI) +
        "&state=" +
        encodeURIComponent(state);
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },

  savePlayList(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }
    let accessToken = Spotify.getAccessToken();
    let userId;
    return fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log("user response: " + JSON.stringify(jsonResponse));
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ name: playlistName }),
        })
          .then((resp) => resp.json())
          .then((jsonResp) => {
            console.log("create playlist response: " + JSON.stringify(jsonResp));
            let playlistId = jsonResp.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: {
                  Authorization: "Bearer " + accessToken,
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ uris: trackURIs }),
              }
            );
          });
      });
  }
}

export default Spotify;
