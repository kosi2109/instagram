import { CREATE_POST } from "../constants"

export default (state = {posts: []}, action) => {
    switch (action.type){
        case "FETCH_ALL":
            return {...state,posts:action.payload.posts}
        case CREATE_POST:
            console.log(action.payload);
            return {...state,post:action.payload}
        default:
            return state
    }
}