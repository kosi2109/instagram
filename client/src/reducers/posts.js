import { CREATE_POST, END_LOADING, FETCH_POST, START_LOADING, DELETE_POST, LIKE_POST, COMMENT_POST, COMMENT_DELETE } from "../constants"

export default (state = {posts: [],loading:false,current_page:1,pages:2}, action) => {
    
    switch (action.type){  
        case START_LOADING:
            return {...state,loading:true}
        case END_LOADING:
            return {...state,loading:false}
        case "FETCH_ALL":
            const newPost = [...state.posts,...action.payload.posts]
            return {...state,posts:newPost,pages:action.payload.pages,current_page:action.payload.current_page}
        case DELETE_POST:
            return {...state,success:action.payload} 
        case FETCH_POST:
            return {...state,post:action.payload}   
        case CREATE_POST:
            return {...state,post:action.payload,loading:false}
        case LIKE_POST:
            const post = state.posts.find((post)=> post._id === action.payload.id);
            post.likes = action.payload.likes;
            return {...state,like:action.payload}
        case COMMENT_POST:
        case COMMENT_DELETE:
            return {...state,commented:action.payload} 
        default:
            return state
    }
    
}