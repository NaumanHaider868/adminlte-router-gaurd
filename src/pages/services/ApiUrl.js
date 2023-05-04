import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://foodapis.techenablers.info/api/admin',
        headers:{
            Authorization : `Bearer` + localStorage.getItem('token'),
            "Content-Type": "multipart/form-data",
        }
    
})
// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            // Clear the token and redirect to the login page
            localStorage.removeItem('token');
            // localStorage.removeItem('login');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);
const api = {

    // get url use 
    get(url) {
      return instance.get(url)
    },
    // post url use 
    post(url,data) {
      return instance.post(url, data)
    },
    // delete url use 
    delete(url) {
      return instance.delete(url)
    }
  };
  export default api;
// export default instance;