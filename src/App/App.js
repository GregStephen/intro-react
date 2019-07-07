import React from 'react';
import Map from '../components/Map/Map';
import './App.scss';
import 'leaflet/dist/leaflet.css';
import Yelp from '../helpers/data/Yelp';

import ResultRow from '../components/ResultRow/ResultRow';

class App extends React.Component {
  state = {
    yelpResults: [],
    latitude: 36.1627,
    longitude: -86.7816,
    search: 'pizza',
    markersData: [
      { latLng: { lat: 36.1, lng: -86.78 }, title: 1 },
    ],
  };

  // addMarker = () => {
  //   const { markersData } = this.state;
  //   const lastMarker = markersData[markersData.length - 1];

  //   this.setState({
  //     markersData: [
  //       ...markersData,
  //       {
  //         title: +lastMarker.title + 1,
  //         latLng: {
  //           lat: lastMarker.latLng.lat + 0.0001,
  //           lng: lastMarker.latLng.lng + 0.0001,
  //         },
  //       },
  //     ],
  //   });
  // };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchYelp = (e) => {
    const { latitude, longitude, search } = this.state;
    e.preventDefault();
    Yelp.getBusinessNearMe(latitude, longitude, search)
      .then(((res) => {
        const yelpRes = res;
        console.error(yelpRes);
        this.setState({ yelpResults: yelpRes });
        this.setState({ markersData: [] });
        this.state.yelpResults.map(result => (
          this.setState({
            markersData: [
              ...this.state.markersData,
              {
                title: result.name,
                latLng: { lat: result.coordinates.latitude, lng: result.coordinates.longitude },
              }],
          })
        ));
      }))
      .catch(err => console.error('cant get places', err));
  }

  render() {
    const { yelpResults, markersData } = this.state;

    const resultComponents = yelpResults.map(result => (
      <ResultRow key={ result.id } result={ result }/>
    ));
    return (
      <div className="App">
        <div className="mapDiv">
          <Map markersData={ markersData}/>
          {/* <button
          onClick={this.addMarker}
        >
          Add marker
        </button>
        <ul>Markers data:
          {markersData.map(marker => (
            <li key={marker.title}>
              {marker.title},
              lat: {marker.latLng.lat},
              lng: {marker.latLng.lng},
            </li>
          ))}
        </ul> */}
        </div>
        <header className="App-header">
          <form onSubmit={this.searchYelp}>
            <input type="input" name="search" id="search" value={this.state.search} onChange={this.handleChange}></input>
            <ul>
              { resultComponents }
            </ul>
            <button type="submit" className="btn btn-danger">Search</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
