import React, { useEffect ,useState } from "react"
import { connect } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import { getUserPosts } from "../actions/posts_action" 
import UserCard from "./userCard"
import Home from './home'

const useStyles = makeStyles(() => ({
    appBar: {
        position: 'fixed',
    },
    closer : {
        width : "max-content",
        marginLeft : "auto",
        marginRight : "auto"
    },
    userPosts : {
        width  : "70vw",
        marginLeft : "auto",
        marginTop : "70px",
        ['@media (max-width:1000px)']: {
            width: "50vw",
        },
        ['@media (max-width:700px)']: {
            width: "100vw",
        }
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function UserInfo({ open, close, user, getUserPosts, userPostsReducer}){

    const [loadPosts, setLoadPosts] = useState(true)
    useEffect(() => {
        if ( user ){
            setLoadPosts(true)
            getUserPosts(user.id ,() => {
                setLoadPosts(false)
            })
        }
    }, [user])

    const classes = useStyles()
    const handleClose = () => {
        close()
    }

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}> 
                <Toolbar>
                    <div className={classes.closer}>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        RETURN TO HOME PAGE
                </div>
                </Toolbar>
            </AppBar>
            <UserCard user={user} />
            <div className={classes.userPosts}>
                <Home loadPosts={loadPosts} posts={userPostsReducer} />
            </div>
        </Dialog>
    )
}

const mapStateToProps = ({ userPostsReducer }) => {
    return { userPostsReducer }
}

export default connect(mapStateToProps, { getUserPosts })(UserInfo)