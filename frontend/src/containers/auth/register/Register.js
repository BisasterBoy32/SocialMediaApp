import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import _ from "lodash"


import UserInfo from "./UserInfo"
import UserPersonelInfo from "./UserPersonelInfo"
import UserImage from "./UserImage"
import { register } from "../../../actions/auth_actions"
import { clearForm } from '../../../actions/index'
import AnimatePage from "../../../components/AnimatePage" 

class Register extends Component {
    constructor(props){
        super(props)
        this.getNext = this.getNext.bind(this)
        this.getPrevious = this.getPrevious.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)

        this.state = {
            page: 1,
            progress : false
        }
    }

    componentWillUnmount(){
        this.props.clearForm()
    }

    render() {
        const image_url = this.state.page === 3 ? "/media/img/login6.svg" : "/media/img/login7.svg"
        const { isAuthenticated } = this.props.authReducer
        if ( isAuthenticated){
            return <Redirect to="/" />
        }
        return (
                <div className="register-page">
                <AnimatePage />
                    <div className="register-page-content">
                        <div className="register-page-photo">
                        <img src={image_url} alt='register'/>
                        </div>
                        <div className="register-page-body">
                            {this.renderForm()}
                        </div>  
                    </div>
                </div>
        )
    }
    getNext(){
        this.setState({page : this.state.page + 1})
    }

    getPrevious() {
        this.setState({page: this.state.page - 1 })
    }

    onFormSubmit(initValues){
        const { password2, ...userInfo } = initValues
        this.setState({ progress : true})
        let userForm = new FormData()
        for (let key in userInfo){
            if ( key === "image"){
                userForm.append(key, userInfo[key][0])
            } else {
                userForm.append(key, userInfo[key])
            }
        }

        this.props.register(userForm , () => {
            this.setState({ progress : false})
        })

    }

    renderForm(){
        switch(this.state.page){
            case 1:
                return  <UserInfo nextPage = {this.getNext}/>
            case 2 :
                return <UserPersonelInfo
                        nextPage={this.getNext}
                        previousPage={this.getPrevious}
                        />
            case 3 :
                return <UserImage 
                        onFormSubmit={this.onFormSubmit}
                        previousPage={this.getPrevious}
                        progress={this.state.progress}
                        />
        }
    }
}

const mapStateToProps = ({ authReducer }) => {
    return { authReducer }
}

export default connect(mapStateToProps, { register, clearForm })(Register)
