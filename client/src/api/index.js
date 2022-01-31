import axio from "axios";

const API = axio.create({baseURL : "http://localhost:8000/"})


API.interceptors.request.use((req)=>{
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`;
      }
    
      return req;
})


// posts
export const fetchProducts = () => API.get(`/posts`);



// auth
export const login = (formdata) => API.post(`/users/login`,formdata);
export const logout = () => API.post(`/users/logout`);
export const register = (formdata) => API.post(`/users/register`,formdata);
export const sendCode = (formdata) => API.post(`/users/sendCode`,formdata);
export const check = (formdata) => API.post(`/users/check`,formdata);













