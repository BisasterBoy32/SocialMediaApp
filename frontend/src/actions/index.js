import axios from "axios"

import { CLOSEALERT, UPDATE_USER_INFO, UPDATE_USER_ERROR, CLEAR_REDUX_FORM,
    UPDATE_IMAGE, UPDATE_IMAGE_FAIL, MAKE_LIKE, UPDATE_LIKE ,DELETE_LIKE}
from "./types"
import { setConfig } from "./auth_actions"
import { bindActionCreators } from "C:/Users/BisasterBoy/AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux"

export const closeAlert = () => {
    return (dispatch) =>{
        dispatch({
            type: CLOSEALERT,
            payload : null
         })     
    } 
}   

export const updateUserInfo = (body , userId ,callBack ,stopProgress) => {
    return (dispatch ,getState ) => {
        const config = setConfig(getState)
        axios.post(`auth/update-user/${userId}/` ,body ,config).then( (res) => {
            dispatch({
                type : UPDATE_USER_INFO,
                payload : res.data
            })
            callBack()
        }, (err) => {
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: err.response.data
            })
            stopProgress()
        })
    }
}


// update the user image
export const updateUserImage = (values ,user_id ,callBack) => {
    return (dispatch ,getState) => {
        const config = setConfig(getState)
        axios.post(`auth/update-image/${user_id}/`,values ,config).then( (res) => {
            callBack()
            dispatch({
                type : UPDATE_IMAGE,
                payload : res.data.user
            })
        } ,(err) => console.log(err.response))
    }
}

// clear data in redux form
export const clearForm = () => {
    return { type: CLEAR_REDUX_FORM }
}

/*******************************
 *          LIKES ACTIONS
 *******************************/
 export const makeLike = (values) => {
    return (dispatch ,getState) => {
        const config = setConfig(getState)
        axios.post("likes/",values,config).then((res)=> {
            dispatch({
                type : MAKE_LIKE,
                payload : res.data
            })
        })
    }
}

export const updateLike = (values,id) => {
    return (dispatch, getState) => {
        const config = setConfig(getState)
        axios.put(`likes/${id}/`, values, config).then((res) => {
            dispatch({
                type: UPDATE_LIKE,
                payload: res.data
            })
        })
    }
}

export const deleteLike = (id) => {
    return (dispatch, getState) => {
        const config = setConfig(getState)
        axios.delete(`likes/${id}/`, config).then((res) => {
            dispatch({
                type: DELETE_LIKE,
                payload: res.data
            })
        })
    }
}