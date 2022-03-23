import axio from "axios";

const API = axio.create({baseURL : "http://localhost:8000"})

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
export const fetchAllPosts = (page) => API.get(`/posts/?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/show/${id}`);
export const createPost = (form) => API.post(`/posts`,form,config);
export const deletePost = (form) => API.post(`/posts/delete-post`,form);
export const likePost = (id) => API.post(`/posts/like`,id);
export const commentPost = ({id,comment}) => API.post(`/posts/comment`,{id,comment});
export const deleteComment = (id) => API.post(`/posts/comment/delete`,id);

// auth
export const login = (formdata) => API.post(`/users/login`,formdata);
export const logout = () => API.post(`/users/logout`);
export const register = (formdata) => API.post(`/users/register`,formdata);
export const sendCode = (formdata) => API.post(`/users/sendCode`,formdata);
export const check = (formdata) => API.post(`/users/check`,formdata);
export const resetCodeSent = (email) => API.post(`/users/resetCode-sent`,{email});
export const resetCodeComfirm = (form,token) => API.post(`/users/resetCode-verify/${token}`,form);

// user
export const getProfile = (userName) => API.get(`/users/${userName}`);
export const changeUserInfo = (form) => API.patch(`/users/change/user-info`,form);
export const changePassword = (form) => API.post(`/users/change/password`,form);
export const changeProfileImage = (form) => API.post(`/users/change/profile-image`,form);

// follow & following
export const followerControl = (userName) => API.post(`/users/follow-control`,userName);








