import * as api from "../api/index";
import { CREATE_POST, DELETE_POST, END_LOADING, FETCH_POST, LIKE_POST, START_LOADING } from "../constants";


export const getPosts = ()=> async (dispatch) =>{
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchAllPosts();
        dispatch({type : "FETCH_ALL", payload: {posts:data}})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (form)=> async (dispatch) =>{
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.createPost(form);
        dispatch({type : CREATE_POST, payload: data})
        dispatch({type: END_LOADING})
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


export const deletePost = (form)=> async (dispatch) =>{
    try {
        const {data} = await api.deletePost(form);
        dispatch({type : DELETE_POST, payload: data})
    } catch (error) {
        console.log(error);
    }
}


export const likePost = (id)=> async (dispatch) =>{
    try {
        const {data} = await api.likePost(id);
        dispatch({type : LIKE_POST, payload: data})
    } catch (error) {
        console.log(error);
    }
}

