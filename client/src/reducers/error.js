import { AUTH_ERR, CLR_ERR } from "../constants";

export default (error=null, action)=>{
    switch (action.type){
        case AUTH_ERR:
            return action.payload
        case CLR_ERR:
            return null
        default:
            return error
    }
}