import "./TrackList.css"
import React from "react";
import Track from "../Track/Track"

class TrackList extends React.Component { 
    
    render() {
        console.log(
            "Tracks: " + JSON.stringify(this.props.tracks));
        return (
          <div className="TrackList">
            {this.props.tracks.map((track) => (
                <div>
                    <Track track={track} key={track.id} onAdd={this.props.onAdd } /> 
                 </div>
            ))}
          </div>
        );
    }
}

export default TrackList;