import {GET_USER_PROFILE ,EDIT_PROFILE, GET_OWN_PROFILE, FOLLOW_CONTROl ,SEARCH_USER ,USER_LOADING ,USER_LOADING_END, GET_FOLLOWERS, GET_FOLLOWINGS } from "../constants";

export default (state = {user:null,loading:false}, action)=>{
    switch (action.type){
        case USER_LOADING:
            return {...state,loading:true}
        case USER_LOADING_END:
            return {...state,loading:false}
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
        case SEARCH_USER:
            return {...state,users:action.payload}
        case GET_FOLLOWERS:
            return {...state,followers:action.payload.followers}
        case GET_FOLLOWINGS:
            return {...state,followings:action.payload.followings}
        default:
            return state
    }
}