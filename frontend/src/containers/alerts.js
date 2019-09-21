import React, { Component } from 'react'
import { connect } from "react-redux"

import {closeAlert} from "../actions"
export class Alerts extends Component {

    componentDidUpdate(preProps ,preState){
        if (!preProps.alertReducer.type){
            setTimeout(() => {
                this.props.closeAlert()
            }, 8000)
        }
    }

    render() {
        const { alertReducer, closeAlert } = this.props
        if ( alertReducer.type === "success") {
            return (
                <div className="alert success-alert animated flash" >
                    <div className="float-right point-effect" onClick={closeAlert}>
                        <i className="fa fa-close"></i>
                    </div>
                    <p>{alertReducer.msg}</p> 
                </div>
            )
        } else if (alertReducer.type === "error") {
            return (
                <div className="alert error-alert animated flash">
                    <div className="float-right point-effect" onClick={closeAlert}>
                        <i className="fa fa-close"></i>
                    </div>
                    <p>{alertReducer.msg}</p> 
                </div>                
            )
        }
        return (
            <div> </div>
        )
    }
}

const mapStateToProps = ({ alertReducer }) => {
    return { alertReducer }
}

export default connect(mapStateToProps, { closeAlert })(Alerts)
