import { CREATE_POST, END_LOADING, FETCH_POST, START_LOADING , POST_CREATE_LOADING ,POST_CREATE_FINISH, DELETE_POST } from "../constants"

export default (state = {posts: [],loading:false}, action) => {
    
    switch (action.type){  
        case START_LOADING:
            return {...state,loading:true}
        case END_LOADING:
            return {...state,loading:false}
        case "FETCH_ALL":
            return {...state,posts:action.payload.posts}
        case DELETE_POST:
            return {...state,success:action.payload} 
        case FETCH_POST:
            return {...state,post:action.payload}   
        case CREATE_POST:
            return {...state,post:action.payload,loading:false}
        default:
            return state
    }
    
}