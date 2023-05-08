import axios from 'axios'
const token = localStorage.getItem('token')
console.log("localStorage.getItem('token')", localStorage.getItem('token'));
const instance = axios.create({
    baseURL: 'https://foodapis.techenablers.info/api/admin',
    timeout:6000000,
        // headers:{
        //     Authorization : `Bearer` + localStorage.getItem('token'),
        //     "Content-Type": "multipart/form-data",
        // }
      //   headers:{
      //     Authorization : `Bearer ${localStorage.getItem('token')}`,
      //     "Content-Type": "application/json"
      //  }
    
})
// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    alert("hi");
    // Do something before request is sent
    config.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
    config.headers.common["Content-Type"] = "application/json";
    console.log()
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
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