import {
    GET_POSTS, POST_CREATED, MAKE_LIKE, UPDATE_LIKE, DELETE_LIKE,
    DELETE_POST, EDIT_POST, ADD_COMMENT, DELETE_COMMENT, GET_PAGE
} from "../actions/types"

const init = {
    posts: [],
    nextPage: "null",
}

export default function (state = init, action) {

    let posts = state.posts;
    let post;
    let postIndex;

    switch (action.type) {
        case GET_POSTS:
            return {
                posts: [
                    ...state.posts,
                    ...action.payload.results
                ],
                nextPage: action.payload.next
            }

        case GET_PAGE:
            return {
                posts: [
                    ...state.posts,
                    ...action.payload.results
                ],
                nextPage: action.payload.next
            }
                
        case POST_CREATED:
            // delete the last item because django render 5 items on each 
            // page so when we add new post the django consider the last post
            // in the posts array the the next page not in the current one
            posts.splice(-1 ,1)
            return {
                nextPage : state.nextPage,
                posts : [
                    action.payload,
                    ...posts
                ],
            }

        case DELETE_POST:
            postIndex = posts.findIndex((post) => (post.id === action.payload))
            if (postIndex !== -1 ){
                posts.splice(postIndex, 1)
            }
            return {
                nextPage: state.nextPage,
                posts
            }

        case EDIT_POST:
            postIndex = posts.findIndex((post) => (post.id === action.payload.id))
            if (postIndex !== -1 ) {
                posts.splice(postIndex, 1, action.payload)
            }
            return {
                nextPage: state.nextPage,
                posts
            }

        case MAKE_LIKE:
        case UPDATE_LIKE:
        case DELETE_LIKE:
            postIndex = posts.findIndex((post) => (post.id === action.payload.id))
            if (postIndex !== -1 ) {
                posts.splice(postIndex, 1, action.payload)
            } 
            return {
                nextPage: state.nextPage,
                posts
            }

        case ADD_COMMENT:
            post = posts.find((post) => (post.id === action.payload.post))
            if (post !== undefined) {
                post.comments_count++
            } 
            return {
                nextPage: state.nextPage,
                posts
            }

        case DELETE_COMMENT:
            post = posts.find((post) => (post.id === action.payload.postId))
            if (post !== undefined) {
                post.comments_count--
            }  
            return {
                nextPage: state.nextPage,
                posts
            }


        default:
            return state
    }
}   


