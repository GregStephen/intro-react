import React from 'react';
import './App.scss';
import Yelp from '../helpers/data/Yelp';


class App extends React.Component {
  state = {
    latitude: 36.1627,
    longitude: -86.7816,
    search: 'pizza',
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchYelp = (e) => {
    const { latitude, longitude, search } = this.state;
    e.preventDefault();
    Yelp.getBusinessNearMe(latitude, longitude, search)
      .then(((res) => {
        console.error(res);
      }))
      .catch(err => console.error('cant get places', err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.searchYelp}>
            <input type="input" name="search" id="search" value={this.state.serach} onChange={this.handleChange}></input>
            <button type="submit" className="btn btn-danger">Search</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
