import * as api from "../api/index";
import { COMMENT_DELETE, COMMENT_POST, CREATE_POST, DELETE_POST, END_LOADING, FETCH_POST, LIKE_POST, START_LOADING } from "../constants";


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


export const commentPost = ({id,comment})=> async (dispatch) =>{
    try {
        const {data} = await api.commentPost({id,comment});
        dispatch({type : COMMENT_POST, payload: data})
    } catch (error) {
        console.log(error);
    }
}


export const deleteComment = (id)=> async (dispatch) =>{
    try {
        const {data} = await api.deleteComment(id);
        dispatch({type : COMMENT_DELETE, payload: data})
    } catch (error) {
        console.log(error);
    }
}

