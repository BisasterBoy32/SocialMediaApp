import {
    LOGIN, GET_USER, USER_LOADING, UPDATE_USER_INFO,
    GET_USER_ERROR, LOGOUT, REGISTER, UPDATE_IMAGE}
from "../actions/types"
const init = {
    token : localStorage.getItem("token"),
    isAuthenticated : false,
    user : null,
    isLoading : false,
}

export default function (state = init ,action){
    switch(action.type){
        case LOGIN:
        case REGISTER:
            localStorage.setItem("token" ,action.payload.token)
            return {
                ...state,
                token: localStorage.getItem("token"),
                isAuthenticated : true,
                user : action.payload.user,
            }

        case GET_USER:
        case UPDATE_USER_INFO:
        case UPDATE_IMAGE :
            return {
                ...state,
                isAuthenticated : true,
                user : action.payload,
                isLoading : false
            }

        case USER_LOADING:
            return {
                ...state,
                isLoading : true
            }
        
        case GET_USER_ERROR:
        case LOGOUT:
            localStorage.setItem("token",null)
            return {
                ...state,
                token: localStorage.getItem("token"),
                isAuthenticated: false,
                user: null,
                isLoading: false,
            }
        default:
            return state
    }
}