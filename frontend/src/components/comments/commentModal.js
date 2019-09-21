import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';

import { addComment , getComments } from '../../actions/posts_action'
import CommentsList from './CommentsList'


const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform : "translate(-50% ,-50%)",
        width: "95vmin",
        maxHeight : "50%",
        overflowY: 'scroll',
        backgroundImage: "var(--user-bg2)",
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        color: "#ccc",

    },
    h2: {
        color: "#102016",
        padding: "1rem 0",
        marginBottom: "1.5rem",
        borderBottom: "white solid",
        textAlign: "center",
    },
    button: {
        margin: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    cancel: {
        marginRight: "5px",
    },
    btnDiv: {
        textAlign: "end",
    },
    form : {
        marginTop : 10,
    }
}));

function CommentModal({open, handleClose, postId, addComment, getComments , comments })
{   
    const classes = useStyles();
    const [values, setValues] = useState({
        content: ""
    })

    // state to control the progress waiting component
    const [progress, setProgress] = useState(false)
    const [progress2, setProgress2] = useState(true)
    // get the comments from the state whene the component mount
    useEffect(() => {
        if (open) {
            getComments(postId, () => setProgress2(false))
        }
    } ,[open])

    const onInputChange = (e) => {
        setValues({ [e.target.name]: e.target.value })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        setProgress(true)
        addComment({...values, post : postId}, () => {
            setProgress(false)
            setValues({ content: "" })
        })
    }

    const onCloseModal = () => {
        handleClose();
        setValues({ content: "" })
        setProgress2(true)
    }

    return (
        <div>
            <Modal
                aria-labelledby="title"
                aria-describedby="description"
                open={open}
                onClose={onCloseModal}
            >
                <div className={classes.paper}>
                    <form className={classes.form} id="description" onSubmit = {onFormSubmit}>
                        <TextField
                            required
                            label="add comments"
                            type="text"
                            value={values.content}
                            onChange={onInputChange}
                            name='content'
                            fullWidth={true}
                            rowsMax="4"
                            multiline = {true}
                        />
                        <div className={classes.btnDiv}>
                            <Button className={classes.cancel} onClick={onCloseModal} variant="contained">
                                Cancel
                            </Button>
                            <Button type='submit' variant="contained" color="primary"
                                className={classes.button}>
                                Create
                                <Icon className={classes.rightIcon}></Icon>
                            </Button>
                            <CircularProgress style={progress ? { display: "inline-block" } : { display: "none" }} />
                        </div>
                    </form>
                    <CommentsList progress = {progress2} comments = {comments} />
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({ comments : state.commentsReducer })
}

export default connect(mapStateToProps, { addComment, getComments })(CommentModal)