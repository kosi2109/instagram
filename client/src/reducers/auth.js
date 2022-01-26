export default (state = {auth:null}, action)=>{
    switch (action.type){
        case "LOGIN":
            localStorage.setItem("profile",JSON.stringify(action.payload))
            return {...state,auth:action.payload}
        default:
            return state
    }
}