import * as api from "../api/index";
import { CREATE_POST } from "../constants";


export const getPosts = ()=> async (dispatch) =>{
    try {
        const {data} = await api.fetchProducts();
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


