import React, { useState ,useRef } from 'react'
import { connect } from 'react-redux'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import moment from "moment"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';

import OwnerOptions from "./ownerOptions"
import { editComment } from "../../actions/posts_action"

const useStyles = makeStyles(theme => ({
    avatar: {
        marginLeft: "19px",
        width: 30,
        height: 30,
    },
    card: {
        marginTop: 10,
        position: "relative"
    },
    cardContent: {
        margin: "0 10px",
        padding: "0 16px !important",
    },
    cardActionLeft: {
        marginLeft: "auto",
    },
    cardHead: {
        padding: "5px !important"
    },
    owner: {
        marginBottom: '0px !important',
    },
    textS: {
        fontSize: "10px",
        color: "rgba(0, 0, 0, 0.7)"
    },
    progress: {
        width: "14px !important",
        height: "20px !important"
    },
    input : {
        fontSize: "10px",
    },
    iconHolder: {
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
})
);


function CommentItem({ user, comment, editComment }) {
    const classes = useStyles();
    const p_date = moment(comment.p_date).format("DD/MM/YYYY ,HH:mm")
    const u_date = moment(comment.u_date).format("DD/MM/YYYY ,HH:mm")

    // use ref to access the form
    const myForm = useRef()
    // use state to control appearense of delete and edit icons
    const [show, setShow] = useState(false)

    // use state to control appearense of the edit input
    const [edit , setEdit ] = useState(false)
    const [value , setValue ] = useState(comment.content)

    // use state to control appearense of edit wiating circle progress
    const [progress, setProgress] = useState(false)

    const onInputChange = (e) => {
        setValue(e.target.value)
    }

    const displayContent = () => {
        if (edit){
            return (
                <form onSubmit={onFormSubmit} ref= {myForm}>
                <TextField
                    required
                    name='content'
                    multiline={true}
                    rowsMax="6"
                    value={value}
                    onChange={onInputChange}
                    margin="normal"
                    fullWidth={true}
                    className={classes.input}
                />
                </form>
            )
        }
        return (
            <Typography variant="body2" color="textPrimary" component="p">
                {comment.content}
            </Typography>
        )
    }   

    const editClicked = () => {
        setEdit(true)
    }

    const cancelEdit = () => {
        setEdit(false)
        setValue(comment.content)
    }

    const editCommentClicked = () => {
        myForm.current.dispatchEvent(new Event("submit"))
    }

    const onFormSubmit = () => {
        const values = { content: value }
        
        if ( values.content !== "" ){
            // render circle progress
            setProgress(true)

            //send data to the API with redux action creator
            editComment(values, comment.id, () => {
                setEdit(false)
                setProgress(false)
            })
        }
    }
    return (
        <Card
            className={classes.card}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <CardHeader className={classes.cardHead}
                avatar={<Avatar alt="" src={comment.owner.profile.image_path} className={classes.avatar} />}
                title={<p className={classes.owner}>{comment.owner.username}</p>}
                subheader={p_date}
            />
            <CardContent className={classes.cardContent}>
                {displayContent()}
                <Typography variant="overline" color="textSecondary" component="p" className={classes.textS}>
                    Latest update : {u_date}
                </Typography>
                { edit && 
                <div className={classes.iconHolder}>
                    { progress && <CircularProgress className={classes.progress} />}
                    { !progress && <Icon onClick={editCommentClicked} className={classes.icon}>check </Icon>} 

                    <Icon onClick={cancelEdit} className={classes.icon}>
                        cancel
                    </Icon>
                </div>
                }
                { !edit &&
                    <OwnerOptions
                        ownerID={comment.owner.id}
                        user={user} display={show}
                        commentId={comment.id}
                        editClicked={editClicked}
                        postId={comment.post}
                    />
                }

            </CardContent>

        </Card>
    )
}

export default connect(null, { editComment })(CommentItem)