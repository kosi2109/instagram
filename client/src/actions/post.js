import * as api from "../api/index";


export const getPosts = ()=> async (dispatch) =>{
    try {
        const {data} = await api.fetchProducts();
        dispatch({type : "FETCH_ALL", payload: {posts:data}})
    } catch (error) {
        console.log(error);
    }
}
