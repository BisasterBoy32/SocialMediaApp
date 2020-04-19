import React, { Component } from 'react'

export class colorChanger extends Component {
    render() {
        return (
            <div className='color-changer' onClick={this.colorChanged}>
                <div className="color-generator">
                    <span className="color-item c1" onClick={this.ChangeToC1}></span>
                    <span className="color-item c2" onClick={this.ChangeToC2}></span>
                    <span className="color-item c3" onClick={this.ChangeToC3}></span>
                    <i className="fa fa-cog fa-2x"></i>
                </div>
            </div>
        )
    }

    colorChanged(e){    
        document.querySelector(".color-changer").classList.toggle("color-changed")
    }
    ChangeToC1(){
        let myroot = document.documentElement 
        myroot.style.setProperty('--user-bg2', 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)')
        myroot.style.setProperty('--user-hr', '#dafc8c')
        myroot.style.setProperty('--user-ei', '#68d377')
    }

    ChangeToC2() {
        let myroot = document.documentElement
        myroot.style.setProperty('--user-bg2', 'linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)')
        myroot.style.setProperty('--user-hr', '#dafc8c')
        myroot.style.setProperty('--user-ei', '#68d377')
    }

    ChangeToC3() {
        let myroot = document.documentElement
        myroot.style.setProperty('--user-bg2', 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)')
        myroot.style.setProperty('--user-hr', '#87e494')
        myroot.style.setProperty('--user-ei', '#fd542a')
    }
}

export default colorChanger