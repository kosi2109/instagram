import * as api from "../api"
import { LOGIN , REGISTER , LOGOUT, ERROR, CHECK_AUTH} from "../constants";

export const register = (formData,navigate)=> async (dispatch) =>{
    try {
        const {data} = await api.register(formData);
        
        dispatch({type : REGISTER, payload: data})
        navigate('/accounts/login')
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}

export const checkAuth = (formData,nextPage)=> async (dispatch) =>{
    try {
        const {data} = await api.check(formData);
        dispatch({type : CHECK_AUTH , payload: data})
        nextPage()
    } catch (error) {
        console.log(error);
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}

export const sendCode = (formData)=> async (dispatch) =>{
    try {
        await api.sendCode(formData);
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}

export const login = (formData,navigate)=> async (dispatch) =>{
    try {
        const {data} = await api.login(formData);
        dispatch({type : LOGIN, payload: data})
        navigate('/')
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}

export const resetCodeSent = (email,navigate)=> async (dispatch) =>{
    
    try {
        await api.resetCodeSent(email);
        navigate('/accounts/password/challenge')
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}

export const resetCodeComfirm = (form,token,navigate)=> async (dispatch) =>{
    
    try {
        const {data} = await api.resetCodeComfirm(form,token);
        dispatch({type : LOGIN, payload: data})
        navigate('/')
    } catch (error) {
        dispatch({type : ERROR, payload: error.response.data.error})
    }
}



export const logout = (navigate)=> async (dispatch) =>{
    try {
        await api.logout();
        dispatch({type : LOGOUT})
        navigate('/accounts/login')
    } catch (error) {
        console.log(error);
    }
}