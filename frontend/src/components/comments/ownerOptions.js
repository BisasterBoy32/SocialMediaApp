import React, { useState } from 'react';
import { connect } from 'react-redux'
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { deleteComment } from '../../actions/posts_action'

const useStyles = makeStyles( theme => ({
        ownerOptions: {
            position: "absolute",
            top: "5px",
            "right": "5px"
        },
        icon: {
            marginRight: "5px",
            color: "#5c5b5b",
            cursor: "pointer",
            fontSize: "1rem"
        },
        tiny: {
            width: "14px !important",
            height: "20px !important",
        }
    })  
)

function OwnerOptions({ ownerID, user, display, commentId,postId, deleteComment, editClicked}) {
    const classes = useStyles();

    const [progress, setProgress] = useState(false)

    const DeleteIcon = () => {

        const deleteClicked = () => {
            deleteComment(commentId, postId)
            setProgress(true)
        }

        return (
            <Icon className={classes.icon} onClick={deleteClicked}
                style={display ? { display: "inline-block" } : { display: "none" }}>
                delete</Icon>
        )
    }

    if (user.id === ownerID) {
        return (
            <div className={classes.ownerOptions}>
                <Icon className={classes.icon} onClick={editClicked}
                    style={display ? { display: "inline-block" } : { display: "none" }}>
                    edit</Icon>

                {progress ? <CircularProgress className={classes.tiny} /> : <DeleteIcon />}
            </div>
        )
    }
    return <div></div>
}

export default connect(null, { deleteComment })(OwnerOptions)