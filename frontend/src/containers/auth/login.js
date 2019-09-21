import React, { Component } from "react"
import { Redirect ,Link } from 'react-router-dom'
import { connect } from "react-redux"
import AnimatePage from "../../components/AnimatePage" 
import CircularProgress from '@material-ui/core/CircularProgress';

import { login } from "../../actions/auth_actions"

class Login extends Component {
    state = {
        username : "",
        password : "",
        progress : false
    }
    render() {
        const { isAuthenticated } = this.props.authReducer
        const  { progress} = this.state
        if ( isAuthenticated ){
            return <Redirect to='/'/>
        }
        return (
            <div className="login-page">
                <AnimatePage />
                <div className="login-page-content">
                    <div className="login-page-content-inner">
                        <form onSubmit={this.onFormSubmit.bind(this)} className="form-box animated bounceIn">
                            <legend className="text-center form-legend"> Login </legend>
                            <div className="form-group">
                                <input
                                value = {this.state.username}
                                className="form-control custom-input"
                                name="username"
                                type="text"
                                onChange={this.onInputChange.bind(this)}
                                placeholder = "Username"
                                />
                            </div>
                                <div className="form-group">
                                    <input
                                    value={this.state.password}
                                    className="form-control custom-input"
                                    name="password"
                                    type="password"
                                    onChange={this.onInputChange.bind(this)}
                                    placeholder="Password"
                                    />
                                </div>
                            <button style={{ marginRight : "5px"}} className="btn btn-general mt-3 btn-login"> Login </button>
                            <CircularProgress style={progress ? { display: "inline-block" } : { display: "none" }} />
                            <p className="text-helper">
                                You dont have an account yet Signup from <Link to="/register">here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    onInputChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    onFormSubmit(e){
        e.preventDefault()
        const { progress , ...values} = this.state
        this.setState({ progress: true })

        // send the request to the server
        this.props.login(values , () => {
            this.setState({
                progress: false, username : "" , password : ""
            })
        })
    }
}
      
const mapStateToProps =  ( {authReducer} ) => {
    return { authReducer }
}
export default connect(mapStateToProps, { login })(Login)