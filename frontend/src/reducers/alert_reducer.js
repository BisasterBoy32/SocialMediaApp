import { CLOSEALERT, LOGIN_ERROR, LOGIN, REGISTER_ERROR, REGISTER,
    UPDATE_USER_ERROR, POST_CREATED_FAILED, DELETE_POST, EDIT_POST_FAIL ,
    EDIT_POST, UPDATE_USER_INFO, UPDATE_IMAGE}
from "../actions/types"

let msg = null
const init = {
    type : null,
    msg
}

export default function(state = init , action) {
    switch(action.type){

        case UPDATE_USER_ERROR:
            msg = action.payload.username ? action.payload.username.join() : action.payload.error.join()
            return{
                type : 'error',
                msg
            }

        case LOGIN_ERROR:
            if(action.payload.non_field_errors) {
                msg = action.payload.non_field_errors
            } else {
                msg = "Provide Your username and your password"
            }
            return {
                ...state,
                type : "error",
                msg
            }

        case LOGIN:
        case REGISTER:
            msg = `welcome ${action.payload.user.username} Have Fun`
            return {
                ...state,
                type : "success",
                msg
            }
        
        case REGISTER_ERROR:
            msg = "the file you/'ve choosen isn't an image ,provide an image for your profile please"
            return {
                type: "error",
                msg 
            }

        case POST_CREATED_FAILED:
        case EDIT_POST_FAIL:
            msg = action.payload.non_field_errors.join()
            return {
                type: "error",
                msg
            }

        case DELETE_POST:
            msg = 'Post has been deleted succefully'
            return {
                type: "success",
                msg
            }

        case EDIT_POST :
            msg = `Post ${action.payload.title} has been updated succefully`
            return {
                type: "success",
                msg  
            }
        case CLOSEALERT:
            return init

        case UPDATE_USER_INFO:
        case UPDATE_IMAGE:
            msg = `${action.payload.username} your Profile information has been updated succesfully.`
            return {
                type: "success",
                msg
            }

        default :
            return state
    }
}