import "./SearchResults.css"
import React from "react";
import TrackList from "../TrackList/TrackList";

class SearchResults extends React.Component { 
    render() {
        console.log(
          "SearchResults: " + JSON.stringify(this.props.searchResults)
        );
        return (
          <div className="SearchResults">
            <h2>Results</h2>
                <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false } />
          </div>
        );
    }
}

export default SearchResults;