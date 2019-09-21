import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';

import { editPost } from '../actions/posts_action'


const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        top: "calc(50% - 9rem)",
        left: "calc(50% - 13rem)",
        width: "80vmin",
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
}));

function EditModal({ open, handleClose, postTitle, postContent, postId, editPost }) {

    const classes = useStyles();
    const [values, setValues] = useState({
        title: postTitle,
        content: postContent
    })
    
    // state to control the progress waiting component
    const [progress , setProgress] = useState(false)

    // change the state each time the component rerender
    useEffect(() => {
        setValues({
            title: postTitle, content: postContent
        })
    }, [postTitle, postContent]);

    const onInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        setProgress(true)
        editPost(values, postId, () => {
            handleClose();
            setProgress(false)
        })
    }

    const onCloseModal = () => {
        handleClose();
        setValues({ title: postTitle, content: postContent })
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
                    <h2 className={classes.h2} id="title">Add A New Post</h2>
                    <form id="description" onSubmit={onFormSubmit}>
                        <TextField
                            required
                            label="Title"
                            type="text"
                            value={values.title}
                            onChange={onInputChange}
                            name='title'
                            fullWidth={true}
                        />
                        <TextField
                            required
                            name='content'
                            label="Content"
                            multiline={true}
                            rowsMax="4"
                            value={values.content}
                            onChange={onInputChange}
                            margin="normal"
                            fullWidth={true}
                        />
                        <div className={classes.btnDiv}>
                            <Button className={classes.cancel} onClick={onCloseModal} variant="contained">
                                Cancel
                            </Button>
                            <Button type='submit' variant="contained" color="primary" className={classes.button}>
                                Update
                                <Icon className={classes.rightIcon}></Icon>
                            </Button>
                            <CircularProgress style={ progress ? {display : "inline-block"} : {display : "none"}}/>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default connect(null, { editPost })(EditModal)