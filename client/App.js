import React, { Component }  from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true: false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  // API Request (make a request and create a promise)
  // see spotify-web-api-js
  // go to spotify and start a song to hear a song playing
  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        console.log('response from getMyCurrentPlaybackstate', response);
        console.log('songname', response.item.name);
        this.setState({
          nowPlaying: {
            name: response.item.name, 
            albumArt: response.item.album.images[0].url
          }
        })
      })
  }

  render() {
    return (
      <div className='App'>
        <a href='http://localhost:8888'> Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt}
          style= {{ height: 150 }}/>
        </div>
        { this.state.loggedIn && 
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>}
      </div>
    );
  }
}

export default App;