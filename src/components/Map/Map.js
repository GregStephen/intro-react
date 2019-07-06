/* eslint-disable global-require */
import React from 'react';
import L from 'leaflet';
import './Map.scss';

// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class Map extends React.Component {
  componentDidMount() {
    this.map = L.map('map', {
      center: [36.16, -86.7],
      zoom: 11,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
    this.layer = L.layerGroup().addTo(this.map);
    this.updateMarkers(this.props.markersData);
  }

  componentDidUpdate({ markersData }) {
    if (this.props.markersData !== markersData) {
      this.updateMarkers(this.props.markersData);
    }
  }

  updateMarkers(markersData) {
    this.layer.clearLayers();
    markersData.forEach((marker) => {
      L.marker(marker.latLng, { title: marker.title }).addTo(this.layer);
    });
  }

  render() {
    return (
      <div className="Map" id="map">
      </div>
    );
  }
}

export default Map;
