import React from 'react'

// whene user pick his gender
const pickGender = (e) => {
    e.target.classList.add("colored")
    if (e.target.id === "male" ){
        document.querySelector("#female").classList.remove("colored")
    } else {
        document.querySelector("#male").classList.remove("colored")
    }
}

const RenderField = (field) => {
    const { meta } = field
    const animation = "animated wow flash"
    const errorClassRadio = meta.touched && meta.error && field.gender == `Female` ? `error radio-error ${animation}` : "radio-error"
    const errorClass = meta.touched && meta.error ? `error ${animation}` : ""
    if (field.type == "radio") {
        return (
            <div className="custom-radio">
                <input
                    className="radio-input"
                    {...field.input}
                    id={field.gender}
                    type={field.type}
                /> 
                <label onClick={pickGender} className="radio-label" htmlFor={field.gender}>
                    <img id={field.labelId} src={field.label} alt="gender-icon" className="gender-radio"/>
                </label><br />
                <div className={errorClassRadio} data-wow-duration="2s">
                    {meta.touched && field.gender == "Female" ? meta.error : ""}
                </div>
            </div>
        )
    } else if (field.type == "file") {
        const { value, ...rest } = field.input
        return (
            <div className="register-profile-img">
                <div className="register-img-wrapper">
                <span className="file-input-desc">
                        for more and fun exprerience choose a picture for your profile please
                </span>
                <img className="img-responsive register-img" src="/media/img/man.svg"/>
                </div>

                <input 
                    className="file-input" id={field.id}
                    {...rest} type='file' name={field.name}
                />
                <label  className="file-input-label" htmlFor={field.id}>
                    Choose file <i className="fa fa-upload"></i>
                </label>
                <div className={errorClass} data-wow-duration="2s">
                    {meta.touched ? meta.error : ""}
                </div>
            </div>
        )
    }

    return (
        <div>
            <label className="mt-3 mb-2 input-label"> {field.label} </label>
            <input
                {...field.input}
                className={meta.touched && meta.error ? "form-control custom-input input-error" : "form-control custom-input"} 
                type={field.type}
            />
            <div className={errorClass} data-wow-duration="2s">
                {meta.touched ? meta.error : ""}
            </div>
        </div>
    )
}

export default RenderField
