import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Route , Redirect } from "react-router-dom"
import AnimatePage from "../../components/AnimatePage" 

class PrivateRoute extends Component {
    render(){
        const { component : Component , ...rest } = this.props
        const { isAuthenticated ,isLoading} = this.props.authReducer
        return (
            <Route {...rest } render = {(props) => {
                if (isAuthenticated && rest.home ) {
                    return <Component posts={this.props.postsReducer} loadPosts={rest.loadPosts} {...props}/>
                } else if (isAuthenticated ){
                    return <Component {...props}/>
                } else if ( isLoading ){ 
                    return <AnimatePage infinite = {true}/>
                } else {
                    return <Redirect to="/login"/>
                }
            }}/>
        )
    }
}

const mapStateToProps = ({ authReducer, postsReducer  }) => {
    return { 
        authReducer,
        postsReducer
    }
}   

export default connect(mapStateToProps)(PrivateRoute)