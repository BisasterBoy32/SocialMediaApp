import React, { Component ,Fragment } from 'react'
import { Field , reduxForm } from "redux-form"
import renderField from "./renderField"
import { validate ,asyncValidate } from "./validate"

export class UserInfo extends Component {
    render() {
        const {nextPage} = this.props
        const { handleSubmit } = this.props
        return (
            <Fragment>
                <div className="form-box ">
                    <form onSubmit={handleSubmit(nextPage)} className="animated wow fadeIn">
                        <legend className="text-center form-legend"> Register </legend>
                        <Field 
                            name="username"
                            label = "Username : "
                            type = "text"
                            component={renderField}
                        />
    
                        <Field
                            name="email"
                            label="Email Address : "
                            type="email"
                            component={renderField}
                        />
    
                        <Field
                            name="password"
                            label="Password : "
                            type="password"
                            component={renderField}
                        />
    
                        <Field
                            name="password2"
                            label="Confim Password"
                            type="password"
                            component={renderField}
                        />
    
                        <div className="centered-content">
                            <div className="centered-content-inner">
                                <button className="btn btn-general mt-3 btn-login"> Next </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default reduxForm({
    'form': 'register',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    'validate': validate,
    asyncValidate,
    asyncBlurFields: ['username','email']
})(UserInfo)
