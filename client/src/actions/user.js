import * as api from "../api/index";
import { ERROR, EDIT_PROFILE, FOLLOW_CONTROl, GET_OWN_PROFILE, GET_USER_PROFILE, SUCCESS, SEARCH_USER ,USER_LOADING ,USER_LOADING_END, GET_FOLLOWERS, GET_FOLLOWINGS } from "../constants";

export const getUserProfile = (userName)=> async (dispatch) =>{
    try {
        dispatch({type: USER_LOADING})
        const {data} = await api.getProfile(userName);
        dispatch({type : GET_USER_PROFILE, payload: data})
        dispatch({type: USER_LOADING_END})
    } catch (error) {
        console.log(error);
    }
}


export const getOwnProfile = (userName)=> async (dispatch) =>{
    try {
        dispatch({type: USER_LOADING})
        const {data} = await api.getProfile(userName);
        dispatch({type : GET_OWN_PROFILE, payload: data})
        dispatch({type: USER_LOADING_END})
    } catch (error) {
        console.log(error);
    }
}


export const changeUserInfo = (form)=> async (dispatch) =>{
    try {
        dispatch({type: USER_LOADING})
        const {data} = await api.changeUserInfo(form);
        dispatch({type : EDIT_PROFILE,payload:data})
        dispatch({type: USER_LOADING_END})
    } catch (error) {
        console.log(error);
    }
}


export const followerControl = (userName)=> async (dispatch) =>{
    try {
        dispatch({type: USER_LOADING})
        const {data} = await api.followerControl(userName);
        console.log(data);
        dispatch({type : FOLLOW_CONTROl,payload:data})
        dispatch({type: USER_LOADING_END})
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}


export const changePassword = (form)=> async (dispatch) =>{
    try {
        dispatch({type: USER_LOADING})
        const {data} = await api.changePassword(form);
        dispatch({type : SUCCESS, payload: data})
        dispatch({type: USER_LOADING_END})
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}


export const changeProfilePic = (form)=> async (dispatch) =>{
    try {
        dispatch({type: USER_LOADING})
        const {data} = await api.changeProfileImage(form);
        
        dispatch({type: USER_LOADING_END})
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}



export const getUsersBySearch = ({userName})=> async (dispatch) =>{
    try {
        dispatch({type: USER_LOADING})
        const {data} = await api.getUsersBySearch(userName);
        dispatch({type:SEARCH_USER,payload: data})
        dispatch({type: USER_LOADING_END})
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}


export const getFollowers = ({userName})=> async (dispatch) =>{
    try {
        dispatch({type: USER_LOADING})
        const {data} = await api.getFollowers(userName);
        dispatch({type:GET_FOLLOWERS,payload: data})
        dispatch({type: USER_LOADING_END})
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}


export const getFollowings = ({userName})=> async (dispatch) =>{
    try {
        dispatch({type: USER_LOADING})
        const {data} = await api.getFollowings(userName);
        dispatch({type:GET_FOLLOWINGS,payload: data})
        dispatch({type: USER_LOADING_END})
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}

