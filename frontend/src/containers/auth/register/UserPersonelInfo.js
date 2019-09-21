import React, { Component, Fragment } from 'react'
import { Field, reduxForm } from "redux-form"
import renderField from "./renderField"
import { validate } from "./validate"

export class UserPersonalInfo extends Component {
    render() {
        console.log(this.props)
        const { nextPage  ,previousPage} = this.props
        const { handleSubmit } = this.props
        return (
            <Fragment>
                <div className="form-box ">
                    <form onSubmit={handleSubmit(nextPage)} className="animated wow fadeIn">
                        <legend className="text-center form-legend"> Register </legend>

                        <label className="mt-3 mb-2 input-label"> Gender : </label>
                        <Field
                            name="sex"
                            label="media/img/male.png"
                            type="radio"
                            gender="Male"
                            value="male"
                            labelId = "male"
                            component={renderField}
                        />
                        <Field
                            name="sex"
                            label="media/img/female.png"
                            gender="Female"
                            type="radio"
                            value="female"
                            labelId="female"
                            component={renderField}
                        />
                        <Field
                            name="first_name"
                            label="First Name : "
                            type="text"
                            component={renderField}
                        />
    
                        <Field
                            name="last_name"
                            label="Last Name : "
                            type="text"
                            component={renderField}
                        />
    
                        <div className="centered-content">
                            <div className="centered-content-inner">
                                <button
                                type='button' onClick={previousPage} className="btn btn-general mt-3 btn-login mr-2"
                                > Previous </button>
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
})(UserPersonalInfo)
