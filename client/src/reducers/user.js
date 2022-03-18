import {GET_USER_PROFILE } from "../constants";

export default (state = {user:null}, action)=>{
    switch (action.type){
        case GET_USER_PROFILE:
            return {...state,user:action.payload.user,posts:action.payload.posts}
        default:
            return state
    }
}