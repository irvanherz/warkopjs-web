import React from "react"
import {Redirect, withRouter} from 'react-router-dom'

function Main(props) {
    if(!props.authData.data.id) props.history.push('/signin')
    else props.history.push('/home')
    return null
}

export default Main