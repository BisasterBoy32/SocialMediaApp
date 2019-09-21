import React, { Component, Fragment } from 'react'
import { reduxForm ,Field} from "redux-form"
import CircularProgress from '@material-ui/core/CircularProgress';

import { validate } from "./validate"
import RenderField from './renderField';

export class UserImage extends Component {
    render() {
        const { onFormSubmit, previousPage } = this.props
        const { handleSubmit } = this.props
        return (
            <Fragment>
                <div className="form-box ">
                    <form encType="multipart/form-data"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit(onFormSubmit)}
                        className="animated wow fadeIn">
                        
                        <legend className="text-center form-legend"> Register </legend>
                        <Field
                            id="f-input"
                            name="image"
                            type="file"
                            component={RenderField}
                        />
    
                        <div className="centered-content">
                            <div className="centered-content-inner">
                                <button
                                    type='button' onClick={previousPage} className="btn btn-general mt-3 btn-login mr-2"
                                > Previous </button>
                                <button className="btn btn-general mt-3 mr-2 btn-login"> Submit </button>
                                {this.props.progress && <CircularProgress />}
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
})(UserImage)
