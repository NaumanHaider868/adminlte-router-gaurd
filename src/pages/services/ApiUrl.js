// import axios from 'axios';
// class ServiceClass {
   

//     getAPI(url) {
//         return axios.get(url, {
//             headers: {
//                 Authorization: 'Bearer ' + localStorage.getItem('token')
//             }
//         }) 
//     }
//     getEditAPI(urls) {
//         return axios.get(urls, {
//             headers: {
//                 Authorization: 'Bearer ' + localStorage.getItem('token'),'Content-type': 'application/json',
//             }
//         })
//     }
//     getPostAPI(postUrl, data) {
//         return axios.post(postUrl, data, {
//             headers: {
//                 Authorization: 'Bearer ' + localStorage.getItem('token'),'Content-type': 'application/json',
//             }
//         })
//     }
//     getPutAPI(putUrl, data) {
//         return axios.delete(putUrl, data, {
//             headers: {
//                 Authorization: 'Bearer ' + localStorage.getItem('token'),'Content-type': 'application/json',
//             }
            
//         })
        
//     }
// }

// const apiService = new ServiceClass();
// export default apiService;

import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://foodapis.techenablers.info/api/admin',
        headers:{
            Authorization : `Bearer` + localStorage.getItem('token'),
            "Content-Type": "multipart/form-data",
        }
    
})

export default instance