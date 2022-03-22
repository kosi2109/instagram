import * as api from "../api/index";
import { ERROR, EDIT_PROFILE, END_LOADING, FOLLOW_CONTROl, GET_OWN_PROFILE, GET_USER_PROFILE, START_LOADING, SUCCESS } from "../constants";

export const getUserProfile = (userName)=> async (dispatch) =>{
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.getProfile(userName);
        
        dispatch({type : GET_USER_PROFILE, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error);
    }
}


export const getOwnProfile = (userName)=> async (dispatch) =>{
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.getProfile(userName);
        dispatch({type : GET_OWN_PROFILE, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error);
    }
}


export const changeUserInfo = (form)=> async (dispatch) =>{
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.changeUserInfo(form);
        dispatch({type : EDIT_PROFILE,payload:data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error);
    }
}


export const followerControl = (userName)=> async (dispatch) =>{
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.followerControl(userName);
        console.log(data);
        dispatch({type : FOLLOW_CONTROl,payload:data})
        dispatch({type: END_LOADING})
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}


export const changePassword = (form)=> async (dispatch) =>{
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.changePassword(form);
        dispatch({type : SUCCESS, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}


export const changeProfilePic = (form)=> async (dispatch) =>{
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.changeProfileImage(form);
        console.log(data);
        dispatch({type: END_LOADING})
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}
