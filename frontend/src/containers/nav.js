import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { logout } from '../actions/auth_actions'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import AddModal from '../components/addModal'

class Nav extends Component {
    state = {
        open : false,
    }

    handleModal = () => {
        this.setState({open : false })
    }
    onOpenModal = () => {
        this.setState({open : true})
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-light custom-nav">
                <AddModal open={this.state.open} onClose={this.handleModal} />
                <div className="container">
                    <a className="navbar-brand" href="#">ChatChita</a>
                    <div className="collapse navbar-collapse">  
                        {this.renderLeftLinks()}
                    </div>
                </div>
            </nav>
        )
    }
    renderLeftLinks(){
        const { isAuthenticated } = this.props.authReducer 
        if ( isAuthenticated ) {
            const { username } = this.props.authReducer.user
            return (
                <ul className="navbar-nav ml-auto">
                    <Fab 
                    color="secondary" size="small"
                    aria-label="delete" style={{ marginRight: 8 }} 
                    onClick={this.onOpenModal} >
                        <AddIcon />
                    </Fab>
                    <li className="nav-item" style={{ margin : "auto 0" }}>
                        <Link className="btn btn-sm btn-outline-info" to="/user-info">
                            {username}<i className="fa fa-user ml-1"></i>
                        </Link>
                    </li>
                    <li className="nav-item" style={{ margin : "auto 0" }}>
                        <button onClick={this.props.logout}
                        className="btn btn-sm btn-outline-danger ml-2" to="/">
                        Logout
                        </button>
                    </li>
                </ul>
            )
        }
        else {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </ul>
            )
        }
    }
}

const mapStateToProps = ({authReducer}) =>{
    return { authReducer }
}
export default connect(mapStateToProps, { logout })(Nav)



