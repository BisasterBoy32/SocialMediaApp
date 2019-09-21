import {
    GET_USER_POSTS, MAKE_LIKE, UPDATE_LIKE, DELETE_LIKE,
    DELETE_POST, EDIT_POST, ADD_COMMENT, DELETE_COMMENT
} from "../actions/types"

export default function(state = [] ,action){

    let postIndex
    let posts = [...state]
    let post

    switch(action.type){

        case GET_USER_POSTS:
            return [ ...action.payload ]

        case DELETE_POST:
            postIndex = posts.findIndex((post) => (post.id === action.payload))
            if (postIndex > -1) {
                posts.splice(postIndex, 1)
            }
            return posts

        case EDIT_POST:
            postIndex = posts.findIndex((post) => (post.id === action.payload.id))
            if (postIndex > -1) {
                posts.splice(postIndex, 1, action.payload)
            }
            return posts

        case MAKE_LIKE:
        case UPDATE_LIKE:
        case DELETE_LIKE:
            postIndex = posts.findIndex((post) => (post.id === action.payload.id))
            if (postIndex > -1) {
                posts.splice(postIndex, 1, action.payload)
            }
            return posts

        case ADD_COMMENT:
            post = posts.find((post) => (post.id === action.payload.post))
            if (post !== undefined){
                post.comments_count++
            }  
            return posts

        case DELETE_COMMENT:
            post = posts.find((post) => (post.id === action.payload.postId))
            if (post !== undefined) {
                post.comments_count--
            }  
            return posts

        default:
            return state
    }
}