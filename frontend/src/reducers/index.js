import { combineReducers } from "redux"
import { reducer as reduxformReducer } from "redux-form"
import authReducer from "./aut_reducer"
import alertReducer from "./alert_reducer"
import postsReducer from './posts_reducer'
import commentsReducer from './comments_reducer'
import userPostsReducer from "./userPosts_reducer"

import { CLEAR_REDUX_FORM } from "../actions/types"

export default combineReducers({
    authReducer,
    alertReducer,
    postsReducer,
    commentsReducer,
    userPostsReducer,
    form: reduxformReducer.plugin({
        register: (state, action) => {
            switch (action.type) {
                case CLEAR_REDUX_FORM :
                    return undefined;       // <--- blow away form data
                default:
                    return state;
            }
        }
    })
})