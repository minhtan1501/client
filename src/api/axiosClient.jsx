import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // // Any status codes that falls outside the range of 2xx cause this function to trigger
    // // Do something with response error
    const { config, status, data } = error.response;
    console.log(error.response)
    const URLS = ['/user/register', '/user/login','/api/products'];
    if (URLS.includes(config.url) && status === 400) {
      console.log(data.message)
      throw new Error(data.message);
    }
     return Promise.reject(error.response);

  }
);
export default axiosClient;