import * as api from "../api"


export const register = (formData,navigate)=> async (dispatch) =>{
    try {
        const {data} = await api.register(formData);
        
        dispatch({type : "REGISTER", payload: data})
        navigate('/accounts/login')
    } catch (error) {
        console.log(error);
    }
}

export const login = (formData,navigate)=> async (dispatch) =>{
    try {
        const {data} = await api.login(formData);
        dispatch({type : "LOGIN", payload: data})
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}


export const logout = (navigate)=> async (dispatch) =>{
    try {
        await api.logout();
        dispatch({type : "LOGOUT"})
        navigate('/accounts/login')
    } catch (error) {
        console.log(error);
    }
}