import {GET_USER_PROFILE ,EDIT_PROFILE } from "../constants";

export default (state = {user:null}, action)=>{
    switch (action.type){
        case GET_USER_PROFILE:
            return {...state,user:action.payload.user,posts:action.payload.posts}
        case EDIT_PROFILE:
            let profile = JSON.parse(localStorage.getItem("profile"))
            profile = {...profile,fullName:action.payload.fullName,userName:action.payload.userName,email:action.payload.email,
                phone:action.payload.phone,gender:action.payload.gender}
            localStorage.setItem('profile',JSON.stringify(profile))
            return {...state,user:action.payload}
        default:
            return state
    }
}