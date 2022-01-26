export default (state = {posts: []}, action) => {
    switch (action.type){
        case "FETCH_ALL":
            return {...state,posts:action.payload.posts}
        default:
            return state
    }
}