import { ERROR, CLR_ERR, SUCCESS } from "../constants";

export default (state={error:null,success:null}, action)=>{
    switch (action.type){
        case SUCCESS:
            return {...state,success:action.payload.success}
        case ERROR:
            return {...state,error:action.payload}
        case CLR_ERR:
            return {error:null,success:null}
        default:
            return state
    }
}