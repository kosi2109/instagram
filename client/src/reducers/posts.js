import { CREATE_POST, FETCH_POST } from "../constants"

export default (state = {posts: []}, action) => {
    switch (action.type){
        case "FETCH_ALL":
            return {...state,posts:action.payload.posts}
        case FETCH_POST:
            return {...state,post:action.payload}
        case CREATE_POST:
            return {...state,post:action.payload}
        default:
            return state
    }
}