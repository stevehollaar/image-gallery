// Babel polyfill includes promises - required for whatwg-fetch
import 'babel-polyfill';
// Fetch polyfill
import 'whatwg-fetch';

import ImageModel from 'ImageModel';

const IMGUR_CLIENT_ID = '7e098583985e3a0';

export function fetchImages({ subReddit, page = 0 }) {
  return fetch(`https://api.imgur.com/3/gallery/r/${subReddit}/top/all/${page}`, {
    headers: {
      Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
    },
  })
    .then(response => response.json())
    .then(json => {
      if (!json.success) {
        throw new Error('Failed to load data');
      }
      return json.data
        .map(imageData => new ImageModel(imageData))
        .filter(({ isEmpty, sfw }) => !isEmpty && sfw);
    })
    .catch(error => {
      window.alert(`Error fetching images: ${error}`);
    });
}
