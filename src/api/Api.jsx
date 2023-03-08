import axios from 'axios';
const KEY = '29175457-ea8e2c93dbfac842acac0bec2';

export async function apiImages(query, page, perPage) {
  const baseUrl = 'https://pixabay.com/api/';
  const response = await axios.get(
    `${baseUrl}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
  );
  console.log(response.data);
  return response.data;
}



// export { fetchImages };

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const KEY = '29175457-ea8e2c93dbfac842acac0bec2';

// async function fetchImages(query, page, perPage) {
//   const response = await axios.get(
//     `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
//   );
//   return response;
// }
