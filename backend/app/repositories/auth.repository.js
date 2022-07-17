export default function authRepository(authModels){

    const getPassword = (username)=> {
        return authModels.getPassword(username);
    }

    const getId = (username)=> {
        return authModels.getId(username);
    }

    const getRole = (user_id)=> {
        return authModels.getRole(user_id);
    }

    const getUsernamePhoto = (user_id)=>{
        return authModels.getUsernamePhoto(user_id)
    }


  

    return {getPassword, getId, getRole , getUsernamePhoto}
}