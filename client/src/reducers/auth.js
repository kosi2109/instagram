import { REGISTER , LOGIN , LOGOUT } from "../constants";

export default (state = {auth:null}, action)=>{
    switch (action.type){
        case REGISTER:
            return {...state,auth:action.payload}
        case LOGIN:
            localStorage.setItem("profile",JSON.stringify(action.payload))
            return {...state,auth:action.payload}
        case LOGOUT:
            localStorage.removeItem("profile")
            return {...state,auth:null}
        default:
            return state
    }
}