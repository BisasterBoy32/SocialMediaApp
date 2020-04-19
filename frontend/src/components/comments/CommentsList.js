import React from 'react'
import {connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import CommentItem from './commentItem'

const useStyles = makeStyles(theme => ({
        progress : {
            width : "100px !important",
            height: "100px !important",
            margin : "auto",
            display : "block"
        } 
    })
);

function CommentsList({ comments, progress, authReducer }) {
    const { user } = authReducer
    const classes = useStyles();

    if (progress) {
        return <CircularProgress className={classes.progress}/>
    } 
    else 
    {
        return comments.map((comment) =>{
            return( 
                <CommentItem
                comment={comment}
                user={user}
                key={comment.id}
                />
            )
        })
    }
} 

const mapStateToProps = (state) => {
    return ({ authReducer : state.authReducer })
}

export default connect(mapStateToProps)(CommentsList)