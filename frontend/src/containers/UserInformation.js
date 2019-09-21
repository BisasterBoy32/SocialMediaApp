import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from "lodash"
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios"
import CircularProgress from '@material-ui/core/CircularProgress';


import AnimatePage from "../components/AnimatePage" 
import UserPost from "./anyUserInfo"
import { updateUserInfo } from "../actions/index"
import { updateUserImage } from '../actions/index'

export class UserInfo extends Component {
    constructor(props) {
        super(props)
        const { user } = props.authReducer
        this.state = {
            originImage : "",
            croppedImageUrl: "",
            module: false,
            src: "",
            crop: {
                unit: "%",
                width: 30,
                aspect: 1 / 1
            },
            user: {
                username: { value: user.username, edit: false, label: "username", id: "username" },
                email: { value: user.email, edit: false, label: "email", id: "email" },
                first_name: { value: user.first_name, edit: false, label: "first name", id: "first_name" },
                last_name: { value: user.last_name, edit: false, label: "last name", id: "last_name" },
                sex: { value: user.profile.sex, edit: false, label: "gender", id: "sex" }
            },
            progress : false,
            open : false
        }
    }

    render() {
        const { progress ,open } = this.state
        const { user } = this.props.authReducer
        return (
            <div className='user-info-box'>
           <AnimatePage />
                <UserPost open={open} user = {user} close={() => this.setState({open : false})}/>
                <div className="container user-info-box-inner">
                    <div className="user-info-header">
                        <div className="user-image-wrap">
                            <img src={user.profile.image_path} className="user-image" />
                            <div className='change-image-box'>
                                <label htmlFor='change-image-input' className='change-image-label'>
                                    <i style = {{ color : "white" }} className='fa fa-camera fa-3x'>
                                    </i></label>
                                <input
                                    className='radio-input' id='change-image-input' type='file'
                                    onChange={(e) => this.ImageChanged(e)}
                                />
                            </div>
                        </div>
                        <div className="user-username">
                            <p onClick={() => this.setState({ open : true})} style = {{ cursor : "pointer"}}>
                             {user.username}
                            </p>
                        </div>
                    </div>
                    <div className="user-info-main">
                        {this.renderValues()}
                    </div>

                </div>
                <div className="modul hidden" ref='modul'>
                    <div className="module-inner">
                        <ReactCrop
                            src={this.state.src}
                            crop={this.state.crop}
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />
                        <div>
                            <button className="btn btn-secondary mt-2 mr-3" onClick={this.closeModul.bind(this)}>cancel</button>
                            <button className="btn btn-outline-primary mt-2 mr-3"
                                onClick={this.updateUserImageFunc}>
                                update
                            </button>
                            {progress ? <CircularProgress /> : ""} 
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderValues() {
        const { progress } = this.state 
        return _.map(this.state.user, (info) => {
            if (info.edit && info.id === "sex") {
                return (
                    <div>
                        <div className="user-info-input-wrap">
                            <p className="user-info-input-slelect" value="male"
                                onClick={this.onClose}>
                                choose your Gender {progress ? <CircularProgress /> : ""} 
                            </p>
                        </div> 
                        <div className="user-info-input-wrap">
                            <p className="user-info-input-sex" value="male"
                            onClick={this.sexChanged}> Male </p>
                        </div> 
                        <div className="user-info-input-wrap">
                            <p className="user-info-input-sex" value="female"
                            onClick={this.sexChanged}> Female </p>
                        </div>
                    </div>
                )
            }
            else if (info.edit) {
                return (
                    <div className="user-info-input-wrap">
                        <input
                            className="user-info-input"
                            value={info.value}
                            onChange={(e) => this.inputChange(e.target.value, info.id)}
                        />
                        <div className="user-info-btn" onClick={() => this.onCheck(info.id)}>
                            {progress ? <CircularProgress /> : <i className="fa fa-check"></i>}
                        </div>
                        <div className="user-info-btn" onClick={this.onClose}>
                            <i className="fa fa-remove"></i>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="user-information" key={info.id}
                        onClick={this.infoClicked.bind(this, info.id)}>
                        <div className="label">{info.label}</div>
                        <div className="content">{info.value}</div>
                        <div className="edit-icon">
                            <i className="fa fa-pencil"></i>
                        </div>
                    </div>
                )
            }

        })
    }

    infoClicked(id) {
        // all the info rendred normal( no input fields )
        this.handleEdit()

        this.setState((preState, props) => {
            const { user } = preState
            return {
                ...preState,
                user: {
                    ...user,
                    [id]: { ...user[id], edit: true }
                },
                progress : false,
            }

        })

    }

    inputChange(newValue, id) {
        this.setState((preState, props) => {
            return {
                ...preState,
                user: {
                    ...preState.user,
                    [id]: { ...preState.user[id], value: newValue }
                }
            }

        })
    }

    onCheck(id) {
        const { user } = this.props.authReducer
        const content = {}

        // render the circle waiting
        this.setState({ progress : true})

        for (let key in this.state.user) {
            content[key] = this.state.user[key].value
        }

        // send new user info  to API endpoint
        this.props.updateUserInfo(content, user.id, () => {
            this.setState((preState, props) => {
                const { user } = preState
                return {
                    ...preState,
                    user: {
                        ...user,
                        [id]: { ...user[id], edit: false }
                    }
                }

            })
        } , () => {
            this.setState({ progress : false })
        })
    }

    onClose = () => {
        this.handleEdit()
    }

    handleEdit(){
        // set the edit  of all user info's to false
        this.setState((preState , props) => {
            const { user } = preState 
            const  newUser  = props.authReducer.user

            return {
                ...preState,
                user : {
                    username: { ...user.username, value: newUser.username , edit: false },
                    email: { ...user.email, value: newUser.email, edit: false },
                    first_name: { ...user.first_name, value: newUser.first_name ,edit: false },
                    last_name: { ...user.last_name, value: newUser.last_name ,edit: false },
                    sex: { ...user.sex, value: newUser.profile.sex ,edit: false }
                }
            }
        })
    }

    sexChanged = (e) => {
        const { user } = this.props.authReducer
        const value = e.target.getAttribute("value")
        const content = { }

        // render the circle waiting
        this.setState({ progress: true })

        for (let key in this.state.user) {
            content[key] = this.state.user[key].value
        }
        content['sex'] = value

        this.props.updateUserInfo(content, user.id, () => {
            this.setState((preState, props) => {
                const { user } = preState
                return {
                    ...preState,
                    user: {
                        ...user,
                        sex : { ...user['sex'] ,value : value, edit: false }
                    }
                }

            })
        })
    }

    closeModul(e) {
        const modul = this.refs.modul
        modul.classList.add('hidden')

    }

    updateUserImageFunc = () => {
        const { originImage } = this.state
        const { id } = this.props.authReducer.user
        this.setState({ progress : true})
        const form = new FormData()
        form.append('image', originImage)
        this.props.updateUserImage(form , id ,() => {
            const modul = this.refs.modul
            modul.classList.add('hidden')  
        })

    }

    ImageChanged(e) {
        this.handleEdit()
        this.setState({ originImage: e.target.files[0] , progress : false })
        this.refs.modul.classList.remove('hidden')
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState(preState => {
                    return {
                        ...preState,
                        src: reader.result
                    }
                })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                "newFile.jpeg"
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, "image/jpeg");
        });
    }
}

const mapStateToProps = (state) => {
    return { authReducer: state.authReducer }
}

export default connect(mapStateToProps, { updateUserInfo, updateUserImage })(UserInfo)
