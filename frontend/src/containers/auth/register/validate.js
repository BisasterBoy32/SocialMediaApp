import axios from "axios"

export const validate = (values) => {
    const errors = {}

    const alpha = new RegExp(/[a-z]/)
    const numbers = new RegExp(/[0-9]/)
    const { username , password ,password2 ,
    email ,first_name ,last_name ,sex ,image }
    = values

    //username validation
    if ( !username ){
        errors.username= "this field shouldn't be empty"
    } else {
        if ( username.length < 5){
            errors.username = "username must be more than 4 characteres"
        }
    }

    //email validation
    if (!email) {
        errors.email = "this field shouldn't be empty"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address'
    }

    // password validation
    if (!password) {
        errors.password = "this field shouldn't be empty"
    } else {
        if (password.length < 8) {
            errors.password = "password length must be more than 08"
        }
        if (!alpha.test(password) || !numbers.test(password)) {
            errors.password = "password must contains both chars and numbers"
        }
    }

    // password2 validation
    if (!password2) {
        errors.password2 = "this field shouldn't be empty"
    } else {
        if (password != password2) {
            errors.password2 = "password didnt match"
        }
    }

    //first name validation
    if (!first_name) {
        errors.first_name = "this field shouldn't be empty"
    }

    //last name validation
    if (!last_name) {
        errors.last_name = "this field shouldn't be empty"
    } 

    //sex validation
    if (!sex) {
        errors.sex = "what is you Gender??"
    } 

    //image validation
    if (!image) {
        errors.image = "choose a picture for your profile please!!"
    } 

    return errors
}

export const asyncValidate = (values) => {
    const body = {
        username : values.username,
        email : values.email
    }

    return axios.post("auth/validation/", body).then( (res) => {/* username and email are valid*/}
    ,(err) => {
        const {data} = err.response
        if ( data.username ){
            throw {username: data.username.join()}
        } else {
            throw {email: data.email.join() }
        }
    })

}