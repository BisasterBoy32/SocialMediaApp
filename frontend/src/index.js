import App from "./components/app"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import Favicon from 'react-favicon';

import store from "./store"

ReactDOM.render(
    <Provider store = {store}>
        <Favicon url="http://127.0.0.1:8000/media/images/chatchita2.ico" />
        <App />
    </Provider>  , document.querySelector(".main"))