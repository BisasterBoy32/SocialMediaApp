import axios from 'axios'
import { setConfig } from './auth_actions'

import {
    GET_POSTS, POST_CREATED, POST_CREATED_FAILED, GET_PAGE, GET_USER_POSTS,
    DELETE_POST, EDIT_POST, EDIT_POST_FAIL, GET_COMMENTS_FAIL,
    GET_COMMENTS, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT}
from './types'

export const getPosts = (callBack) => {
    return (dispatch) => {
        axios.get('posts/').then( (res) => {
            dispatch({
                type: GET_POSTS,
                payload : res.data
            })
            callBack()
        })  
    }
} 

export const addPost = (values , callBack) => {
    return (dispatch ,getState ) => {
        const config = setConfig(getState)
        axios.post('posts/',values ,config).then((res) => {
            dispatch({
                type : POST_CREATED,
                payload : res.data
            })
            callBack()
        } ,(err) => {
            dispatch({
                type: POST_CREATED_FAILED,
                payload: err.response.data
            })
        })  
    }
}

export const deletePost = (id ,callBack) => {
    return (dispatch , getState) => {
        const config = setConfig(getState)
        axios.delete(`posts/${id}/`,config).then( () => {
            dispatch ({
                type: DELETE_POST,
                payload : id
            })
            callBack()
        })
    }
}

// edit Post action creator
export const editPost = (values ,id, callBack) => {
    return (dispatch, getState) => {
        const config = setConfig(getState)
        axios.put(`posts/${id}/`,values , config).then((res) => {
            dispatch({
                type: EDIT_POST,
                payload: res.data
            })
            callBack() 
        },(err) => { dispatch({
                    type : EDIT_POST_FAIL,
                    payload : err.response.data
                })
            callBack()
        },)
    }
}

// load more posts
export const loadPage = (callBack) => {
    return (dispatch ,getState) => {
    const url = getState().postsReducer.nextPage 
    const config = setConfig(getState)
    axios.get(url ,config).then((res) => {
        dispatch({
            type : GET_PAGE,
            payload : res.data
        })
        callBack()
    }) 
    }
}

// get the user posts
export const getUserPosts = (userId ,callBack) => {
    return (dispatch) => {
        axios.get(`posts/${userId}/get_user_posts`).then((res) => {
            dispatch({
                type : GET_USER_POSTS,
                payload :res.data
            })
            callBack()
        })
    }
}

/**************************************** COMMENTS ACTIONS  ********************************/


// get the post comments by the post id
export const getComments = (id ,callBack) => {
    return (dispatch, getState) => {
        const config = setConfig(getState)
        axios.get(`comments/${id}/get_comments/`, config).then((res) => {
            dispatch({
                type: GET_COMMENTS,
                payload: res.data
            })
            callBack()
        },(err) => {
            dispatch({
                type: GET_COMMENTS_FAIL,
                payload: err.response.data
            })
        })
    }
}

// add comment
export const addComment = (values, callBack) => {
    return (dispatch , getState) => {
        const config = setConfig(getState)
        axios.post("comments/", values ,config).then((res) => {
            dispatch({
                type: ADD_COMMENT,
                payload: res.data    
            })
            callBack()
        })
    }
}

// delete comment
export const deleteComment = (id, postId) => {
    return (dispatch, getState) => {
        const config = setConfig(getState)
        axios.delete(`comments/${id}/`, config).then((res) => {
            dispatch({
                type: DELETE_COMMENT,
                payload: {
                    commentId : id,
                    postId
                }
            })
        })
    }
}

// edit comment 
export const editComment = (values ,id ,callBack) => {
    return (dispatch , getState) => {
        const config = setConfig(getState)
        axios.put(`comments/${id}/`, values, config).then((res) => {
            dispatch({
                type : EDIT_COMMENT,
                payload : res.data
            })
            callBack()
        })
    }
}