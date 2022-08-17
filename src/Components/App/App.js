import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import PlayList from "../Playlist/Playlist.js";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playListTracks: [],
    };
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playListTracks;
    if (tracks.find((existingTrack) => existingTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playListTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playListTracks.filter(
      (trackToRemove) => trackToRemove.id !== track.id
    );
    this.setState({ playListTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playListTracks.map((track) => track.uri);
    Spotify.savePlayList(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playListTracks: [],
      });
    });
  }
  v;
  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <PlayList
              playlistName={this.state.playlistName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
