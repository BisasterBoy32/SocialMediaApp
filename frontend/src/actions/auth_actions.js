import axios from "axios"
import { reset } from 'redux-form';

import { GET_USER, LOGIN, USER_LOADING, LOGIN_ERROR,
    GET_USER_ERROR, LOGOUT, REGISTER, REGISTER_ERROR}
from "./types"

export const getuser = () => {
    return (dispatch ,getState) => {
        const config = setConfig(getState)
        dispatch({ type: USER_LOADING })
        axios.get("auth/user/",config).then( (res) => {
            dispatch({
                type : GET_USER,
                payload : res.data
            })
        } , (err) => dispatch({
            type : GET_USER_ERROR,
            payload : err.response
        })
    )}
}

export const login = (values ,callBack) => {
    return (dispatch) => {
        axios.post("auth/log-in/",values).then( (res) => {
            dispatch({
                type : LOGIN,
                payload : res.data
            })
        } ,(err) =>{
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data
            })
            callBack()
        } 
    )}
}

// register
export const register = (values ,callBack) => {
    return (dispatch) => {
        axios.post("auth/register/" ,values).then( (res) => {
            dispatch({
                type : REGISTER,
                payload : res.data
            })
            // clear the data from the form
            dispatch(reset('register'))
        }, (err) => {
            dispatch({
                type: REGISTER_ERROR,
                payload: err.response.data
            })
            callBack()
        }
    )}
}

export const logout = () => {
    return (dispatch ,getState) => {
        const config = setConfig(getState)
        axios.post("auth/log-out/",null,config).then( (res) => {
            dispatch({ type : LOGOUT })
        } ,(err) => console.log(err.response.data))
    }
}  

// helper function ---> set the config and the headers for axios request
export const setConfig = (getState) =>{
    let config = null;
    const token =  getState().authReducer.token
    if (token){
        config = {
            headers : {
                Authorization : `token ${token}`
            }
        }
    }
    return config
}