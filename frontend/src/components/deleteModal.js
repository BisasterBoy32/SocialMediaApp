import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';

import { deletePost } from '../actions/posts_action'

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
    },
    h3 : {
        fontSize : "20px",
        color : "#000",
        marginBottom : "1rem",
        paddingBottom : "1rem",
        borderBottom : "1px solid #000"
    },
    cancel : {
        marginRight: "5px",       
    },
    btnDiv : {
        textAlign: "end",
    },
    span : {
        fontWeight : "bold",
    },
    delete: {
        marginRight: "5px",       
    }
}));


function DeleteModal({ open, handleClose, postTitle, postId, deletePost} ){
    const classes = useStyles();
    
    // state to control the progress waiting component
    const [progress, setProgress] = useState(false)

    const cancelDelete = () => {
        handleClose()
    }

    const onDeleteClicked = () => {
        setProgress(true)
        deletePost(postId ,() => {
            handleClose();
            setProgress(false)
        });
    }

    return (
        <Modal 
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
            >
            <div className={classes.paper}>
                <h3 className={classes.h3}> Are you sure you want to delete "<span className={classes.span}>{postTitle}</span>" post </h3>
                <div className={classes.btnDiv}>
                    <Button className={classes.cancel} onClick={cancelDelete} variant="contained"> Cancel </Button>
                    <Button className={classes.delete} variant="contained" color="secondary" onClick = {() => onDeleteClicked(postId)}> Yes </Button>
                    <CircularProgress style={progress ? { display: "inline-block" } : { display: "none" }} color = "secondary" />
                </div>
            </div>
        </Modal>
    )


}

export default connect(null, { deletePost})(DeleteModal)