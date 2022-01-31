import { CLR_ERR } from "../constants";

export const clearError = ()=> async (dispatch) =>{
    try {
        dispatch({type : CLR_ERR})
    } catch (error) {
        console.log(error);
    }
}