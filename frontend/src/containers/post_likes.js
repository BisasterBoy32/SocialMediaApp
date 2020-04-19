import React , { useState } from "react"
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import { makeLike, updateLike, deleteLike } from '../actions/index'

const useStyles = makeStyles(theme => ({
        icon : {
            cursor : "pointer"
        }
    })
)

function Likes({ post, userId, makeLike, updateLike, deleteLike }){

    const classes = useStyles()

    // check if the user have like on this post 
    const like = post.likes.find((like) => userId === like.owner)

    const makeLike2 = (like) => {
        const values = {
            post : post.id,
            like
        }
        makeLike(values)
    }

    const updateLike2 = (likeType) => {
        const values = {
            like: likeType,
        }
        updateLike(values,like.id)
    }

    return (
        <div> 
        { like &&
            <div>
                {like.like && 
                <div>
                    <Icon onClick={() => deleteLike(like.id)} className={classes.icon}>
                    thumb_up_alt
                    </Icon>{post.likes_count}
                    <Icon onClick={() => updateLike2(false)} className={classes.icon} style={{ marginLeft: "5px", opacity: ".5" }}>
                    thumb_down_alt
                    </Icon>{post.delikes_count}
                </div>}

                {!like.like &&
                <div>
                    <Icon onClick={() => updateLike2(true)} className={classes.icon} style={{ opacity: ".5" }}>
                    thumb_up_alt
                    </Icon>{post.likes_count}
                    <Icon onClick={() => deleteLike(like.id)} className={classes.icon} style={{ marginLeft: "5px" }} >
                    thumb_down_alt
                    </Icon>{post.delikes_count}
                </div>}
            </div>    
        } 
        {!like &&
            <div>
                <Icon onClick={() => makeLike2(true)} className={classes.icon} style={{ opacity: ".5" }}>
                thumb_up_alt
                </Icon>{post.likes_count}
                <Icon onClick={() => makeLike2(false)} className={classes.icon} style={{ marginLeft: "5px", opacity: ".5" }}>
                thumb_down_alt
                </Icon>{post.delikes_count}
            </div>
        } 
        </div>
    )
}

export default connect(null, { makeLike, updateLike, deleteLike})(Likes)