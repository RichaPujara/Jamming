import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import PlayList from "../Playlist/Playlist.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: "song1",
          artist: "John Smith",
          album: "Alvin Smith",
          id: "1",
        },
        {
          name: "song2",
          artist: "John Smith",
          album: "Alvin Smith",
          id: "2",
        },
        {
          name: "song3",
          artist: "John Smith",
          album: "Alvin Smith",
          id: "3",
        },
      ],
      playlistName: "My First Playlist",
      playListTracks: [
        {
          name: "Song3",
          artist: "John Smith",
          album: "Alvin Smith",
          id: "3",
        },
        {
          name: "Song4",
          artist: "John Smith",
          album: "Alvin Smith",
          id: "4",
        },
        {
          name: "Song5",
          artist: "John Smith",
          album: "Alvin Smith",
          id: "5",
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (
      this.state.playListTracks.find(
        (existingTrack) => existingTrack.id === track.id
      )
    ) {
      return;
    }
    this.setState({ playListTracks: this.state.playListTracks.push(track) });
  }

  removeTrack(track) {
    let tracks = this.state.playListTracks.filter(trackToRemove => trackToRemove.id !== track.id)
    this.setState({ playListTracks: tracks });
  }

  updatePlaylistName(name) { 
    this.setState({playlistName: name})
  }

  savePlayList() {
    let trackURIs = this.state.playListTracks.map(track => track.uri);
    // savePlayList(trackURIs,playlistName);
  }

  search(term) {
    console.log(term);
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <PlayList
              playlistName={this.state.playlistName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
              onnameChange={this.updatePlaylistName}
              onSave ={this.savePlayList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
