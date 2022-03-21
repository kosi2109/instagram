import {GET_USER_PROFILE ,EDIT_PROFILE, GET_OWN_PROFILE, FOLLOW_CONTROl } from "../constants";

export default (state = {user:null}, action)=>{
    switch (action.type){
        case FOLLOW_CONTROl:   
            return {...state,follow:action.payload}
        case GET_OWN_PROFILE:   
            return {...state,profile:action.payload.user}
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