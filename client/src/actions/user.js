import * as api from "../api/index";
import { END_LOADING, GET_USER_PROFILE, START_LOADING } from "../constants";

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