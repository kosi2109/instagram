import axio from "axios";

const API = axio.create({baseURL : "http://localhost:8000/"})

const config = {
  headers: {
      'content-type': 'multipart/form-data'
  }
};

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
export const createPost = (form) => API.post(`/posts`,form,config);


// auth
export const login = (formdata) => API.post(`/users/login`,formdata);
export const logout = () => API.post(`/users/logout`);
export const register = (formdata) => API.post(`/users/register`,formdata);
export const sendCode = (formdata) => API.post(`/users/sendCode`,formdata);
export const check = (formdata) => API.post(`/users/check`,formdata);
export const resetCodeSent = (email) => API.post(`/users/resetCode-sent`,{email});
export const resetCodeComfirm = (form,token) => API.post(`/users/resetCode-verify/${token}`,form);











