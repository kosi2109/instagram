import * as api from "../api/index";
import { CREATE_POST, FETCH_POST } from "../constants";


export const getPosts = ()=> async (dispatch) =>{
    try {
        const {data} = await api.fetchAllPosts();
        dispatch({type : "FETCH_ALL", payload: {posts:data}})
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (form)=> async (dispatch) =>{
   
    try {
        const {data} = await api.createPost(form);
        dispatch({type : CREATE_POST, payload: data})
    } catch (error) {
        console.log(error);
    }
}


export const getPost = (id)=> async (dispatch) =>{
    try {
        const {data} = await api.fetchPost(id);
        dispatch({type : FETCH_POST, payload: data})
    } catch (error) {
        console.log(error);
    }
}


