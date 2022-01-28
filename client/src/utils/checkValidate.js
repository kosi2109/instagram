export const emailCheck = (email)=>{
    
    var mail_format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/ 
    if(email.match(mail_format)){
        return true
    }else{

        return false
    }
    
}

export const userNameCheck = (username)=>{
    var username_format = /^(?=.{4,20}$)(?![.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
    if(username.match(username_format)){
        return true
    }else{
        return false
    }
}

