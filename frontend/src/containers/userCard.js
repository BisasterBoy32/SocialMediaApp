import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(() => ({
    userCardContainer : {
        width : "30vw",
        height : "100vh",
        backgroundImage: "var(--user-bg2)",
        position : "fixed",
        top: "0px",
        left : "0px",
        ['@media (max-width:1000px)']: {
            width: "50vw",
        },
        ['@media (max-width:700px)']: {
            width: "100vw",
            position: "static",
            marginBottom : "2rem"
        }
    },
    imgWrapper : {
        margin : "auto",
        width : "max-content",
        marginTop : "70px"
    },
    Username: {
        fontSize : "2.5rem",
        textAlign : "center",
        color: "#413f3f"
    },
    info : {
        color: "#413f3f",
        fontSize: "1.5rem",
        textAlign: "center",
    }
}));


function UserCard({ open, close, user }) {

    const classes = useStyles()

    return (
        <div className={classes.userCardContainer}>
            <div className={classes.imgWrapper}>
                <img className="user-image-wrap" src={user.profile.image_path} alt="user-img" />
                <div className={classes.Username}> {user.username}</div>
                <div className={classes.info}> <span> {user.first_name} </span> <span> {user.last_name} </span></div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ authReducer }) => {
    return { authReducer }
}

export default connect(mapStateToProps)(UserCard)