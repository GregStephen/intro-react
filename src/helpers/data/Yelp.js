import axios from 'axios';
import yelpKey from '../apiKeys.json';


const getBusinessNearMe = (latitude, longitude, search) => new Promise((resolve, reject) => {
  axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`,
    {
      headers: {
        Authorization: `Bearer ${yelpKey.YelpKeys.apiKey}`,
      },
      params: {
        term: search,
        latitude,
        longitude,
      },
    })
    .then((res) => {
      resolve(res.data);
    })
    .catch(err => reject(err));
});

export default { getBusinessNearMe };
