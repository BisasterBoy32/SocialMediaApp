import React , { Component } from "react"
import { Route ,HashRouter ,Switch} from "react-router-dom"
import { connect } from "react-redux"
import WOW from 'wowjs'; 

import Login from "../containers/auth/login"
import Nav from "../containers/nav"
import PrivateRoute from '../containers/auth/PrivateRoute'
import Home from '../containers/home'
import  Register  from '../containers/auth/register/Register'
import Alerts from "../containers/alerts"
import UserInfo from "../containers/UserInformation"
import ColorChanger from "./colorChanger"

import { getuser } from '../actions/auth_actions'
import { getPosts } from '../actions/posts_action' 

class App extends Component {
    state = {
        loadPosts: true
    }
    componentWillMount() {
        this.props.getuser()
        this.props.getPosts( () => {
            this.setState({ loadPosts : false })
        })
        new WOW.WOW({
            live: false
        }).init();
    }

    render(){
        return (
            <div className="main2">
                <HashRouter >
                    <ColorChanger />
                    <Nav />
                    <Alerts />
                    <Switch >
                        <PrivateRoute exact path="/" home={true}
                        loadPosts = {this.state.loadPosts} component = {Home}/>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <PrivateRoute exact path="/user-info" component={UserInfo} />
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default connect(null , { getuser, getPosts })(App)